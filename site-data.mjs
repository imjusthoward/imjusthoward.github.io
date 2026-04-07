const elevateosUrl = 'https://elevateos.org';
const crystalcenturyUrl = 'https://crystalcentury.com';
const linkedinUrl = 'https://www.linkedin.com/in/howardchan2008/';
const githubUrl = 'https://github.com/imjusthoward';

export const site = {
  name: 'Think College Level',
  author: 'Howard Chan',
  url: 'https://thinkcollegelevel.com',
  title: 'Think College Level',
  tagline: 'A personal blog and portfolio.',
  description: 'A personal blog and portfolio.',
  identityLine:
    'Cambridge HSPS offer holder | Tokyo',
  location: 'Sumida-ku, Tokyo, Japan',
  linkedin: linkedinUrl,
  github: githubUrl,
  elevateos: elevateosUrl,
  crystalcentury: crystalcenturyUrl,
  heroHeadline:
    'Howard Chan',
  heroLede:
    'Cambridge HSPS offer holder in Tokyo.',
  heroNotes: [
    'Cambridge HSPS',
    'Tokyo',
    'Service',
    'Writing',
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
    'Reduce friction, keep handoffs clear, and make systems easier to run.',
  focusIntro:
    'ElevateOS is the main project.',
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
        'Founded the first Voice Club representing Japan within the Kiwanis network. Focused on youth service, continuity, and event coordination across health, education, caregiving, and community work.',
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
        'Lumiere research on emoji semiotics and cognitive aging, plus writing on clarity and systems.',
      bullets: [
        'Cross-cultural communication and interpretation.',
        'Research written for readers.',
        'Writing that stays clear on a second pass.',
      ],
    },
  ],
  projectsIntro:
    'Products, systems, and collaborations.',
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
        'Long-term systems layer for continuity, coordination, and information flow across youth-led organizations. Built to strengthen institutional memory, cleaner handovers, and more durable operating structure.',
      bullets: [
        'Reduce fragmentation across leadership transitions.',
        'Make coordination less dependent on any one student leader.',
        'Deploy first inside an existing tutoring network in Japan.',
      ],
    },
    {
      name: 'OpenClaw',
      summary:
        'WhatsApp-based execution agent system running on VPS, local gateway, and systemd. Focused on delegation, automation, and controlled execution.',
      bullets: [
        'Agent orchestration for real operations.',
        'Useful where lightweight channel-based execution works best.',
        'Represents infra and systems thinking at the technical layer.',
      ],
    },
    {
      name: 'thinkcollegelevel.com',
      summary:
        'Personal site for writing and projects.',
      bullets: [
        'Writing, portfolio, and links in one place.',
        'Simple to read on mobile and desktop.',
        'Keeps writing and projects together.',
      ],
    },
    {
      name: 'crystalcentury.com',
      summary:
        'Live WordPress recovery and infrastructure project. Focused on stability, security, and operational resilience.',
      bullets: [
        'Real production handling, not just prototypes.',
        'Shows the difference between surface polish and site reliability.',
        'Useful as a reference point for operational recovery work.',
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
        'Founded the first Voice Club representing Japan within the Kiwanis network. Focused on youth service, continuity, and stakeholder coordination across health, education, caregiving, and community resilience.',
    },
    {
      org: 'ElevateOS',
      role: 'Founder',
      dates: 'Jan 2026 - Present',
      summary:
        'Building an AI-enabled education platform for IB, AP, SAT, and admissions workflows. Focused on tutoring operations, worksheet generation, past-paper simulation, admissions support, and execution infrastructure.',
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
        'Selected for the Lumiere Research Inclusion Foundation with full scholarship support. Authored a research proposal on culturally and generationally mediated interpretation of ambiguous emojis in Japan and China.',
    },
    {
      org: 'Independent and collaborative research',
      role: 'Research writer',
      dates: 'Jul 2024 - Present',
      summary:
        'Authored work on emoji semiotics and cognitive aging, and drafted a concept paper on semiconductor supply-chain resilience using big data analytics and blockchain.',
    },
    {
      org: 'Think College Level',
      role: 'Publisher',
      dates: 'Jun 2024 - Present',
      summary:
        'Maintains a personal site for writing and project notes.',
    },
    {
      org: 'Japan Cancer Society, KIST',
      role: 'President',
      dates: 'Sep 2024 - Present',
      summary:
        'Organized a 10-kilometer interschool walkathon with 500+ participants and raised more than Y50,000 for awareness and support.',
    },
    {
      org: 'Recycling Initiative, KIST',
      role: 'President',
      dates: 'Aug 2024 - Present',
      summary:
        'Tripled membership to 60 and introduced Quality Inspector roles that improved oversight and recycling efficiency by 40%.',
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
      slug: 'starting-from-clarity',
      title: 'Starting from clarity',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary:
        'Clear writing makes the first read count.',
      body: [
        'Clarity is not decoration. It is the difference between a reader finding the point or leaving before it lands.',
        'A strong opening sentence gives the piece a job. Every later line should sharpen the claim, add evidence, or move the reader forward.',
        'If a draft starts repeating itself, the idea is already there. Cut the extra sentences and let the remaining ones do more work.',
      ],
    },
    {
      slug: 'keeping-the-edit-path-short',
      title: 'Keeping the edit path short',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary:
        'Fast edit paths keep good ideas alive.',
      body: [
        'The shorter the path from thought to published page, the more often the thought survives.',
        'Long workflows make good ideas stale. Short workflows make revision routine.',
        'Publish quickly, revise cleanly, and keep the next change close enough that it can actually happen.',
      ],
    },
    {
      slug: 'publishing-notes-instead-of-noise',
      title: 'Notes worth keeping',
      date: 'April 6, 2026',
      dateIso: '2026-04-06',
      readTime: '4 min read',
      summary:
        'An archive should still make sense later.',
      body: [
        'Publish only what adds information.',
        'Use clear titles and short notes so the archive stays readable.',
        'A page is worth keeping when it adds something the title does not already say.',
      ],
    },
  ],
  contactIntro:
    'LinkedIn is the fastest route.',
  contactLinks: [
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'GitHub', href: githubUrl },
    { label: 'ElevateOS', href: elevateosUrl },
    { label: 'Crystal Century', href: crystalcenturyUrl },
  ],
};
