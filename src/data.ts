import { ProfileInfo, Skill, Project, Achievement, Experience, Education, BlogPost } from './types';

export const defaultProfileInfo: ProfileInfo = {
  name: "DHARMENTHIRA BOOPATHI S",
  title: "B.E. COMPUTER SCIENCE AND ENGINEERING",
  avatar: "",
  bio: "Hello! I'm Dharmenthira Boopathi S, a B.E. Computer Science & Engineering student at Sri Ramakrishna Institute of Technology (SRIT).\n\nI have a strong interest in technology and enjoy learning how software can solve real-world problems. I'm currently exploring Full Stack Web Development and continuously improving my programming skills in C, C++, and Python.\n\nBeyond coding, I'm interested in AI-powered web development, Ethical Hacking, Cybersecurity, and Stock Market Investing. I enjoy learning new concepts, working on projects, and expanding my technical knowledge every day.\n\nMy goal is to build practical skills, gain industry experience, and grow as a software developer. I'm always open to learning from others, collaborating on meaningful projects, and connecting with professionals in the tech community.",
  email: "poopathiraja504@gmail.com",
  phone: "+91 90435 33218",
  location: "Sri Ramakrishna Institute of Technology, Coimbatore",
  hometownLocation: "",
  birthday: "14-June-2008",
  linkedin: "https://www.linkedin.com/in/dharmenthira-boopathi-s-7087563a8",
  github: "https://github.com/boopathi-2404",
  twitter: "https://x.com/dharmenthi7gec",
  facebook: "https://www.facebook.com/share/1FCuFmuQqA/",
  instagram: "https://www.instagram.com/boopathi.__.08?igsh=MTA5ZTQ2a2k1dmZvZg==",
  telegram: "https://t.me/boopathi_008",
  resumeUrl: "#"
};

export const defaultSkills: Skill[] = [
  { id: 's1', name: 'C', category: 'programming', level: 85, yearsOfExperience: 2 },
  { id: 's2', name: 'C++', category: 'programming', level: 82, yearsOfExperience: 2 },
  { id: 's3', name: 'PYTHON', category: 'programming', level: 88, yearsOfExperience: 2 },
  { id: 's4', name: 'FULL STACK DEVELOPER', category: 'frontend', level: 90, yearsOfExperience: 2 },
  { id: 's5', name: 'FRONTEND DEVELOPER', category: 'frontend', level: 92, yearsOfExperience: 2 },
  { id: 's6', name: 'BACKEND DEVELOPER', category: 'backend', level: 86, yearsOfExperience: 2 },
  { id: 's7', name: 'STOCK MARKET INVESTOR', category: 'ai', level: 80, yearsOfExperience: 2 },
  { id: 's8', name: 'AI IN WEB DEVELOPMENT', category: 'ai', level: 85, yearsOfExperience: 2 },
  { id: 's9', name: 'ETHICAL HACKING ENTHUSIAST', category: 'devops', level: 82, yearsOfExperience: 2 }
];

