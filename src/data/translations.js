// Translation data for English and Arabic
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      story: 'My Story',
      skills: 'Skills',
      howIWork: 'How I Work',
      projects: 'Projects',
      beyondTech: 'Beyond Technology',
      aiToolkit: 'My AI Toolkit',
      perspective: 'My Perspective',
      leadership: 'Leadership',
      softSkills: 'Soft Skills',
      contact: 'Contact',
    },

    // Preloader
    preloader: {
      brandHandle: 'MEDO_DEV',
      loading: 'Loading portfolio...',
    },

    // Hero
    hero: {
      greeting: "Hi, I'm MEDO",
      titleHighlight: 'MIS Student | AI-Assisted Development',
      rotatingTitles: [
        'MIS Student',
        'AI-Assisted Developer',
        'Self-Directed Learner',
      ],
      subtitle: 'Self-directed MIS student building practical projects with AI-assisted development.',
      ctaPrimary: { text: 'View My Work', href: '#projects' },
      ctaSecondary: { text: 'Contact Me', href: '#contact' },
      ctaResume: { text: 'Download Resume', href: null },
      ariaLabel: 'MEDO talking video',
      // Resume modal
      resumeModal: {
        title: '{brandName} / RESUME',
        download: 'Download',
        newTab: 'New tab',
        close: 'Close resume viewer',
        unavailable: 'Resume PDF not available yet.',
        addFile: 'Add the existing CV file at <code>{href}</code> to enable the preview.',
        checking: 'Checking resume file...',
      },
      // TV brand
      tvBrand: 'TV',
    },

    // About
    about: {
      heading: 'About Me',
      bio: `I'm Mohamed Elsayed Abu Jumaa, also known as <span class="text-slate-900 text-xl font-black mx-1 tracking-wide uppercase">MEDO</span>, an MIS student at the Higher Institute of Management and Computer Science in Ras El Bar, Egypt. My learning journey is self-directed and hands-on, built around experimenting, solving problems, and turning ideas into practical projects. I use an AI-assisted development approach, often called Vibe Coding. I define the idea and requirements, guide AI tools during implementation, review the generated results, identify issues, request improvements, and test the final product across different devices and screen sizes. I believe in demonstrating real capabilities through practical work. <strong class="text-amber-700">Capability > Certificate</strong>`,
      techStack: [],
      altText: 'MEDO — MIS Student | AI-Assisted Development',
    },

    // Skills Content (Process / How I Build)
    skillsContent: {
      badge: 'HOW I BUILD',
      heading: 'How I Build',
      description: 'I focus on turning ideas into practical products. I define requirements, guide AI tools during development, review the output, identify issues, and test the result before considering the work complete. I value transparency: AI assists with code generation, while I focus on direction, requirements, review, testing, and improvement. <strong class="text-amber-700">Capability > Certificate</strong>',
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
      badge: 'PERSONAL SKILLS',
      heading: 'Personal Skills',
      description: 'These are my personal capabilities — not technologies used in projects. Project technology stacks are shown on each project card.',
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
      heading: 'Featured Projects',
      subheading: 'A selection of digital products built to solve real problems.',
      description: '',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      privateRepo: 'Private Repository',
    },

    // Leadership / Beyond
    leadership: {
      eyebrow: 'MY JOURNEY',
      heading: 'Learning & Growth',
      subheading: 'Education and self-directed development that shapes how I build.',
      progressLabel: 'JOURNEY',
      scrollCue: 'SCROLL TO EXPLORE',
      chapterLabel: 'CHAPTER',
      exploreLabel: 'Explore projects',
    },

    // Soft Skills
    softSkills: {
      badge: 'CORE COMPETENCIES',
      heading: 'Professional Soft Skills',
      subheading: 'Essential traits that make me an effective engineer, coordinator, and communicator.',
    },

    // My Story
    story: {
      heading: 'My Story',
      content: `My interest in technology started with computer games at internet cafés, where I used to spend time playing with friends. That early curiosity gradually grew into a deeper interest in computers and the digital world.

What keeps me interested in this field is its constant evolution. I enjoy building things, experimenting with new ideas, exploring possibilities, and learning continuously.

For me, technology is not just about writing code. It is about curiosity, discovery, and turning ideas into something real.`,
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
      content: `Outside technology, I enjoy drawing, swimming, and design. I also enjoy watching anime and foreign films.

These interests give me different ways to explore creativity, enjoy new perspectives, and take a break from technical work.`,
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
        'AI Agents',
      ],
    },

    // My Perspective
    perspective: {
      heading: 'My Perspective',
      content: `I believe that certificates alone do not define a person's abilities. What matters more is practical experience, continuous learning, and the ability to turn knowledge into something useful.

My long-term goal is simple: to become someone who can make a real and meaningful contribution through what I learn and build.`,
      highlight: 'Capability > Certificate',
    },

    // Contact
    contact: {
      heading: 'Get In Touch',
      subheading: 'Have a project in mind or just want to say hello?',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        sent: 'Message sent! I\'ll get back to you soon.',
        required: 'This field is required',
        emailInvalid: 'Please enter a valid email',
        note: 'Usually replies via email',
      },
      directEmail: 'Or email directly:',
      leftLabel: "Let's connect",
      leftHeading: "Let's build something meaningful.",
      leftDescription: 'Have an idea, a project, or just want to connect? Feel free to reach out.',
      available: 'AVAILABLE FOR NEW PROJECTS',
      formHeaderLabel: 'Start a conversation',
      formHeaderTitle: 'Tell me about your idea.',
      formHeaderDescription: 'Fill in the details below and I\'ll get back to you.',
    },

    // Footer
    footer: {
      copyright: '© {year} {name}. All rights reserved.',
      builtWith: 'Built with React, Vite, and Tailwind CSS.',
      backToTop: 'Back to top',
      profession: 'MIS Student | AI-Assisted Development',
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
    },
  },

  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      story: 'قصتي',
      skills: 'المهارات',
      howIWork: 'أسلوبي في العمل',
      projects: 'المشاريع',
      beyondTech: 'اهتماماتي',
      aiToolkit: 'أدواتي في العمل',
      perspective: 'فلسفتي',
      leadership: 'القيادة',
      softSkills: 'مهارات شخصية',
      contact: 'تواصل',
    },

    // Preloader
    preloader: {
      brandHandle: 'MEDO_DEV',
      loading: 'جاري تحميل المعرض...',
    },

    // Hero
    hero: {
      greeting: 'مرحباً، أنا MEDO',
      titleHighlight: 'طالب نظم معلومات | تطوير بمساعدة الذكاء الاصطناعي',
      rotatingTitles: [
        'طالب نظم معلومات',
        'مطور بمساعدة الذكاء الاصطناعي',
        'متعلم ذاتي',
      ],
      subtitle: 'طالب نظم معلومات ذاتي التعلم يبني مشاريع عملية بتطوير بمساعدة الذكاء الاصطناعي.',
      ctaPrimary: { text: 'أعمالي', href: '#projects' },
      ctaSecondary: { text: 'تواصل معي', href: '#contact' },
      ctaResume: { text: 'تحميل السيرة الذاتية', href: null },
      ariaLabel: 'فيديو تعريفي لـ MEDO',
      // Resume modal
      resumeModal: {
        title: '{brandName} / السيرة الذاتية',
        download: 'تحميل',
        newTab: 'تبويب جديد',
        close: 'إغلاق عارض السيرة الذاتية',
        unavailable: 'ملف السيرة الذاتية غير متاح حالياً.',
        addFile: 'أضف ملف السيرة الذاتية في <code>{href}</code> لتفعيل المعاينة.',
        checking: 'جاري التحقق من ملف السيرة الذاتية...',
      },
      // TV brand
      tvBrand: 'TV',
    },

    // About
    about: {
      heading: 'من أنا',
      bio: `أنا محمد السيد أبو جمعة، المعروف باسم <span class="text-slate-900 text-xl font-black mx-1 tracking-wide uppercase">MEDO</span>، طالب نظم ومعلومات إدارية (MIS) في المعهد العالي للإدارة والحاسب الآلي برأس البر، مصر. رحلتي في التعلم ذاتية وعملية، وتعتمد على التجربة وحل المشكلات وتحويل الأفكار إلى مشاريع وتطبيقات قابلة للاستخدام. أعتمد على أسلوب التطوير بمساعدة الذكاء الاصطناعي (AI-Assisted Development)، أو ما يُعرف باسم Vibe Coding. أبدأ بتحديد الفكرة والمتطلبات، ثم أوجّه أدوات الذكاء الاصطناعي أثناء التنفيذ، وأراجع النتائج، وأحدد الأخطاء، وأطلب تحسينها، ثم أختبر المنتج على الأجهزة ومقاسات الشاشات المختلفة. أؤمن بأن القدرة العملية وما يستطيع الشخص إنجازه أهم من مجرد الشهادات. <strong class="text-amber-700">القدرة > الشهادة</strong>`,
      techStack: [],
      altText: 'MEDO — طالب نظم معلومات | تطوير بمساعدة الذكاء الاصطناعي',
    },

    // Skills Content (Process / How I Build)
    skillsContent: {
      badge: 'كيف أعمل',
      heading: 'كيف أعمل',
      description: 'أركز على تحويل الأفكار إلى منتجات عملية. أحدد المتطلبات، وأوجّه أدوات الذكاء الاصطناعي أثناء التطوير، وأراجع النتائج، وأكتشف المشكلات، وأختبر المنتج قبل اعتباره مكتملًا. أحرص على الشفافية: يساعدني الذكاء الاصطناعي في كتابة الكود، بينما أركز على تحديد الاتجاه والمتطلبات والمراجعة والاختبار والتحسين. <strong class="text-amber-700">القدرة > الشهادة</strong>',
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
      badge: 'المهارات الشخصية',
      heading: 'المهارات الشخصية',
      description: 'هذه هي قدراتي الشخصية — وليست التقنيات المستخدمة في المشاريع. مكدس تقنيات كل مشروع يظهر في بطاقة المشروع.',
      categories: [
        {
          title: 'التطوير بمساعدة الذكاء الاصطناعي / Vibe Coding',
          skills: [
            'تحويل الأفكار إلى منتجات رقمية قابلة للعمل من خلال توجيه أدوات الذكاء الاصطناعي',
            'مراجعة الكود الناتج وطلب إصلاح الأخطاء والتحسينات',
          ],
        },
        {
          title: 'تحديد المتطلبات والمراجعة',
          skills: [
            'تحديد أهداف المشروع ومتطلباته الوظيفية',
            'مراجعة التنفيذ واكتشاف المشكلات',
          ],
        },
        {
          title: 'اختبار المنتجات',
          skills: [
            'اختبار الوظائف وتجربة المستخدم',
            'التحقق من الاستجابة على الأجهزة ومقاسات الشاشات المختلفة',
          ],
        },
        {
          title: 'المهارات الإبداعية والبصرية',
          skills: [
            'تصميم الهوية البصرية والتصميم الجرافيكي',
            'الموشن جرافيك',
            'Adobe InDesign — أساسيات',
          ],
        },
        {
          title: 'صناعة المحتوى التعليمي',
          skills: [
            'كتابة السكربتات التعليمية',
            'التخطيط للسلاسل والكتب التعليمية',
          ],
        },
        {
          title: 'أساسيات رقمية',
          skills: [
            'ICDL',
            'أساسيات الأمن السيبراني',
            'أساسيات التسويق الرقمي',
            'أساسيات Git وGitHub',
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
      heading: 'مشاريع مميزة',
      subheading: 'مجموعة من المنتجات الرقمية المبنية لحل مشاكل حقيقية.',
      description: '',
      viewCode: 'عرض الكود',
      liveDemo: 'معاينة مباشرة',
      privateRepo: 'مستودع خاص',
    },

    // Leadership / Beyond
    leadership: {
      eyebrow: 'رحلة التطور',
      heading: 'التعلم والنمو',
      subheading: 'التعليم والتطوير الذاتي الذي يشكل طريقة بنائي للمنتجات.',
      progressLabel: 'المسار',
      scrollCue: 'اسحب للاستكشاف',
      chapterLabel: 'فصل',
      exploreLabel: 'استكشاف المشاريع',
    },

    // Soft Skills
    softSkills: {
      badge: 'الكفاءات الأساسية',
      heading: 'المهارات الشخصية الاحترافية',
      subheading: 'صفات أساسية تجعلني مهندساً ومنسقاً ومتواصلاً فعالاً.',
    },

    // My Story
    story: {
      heading: 'قصتي',
      content: `بدأت اهتمامي بالتكنولوجيا من ألعاب الكمبيوتر في مقاهي الإنترنت، حيث كنت أقضي وقتي في اللعب مع أصدقائي. ومع الوقت، تحول هذا الفضول البسيط إلى اهتمام أكبر بعالم الحاسوب والتكنولوجيا.

ما يجعلني مهتمًا بهذا المجال هو تطوره المستمر. أحب البناء والتجربة واستكشاف الأفكار الجديدة والتعلم بشكل دائم.

بالنسبة لي، التكنولوجيا ليست مجرد كتابة أكواد، بل هي فضول واكتشاف وتحويل الأفكار إلى شيء واقعي.`,
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
      content: `بعيدًا عن التكنولوجيا، أهتم بالرسم والسباحة والتصميم، وأستمتع أيضًا بمشاهدة الأنمي والأفلام الأجنبية.

تمنحني هذه الاهتمامات مساحات مختلفة للاستمتاع بالإبداع واكتشاف وجهات نظر جديدة والابتعاد قليلًا عن العمل التقني.`,
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
        'AI Agents',
      ],
    },

    // My Perspective
    perspective: {
      heading: 'فلسفتي',
      content: `أؤمن بأن الشهادات وحدها لا تحدد قدرات الإنسان. الأهم هو الخبرة العملية والتعلم المستمر والقدرة على تحويل المعرفة إلى شيء مفيد.

هدفي على المدى البعيد بسيط: أن أصبح شخصًا يستطيع تقديم فائدة حقيقية وقيمة ملموسة من خلال ما يتعلمه وما يبنيه.`,
      highlight: 'القدرة > الشهادة',
    },

    // Contact
    contact: {
      heading: 'تواصل معي',
      subheading: 'لديك مشروع في ذهنك أو تريد فقط التحية؟',
      form: {
        firstName: 'الاسم الأول',
        lastName: 'الاسم الأخير',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        sent: 'تم الإرسال! سأرد عليك قريباً.',
        required: 'هذا الحقل مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        note: 'عادةً أرد عبر البريد الإلكتروني',
      },
      directEmail: 'أو راسلني مباشرة:',
      leftLabel: 'لنتصل',
      leftHeading: 'لنبني شيئاً\nذو معنى.',
      leftDescription: 'هل لديك فكرة، مشروع، أو تريد فقط التواصل؟\nلا تتردد في التواصل.',
      available: 'متاح للمشاريع الجديدة',
      formHeaderLabel: 'ابدأ محادثة',
      formHeaderTitle: 'أخبرني عن فكرتك.',
      formHeaderDescription: 'املأ التفاصيل أدناه وسأعود إليك.',
    },

    // Footer
    footer: {
      copyright: '© {year} {name}. جميع الحقوق محفوظة.',
      builtWith: 'مبني بـ React، Vite، و Tailwind CSS.',
      backToTop: 'العودة للأعلى',
      profession: 'طالب نظم معلومات | تطوير بمساعدة الذكاء الاصطناعي',
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
      // Fallback to English
      result = translations.en;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return path; // Return path as fallback
        }
      }
      break;
    }
  }

  return result;
}