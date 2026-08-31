export interface ProfileInfo {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  hometownLocation?: string;
  birthday?: string;
  linkedin: string;
  github: string;
  twitter: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  resumeUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'devops' | 'ai' | 'programming';
  level: number; // 0 to 100
  yearsOfExperience: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  duration: string;
  challenges: string;
  features: string[];
  learningOutcome: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'award' | 'certification' | 'hackathon' | 'competition';
  badgeUrl?: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  university: string;
  cgpa: string;
  graduationYear: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}
