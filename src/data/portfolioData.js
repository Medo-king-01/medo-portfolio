import { siteConfig } from '../config/site.config';
import systemScopeImg from '../assets/projects/systemscope.png';
import ipaChartImg from '../assets/projects/ipa-chart.png';
import questionBankImg from '../assets/projects/question-bank.jpg';
import grammarCourseImg from '../assets/projects/grammar-course.png';
import elEusfuruhImg from '../assets/projects/el-eusfuruh.png';
import himcImg from '../assets/projects/himc.png';

export const personalInfo = {
  name: siteConfig.brand.name,
  firstName: 'Mohamed',
  brandName: siteConfig.brand.brandName,
  title: 'MIS Major | AI-Assisted Development',
  location: 'Ras El Bar, Egypt',
  phone: '',
  emails: {
    primary: 'medokingpromax@gmail.com',
    secondary: '',
  },
  summary:
    'Specializing in MIS at the Higher Institute of Management and Computer Science in Ras El Bar. Self-directed learner building practical projects with AI-assisted development.',
  resumeUrl: null,
};

export const socialLinks = {
  github: 'https://github.com/Medo-king-01',
  instagram: 'https://www.instagram.com/kodomedo/',
  facebook: 'https://www.facebook.com/profile.php?id=100092332248057',
  tiktok: 'https://www.tiktok.com/@kodomedo?is_from_webapp=1&sender_device=pc',
  linkedin: null,
  discord: null,
};

export const heroContent = {
  greeting: `Hi, I'm ${siteConfig.brand.name}`,
  titleHighlight: 'AI-Assisted Digital Product Builder',
  rotatingTitles: [
    'AI-Assisted Digital Product Builder',
    'Management Information Systems',
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
  bio: `I'm Mohamed Elsayed Abu Jumaa, also known as <span class="text-[var(--color-4)] text-xl font-black mx-1 tracking-wide uppercase">${siteConfig.brand.name}</span>, specializing in MIS at the Higher Institute of Management and Computer Science in Ras El Bar, Egypt.`,
  techStack: [],
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
    id: 'beginning', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'البداية', en: 'The Beginning' }, motif: 'brackets',
    content: {
      ar: ['بدأت حكايتي في قرية متواضعة بين أهل طيبين. درست الابتدائية في مدرسة الرطمة الابتدائية المشتركة، ثم الإعدادية في مدرسة الخياطة الإعدادية المشتركة، حيث بدأت أتعرف على نفسي وأكوّن صداقات جديدة قبل أن تفرّقنا جائحة كورونا.'],
      en: ['My story began in a modest village among kind people. I attended Al-Ratma Mixed Primary School, followed by Al-Khayata Mixed Preparatory School, where I began to discover myself and make new friends before the coronavirus pandemic separated us.'],
    },
  },
  {
    id: 'turning-point', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'نقطة التحوّل', en: 'The Turning Point' }, motif: 'layers',
    content: {
      ar: ['كانت المرحلة الثانوية نقطة تحوّل حقيقية. افترقت عن معظم من اعتدت وجودهم، وبدأت من جديد، وشعرت لأول مرة أنني بطل قصتي فعلًا.'],
      en: ['Secondary school was a real turning point. I parted ways with most of the people I was used to having around, started again, and for the first time felt that I was truly the protagonist of my own story.'],
    },
  },
  {
    id: 'discovering-abilities', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'اكتشاف قدراتي', en: 'Discovering My Abilities' }, motif: 'layout',
    content: {
      ar: ['درست الحاسب الآلي في مركز التدريب المهني بدمياط، وهناك بدأت أكتشف قدراتي بصورة أوضح. حققت المركز الأول على دفعتي طوال السنوات الثلاث، وكانت من أجمل فترات حياتي لأنني شعرت فيها بقيمة ما أستطيع فعله بجهدي وعقلي.'],
      en: ['I studied computing at the Vocational Training Center in Damietta, where I began to see my abilities more clearly. I ranked first in my cohort throughout all three years. It was one of the best periods of my life because I discovered the value of what I could achieve through my own effort and mind.'],
    },
  },
  {
    id: 'institute', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'المعهد', en: 'The Institute' }, motif: 'motion',
    content: {
      ar: ['أنا اليوم طالب في المعهد العالي للإدارة والحاسب الآلي. لا أعتبر هذه المرحلة مجرد استمرار للدراسة، بل فرصة لزيادة الوعي وتطوير الذات، وأتعلم فيها خارج المنهج بالدورات والتجربة.'],
      en: ['Today I am a student at the Higher Institute of Management and Computer Science. I see this stage as more than a continuation of my studies: it is an opportunity to grow in awareness and develop myself, learning beyond the curriculum through courses and hands-on experience.'],
    },
  },
  {
    id: 'ideas-to-projects', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'من الأفكار إلى المشاريع', en: 'From Ideas to Projects' }, motif: 'cube',
    content: {
      ar: ['صرت صانع محتوى، وأصمم وأبني مشاريعي بمساعدة الذكاء الاصطناعي. لم أعد أكتفي باستخدام الأدوات، بل أحاول فهم إمكاناتها وتحويل الأفكار إلى مشاريع حقيقية.'],
      en: ['I became a content creator and began designing and building my projects with the help of AI. I no longer simply use tools; I try to understand their potential and turn ideas into real projects.'],
    },
  },
  {
    id: 'journey-continues', category: { ar: 'رحلتي', en: 'MY JOURNEY' }, title: { ar: 'الرحلة مستمرة', en: 'The Journey Continues' }, motif: 'orbit',
    content: {
      ar: ['مررت بأيام لم أحبها وأخرى أتمنى لو عادت، واكتشفت في نفسي قدرات لم أكن أعرف بوجودها. **ولا أعتقد أنني وصلت بعد إلى النسخة التي أطمح أن أكون عليها. هذه الرحلة حتى الآن، وما زالت هناك فصول لم تُكتب بعد.**'],
      en: ['I have lived through days I did not enjoy and others I wish would return, and discovered abilities I did not know I had. **I do not believe I have yet become the person I aspire to be. This is the journey so far, and there are still chapters left to write.**'],
    },
  },
];

