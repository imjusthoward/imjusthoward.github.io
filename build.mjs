import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from './site-data.mjs';

const root = process.cwd();
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date());

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Awards', href: '/awards/' },
  { label: 'Publications', href: '/blog/' },
  { label: 'Projects', href: '/portfolio/' },
  { label: 'Contact', href: '/contact/' },
];

const pages = [
  {
    path: '/',
    file: 'index.html',
    title: site.name,
    description: site.description,
    bodyClass: 'page-home',
    render: renderHome,
  },
  {
    path: '/about/',
    file: path.join('about', 'index.html'),
    title: `About · ${site.name}`,
    description: 'About Chak Hang (Howard) Chan.',
    bodyClass: 'page-about',
    render: renderAbout,
  },
  {
    path: '/awards/',
    file: path.join('awards', 'index.html'),
    title: `Awards · ${site.name}`,
    description: 'Academic distinction, leadership, research, and certifications.',
    bodyClass: 'page-awards',
    render: renderAwards,
  },
  {
    path: '/portfolio/',
    file: path.join('portfolio', 'index.html'),
    title: `Projects · ${site.name}`,
    description: 'Product, service, infrastructure, and research.',
    bodyClass: 'page-portfolio',
    render: renderProjects,
  },
  {
    path: '/blog/',
    file: path.join('blog', 'index.html'),
    title: `Publications · ${site.name}`,
    description: 'Research publications and notes.',
    bodyClass: 'page-blog',
    render: renderBlogIndex,
  },
  {
    path: '/contact/',
    file: path.join('contact', 'index.html'),
    title: `Contact · ${site.name}`,
    description: 'Links and direct contact routes.',
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
  return route === '/' ? `${site.url}/` : `${site.url}${route}`;
}

function renderLink(href, label, currentPath) {
  const active = currentPath === href ? ' aria-current="page"' : '';
  return `<a href="${attr(href)}"${active}>${esc(label)}</a>`;
}

function renderNav(currentPath) {
  return navItems.map((item) => renderLink(item.href, item.label, currentPath)).join('');
}

function renderLogo() {
  return `
    <img
      class="brand-mark"
      src="${attr(site.logo.src)}"
      alt="${attr(site.logo.alt)}"
      width="1024"
      height="921"
      loading="eager"
      decoding="async"
    >
  `;
}

function renderHeader(currentPath) {
  return `
    <header class="site-header">
      <div class="site-header-inner">
        <a class="brand" href="/">
          ${renderLogo()}
          <span class="brand-copy">
            <strong>${esc(site.name)}</strong>
            <small>${esc(site.tagline)}</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${renderNav(currentPath)}
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <p>${esc(site.author)}, ${esc(site.location)}</p>
        <p class="footer-links">
          ${site.footerLinks.map((link) => `<a href="${attr(link.href)}">${esc(link.label)}</a>`).join('')}
        </p>
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
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${attr(urlFor(canonicalPath))}">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
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
    ${renderHeader(canonicalPath)}
    <main id="main-content" class="page-main">
      ${content}
    </main>
    ${renderFooter()}
  </div>
</body>
</html>
`;
}

function renderIntro(title, subtitle) {
  return `
    <header class="page-intro">
      <h1>${esc(title)}</h1>
      ${subtitle ? `<p class="intro-subtitle">${esc(subtitle)}</p>` : ''}
    </header>
  `;
}

function renderSection(title, body, id) {
  return `
    <section class="page-section"${id ? ` id="${attr(id)}"` : ''}>
      <div class="section-head">
        <h2>${esc(title)}</h2>
      </div>
      ${body}
    </section>
  `;
}

function renderProse(paragraphs) {
  return `<div class="prose">${paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div>`;
}

function renderEntries(items) {
  return `
    <div class="entry-list">
      ${items
        .map(
          (item) => `
            <article class="entry"${item.id ? ` id="${attr(item.id)}"` : ''}>
              <div class="entry-head">
                <h3>${item.href ? `<a href="${attr(item.href)}">${esc(item.title)}</a>` : esc(item.title)}</h3>
                ${item.meta ? `<span class="entry-meta">${esc(item.meta)}</span>` : ''}
              </div>
              ${item.org ? `<p class="entry-org">${esc(item.org)}</p>` : ''}
              ${item.summary ? `<p class="entry-summary">${esc(item.summary)}</p>` : ''}
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderLinkRow(items) {
  return `
    <p class="link-row">
      ${items.map((item) => `<a href="${attr(item.href)}">${esc(item.label)}</a>`).join('<span aria-hidden="true">·</span>')}
    </p>
  `;
}

function renderLinkGroups(groups) {
  return `
    <div class="link-groups">
      ${groups
        .map(
          (group) => `
            <section class="link-group">
              <h3>${esc(group.group)}</h3>
              ${renderLinkRow(group.items)}
            </section>
          `
        )
        .join('')}
    </div>
  `;
}

function renderHome() {
  const intro = renderIntro(site.heroHeadline, site.homeSummary);

  return renderPage({
    title: site.name,
    description: site.description,
    canonicalPath: '/',
    bodyClass: 'page-home',
    content: `<article class="page-article">${intro}${renderProse(site.homeParagraphs)}${renderLinkRow(site.homeLinks)}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.fullName || site.author,
      url: site.url,
      sameAs: site.contactLinks.map((link) => link.href),
      alumniOf: ['University of Cambridge', 'K. International School Tokyo'],
      description: site.tagline,
    },
  });
}

function renderAbout() {
  const intro = renderIntro('About Me', 'Tokyo-based incoming HSPS offer holder at Peterhouse, University of Cambridge.');

  return renderPage({
    title: `About · ${site.name}`,
    description: 'About Howard Chan.',
    canonicalPath: '/about/',
    bodyClass: 'page-about',
    content: `<article class="page-article">${intro}${renderProse(site.aboutParagraphs)}${renderLinkRow(site.homeLinks)}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: site.fullName || site.author,
        sameAs: site.contactLinks.map((link) => link.href),
        description: site.tagline,
      },
    },
  });
}

