export interface PersonalInfo {
  name: string;
  title: string;
  positioning: string[];
  profileImage: string;
  profileImageAlt: string;
  bio: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  location: string;
  resumeUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    iconName?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  contribution: string;
  challenges: string;
  features: string[];
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  videoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  tags?: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  period: string;
  location?: string;
  details?: string;
  cgpa?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

// Portfolio Data
export const personalInfo: PersonalInfo = {
  name: "MANOJ GOWDA CD",
  title: "Full-Stack Developer & Python Backend Developer",
  positioning: [
    "Full-Stack Developer",
    "Python Backend Developer",
    "FastAPI & Django Developer",
    "AI/ML Developer"
  ],
  profileImage: "/src/assets/profile.jpg",
  profileImageAlt: "/src/assets/profile-alt.jpg",
  bio: "Entry-level Full-Stack Developer and Python Backend Developer with hands-on experience building web applications and RESTful APIs using Python, FastAPI, Django, Flask, Node.js, and Express.js. Skilled in database development with MySQL, PostgreSQL, and MongoDB, along with JWT authentication, Git/GitHub, and Docker. Experienced in developing AI/ML and real-time applications using Scikit-learn, OpenAI API, YOLO, and OpenCV, with a focus on backend development, database integration, API development, and problem solving.",
  email: "manudev314@gmail.com",
  phone: "+91 9148272292",
  whatsappUrl: "https://wa.me/919148272292",
  location: "Tumkur, Karnataka, India",
  resumeUrl: "/Manoj_Gowda_CD_Resume.pdf"
};

export const educationData: Education[] = [
  {
    id: "edu-1",
    degree: "BE",
    fieldOfStudy: "Information Science and Engineering",
    institution: "Sri Siddhartha Institute of Technology",
    period: "2023 – Present",
    location: "Tumkur, India",
    details: "Expected graduation: 2027"
  },
  {
    id: "edu-2",
    degree: "PUC",
    fieldOfStudy: "PCMB",
    institution: "Mahesh PU College",
    period: "April 2023",
    location: "Tumkur, India"
  },
  {
    id: "edu-3",
    degree: "High School",
    fieldOfStudy: "Secondary Education",
    institution: "Maruthi Vidya Kendra",
    period: "July 2021",
    location: "Tumkur, India"
  }
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/manojgowda20", iconName: "Github" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/manoj-gowda-cd", iconName: "Linkedin" },
  { platform: "Email", url: "mailto:manudev314@gmail.com", iconName: "Mail" }
];

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "AI-Powered ICU Monitoring Dashboard & Clinical Decision Support System",
    shortTitle: "AI ICU Vital Monitor & CDSS",
    description: "An AI-enabled clinical support application that visualizes real-time ICU patient vitals, utilizing predictive algorithms to assess deterioration risks and check cross-references for medical allergies.",
    problem: "Visualizing physiological parameters in intensive care units is traditionally disjointed, leading to clinician alarm fatigue and delay in identifying early signs of patient deterioration. Furthermore, cross-referencing acute drug-drug interactions and allergy profiles manually under high-pressure ICU workloads increases the risk of preventable medical events.",
    solution: "Built an interactive clinical decision dashboard that aggregates vital parameter simulation streams. Integrated a machine learning predictive classification model to evaluate patient deterioration risks continuously, and constructed an alert matching engine that scans patient allergy lists and medication profiles for contraindications before prescribing.",
    architecture: "Engineered as a modular Python system. A background simulator thread generates continuous vital data (ECG waves, heart rate, blood pressure, SpO2) and pushes them to a visualization stream. The stream feeds into a Scikit-learn predictive classifier pipeline. Verified patient records are stored locally as JSON documents, which are queried by the allergy verification engine upon action triggers.",
    contribution: "Designed the machine learning classification model using Scikit-learn Random Forests, engineered the drug-allergy rule validation algorithms, and constructed the real-time Streamlit dashboard UI with dynamic Plotly charts visualizing vital sign metrics and simulated ECG waveforms.",
    challenges: "Encountered dashboard rendering delays due to constant layout updates from the vital simulation thread. Resolved this by optimizing the thread sleep parameters, caching static database queries, and utilizing Plotly's lightweight chart formats to maintain responsiveness.",
    tags: ["Python", "Streamlit", "Scikit-learn", "Plotly"],
    features: [
      "Real-time physiological vital-sign monitoring",
      "Random Forest deterioration-risk prediction",
      "Drug-drug interaction checks",
      "Patient allergy and medication cross-reference",
      "ECG wave simulator with mathematical Gaussian curve formulations",
      "Persistent JSON-based patient record storage"
    ],
    githubUrl: "",
    liveUrl: "https://lnkd.in/p/grZfJa3C",
    featured: true,
    videoUrl: "https://lnkd.in/p/grZfJa3C"
  },
  {
    id: "project-2",
    title: "Land Registration Portal — Full-Stack Web Application",
    shortTitle: "Land Registration Portal",
    description: "A secure full-stack registry platform designed to digitalize land ownership records, process ownership transfers, and verify public property certificates via robust authentication layers.",
    problem: "Centralized land registry systems are susceptible to title deed fraud, unauthorized record alterations, and manual auditing bottlenecks. The absence of cryptographic verification means title validity is heavily dependent on paper certificates that can be easily falsified.",
    solution: "Implemented a secure full-stack land registry portal. Secure JSON Web Tokens (JWT) manage authenticated access for citizens and registrar nodes. The portal processes transfer requests, updates property ledger cards, and generates cryptographic certificate hashes that verify deed authenticity publicly.",
    architecture: "Developed on the MERN stack. A React frontend connects to a Node.js/Express.js REST API. Mongoose schemas model users, properties, and deed records inside a MongoDB cluster. Crypto modules hash certificate metadata to generate immutable registry fingerprints verified on client-side status tools.",
    contribution: "Architected the backend REST API, designed the Mongoose database schemas, built secure JWT-based sign-in and authorization middleware, and developed the API routing logic to validate citizen certificates and property transfers.",
    challenges: "Handling transaction race conditions where a property title could be concurrently requested for transfer. Resolved this by implementing optimistic concurrency control checks and MongoDB database transaction boundaries to enforce property ownership updates.",
    tags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "JavaScript", "HTML", "CSS"],
    features: [
      "Property registration & ownership records management",
      "Ownership transfer requests & approval workflows",
      "Application status tracking in real-time",
      "Modular RESTful APIs with Express.js",
      "JWT-based role authentication & middleware security",
      "Public certificate verification endpoint without login requirement",
      "Administrative frontend dashboard"
    ],
    githubUrl: "",
    liveUrl: "",
    featured: true
  },
  {
    id: "project-3",
    title: "Smart AI Security Monitor & Surveillance Solution",
    shortTitle: "AI Surveillance & Activity Monitor",
    description: "An intelligent video analytics solution utilizing state-of-the-art computer vision algorithms to process real-time video streams, track moving targets, and isolate suspicious activity logs.",
    problem: "Traditional security cameras require constant human monitoring, which is error-prone, inefficient, and fails to catalog events. Automated vision pipelines face challenges isolating moving targets from environmental noise and triggering high-fidelity alert logs.",
    solution: "Developed a real-time object detection and security analytics monitor. The visual processing stream runs YOLO deep learning inferences on video inputs to classify targets and isolate security boundaries, logging events and tracking frames.",
    architecture: "Constructed as a modular computer vision pipeline. Python scripts capture video inputs via OpenCV wrappers. Preprocessed frames are passed to a YOLO classification model. NumPy arrays manage bounding box dimensions, coordinate thresholds, and target tracking matrices, writing event logs to local disk storage.",
    contribution: "Built the camera capture interface using OpenCV, mapped YOLO object detection frame loops, managed bounding-box scaling math using NumPy matrix operations, and constructed target-tracking alert triggers.",
    challenges: "Encountered frame rate drops when executing object detection models on CPU setups. Resolved this by downscaling input frame resolutions prior to model feed-in, filtering processing frequency to every third frame, and using a lightweight YOLO model size.",
    tags: ["Python", "YOLO", "OpenCV", "NumPy", "Deep Learning"],
    features: [
      "Real-time video surveillance & motion detection",
      "YOLO-based object classification & multi-target tracking",
      "Suspicious activity detection & automated alert triggers",
      "Real-time video processing pipeline with OpenCV",
      "Pipeline optimization for reliable frame rate processing",
      "Incident logging and temporal activity analytics"
    ],
    githubUrl: "",
    liveUrl: "https://manojgowda20.github.io/suspesious-activity/",
    featured: true,
    videoUrl: ""
  },
  {
    id: "project-4",
    title: "AI Banking Agent — Intelligent Financial & Account Assistant",
    shortTitle: "AI Banking Agent",
    description: "An intelligent conversational AI banking assistant designed to automate account inquiries, process transactional requests, check account balances, verify customer identities, and provide real-time financial support using natural language understanding.",
    problem: "Traditional banking customer support channels suffer from long wait times, rigid IVR menu trees, and high operating overhead. Customers seeking immediate transaction history, balance checks, fund transfer guidance, or branch queries often encounter delayed responses or non-intuitive self-service portals.",
    solution: "Developed an interactive AI Banking Agent web platform powered by modern conversational AI and structured banking service APIs. The agent processes natural language customer intents, securely retrieves account status, validates user credentials, handles routine banking workflows, and provides contextual conversational assistance.",
    architecture: "Built with a modular full-stack & AI architecture. The frontend conversational client connects to a secure backend API orchestrator. The AI intent recognition pipeline analyzes user queries, maps them to specific financial tool executions (e.g., account balance check, transaction ledger retrieval, loan calculator, branch locator), and securely interfaces with banking data stores with token-based session security.",
    contribution: "Designed the conversational agent workflows, developed the banking API endpoints, integrated natural language understanding and prompt engineering pipelines, built the responsive chat and dashboard UI, and implemented security guardrails for handling simulated financial queries.",
    challenges: "Managing conversational context across multi-turn banking dialogs while preventing hallucinated financial figures. Resolved this by implementing structured JSON tool-calling patterns, strict prompt guardrails, and deterministic backend database verification for all quantitative account lookups.",
    tags: ["Python", "FastAPI", "React", "OpenAI API", "LangChain", "Tailwind CSS", "JWT"],
    features: [
      "Natural language banking conversations & intent recognition",
      "Automated account balance & transaction inquiries",
      "Secure multi-turn financial dialogue management",
      "Loan calculation & interest estimators",
      "Smart customer query classification & routing",
      "Interactive real-time web interface with instant response streaming"
    ],
    githubUrl: "",
    liveUrl: "https://lnkd.in/p/gfHe8jSu",
    featured: true,
    videoUrl: "https://lnkd.in/p/gfHe8jSu"
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Full-Stack Web Development & Data Analytics Intern",
    company: "Mevi Technology",
    location: "Internship",
    period: "2026 – Present",
    description: [
      "Developed full-stack web applications using Python, Django, HTML, CSS, JavaScript, and SQL, including REST APIs, CRUD operations, authentication, and database integration.",
      "Used Git & GitHub for version control, debugging, testing, and managing application development workflows.",
      "Performed data analytics using Python, Pandas, NumPy, and Matplotlib for data cleaning, analysis, visualization, and insight generation.",
      "Built 10+ academic and personal software projects with hands-on experience in REST API development, database integration, authentication, debugging, testing, real-time applications, and performance optimization."
    ],
    tags: ["Python", "Django", "JavaScript", "REST APIs", "SQL", "MongoDB", "Pandas", "NumPy", "Matplotlib", "Git & GitHub", "Software Testing"],
    achievements: [
      "Designed and deployed production-ready REST API endpoints with robust error handling",
      "Accelerated database query execution through indexing and optimized SQL joins",
      "Constructed automated data cleaning and reporting scripts for analytics"
    ]
  }
];

