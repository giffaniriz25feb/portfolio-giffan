"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  Briefcase, 
  Award,  
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronRight,
  Code2,
  LineChart,
  Settings,
  Users,
  ChevronLeft,
  ChevronDown,
  FileText,
  Presentation,
  FileBarChart2,
  ExternalLink,
  Globe,
  Mail
} from 'lucide-react';

import { FaLinkedin, 
  FaWhatsapp, 
  FaGoogle,
  FaGithub
} from "react-icons/fa";

// --- STYLES UNTUK HIDE SCROLLBAR ---
const globalStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- DATA ---
const PERSONAL_DATA = {
  name: "Giffani Rizky Febrian",
  headline: "Data Analyst focused on Operations, Logistics, and Quality Improvement",
  shortIntro: "Turning complex operational data into actionable insights to improve efficiency, reduce errors, and support better decision-making.",
  email: "giffaniriz25@gmail.com",
  phone: "6283845871899",
  linkedin: "https://www.linkedin.com/in/giffanifebrian",
  location: "Surabaya & Madiun, Jawa Timur, Indonesia"
};

const ABOUT_TEXT = [
  "I am a final-year Statistics undergraduate at Institut Teknologi Sepuluh Nopember (ITS) with a strong focus on data analytics in operational and logistics environments.",
  "Through hands-on experience in transportation and supply chain systems, I have developed the ability to transform raw operational data into structured insights that improve efficiency, accuracy, and decision-making.",
  "I am particularly interested in building data-driven systems that do not just analyze performance, but actively contribute to process improvement and organizational impact."
];

const SKILLS = [
  { category: "Programming", items: ["Python (Pandas, Selenium)", "R (Skripting, Shiny)", "Google Apps Script", "Java Script"] },
  { category: "Statistical Software", items: ["IBM SPSS", "IBM AMOS", "Minitab", "SAS"] },
  { category: "Tools & Technologies", items: ["Excel", "PDFMiner", "CIS Web System"] },
  { category: "Soft Skills", items: ["Event Planning", "Public Speaking", "Stakeholder Communication", "Leadership"] }
];

const EXPERIENCES = [
  {
    role: "Operations & Logistics Analyst Intern",
    company: "Perum BULOG – Madiun Branch Office",
    date: "March 2026 - Present",
    description: "Gaining hands-on exposure to Indonesia’s national food logistics and supply chain operations at the branch level, with a focus on data-driven monitoring and operational efficiency.",

    logo: "/experience/logos/bulog.png",
    image: "/experience/images/bulog.jpg",

    impacts: [
      "Processed and analyzed logistics and distribution data for operational reporting",
      "Supported supply chain monitoring and stock movement tracking",
      "Assisted in data validation and reporting workflows for decision support"
    ],

    tags: ["Logistics", "Data Analysis", "Supply Chain", "Reporting"]
  },
  {
    role: "Assistant Lecturer of Statistical Data Analysis",
    company: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "August 2025 - December 2025",
    description: "Assisted in delivering computer-based statistical analysis practicum sessions and guided students in applying analytical methods using various statistical tools.",

    logo: "/experience/logos/its.png",
    image: "/experience/images/aslec-sda.jpg",

    impacts: [
      "Facilitated practicum sessions using R, Python, SAS, SPSS, and Minitab",
      "Guided students in data processing, visualization, and interpretation",
      "Supported development of analytical thinking through hands-on exercises"
    ],

    tags: ["Teaching", "Data Analysis", "Statistics", "Mentoring"],

    link: {
      title: "Statistical Analysis Learning Materials",
      description: "Access structured materials and guided exercises.",
      image: "experience/projects/notion-material.png",
      buttonText: "View Materials",
      type: "external",
      url: "https://www.notion.so/Praktikum-Analisis-Data-Statistik-A-25c79f0a720d80a7bd59dcd107db6761"
    }
  },
  {
    role: "Commercial and Passenger Transport Operations Intern",
    company: "PT. PELNI (Persero) – Surabaya Branch Office",
    date: "July 2025 - August 2025",
    description: "Supported daily passenger transport operations and improved reporting workflows through automation and data processing.",

    logo: "/experience/logos/pelni.png",
    image: "/experience/images/pelni-image.png",

    impacts: [
      "Processed transaction and logistics data for operational records",
      "Developed automation workflow using Google Apps Script to streamline reporting",
      "Improved efficiency of data handling and reporting processes"
    ],

    tags: ["Automation", "Operations", "Data Processing", "Google Apps Script"],

    link: {
      title: "Automation Reporting System",
      description: "Explore the workflow automation project built during internship.",
      image: "project/PELNI-automation.png",
      buttonText: "View Special Project",
      type: "project",
      projectIndex: 1
    }
  }
];

const ORGANIZATIONS = [
  {
    role: "Vice Head I HRD Department",
    organization: "HIMASTA-ITS",
    date: "Mar 2025 - Dec 2025",
    tag: "Leadership",

    logo: "/organization/logos/HIMASTA-ITS.jpg",
    image: "/organization/images/himasta-psdm.jpg",

    overview:
      "Served as Vice Head of HRD, leading strategic people development and internal organizational alignment within HIMASTA-ITS.",

    metrics: [
      "228 Members Managed",
      "6 HR Programs Executed",
      "95,52% Program Completion Rate"
    ],

    impacts: [
      "Co-led mass regeneration program (PMT) for leadership & soft skills development.",
      "Directed strategic HR programs and facilitated cross-departmental alignment.",
      "Built structured evaluation systems to improve member performance."
    ],

    tools: ["Leadership", "Program Design", "Evaluation System"],

    highlight:
      "Strengthened organizational structure and improved member engagement through scalable HR initiatives."
  },
  {
    role: "Head of Public Relation",
    organization: "Statistics in Action",
    date: "Apr 2024 - Jul 2024",
    tag: "Event Communication Strategy",

    image: "/organization/images/sia-cover.jpg",

    overview:
      "Led the Public Relations division for a national-scale statistics event, ensuring strong external communication and partnership execution.",

    metrics: [
      "200+ Participants",
      "Collaboration with 2 speakers and 3 judges",
      "Cross-Div Coordination"
    ],

    impacts: [
      "Led PR team to execute communication strategies for a institutional event.",
      "Managed partnerships with speakers, judges, and institutions."
    ],

    tools: ["Public Relations", "Partnership", "Communication Strategy"],

    highlight:
      "Successfully built strong institutional collaborations and boosted event visibility."
  },
  {
    role: "Staff PR & LinkedIn Admin",
    organization: "Professional Statistics",
    date: "Apr 2024 - Jan 2025",
    tag: "Public Relations",

    logo: "/organization/logos/PSt.jpg",
    image: "/organization/images/pst-cover.jpg",

    overview:
      "Handled digital communication and LinkedIn presence, ensuring professional branding consistency.",

    metrics: [
      "Consistent Weekly Content",
      "LinkedIn Brand Growth",
      "Audience Engagement"
    ],

    impacts: [
      "Managed LinkedIn content strategy and engagement.",
      "Produced professional content aligned with branding.",
      "Maintained consistency across digital communication channels."
    ],

    tools: ["Content Strategy", "Branding", "LinkedIn Management"],

    highlight:
      "Improved digital presence and professional visibility of the organization."
  },
  {
    role: "Staff of R&D Team",
    organization: "HIMASTA-ITS",
    date: "Mar 2024 - Feb 2025",
    tag: "Analytics & Strategy",

    logo: "/organization/logos/HIMASTA-ITS.jpg",
    image: "/organization/images/himasta-rnd.jpg",

    overview:
      "Worked in Research & Development team focusing on evaluation and analytical reporting for organizational improvement.",

    metrics: [
      "Multi-Dept Evaluation",
      "Analytical Reports Delivered",
      "Performance Monitoring"
    ],

    impacts: [
      "Conducted performance evaluations across departments.",
      "Produced analytical reports for strategic decision-making.",
      "Monitored program execution against timelines."
    ],

    tools: ["Data Analysis", "Reporting", "Monitoring"],

    highlight:
      "Delivered insights that supported data-driven decision-making."
  },
  {
    role: "Expert Staff of Event Opening & Closing",
    organization: "Pekan Raya Statistika ITS",
    date: "Feb 2024 - Oct 2024",
    tag: "Event Management",

    logo: "/organization/logos/PRS.jpg",
    image: "/organization/images/prs-cover.jpg",

    overview:
      "Part of core team responsible for designing and executing major ceremonial events.",

    metrics: [
      "International Scale Event",
      "Cross-Team Coordination",
      "Live Event Execution"
    ],

    impacts: [
      "Planned and executed opening & closing ceremonies.",
      "Managed stage flow and technical coordination.",
      "Ensured smooth execution during live events."
    ],

    tools: ["Event Planning", "Stage Management", "Coordination"],

    highlight:
      "Delivered seamless event experience with strong coordination."
  }
];

