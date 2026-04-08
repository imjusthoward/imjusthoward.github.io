const siteUrl = 'https://thinkcollegelevel.com';
const cambridgeUrl = 'https://www.cam.ac.uk/';
const elevateosUrl = 'https://elevateos.org';
const crystalcenturyUrl = 'https://crystalcentury.com';
const linkedinUrl = 'https://www.linkedin.com/in/howardchan2008/';
const githubUrl = 'https://github.com/imjusthoward/';
const wantedlyUrl = 'https://www.wantedly.com/id/chakhang_chan';
const facebookUrl = 'https://www.facebook.com/imjusthoward';
const instagramUrl = 'https://www.instagram.com/imjusthoward/';
const whatsappUrl = 'https://wa.me/85293442294';
const emailUrl = 'mailto:chakhanghowardchan2008@gmail.com';

export const site = {
  name: 'Think College Level',
  author: 'Howard Chan',
  url: siteUrl,
  title: 'Think College Level',
  tagline:
    'Cambridge (HSPS) Offer Holder | President of Kiwanis Voice Club of Nippon | CEO of ElevateOS | Lumiere Scholar',
  description:
    "Howard Chan's profile, awards, projects, writing, and contact links.",
  location: 'Sumida-ku, Tokyo, Japan',
  logo: {
    src: '/assets/media/hc-logo.png',
    alt: 'HC logo',
  },
  heroHeadline: 'Howard Chan',
  homeSummary:
    'Incoming HSPS student at the University of Cambridge interested in politics, international systems, AI, service, and entrepreneurship. I build projects at the intersection of technology and real-world coordination.',
  aboutParagraphs: [
    'Incoming HSPS student at the University of Cambridge interested in connecting politics, international systems, AI, service, and entrepreneurship.',
    'I build projects at the intersection of technology and real-world coordination: from leading Kiwanis Voice Club of Nippon and building Pulse Manila 2026, to developing ElevateOS as an AI-enabled education platform.',
    'My research has focused on cross-cultural communication and cognitive systems, including top-5% Lumiere work scheduled for publication in NHSJS.',
    'Long term, I want to use institutional thinking and entrepreneurial execution to build technology that works not just in theory, but in real social and international settings.',
  ],
  currentWork: [
    {
      title: 'ElevateOS',
      meta: 'Product',
      summary: 'AI-enabled education platform for IB, AP, SAT, and admissions workflows.',
      href: elevateosUrl,
    },
    {
      title: 'Kiwanis Voice Club of Nippon',
      meta: 'Service',
      summary: 'Founding president coordinating youth service, continuity, and stakeholder alignment across Japan.',
      href: '/portfolio/#kiwanis-voice-club-of-nippon',
    },
    {
      title: 'Pulse Manila 2026',
      meta: 'Project',
      summary: 'Mobile convention companion for schedules, venues, and updates.',
      href: '/blog/pulse-manila-2026/',
    },
  ],
  education: [
    {
      title: 'University of Cambridge',
      meta: 'BA (Hons) · HSPS · Incoming 2026',
      summary: 'Offer holder; focus on institutions, politics, and decision-making at scale.',
      href: cambridgeUrl,
    },
    {
      title: 'K. International School Tokyo',
      meta: 'IB Diploma · Predicted 45/45',
      summary: 'Higher Level: Biology, English A Language & Literature, Chemistry. SAT 1550 · DET 160 · UCAT 2410 Band 2.',
      href: '/awards/#academic-distinction',
    },
  ],
  experience: [
    {
      title: 'Founder and President, Kiwanis Voice Club of Nippon',
      meta: 'Kiwanis International · Jan 2026 - Present',
      summary: 'Founded the first Voice Club representing Japan within the Kiwanis network and coordinates service initiatives across health, education, and community resilience.',
      href: '/portfolio/#kiwanis-voice-club-of-nippon',
    },
    {
      title: 'Founder and CEO, ElevateOS',
      meta: 'Jan 2026 - Present',
      summary: 'Leading an AI-enabled education platform for IB, AP, SAT, and admissions support using Next.js, TypeScript, PostgreSQL, and AI integrations.',
      href: elevateosUrl,
    },
    {
      title: 'Founder and President, KIST Key Club',
      meta: 'K. International School Tokyo · Sep 2024 - Present',
      summary: 'Scaled the club to 40+ members and 5 executives, raised over ¥200,000, and built service projects with Kiwanis Children\'s Fund and Aktion Club.',
      href: '/portfolio/#kist-key-club',
    },
    {
      title: 'Researcher, Lumiere Education',
      meta: 'Jun 2025 - Present',
      summary: 'Authored a top 5% proposal on emoji semiotics and a narrative review on cognitive aging.',
      href: '/writing/#publications',
    },
    {
      title: 'President, Japan Cancer Society, KIST',
      meta: 'Sep 2024 - Present',
      summary: 'Organized a 10-kilometer interschool walkathon with 500+ participants and additional donation drives.',
      href: '/portfolio/#japan-cancer-society-kist',
    },
    {
      title: 'President, Recycling Initiative, KIST',
      meta: 'Aug 2024 - Present',
      summary: 'Tripled membership to 60 and introduced Quality Inspector roles that improved oversight and recycling efficiency by 40%.',
      href: '/portfolio/#recycling-initiative-kist',
    },
  ],
  awards: [
    {
      group: 'Academic distinction',
      items: [
        {
          title: 'University of Cambridge offer',
          meta: '2026',
          summary: 'Incoming BA (Hons) student in Human, Social, and Political Sciences.',
          href: cambridgeUrl,
        },
        {
          title: 'Predicted IB 45/45',
          meta: 'K. International School Tokyo',
          summary: 'Top predicted score in the diploma programme.',
          href: '/about/#education',
        },
        {
          title: 'SAT 1550 · DET 160 · UCAT 2410 Band 2',
          meta: 'Admissions testing',
          summary: 'High-testing profile across language and admissions exams.',
          href: '/about/#education',
        },
        {
          title: 'KIST Honor Roll and International Research Olympiad Honor Roll',
          meta: '2023–2025',
          summary: 'Academic distinction across school years and research performance.',
          href: '/about/#education',
        },
      ],
    },
    {
      group: 'Leadership and service',
      items: [
        {
          title: 'Founder and President, Kiwanis Voice Club of Nippon',
          meta: 'Kiwanis International',
          summary: 'Built the first Voice Club representing Japan and coordinated service across youth, alumni, and stakeholders.',
          href: '/portfolio/#kiwanis-voice-club-of-nippon',
        },
        {
          title: 'Founder and President, KIST Key Club',
          meta: 'K. International School Tokyo',
          summary: 'Scaled the service organization to 40+ members, 5 executives, and ¥200,000+ raised.',
          href: '/portfolio/#kist-key-club',
        },
        {
          title: 'President, Japan Cancer Society, KIST',
          meta: 'K. International School Tokyo',
          summary: 'Organized a 10-kilometer walkathon with 500+ participants and support drives for community needs.',
          href: '/portfolio/#japan-cancer-society-kist',
        },
        {
          title: 'President, Recycling Initiative, KIST',
          meta: 'K. International School Tokyo',
          summary: 'Tripled membership and improved recycling oversight efficiency by 40%.',
          href: '/portfolio/#recycling-initiative-kist',
        },
      ],
    },
    {
      group: 'Research',
      items: [
        {
          title: 'Top 5% Lumiere proposal',
          meta: 'Lumiere Research Programme',
          summary: 'Cross-cultural communication research on ambiguous emojis across Japanese and Chinese users.',
          href: '/writing/#publications',
        },
        {
          title: 'Scheduled for publication in NHSJS',
          meta: 'Preprint DOI 10.20944/preprints202509.0729.v1',
          summary: 'Emoji semiotics study using Hofstede dimensions and generational analysis.',
          href: 'https://doi.org/10.20944/preprints202509.0729.v1',
        },
        {
          title: 'Cognitive aging review',
          meta: 'Sci Set Journal of Medical Clinical Case Studies',
          summary: 'Narrative review integrating six decades of the Seattle Longitudinal Study with contemporary advances.',
          href: '/writing/#publications',
        },
      ],
    },
  ],
  projects: [
    {
      group: 'Product',
      items: [
        {
          title: 'ElevateOS',
          meta: 'Active',
          summary: 'AI-enabled education platform for IB, AP, SAT, and admissions workflows.',
          href: elevateosUrl,
          id: 'elevateos',
        },
        {
          title: 'Pulse Manila 2026',
          meta: 'Active',
          summary: 'Mobile convention companion for schedules, venues, and updates under live event conditions.',
          href: '/blog/pulse-manila-2026/',
          id: 'pulse-manila-2026',
        },
        {
          title: 'Katalyst',
          meta: 'Active',
          summary: 'Coordination layer for continuity, handoffs, and institutional memory in youth service networks.',
          href: '/blog/katalyst/',
          id: 'katalyst',
        },
        {
          title: 'OpenClaw',
          meta: 'System',
          summary: 'WhatsApp-based execution agent system running on VPS, local gateway, and systemd.',
          href: '/portfolio/#openclaw',
          id: 'openclaw',
        },
      ],
    },
    {
      group: 'Service',
      items: [
        {
          title: 'Kiwanis Voice Club of Nippon',
          meta: 'Founding initiative',
          summary: 'First Voice Club representing Japan within the Kiwanis network.',
          href: '/portfolio/#kiwanis-voice-club-of-nippon',
          id: 'kiwanis-voice-club-of-nippon',
        },
        {
          title: 'KIST Key Club',
          meta: 'Founding initiative',
          summary: 'School service organization focused on health, caregiving, food insecurity, and youth service.',
          href: '/portfolio/#kist-key-club',
          id: 'kist-key-club',
        },
        {
          title: 'Japan Cancer Society, KIST',
          meta: 'Service project',
          summary: '10-kilometer interschool walkathon and donation drives.',
          href: '/portfolio/#japan-cancer-society-kist',
          id: 'japan-cancer-society-kist',
        },
        {
          title: 'Recycling Initiative, KIST',
          meta: 'Service project',
          summary: 'Quality Inspector roles and membership growth for better oversight.',
          href: '/portfolio/#recycling-initiative-kist',
          id: 'recycling-initiative-kist',
        },
      ],
    },
    {
      group: 'Infrastructure and research',
      items: [
        {
          title: 'Stand Tall',
          meta: 'Prototype',
          summary: 'Assistive wheelchair add-on designed to reduce caregiver strain and improve mobility transitions.',
          href: '/portfolio/#stand-tall',
          id: 'stand-tall',
        },
        {
          title: 'Crystal Century',
          meta: 'Production work',
          summary: 'Live e-commerce platform work and recovery planning under hosting constraints.',
          href: crystalcenturyUrl,
          id: 'crystal-century',
        },
        {
          title: 'Think College Level',
          meta: 'Portfolio hub',
          summary: 'Personal site for projects, writing, and contact links.',
          href: siteUrl,
          id: 'think-college-level',
        },
        {
          title: 'Semiconductor supply-chain concept paper',
          meta: 'Research',
          summary: 'Concept paper on supply-chain resilience using big data analytics and quantum-enhanced blockchain.',
          href: '/writing/#publications',
          id: 'semiconductor-supply-chain',
        },
      ],
    },
  ],
  publications: [
    {
      title:
        'Hofstede’s Dimensions and Generational Effects on Ambiguous Emoji Semiotics: Cross-Cultural Analysis of Japanese and Chinese Digital Communication',
      meta: '2025',
      summary: 'Preprint scheduled for publication in NHSJS.',
      href: 'https://doi.org/10.20944/preprints202509.0729.v1',
    },
    {
      title:
        'Unraveling Cognitive Aging: A Comprehensive Narrative Review Integrating Six Decades of the Seattle Longitudinal Study with Contemporary Advances',
      meta: '2025',
      summary: 'Narrative review on education, occupational complexity, and digital engagement in cognition.',
    },
    {
      title: 'Semiconductor supply-chain resilience concept paper',
      meta: '2025',
      summary: 'Draft exploring big data analytics and quantum-enhanced blockchain for resilience planning.',
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
  contactIntro:
    'LinkedIn is the fastest route. WhatsApp works for a quick reply. Email is fine for anything longer.',
  contactLinks: [
    { label: 'Think College Level', href: siteUrl },
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'GitHub', href: githubUrl },
    { label: 'Wantedly', href: wantedlyUrl },
    { label: 'Email', href: emailUrl },
    { label: 'Facebook', href: facebookUrl },
    { label: 'Instagram', href: instagramUrl },
    { label: 'ElevateOS', href: elevateosUrl },
    { label: 'Crystal Century', href: crystalcenturyUrl },
    { label: 'WhatsApp', href: whatsappUrl },
  ],
  footerLinks: [
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'GitHub', href: githubUrl },
    { label: 'Email', href: emailUrl },
    { label: 'WhatsApp', href: whatsappUrl },
  ],
  linkGroups: [
    {
      group: 'Core / Professional',
      items: [
        { label: 'Think College Level', href: siteUrl },
        { label: 'LinkedIn', href: linkedinUrl },
        { label: 'GitHub', href: githubUrl },
        { label: 'Wantedly', href: wantedlyUrl },
        { label: 'Email', href: emailUrl },
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