export const certificationsData: Certification[] = [
  { 
    id: "cert-1", 
    title: "Python for Data Science: From Basics to Projects", 
    issuer: "SkillEcted Campus Program", 
    credentialUrl: "https://lnkd.in/p/g3gYKTEZ" 
  },
  { 
    id: "cert-2", 
    title: "GIT — Cloud Computing & Version Architecture", 
    issuer: "SkillUp by Simplilearn", 
    credentialUrl: "https://lnkd.in/p/guVEqZND" 
  },
  { 
    id: "cert-3", 
    title: "Data Analytics Career Skills", 
    issuer: "LinkedIn Learning", 
    credentialUrl: "https://linkedin.com/in/manoj-gowda-cd" 
  }
];

export const categorizedSkills = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", desc: "Core scripting, backend services & ML pipelines" },
      { name: "Java", desc: "Object-oriented software development" },
      { name: "JavaScript", desc: "Interactive frontend & full-stack development" },
      { name: "C", desc: "Procedural programming & systems fundamentals" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "FastAPI", desc: "High-performance asynchronous Python REST APIs" },
      { name: "Django", desc: "Full-featured web framework with ORM & auth" },
      { name: "Flask", desc: "Lightweight micro-framework for modular services" },
      { name: "Node.js", desc: "Event-driven asynchronous JavaScript runtime" },
      { name: "Express.js", desc: "Minimalist server routing and REST API framework" },
      { name: "REST APIs", desc: "Modular endpoint design, HTTP methods, CRUD logic" },
      { name: "JWT Authentication", desc: "Token-based secure authentication & role access" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML5 & CSS3", desc: "Semantic layout, responsive design & CSS animations" },
      { name: "JavaScript (ES6+)", desc: "DOM manipulation, async/await, event handling" },
      { name: "React", desc: "Component architecture, hooks & modern UI patterns" },
      { name: "Responsive UI", desc: "Fluid layouts for desktop, tablet & mobile" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", desc: "Relational database modeling, complex queries & indexing" },
      { name: "MySQL", desc: "Relational schema management & transactional integrity" },
      { name: "MongoDB", desc: "NoSQL document store, aggregation pipelines & Mongoose" }
    ]
  },
  {
    category: "Data Analytics",
    skills: [
      { name: "Python Analytics", desc: "Exploratory data analysis & statistical processing" },
      { name: "Pandas", desc: "Data wrangling, cleaning & tabular transformation" },
      { name: "NumPy", desc: "Numerical computing & multi-dimensional array math" },
      { name: "Matplotlib", desc: "Visual plotting, data charts & metric figures" }
    ]
  },
  {
    category: "AI / Machine Learning",
    skills: [
      { name: "Machine Learning", desc: "Supervised classification & predictive modeling" },
      { name: "Scikit-learn", desc: "Random Forest, model evaluation & feature scaling" },
      { name: "Generative AI", desc: "Large language models integration & prompt flows" },
      { name: "OpenAI API", desc: "API orchestration for intelligent automation" },
      { name: "Prompt Engineering", desc: "Optimizing instructions for consistent LLM output" },
      { name: "YOLO", desc: "Real-time object detection & bounding box tracking" },
      { name: "OpenCV", desc: "Computer vision, frame extraction & image processing" },
      { name: "Deep Learning", desc: "Neural network architectures & video stream inference" }
    ]
  },
  {
    category: "Cloud",
    skills: [
      { name: "AWS", desc: "Core cloud infrastructure & server services" },
      { name: "Cloud Computing", desc: "Virtual machines, cloud storage & cloud databases" }
    ]
  },
  {
    category: "Tools & Version Control",
    skills: [
      { name: "Git", desc: "Distributed version control, branching & merging" },
      { name: "GitHub", desc: "Remote repository hosting, PRs & collaboration workflows" },
      { name: "Software Testing", desc: "Automated test suites, unit testing & debugging" },
      { name: "Docker", desc: "Containerization & environment reproducibility" }
    ]
  }
];

export const skillsData: SkillCategory[] = categorizedSkills.map(c => ({
  category: c.category,
  skills: c.skills.map(s => ({ name: s.name, level: 'Advanced' }))
}));
