import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from './site-data.mjs';

const root = process.cwd();
const today = '2026-04-06';

const pages = [
  {
    path: '/',
    file: 'index.html',
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    bodyClass: 'page-home',
    render: renderHome,
  },
  {
    path: '/about/',
    file: path.join('about', 'index.html'),
    title: `${site.name} - About`,
    description: `${site.author}'s background, thesis, and current direction.`,
    bodyClass: 'page-about',
    render: renderAbout,
  },
  {
    path: '/portfolio/',
    file: path.join('portfolio', 'index.html'),
    title: `${site.name} - Portfolio`,
    description: `${site.author}'s portfolio of systems, products, research, and service work.`,
    bodyClass: 'page-portfolio',
    render: renderPortfolio,
  },
  {
    path: '/blog/',
    file: path.join('blog', 'index.html'),
    title: `${site.name} - Writing`,
    description: `${site.author}'s essays about clarity, publishing, and systems.`,
    bodyClass: 'page-blog',
    render: renderBlogIndex,
  },
  {
    path: '/contact/',
    file: path.join('contact', 'index.html'),
    title: `${site.name} - Contact`,
    description: `Contact details for ${site.author}.`,
    bodyClass: 'page-contact',
    render: renderContact,
  },
  {
    path: '/404/',
    file: '404.html',
    title: `Not found - ${site.name}`,
    description: 'The page you were looking for is not here.',
    bodyClass: 'page-404',
    render: renderNotFound,
  },
];