export const defaultProjects: Project[] = [
  {
    id: 'proj1',
    name: "Noval Reading - Interactive Novel Portal",
    category: "Web",
    description: "An elegant, responsive web portal designed for enjoying novels across various genres, carefully crafted to enhance user engagement, vocabulary retention, critical thinking, and storytelling discovery.",
    technologies: ["C", "C++", "Python", "GitHub Pages"],
    imageUrl: "",
    demoUrl: "https://kaviyam-reading.netlify.app/",
    githubUrl: "https://github.com/boopathi-2404",
    duration: "2 Months",
    challenges: "Creating smooth, book-like slide animations and layout density scales that remain perfectly readable on ultra-narrow mobile displays.",
    features: [
      "Designed clean interactive user interfaces and typography grids with Figma.",
      "Developed custom CSS-animated transitions for novel chapter flips.",
      "Optimized file payloads and responsive imagery structures to guarantee rapid rendering.",
      "Successfully deployed and automated publication cycles using GitHub workflow integrations."
    ],
    learningOutcome: "Deepened practical skills in fluid grid sizing, cross-browser styling capabilities, and direct platform deployment via Git."
  },
  {
    id: 'proj3',
    name: "Web Performance Portfolio & Branding",
    category: "Web",
    description: "An ultra-fast personal branding platform optimized for performance index matrices, utilizing minification and critical rendering paths.",
    technologies: ["C", "C++", "Python"],
    imageUrl: "",
    demoUrl: "#",
    githubUrl: "https://github.com/boopathi-2404",
    duration: "1 Month",
    challenges: "Resolving blocking third-party fonts and stylesheet loading processes to achieve sub-second contentful paint times.",
    features: [
      "Optimized website page load speeds, reducing network latency.",
      "Minified stylesheet delivery pipelines and removed redundant layouts.",
      "Created highly adaptive layout grids that support fluid dynamic desktop and touch resizing.",
      "Configured automatic SEO tag generation and localized semantic elements."
    ],
    learningOutcome: "Acquired a comprehensive understanding of Chrome developer tools, Core Web Vitals, and resource prefetching techniques."
  },
  {
    id: 'proj4',
    name: "MathWorks Analytical Automation Script",
    category: "Data Analysis",
    description: "Automated statistical analysis script that cleans and parses large datasets, extracts targeted sub-segments, and computes complex grouping aggregations.",
    technologies: ["Python", "MathWorks APIs", "Data Analysis"],
    imageUrl: "",
    demoUrl: "#",
    githubUrl: "https://github.com/boopathi-2404",
    duration: "1.5 Months",
    challenges: "Optimizing outlier removal routines and missing-row replacement operations to run dynamically on complex grouped datasets.",
    features: [
      "Built clean, reusable programmatic pipelines to filter anomalies and standardize tabular formats.",
      "Extracted dynamic slices of localized parameters using custom subset indexing formulas.",
      "Performed calculations on grouped sets of metrics to yield predictive trend insights."
    ],
    learningOutcome: "Applied advanced data modeling, data wrangling routines, and statistical analysis structures practically."
  }
];

export const defaultAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: "Sole Developer & Architect",
    organization: "Noval Reading Platform Project",
    date: "2026",
    description: "Designed, styled, and completed a clean book browsing showcase with responsive layouts, fluid animations, and robust asset structures.",
    type: "award",
    badgeUrl: "🏆"
  },
  {
    id: 'ach2',
    title: "Technical Excellence Coursework",
    organization: "Sri Ramakrishna Institute of Technology",
    date: "2025",
    description: "Awarded top grades in programming foundations covering structured C algorithms, object-oriented C++, and dynamic scripting with Python.",
    type: "certification",
    badgeUrl: "🛡️"
  },
  {
    id: 'math1',
    title: "Find and Extract Subsets of Data",
    organization: "MathWorks | Training Services",
    date: "July 2, 2026",
    description: "Completed specialized training covering data filtering, indexing techniques, and programmatically extracting subsets of tabular data.",
    type: "certification",
    badgeUrl: "📊"
  },
  {
    id: 'math2',
    title: "Calculations on Grouped Data",
    organization: "MathWorks | Training Services",
    date: "July 2, 2026",
    description: "Mastered data aggregation, split-apply-combine techniques, and programmatic computations on grouped dataset structures.",
    type: "certification",
    badgeUrl: "📐"
  },
  {
    id: 'math3',
    title: "Tables",
    organization: "MathWorks | Training Services",
    date: "July 2, 2026",
    description: "Acquired credentials for creating, combining, managing, and manipulating tabular structures, metadata, and data analysis variables.",
    type: "certification",
    badgeUrl: "📋"
  },
  {
    id: 'math4',
    title: "Common Data Analysis Techniques",
    organization: "MathWorks | Training Services",
    date: "July 2, 2026",
    description: "Certified in utilizing standard analytical techniques, modeling algorithms, statistical checks, and numerical computations.",
    type: "certification",
    badgeUrl: "🧪"
  },
  {
    id: 'math5',
    title: "Clean and Prepare Data for Analysis",
    organization: "MathWorks | Training Services",
    date: "July 2, 2026",
    description: "Acquired credentials in outliers detection, filtering missing data rows, replacing anomalous values, and standardizing data formats for statistical integrity.",
    type: "certification",
    badgeUrl: "🧹"
  }
];

