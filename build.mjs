import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from './site-data.mjs';

const root = process.cwd();
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date());

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
    description: 'Project notes on ElevateOS, Pulse, and Katalyst.',
    bodyClass: 'page-blog',
    render: renderBlogIndex,
  },
  {
    path: '/contact/',
    file: path.join('contact', 'index.html'),
    title: `Contact · ${site.name}`,
    description: 'LinkedIn, WhatsApp, GitHub, Wantedly, Facebook, Instagram, ElevateOS, and Crystal Century.',
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
  await cleanupMediaAssets();

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

function renderLink(href, label, currentPath) {
  const active = currentPath === href ? ' aria-current="page"' : '';
  return `<a href="${attr(href)}"${active}>${esc(label)}</a>`;
}

function renderBrandMark() {
  return `<span class="brand-mark brand-mark--glyph" aria-hidden="true">${esc(site.brandMark?.text || 'HC')}</span>`;
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
      <div class="site-header-inner">
        <a class="brand" href="/">
          ${renderBrandMark()}
          <span class="brand-copy">
            <strong>${esc(site.name)}</strong>
            <small>${esc(site.tagline)}</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${nav.map(([label, href]) => renderLink(href, label, currentPath)).join('')}
        </nav>
      </div>
    </header>
  `;
}

function renderHero({ kicker = '', title, subtitle = '', actions = [], tags = [], className = '' }) {
  return `
    <section class="hero-panel ${className}">
      ${kicker ? `<p class="eyebrow">${esc(kicker)}</p>` : ''}
      <h1>${esc(title)}</h1>
      ${subtitle ? `<p class="hero-subtitle">${esc(subtitle)}</p>` : ''}
      ${
        actions.length
          ? `<div class="actions">${actions
              .map((action) => `<a class="button ${action.primary ? 'primary' : 'secondary'}" href="${attr(action.href)}">${esc(action.label)}</a>`)
              .join('')}</div>`
          : ''
      }
      ${
        tags.length
          ? `<div class="hero-tags">${tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}</div>`
          : ''
      }
    </section>
  `;
}

function renderSectionIntro(eyebrow, title, lead = '', action = '') {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h2>${esc(title)}</h2>
        ${lead ? `<p class="section-lead">${esc(lead)}</p>` : ''}
      </div>
      ${action}
    </div>
  `;
}

function renderMetricGrid(metrics) {
  return `
    <div class="metric-grid">
      ${metrics
        .map(
          (metric) => `
            <article class="panel metric-card">
              <p class="metric-value">${esc(metric.value)}</p>
              <p class="metric-label">${esc(metric.label)}</p>
              <p class="metric-detail">${esc(metric.detail)}</p>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderCardGrid(items, variant = 'feature') {
  return `
    <div class="card-grid card-grid--${variant}">
      ${items
        .map(
          (item) => `
            <article class="panel text-card text-card--${variant}">
              <p class="label">${esc(item.label || (variant === 'note' ? 'Project' : 'Focus'))}</p>
              <h3>${esc(item.name)}</h3>
              <p>${esc(item.summary)}</p>
              ${
                item.bullets?.length
                  ? `<ul>${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}</ul>`
                  : ''
              }
              ${item.href ? `<p class="card-link"><a href="${attr(item.href)}">Open ${esc(item.name)}</a></p>` : ''}
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderFeatureCards(items) {
  return renderCardGrid(items, 'feature');
}

function renderNoteCards(items) {
  return renderCardGrid(items, 'note');
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
            <section class="panel tag-group">
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

function renderPostList(posts) {
  return `
    <div class="post-list">
      ${posts
        .map(
          (post) => `
            <article class="post-row">
              <div class="post-row-meta">
                <p class="label">${esc(post.date)}</p>
                <h3><a href="/blog/${attr(post.slug)}/">${esc(post.title)}</a></h3>
              </div>
              <p class="post-row-summary">${esc(post.summary)}</p>
              <a class="post-row-link" href="/blog/${attr(post.slug)}/">Open</a>
            </article>
          `
        )
        .join('')}
    </div>
  `;
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

function renderSidebar() {
  return `
    <div class="sidebar-stack">
      <article class="panel profile-card">
        <img
          class="profile-photo"
          src="${attr(site.profilePhoto.src)}"
          alt="${attr(site.profilePhoto.alt)}"
          width="92"
          height="120"
          loading="eager"
          decoding="async"
        >
        <div class="profile-copy">
          <p class="label">${esc(site.author)}</p>
          <p>${esc(site.location)}</p>
          <p>${esc(site.identityLine)}</p>
        </div>
      </article>
      <article class="panel sidebar-panel">
        <p class="label">Current focus</p>
        <p class="sidebar-lead">${esc(site.focusIntro)}</p>
        <ul class="stack-list">
          ${site.currentFocus.map((item) => `<li>${esc(item)}</li>`).join('')}
        </ul>
      </article>
      ${renderLinkGroups(site.linkGroups)}
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <p>${esc(site.author)}, Tokyo.</p>
        <div class="footer-links" aria-label="Links">
          ${site.contactLinks.map((link) => `<a href="${attr(link.href)}">${esc(link.label)}</a>`).join('')}
        </div>
        <p>© 2026 ${esc(site.author)}</p>
      </div>
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
  <meta name="theme-color" content="#101418">
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
      <div class="page-layout">
        <div class="page-column">
          ${content}
        </div>
        <aside class="page-sidebar" aria-label="Profile and links">
          ${renderSidebar()}
        </aside>
      </div>
    </main>
    ${renderFooter()}
  </div>
</body>
</html>
`;
}

function renderHome() {
  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: site.heroHeadline,
        subtitle: site.homeSummary,
        actions: site.heroActions,
        tags: site.heroNotes,
        className: 'hero-panel--home',
      })}
      <section class="page-section">
        ${renderSectionIntro('At a glance', 'Metrics', 'Concrete numbers from the work.')}
        ${renderMetricGrid(site.metrics)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Work', 'Current work', site.focusIntro)}
        ${renderFeatureCards(site.focusItems)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Projects', 'Selected projects', 'Product, service, and infrastructure.')}
        ${renderNoteCards(site.projects)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Writing', 'Recent notes', 'Project writeups and updates.')}
        ${renderPostList(site.posts)}
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
      description: site.tagline,
    },
  });
}

function renderAbout() {
  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: 'About',
        subtitle: 'Background, experience, education, and skills.',
        actions: [
          { label: 'Portfolio', href: '/portfolio/' },
          { label: 'Contact', href: '/contact/' },
        ],
        className: 'hero-panel--about',
      })}
      <section class="page-section">
        ${renderSectionIntro('Background', 'Background', 'Tokyo-based student at Cambridge.')}
        <div class="prose-panel panel">
          <p>Work spans ElevateOS, Kiwanis Voice Club of Nippon, KIST Key Club, and research.</p>
          <p>Education, service, product, and writing stay in one place here.</p>
        </div>
      </section>
      <section class="page-section">
        ${renderSectionIntro('Experience', 'Experience')}
        ${renderTimeline(site.experience)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Education', 'Education')}
        ${renderTimeline(site.education)}
        <div class="credential-list">
          ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
        </div>
      </section>
      <section class="page-section">
        ${renderSectionIntro('Service', 'Service and projects')}
        ${renderNoteCards(site.serviceProjects)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Skills', 'Skills')}
        ${renderTagGroups(site.skillsGroups)}
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
        description: site.tagline,
      },
    },
  });
}