const PROJECTS = [
  {
    title: "AI-Driven Service Quality Monitoring (Bachelor's Thesis in Statistics)",
    tech: "NLP, Deep Learning, Bi-LSTM, Python, Statistical Quality Control",
    image: "/project/Final-Thesis-S1.png",

    // CARD
    short: "Transformed 3,500+ user reviews into measurable service quality metrics using NLP and deep learning.",
    impact: "Identified critical service issues & enabled data-driven quality improvement.",

    // MODAL
    description: "Developed a data-driven monitoring system for digital service quality by integrating deep learning-based text mining with statistical quality control methods.",

    details: [
      "Processed 3,554 user reviews from PELNI Mobile (Google Play Store)",
      "Built multi-label classification using Bi-LSTM with Attention mechanism",
      "Mapped complaints into TAM dimensions (Reliability, Usefulness, Ease of Use)",
      "Converted text insights into demerit-weighted quality metrics",
      "Monitored service stability using Demerit & Laney Control Charts",
      "Identified priority issues using Pareto analysis"
    ],

    contribution: "Independently designed and implemented the full pipeline from text preprocessing, modeling, to statistical monitoring, bridging deep learning with operational quality control.",
  
    links: null,
    type: "progress"
  },
  {
    title: "PELNI Logistics Reporting Automation",
    tech: "Google Apps Script, Google Spreadsheet, Python, Excel",
    image: "/project/PELNI-automation.png",

    // CARD
    short: "Automated passenger & logistics reporting into structured monthly operational insights.",
    impact: "Reduced manual reporting effort & minimized operational errors.",

    // MODAL
    description: "Developed an automation workflow to transform raw passenger and logistics transaction data into structured operational reports.",

    details: [
      "Built automation system using Google Apps Script integrated with Google Sheets",
      "Designed data grouping by voyage, cargo type, and sender",
      "Automated monthly reporting workflows",
      "Improved data consistency and reporting clarity for operations"
    ],

    contribution: "Contributed as part of a two-person team to the development of automation logic and reporting structures, ensuring flexible and accurate operational reporting.",
  
    links: [
      {
        label: "Project Report",
        url: "https://drive.google.com/file/d/1EXuzuG4v5VJRpnuxdWaoEmup5m89k3p_/view?usp=drive_link",
        type: "report",
        thumbnail: "/project/thumbnails/PELNI-report.png"
      },
      {
        label: "Project Presentation",
        url: "https://drive.google.com/file/d/17DJcrJwlZmhyhTnDM501ybssacHwimdH/view?usp=drive_link",
        type: "ppt",
        thumbnail: "/project/thumbnails/PELNI-ppt.png"
      }
    ]
  },
  {
    title: "Bitcoin Price Forecasting (ARIMA vs LSTM)",
    tech: "Python, ARIMA, LSTM, TensorFlow",
    image: "/project/Bitcoin-forecasting.png",

    // CARD
    short: "Compared statistical and deep learning models for cryptocurrency price prediction.",
    impact: "Demonstrated LSTM superiority on volatile market data.",

    // MODAL
    description: "Conducted a comparative time-series forecasting study using ARIMA and LSTM models for Bitcoin price prediction.",

    details: [
      "Performed stationarity and white noise testing (ADF, White Test)",
      "Built ARIMA (5,1,5) and LSTM models",
      "Evaluated performance using MAE, MSE, RMSE, MAPE",
      "Analyzed model adaptability to volatile market behavior"
    ],

    contribution: "Led the project execution and analysis, coordinating modeling, evaluation, and interpretation with a teammate.",
  
    links: [
      {
        label: "Project Report",
        url: "https://drive.google.com/file/d/1xK8ymTF94Hy51QYCjyGNTtrKo6ZtLUyO/view?usp=drive_link",
        type: "report",
        thumbnail: "/project/thumbnails/Crypto-report.png"
      },
      {
        label: "Project Presentation",
        url: "https://drive.google.com/file/d/1a3Tm1gUd0CIxVwn9fHo_VgXMNJ0MR8Y7/view?usp=drive_link",
        type: "ppt",
        thumbnail: "/project/thumbnails/Crypto-ppt.png"
      }
    ]
  },
  {
    title: "Stock Price Forecasting (LSTM, RNN, NNAR)",
    tech: "Python, Deep Learning, Time Series",
    image: "/project/Stock-forecasting.png",

    // CARD
    short: "Benchmarked multiple neural network models on 10-year NASDAQ stock data.",
    impact: "Showed model performance depends on volatility & data structure.",

    // MODAL
    description: "Analyzed stock price forecasting using LSTM, RNN, and NNAR models across major tech stocks.",

    details: [
      "Processed 10 years of stock data (AAPL, MSFT, AMZN, GOOG)",
      "Applied 80:20 train-test split",
      "Evaluated models using MAPE",
      "Compared performance stability across different stocks"
    ],

    contribution: "Contributed to modeling, evaluation, and comparative analysis within a team of six, focusing on interpreting model performance.",
  
    links: [
      {
        label: "Research Paper",
        url: "https://drive.google.com/file/d/1aP0cJPGLI8CO812_mEqkT00IHd61HB3S/view?usp=drive_link",
        type: "paper",
        thumbnail: "/project/thumbnails/ML-paper.png"
      },
    ]
  },
  {
    title: "Forest Cover Classification & Dashboard",
    tech: "R, Random Forest, Penalized Regression, R Shiny",
    image: "/project/Dashboard-forest.png",

    // CARD
    short: "Classified forest cover types using machine learning and deployed results in an interactive dashboard.",
    impact: "Achieved 86% accuracy & enabled interactive environmental data exploration.",

    // MODAL
    description: "Built classification models to predict forest cover types based on environmental and topographic features.",

    details: [
      "Processed 15,000+ observations with 50+ variables",
      "Applied Random Forest and Penalized Multinomial Regression",
      "Used RFE for feature selection",
      "Validated models using Cross Validation & Repeated Holdout",
      "Deployed results into R Shiny dashboard"
    ],

    contribution: "Independently handled data preprocessing, modeling, validation, and dashboard deployment.",

    links: [
      {
        label: "Live Dashboard",
        url: "https://giffanfebrian.shinyapps.io/nyoba/",
        type: "dashboard",
        thumbnail: "/project/thumbnails/Forest-dashboard.png"
      },
      {
        label: "Project Presentation",
        url: "https://drive.google.com/file/d/1aLlkMCxqzeigkMK2pBeOX4dSF6fshLpO/view?usp=sharing",
        type: "ppt",
        thumbnail: "/project/thumbnails/Forest-ppt.png"
      }
    ]
  },
  {
    title: "Greckstore Database System",
    tech: "SQL, MySQL Workbench, Database Design",
    image: "/project/Database-MySQL.png",

    // CARD
    short: "Designed a normalized relational database system for retail operations.",
    impact: "Improved data structure & enabled automated business processes.",

    // MODAL
    description: "Developed a relational database system for a retail store with full operational data integration.",

    details: [
      "Designed ERD and normalized schema (UNF to 3NF)",
      "Implemented stored procedures for revenue tracking",
      "Built triggers for automatic stock updates",
      "Created automated invoice generation system",
      "Integrated multi-entity data (customers, orders, suppliers)"
    ],

    contribution: "Led database design and contributed to SQL implementation, focusing on structure efficiency and business logic.",
  
    links: [
      {
        label: "Project Report",
        url: "https://drive.google.com/file/d/1WGSzlIvCWTWpFf5yhceJoBWLVPLGt4-T/view?usp=drive_link",
        type: "report",
        thumbnail: "/project/thumbnails/Greckstore-report.png"
      },
    ]
  }
];