export const defaultExperiences: Experience[] = [
  {
    id: 'exp1',
    company: "Sri Ramakrishna Institute of Technology",
    position: "Computer Science & Engineering Student Developer",
    duration: "1 Year (2025 - Present)",
    responsibilities: [
      "Mastered low-level software fundamentals and application logic using C, C++, and Python.",
      "Specialized as a Full Stack Developer, crafting responsive user interfaces as a Frontend Developer and secure API architectures as a Backend Developer.",
      "Analyzed financial trends and market models as an active Stock Market Investor.",
      "Integrated Gemini AI models and smart automation tools with AI in Web Development.",
      "Researched cybersecurity compliance and safety principles as an Ethical Hacking Enthusiast."
    ],
    technologies: [
      "C",
      "C++",
      "PYTHON",
      "FULL STACK DEVELOPER",
      "FRONTEND DEVELOPER",
      "BACKEND DEVELOPER",
      "STOCK MARKET INVESTOR",
      "AI IN WEB DEVELOPMENT",
      "ETHICAL HACKING ENTHUSIAST"
    ]
  }
];

export const defaultEducation: Education[] = [
  {
    id: 'edu1',
    degree: "B.E. Computer Science and Engineering",
    college: "Sri Ramakrishna Institute of Technology, Coimbatore",
    university: "Anna University",
    cgpa: "Pursuing (Class of 2029)",
    graduationYear: "2029"
  },
  {
    id: 'edu2',
    degree: "Higher Secondary (12th)",
    college: "Government Boys Higher Secondary School, Tamil Nadu",
    university: "State Board",
    cgpa: "62.8%",
    graduationYear: "2025"
  },
  {
    id: 'edu3',
    degree: "Secondary (10th)",
    college: "Government Boys Higher Secondary School, Tamil Nadu",
    university: "State Board",
    cgpa: "69.2%",
    graduationYear: "2023"
  }
];

export const defaultBlogs: BlogPost[] = [
  {
    id: 'blog1',
    title: "Optimizing Web Performance: A Junior Developer's Guide to Instant Page Loads",
    summary: "Web performance isn't just for senior engineers. Here's a practical checklist covering asset minification, image scaling, and reducing render-blocking CSS in your frontend designs.",
    content: `## The Secret to Blazing-Fast Frontend Designs

Creating interactive web portals is extremely rewarding, but a slow page load can turn users away. For anyone starting in web development, mastering page performance from day one is highly beneficial.

### Practical Optimization Pillars

1. **Asset Compression**: Compress high-resolution layout banners from Unsplash into optimized modern formats (like WebP) before linking them.
2. **Minify Codebases**: Remove comments, spacing, and repetitive declarations in your production-bound HTML, CSS, and JS files.
3. **Avoid Render Blocking**: Load heavy script files asynchronously or place them at the very bottom of the document body.

### A Code Performance Checklist

- Compress all images using free layout tools (such as Figma or Canva).
- Leverage modern browser features like pre-fetching and lazy-loading attributes:
\`\`\`html
<img src="novel_cover.jpg" alt="Book Cover" loading="lazy">
\`\`\`

By incorporating these minor structural adjustments, you can achieve sub-second loading metrics across all screen resolutions!`,
    category: "Performance Engineering",
    date: "June 14, 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    id: 'blog2',
    title: "Structured Programming Foundations: Python vs. C/C++",
    summary: "Navigating the syntax and logic patterns of structured low-level languages and dynamic scripts to build a versatile problem-solving toolkit.",
    content: `## Bridging Python and C++

As Computer Science students, learning different paradigms of computer programming helps us understand how operating systems manage computation underneath our beautiful layouts.

### Comparing low-level compile steps and dynamic scripting

- **C / C++**: Gives you explicit control over hardware, memory address allocation, and system execution structures. It teaches the rigor of syntax and compiling.
- **Python**: A powerful, readable, high-level language ideal for prototyping algorithms, manipulating file structures, and data science workflows.

### Structured Algorithm Snippet

Here is a simple look at comparing structured looping. In C/C++:

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    for(int i = 0; i < 5; i++) {
        cout << "Iteration: " << i << endl;
    }
    return 0;
}
\`\`\`

And the same implementation in Python:

\`\`\`python
for i in range(5):
    print(f"Iteration: {i}")
\`\`\`

Both forms achieve the same output, but understanding both paradigms empowers you with infinite capability.`,
    category: "Languages & Logics",
    date: "May 2, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=250"
  }
];
