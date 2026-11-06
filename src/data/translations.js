// Translation data for English and Arabic
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      story: 'My Story',
      skills: 'What I Do Well',
      process: 'How I Build',
      howIWork: 'How I Work',
      projects: 'Projects',
      certifications: 'Certifications',
      beyondTech: 'Beyond Technology',
      aiToolkit: 'My AI Toolkit',
      perspective: 'My Perspective',
      leadership: 'Journey',
      softSkills: 'Soft Skills',
      contact: 'Contact',
    },

    certifications: {
      badge: 'CONTINUOUS LEARNING',
      heading: 'Certifications & Credentials',
      description: 'A selection of certificates reflecting my technical and professional learning journey.',
      totalLabel: 'Certificates earned',
      fieldsLabel: 'Areas of learning',
      wheelScrollHint: 'SCROLL TO ROTATE THE CERTIFICATE WHEEL',
      wheelClickHint: 'Select a certificate to see its details',
      openDetails: 'Open certificate details',
      closeDetails: 'Close certificate details',
      categoryLabel: 'LEARNING PATH',
      certificateCount: 'certificate',
      certificatesCount: 'certificates',
      view: 'View certificate (PDF)',
      verify: 'Verify online',
      all: 'All',
      gridView: 'Grid View',
      wheelView: '3D Wheel',
      prev: 'Previous',
      next: 'Next',
    },

    // Preloader
    preloader: {
      brandHandle: 'MEDO_DEV',
      loading: 'Loading portfolio...',
    },

    // Hero
    hero: {
      greeting: "Hi, I'm MEDO",
      titleHighlight: 'MIS Major | AI-Assisted Development',
      rotatingTitles: [
        'Business Information Systems Student',
        'Learning Through Practice and Experimentation',
        'Building Projects with AI',
        'Attentive to Detail',
      ],
      subtitle: 'Welcome to my world, where I observe more than I speak, learn and build what’s useful, and care about the smallest details.',
      ctaPrimary: { text: 'View My Work', href: '#projects' },
      ctaSecondary: { text: 'Contact Me', href: '#contact' },
      ctaResume: { text: 'Download Resume', href: null },
      ariaLabel: 'MEDO talking video',
      resumeModal: {
        title: '{brandName} / RESUME',
        download: 'Download',
        newTab: 'New tab',
        close: 'Close resume viewer',
        unavailable: 'Resume PDF not available yet.',
        addFile: 'Add the existing CV file at {href} to enable the preview.',
        checking: 'Checking resume file...',
      },
      tvBrand: 'TV',
    },

    // About
    about: {
      heading: 'About Me',
      paragraphs: [
        "I'm Mohamed Elsayed Abu Jumaa, known as MEDO, a Business Information Systems (MIS) student at the Higher Institute of Management and Computer Science in Ras El Bar. I ranked first in my cohort for three consecutive years in computing at the Vocational Training Center in Damietta. I learn independently and through practice: I experiment, solve problems, and turn ideas into usable projects.",
        'I work with AI-assisted development (Vibe Coding): I define the idea and requirements, guide the tools during implementation, review the results and request fixes and improvements, then test the product on different devices and screen sizes. I believe it is not enough for a project to work: it should be tested, reviewed, and improved, and I see every project as a chance to learn something new.',
        'My work includes the English Code educational system and the SystemScope application, and I currently work in freelance services and content creation.',
        'I believe what you can accomplish matters more than certificates.',
      ],
      motto: 'Capability before certificates.',
      techStack: [],
      altText: 'MEDO — Business Information Systems | AI-Assisted Development',
    },

    // Skills Content (Process / How I Build)
    skillsContent: {
      badge: 'HOW I BUILD',
      heading: 'How I Build',
      description: 'I focus on turning ideas into practical products. I define requirements, guide AI tools during development, review the output, identify issues, and test the result before considering the work complete. I value transparency: AI assists with code generation, while I focus on direction, requirements, review, testing, and improvement. <strong class="text-[var(--color-2)]">Capability &gt; Certificate</strong>',
      stageLabel: 'Stage {number}',
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
    },

    // Technical Skills (Personal Skills)
    technicalSkills: {
      badge: 'MY SKILLS',
      heading: 'What I Do Well',
      groups: [
        {
          title: 'Practical Skills',
          items: [
            { title: 'AI-Assisted Development', description: 'Turning ideas into working digital products by guiding AI tools and reviewing their output.' },
            { title: 'Requirements Definition', description: 'Defining project goals and functional requirements.' },
            { title: 'Testing', description: 'Testing functionality and user experience, and checking responsiveness across devices and screen sizes.' },
            { title: 'Design', description: 'AI-assisted graphic design, motion graphics, and the basics of Adobe InDesign.' },
            { title: 'Educational Content', description: 'Writing educational scripts and planning learning series and books.' },
            { title: 'Digital Fundamentals', description: 'ICDL, cybersecurity, digital marketing, Git and GitHub.' },
          ],
        },
        {
          title: 'My Qualities',
          items: [
            { title: 'Problem Solving', description: 'Breaking a problem into smaller parts to reach a practical solution.' },
            { title: 'Continuous Learning', description: 'Learning tools and best practices through self-study and experimentation.' },
            { title: 'Clear Communication', description: 'Writing clear project documentation and explaining technical concepts simply.' },
            { title: 'Time Management', description: 'Balancing studies, personal projects, and skill building.' },
          ],
        },
      ],
    },

    // Services
    services: {
      heading: 'What I Do',
      cards: [
        {
          title: 'AI-Assisted Development',
          description: 'Guiding AI tools to turn ideas into working digital products, reviewing generated code, and iterating on improvements.',
          icon: 'ai',
        },
        {
          title: 'Requirements & Review',
          description: 'Defining clear project requirements and reviewing implementations to identify issues early.',
          icon: 'design',
        },
        {
          title: 'Product Testing',
          description: 'Testing functionality, user experience, and responsiveness across devices and screen sizes.',
          icon: 'web',
        },
        {
          title: 'Educational Content',
          description: 'Creating educational scripts, planning learning series, and designing educational materials.',
          icon: 'education',
        },
      ],
    },

    // Projects
    projects: {
      heading: 'Welcome to my project gallery',
      scrollGallery: 'SCROLL TO EXPLORE THE PROJECT ORBIT',
      selectProject: 'Select a project to explore its case study',
      openCaseStudy: 'Open case study',
      closeCaseStudy: 'Close case study',
      previousProject: 'Previous project',
      nextProject: 'Next project',
      caseStudyBadge: 'Case Study',
      problemLabel: 'The Problem & Idea',
      solutionLabel: 'Solution & Approach',
      techStackLabel: 'Built with',
      linksLabel: 'Preview Links',
      viewCode: 'GitHub Repo',
      liveDemo: 'Live Demo',
      privateRepo: 'Private Repo on GitHub',
      previewImage: 'Preview Screenshot',
      closePreview: 'Close screenshot preview',
      privatePreviewTitle: 'Private Repository',
      privatePreviewSubtitle: 'Access restricted — private source & preview',
    },

    // Leadership / Beyond
    leadership: {
      eyebrow: 'MY JOURNEY',
      heading: 'My Journey So Far',
      subheading: 'From humble beginnings to building ideas.',
      progressLabel: 'JOURNEY',
      scrollCue: 'SCROLL TO EXPLORE',
      chapterLabel: 'MOMENT',
      exploreLabel: 'Explore projects',
    },

    // Soft Skills
    softSkills: {
      badge: 'CORE COMPETENCIES',
      heading: 'Professional Soft Skills',
      subheading: 'Essential traits that make me an effective builder, problem-solver, and communicator.',
    },

    // My Story
    story: {
      heading: 'My Story',
      content: `My relationship with technology started in internet cafés, where I spent long hours playing with friends. I wasn’t looking for a field to study, but curiosity pulled me in: how do these machines work, and how is everything on the screen built?

What kept me hooked is that this field never stands still. There’s always something new to try.

To me, technology isn’t knowledge to memorize. It’s an idea you test until it becomes something that works in the real world.`,
    },

    // How I Work
    howIWork: {
      heading: 'How I Work',
      content: `I enjoy the process of testing, learning, and continuously improving what I build.

I pay close attention to details and believe that a project should not stop at simply working. It should be tested, reviewed, and refined to become better.

I see every project as an opportunity to learn something new and improve my approach.`,
    },

    // Beyond Technology
    beyondTech: {
      heading: 'Beyond Technology',
      content: `These interests give me different ways to explore creativity, enjoy new perspectives, and take a break from technical work.`,
      interests: [
        { label: 'Drawing', icon: 'drawing' },
        { label: 'Swimming', icon: 'swimming' },
        { label: 'Design', icon: 'design' },
        { label: 'Anime', icon: 'anime' },
        { label: 'Foreign Films', icon: 'film' },
      ],
    },

    // My AI Toolkit
    aiToolkit: {
      heading: 'My AI Toolkit',
      description: 'AI tools are part of my development workflow. I use them to explore ideas, assist with implementation, solve problems, and improve projects.',
      tools: [
        'Claude',
        'ChatGPT',
        'Gemini',
        'DeepSeek',
        'arena-agent',
        'deepSeek Harness',
        'freelLM',
      ],
    },

    // My Perspective
    perspective: {
      heading: 'My Perspective',
      content: `I do not want to live the way others do simply because it is the usual path. I want to understand why I live, what I do, and the true value of what I build.

I do not adopt an idea merely because it is popular, and I do not reject it merely because it is unfamiliar. I understand it first.

The goal is not to escape the world; I have the freedom to choose my place in it.`,
      highlight: '“I do not want to be better than everyone else; I only want to avoid spending my life trying to be someone else.”',
      quoteAuthor: 'MEDO',
    },

    // Contact
    contact: {
      heading: 'Get In Touch',
      subheading: 'Have a project in mind or just want to say hello?',
      form: {
        firstName: 'First Name',
        firstNamePlaceholder: 'Mohamed',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Your last name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: "Tell me what you're thinking...",
        send: 'Send Message',
        sending: 'Sending...',
        sent: 'Continue in your email app.',
        required: 'This field is required',
        emailInvalid: 'Please enter a valid email',
        note: 'Usually replies via email',
        mailtoHint: 'Sending will open your email app so you can complete and send the message.',
      },
      directEmail: 'Or email directly:',
      leftLabel: "Let's connect",
      leftHeading: "Let's build something meaningful.",
      leftDescription: 'Have an idea or a project, or just want to connect? Get in touch.',
      available: 'AVAILABLE FOR NEW PROJECTS',
      socialsLabel: 'Follow & Connect',
      formHeaderLabel: 'Start a conversation',
      formHeaderTitle: 'Tell me about your idea.',
      formHeaderDescription: "Fill in the details below and I'll get back to you.",
    },

    // Footer
    footer: {
      copyright: '© {year} {name}. All rights reserved.',
      builtWith: 'Built with React, Vite, and Tailwind CSS.',
      backToTop: 'Back to top',
      profession: 'Business Information Systems | Building digital products with AI',
    },

    // Language switcher
    language: {
      en: 'English',
      ar: 'العربية',
      switchTo: 'Switch to {language}',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      close: 'Close',
      menu: 'Menu',
    },
  },

  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      story: 'قصتي',
      skills: 'ما أجيده',
      process: 'كيف أبني',
      howIWork: 'أسلوبي في العمل',
      projects: 'المشاريع',
      certifications: 'الشهادات',
      beyondTech: 'اهتماماتي',
      aiToolkit: 'أدواتي في العمل',
      perspective: 'فلسفتي',
      leadership: 'مسيرتي',
      softSkills: 'مهارات شخصية',
      contact: 'تواصل',
    },

    certifications: {
      badge: 'التعلم المستمر',
      heading: 'الشهادات والاعتمادات المهنية',
      description: 'نظرة على أبرز الشهادات التي حصلت عليها خلال رحلتي في التعلم والتطور التقني والمهني.',
      totalLabel: 'شهادة مكتسبة',
      fieldsLabel: 'مجالات للتعلّم',
      wheelScrollHint: 'مرّر لأعلى أو لأسفل لتدوير عجلة الشهادات',
      wheelClickHint: 'اضغط على أي شهادة لعرض تفاصيلها',
      openDetails: 'فتح تفاصيل الشهادة',
      closeDetails: 'إغلاق تفاصيل الشهادة',
      categoryLabel: 'مسار التعلّم',
      certificateCount: 'شهادة',
      certificatesCount: 'شهادات',
      view: 'عرض الشهادة (PDF)',
      verify: 'التحقق من الشهادة',
      all: 'الكل',
      gridView: 'عرض البطاقات',
      wheelView: 'العجلة ثلاثية الأبعاد',
      prev: 'السابق',
      next: 'التالي',
    },

    // Preloader
    preloader: {
      brandHandle: 'MEDO_DEV',
      loading: 'جاري تحميل المعرض...',
    },

    // Hero
    hero: {
      greeting: 'مرحبًا، أنا MEDO',
      titleHighlight: 'تخصص نظم معلومات إدارية | تطوير بمساعدة الذكاء الاصطناعي',
      rotatingTitles: [
        'طالب نظم معلومات الأعمال',
        'متعلّم بالممارسة والتجربة',
        'أبني مشاريع بالذكاء الاصطناعي',
        'مهتم بالتفاصيل',
      ],
      subtitle: 'أهلًا بك في عالمي، حيث أراقب أكثر مما أتكلم، وأتعلم وأنفذ ما يفيد، وأعتني بأدق التفاصيل.',
      ctaPrimary: { text: 'استعرض أعمالي', href: '#projects' },
      ctaSecondary: { text: 'تواصل معي', href: '#contact' },
      ctaResume: { text: 'تحميل السيرة الذاتية', href: null },
      ariaLabel: 'فيديو تعريفي لـ MEDO',
      resumeModal: {
        title: '{brandName} / السيرة الذاتية',
        download: 'تحميل',
        newTab: 'تبويب جديد',
        close: 'إغلاق عارض السيرة الذاتية',
        unavailable: 'ملف السيرة الذاتية غير متاح حالياً.',
        addFile: 'أضف ملف السيرة الذاتية في {href} لتفعيل المعاينة.',
        checking: 'جاري التحقق من ملف السيرة الذاتية...',
      },
      tvBrand: 'TV',
    },

    // About
    about: {
      heading: 'من أنا',
      paragraphs: [
        'أنا محمد السيد أبو جمعة، المعروف باسم MEDO، طالب في تخصص نظم معلومات الأعمال (MIS) بالمعهد العالي للإدارة والحاسب الآلي برأس البر. حصلت على المركز الأول على دفعتي ثلاث سنوات متتالية في تخصص الحاسب الآلي بمركز التدريب المهني بدمياط. أتعلّم ذاتيًا وبالممارسة: أجرّب، وأحل المشكلات، وأحوّل الأفكار إلى مشاريع قابلة للاستخدام.',
        'أعمل بأسلوب التطوير بمساعدة الذكاء الاصطناعي (Vibe Coding): أحدد الفكرة والمتطلبات، وأوجّه الأدوات أثناء التنفيذ، وأراجع النتائج وأطلب إصلاح الأخطاء والتحسينات، ثم أختبر المنتج على أجهزة ومقاسات شاشات مختلفة. أؤمن أن المشروع لا يكفي أن يعمل، بل يجب أن يُختبر ويُراجع ويتحسن، وأعتبر كل مشروع فرصة لتعلم شيء جديد.',
        'من أعمالي نظام English Code التعليمي وتطبيق SystemScope، وأعمل حاليًا في الخدمات الحرة وصناعة المحتوى.',
        'أؤمن أن ما تستطيع إنجازه أهم من الشهادات.',
      ],
      motto: 'القدرة قبل الشهادة.',
      techStack: [],
      altText: 'MEDO — نظم معلومات الأعمال | التطوير بمساعدة الذكاء الاصطناعي',
    },

    // Skills Content (Process / How I Build)
    skillsContent: {
      badge: 'كيف أبني',
      heading: 'كيف أبني',
      description: 'أركز على تحويل الأفكار إلى منتجات عملية. أحدد المتطلبات، وأوجّه أدوات الذكاء الاصطناعي أثناء التطوير، وأراجع النتائج، وأكتشف المشكلات، وأختبر المنتج قبل اعتباره مكتملًا. أحرص على الشفافية: يساعدني الذكاء الاصطناعي في كتابة الكود، بينما أركز على تحديد الاتجاه والمتطلبات والمراجعة والاختبار والتحسين. <strong class="text-[var(--color-2)]">القدرة &gt; الشهادة</strong>',
      stageLabel: 'مرحلة {number}',
      cards: [
        {
          number: '01',
          title: 'التطوير بمساعدة الذكاء الاصطناعي / Vibe Coding',
          text: 'تحويل الأفكار إلى منتجات رقمية قابلة للعمل من خلال توجيه أدوات الذكاء الاصطناعي. مراجعة الكود الناتج وطلب إصلاح الأخطاء والتحسينات.',
          keywords: ['توجيه الذكاء الاصطناعي', 'مراجعة الكود', 'تحسين تكراري'],
          icon: 'understand',
        },
        {
          number: '02',
          title: 'تحديد المتطلبات والمراجعة',
          text: 'تحديد أهداف المشروع ومتطلباته الوظيفية. مراجعة التنفيذ واكتشاف المشكلات.',
          keywords: ['المتطلبات', 'المراجعة', 'اكتشاف المشكلات'],
          icon: 'design',
        },
        {
          number: '03',
          title: 'اختبار المنتجات',
          text: 'اختبار الوظائف وتجربة المستخدم. التحقق من الاستجابة على الأجهزة ومقاسات الشاشات المختلفة.',
          keywords: ['اختبار الوظائف', 'اختبار تجربة المستخدم', 'اختبار الاستجابة'],
          icon: 'build',
        },
        {
          number: '04',
          title: 'المهارات الإبداعية والبصرية',
          text: 'تصميم الهوية البصرية والتصميم الجرافيكي. الموشن جرافيك. Adobe InDesign — أساسيات.',
          keywords: ['التصميم الجرافيكي', 'الموشن جرافيك', 'InDesign'],
          icon: 'refine',
        },
      ],
    },

    // Technical Skills (Personal Skills)
    technicalSkills: {
      badge: 'مهاراتي وصفاتي',
      heading: 'ما أجيده',
      groups: [
        {
          title: 'مهارات عملية',
          items: [
            { title: 'التطوير بمساعدة الذكاء الاصطناعي', description: 'تحويل الأفكار إلى منتجات رقمية تعمل، بتوجيه أدوات الذكاء الاصطناعي ومراجعة نتائجها.' },
            { title: 'تحديد المتطلبات', description: 'تحديد أهداف المشروع ومتطلباته الوظيفية.' },
            { title: 'الاختبار', description: 'اختبار الوظائف وتجربة المستخدم، والتحقق من الاستجابة على الأجهزة ومقاسات الشاشات المختلفة.' },
            { title: 'التصميم', description: 'التصميم الجرافيكي بالذكاء الاصطناعي، الموشن جرافيك، وأساسيات Adobe InDesign.' },
            { title: 'المحتوى التعليمي', description: 'كتابة السكربتات التعليمية والتخطيط للسلاسل والكتب.' },
            { title: 'أساسيات رقمية', description: 'ICDL، الأمن السيبراني، التسويق الرقمي، Git وGitHub.' },
          ],
        },
        {
          title: 'صفاتي',
          items: [
            { title: 'حل المشكلات', description: 'تفكيك المشكلة إلى أجزاء صغيرة للوصول إلى حل عملي.' },
            { title: 'التعلّم المستمر', description: 'تعلّم الأدوات وأفضل الممارسات بالدراسة الذاتية والتجربة.' },
            { title: 'التواصل الواضح', description: 'كتابة توثيق واضح للمشاريع، وشرح المفاهيم التقنية بأسلوب مبسّط.' },
            { title: 'إدارة الوقت', description: 'الموازنة بين الدراسة والمشاريع الشخصية وبناء المهارات.' },
          ],
        },
      ],
    },

    // Services
    services: {
      heading: 'ما أقوم به',
      cards: [
        {
          title: 'التطوير بمساعدة الذكاء الاصطناعي',
          description: 'توجيه أدوات الذكاء الاصطناعي لتحويل الأفكار إلى منتجات رقمية قابلة للعمل، مراجعة الكود الناتج، والتكرار للتحسين.',
          icon: 'ai',
        },
        {
          title: 'تحديد المتطلبات والمراجعة',
          description: 'تحديد متطلبات المشروع بوضوح ومراجعة التنفيذ لاكتشاف المشكلات مبكراً.',
          icon: 'design',
        },
        {
          title: 'اختبار المنتجات',
          description: 'اختبار الوظائف وتجربة المستخدم، والتحقق من الاستجابة على الأجهزة ومقاسات الشاشات المختلفة.',
          icon: 'web',
        },
        {
          title: 'المحتوى التعليمي',
          description: 'إنشاء السكربتات التعليمية، والتخطيط للسلاسل التعليمية، وتصميم المواد التعليمية.',
          icon: 'education',
        },
      ],
    },

    // Projects
    projects: {
      heading: 'أهلًا بك في معرض مشاريعي',
      scrollGallery: 'مرّر لاستكشاف المشاريع في المدار',
      selectProject: 'اختر مشروعاً لاستعراض دراسة الحالة',
      openCaseStudy: 'فتح دراسة الحالة',
      closeCaseStudy: 'إغلاق دراسة الحالة',
      previousProject: 'المشروع السابق',
      nextProject: 'المشروع التالي',
      caseStudyBadge: 'دراسة حالة (Case Study)',
      problemLabel: 'المشكلة أو الفكرة',
      solutionLabel: 'طريقة الحل وتجاوز العقبات',
      techStackLabel: 'بُني باستخدام',
      linksLabel: 'روابط المعاينة',
      viewCode: 'مستودع GitHub',
      liveDemo: 'معاينة مباشرة (Live Demo)',
      privateRepo: 'مستودع خاص على GitHub',
      previewImage: 'تكبير اللقطة',
      closePreview: 'إغلاق معاينة الصورة',
      privatePreviewTitle: 'مستودع خاص',
      privatePreviewSubtitle: 'الكود المصدري والمعاينة ضمن مستودع خاص',
    },

    // Leadership / Beyond
    leadership: {
      eyebrow: 'رحلة التطور',
      heading: 'رحلتي حتى الآن',
      subheading: 'من بدايات متواضعة إلى بناء الأفكار.',
      progressLabel: 'المسار',
      scrollCue: 'مرّر للاستكشاف',
      chapterLabel: 'محطة',
      exploreLabel: 'استكشاف المشاريع',
    },

    // Soft Skills
    softSkills: {
      badge: 'الكفاءات الأساسية',
      heading: 'المهارات الشخصية الاحترافية',
      subheading: 'صفات أساسية تعزّز قدرتي على البناء وحل المشكلات والتواصل الفعّال.',
    },

    // My Story
    story: {
      heading: 'قصتي',
      content: `بدأت علاقتي بالتكنولوجيا في مقاهي الإنترنت، حيث كنت ألعب مع أصدقائي ساعات طويلة. لم أكن أبحث عن مجال أدرسه، لكن الفضول جرّني: كيف تعمل هذه الأجهزة؟ وكيف يُبنى ما أراه على الشاشة؟

ما شدّني بعد ذلك هو أن هذا المجال لا يتوقف عن التغيّر، فهناك دائمًا شيء جديد أجرّبه.

بالنسبة لي، التكنولوجيا ليست معرفة تُحفظ، بل فكرة تُجرَّب حتى تصبح شيئًا يعمل في الواقع.`,
    },

    // How I Work
    howIWork: {
      heading: 'أسلوبي في العمل',
      content: `أستمتع بعملية الاختبار والتعلم والتحسين المستمر لما أقوم ببنائه.

أهتم بالتفاصيل الدقيقة، وأؤمن بأن المشروع لا ينبغي أن يتوقف عند مجرد كونه يعمل، بل يجب اختباره ومراجعته وتطويره ليصبح أفضل.

أعتبر كل مشروع فرصة لتعلم شيء جديد وتحسين أسلوبي في العمل.`,
    },

    // Beyond Technology
    beyondTech: {
      heading: 'اهتماماتي',
      content: `تمنحني هذه الاهتمامات مساحات مختلفة للاستمتاع بالإبداع واكتشاف وجهات نظر جديدة والابتعاد قليلًا عن العمل التقني.`,
      interests: [
        { label: 'الرسم', icon: 'drawing' },
        { label: 'السباحة', icon: 'swimming' },
        { label: 'التصميم', icon: 'design' },
        { label: 'الأنمي', icon: 'anime' },
        { label: 'الأفلام الأجنبية', icon: 'film' },
      ],
    },

    // My AI Toolkit
    aiToolkit: {
      heading: 'أدواتي في العمل',
      description: 'أدوات الذكاء الاصطناعي جزء من أسلوب عملي في التطوير. أستخدمها لاستكشاف الأفكار والمساعدة في التنفيذ وحل المشكلات وتحسين المشاريع.',
      tools: [
        'Claude',
        'ChatGPT',
        'Gemini',
        'DeepSeek',
        'arena-agent',
        'deepSeek Harness',
        'freelLM',
      ],
    },

    // My Perspective
    perspective: {
      heading: 'فلسفتي',
      content: `لا أريد أن أعيش بالطريقة التي يعيش بها الآخرون لمجرد أنها الطريقة المعتادة. أريد أن أفهم لماذا أعيش، وماذا أفعل، وما القيمة الحقيقية لما أبنيه.

لا أتبنّى فكرة لمجرد أنها شائعة، ولا أرفضها لمجرد أنها غريبة. أفهمها أولًا.

ليس المطلوب أن أهرب من العالم، فأنا أملك حرية اختيار موقعي فيه.`,
      highlight: '«لا أريد أن أكون أفضل من الجميع، أريد فقط ألا أقضي حياتي في محاولة أن أكون شخصًا آخر.»',
      quoteAuthor: 'MEDO',
    },

    // Contact
    contact: {
      heading: 'تواصل معي',
      subheading: 'لديك مشروع في ذهنك أو تريد فقط التحية؟',
      form: {
        firstName: 'الاسم الأول',
        firstNamePlaceholder: 'محمد',
        lastName: 'الاسم الأخير',
        lastNamePlaceholder: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'your@email.com',
        message: 'الرسالة',
        messagePlaceholder: 'أخبرني بتفاصيل فكرتك أو رسالتك...',
        send: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        sent: 'أكمل الرسالة في تطبيق البريد.',
        required: 'هذا الحقل مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        note: 'عادةً أرد عبر البريد الإلكتروني',
        mailtoHint: 'سيفتح الإرسال تطبيق البريد لديك لإكمال إرسال الرسالة.',
      },
      directEmail: 'أو راسلني مباشرة:',
      leftLabel: 'لنتواصل',
      leftHeading: 'لنبني شيئًا ذا معنى.',
      leftDescription: 'هل لديك فكرة أو مشروع، أو تريد فقط التواصل؟ راسلني.',
      available: 'متاح للمشاريع الجديدة',
      socialsLabel: 'حساباتي ومنصات التواصل',
      formHeaderLabel: 'ابدأ محادثة',
      formHeaderTitle: 'أخبرني عن فكرتك.',
      formHeaderDescription: 'املأ التفاصيل أدناه وسأتواصل معك قريباً.',
    },

    // Footer
    footer: {
      copyright: '© {year} {name}. جميع الحقوق محفوظة.',
      builtWith: 'مبني بـ React، Vite، و Tailwind CSS.',
      backToTop: 'العودة للأعلى',
      profession: 'تخصص نظم معلومات الاعمال | أبني منتجات رقمية بالذكاء الاصطناعي',
    },

    // Language switcher
    language: {
      en: 'English',
      ar: 'العربية',
      switchTo: 'التبديل إلى {language}',
    },

    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      close: 'إغلاق',
      menu: 'القائمة',
    },
  },
};

// Language configuration
export const languageConfig = {
  defaultLanguage: 'en',
  supportedLanguages: [
    { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  ],
};

// Helper to get translation with fallback
export function t(language, path) {
  const keys = path.split('.');
  let result = translations[language] || translations.en;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      result = translations.en;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return path;
        }
      }
      break;
    }
  }

  return result;
}
