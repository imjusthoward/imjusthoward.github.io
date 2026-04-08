const siteUrl = 'https://thinkcollegelevel.com';
const cambridgeUrl = 'https://www.cam.ac.uk/';
const elevateosUrl = 'https://elevateos.org';
const crystalcenturyUrl = 'https://crystalcentury.com';
const pulseUrl = 'https://pulse-kiwanis-309064718968.us-west1.run.app/';
const linkedinUrl = 'https://www.linkedin.com/in/howardchan2008/';
const linkedinLegacyUrl = 'https://www.linkedin.com/in/chakhanghoward-chan/';
const githubUrl = 'https://github.com/imjusthoward/';
const wantedlyUrl = 'https://www.wantedly.com/id/chakhang_chan';
const facebookUrl = 'https://www.facebook.com/imjusthoward';
const instagramUrl = 'https://www.instagram.com/imjusthoward/';
const whatsappUrl = 'https://wa.me/85293442294';
const emailUrl = 'mailto:chakhanghowardchan2008@gmail.com';

export const site = {
  name: 'Think College Level',
  author: 'Howard Chan',
  fullName: 'Chak Hang (Howard) Chan',
  url: siteUrl,
  title: 'Think College Level',
  tagline:
    'Cambridge (HSPS) Offer Holder | President of Kiwanis Voice Club of Nippon | CEO of ElevateOS | Lumiere Scholar',
  description:
    "Howard Chan's profile, awards, projects, research, service, and contact links.",
  location: 'Sumida-ku, Tokyo, Japan',
  logo: {
    src: '/assets/media/hc-logo.png',
    alt: 'HC logo',
  },
  heroHeadline: 'Howard Chan',
  homeSummary:
    'Tokyo-based, multilingual systems builder focused on service leadership, research, and product execution. Incoming HSPS offer holder at Peterhouse, University of Cambridge.',
  aboutParagraphs: [
    'I am Chak Hang (Howard) Chan, a Tokyo-based builder interested in politics, international systems, AI, service, and entrepreneurship.',
    'I build projects at the intersection of technology and real-world coordination: Kiwanis Voice Club of Nippon, Pulse Manila 2026, ElevateOS, and related systems work.',
    'My research has focused on cross-cultural communication and cognitive systems, including a top-5% Lumiere project scheduled for publication in NHSJS.',
    'Long term, I want to build technology that works in real social and international settings, not only in theory.',
  ],
  currentWork: [
    {
      title: 'ElevateOS',
      meta: 'Product',
      summary: 'AI-enabled education platform serving about 100 students and tutors in Japan.',
      href: elevateosUrl,
    },
    {
      title: 'Kiwanis Voice Club of Nippon',
      meta: 'Service',
      summary: 'First Voice Club representing Japan; coordinates youth service, alumni mentorship, and continuity.',
      href: '/portfolio/#kiwanis-voice-club-of-nippon',
    },
    {
      title: 'Pulse Manila 2026',
      meta: 'Project',
      summary: 'Mobile event companion for schedules, venues, and live updates.',
      href: pulseUrl,
    },
  ],
  education: [
    {
      title: 'Peterhouse, University of Cambridge',
      meta: 'BA (Hons) · HSPS · Offer holder, 2026',
      summary: 'Official offer dated 2026-01-28; conditions: 42 points overall, 7,7,6 in three Higher Level subjects, and IELTS 8.0.',
      href: cambridgeUrl,
    },
    {
      title: 'K. International School Tokyo',
      meta: 'IB Diploma · Predicted 45/45',
      summary: 'Biology HL, English A HL, Chemistry HL, Mathematics AA SL, Japanese ab initio SL, Economics SL; TOK A, EE B, core 3; SAT 1550, DET 160, UCAT 2410 Band 2.',
      href: '/awards/#academic-distinction',
    },
  ],
  experience: [
    {
      title: 'Founder and President, Kiwanis Voice Club of Nippon',
      meta: 'Kiwanis International · Jan 2026 - Present',
      summary: 'Founded the first Voice Club representing Japan and coordinates youth service, alumni mentorship, continuity planning, and stakeholder alignment.',
      href: '/portfolio/#kiwanis-voice-club-of-nippon',
    },
    {
      title: 'Founder and CEO, ElevateOS',
      meta: 'Jan 2026 - Present',
      summary: 'Leading the product and execution layer for an AI-enabled education platform used by about 100 students and tutors in Japan.',
      href: elevateosUrl,
    },
    {
      title: 'Founder and Immediate Past President, KIST Key Club',
      meta: 'K. International School Tokyo · Sep 2024 - Present',
      summary: 'Built the club to 40+ members and 5 executives, with more than ¥200,000 raised through service work.',
      href: '/portfolio/#kist-key-club',
    },
    {
      title: 'Researcher, Lumiere Education',
      meta: 'Jun 2025 - Present',
      summary: 'Cross-cultural emoji semiotics and cognitive aging research; top-5% Lumiere work scheduled for NHSJS publication.',
      href: '/writing/#publications',
    },
    {
      title: 'Founder and Editor-in-Chief, Think College Level',
      meta: 'Jun 2024 - Present',
      summary: 'Portfolio and writing site for projects, research, and links.',
      href: siteUrl,
    },
    {
      title: 'President, Japan Cancer Society, KIST',
      meta: 'Sep 2024 - Present',
      summary: 'Organized a 10-kilometer walkathon with 500+ participants and raised more than ¥50,000; also led a 1,000+ item clothing drive.',
      href: '/portfolio/#japan-cancer-society-kist',
    },
    {
      title: 'President, Recycling Initiative, KIST',
      meta: 'Aug 2024 - Present',
      summary: 'Tripled membership to 60 and introduced Quality Inspector roles that improved oversight and recycling efficiency by 40%.',
      href: '/portfolio/#recycling-initiative-kist',
    },
  ],
  service: [
    {
      title: 'Salvation Army SKY Family and Child Development Centre',
      meta: 'Service',
      summary: 'Gardening and pest removal with SEN children, plus day-to-day support work.',
    },
    {
      title: 'HKSKH Lok Man Kwok Fong Hin Comprehensive Service Centre',
      meta: 'Service',
      summary: 'Board-game activities with dementia patients and a five-day Tokyo tour plan tailored to participant ability.',
    },
    {
      title: 'Shirahige Nursing Home, Sumida-ku',
      meta: 'Service',
      summary: 'Meals, mobility support, and recreational activities with residents.',
    },
    {
      title: 'Tokyo / Japan Red Cross',
      meta: 'Service',
      summary: 'Wheelchair sports event leadership and disability-centered volunteer work.',
    },
  ],
  skills: [
    {
      title: 'Languages',
      meta: 'Spoken',
      summary: 'English, Cantonese, Mandarin, Japanese.',
    },
    {
      title: 'Stack',
      meta: 'Tools',
      summary: 'TypeScript, Next.js / React, PostgreSQL / SQL, Git / GitHub, Python, Prisma, NextAuth, OpenAI, Stripe, Cloud Run, Figma, Notion, Google Workspace.',
    },
  ],
  awards: [
    {
      group: 'Academic distinction',
      items: [
        {
          title: 'Peterhouse, University of Cambridge offer',
          meta: '2026',
          summary: 'BA (Hons) HSPS offer dated 2026-01-28; conditions: 42 points overall, 7,7,6 in three Higher Level subjects, and IELTS 8.0.',
          href: cambridgeUrl,
        },
        {
          title: 'Predicted IB 45/45',
          meta: 'K. International School Tokyo',
          summary: 'Official transcript shows six subjects predicted at 7, with TOK A, EE B, and core points 3.',
          href: '/about/#education',
        },
        {
          title: 'SAT 1550 · DET 160 · UCAT 2410 Band 2',
          meta: 'Admissions testing',
          summary: 'Strong testing profile across language and admissions exams.',
          href: '/about/#education',
        },
        {
          title: 'KIST Honor Roll and Recognition',
          meta: '2023–2025',
          summary: 'Honor Roll across 2023–2025, Certificate of Recognition 2023–2024, and International Research Olympiad Honor Roll 2025.',
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
          title: 'Founder and Immediate Past President, KIST Key Club',
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
          title: 'Emoji semiotics preprint',
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
        {
          title: 'Semiconductor supply-chain concept paper',
          meta: 'Research',
          summary: 'Concept paper on supply-chain resilience using big data analytics and quantum-enhanced blockchain.',
          href: '/writing/#publications',
        },
      ],
    },
    {
      group: 'Certifications and courses',
      items: [
        {
          title: 'Certificate of Distinction in the Annual Avogadro Exam',
          meta: 'Academic',
          summary: 'Annual chemistry competition recognition.',
        },
        {
          title: 'Edexcel IGCSE Certificate of Excellence',
          meta: 'Academic',
          summary: 'Excellence recognition across IGCSE results.',
        },
        {
          title: 'HarvardX MCB63X Principles of Biochemistry',
          meta: 'Course',
          summary: 'Biochemistry coursework completed through HarvardX.',
        },
        {
          title: 'Johns Hopkins CTY AP Biology',
          meta: 'Course',
          summary: 'Advanced biology coursework completed through Johns Hopkins CTY.',
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
          summary: 'AI-enabled education platform for IB, AP, SAT, and admissions workflows serving about 100 students and tutors in Japan.',
          href: elevateosUrl,
          id: 'elevateos',
        },
        {
          title: 'Pulse Manila 2026',
          meta: 'Active',
          summary: 'Mobile convention companion for schedules, venues, and live updates under ASPAC Manila 2026 conditions.',
          href: pulseUrl,
          id: 'pulse-manila-2026',
        },
        {
          title: 'Katalyst',
          meta: 'Active',
          summary: 'Long-term continuity and coordination layer for youth-led service networks.',
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
          summary: '10-kilometer interschool walkathon with 500+ participants and donation drives.',
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
          summary: 'Live e-commerce platform supporting over US$50,000 in transactions across Europe and the United States.',
          href: crystalcenturyUrl,
          id: 'crystal-century',
        },
        {
          title: 'Think College Level',
          meta: 'Portfolio hub',
          summary: 'Personal site for projects, research, writing, and contact links.',
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
      summary: 'Top-5% Lumiere project scheduled for publication in NHSJS. DOI: 10.20944/preprints202509.0729.v1.',
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
      summary: 'An education platform for tutoring, worksheets, and admissions support for about 100 students and tutors in Japan.',
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
      summary: 'A mobile event companion for schedules, venues, and live updates.',
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
      summary: 'A coordination layer for youth service projects and continuity.',
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
    { label: 'LinkedIn (previous)', href: linkedinLegacyUrl },
    { label: 'GitHub', href: githubUrl },
    { label: 'Wantedly', href: wantedlyUrl },
    { label: 'Email', href: emailUrl },
    { label: 'Facebook', href: facebookUrl },
    { label: 'Instagram', href: instagramUrl },
    { label: 'ElevateOS', href: elevateosUrl },
    { label: 'Pulse Manila 2026', href: pulseUrl },
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
        { label: 'LinkedIn (previous)', href: linkedinLegacyUrl },
        { label: 'GitHub', href: githubUrl },
        { label: 'Wantedly', href: wantedlyUrl },
        { label: 'Email', href: emailUrl },
      ],
    },
    {
      group: 'Live / Projects',
      items: [
        { label: 'ElevateOS', href: elevateosUrl },
        { label: 'Pulse Manila 2026', href: pulseUrl },
        { label: 'Crystal Century', href: crystalcenturyUrl },
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
  ],
};