const postPages = site.posts.map((post) => ({
  path: `/blog/${post.slug}/`,
  file: path.join('blog', post.slug, 'index.html'),
  title: `${site.name} - ${post.title}`,
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

function joinLines(lines) {
  return lines.filter(Boolean).join('\n');
}

function renderLink(label, href, currentPath) {
  const active = currentPath === href ? ' aria-current="page"' : '';
  return `<a href="${attr(href)}"${active}>${esc(label)}</a>`;
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
        <span class="brand-mark">TC</span>
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
      <p>${esc(site.author)} uses Think College Level as a public front door for writing, research, service, and product work.</p>
      <p>Published from git. © 2026 ${esc(site.author)}</p>
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
  <meta name="theme-color" content="#f3eadf">
  <link rel="canonical" href="${attr(urlFor(canonicalPath))}">
  <link rel="stylesheet" href="/assets/styles.css">
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
      <section class="panel hero-visual">
        <p class="label hero-visual-label">Current signal</p>
        <div class="hero-monogram">HC</div>
        <div class="hero-visual-copy">
          <p>${esc(site.identityLine)}</p>
          <p>${esc(site.location)}</p>
        </div>
      </section>
      <section class="panel panel-soft compact-panel">
        <p class="label">At a glance</p>
        <ul class="fact-list">
          ${site.heroNotes.map((item) => `<li>${esc(item)}</li>`).join('')}
        </ul>
      </section>
      <section class="panel panel-soft compact-panel">
        <p class="label">Current builds</p>
        <ul class="stack-list">
          <li><a href="/portfolio/">ElevateOS, Pulse, Katalyst, and the rest of the build stack</a></li>
          <li><a href="/blog/">Writing that keeps the work legible</a></li>
          <li><a href="/about/">Identity, thesis, and supporting proof</a></li>
        </ul>
      </section>
    </aside>
  `;
}

function renderSignalBoard() {
  const latestPost = site.posts[0];

  return `
    <section class="section">
      ${renderSectionIntro(
        'Current signal',
        'A few widgets that explain the site at a glance',
        'The home page works better as a board than as a wall of paragraphs. These widgets keep the current story visible without making the layout feel busy.'
      )}
      <div class="widget-grid">
        <article class="widget widget-featured">
          <p class="label">Working thesis</p>
          <p class="widget-quote">${esc(site.thesis)}</p>
          <p>${esc(site.coreIdentity[0])}</p>
          <p>${esc(site.coreIdentity[1])}</p>
          <p class="widget-link"><a href="/about/">Read the full background</a></p>
        </article>
        <article class="widget">
          <p class="label">Now</p>
          <h3>${esc(site.identityLine)}</h3>
          <p>${esc(site.location)}</p>
          <ul class="widget-list">
            ${site.heroNotes.map((note) => `<li>${esc(note)}</li>`).join('')}
          </ul>
        </article>
        <article class="widget widget-muted">
          <p class="label">Latest note</p>
          <h3><a href="/blog/${attr(latestPost.slug)}/">${esc(latestPost.title)}</a></h3>
          <p>${esc(latestPost.summary)}</p>
          <p class="widget-meta">${esc(latestPost.date)} · ${esc(latestPost.readTime)}</p>
          <p class="widget-link"><a href="/blog/${attr(latestPost.slug)}/">Open essay</a></p>
        </article>
        <article class="widget widget-accent">
          <p class="label">Start here</p>
          <ul class="widget-list">
            <li><a href="/portfolio/">Portfolio</a> for the work.</li>
            <li><a href="/blog/">Writing</a> for the thinking.</li>
            <li><a href="/contact/">Contact</a> if you need a reply.</li>
          </ul>
          <p class="widget-link"><a href="https://elevateos.org">Open ElevateOS</a></p>
        </article>
      </div>
    </section>
  `;
}

function renderHero() {
  return `
    <section class="hero">
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
      ${renderHeroRail()}
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
            <article class="feature-row ${item.label === 'Main build' ? 'feature-lead' : ''}">
              <div class="feature-meta">
                <p class="label">${esc(item.label || 'Focus')}</p>
                <h3>${esc(item.name)}</h3>
              </div>
              <div class="feature-body">
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
            <article class="note-card">
              <p class="label">${esc(item.name)}</p>
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
  if (!posts.length) {
    return `
      <div class="panel">
        <p class="label">Writing</p>
        <p>No posts yet.</p>
      </div>
    `;
  }

  const [featured, ...rest] = posts;

  return `
    <div class="post-stack">
      <article class="post-feature">
        <div class="post-feature-copy">
          <p class="label">${esc(featured.meta)}</p>
          <h3><a href="/blog/${attr(featured.slug)}/">${esc(featured.title)}</a></h3>
          <p>${esc(featured.summary)}</p>
          <p class="post-feature-meta">${esc(featured.date)} · ${esc(featured.readTime)}</p>
        </div>
        <div class="post-feature-aside">
          <p class="label">Featured</p>
          <p>This note explains why the site stays small enough to revise quickly.</p>
          <p class="feature-link"><a href="/blog/${attr(featured.slug)}/">Open the essay</a></p>
        </div>
      </article>
      <div class="post-list">
        ${rest
        .map(
          (post) => `
            <article class="post-row">
              <div class="post-meta">
                <p class="label">${esc(post.meta)}</p>
                <p>${esc(post.date)} · ${esc(post.readTime)}</p>
              </div>
              <div class="post-copy">
                <h3><a href="/blog/${attr(post.slug)}/">${esc(post.title)}</a></h3>
                <p>${esc(post.summary)}</p>
              </div>
            </article>
          `
        )
        .join('')}
      </div>
    </div>
  `;
}

function renderHome() {
  const content = joinLines([
    renderHero(),
    renderMetricStrip(),
    renderSignalBoard(),
    `
      <section class="section">
        ${renderSectionIntro('Current focus', 'The main story', site.focusIntro, `<a class="button secondary" href="/about/">Read the full background</a>`)}
        ${renderFeatureList(site.focusItems)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Supporting proof', 'Projects and systems', site.projectsIntro, `<a class="button secondary" href="/portfolio/">See the portfolio</a>`)}
        ${renderFeatureList(site.projects)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Writing', 'Recent notes', 'Short essays that explain the site, the publishing system, and the way the work is organized.', `<a class="button secondary" href="/blog/">Open the archive</a>`)}
        ${renderPostsPreview(site.posts)}
      </section>
    `,
    `
      <section class="section">
        <div class="split-section">
          <div>
            <p class="eyebrow">Public front door</p>
            <h2>What this site is for</h2>
            <p class="section-lead">Think College Level holds the writing trail, the project map, and the current story in one place. The site is meant to stay readable, editable, and honest about what is actually being built.</p>
          </div>
          <div class="panel">
            <p class="label">Best next step</p>
            <p>Start with the portfolio if you want the work, the blog if you want the thinking, or the about page if you want the thesis.</p>
            <p><a class="button primary" href="/contact/">Contact</a></p>
          </div>
        </div>
      </section>
    `,
  ]);

  return renderPage({
    title: `${site.name} - ${site.tagline}`,
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
      jobTitle: 'CEO of ElevateOS',
      sameAs: [site.linkedin, site.github],
      alumniOf: ['University of Cambridge', 'K. International School Tokyo'],
      description: site.thesis,
    },
  });
}

function renderAbout() {
  const content = joinLines([
    `
      <section class="section">
        ${renderSectionIntro('About', 'Identity, thesis, and direction', site.description, `<a class="button secondary" href="/portfolio/">Portfolio</a>`)}
        <div class="narrow-copy">
          <p>${esc(
            'Incoming HSPS student at the University of Cambridge interested in connecting politics, international systems, AI, service, and entrepreneurship. I build projects at the intersection of technology and real-world coordination: from leading Kiwanis Voice Club of Nippon and building Pulse Manila 2026, to developing ElevateOS as an AI-enabled education platform.'
          )}</p>
          <p>${esc(
            'My research has focused on cross-cultural communication and cognitive systems, including top-5% Lumiere work scheduled for publication in NHSJS. Long term, I want to use institutional thinking and entrepreneurial execution to build technology that works not just in theory, but in real social and international settings.'
          )}</p>
        </div>
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Pattern', 'The way the work repeats', site.thesis)}
        <div class="quote-block">
          <p>${esc('Identify messy, human-dependent systems -> impose structure -> make them scalable and repeatable.')}</p>
        </div>
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Experience', 'Roles and proof points', site.experienceIntro)}
        ${renderTimeline(site.experience)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Education', 'Academic context', site.educationIntro)}
        ${renderTimeline(site.education)}
        <div class="credential-list">
          ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
        </div>
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Capabilities', 'Skills and subjects', 'The skills are grouped by how the work shows up in public.')}
        ${renderTagGroups(site.skillsGroups)}
      </section>
    `,
  ]);

  return renderPage({
    title: `${site.name} - About`,
    description: `${site.author}'s background, thesis, and current direction.`,
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
        jobTitle: 'CEO of ElevateOS',
        sameAs: [site.linkedin, site.github],
        description: site.thesis,
      },
    },
  });
}