// Projects structured as unified Case Studies
export const projects = [
  {
    id: 'systemscope',
    number: '01',
    badge: {
      en: 'Desktop Tool',
      ar: 'أداة سطح مكتب',
    },
    title: {
      en: 'SystemScope',
      ar: 'SystemScope',
    },
    description: {
      en: 'A local Windows system intelligence dashboard for monitoring hardware metrics, running diagnostics, and exporting structured reports.',
      ar: 'لوحة تحكم محلية لنظام Windows لمراقبة أداء العتاد وتشخيص الأعطال وتصدير التقارير الاحترافية.',
    },
    caseStudy: {
      problem: {
        en: 'Windows users often have to switch between several scattered built-in utilities just to check CPU, RAM, GPU, network latency, storage usage, and system bottlenecks.',
        ar: 'يضطر مستخدمو Windows للتنقل بين عدة أدوات متفرقة ومعقدة داخل النظام لمراقبة المعالج والذاكرة وكرت الشاشة والشبكة والتخزين واكتشاف أسباب البطء.',
      },
      solution: {
        en: 'Built a modular multi-tab PySide6 interface with background data collection so real-time scans never freeze the UI, paired with a rule-based diagnostics engine, Windows Event Log filtering, HTML/JSON/CSV report exports, and standalone .exe packaging.',
        ar: 'بناء واجهة مقسمة إلى تبويبات واضحة مع فصل عمليات الفحص وجمع القراءات في الخلفية لعدم تجميد الواجهة، ودمج محرك تشخيص يعتمد على القواعد مع فلاتر سجلات Windows وتصدير التقارير بصيغ HTML وJSON وCSV وحزم البرنامج كملف تشغيلي مستقل (.exe).',
      },
    },
    techTags: ['Python', 'PySide6 (Qt6)', 'QtCharts', 'psutil', 'SQLite', 'PyInstaller'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: systemScopeImg,
    links: {
      github: 'https://github.com/Medo-king-01/SystemScope',
      demo: 'https://github.com/Medo-king-01/SystemScope/releases/tag/v1.0',
      demoLabel: {
        en: 'Download Release (v1.0)',
        ar: 'تحميل الإصدار (v1.0)',
      },
    },
    isFlagship: true,
  },
  {
    id: 'ipa-chart',
    number: '02',
    badge: {
      en: 'Educational Web App',
      ar: 'تطبيق ويب تعليمي',
    },
    title: {
      en: 'English IPA Chart',
      ar: 'مخطط IPA الإنجليزي',
    },
    description: {
      en: 'An interactive English phonetics learning platform covering all 40 IPA sounds with audio playback, comparisons, and pronunciation practice.',
      ar: 'منصة تفاعلية لتعلم نطق اللغة الإنجليزية تضم الأصوات الأربعين في نظام IPA مع الصوت والمقارنات والتدريب الذكي.',
    },
    note: { en: 'Part of the English Code educational system.', ar: 'جزء من منظومة English Code التعليمية.' },
    caseStudy: {
      problem: {
        en: 'Arabic-speaking learners struggle to connect abstract International Phonetic Alphabet (IPA) symbols to real English pronunciation and distinguish closely related sounds.',
        ar: 'يواجه متعلمو الإنجليزية صعوبة في ربط الرموز الصوتية الدولية (IPA) بنطقها الفعلي والتمييز السمعي بين الأصوات المتشابهة دون تدريب تفاعلي.',
      },
      solution: {
        en: 'Designed a zero-dependency web app driven by structured JSON datasets, organizing 40 IPA sounds by category and level with instant Web Audio playback, minimal-pair comparison views, memory & quiz modes, microphone speech checks, and localStorage progress.',
        ar: 'فصل المحتوى الصوتي والأمثلة في ملفات JSON منظمة وبناء واجهة خفيفة بدون مكتبات خارجية تدعم التشغيل الصوتي الفوري، ومقارنة الأزواج المتقاربة (Minimal Pairs)، وأوضاع التدريب واختبار النطق بالميكروفون مع حفظ التقدم عبر localStorage.',
      },
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Web Audio API', 'Web Speech API', 'Canvas API', 'JSON'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: ipaChartImg,
    links: {
      github: 'https://github.com/Medo-king-01/english-ipa-chart',
      demo: 'https://medo-king-01.github.io/english-ipa-chart/',
    },
    isFlagship: true,
  },
  {
    id: 'question-bank',
    number: '03',
    badge: {
      en: 'Educational Platform',
      ar: 'منصة تعليمية',
    },
    title: {
      en: 'Question Bank Site',
      ar: 'بنك الأسئلة التفاعلي',
    },
    description: {
      en: 'An interactive academic question bank covering 8 courses and 700+ questions with practice mode, exam simulation, and mistake tracking.',
      ar: 'منصة بنك أسئلة تفاعلي تغطي 8 مقررات وأكثر من 700 سؤال بوضعي التدريب والامتحان مع متابعة الأخطاء.',
    },
    caseStudy: {
      problem: {
        en: 'Reviewing hundreds of exam questions from static PDF files makes studying slow and leaves students with no instant grading, explanations, or way to revisit past mistakes.',
        ar: 'تشتت أسئلة المراجعة داخل ملفات PDF ثابتة يبطئ المذاكرة ويمنع الطالب من التصحيح الفوري أو فهم سبب الإجابة أو حصر الأسئلة التي أخطأ فيها.',
      },
      solution: {
        en: 'Used Python scripts to clean and convert 709 MCQ and True/False questions across 8 courses into structured data, then built a fast RTL web interface featuring instant-feedback study mode, scored exam simulation, explanations, and an automatic mistake-review list.',
        ar: 'استخدام سكربتات Python لتحويل وتنظيم 709 سؤال (اختيار من متعدد وصح/خطأ) عبر 8 مقررات إلى بيانات مهيكلة، وبناء واجهة عربية سريعة توفر وضع المذاكرة بالتصحيح اللحظي والشرح، ووضع الامتحان بحساب الدرجة، وقائمة تلقائية لمراجعة الأخطاء.',
      },
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Python', 'LocalStorage'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: questionBankImg,
    links: {
      github: 'https://github.com/Medo-king-01/question-bank-site',
      demo: 'https://medo-king-01.github.io/question-bank-site/',
    },
    isFlagship: true,
  },
  {
    id: 'grammar-course',
    number: '04',
    badge: {
      en: 'Educational Web App',
      ar: 'تطبيق ويب تعليمي',
    },
    title: {
      en: 'Grammar Course',
      ar: 'موسوعة قواعد الإنجليزية',
    },
    description: {
      en: 'A progressive 7-phase interactive American English grammar encyclopedia tailored for Arabic learners from A1 to C1.',
      ar: 'موسوعة تفاعلية متدرجة من 7 مراحل لتعلم قواعد الإنجليزية الأمريكية للناطقين بالعربية من المستوى A1 حتى C1.',
    },
    note: { en: 'Part of the English Code educational system.', ar: 'جزء من منظومة English Code التعليمية.' },
    caseStudy: {
      problem: {
        en: 'Conventional grammar materials present disconnected rules for rote memorization, making it difficult for Arabic learners to move from understanding rules to producing real sentences.',
        ar: 'تقديم قواعد اللغة الإنجليزية كقوانين جامدة للحفظ الآلي يربك المتعلم العربي ويخلق فجوة بين حفظ القاعدة والقدرة على تكوين جمل صحيحة.',
      },
      solution: {
        en: 'Structured the curriculum into 7 sequential CEFR phases plus reference appendices following an Exposure-to-Production methodology, engineered with lightweight client-side hash routing for instant navigation, interactive checkpoints, and saved progress.',
        ar: 'هيكلة المنهج في 7 مراحل متدرجة مع ملاحق مرجعية وفق منهجية تنتقل من الفهم إلى التطبيق والإنتاج الفعلي، وتنفيذ نظام تنقل فوري بين الفصول بدون إعادة تحميل الصفحة (Hash Routing) مع اختبارات تطبيقية وحفظ تقدم المتعلم.',
      },
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Hash Routing', 'Responsive UI'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: grammarCourseImg,
    links: {
      github: 'https://github.com/Medo-king-01/grammar-course',
      demo: 'https://grammar-course.pages.dev/',
    },
    isFlagship: true,
    isPrivate: true,
  },
  {
    id: 'el-eusfuruh',
    number: '05',
    badge: {
      en: 'Educational Infrastructure',
      ar: 'بنية تعليمية رقمية',
    },
    title: {
      en: 'El-eusfuruh (Web Sparrow)',
      ar: 'عصفورة الويب',
    },
    description: {
      en: 'A scalable Arabic-first platform infrastructure prepared to organize free courses, scholarships, and career roadmaps in Egypt.',
      ar: 'بنية تحتية لمنصة عربية مصممة لتنظيم المصادر المجانية والمنح والمسارات الوظيفية في مصر وجاهزة لاستقبال المحتوى.',
    },
    caseStudy: {
      problem: {
        en: 'Reliable free courses, scholarships, and structured career pathways for learners in Egypt are scattered across platforms, requiring a clean Arabic foundation without fake placeholder clutter.',
        ar: 'تبعثر مصادر الكورسات المجانية والمنح وخرائط المسارات المهنية الموثوقة في مصر، مع الحاجة إلى بنية منصة عربية نظيفة وقابلة للتوسع بدون محتوى وهمي مضلل.',
      },
      solution: {
        en: 'Engineered a modular 5-page RTL architecture using CSS custom-property design tokens (light/dark mode synced via localStorage), keyboard-accessible search overlays (/ and Ctrl+K), reusable roadmap templates, and clear empty-state patterns ready for curated data.',
        ar: 'تصميم بنية معيارية من 5 صفحات وقوالب مسارات قابلة للنسخ بنظام متغيرات CSS يدعم الوضع الفاتح والداكن تلقائيًا، مع نافذة بحث فورية تدعم اختصارات لوحة المفاتيح (/ وCtrl+K)، وفلاتر واجهية وحالات فارغة (Empty States) مدروسة.',
      },
    },
    techTags: ['HTML5', 'CSS3 Variables', 'Vanilla JavaScript', 'RTL UI Design', 'WCAG Accessibility'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: elEusfuruhImg,
    links: {
      github: 'https://github.com/Medo-king-01/El-eusfuruh-wep',
      demo: 'https://el-eusfuruh.pages.dev/',
    },
    isFlagship: true,
  },
  {
    id: 'himc',
    number: '06',
    badge: {
      en: 'Proposed Website Redesign',
      ar: 'تصور مقترح لإعادة تصميم الموقع',
    },
    title: {
      en: 'HIMC — Institute Website',
      ar: 'موقع المعهد العالي (HIMC)',
    },
    description: {
      en: 'A proposed redesign of the Higher Institute of Management and Computer Science website in Ras El Bar, built as a practical project with an institutional identity and a modern user experience. It is not the officially approved website.',
      ar: 'تصور مقترح لإعادة تصميم موقع المعهد العالي للإدارة والحاسب الآلي برأس البر، بُني كمشروع تطبيقي بهوية مؤسسية وتجربة مستخدم عصرية، وليس الموقع الرسمي المعتمد.',
    },
    galleryNote: { en: 'Proposed concept — not the official website.', ar: 'تصور مقترح — ليس الموقع الرسمي.' },
    caseStudy: {
      problem: {
        en: 'Current and prospective students needed a clear, mobile-responsive digital gateway to find admission requirements, academic departments, student care & ICDL services, and portal access instructions without friction.',
        ar: 'حاجة الطلاب الحاليين والجدد إلى بوابة رقمية واضحة ومتجاوبة على الهواتف تجمّع شروط القبول والتنسيق والشعب الأكاديمية وخدمات رعاية الطلاب وخطوات دخول بوابة النتائج والمنصة التعليمية بسهولة.',
      },
      solution: {
        en: 'Re-organized the institutional information architecture into a cohesive multi-page RTL interface featuring light/dark theming, accessible ARIA qualification tabs, interactive FAQ accordions, IntersectionObserver stat counters, and direct links to official student portals.',
        ar: 'إعادة هيكلة المحتوى المؤسسي في موقع متعدد الصفحات يدعم الوضع الليلي والنهاري، مع تبويبات تفاعلية للمؤهلات المقبولة، وقسم أسئلة شائعة قابل للطي (Accordion)، وعدّادات إحصائية متحركة عند التمرير، وربط واضح بالبوابة الإلكترونية والمنصة التعليمية.',
      },
    },
    techTags: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'UI/UX Redesign', 'ARIA Accessibility'],
    techTagsLabel: {
      en: 'Built with AI assistance',
      ar: 'بُني بمساعدة الذكاء الاصطناعي',
    },
    image: himcImg,
    links: {
      github: null,
      demo: 'https://himc.pages.dev/',
    },
    isFlagship: true,
  },
];

export const education = {
  degree: "Bachelor's in Information Systems",
  institution: 'Higher Institute 51 – Ras El Bar',
  duration: '2024 – Present',
  description: 'Coursework includes: Programming Fundamentals, Data Structures, Database Systems, Web Development, System Analysis & Design, Software Engineering.',
};

export const resumeUrl = null;
