import { siteConfig } from '../config/site.config';

export const personalInfo = {
  name: siteConfig.brand.name,
  firstName: 'Mohamed',
  brandName: siteConfig.brand.brandName,
  title: 'MIS Student | AI-Assisted Development',
  location: 'Ras El Bar, Egypt',
  phone: '',
  emails: {
    primary: 'medokingpromax@gmail.com',
    secondary: '',
  },
  summary:
    'MIS Student at Higher Institute of Management and Computer Science in Ras El Bar. Self-directed learner building practical projects with AI-assisted development.',
  resumeUrl: null,
};

export const socialLinks = {
  github: 'https://github.com/Medo-king-01',
  linkedin: null,
  instagram: null,
  tiktok: null,
  discord: null,
};

export const heroContent = {
  greeting: `Hi, I'm ${siteConfig.brand.name}`,
  titleHighlight: 'AI-Assisted Digital Product Builder',
  rotatingTitles: [
    'AI-Assisted Digital Product Builder',
    'Information Systems Student',
    'Frontend Developer',
    'Web Developer',
  ],
  subtitle:
    'Building useful digital products through code, AI, and creative problem-solving.',
  ctaPrimary: { text: 'View My Work', href: '#projects' },
  ctaSecondary: {
    text: 'Contact Me',
    href: '#contact',
  },
  ctaResume: { text: 'Download Resume', href: null },
};

export const aboutContent = {
  heading: 'About Me',
  bio: `I'm Mohamed Elsayed Abu Jumaa, also known as <span class="text-slate-900 text-xl font-black mx-1 tracking-wide uppercase">${siteConfig.brand.name}</span>, an MIS student at the Higher Institute of Management and Computer Science in Ras El Bar, Egypt.`,
  techStack: [],
};

export const skillsContent = {
  badge: 'HOW I BUILD',
  heading: 'How I Build',
  description:
    'I focus on turning ideas into practical products. I define requirements, guide AI tools during development, review the output, identify issues, and test the result before considering the work complete.',
  cards: [
    {
      number: '01',
      title: 'AI-Assisted Development / Vibe Coding',
      text: 'Turning ideas into working digital products by guiding AI tools. Reviewing generated code and requesting corrections and improvements.',
      keywords: ['AI Guidance', 'Code Review', 'Iterative Improvement'],
      icon: 'understand',
    },
    {
      number: '02',
      title: 'Requirements Definition & Review',
      text: 'Defining project goals and functional requirements. Reviewing implementations and identifying problems.',
      keywords: ['Requirements', 'Review', 'Problem Identification'],
      icon: 'design',
    },
    {
      number: '03',
      title: 'Product Testing',
      text: 'Testing functionality and user experience. Checking responsiveness across different devices and screen sizes.',
      keywords: ['Functionality Testing', 'UX Testing', 'Responsive Testing'],
      icon: 'build',
    },
    {
      number: '04',
      title: 'Creative & Visual Skills',
      text: 'Visual identity and graphic design. Motion graphics. Adobe InDesign — basic knowledge.',
      keywords: ['Graphic Design', 'Motion Graphics', 'InDesign'],
      icon: 'refine',
    },
  ],
};

export const technicalSkills = {
  categories: [
    {
      title: 'AI-Assisted Development / Vibe Coding',
      skills: [
        'Turning ideas into working digital products by guiding AI tools',
        'Reviewing generated code and requesting corrections and improvements',
      ],
    },
    {
      title: 'Requirements Definition & Review',
      skills: [
        'Defining project goals and functional requirements',
        'Reviewing implementations and identifying problems',
      ],
    },
    {
      title: 'Product Testing',
      skills: [
        'Testing functionality and user experience',
        'Checking responsiveness across different devices and screen sizes',
      ],
    },
    {
      title: 'Creative & Visual Skills',
      skills: [
        'Visual identity and graphic design',
        'Motion graphics',
        'Adobe InDesign — basic knowledge',
      ],
    },
    {
      title: 'Educational Content Creation',
      skills: [
        'Writing educational scripts',
        'Planning educational series and books',
      ],
    },
    {
      title: 'Digital Fundamentals',
      skills: [
        'ICDL',
        'Cybersecurity fundamentals',
        'Digital marketing fundamentals',
        'Git and GitHub basics',
      ],
    },
  ],
};

export const leadershipList = [
  {
    category: 'EDUCATION',
    title: 'MIS Student',
    description: 'Bachelor\'s program at Higher Institute of Management and Computer Science, Ras El Bar. Focus on Management Information Systems.',
    label: '2024 – Present',
    motif: 'brackets'
  },
  {
    category: 'SELF-DIRECTED',
    title: 'Independent Learning & Building',
    description: 'Consistently building projects, following tutorials, and studying documentation to expand practical development skills beyond coursework. Using AI tools to accelerate learning and implementation.',
    label: 'ONGOING',
    motif: 'layers'
  }
];

export const softSkillsList = [
  { name: 'Problem Solving', icon: 'problem-solving', desc: 'Breaking down complex problems into manageable parts to find practical solutions.' },
  { name: 'Continuous Learning', icon: 'adaptability', desc: 'Actively learning new frameworks, tools, and best practices through self-study and AI assistance.' },
  { name: 'Communication', icon: 'communication', desc: 'Writing clear code comments, documentation, and explaining technical concepts to peers.' },
  { name: 'Time Management', icon: 'time', desc: 'Balancing academic requirements with personal project development and skill building.' }
];

