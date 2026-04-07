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
  description:
    'Cambridge (HSPS) Offer Holder | President of Kiwanis Voice Club of Nippon | CEO of ElevateOS | Lumiere Scholar',
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
    src: '/assets/media/hc-logo.png',
    alt: 'HC logo',
  },
  heroHeadline:
    'Howard Chan',
  heroLede:
    'Cambridge (HSPS) Offer Holder | President of Kiwanis Voice Club of Nippon | CEO of ElevateOS | Lumiere Scholar',
  heroNotes: [
    'Cambridge HSPS',
    'Tokyo',
    'Service',
    'Projects',
  ],
  heroActions: [
    { label: 'Portfolio', href: '/portfolio/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'About', href: '/about/' },
  ],
  media: {
    portrait: {
      src: '/assets/media/portrait.jpg',
      alt: 'Howard Chan portrait at night',
      frame: 'portrait',
    },
    portraitAlt: {
      src: '/assets/media/portrait-alt.png',
      alt: 'Howard Chan portrait in a white shirt and tie',
      frame: 'portrait',
    },
    elevateos: {
      src: '/assets/media/elevateos-landing.jpg',
      alt: 'ElevateOS landing page mockup',
      frame: 'tall',
    },
    pulse: {
      src: '/assets/media/pulse-app.jpg',
      alt: 'Pulse event companion app mockup',
      frame: 'square',
    },
    katalyst: {
      src: '/assets/media/katalyst-app.jpg',
      alt: 'Katalyst app mockup for Kiwanis projects',
      frame: 'wide',
    },
    kiwanis: {
      src: '/assets/media/kiwanis-ceremony.jpg',
      alt: 'Kiwanis ceremony group photo',
      frame: 'wide',
    },
    keyclub: {
      src: '/assets/media/keyclub-event.jpg',
      alt: 'KIST Key Club event group photo',
      frame: 'wide',
    },
    charter1: {
      src: '/assets/media/charter-ceremony-1.jpg',
      alt: 'KIST Key Club charter ceremony photo one',
      frame: 'wide',
    },
    charter2: {
      src: '/assets/media/charter-ceremony-2.jpg',
      alt: 'KIST Key Club charter ceremony photo two',
      frame: 'wide',
    },
    mural: {
      src: '/assets/media/mural-project.jpg',
      alt: 'Mural Project group photo',
      frame: 'wide',
    },
    ashinaga: {
      src: '/assets/media/ashinaga-collaboration.jpg',
      alt: 'Collaboration with Ashinaga Africa Initiative group photo',
      frame: 'wide',
    },
  },
  metrics: [
    {
      value: '10K+',
      label: 'Pulse users',
      detail: 'Mobile-first convention companion built for ASPAC Manila 2026.',
    },
    {
      value: '500+',
      label: 'Walkathon participants',
      detail: 'Japan Cancer Society, KIST event coordination and outreach.',
    },
    {
      value: '40%',
      label: 'Efficiency gain',
      detail: 'Quality Inspector roles improved recycling oversight.',
    },
    {
      value: '¥200K+',
      label: 'Raised',
      detail: 'Service and fundraising across KIST initiatives.',
    },
    {
      value: 'Top 5%',
      label: 'Lumiere research',
      detail: 'Cross-cultural emoji semiotics proposal.',
    },
  ],
  thesis:
    'Education, service, research, and product work.',
  focusIntro:
    'ElevateOS, Kiwanis Voice Club of Nippon, KIST Key Club, and research.',
  focusItems: [
    {
      name: 'ElevateOS',
      label: 'Work',
      image: 'elevateos',
      summary:
        'AI-enabled education platform for IB, AP, SAT, and admissions workflows. Focused on tutoring operations, worksheet generation, past-paper simulation, admissions support, and execution tools.',
      bullets: [
        'Keep execution visible.',
        'Make study materials faster to produce.',
        'Build for students, parents, and tutors.',
      ],
      href: elevateosUrl,
    },
    {
      name: 'Kiwanis Voice Club of Nippon',
      label: 'Service',
      image: 'kiwanis',
      summary:
        'Founded the first Voice Club in Japan within the Kiwanis network. Leads youth service and event coordination.',
      bullets: [
        'Make service repeatable.',
        'Treat continuity as a system.',
        'Keep coordination practical.',
      ],
    },
    {
      name: 'Research and writing',
      label: 'Research',
      image: 'portraitAlt',
      summary:
        'Lumiere research on emoji semiotics and cognitive aging.',
      bullets: [
        'Cross-cultural communication and interpretation.',
        'Research written for readers.',
        'Writing that stays clear on a second pass.',
      ],
    },
  ],
  projectsIntro:
    'Projects.',
  projects: [
    {
      name: 'Pulse Manila 2026',
      image: 'pulse',
      summary:
        'Mobile-first convention companion for ASPAC Manila 2026. Built to keep schedules, venues, and updates easy to check on the move. Over 10K+ users.',
      bullets: [
        'Built for speed and low-friction mobile use.',
        'Complement official communication instead of replacing it.',
        'Tested under real convention conditions in Manila.',
      ],
    },
    {
      name: 'Katalyst',
      image: 'katalyst',
      summary:
        'Coordination layer for Kiwanis projects and continuity.',
      bullets: [
        'Keep handoffs clear.',
        'Make continuity visible.',
        'Support cleaner transitions.',
      ],
    },
    {
      name: 'OpenClaw',
      summary:
        'WhatsApp-based execution agent system on VPS, local gateway, and systemd.',
      bullets: [
        'Orchestrate work through simple channels.',
        'Keep execution lightweight.',
        'Use direct automation where it fits.',
      ],
    },
    {
      name: 'thinkcollegelevel.com',
      summary:
        'Personal site for projects and links.',
      bullets: [
        'Projects, writing, and links together.',
        'Simple to read on mobile and desktop.',
        'Holds the work in one place.',
      ],
    },
    {
      name: 'crystalcentury.com',
      summary:
        'WordPress recovery and infrastructure project.',
      bullets: [
        'Focus on stability and security.',
        'Real production handling.',
        'Useful for recovery work.',
      ],
      href: crystalcenturyUrl,
    },
    {
      name: 'Mural Project',
      label: 'Community',
      image: 'mural',
      summary:
        'A collaborative mural project that brought students together around one shared visual build.',
      bullets: [
        'Make the work visible.',
        'Treat collaboration as the point.',
        'Turn a blank wall into a shared outcome.',
      ],
    },
    {
      name: 'Collaboration with Ashinaga Africa Initiative',
      label: 'Community',
      image: 'ashinaga',
      summary:
        'A cross-group collaboration centered on service, exchange, and a shared public moment.',
      bullets: [
        'Work across organizations.',
        'Keep the collaboration concrete.',
        'Build relationships that last beyond the event.',
      ],
    },
  ],
  experienceIntro:
    'Recent roles.',
  experience: [
    {
      org: 'Kiwanis International',
      role: 'Founder and President of Kiwanis Voice Club of Nippon',
      dates: 'Jan 2026 - Present',
      summary:
        'Founded the first Voice Club in Japan within the Kiwanis network. Leads youth service and event coordination.',
    },
    {
      org: 'ElevateOS',
      role: 'Founder',
      dates: 'Jan 2026 - Present',
      summary:
        'Building an AI-enabled education platform for IB, AP, SAT, and admissions support. Oversees product direction and tutoring operations.',
    },
    {
      org: 'Key Club International',
      role: 'Founder and President of KIST Key Club',
      dates: 'Sep 2024 - Present',
      summary:
        'Founded and scaled the school\'s Key Club into a service organization with 5 executives and 40+ members, coordinating projects across health, caregiving, food insecurity, and youth service.',
    },
    {
      org: 'Lumiere Education',
      role: 'Researcher',
      dates: 'Jun 2025 - Present',
      summary:
        'Lumiere Research Inclusion Foundation scholar. Working on a proposal about ambiguous emoji interpretation in Japan and China.',
    },
    {
      org: 'Independent and collaborative research',
      role: 'Research writer',
      dates: 'Jul 2024 - Present',
      summary:
        'Writes on emoji semiotics, cognitive aging, and semiconductor supply-chain resilience.',
    },
    {
      org: 'Think College Level',
      role: 'Publisher',
      dates: 'Jun 2024 - Present',
      summary: 'Publishes the site.',
    },
    {
      org: 'Japan Cancer Society, KIST',
      role: 'President',
      dates: 'Sep 2024 - Present',
      summary:
        'Organized a 10-kilometer walkathon with 500+ participants and raised more than Y50,000.',
    },
    {
      org: 'Recycling Initiative, KIST',
      role: 'President',
      dates: 'Aug 2024 - Present',
      summary:
        'Tripled membership to 60 and introduced Quality Inspector roles that improved recycling efficiency by 40%.',
    },
  ],
  educationIntro:
    'Academic record.',
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
      summary:
        'GPA 3.96 unweighted; predicted IB 45/45; SAT 1550; Duolingo English Test 160; UCAT 2410, Band 2.',
    },
  ],
  credentials: [
    'Claude Code in Action - Anthropic',
    'English Proficiency Certificate (160/Proficient: CEFR C2) - Duolingo English Test',
    'MCB63X: Principles of Biochemistry - HarvardX',
    'Certificate of Distinction in Annual Avogadro Exam - University of Waterloo',
    'Certificate of Excellence (Edexcel IGCSE) - Pearson',
    'Certificate of Achievement Group F Winner - Harvard College Debate Union Regional Rounds Japan 2026',
  ],
  skillsGroups: [
    {
      group: 'Skills',
      items: [
        'Nonprofit Leadership',
        'AI Product Design',
        'EdTech Development',
        'Cross-Cultural Analysis',
        'International Service Coordination',
      ],
    },
    {
      group: 'Leadership',
      items: [
        'Youth Leadership Development',
        'Organizational Strategy',
        'Stakeholder Engagement',
        'Community Program Development',
        'Community Engagement',
        'Community Outreach',
      ],
    },
    {
      group: 'Product and systems',
      items: [
        'Platform Architecture',
        'Start-up Leadership',
        'Product Strategy',
        'Software Development',
        'Coding Experience',
        'AI Product Design',
      ],
    },
    {
      group: 'Research',
      items: [
        'Academic Research',
        'Research Skills',
        'Publications',
        'Generational Differences',
        'Cultural Diversity',
        'Researcher',
      ],
    },
    {
      group: 'Tools and subjects',
      items: [
        'Debate',
        'Microsoft Word',
        'Microsoft Excel',
        'Microsoft Office',
        'Artificial Intelligence (AI)',
        'Stock Market Analysis',
        'Investment Banking',
        'Biomedical Engineering',
        'Medical Devices',
        'Sustainable Agriculture',
        'Circular Economy',
        'Chemistry',
        'Biochemistry',
        'Competitive Analysis',
      ],
    },
    {
      group: 'Languages',
      items: ['English', 'Cantonese'],
    },
  ],
  serviceProjects: [
    {
      name: 'Stand Tall Project',
      summary:
        'Assistive wheelchair add-on designed to reduce intergenerational caregiver burden and improve mobility for elderly users in Japanese care-home settings.',
      bullets: [
        'Identified a practical problem in care-home volunteering.',
        'Built a transfer-oriented solution with a 45-degree angle and spring-based mechanism.',
        'Piloted the concept with care-home partners.',
      ],
    },
    {
      name: 'Mottainai Initiative',
      summary:
        'Food-waste initiative focused on edible but visually rejected produce in Japan. Redirected usable produce into child-focused community use, smoothies, and school outreach.',
      bullets: [
        'Connect waste reduction, education, and local action.',
        'Turn a systems problem into a community-facing project.',
        'Keep the intervention simple enough to actually run.',
      ],
    },
    {
      name: 'Recycling Initiative',
      summary:
        'Tripled membership to 60 and introduced Quality Inspector roles that improved oversight and recycling efficiency by 40%.',
      bullets: [
        'Use structure to increase participation and quality.',
        'Make roles legible enough for members to own them.',
        'Treat operations as something that can be improved, not just managed.',
      ],
    },
    {
      name: 'Japan Cancer Society, KIST',
      summary:
        'Organized a 10-kilometer interschool walkathon with 500+ participants and raised more than Y50,000 for awareness and support.',
      bullets: [
        'Large-scale coordination with visible public impact.',
        'Community service at event scale.',
        'Careful event planning and community outreach matter.',
      ],
    },
  ],
  posts: [
    {
      slug: 'elevateos',
      title: 'ElevateOS',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary:
        'An education platform for tutoring, worksheets, and admissions support.',
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
      summary:
        'A mobile event companion for schedules, venues, and updates.',
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
      summary:
        'A coordination layer for Kiwanis projects and continuity.',
      body: [
        'Katalyst keeps youth service work, project handoffs, and continuity in one place.',
        'It keeps transitions clear and tasks visible between rounds of work.',
        'It supports Kiwanis and related service work without adding overhead.',
      ],
    },
  ],
  contactIntro:
    '',
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
      group: 'Work',
      items: [
        { label: 'Think College Level', href: siteUrl },
        { label: 'GitHub', href: githubUrl },
        { label: 'LinkedIn', href: linkedinUrl },
        { label: 'Wantedly', href: wantedlyUrl },
      ],
    },
    {
      group: 'Personal',
      items: [
        { label: 'Facebook', href: facebookUrl },
        { label: 'Instagram', href: instagramUrl },
      ],
    },
    {
      group: 'Projects',
      items: [
        { label: 'ElevateOS', href: elevateosUrl },
        { label: 'Crystal Century', href: crystalcenturyUrl },
        { label: 'WhatsApp', href: whatsappUrl },
      ],
    },
  ],
};