const EDUCATION = [
  {
    name: "Institut Teknologi Sepuluh Nopember",
    degree: "Bachelor of Statistics",
    period: "2022 – 2026 (Expected)",
    image: "/education/ITS.jpeg",
    link: "https://www.its.ac.id/statistika",
    highlight:
      "Built strong foundations in statistical modeling, machine learning, and data-driven decision making through hands-on analytical projects and research.",
  },
  {
    name: "SMAN 2 Madiun",
    degree: "Senior High School Acceleration Program",
    period: "2020 – 2022",
    image: "/education/SMAN2MADIUN.jpeg",
    link: "https://smanegeri2madiun.sch.id",
    highlight:
      "Completed an accelerated academic program with strong emphasis on analytical thinking, scientific writing, and competitive research development.",
  }
];

const CERTIFICATIONS = [
  {
    title: "Master Data Science in Python",
    issuer: "Great Learning · 2025",
    image: "/certificate/MasterDataScience.jpg",
    description:
      "Completed a comprehensive data science program covering regression, classification, clustering, and ensemble methods. Applied statistical reasoning and machine learning techniques to solve real-world analytical problems using Python."
  },
  {
    title: "Leadership Organization Training",
    issuer: "HIMASTA ITS · 2024",
    image: "/certificate/LOT.jpg",
    description:
      "Developed leadership and organizational management skills, including decision-making, team coordination, and problem-solving in collaborative environments. Strengthened the ability to lead initiatives and manage responsibilities effectively."
  },
  {
    title: "Scientific Writing",
    issuer: "BEM ITS · 2022",
    image: "/certificate/ScientificWriting.jpg",
    description:
      "Built foundational skills in academic writing, focusing on structuring research papers, developing evidence-based arguments, and presenting analytical insights in a clear and systematic format."
  },
  {
    title: "Entrepreneurial Skills Training (LKMW-TD)",
    issuer: "BEM ITS · 2022",
    image: "/certificate/LKMW.jpg",
    description:
      "Gained essential entrepreneurial knowledge, including business model development, opportunity analysis, and innovation-driven thinking. Strengthened strategic and problem-solving skills in a business context."
  }
];

const ACHIEVEMENTS = [
  {
    title: "National Incentive Awardee (PKM-AI) 2024",
    organization: "Program Kreativitas Mahasiswa by Direktorat Pembelajaran dan Kemahasiswaan - Kemendikbudristek RI",
    description: "Social Vulnerability Assessment of Indonesia’s Complete Systematic Land Registration (PTSL)",

    // VISUAL
    certificateImage: "/achievements/pkm-cert.png",
    eventImage: "/achievements/pkm.png",

    // DETAIL MODAL
    detail: "This research analyzes social vulnerability within Indonesia’s PTSL program, highlighting disparities and proposing data-driven policy recommendations.",

    // META
    year: "2024",
    category: "Research & Innovation",

    // LINK
    link: {
      title: "View Research Output",
      url: "https://doi.org/10.13140/RG.2.2.29804.42881",
      buttonText: "Explore Research"
    }
  }
];

// --- COMPONENTS ---

