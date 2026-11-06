// Certificate files are served from public/certificates, independently of the app bundle.
export const certifications = [
  {
    id: 'security',
    icon: '🔒',
    title: { en: 'Cybersecurity & Networking', ar: 'الأمن السيبراني والشبكات' },
    items: [
      {
        title: "CS50's Introduction to Cybersecurity",
        issuer: 'Harvard University',
        description: { en: 'An introduction to protecting systems and data from digital threats.', ar: 'مقدمة في حماية الأنظمة والبيانات من التهديدات الرقمية.' },
        file: 'cs50-cybersecurity.pdf',
        verification: 'https://cs50.harvard.edu/certificates/c0cbb0b0-df27-49e1-a805-193adcd1a909',
      },
      {
        title: 'Ethical Hacking', issuer: 'Mahara-Tech / ITI',
        description: { en: 'An introduction to ethical hacking and identifying security vulnerabilities.', ar: 'مقدمة في الاختراق الأخلاقي واكتشاف الثغرات الأمنية.' },
        file: 'ethical-hacking.pdf',
      },
      {
        title: 'Introduction to Network Security', issuer: 'Mahara-Tech / ITI',
        description: { en: 'The fundamentals of protecting computer networks from security threats.', ar: 'أساسيات حماية شبكات الحاسوب من التهديدات الأمنية.' },
        file: 'network-security.pdf',
      },
      {
        title: 'Computer Network Fundamentals', issuer: 'Mahara-Tech / ITI',
        description: { en: 'Core concepts and infrastructure of computer networks.', ar: 'المفاهيم الأساسية والبنية التحتية لشبكات الحاسوب.' },
        file: 'network-fundamentals.pdf',
      },
      {
        title: 'Implementation of Computer Network Fundamentals', issuer: 'Mahara-Tech / ITI',
        description: { en: 'Putting computer networking fundamentals into practice.', ar: 'التطبيق العملي للمفاهيم الأساسية لشبكات الحاسوب.' },
        file: 'network-implementation.pdf',
      },
      {
        title: 'Cybersecurity For All', issuer: 'Mahara-Tech / ITI (EG CERT)',
        description: { en: 'Digital safety fundamentals for protecting accounts and personal data.', ar: 'أساسيات السلامة الرقمية وحماية الحسابات والبيانات الشخصية.' },
        file: 'cybersecurity-for-all.pdf',
      },
    ],
  },
  {
    id: 'marketing',
    icon: '📈',
    title: { en: 'Digital Marketing & Business', ar: 'التسويق الرقمي والأعمال' },
    items: [
      {
        title: 'Digital Marketing Certified', issuer: 'HubSpot Academy',
        description: { en: 'Digital marketing strategies, inbound marketing, SEO, and advertising.', ar: 'استراتيجيات التسويق الرقمي والتسويق الوارد وتحسين محركات البحث والإعلانات.' },
        file: 'digital-marketing.pdf',
      },
      {
        title: 'Social Media Certified', issuer: 'HubSpot Academy',
        description: { en: 'Social media strategy and creating engaging content.', ar: 'استراتيجيات التواصل الاجتماعي وصناعة المحتوى التفاعلي.' },
        file: 'social-media-marketing.pdf',
      },
      {
        title: 'AI for Digital Marketing: Applications in Online Business', issuer: 'Mahara-Tech / ITI',
        description: { en: 'Applications of AI in digital marketing and online business.', ar: 'تطبيقات الذكاء الاصطناعي في التسويق الرقمي والأعمال عبر الإنترنت.' },
        file: 'ai-digital-marketing.pdf',
      },
      {
        title: 'Start Your Career in Digital Marketing', issuer: 'Mahara-Tech / ITI',
        description: { en: 'The first steps toward a career in digital marketing.', ar: 'الخطوات الأساسية للبدء في مجال التسويق الرقمي.' },
        file: 'digital-marketing-career.pdf',
      },
    ],
  },
  {
    id: 'computer-skills',
    icon: '💻',
    title: { en: 'Computer & Essential Skills', ar: 'الحاسوب والمهارات الأساسية' },
    items: [
      {
        title: 'International Computer Driving Licence (ICDL Base)', issuer: 'Edraak / إدراك',
        description: { en: 'Computer essentials, word processing, spreadsheets, and the internet.', ar: 'أساسيات الحاسوب ومعالجة النصوص وجداول البيانات والإنترنت.' },
        file: 'icdl.pdf',
      },
    ],
  },
];
