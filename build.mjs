import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from './site-data.mjs';

const root = process.cwd();
const today = '2026-04-07';

const pages = [
  {
    path: '/',
    file: 'index.html',
    title: `${site.name}`,
    description: site.description,
    bodyClass: 'page-home',
    render: renderHome,
  },
  {
    path: '/about/',
    file: path.join('about', 'index.html'),
    title: `About · ${site.name}`,
    description: site.tagline,
    bodyClass: 'page-about',
    render: renderAbout,
  },
  {
    path: '/portfolio/',
    file: path.join('portfolio', 'index.html'),
    title: `Portfolio · ${site.name}`,
    description: site.tagline,
    bodyClass: 'page-portfolio',
    render: renderPortfolio,
  },
  {
    path: '/blog/',
    file: path.join('blog', 'index.html'),
    title: `Writing · ${site.name}`,
    description: 'Project notes on ElevateOS, Pulse, Katalyst, and service work.',
    bodyClass: 'page-blog',
    render: renderBlogIndex,
  },
  {
    path: '/contact/',
    file: path.join('contact', 'index.html'),
    title: `Contact · ${site.name}`,
    description: 'Reach out on LinkedIn, WhatsApp, GitHub, Wantedly, and project links.',
    bodyClass: 'page-contact',
    render: renderContact,
  },
  {
    path: '/404/',
    file: '404.html',
    title: `Not found · ${site.name}`,
    description: 'The page you were looking for is not here.',
    bodyClass: 'page-404',
    render: renderNotFound,
  },
];

const postPages = site.posts.map((post) => ({
  path: `/blog/${post.slug}/`,
  file: path.join('blog', post.slug, 'index.html'),
  title: `${post.title} · ${site.name}`,
  description: post.summary,
  bodyClass: 'page-post',
  render: () => renderPost(post),
}));

await main();

async function main() {
  for (const page of [...pages, ...postPages]) {
    await writeOutput(page.file, page.render(page));
  }

  await writeOutput('robots.txt', renderRobots());
  await writeOutput('llms.txt', renderLlms());
  await writeOutput('sitemap.xml', renderSitemap());
  await writeOutput('CNAME', 'thinkcollegelevel.com\n');
  await cleanupLegacyPostPages();
}