// Projects with verified GitHub repositories
export const projects = [
  {
    id: 'systemscope',
    number: '01',
    badge: 'Desktop Tool',
    title: {
      en: 'SystemScope',
      ar: 'SystemScope',
    },
    description: {
      en: 'A Windows desktop application for system monitoring and diagnostics. It provides hardware and performance information, including CPU, RAM, GPU, network, and storage monitoring, with diagnostic information and report exports.',
      ar: 'تطبيق سطح مكتب لنظام Windows لمراقبة أداء الجهاز وتشخيص بعض المشكلات. يعرض معلومات الأجهزة والأداء، بما في ذلك المعالج والذاكرة وكرت الشاشة والشبكة والتخزين، مع إمكانية تصدير التقارير.',
    },
    techTags: ['Python', 'PySide6', 'SQLite', 'psutil', 'QtCharts'],
    techTagsLabel: 'Built with AI assistance using',
    image: null,
    links: {
      github: 'https://github.com/Medo-king-01/SystemScope',
      demo: null,
    },
    isFlagship: true,
  },
  {
    id: 'ipa-chart',
    number: '02',
    badge: 'Educational Web App',
    title: {
      en: 'English IPA Chart',
      ar: 'مخطط IPA الإنجليزي',
    },
    description: {
      en: 'An interactive English pronunciation learning platform featuring the 40 IPA sounds, audio demonstrations, sound comparisons, and interactive practice activities.',
      ar: 'منصة تفاعلية لتعلم نطق اللغة الإنجليزية، تضم الأصوات الأربعين في نظام IPA، مع أمثلة صوتية ومقارنات بين الأصوات وأنشطة تدريبية تفاعلية.',
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Web Audio API', 'Web Speech API'],
    techTagsLabel: 'Built with AI assistance using',
    image: null,
    links: {
      github: 'https://github.com/Medo-king-01/english-ipa-chart',
      demo: 'https://medo-king-01.github.io/english-ipa-chart/',
    },
    isFlagship: true,
  },
  {
    id: 'question-bank',
    number: '03',
    badge: 'Educational Platform',
    title: {
      en: 'Question Bank Site',
      ar: 'بنك الأسئلة التفاعلي',
    },
    description: {
      en: 'An educational question bank covering multiple courses, with practice and exam modes, instant grading, explanations, and progress tracking.',
      ar: 'موقع بنك أسئلة تعليمي يغطي عدة مقررات، ويوفر وضع التدريب والامتحانات، والتصحيح الفوري، وشرح الإجابات، ومتابعة النتائج والتقدم.',
    },
    techTags: [],
    techTagsLabel: 'Built with AI assistance using',
    image: null,
    links: {
      github: 'https://github.com/Medo-king-01/question-bank-site',
      demo: null,
    },
    isFlagship: true,
  },
  {
    id: 'grammar-course',
    number: '04',
    badge: 'Educational Web App',
    title: {
      en: 'Grammar Course',
      ar: 'دورة القواعد',
    },
    description: {
      en: 'An interactive American English grammar learning website with structured lessons, practice tests, and learning progress features.',
      ar: 'موقع تفاعلي لتعلم قواعد اللغة الإنجليزية الأمريكية، يضم دروسًا منظمة واختبارات تدريبية وميزات لمتابعة التقدم في التعلم.',
    },
    techTags: [],
    techTagsLabel: 'Built with AI assistance using',
    image: null,
    links: {
      github: 'https://github.com/Medo-king-01/grammar-course',
      demo: null,
    },
    isFlagship: true,
    isPrivate: true,
  },
  {
    id: 'el-eusfuruh',
    number: '05',
    badge: 'Educational Infrastructure',
    title: {
      en: 'El-eusfuruh (Web Sparrow)',
      ar: 'عصفورة الويب',
    },
    description: {
      en: 'An Arabic-first platform foundation designed to organize educational resources, learning opportunities, and career pathways in Egypt. The platform\'s infrastructure and interface are prepared to receive curated content.',
      ar: 'بنية منصة عربية تهدف إلى تنظيم الموارد التعليمية والفرص التعليمية والمسارات المهنية في مصر. تم تجهيز البنية الأساسية والواجهة لاستقبال محتوى تعليمي موثوق ومنظم، لكن لا ينبغي وصف المنصة بأنها تحتوي بالفعل على مكتبة موارد مكتملة.',
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    techTagsLabel: 'Built with AI assistance using',
    image: null,
    links: {
      github: 'https://github.com/Medo-king-01/El-eusfuruh-wep',
      demo: null,
    },
    isFlagship: true,
  },
];

export const education = {
  degree: 'Bachelor\'s in Information Systems',
  institution: 'Higher Institute 51 – Ras El Bar',
  duration: '2024 – Present',
  description: 'Coursework includes: Programming Fundamentals, Data Structures, Database Systems, Web Development, System Analysis & Design, Software Engineering.',
};

export const resumeUrl = null;