function renderPortfolio() {
  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: 'Portfolio',
        subtitle: 'Projects, service, and research.',
        actions: [
          { label: 'About', href: '/about/' },
          { label: 'Writing', href: '/blog/' },
        ],
        className: 'hero-panel--portfolio',
      })}
      <section class="page-section">
        ${renderSectionIntro('Work', 'Current work', site.focusIntro)}
        ${renderFeatureCards(site.focusItems)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Projects', 'Projects', 'Short notes on product and infrastructure.')}
        ${renderNoteCards(site.projects)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Service', 'Service')}
        ${renderNoteCards(site.serviceProjects)}
      </section>
      <section class="page-section">
        ${renderSectionIntro('Research', 'Research')}
        <div class="split-grid">
          <article class="panel">
            <p class="label">Research areas</p>
            <ul class="stack-list">
              <li>Cross-cultural communication</li>
              <li>Cognitive systems and aging</li>
              <li>Semiconductor supply-chain resilience</li>
              <li>Generational and cultural interpretation</li>
            </ul>
          </article>
          <article class="panel">
            <p class="label">Credentials</p>
            <div class="credential-list">
              ${site.credentials.map((item) => `<span class="tag">${esc(item)}</span>`).join('')}
            </div>
          </article>
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
      ${renderHero({
        kicker: site.name,
        title: 'Writing',
        subtitle: 'Project notes on ElevateOS, Pulse, and Katalyst.',
        actions: [{ label: 'Contact', href: '/contact/' }],
        className: 'hero-panel--writing',
      })}
      <section class="page-section">
        ${renderSectionIntro('Writing', 'Recent notes', 'Project writeups and updates.')}
        ${renderPostList(site.posts)}
      </section>
    `,
  ]);

  return renderPage({
    title: `Writing · ${site.name}`,
    description: 'Project notes on ElevateOS, Pulse, and Katalyst.',
    canonicalPath: '/blog/',
    bodyClass: 'page-blog',
    content,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${site.name} Writing`,
      description: 'Project notes on ElevateOS, Pulse, and Katalyst.',
    },
  });
}

