const siteUrl = 'https://thinkcollegelevel.com';
const elevateosUrl = 'https://elevateos.org';
const crystalcenturyUrl = 'https://crystalcentury.com';
const linkedinUrl = 'https://www.linkedin.com/in/chakhanghoward-chan';
const githubUrl = 'https://github.com/imjusthoward/';
const wantedlyUrl = 'https://www.wantedly.com/id/chakhang_chan';
const facebookUrl = 'https://www.facebook.com/imjusthoward';
const instagramUrl = 'https://www.instagram.com/imjusthoward/';
const whatsappUrl = 'https://wa.me/85293442294';

export const site = {
  name: 'Think College Level',
  author: 'Howard Chan',
  url: siteUrl,
  title: 'Think College Level',
  tagline:
    'Cambridge (HSPS) Offer Holder | President of Kiwanis Voice Club of Nippon | CEO of ElevateOS | Lumiere Scholar',
  description: "Howard Chan's projects, writing, and contact links.",
  identityLine: 'Cambridge HSPS offer holder',
  location: 'Sumida-ku, Tokyo, Japan',
  linkedin: linkedinUrl,
  github: githubUrl,
  wantedly: wantedlyUrl,
  facebook: facebookUrl,
  instagram: instagramUrl,
  elevateos: elevateosUrl,
  crystalcentury: crystalcenturyUrl,
  whatsapp: whatsappUrl,
  brandMark: {
    text: 'HC',
  },
  profilePhoto: {
    src: '/assets/media/pfp.png',
    alt: 'Howard Chan portrait',
  },
  heroHeadline: 'Howard Chan',
  homeSummary: 'Tokyo-based student at Cambridge. Work spans ElevateOS, Kiwanis service, research, and writing.',
  focusItems: [
    {
      name: 'ElevateOS',
      label: 'Work',
      summary:
        'AI-enabled education platform for IB, AP, SAT, and admissions support. Handles tutoring operations, worksheet generation, and session follow-up.',
      href: elevateosUrl,
    },
    {
      name: 'Kiwanis Voice Club of Nippon',
      label: 'Service',
      summary: 'Founded Kiwanis Voice Club of Nippon and leads youth service and event coordination.',
    },
    {
      name: 'Research and writing',
      label: 'Research',
      summary: 'Lumiere research on emoji semiotics, cross-cultural interpretation, and cognitive aging.',
    },
  ],
  projects: [
    {
      name: 'Pulse Manila 2026',
      label: 'Project',
      summary: 'Mobile companion for ASPAC Manila 2026. Keeps schedules, venues, and updates easy to check on the move.',
    },
    {
      name: 'Katalyst',
      label: 'Project',
      summary: 'Coordination layer for Kiwanis projects and continuity.',
    },
    {
      name: 'OpenClaw',
      label: 'Project',
      summary: 'WhatsApp-based execution agent system on VPS, local gateway, and systemd.',
    },
    {
      name: 'Think College Level',
      label: 'Site',
      summary: 'Projects, writing, and contact links.',
    },
    {
      name: 'Crystal Century',
      label: 'Project',
      summary: 'WordPress recovery and infrastructure project.',
      href: crystalcenturyUrl,
    },
  ],
  experience: [
    {
      org: 'Kiwanis International',
      role: 'Founder and President of Kiwanis Voice Club of Nippon',
      dates: 'Jan 2026 - Present',
      summary: 'Founded Kiwanis Voice Club of Nippon and leads youth service and event coordination.',
    },
    {
      org: 'ElevateOS',
      role: 'Founder',
      dates: 'Jan 2026 - Present',
      summary: 'Building an AI-enabled education platform for IB, AP, SAT, and admissions support.',
    },
    {
      org: 'Key Club International',
      role: 'Founder and President of KIST Key Club',
      dates: 'Sep 2024 - Present',
      summary: 'Founded and scaled the school Key Club into a service organization.',
    },
    {
      org: 'Lumiere Education',
      role: 'Researcher',
      dates: 'Jun 2025 - Present',
      summary: 'Researcher on ambiguous emoji interpretation in Japan and China.',
    },
  ],
  education: [
    {
      school: 'University of Cambridge',
      degree: 'BA (Hons), HSPS',
      dates: '2026 - 2029',
      summary: 'Incoming undergraduate at Peterhouse.',
    },
    {
      school: 'K. International School Tokyo',
      degree: 'International Baccalaureate Diploma',
      dates: 'May 2022 - May 2026',
      summary: 'GPA 3.96 unweighted; predicted IB 45/45; SAT 1550; Duolingo English Test 160; UCAT 2410, Band 2.',
    },
  ],
  serviceProjects: [
    {
      name: 'Kiwanis Voice Club of Nippon',
      summary: 'Youth service, continuity, and event coordination within the Kiwanis network.',
    },
    {
      name: 'KIST Key Club',
      summary: 'School service organization with projects across health, caregiving, food insecurity, and youth service.',
    },
    {
      name: 'Japan Cancer Society, KIST',
      summary: '10-kilometer walkathon with 500+ participants and more than Y50,000 raised.',
    },
    {
      name: 'Recycling Initiative, KIST',
      summary: 'Tripled membership to 60 and improved recycling efficiency by 40%.',
    },
  ],
  posts: [
    {
      slug: 'elevateos',
      title: 'ElevateOS',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary: 'An education platform for tutoring, worksheets, and admissions support.',
      body: [
        'ElevateOS keeps tutoring work, worksheet generation, and admissions support in one place.',
        'Students, parents, and tutors use it to move through sessions quickly.',
        'It keeps study work organized across handoffs and follow-up.',
      ],
    },
    {
      slug: 'pulse-manila-2026',
      title: 'Pulse Manila 2026',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary: 'A mobile event companion for schedules, venues, and updates.',
      body: [
        'Pulse gives attendees a fast way to see schedules, sessions, venues, and updates at a live convention.',
        'It works well on mobile during a live convention.',
        'It keeps event navigation simple when people need information quickly.',
      ],
    },
    {
      slug: 'katalyst',
      title: 'Katalyst',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary: 'A coordination layer for Kiwanis projects and continuity.',
      body: [
        'Katalyst keeps youth service work, project handoffs, and continuity in one place.',
        'It keeps transitions clear and tasks visible between rounds of work.',
        'It supports Kiwanis and related service work without adding overhead.',
      ],
    },
  ],
  contactIntro: 'LinkedIn is the fastest route. WhatsApp works for a quick reply.',
  contactLinks: [
    { label: 'Think College Level', href: siteUrl },
    { label: 'GitHub', href: githubUrl },
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'Wantedly', href: wantedlyUrl },
    { label: 'Facebook', href: facebookUrl },
    { label: 'Instagram', href: instagramUrl },
    { label: 'ElevateOS', href: elevateosUrl },
    { label: 'Crystal Century', href: crystalcenturyUrl },
    { label: 'WhatsApp', href: whatsappUrl },
  ],
  linkGroups: [
    {
      group: 'Core / Professional',
      items: [
        { label: 'Think College Level', href: siteUrl },
        { label: 'GitHub', href: githubUrl },
        { label: 'LinkedIn', href: linkedinUrl },
        { label: 'Wantedly', href: wantedlyUrl },
      ],
    },
    {
      group: 'Social / Personal',
      items: [
        { label: 'Facebook', href: facebookUrl },
        { label: 'Instagram', href: instagramUrl },
        { label: 'WhatsApp', href: whatsappUrl },
      ],
    },
    {
      group: 'Ventures / Projects',
      items: [
        { label: 'ElevateOS', href: elevateosUrl },
        { label: 'Crystal Century', href: crystalcenturyUrl },
      ],
    },
  ],
};
