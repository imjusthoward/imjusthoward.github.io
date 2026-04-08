import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from './site-data.mjs';

const root = process.cwd();
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date());

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/portfolio/' },
  { label: 'Writing', href: '/blog/' },
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
    description: site.tagline,
    bodyClass: 'page-about',
    render: renderAbout,
  },
  {
    path: '/portfolio/',
    file: path.join('portfolio', 'index.html'),
    title: `Projects · ${site.name}`,
    description: 'Projects, service work, and research.',
    bodyClass: 'page-portfolio',
    render: renderPortfolio,
  },
  {
    path: '/blog/',
    file: path.join('blog', 'index.html'),
    title: `Writing · ${site.name}`,
    description: 'Project notes.',
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

function renderBrandMark() {
  return `<span class="brand-mark" aria-hidden="true">${esc(site.brandMark?.text || 'HC')}</span>`;
}

function renderHeader(currentPath) {
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
          ${site.contactLinks.map((link) => `<a href="${attr(link.href)}">${esc(link.label)}</a>`).join('')}
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
  <meta name="theme-color" content="#f6f0e7">
  <link rel="canonical" href="${attr(urlFor(canonicalPath))}">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon.png" type="image/png">
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

function renderIntro({ eyebrow, title, subtitle, photo = false }) {
  return `
    <header class="page-intro${photo ? ' page-intro--photo' : ''}">
      ${photo ? renderProfilePhoto() : ''}
      <div class="page-intro-copy">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        ${subtitle ? `<p class="intro-subtitle">${esc(subtitle)}</p>` : ''}
      </div>
    </header>
  `;
}

function renderProfilePhoto() {
  return `
    <figure class="profile-photo">
      <img
        src="${attr(site.profilePhoto.src)}"
        alt="${attr(site.profilePhoto.alt)}"
        width="88"
        height="88"
        loading="eager"
        decoding="async"
      >
    </figure>
  `;
}

function renderSection(title, lead, body) {
  return `
    <section class="page-section">
      <div class="section-head">
        <h2>${esc(title)}</h2>
        ${lead ? `<p class="section-lead">${esc(lead)}</p>` : ''}
      </div>
      ${body}
    </section>
  `;
}

function renderProse(paragraphs) {
  return `<div class="prose">${paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div>`;
}

function renderCompactList(items) {
  return `<ul class="compact-list">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function renderEntries(items) {
  return `
    <div class="entry-list">
      ${items
        .map(
          (item) => `
            <article class="entry">
              <div class="entry-head">
                <h3>${item.href ? `<a href="${attr(item.href)}">${esc(item.title)}</a>` : esc(item.title)}</h3>
                ${item.meta ? `<span class="entry-meta">${esc(item.meta)}</span>` : ''}
              </div>
              ${item.eyebrow ? `<p class="entry-eyebrow">${esc(item.eyebrow)}</p>` : ''}
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
  const intro = renderIntro({
    eyebrow: site.name,
    title: site.heroHeadline,
    subtitle: site.tagline,
  });

  const sections = [
    renderSection(
      'About Me',
      '',
      renderProse([site.homeSummary])
    ),
    renderSection(
      'Current Work',
      '',
      renderEntries(
        site.focusItems.map((item) => ({
          title: item.name,
          meta: item.label,
          summary: item.summary,
          href: item.href || '',
        }))
      )
    ),
  ];

  return renderPage({
    title: site.name,
    description: site.description,
    canonicalPath: '/',
    bodyClass: 'page-home',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.author,
      url: site.url,
      sameAs: site.contactLinks.map((link) => link.href),
      alumniOf: ['University of Cambridge', 'K. International School Tokyo'],
      description: site.tagline,
    },
  });
}

function renderAbout() {
  const intro = renderIntro({
    eyebrow: 'About Me',
    title: 'About Me',
    subtitle: 'Tokyo-based student at Cambridge.',
    photo: true,
  });

  const sections = [
    renderSection(
      'Background',
      '',
      renderProse([
        'I study HSPS at Cambridge and work from Tokyo.',
        'My work spans ElevateOS, Kiwanis Voice Club of Nippon, KIST Key Club, and research and writing.',
        'The aim is to keep each project practical, readable, and easy to pick up again later.',
      ])
    ),
    renderSection(
      'Current Roles',
      '',
      renderEntries(
        site.experience.slice(0, 4).map((item) => ({
          title: item.role,
          eyebrow: item.org,
          meta: item.dates,
          summary: item.summary,
        }))
      )
    ),
  ];

  return renderPage({
    title: `About · ${site.name}`,
    description: site.tagline,
    canonicalPath: '/about/',
    bodyClass: 'page-about',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: site.author,
        sameAs: site.contactLinks.map((link) => link.href),
        description: site.tagline,
      },
    },
  });
}

function renderPortfolio() {
  const intro = renderIntro({
    eyebrow: 'Projects',
    title: 'Projects',
    subtitle: 'Product, service, and research.',
  });

  const sections = [
    renderSection(
      'Product',
      '',
      renderEntries(
        site.projects.map((item) => ({
          title: item.name,
          eyebrow: item.label,
          summary: item.summary,
          href: item.href || '',
        }))
      )
    ),
    renderSection(
      'Service',
      '',
      renderEntries(
        site.serviceProjects.map((item) => ({
          title: item.name,
          eyebrow: 'Service',
          summary: item.summary,
        }))
      )
    ),
  ];

  return renderPage({
    title: `Projects · ${site.name}`,
    description: 'Projects, service work, and research.',
    canonicalPath: '/portfolio/',
    bodyClass: 'page-portfolio',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${site.name} Projects`,
      description: 'Projects, service work, and research.',
    },
  });
}

function renderBlogIndex() {
  const intro = renderIntro({
    eyebrow: 'Writing',
    title: 'Writing',
    subtitle: 'Project notes.',
  });

  const sections = [
    renderSection(
      'Recent Notes',
      '',
      renderEntries(
        site.posts.map((post) => ({
          title: post.title,
          eyebrow: post.date,
          meta: post.readTime,
          summary: post.summary,
          href: `/blog/${post.slug}/`,
        }))
      )
    ),
  ];

  return renderPage({
    title: `Writing · ${site.name}`,
    description: 'Project notes.',
    canonicalPath: '/blog/',
    bodyClass: 'page-blog',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${site.name} Writing`,
      description: 'Project notes.',
    },
  });
}

function renderPost(post) {
  const intro = renderIntro({
    eyebrow: 'Writing',
    title: post.title,
    subtitle: post.summary,
  });

  const sections = [
    renderSection('Note', `${post.date} · ${post.readTime}`, renderProse(post.body)),
  ];

  return renderPage({
    title: `${post.title} · ${site.name}`,
    description: post.summary,
    canonicalPath: `/blog/${post.slug}/`,
    bodyClass: 'page-post',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
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
  const intro = renderIntro({
    eyebrow: 'Contact',
    title: 'Contact',
    subtitle: 'LinkedIn is the fastest route. WhatsApp is fine for a quick reply.',
  });

  const sections = [
    renderSection('Direct', '', renderProse(['Use LinkedIn for professional contact. Use WhatsApp for a quick reply.'])),
    renderSection('Core / Professional', '', renderLinkRow(site.linkGroups[0].items)),
    renderSection('Social / Personal', '', renderLinkRow(site.linkGroups[1].items)),
    renderSection('Ventures / Projects', '', renderLinkRow(site.linkGroups[2].items)),
  ];

  return renderPage({
    title: `Contact · ${site.name}`,
    description: 'LinkedIn, WhatsApp, GitHub, Wantedly, Facebook, Instagram, ElevateOS, and Crystal Century.',
    canonicalPath: '/contact/',
    bodyClass: 'page-contact',
    content: `<article class="page-article">${intro}${sections.join('')}</article>`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Person',
        name: site.author,
        sameAs: site.contactLinks.map((link) => link.href),
      },
    },
  });
}

function renderNotFound() {
  const intro = renderIntro({
    eyebrow: '404',
    title: 'Page not found',
    subtitle: 'Use Home, About, Projects, Writing, or Contact.',
  });

  const sections = [
    renderSection(
      'Try this instead',
      '',
      renderLinkGroups([
        {
          group: 'Pages',
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
    ['Projects', '/portfolio/'],
    ['Writing', '/blog/'],
    ['Contact', '/contact/'],
  ];

  return `# ${site.name}

${site.tagline}

Howard Chan's projects, writing, and contact links.

## Pages
${pagesList.map(([label, route]) => `- ${label}: ${site.url}${route === '/' ? '/' : route}`).join('\n')}

## Writing
${site.posts.map((post) => `- ${post.title}: ${site.url}/blog/${post.slug}/`).join('\n')}

## Links
${site.contactLinks.map((link) => `- ${link.label}: ${link.href}`).join('\n')}

## Projects
- ElevateOS
- Pulse Manila 2026
- Katalyst
- OpenClaw
- Crystal Century

## Service
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