function esc(input = '') {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function attr(input = '') {
  return esc(input);
}

function urlFor(route) {
  if (route === '/') {
    return `${site.url}/`;
  }

  return `${site.url}${route}`;
}

function sameAsLinks() {
  return site.contactLinks.map((link) => link.href);
}

function joinLines(lines) {
  return lines.filter(Boolean).join('\n');
}

function getMedia(key) {
  return site.media?.[key];
}

function renderMediaFigure(key, loading = 'lazy') {
  const media = getMedia(key);
  if (!media) {
    return '';
  }

  const frameClass = media.frame ? ` media-frame--${media.frame}` : '';

  return `
    <figure class="media-frame${frameClass}">
      <img src="${attr(media.src)}" alt="${attr(media.alt)}" loading="${attr(loading)}" decoding="async">
    </figure>
  `;
}

function renderMediaCard({ image, label, title, summary, href, span = '', loading = 'lazy' }) {
  const classes = ['media-card'];
  if (span) {
    classes.push(span);
  }

  const inner = `
    ${image ? renderMediaFigure(image, loading) : ''}
    <div class="media-copy">
      ${label ? `<p class="label">${esc(label)}</p>` : ''}
      <h3>${esc(title)}</h3>
      ${summary ? `<p>${esc(summary)}</p>` : ''}
    </div>
  `;

  if (href) {
    return `<a class="${classes.join(' ')}" href="${attr(href)}">${inner}</a>`;
  }

  return `<article class="${classes.join(' ')}">${inner}</article>`;
}

function renderMediaBoard(items) {
  return `
    <div class="media-grid">
      ${items.map((item) => renderMediaCard(item)).join('')}
    </div>
  `;
}

function renderLink(label, href, currentPath) {
  const active = currentPath === href ? ' aria-current="page"' : '';
  return `<a href="${attr(href)}"${active}>${esc(label)}</a>`;
}

function renderBrandMark() {
  if (site.brandMark?.src) {
    return `
      <span class="brand-mark brand-mark--image" aria-hidden="true">
        <img src="${attr(site.brandMark.src)}" alt="" width="40" height="40" loading="eager" decoding="async">
      </span>
    `;
  }

  return `<span class="brand-mark brand-mark--glyph" aria-hidden="true">HC</span>`;
}

function renderLinkGroups(groups) {
  return `
    <div class="link-groups">
      ${groups
        .map(
          (group) => `
            <article class="panel link-group">
              <p class="label">${esc(group.group)}</p>
              <div class="footer-links link-grid">
                ${group.items.map((item) => `<a href="${attr(item.href)}">${esc(item.label)}</a>`).join('')}
              </div>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderTopbar(currentPath) {
  const nav = [
    ['Home', '/'],
    ['Portfolio', '/portfolio/'],
    ['Writing', '/blog/'],
    ['About', '/about/'],
    ['Contact', '/contact/'],
  ];

  return `
    <header class="site-header">
      <a class="brand" href="/">
        ${renderBrandMark()}
        <span class="brand-copy">
          <strong>${esc(site.name)}</strong>
          <small>${esc(site.tagline)}</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        ${nav.map(([label, href]) => renderLink(label, href, currentPath)).join('')}
      </nav>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>${esc(site.author)}, Tokyo.</p>
      <div class="footer-links" aria-label="Links">
        ${site.contactLinks.map((link) => `<a href="${attr(link.href)}">${esc(link.label)}</a>`).join('')}
      </div>
      <p>© 2026 ${esc(site.author)}</p>
    </footer>
  `;
}

function renderPage({
  title,
  description,
  canonicalPath,
  bodyClass,
  content,
  jsonLd,
  ogType = 'website',
  metaRobots,
}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${attr(description)}">
  <meta name="theme-color" content="#f4f1ea">
  <link rel="canonical" href="${attr(urlFor(canonicalPath))}">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="shortcut icon" href="/favicon.png">
  <link rel="apple-touch-icon" href="/favicon.png">
  ${metaRobots ? `<meta name="robots" content="${attr(metaRobots)}">` : ''}
  <meta property="og:type" content="${attr(ogType)}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(urlFor(canonicalPath))}">
  <title>${esc(title)}</title>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="${attr(bodyClass)}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="page-shell">
    ${renderTopbar(canonicalPath)}
    <main id="main-content" class="page-main">
${content}
    </main>
    ${renderFooter()}
  </div>
</body>
</html>
`;
}

function renderHeroRail() {
  return `
    <aside class="hero-rail">
      <article class="hero-card hero-card-portrait">
        ${renderMediaFigure('portrait', 'eager')}
        <div class="hero-card-copy">
          <p class="label">Howard Chan</p>
          <p>${esc(site.location)}</p>
          <p>${esc(site.identityLine)}</p>
        </div>
      </article>
      <article class="hero-card hero-card-note">
        <p class="label">Current focus</p>
        <div class="hero-card-copy">
          <p>${esc(site.focusIntro)}</p>
          <ul class="stack-list">
            <li>ElevateOS</li>
            <li>Kiwanis Voice Club of Nippon</li>
            <li>Lumiere research</li>
            <li>Writing</li>
          </ul>
        </div>
      </article>
      <article class="hero-card hero-links">
        <p class="label">Links</p>
        <div class="footer-links hero-link-cloud">
          ${site.contactLinks.map((link) => `<a href="${attr(link.href)}">${esc(link.label)}</a>`).join('')}
        </div>
      </article>
    </aside>
  `;
}

function renderAboutRail() {
  return `
    <aside class="hero-rail">
      <article class="hero-card hero-card-portrait">
        ${renderMediaFigure('portraitAlt', 'eager')}
        <div class="hero-card-copy">
          <p class="label">Howard Chan</p>
          <p>${esc(site.location)}</p>
          <p>${esc(site.identityLine)}</p>
        </div>
      </article>
      <article class="hero-card hero-card-note">
        <p class="label">Focus</p>
        <div class="hero-card-copy">
          <p>${esc(site.focusIntro)}</p>
          <ul class="stack-list">
            <li>Service</li>
            <li>Research</li>
            <li>Product</li>
            <li>Writing</li>
          </ul>
        </div>
      </article>
    </aside>
  `;
}

function renderHeroIntro() {
  return `
    <section class="hero hero--intro">
      <div class="hero-copy">
        <p class="eyebrow">${esc(site.name)}</p>
        <h1>${esc(site.heroHeadline)}</h1>
        <p class="lede">${esc(site.heroLede)}</p>
        <div class="actions">
          ${site.heroActions
            .map((action, index) => `<a class="button ${index === 0 ? 'primary' : 'secondary'}" href="${attr(action.href)}">${esc(action.label)}</a>`)
            .join('')}
        </div>
        <div class="hero-tags">
          ${site.heroNotes.map((item) => `<span class="tag tag-dark">${esc(item)}</span>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMetricStrip() {
  return `
    <section class="metric-strip">
      ${site.metrics
        .map(
          (metric) => `
            <article class="metric">
              <p class="metric-value">${esc(metric.value)}</p>
              <p class="metric-label">${esc(metric.label)}</p>
              <p class="metric-detail">${esc(metric.detail)}</p>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderSectionIntro(eyebrow, title, lead, action = '') {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h2>${esc(title)}</h2>
        <p class="section-lead">${esc(lead)}</p>
      </div>
      ${action}
    </div>
  `;
}

function renderFeatureList(items) {
  return `
    <div class="feature-stack">
      ${items
        .map(
          (item) => `
            <article class="feature-row ${item.label === 'Work' ? 'feature-lead' : ''} ${item.image ? 'feature-with-media' : ''}">
              <div class="feature-meta">
                <p class="label">${esc(item.label || 'Focus')}</p>
                <h3>${esc(item.name)}</h3>
              </div>
              <div class="feature-body">
                ${item.image ? renderMediaFigure(item.image) : ''}
                <p>${esc(item.summary)}</p>
                <ul>
                  ${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}
                </ul>
                ${item.href ? `<p class="feature-link"><a href="${attr(item.href)}">Open ${esc(item.name)}</a></p>` : ''}
              </div>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderTimeline(items) {
  return `
    <div class="timeline">
      ${items
        .map(
          (item) => `
            <article class="timeline-item">
              <div class="timeline-meta">
                <p class="timeline-org">${esc(item.org || item.school)}</p>
                <p class="timeline-dates">${esc(item.dates)}</p>
              </div>
              <div class="timeline-body">
                <h3>${esc(item.role || item.degree)}</h3>
                <p>${esc(item.summary)}</p>
              </div>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderTagGroups(groups) {
  return `
    <div class="tag-groups">
      ${groups
        .map(
          (group) => `
            <section class="tag-group">
              <p class="label">${esc(group.group)}</p>
              <div class="tag-list">
                ${group.items.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
              </div>
            </section>
          `
        )
        .join('')}
    </div>
  `;
}

function renderNotes(items) {
  return `
    <div class="note-grid">
      ${items
        .map(
          (item) => `
            <article class="note-card ${item.image ? 'note-card-media' : ''}">
              <p class="label">${esc(item.name)}</p>
              ${item.image ? renderMediaFigure(item.image) : ''}
              <p>${esc(item.summary)}</p>
              <ul>
                ${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}
              </ul>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderPostsPreview(posts) {
  return `
    <div class="post-grid">
      ${posts
        .map(
          (post) => `
            <article class="post-card">
              <h3><a href="/blog/${attr(post.slug)}/">${esc(post.title)}</a></h3>
              <p class="post-card-meta">${esc(post.date)} · ${esc(post.readTime)}</p>
              <p>${esc(post.summary)}</p>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderHome() {
  const content = joinLines([
    `
      <section class="home-layout">
        <div class="home-column">
          ${renderHeroIntro()}
          ${renderMetricStrip()}
          <section class="section">
            ${renderSectionIntro('Work', 'Featured work', site.focusIntro, `<a class="button secondary" href="/about/">Background</a>`)}
            ${renderFeatureList(site.focusItems)}
          </section>
          <section class="section">
            ${renderSectionIntro('Writing', 'Project notes', 'Notes on the work.', `<a class="button secondary" href="/blog/">Open the archive</a>`)}
            ${renderPostsPreview(site.posts)}
          </section>
          <section class="section">
            <div class="split-section">
              <div>
                <p class="eyebrow">Links</p>
                <h2>Elsewhere</h2>
                <p class="section-lead">Professional, personal, and project links.</p>
              </div>
              <div class="panel">
                <p class="label">Links</p>
                <ul class="stack-list">
                  ${site.contactLinks.map((link) => `<li><a href="${attr(link.href)}">${esc(link.label)}</a></li>`).join('')}
                </ul>
              </div>
            </div>
          </section>
        </div>
        ${renderHeroRail()}
      </section>
    `,
  ]);

  return renderPage({
    title: `${site.name}`,
    description: site.description,
    canonicalPath: '/',
    bodyClass: 'page-home',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.author,
      url: site.url,
      sameAs: sameAsLinks(),
      alumniOf: ['University of Cambridge', 'K. International School Tokyo'],
      description: site.thesis,
    },
  });
}

function renderAbout() {
  const content = joinLines([
    `
      <section class="about-layout">
        <div class="about-column">
          <section class="section">
            ${renderSectionIntro('About', 'Background', 'Tokyo-based student at Cambridge.', `<a class="button secondary" href="/portfolio/">Portfolio</a>`)}
            <div class="narrow-copy">
              <p>${esc('Service, research, product, and writing.')}</p>
              <p>${esc('The thread is coordination: keep the next handoff clear, keep the record readable, and keep useful work moving.')}</p>
            </div>
          </section>
          <section class="section">
            ${renderSectionIntro('Approach', 'Coordination', 'Keep the next handoff clear.')}
            <div class="quote-block">
              <p>${esc('Structure turns messy, human-dependent systems into something people can use and repeat.')}</p>
            </div>
          </section>
          <section class="section">
            ${renderSectionIntro('Service', 'Moments', 'Service, school, and event moments.')}
            ${renderMediaBoard([
              { image: 'kiwanis', label: 'Service', title: 'Kiwanis Voice Club', summary: 'Charter ceremony and launch.', href: '/portfolio/', span: 'span-4' },
              { image: 'keyclub', label: 'Service', title: 'KIST Key Club', summary: 'Event coordination and service work.', href: '/portfolio/', span: 'span-4' },
              { image: 'charter1', label: 'Service', title: 'Charter Ceremony #1', summary: 'Founding moment.', href: '/portfolio/', span: 'span-4' },
              { image: 'charter2', label: 'Service', title: 'Charter Ceremony #2', summary: 'Founding moment.', href: '/portfolio/', span: 'span-6' },
            ])}
          </section>
          <section class="section">
            ${renderSectionIntro('Experience', 'Roles', site.experienceIntro)}
            ${renderTimeline(site.experience)}
          </section>
          <section class="section">
            ${renderSectionIntro('Studies', 'Education', site.educationIntro)}
            ${renderTimeline(site.education)}
            <div class="credential-list">
              ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
            </div>
          </section>
          <section class="section">
            ${renderSectionIntro('Skills', 'Areas', 'Grouped by area.')}
            ${renderTagGroups(site.skillsGroups)}
          </section>
        </div>
        ${renderAboutRail()}
      </section>
    `,
  ]);

  return renderPage({
    title: `About · ${site.name}`,
    description: site.tagline,
    canonicalPath: '/about/',
    bodyClass: 'page-about',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: site.author,
        sameAs: sameAsLinks(),
        description: site.thesis,
      },
    },
  });
}

function renderPortfolio() {
  const content = joinLines([
    `
      <section class="section">
        ${renderSectionIntro('Portfolio', 'Projects', 'Products, service, research, and writing.', `<a class="button secondary" href="/about/">About</a>`)}
        ${renderFeatureList(site.focusItems)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Projects', 'Systems', 'Work that needs upkeep and coordination.')}
        ${renderNotes(site.projects)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Service', 'Community', 'Clubs, events, and service projects.')}
        ${renderNotes(site.serviceProjects)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Research', 'Research and credentials', 'Research, writing, and a short record of credentials.')}
        <div class="split-section">
          <div class="panel">
            <p class="label">Research areas</p>
            <ul class="fact-list">
              <li>Cross-cultural communication</li>
              <li>Cognitive systems and aging</li>
              <li>Semiconductor supply-chain resilience</li>
              <li>Generational and cultural interpretation</li>
            </ul>
          </div>
          <div class="panel">
            <p class="label">Credentials</p>
            <div class="credential-list">
              ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
            </div>
          </div>
        </div>
      </section>
    `,
  ]);

  return renderPage({
    title: `Portfolio · ${site.name}`,
    description: site.tagline,
    canonicalPath: '/portfolio/',
    bodyClass: 'page-portfolio',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Portfolio`,
      description: `${site.author}'s projects in product, service, research, and writing.`,
    },
  });
}

function renderBlogIndex() {
  const content = joinLines([
    `
      <section class="section">
        ${renderSectionIntro('Writing', 'Project notes', 'Notes on the work.', `<a class="button secondary" href="/contact/">Contact</a>`)}
        ${renderPostsPreview(site.posts)}
      </section>
    `,
  ]);

  return renderPage({
    title: `Writing · ${site.name}`,
    description: site.tagline,
    canonicalPath: '/blog/',
    bodyClass: 'page-blog',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${site.name} Writing`,
      description: `${site.author}'s notes on projects, service, and systems.`,
    },
  });
}

function renderPost(post) {
  const body = post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('\n');
  const content = `
    <article class="section article">
      <h1>${esc(post.title)}</h1>
      <div class="article-meta">${esc(post.date)} · ${esc(post.readTime)}</div>
      <div class="article-body">
        ${body}
      </div>
      <p class="article-back"><a class="button secondary" href="/blog/">Back to project notes</a></p>
    </article>
  `;

  return renderPage({
    title: `${post.title} · ${site.name}`,
    description: post.summary,
    canonicalPath: `/blog/${post.slug}/`,
    bodyClass: 'page-post',
    content,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.dateIso || today,
      author: { '@type': 'Person', name: site.author },
      description: post.summary,
      mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    },
  });
}

function renderContact() {
  const content = `
    <section class="section">
      ${renderSectionIntro('Contact', 'Reach out', site.contactIntro, `<a class="button secondary" href="/portfolio/">Portfolio</a>`)}
      <div class="split-section">
        <div class="panel">
          <p class="label">Best channel</p>
          <p>LinkedIn or WhatsApp is the fastest route.</p>
          <div class="actions">
            <a class="button primary" href="${attr(site.linkedin)}">Open LinkedIn</a>
            <a class="button secondary" href="${attr(site.whatsapp)}">Message on WhatsApp</a>
          </div>
        </div>
        ${renderLinkGroups(site.linkGroups)}
      </div>
    </section>
  `;

  return renderPage({
    title: `Contact · ${site.name}`,
    description: site.tagline,
    canonicalPath: '/contact/',
    bodyClass: 'page-contact',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Person',
        name: site.author,
        sameAs: sameAsLinks(),
      },
    },
  });
}

function renderNotFound() {
  const content = `
    <section class="section">
      <div class="split-section">
        <div>
          <p class="eyebrow">404</p>
          <h1>That page is not here.</h1>
          <p class="section-lead">Use Home, Portfolio, Writing, About, or Contact.</p>
        </div>
        <div class="panel">
          <p class="label">Try this instead</p>
          <ul class="stack-list">
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio/">Portfolio</a></li>
            <li><a href="/blog/">Writing</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
        </div>
      </div>
    </section>
  `;

  return renderPage({
    title: `Not found · ${site.name}`,
    description: 'The page you were looking for is not here.',
    canonicalPath: '/404/',
    bodyClass: 'page-404',
    content,
    ogType: 'website',
    metaRobots: 'noindex,follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Not found - ${site.name}`,
    },
  });
}

function renderRobots() {
  return `User-agent: *
Allow: /
Sitemap: ${site.url}/sitemap.xml
`;
}

function renderLlms() {
  const pagesList = [
    ['Home', '/'],
    ['Portfolio', '/portfolio/'],
    ['Writing', '/blog/'],
    ['About', '/about/'],
    ['Contact', '/contact/'],
  ];

  const posts = site.posts.map((post) => `- ${post.title}: ${site.url}/blog/${post.slug}/`);

return `# ${site.name}

${site.tagline}

${site.name} is a personal site for projects, notes, and links.

## Pages
${pagesList.map(([label, route]) => `- ${label}: ${site.url}${route === '/' ? '/' : route}`).join('\n')}

## Writing
${posts.join('\n')}

## Links
${site.contactLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}

## Topics
- ElevateOS
- Kiwanis Voice Club of Nippon
- Pulse Manila 2026
- Katalyst
- OpenClaw
- service, research, product, and writing
`;
}

function renderSitemap() {
  const entries = [
    '/',
    '/portfolio/',
    '/blog/',
    '/about/',
    '/contact/',
    ...site.posts.map((post) => `/blog/${post.slug}/`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (route) =>
      `  <url><loc>${site.url}${route === '/' ? '/' : route}</loc><lastmod>${today}</lastmod><changefreq>${
        route.startsWith('/blog/') && route !== '/blog/' ? 'monthly' : 'weekly'
      }</changefreq><priority>${
        route === '/'
          ? '1.0'
          : route === '/blog/'
            ? '0.9'
            : route === '/portfolio/'
              ? '0.8'
              : route === '/about/'
                ? '0.6'
                : route === '/contact/'
                  ? '0.5'
                  : '0.7'
      }</priority></url>`
  )
  .join('\n')}
</urlset>
`;
}

async function writeOutput(relativePath, content) {
  const target = path.join(root, relativePath);
  const normalized = String(content).replace(/[ \t]+$/gm, '');
  await mkdir(path.dirname(target), { recursive: true });
  try {
    const existing = await readFile(target, 'utf8');
    if (existing === normalized) {
      return;
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
  await writeFile(target, normalized, 'utf8');
}

async function cleanupLegacyPostPages() {
  const blogRoot = path.join(root, 'blog');
  const keep = new Set(['index.html', ...site.posts.map((post) => post.slug)]);

  let entries;
  try {
    entries = await readdir(blogRoot, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && !keep.has(entry.name))
      .map((entry) => rm(path.join(blogRoot, entry.name), { recursive: true, force: true }))
  );
}