function renderPortfolio() {
  const content = joinLines([
    `
      <section class="section">
        ${renderSectionIntro('Portfolio', 'Work that stays easy to explain', 'The portfolio is organized around products, systems, research, and service. Each piece should be able to stand on its own without extra context.', `<a class="button secondary" href="/about/">About</a>`)}
        ${renderFeatureList(site.focusItems)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Systems', 'Projects with operational weight', 'These are the pieces that turn the thesis into real infrastructure.')}
        ${renderNotes(site.projects)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Service and leadership', 'Public proof that the pattern works outside software', 'The service side matters because it shows the same style in real groups, events, and handoffs.')}
        ${renderNotes(site.serviceProjects)}
      </section>
    `,
    `
      <section class="section">
        ${renderSectionIntro('Research and credentials', 'Credibility layer', 'A concise record of research, writing, and selected credentials that support the public story.')}
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
            <p class="label">Selected credentials</p>
            <div class="credential-list">
              ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
            </div>
          </div>
        </div>
      </section>
    `,
  ]);

  return renderPage({
    title: `${site.name} - Portfolio`,
    description: `${site.author}'s portfolio of systems, products, research, and service work.`,
    canonicalPath: '/portfolio/',
    bodyClass: 'page-portfolio',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Portfolio`,
      description: `${site.author}'s portfolio of systems, products, research, and service work.`,
    },
  });
}

function renderBlogIndex() {
  const content = joinLines([
    `
      <section class="section">
        ${renderSectionIntro('Writing', 'Short essays with a job', 'These posts explain the site, the publishing process, and the way the work is organized. Each one should be worth keeping.', `<a class="button secondary" href="/contact/">Contact</a>`)}
        ${renderPostsPreview(site.posts)}
      </section>
    `,
  ]);

  return renderPage({
    title: `${site.name} - Writing`,
    description: `${site.author}'s essays about clarity, publishing, and systems.`,
    canonicalPath: '/blog/',
    bodyClass: 'page-blog',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${site.name} Writing`,
      description: `${site.author}'s essays about clarity, publishing, and systems.`,
    },
  });
}

function renderPost(post) {
  const body = post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('\n');
  const content = `
    <article class="section article">
      <p class="eyebrow">${esc(post.meta)}</p>
      <h1>${esc(post.title)}</h1>
      <div class="article-meta">${esc(post.date)} · ${esc(post.readTime)}</div>
      <div class="article-body">
        ${body}
      </div>
      <p class="article-back"><a class="button secondary" href="/blog/">Back to writing</a></p>
    </article>
  `;

  return renderPage({
    title: `${site.name} - ${post.title}`,
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
      ${renderSectionIntro('Contact', 'Reach out with context', site.contactIntro, `<a class="button secondary" href="/portfolio/">Portfolio</a>`)}
      <div class="split-section">
        <div class="panel">
          <p class="label">Best channel</p>
          <p>LinkedIn is the most direct route. If you want a useful reply, include what you are building, what you need, and why it should matter.</p>
          <p><a class="button primary" href="${attr(site.linkedin)}">Open LinkedIn</a></p>
        </div>
        <div class="panel">
          <p class="label">Other links</p>
          <ul class="stack-list">
            ${site.contactLinks.map((link) => `<li><a href="${attr(link.href)}">${esc(link.label)}</a></li>`).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;

  return renderPage({
    title: `${site.name} - Contact`,
    description: `Contact details for ${site.author}.`,
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
        sameAs: [site.linkedin, site.github],
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
          <p class="section-lead">Think College Level is organized around a small set of routes. The home page will get you back to the public front door.</p>
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
    title: `Not found - ${site.name}`,
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

${site.author}'s personal blog and portfolio. The site focuses on systems, research, service, product work, and public writing.

## Pages
${pagesList.map(([label, route]) => `- ${label}: ${site.url}${route === '/' ? '/' : route}`).join('\n')}

## Writing
${posts.join('\n')}

## Topics
- ElevateOS
- Kiwanis Voice Club of Nippon
- Pulse Manila 2026
- Katalyst
- OpenClaw
- research, service, and public writing
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