function renderAwards() {
  const intro = renderIntro('Awards', 'Academic distinction, leadership, research, and certifications.');

  const sections = site.awards.map((group, index) =>
    renderSection(group.group, renderEntries(group.items), index === 0 ? 'academic-distinction' : '')
  );

  return renderPage({
    title: `Awards · ${site.name}`,
    description: 'Academic distinction, leadership, research, and certifications.',
    canonicalPath: '/awards/',
    bodyClass: 'page-awards',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Awards`,
      description: 'Academic distinction, leadership, research, and certifications.',
    },
  });
}

function renderProjects() {
  const intro = renderIntro('Projects', 'Product, service, and operations.');

  const sections = site.projects.map((group) =>
    renderSection(group.group, renderEntries(group.items), group.group.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
  );

  return renderPage({
    title: `Projects · ${site.name}`,
    description: 'Projects, service work, and operations.',
    canonicalPath: '/portfolio/',
    bodyClass: 'page-portfolio',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Projects`,
      description: 'Projects, service work, and operations.',
    },
  });
}

function renderBlogIndex() {
  const intro = renderIntro('Publications', 'Research publications and notes.');

  return renderPage({
    title: `Publications · ${site.name}`,
    description: 'Research publications and notes.',
    canonicalPath: '/blog/',
    bodyClass: 'page-blog',
    content: `<article class="page-article">${intro}${renderSection('Publications', renderEntries(site.publications), 'publications')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Publications`,
      description: 'Research publications and notes.',
    },
  });
}

function renderPost(post) {
  const intro = renderIntro(post.title, post.summary);

  return renderPage({
    title: `${post.title} · ${site.name}`,
    description: post.summary,
    canonicalPath: `/blog/${post.slug}/`,
    bodyClass: 'page-post',
    content: `<article class="page-article">${intro}${renderSection('Abstract', renderProse(post.body), 'abstract')}</article>`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: post.title,
      datePublished: post.dateIso || today,
      author: { '@type': 'Person', name: site.fullName || site.author },
      description: post.summary,
      mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    },
  });
}

function renderContact() {
  const intro = renderIntro('Contact', site.contactIntro);

  const sections = [
    renderSection('Links', renderLinkGroups(site.linkGroups), 'links'),
  ];

  return renderPage({
    title: `Contact · ${site.name}`,
    description: 'LinkedIn, WhatsApp, GitHub, Wantedly, ElevateOS, Pulse Manila 2026, Crystal Century, Facebook, Instagram, and email.',
    canonicalPath: '/contact/',
    bodyClass: 'page-contact',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Person',
        name: site.fullName || site.author,
        sameAs: site.contactLinks.map((link) => link.href),
      },
    },
  });
}

function renderNotFound() {
  const intro = renderIntro('Page not found', 'Use Home, About, Awards, Publications, Projects, or Contact.');

  const sections = [
    renderSection(
      'Pages',
      renderLinkGroups([
        {
          group: 'Navigation',
          items: navItems,
        },
      ])
    ),
  ];

  return renderPage({
    title: `Not found · ${site.name}`,
    description: 'The page you were looking for is not here.',
    canonicalPath: '/404/',
    bodyClass: 'page-404',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
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
    ['About', '/about/'],
    ['Awards', '/awards/'],
    ['Publications', '/blog/'],
    ['Projects', '/portfolio/'],
    ['Contact', '/contact/'],
  ];

  return `# ${site.name}

${site.tagline}

Howard Chan's profile, awards, projects, research, service, and contact links.

## Pages
${pagesList.map(([label, route]) => `- ${label}: ${site.url}${route === '/' ? '/' : route}`).join('\n')}

## About
- ${site.aboutParagraphs.join(' ')}

## Publications
${site.posts.map((post) => `- ${post.title}: ${site.url}/blog/${post.slug}/`).join('\n')}

## Volunteer Service
${site.service.map((item) => `- ${item.title}: ${item.summary}`).join('\n')}

## Skills
${site.skills.map((item) => `- ${item.title}: ${item.summary}`).join('\n')}

## Links
${site.contactLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}

## Projects
- ElevateOS
- Pulse Manila 2026
- Katalyst
- OpenClaw
- Stand Tall
- Crystal Century

## Leadership
- Kiwanis Voice Club of Nippon
- KIST Key Club
- Japan Cancer Society, KIST
- Recycling Initiative, KIST
`;
}

function renderSitemap() {
  const entries = [
    '/',
    '/about/',
    '/awards/',
    '/portfolio/',
    '/blog/',
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
              : route === '/awards/'
                ? '0.7'
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
      .filter((entry) => entry.isFile() && entry.name !== 'pfp.png' && entry.name !== 'hc-logo.png')
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