function renderPost(post) {
  const body = post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('\n');

  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: post.title,
        subtitle: post.summary,
        actions: [{ label: 'Back to Writing', href: '/blog/' }],
        className: 'hero-panel--post',
      })}
      <section class="page-section">
        <article class="panel article">
          <div class="article-meta">${esc(post.date)} · ${esc(post.readTime)}</div>
          <div class="article-body">
            ${body}
          </div>
        </article>
      </section>
    `,
  ]);

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
  const directLinks = [
    { label: 'Open LinkedIn', href: site.linkedin, primary: true },
    { label: 'Message on WhatsApp', href: site.whatsapp },
  ];

  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: 'Contact',
        subtitle: site.contactIntro,
        actions: directLinks,
        className: 'hero-panel--contact',
      })}
      <section class="page-section">
        ${renderSectionIntro('Contact', 'Direct', 'Use LinkedIn or WhatsApp.')}
        <div class="panel prose-panel">
          <p>LinkedIn is the fastest route for professional contact. WhatsApp works for quick replies.</p>
        </div>
      </section>
      <section class="page-section">
        ${renderSectionIntro('Links', 'Links', 'All outbound links in one place.')}
        ${renderLinkGroups(site.linkGroups)}
      </section>
    `,
  ]);

  return renderPage({
    title: `Contact · ${site.name}`,
    description: 'LinkedIn, WhatsApp, GitHub, Wantedly, Facebook, Instagram, ElevateOS, and Crystal Century.',
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
  const content = joinLines([
    `
      ${renderHero({
        kicker: site.name,
        title: 'Page not found',
        subtitle: 'Try Home, Portfolio, Writing, About, or Contact.',
        actions: [
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio/' },
        ],
        className: 'hero-panel--404',
      })}
      <section class="page-section">
        ${renderSectionIntro('Try this instead', 'Start here')}
        <div class="panel prose-panel">
          <ul class="stack-list">
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio/">Portfolio</a></li>
            <li><a href="/blog/">Writing</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
      </section>
    `,
  ]);

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

${site.name} is a personal site for projects, writing, and links.

## Pages
${pagesList.map(([label, route]) => `- ${label}: ${site.url}${route === '/' ? '/' : route}`).join('\n')}

## Writing
${posts.join('\n')}

## Links
${site.contactLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}

## Projects
- ElevateOS
- Kiwanis Voice Club of Nippon
- Pulse Manila 2026
- Katalyst
- OpenClaw

## Service
- Japan Cancer Society, KIST
- Recycling Initiative, KIST
- Mural Project
- Ashinaga collaboration
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

async function cleanupMediaAssets() {
  const mediaDir = path.join(root, 'assets', 'media');
  let entries;

  try {
    entries = await readdir(mediaDir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name !== 'pfp.png')
      .map((entry) => rm(path.join(mediaDir, entry.name), { force: true }))
  );
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