// 1. Marquee
const Marquee = () => {
  const words = ["Data Analytics", "Operations", "Quality Control", "Logistics", "Supply Chain", "Machine Learning", "Statistical Modeling", "Process Optimization"];
  
  return (
    <div className="w-full bg-emerald-600 dark:bg-emerald-900 text-white py-3 overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex gap-10 text-sm md:text-base font-medium tracking-wider uppercase"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-4">
            <span>{word}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 2. Section Wrapper (Updated for Full Width Backgrounds)
const Section = ({ id, className, children }: { id: string, className?: string, children: React.ReactNode }) => (
  <section id={id} className={`py-20 md:py-32 w-full transition-colors duration-500 ${className || ''}`}>
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

// 3. Theme Toggle
const ThemeToggle = ({ isDark, setIsDark }: { isDark: boolean, setIsDark: (val: boolean) => void }) => {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 shadow-inner border border-slate-200 dark:border-slate-800 ${
        isDark ? 'bg-slate-800' : 'bg-slate-100'
      }`}
      aria-label="Toggle Theme"
    >
      <div
        className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
          isDark ? 'translate-x-6 bg-slate-900' : 'translate-x-0 bg-white'
        }`}
      >
        {isDark ? (
          <Sun size={14} className="text-yellow-400" />
        ) : (
          <Moon size={14} className="text-slate-700" />
        )}
      </div>
    </button>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const project = selectedProject !== null 
  ? PROJECTS[selectedProject] 
  : null;
  const isRestricted = project?.type === "restricted";
  const getEmailDomain = (email: string) => {
    return email.split("@")[1]?.toLowerCase();
  };
  const isGmail = (email: string) => {
    return getEmailDomain(email) === "gmail.com";
  };
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github": return <FaGithub size={16} />;
      case "ppt": return <Presentation size={16} />;
      case "dashboard": return <BarChart3 size={16} />;
      case "report": return <FileBarChart2 size={16} />;
      case "paper": return <FileText size={16} />;
      case "web": return <Globe size={16} />;
      default: return <FileText size={16} />;
    }
  };
  const modalRef = useRef<HTMLDivElement | null>(null);
  const viewBtnRef = useRef<HTMLButtonElement | null>(null);
  const [certPage, setCertPage] = useState(0);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [doubleZoom, setDoubleZoom] = useState(false);
  const eduScrollRef = useRef<HTMLDivElement | null>(null);
  const [eduProgress, setEduProgress] = useState(0);
  const [activeEdu, setActiveEdu] = useState(0);

  const handleEduScroll = () => {
    const el = eduScrollRef.current;
    if (!el) return;

    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setEduProgress(progress * 100);

    // ACTIVE INDEX DETECTION (CENTER BASED)
    const center = el.scrollLeft + el.clientWidth / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    Array.from(el.children).forEach((child, i) => {
      const rect = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
      const dist = Math.abs(center - rect);

      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    setActiveEdu(closestIdx);
  };

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  type Certification = {
    title: string;
    issuer: string;
    image: string;
    description: string;
  };

  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const modalOrgRef = useRef<HTMLDivElement | null>(null);

  const [imageOrientation, setImageOrientation] = useState<"landscape" | "portrait">("landscape");
  const [showFloatingRole, setShowFloatingRole] = useState(false);

  const modalExpRef = useRef<HTMLDivElement>(null)
  const [selectedExp, setSelectedExp] = useState<number | null>(null)

  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)

  // Form
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Validation Form
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: ""
    }

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email"
    }

    if (form.message.trim().length < 10) {
      newErrors.message = "Minimum 10 characters"
    } else if (!/[a-zA-Z]/.test(form.message)) {
      newErrors.message = "Must contain real text"
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((e) => !e)
  }

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200); // kasih delay biar menu nutup dulu
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedAchievement === null) return

      if (e.key === "Escape") {
        setSelectedAchievement(null)
      }

      if (e.key === "ArrowRight") {
        setSelectedAchievement((prev) =>
          prev! < ACHIEVEMENTS.length - 1 ? prev! + 1 : prev
        )
      }

      if (e.key === "ArrowLeft") {
        setSelectedAchievement((prev) =>
          prev! > 0 ? prev! - 1 : prev
        )
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedAchievement])

  useEffect(() => {
    if (selectedExp !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedExp])

  useEffect(() => {
    if (selectedExp === null) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExp(null)
      if (e.key === "ArrowRight") {
        setSelectedExp((p) => (p! < EXPERIENCES.length - 1 ? p! + 1 : p))
      }
      if (e.key === "ArrowLeft") {
        setSelectedExp((p) => (p! > 0 ? p! - 1 : p))
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedExp])

  useEffect(() => {
    if (selectedOrg !== null) {
      setShowFloatingRole(false);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedOrg]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedOrg === null || !modalOrgRef.current) return;

      const el = modalOrgRef.current;

      // SCROLL DOWN
      if (e.key === "ArrowDown") {
        e.preventDefault();
        el.scrollBy({ top: 120, behavior: "smooth" });
      }

      // SCROLL UP
      if (e.key === "ArrowUp") {
        e.preventDefault();
        el.scrollBy({ top: -120, behavior: "smooth" });
      }

      // SCROLL TOP
      if (e.key === "Home") {
        e.preventDefault();
        el.scrollTo({ top: 0, behavior: "smooth" });
      }

      // SCROLL BOTTOM
      if (e.key === "End") {
        e.preventDefault();
        el.scrollTo({
          top: el.scrollHeight,
          behavior: "smooth",
        });
      }

      // CLOSE
      if (e.key === "Escape") {
        setSelectedOrg(null);
      }

      // NAV LEFT
      if (e.key === "ArrowLeft") {
        setSelectedOrg((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      }

      // NAV RIGHT
      if (e.key === "ArrowRight") {
        setSelectedOrg((prev) =>
          prev !== null && prev < ORGANIZATIONS.length - 1 ? prev + 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedOrg]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedCert === null) return;

      if (e.key === "ArrowRight") {
        setSelectedCert((prev) =>
          prev !== null && prev < CERTIFICATIONS.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedCert((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      }

      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          setSelectedCert(null);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCert, isZoomed]);

  useEffect(() => {
    if (selectedCert !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCert]);

  const chunkArray = (arr: Certification[], size: number): Certification[][] => {
    return arr.reduce<Certification[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };
  const certChunks = chunkArray(CERTIFICATIONS, 6);
  const isMultiPage = certChunks.length > 1;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const source = params.get("source");
    const role = params.get("role");

    if (
      source === "linkedin" ||
      source === "hr" ||
      role === "recruiter"
    ) {
      setIsRecruiter(true);
    }
  }, []);
    
  const email = "giffaniriz25@gmail.com";

  const subject = isRestricted
    ? isRecruiter
      ? `Recruiter Inquiry - ${project?.title}`
      : `Request Access - ${project?.title}`
    : `Project Inquiry - ${project?.title}`;

  const body = isRecruiter
    ? `Hello,%0D%0A%0D%0AI came across your project "${project?.title}" and would love to learn more about your experience and contribution.%0D%0A%0D%0ALooking forward to connecting with you.%0D%0A%0D%0ABest regards,`
    : `Hello,%0D%0A%0D%0AI am interested in your project "${project?.title}". Could I request access to the full documentation?%0D%0A%0D%0AThank you.`;

  // 🔥 AUTO SWITCH LINK
  const emailLink = isGmail(email)
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
    : `mailto:${email}?subject=${subject}&body=${body}`;
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!modalRef.current || selectedProject === null) return;

      const el = modalRef.current;

      // SCROLL
      if (e.key === "ArrowDown") {
        el.scrollBy({ top: 120, behavior: "smooth" });
      }

      if (e.key === "ArrowUp") {
        el.scrollBy({ top: -120, behavior: "smooth" });
      }

      // CLOSE
      if (e.key === "Escape") {
        setSelectedProject(null);
      }

      // ENTER ACTION
      if (e.key === "Enter") {
        const project = PROJECTS[selectedProject];

        // scroll dulu
        el.scrollTo({
          top: el.scrollHeight,
          behavior: "smooth",
        });

        // kalau banyak link → trigger button
        if (project.links && project.links.length > 1) {
          setTimeout(() => {
            viewBtnRef.current?.click();
            viewBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 400);
        }

        // kalau cuma 1 link → langsung buka
        else if (project.links && project.links.length === 1) {
          setTimeout(() => {
            window.open(project.links[0].url, "_blank");
          }, 400);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedProject]);
  
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => { document.head.removeChild(styleSheet) };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  useEffect(() => {
    setShowLinks(false);
  }, [selectedProject]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },

    {
      name: "Experience",
      dropdown: [
        { name: "Professional", href: "#experience" },
        { name: "Organizational", href: "#organization" }
      ]
    },

    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" }
  ]

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-500 ease-in-out font-sans antialiased overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
  
            {/* Image */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + Role */}
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-slate-900 dark:text-white">
                Giffani Rizky Febrian
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Data Analyst
              </span>
            </div>

          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link, idx) => (
                <div key={idx} className="relative group">

                  {/* NORMAL LINK */}
                  {!link.dropdown ? (
                    <a
                      href={link.href}
                      className="text-[14px] font-medium tracking-wide text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <>
                      {/* PARENT */}
                      <div className="flex items-center gap-1 cursor-pointer text-[14px] font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                        {link.name}
                        <ChevronDown size={14} />
                      </div>

                      {/* DROPDOWN */}
                      <div className="absolute top-full left-0 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 delay-75 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">

                        <div className="flex flex-col py-2">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="px-4 py-2 text-[14px] font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>

                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -mr-2 text-slate-900 dark:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((link) => (
                  <div key={link.name}>

                     {!link.dropdown ? (
                      <a
                        onClick={() => handleNavClick(link.href)}
                        className="cursor-pointer text-base font-semibold text-slate-700 dark:text-slate-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <div className="flex flex-col gap-2">

                        <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                          {link.name}
                        </span>

                        <div className="ml-3 flex flex-col gap-2">
                          {link.dropdown.map((item) => (
                            <a
                              onClick={() => handleNavClick(item.href)}
                              className="cursor-pointer text-base font-semibold text-slate-500 dark:text-slate-400"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>

                      </div>
                    )}

                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* TONE A: HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 w-full overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="relative z-10">

            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center md:justify-start"
            >
              <span className="px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 
             dark:bg-emerald-900/40 dark:text-emerald-300 text-xs font-bold tracking-widest uppercase border border-emerald-200 dark:border-emerald-800/50">
                Portfolio 2026
              </span>
            </motion.span>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight text-center md:text-left"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Giffan.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-10 leading-relaxed text-center md:text-left mx-auto md:mx-0"
            >
              {PERSONAL_DATA.headline} <br/><br/> {PERSONAL_DATA.shortIntro}

              <span className="block mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Specialized in Data Automation • Logistics Analytics • Process Optimization
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start"
            >
              <a href="#projects" className="px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-xl">
                Explore My Work <ChevronRight size={18} />
              </a>

              <a href="#contact" className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-semibold flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
                Let's Work Together
              </a>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-[460px] rounded-3xl overflow-hidden shadow-2xl group">

              {/* BACKGROUND COLLAGE (MOVING) */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex w-[200%] h-full animate-marquee-slow opacity-70">

                  {[...Array(2)].map((_, loop) => (
                    <div key={loop} className="grid grid-cols-8 gap-2 w-full p-3">
                      {Array.from({ length: 36 }).map((_, idx) => (
                        <img
                          key={idx}
                          src={`/collage/${idx + 1}.webp`}
                          loading="lazy"
                          className={`
                            w-full h-full object-cover rounded-md
                            transition duration-500
                            ${idx % 7 === 0 ? "row-span-2" : ""}
                          `}
                        />
                      ))}
                    </div>
                  ))}

                </div>
              </div>

              {/* BLUR DEPTH */}
              <div className="
                absolute inset-0 pointer-events-none
                [mask-image:linear-gradient(to_left,transparent_40%,black_70%,black)]
                backdrop-blur-[3px]
              " />

              {/* MAIN IMAGE (LEFT + FADE TO RIGHT) */}
              <div className="absolute inset-0 flex justify-start">

                <div className="w-[65%] h-full overflow-hidden">

                  <img 
                    src="/hero-image.jpg"
                    className="
                      w-full h-full
                      object-cover object-[50%_20%]
                      contrast-110 brightness-110
                      transition duration-700 ease-out
                      group-hover:scale-[1.03]

                      [mask-image:linear-gradient(to_right,black_45%,black_65%,transparent_100%)]
                    "
                  />

                </div>

              </div>

              {/* LEFT DARK GRADIENT (TEXT SUPPORT) */}
              <div className="
                absolute inset-0
                bg-gradient-to-r
                from-slate-900/80
                via-slate-900/40
                via-25%
                to-transparent
              " />

              {/* SUBTLE LIGHTING */}
              <div className="
                absolute inset-0
                bg-[radial-gradient(circle_at_35%_40%,rgba(255,255,255,0.10),transparent_60%)]
              " />

              {/* INTERACTION GLOW */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition duration-500
              " />

              {/* BOTTOM INFO CARD */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-lg">

                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <LineChart size={16} className="text-emerald-500"/>
                  Data-driven decision making
                </p>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      <Marquee />

      {/* TONE A: ABOUT SECTION */}
      <Section id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
              Who I Am
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About Me
            </h2>
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-8"></div>
            
            <div className="aspect-square rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden relative group shadow-lg">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
              />

              {/* overlay gradient biar text kebaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* TEXT OVERLAY */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
                <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                  <Database size={18} className="text-emerald-500"/>  
                  Data Meets Real-World Systems
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            {ABOUT_TEXT.map((paragraph, index) => (
              <p key={index} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                { label: "Data Analytics", icon: <LineChart size={20} /> },
                { label: "Quality Improvement", icon: <Award size={20} /> },
                { label: "Logistics Optimization", icon: <Settings size={20} /> },
                { label: "Process Automation", icon: <Code2 size={20} /> }
              ].map((highlight, idx) => (
                <div 
                  key={idx}  
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-1 transition-colors">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    {highlight.icon}
                  </div>
                  <span className="font-semibold text-sm md:text-base">{highlight.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* TONE B: SKILLS SECTION */}
      <Section id="skills" className="bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical & Soft Skills
          </h2>

          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
            Core Capabilities
          </span>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit acquired through academic rigor and hands-on industry experience.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:scale-110 transition">
                  {idx === 0 && <Code2 size={20} className="text-emerald-500" />}
                  {idx === 1 && <LineChart size={20} className="text-blue-500" />}
                  {idx === 2 && <Settings size={20} className="text-orange-500" />}
                  {idx === 3 && <Briefcase size={20} className="text-purple-500" />}
                </div>
                {skillGroup.category}
              </h3>
              <ul className="flex flex-col gap-4">
                {skillGroup.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TONE A: PROFESSIONAL EXPERIENCE SECTION */}
      <Section id="experience">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Professional Experience
          </h2>

          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block group-hover:tracking-widest transition-all duration-300">
            Professional Journey
          </span>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Hands-on experience delivering data-driven solutions, automation systems, and strategic insights across real-world operational environments.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-auto">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedExp(idx)}
              className="mb-14 ml-8 md:ml-12 relative group cursor-pointer"
            >

              {/* DOT */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-4 border-emerald-500 dark:border-emerald-400 group-hover:scale-125 transition-transform duration-300"></div>

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>

                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800/50 px-4 py-1.5 rounded-full w-fit">
                  {exp.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* COMPANY */}
                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {exp.company}
                </h4>

                {/* LOGO */}
                {exp.logo && (
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 mb-2">
                    <img
                      src={exp.logo}
                      className="w-[80%] h-[80%] object-contain"
                    />
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {exp.description}
              </p>

            </motion.div>
          ))}
        </div>
      </Section>

      {/* MODAL PROFESSIONAL EXPERIENCE */}
      <AnimatePresence>
        {selectedExp !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExp(null)}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
            >
              <X size={22} />
            </button>

            {/* NAV LEFT */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedExp((p) => (p! > 0 ? p! - 1 : p))
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronLeft size={22} />
            </button>

            {/* NAV RIGHT */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedExp((p) =>
                  p! < EXPERIENCES.length - 1 ? p! + 1 : p
                )
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronRight size={22} />
            </button>

            {/* MODAL BOX */}
            <motion.div
              ref={modalExpRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="w-full max-w-3xl h-[85vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >

              {/* IMAGE HEADER */}
              <div className="relative w-full aspect-[16/9] max-h-[300px] md:max-h-[340px] flex-shrink-0">

                <img
                  src={EXPERIENCES[selectedExp].image}
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">

                  {/* LOGO */}
                  {EXPERIENCES[selectedExp].logo && (
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <img
                        src={EXPERIENCES[selectedExp].logo}
                        className="w-[70%] h-[70%] object-contain"
                      />
                    </div>
                  )}

                  {/* TEXT */}
                  <div className="text-white">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {EXPERIENCES[selectedExp].role}
                    </h3>

                    <p className="text-emerald-300">
                      {EXPERIENCES[selectedExp].company}
                    </p>

                    <p className="text-xs text-white/70">
                      {EXPERIENCES[selectedExp].date}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-4">

                <p className="text-slate-600 dark:text-slate-400">
                  {EXPERIENCES[selectedExp].description}
                </p>

                <ul className="space-y-2">
                  {EXPERIENCES[selectedExp].impacts.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 mt-2 bg-emerald-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {EXPERIENCES[selectedExp].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {EXPERIENCES[selectedExp].link && (
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">

                    {(() => {
                      const link = EXPERIENCES[selectedExp].link!

                      return (
                        <div
                          onClick={() => {
                            if (link.type === "external" && link.url) {
                              window.open(link.url, "_blank")
                            }

                            if (link.type === "project") {
                              setSelectedExp(null)

                              setTimeout(() => {
                                setSelectedProject(link.projectIndex!)
                              }, 200)
                            }
                          }}
                          className="
                            group cursor-pointer
                            flex gap-4 items-center
                            p-4 rounded-xl
                            border border-slate-200 dark:border-slate-800
                            bg-white dark:bg-slate-900
                            transition duration-300
                            hover:shadow-md hover:-translate-y-0.5
                          "
                        >

                          {/* IMAGE (DIKECILIN & HORIZONTAL) */}
                          <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={link.image}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                          </div>

                          {/* TEXT */}
                          <div className="flex-1 min-w-0">
                            <p className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                              Related Resource <ExternalLink size={14} />
                            </p>

                            <h4 className="font-semibold text-slate-800 dark:text-white truncate">
                              {link.title}
                            </h4>

                            {/* DESCRIPTION (INI YANG TADI HILANG) */}
                            {link.description && (
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {link.description}
                              </p>
                            )}
                          </div>

                          {/* BUTTON */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()

                              if (link.type === "external" && link.url) {
                                window.open(link.url, "_blank")
                              }

                              if (link.type === "project") {
                                setSelectedExp(null)

                                setTimeout(() => {
                                  setSelectedProject(link.projectIndex!)
                                }, 200)
                              }
                            }}
                            className="
                              text-xs font-semibold
                              px-4 py-2 rounded-lg
                              bg-emerald-500 text-white
                              hover:bg-emerald-600
                              transition
                              shadow-sm group-hover:shadow-md
                              whitespace-nowrap
                            "
                          >
                            {link.buttonText}
                          </button>

                        </div>
                      )
                    })()}

                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TONE B: ORGANIZATIONAL EXPERIENCE SECTION (HORIZONTAL SCROLL) */}
      <section id="organization" className="py-20 md:py-32 w-full bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500 border-y border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
              Leadership & Strategy
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Organizational Experience
            </h2>

            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg">
              Strategic roles driving communication, team management, and event execution at scale.
            </p>
          </motion.div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex gap-3">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-slate-700 dark:text-white shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-slate-700 dark:text-white shadow-sm">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="relative w-full z-10">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 px-6 md:px-12 max-w-7xl mx-auto snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {ORGANIZATIONS.map((org, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 0.98 }}
                onClick={() => setSelectedOrg(idx)}
                className="cursor-pointer shrink-0 w-[85vw] sm:w-[420px] snap-center sm:snap-start bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black/50 transition-all duration-300 flex flex-col h-full group cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="
                    w-12 h-12 rounded-xl overflow-hidden 
                    bg-white dark:bg-slate-800 
                    flex items-center justify-center 
                    shadow-sm
                    group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]
                    transition-all duration-300
                    "
                  >
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt={org.organization}
                        className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <Users size={22} />
                    )}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    {org.date}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {org.role}
                </h3>
                <h4 className="text-emerald-600 dark:text-emerald-400 font-medium mb-6 flex items-center gap-2">
                  <Briefcase size={16} /> {org.organization}
                </h4>

                <ul className="flex flex-col gap-3 mb-8 mt-auto">
                  {org.impacts.map((impact, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 opacity-80"></span>
                      {impact}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="inline-block text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    # {org.tag}
                  </span>
                </div>
              </motion.div>
            ))}
            <div className="shrink-0 w-6 md:w-12"></div>
          </div>
        </div>
      </section>

      {/* MODAL ORGANIZATION EXPERIENCE */}
      <AnimatePresence>
        {selectedOrg !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrg(null)}
          >
            {/* CLOSE BUTTON (LUAR POJOK) */}
            <button
              onClick={() => setSelectedOrg(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white transition"
            >
              <X size={22} />
            </button>

            {/* NAV LEFT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOrg((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
              }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[60]
              p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20
              hover:bg-white/20 transition text-white"
            >
              <ChevronLeft size={22} />
            </button>

             {/* NAV RIGHT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOrg((prev) =>
                  prev !== null && prev < ORGANIZATIONS.length - 1 ? prev + 1 : prev
                );
              }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[60]
              p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20
              hover:bg-white/20 transition text-white"
            >
              <ChevronRight size={22} />
            </button>
            
            {/* CONTENT */}
            <motion.div
              ref={modalOrgRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col"
            >
              {/* IMAGE HEADER */}
              <div
                className={`relative w-full rounded-xl overflow-hidden transition-all duration-500 ${
                  imageOrientation[selectedOrg!] === "landscape"
                    ? "aspect-video"
                    : "aspect-[4/3]"
                }`}
              >
                <img
                  src={ORGANIZATIONS[selectedOrg].image}
                  alt={ORGANIZATIONS[selectedOrg].organization}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth > img.naturalHeight) {
                      setImageOrientation("landscape");
                    } else {
                      setImageOrientation("portrait");
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* LOGO (optional) */}
                {ORGANIZATIONS[selectedOrg].logo && (
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-white rounded-xl p-1 shadow">
                    <img
                      src={ORGANIZATIONS[selectedOrg].logo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <AnimatePresence>
                  {showFloatingRole && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="
                        absolute bottom-7 left-20 z-20
                        text-2xl md:text-3xl font-bold text-slate-900 text-white
                      "
                    >
                      {ORGANIZATIONS[selectedOrg].role}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TEXT */}
              <div 
                className="p-8 md:p-10 flex flex-col gap-6 overflow-y-auto"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
                  setScrollProgress(progress);

                  // trigger role muncul setelah scroll dikit
                  setShowFloatingRole(el.scrollTop > 80);
                }}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {ORGANIZATIONS[selectedOrg].role}
                  </h3>

                  <p className="text-sm text-emerald-500 font-medium">
                    {ORGANIZATIONS[selectedOrg].organization}
                  </p>

                  <p className="text-xs text-slate-400">
                    {ORGANIZATIONS[selectedOrg].date}
                  </p>
                </div>

                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ORGANIZATIONS[selectedOrg].overview}
                </p>

                {ORGANIZATIONS[selectedOrg].metrics && (
                  <div className="flex flex-wrap gap-3">
                    {ORGANIZATIONS[selectedOrg].metrics.map((m, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="space-y-2">
                  {ORGANIZATIONS[selectedOrg].impacts.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 mt-2 bg-emerald-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                {ORGANIZATIONS[selectedOrg].tools && (
                  <div className="flex flex-wrap gap-2">
                    {ORGANIZATIONS[selectedOrg].tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-xs uppercase text-emerald-500 mb-1">
                    Key Impact
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {ORGANIZATIONS[selectedOrg].highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TONE A: PROJECTS SECTION */}
      <Section id="projects">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Selected Projects
          </h2>

          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block group-hover:tracking-widest transition-all duration-300">
            Data & System Projects
          </span>

          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
            A showcase of data analytics, forecasting models, and operational automation systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(idx)}
              className="cursor-pointer group flex flex-col group bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-black/50 transition-all duration-300 h-full"
            >
              <div className="relative h-48 overflow-hidden border-b border-slate-200 dark:border-slate-800">

                {/* BACKGROUND IMAGE */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="relative p-6 flex flex-col justify-end h-full z-10">

                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                    {project.title}
                  </h3>

                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.short}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Impact / Focus</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-300">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* MODAL DETAIL PROJECTS */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              ref={modalRef}
              className="w-full max-w-4xl h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent bg-white dark:bg-slate-900 rounded-2xl flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl"
            
              onScroll={(e) => {
                const el = e.currentTarget;
                const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
                setScrollProgress(progress);
              }}
            >
              {/* Header */}
              <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">

                {/* Progress Bar */}
                <div className="h-[2px] bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>

                <div className="p-6 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {project?.title}
                  </h3>

                  {/* CLOSE */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-10">

                {/* HERO VISUAL */}
                <div className="relative h-56 rounded-xl overflow-hidden">

                  {/* IMAGE */}
                  {PROJECTS[selectedProject].image && (
                    <img
                      src={PROJECTS[selectedProject].image}
                      alt={project?.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* OPTIONAL LABEL */}
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                    Project Overview
                  </div>
                </div>

                {/* TECH + TITLE */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    {PROJECTS[selectedProject].tech}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                    {project?.title}
                  </h3>
                </div>

                {/* PROBLEM / CONTEXT */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Context</p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {PROJECTS[selectedProject].description}
                  </p>
                </div>

                {/* WHAT I DID */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs uppercase tracking-wider text-slate-400">What I Did</p>

                  <ul className="space-y-2">
                    {PROJECTS[selectedProject].details.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="mt-[6px] w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IMPACT (highlight section) */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    Impact
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {PROJECTS[selectedProject].impact}
                  </p>
                </div>

                {/* PERSONAL CONTRIBUTION */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-wider text-slate-400">My Contribution</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {PROJECTS[selectedProject].contribution}
                  </p>
                </div>

                {/* LINKS */}
                <div className="mt-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  
                  {PROJECTS[selectedProject].links && PROJECTS[selectedProject].links.length > 0 ? (

                    PROJECTS[selectedProject].links.length === 1 ? (
                      <a
                        href={PROJECTS[selectedProject].links[0].url}
                        target="_blank"
                        className="w-full block text-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all hover:scale-[1.02]"
                      >
                        {PROJECTS[selectedProject].links[0].label}
                      </a>
                    ) : (
                      <>
                        <button
                          ref={viewBtnRef}
                          onClick={() => setShowLinks(!showLinks)}
                          className="w-full px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all hover:scale-[1.02]"
                        >
                          View Full Project
                        </button>

                        <AnimatePresence>
                          {showLinks && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-5 grid md:grid-cols-2 gap-5"
                            >
                              {PROJECTS[selectedProject].links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                >
                                  <div className="relative h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">

                                    <div className="h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                      {link.thumbnail ? (
                                        <img
                                          src={link.thumbnail}
                                          alt={link.label}
                                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center opacity-30">
                                          {getLinkIcon(link.type)}
                                        </div>
                                      )}
                                    </div>

                                    <div className="p-4 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                          {getLinkIcon(link.type)}
                                        </div>

                                        <div className="flex flex-col leading-tight">
                                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                            {link.label}
                                          </span>
                                          <span className="text-xs text-slate-500">
                                            Open resource
                                          </span>
                                        </div>
                                      </div>

                                      <ExternalLink
                                        size={16}
                                        className="opacity-40 group-hover:opacity-100 transition"
                                      />
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )

                  ) : (
                    <div className="text-sm text-slate-400 italic text-center leading-relaxed flex flex-col items-center gap-4">
  
                      {project?.type === "progress" ? (
                        <>
                          🚧 This project is currently in progress and not yet publicly available. <br/>
                          Full documentation will be available soon after publication.
                        </>
                      ) : (
                        <>
                          🔒 Full documentation for this project is restricted to protect confidential data. <br/>
                          For detailed insights, feel free to contact the author directly.
                        </>
                      )}

                      {/* BUTTON REQUEST ACCESS (ONLY FOR RESTRICTED) */}
                      {project?.type === "restricted" && (
                        <a
                          href={emailLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                          bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 
                          text-white text-sm font-semibold 
                          transition-all hover:scale-[1.03] shadow-lg"
                        >
                          <Mail size={16} />
                          {isRecruiter ? "Contact Me" : "Request Access"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TONE B: EDUCATION (HORIZONTAL TIMELINE) */}
      <Section id="education" className="bg-slate-50 dark:bg-slate-900/40">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Education
          </h2>

          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block group-hover:tracking-widest transition-all duration-300">
            Academic Foundation
          </span>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A continuous journey of building analytical thinking, structured problem-solving, and real-world perspective.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">

          {/* SCROLL */}
          <div
            ref={eduScrollRef}
            onScroll={handleEduScroll}
            className={`
              flex gap-10 md:gap-20 pb-16 px-6 md:px-12 snap-x snap-mandatory scroll-smooth overflow-x-auto scrollbar-none
              ${EDUCATION.length < 3 ? "justify-center" : ""}
            `}
          >

            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex flex-col items-center min-w-[320px] group"
              >

                {/* YEAR */}
                <span className="
                  text-emerald-600 dark:text-emerald-400
                  font-bold tracking-wide text-sm mb-2
                  transition-all duration-300
                  group-hover:scale-110
                ">
                  {edu.period}
                </span>

                {/* DOT */}
                <div className="relative z-10">
                  <div
                    className="
                      w-5 h-5 rounded-full
                      bg-white dark:bg-slate-900
                      border-4 border-emerald-500 dark:border-emerald-400
                      transition-all duration-300
                      group-hover:scale-125
                      group-hover:shadow-[0_0_18px_rgba(16,185,129,0.8)]
                    "
                  />
                </div>

                {/* CONNECTING LINE (DOT → DOT) */}
                {idx !== EDUCATION.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.2, duration: 0.6 }}
                    className="
                      absolute top-[10px] left-[calc(100%+4px)] h-[2px] w-[100px]
                      origin-right
                      bg-gradient-to-l from-emerald-400 to-slate-300
                      dark:from-emerald-400 dark:to-slate-700
                    "
                  />
                )}

                {/* CARD */}
                <motion.a
                  href={edu.link}
                  target="_blank"
                  className="
                    relative flex flex-col items-center
                    min-w-[260px] md:min-w-[320px] snap-center group
                    rounded-3xl overflow-hidden shadow-lg
                    hover:shadow-2xl transition-all duration-300
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={edu.image}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition duration-700"
                  />

                  {/* DARK OVERLAY (FIX TEXT VISIBILITY) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

                  {/* TEXT */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="text-lg font-bold leading-tight drop-shadow">
                      {edu.name}
                    </h3>

                    <p className="text-sm opacity-90">
                      {edu.degree}
                    </p>

                    <p className="text-xs opacity-90 mt-2 leading-relaxed">
                      {edu.highlight}
                    </p>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* PROGRESS SCROLL */}
          <div className="mt-6 h-[3px] bg-slate-700/30 rounded-full overflow-hidden">
            <div
              style={{ width: `${eduProgress}%` }}
              className="h-full bg-emerald-400 transition-all duration-300"
            />
          </div>

        </div>
      </Section>

      {/* TONE A: CERTIFICATION (SLIDE CARD)*/}
      <Section id="certifications" className="bg-white dark:bg-slate-950">
        <div
          className={`
            max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10 transition-all duration-500
            ${isMultiPage 
              ? "flex flex-col md:flex-row md:items-end justify-between gap-6" 
              : "text-center"}
          `}
        >

          {/* LEFT: ARROWS (ONLY IF MULTI) */}
          {isMultiPage && (
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => setCertPage((p) => Math.max(p - 1, 0))}
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 
                bg-white dark:bg-slate-950 flex items-center justify-center 
                hover:bg-slate-100 dark:hover:bg-slate-800 
                hover:border-slate-300 dark:hover:border-slate-700 
                transition-all text-slate-700 dark:text-white shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() =>
                  setCertPage((p) => Math.min(p + 1, certChunks.length - 1))
                }
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 
                bg-white dark:bg-slate-950 flex items-center justify-center 
                hover:bg-slate-100 dark:hover:bg-slate-800 
                hover:border-slate-300 dark:hover:border-slate-700 
                transition-all text-slate-700 dark:text-white shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
              ${isMultiPage ? "text-right ml-auto" : "text-center mx-auto"}
            `}
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
              Continuous Learning
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Certifications
            </h2>

            <p
              className={`
                text-slate-600 dark:text-slate-400 text-lg
                ${isMultiPage ? "max-w-xl ml-auto" : "max-w-xl mx-auto"}
              `}
            >
              Continuous learning through curated programs and applied training.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-7xl px-6 md:px-12">

            <AnimatePresence mode="wait">
              <motion.div
                key={certPage}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
              >
                {certChunks[certPage].map((cert: Certification, idx: number) => (
                  <div key={idx} className="w-full max-w-sm">
                    
                    <motion.div
                      onClick={() => setSelectedCert(idx + certPage * 6)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                      }}
                      className="relative cursor-pointer group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition hover:shadow-2xl"
                    >

                      {/* GLOW FOLLOW CURSOR */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                        style={{
                          background:
                            "radial-gradient(600px circle at var(--x) var(--y), rgba(16,185,129,0.15), transparent 40%)",
                        }}
                      />

                      {/* IMAGE */}
                      <div className="h-40 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* TEXT */}
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-slate-500">{cert.issuer}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* MODAL CERT */}
      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            {/* NAV */}
            {/* LEFT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCert((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
              }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[60]
              p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20
              hover:bg-white/20 transition text-white"
            >
              <ChevronLeft size={22} />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCert((prev) =>
                  prev !== null && prev < CERTIFICATIONS.length - 1 ? prev + 1 : prev
                );
              }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[60]
              p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20
              hover:bg-white/20 transition text-white"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100 && selectedCert > 0) {
                  setSelectedCert(selectedCert - 1);
                } else if (
                  info.offset.x < -100 &&
                  selectedCert < CERTIFICATIONS.length - 1
                ) {
                  setSelectedCert(selectedCert + 1);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-5xl h-[70vh] bg-white dark:bg-slate-900 rounded-2xl flex overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white transition"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* LEFT IMAGE */}
                <div className="md:w-[55%] h-full bg-black flex items-center justify-center">
                  <img
                    src={CERTIFICATIONS[selectedCert].image}
                    onClick={() => setIsZoomed(true)}
                    className="cursor-zoom-in max-h-full max-w-full object-contain transition duration-300 hover:scale-[1.02]"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="md:w-[45%] p-6 flex flex-col justify-center gap-4">

                  <h3 className="pointer-events-none text-xl font-bold text-slate-900 dark:text-white">
                    {CERTIFICATIONS[selectedCert].title}
                  </h3>

                  <p className="pointer-events-none text-sm text-slate-500">
                    {CERTIFICATIONS[selectedCert].issuer}
                  </p>

                  <p className="pointer-events-none text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {CERTIFICATIONS[selectedCert].description}
                  </p>

                </div>
              </div>

              {/* DOT TRACK DRAGGABLE */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {CERTIFICATIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCert(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === selectedCert
                        ? "w-6 h-2 bg-gradient-to-r from-emerald-400 to-blue-500"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isZoomed && selectedCert !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100 && selectedCert > 0) {
                  setSelectedCert(selectedCert - 1);
                } else if (
                  info.offset.x < -100 &&
                  selectedCert < CERTIFICATIONS.length - 1
                ) {
                  setSelectedCert(selectedCert + 1);
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={selectedCert}
              src={CERTIFICATIONS[selectedCert].image}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: doubleZoom ? 2 : scale, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onDoubleClick={() => setDoubleZoom((prev) => !prev)}
              onTouchStart={(e) => {
                if (e.touches.length === 2) {
                  setInitialDistance(getDistance(e.touches));
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && initialDistance) {
                  const newDistance = getDistance(e.touches);
                  const zoom = newDistance / initialDistance;
                  setScale(Math.min(Math.max(zoom, 1), 3));
                }
              }}
              onTouchEnd={() => setInitialDistance(null)}
              className="max-w-[95vw] max-h-[95vh] object-contain cursor-zoom-in"
            />

            {/* CLOSE */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TONE B: ACHIEVEMENT SECTION */}
      <Section id="achievement" className="bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm">
              Honors & Recognition
            </span>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Recognized for Research & Analytical Contribution
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Selected through national-level evaluation, reflecting strong ability
              in translating statistical analysis into meaningful insights.
            </p>

            {/* MAIN CARD */}
            <div 
              onClick={() => setSelectedAchievement(0)}
              className="mt-6 p-6 rounded-2xl border cursor-pointer
              border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">
                {ACHIEVEMENTS[0].title}
              </h3>

              <p className="text-emerald-600 font-medium mt-1">
                {ACHIEVEMENTS[0].organization}
              </p>

              <p className="text-sm text-slate-500 mt-3">
                <span className="font-semibold">Project:</span>{" "}
                {ACHIEVEMENTS[0].description}
              </p>
            </div>
          </motion.div>


          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >

            {/* GLOW */}
            <div className="absolute w-[300px] h-[300px] bg-emerald-500/20 blur-[120px] rounded-full" />

            {/* TROPHY */}
            <motion.div
              initial={{ y: 60, rotate: -8, opacity: 0 }}
              whileInView={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Award size={60} className="text-white" />
              </div>
            </motion.div>

            {/* CERT PREVIEW */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedAchievement(0)}
              className="absolute bottom-[-30px] right-[-20px] w-52 cursor-pointer
              rounded-2xl overflow-hidden border
              border-slate-200 dark:border-slate-800
              shadow-xl bg-white dark:bg-slate-900"
            >
              <img
                src={ACHIEVEMENTS[0].certificateImage}
                className="w-full h-32 object-cover"
              />
              <div className="p-3 text-xs text-slate-600">
                View Certificate
              </div>
            </motion.div>

          </motion.div>

        </div>
      </Section>

      {/* MODAL ACHIEVEMENT */}
      <AnimatePresence>
        {selectedAchievement !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >

            {/* LEFT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedAchievement((p) => p! > 0 ? p! - 1 : p)
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronLeft size={22} />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedAchievement((p) =>
                  p! < ACHIEVEMENTS.length - 1 ? p! + 1 : p
                )
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronRight size={22} />
            </button>

            {/* CONTENT */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-5xl h-[70vh]
              bg-white dark:bg-slate-900 rounded-2xl flex overflow-hidden"
            >

              {/* CLOSE */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white"
              >
                <X size={20} />
              </button>

              {/* LEFT IMAGE AREA */}
              <div className="w-[55%] bg-black flex flex-col">

                {/* MAIN CERT */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={ACHIEVEMENTS[selectedAchievement].certificateImage}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* OPTIONAL EVENT IMAGE */}
                {ACHIEVEMENTS[selectedAchievement].eventImage && (
                  <div className="h-32 border-t border-white/10">
                    <img
                      src={ACHIEVEMENTS[selectedAchievement].eventImage}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

              </div>

              {/* RIGHT TEXT */}
              <div className="w-[45%] p-8 flex flex-col justify-center gap-4">

                <h3 className="text-xl font-bold">
                  {ACHIEVEMENTS[selectedAchievement].title}
                </h3>

                <p className="text-sm text-slate-500">
                  {ACHIEVEMENTS[selectedAchievement].organization}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ACHIEVEMENTS[selectedAchievement].detail}
                </p>

                {/* LINK */}
                {ACHIEVEMENTS[selectedAchievement].link && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">

                    <div
                      onClick={() => window.open(ACHIEVEMENTS[selectedAchievement].link.url, "_blank")}
                      className="group cursor-pointer flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition"
                    >
                      
                      <div>
                        <p className="text-xs text-slate-500">Research Output</p>
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {ACHIEVEMENTS[selectedAchievement].link.title}
                        </p>
                      </div>

                      <button className="text-sm px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
                        {ACHIEVEMENTS[selectedAchievement].link.buttonText}
                      </button>

                    </div>

                  </div>
                )}

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TONE A: CONTACT SECTION */}
      <Section id="contact">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Connect</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
              I am open to opportunities in Data Analytics, Operations, and Logistics, especially roles involving data-driven decision making and process improvement. Feel free to reach out to discuss potential collaborations!
            </p>
            
            <div className="flex flex-col gap-8">
              <a href={`mailto:${PERSONAL_DATA.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all group-hover:scale-110 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 group-hover:border-red-200 dark:group-hover:border-red-800/50 shadow-sm">
                  <FaGoogle size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{PERSONAL_DATA.email}</p>
                </div>
              </a>
              
              <a href={PERSONAL_DATA.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 group-hover:border-blue-200 dark:group-hover:border-blue-800/50 shadow-sm">
                  <FaLinkedin size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">LinkedIn</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">linkedin.com/in/giffanifebrian</p>
                </div>
              </a>

              <a href={`https://wa.me/${PERSONAL_DATA.phone}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-500 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50 shadow-sm">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">+{PERSONAL_DATA.phone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form UI */}
          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault()

                if (!validateForm()) return

                setLoading(true)

                try {
                  const res = await fetch("https://formspree.io/f/xkokdlyn", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...form,
                      _subject: "New Portfolio Message"
                    })
                  })

                  if (res.ok) {
                    setToast({ type: "success", message: "Message sent successfully 🚀" })
                    setForm({ name: "", email: "", message: "" })
                  } else {
                    setToast({ type: "error", message: "Failed to send message" })
                  }

                } catch {
                  setToast({ type: "error", message: "Something went wrong" })
                }

                setLoading(false)

                setTimeout(() => setToast(null), 3000)
              }}
              className="flex flex-col gap-6"
            >
              {/* NAME */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`px-5 py-4 rounded-xl border transition
                  ${errors.name 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-slate-200 focus:ring-emerald-500"}
                  bg-white dark:bg-slate-950`}
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`px-5 py-4 rounded-xl border transition
                  ${errors.email 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-slate-200 focus:ring-emerald-500"}
                  bg-white dark:bg-slate-950`}
                  placeholder="yourmail@example.com"
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>

              {/* MESSAGE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className={`px-5 py-4 rounded-xl border transition resize-none
                  ${errors.message 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-slate-200 focus:ring-emerald-500"}
                  bg-white dark:bg-slate-950`}
                  placeholder="How can we work together?"
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition active:scale-[0.98]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {toast && (
              <div className="fixed top-6 right-6 z-50">
                <div className={`
                  px-6 py-4 rounded-xl shadow-lg text-white text-sm font-medium
                  ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}
                  animate-slide-in
                `}>
                  {toast.message}
                </div>
              </div>
            )}

          </div>
        </div>
      </Section>

      {/* TONE B: FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-14 bg-slate-50 dark:bg-slate-900/40">
        <div className="flex flex-col items-center justify-center gap-3 text-center">

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
            <img 
              src="/avatar.jpg"
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>

          {/* NAME */}
          <p className="text-slate-900 dark:text-white font-medium font-semibold text-sm leading-tight">
            {PERSONAL_DATA.name}
          </p>

          {/* TAGLINE */}
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-snug">
            Turning data into actionable insights for operational excellence.
          </p>

          {/* COPYRIGHT */}
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
            © 2026 All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}
