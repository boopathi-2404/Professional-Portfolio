import { useState, useEffect } from 'react';
import { ProfileInfo, Skill, Project, Achievement, Experience, Education, BlogPost, ContactMessage } from './types';
import { defaultProfileInfo, defaultSkills, defaultProjects, defaultAchievements, defaultExperiences, defaultEducation, defaultBlogs } from './data';

export interface PortfolioData {
  profile: ProfileInfo;
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  experiences: Experience[];
  education: Education[];
  blogs: BlogPost[];
}

export function usePortfolio() {
  const [profile, setProfile] = useState<ProfileInfo>(defaultProfileInfo);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    const localProfile = localStorage.getItem('portfolio_profile');
    const localSkills = localStorage.getItem('portfolio_skills');
    const localProjects = localStorage.getItem('portfolio_projects');
    const localAchievements = localStorage.getItem('portfolio_achievements');
    const localExperiences = localStorage.getItem('portfolio_experiences');
    const localEducation = localStorage.getItem('portfolio_education');
    const localBlogs = localStorage.getItem('portfolio_blogs');

    if (localProfile) {
      try {
        const parsed = JSON.parse(localProfile);
        const updated = {
          ...defaultProfileInfo,
          ...parsed,
          name: "DHARMENTHIRA BOOPATHI S",
          title: "B.E. COMPUTER SCIENCE AND ENGINEERING",
          phone: "+91 90435 33218",
          email: "poopathiraja504@gmail.com",
          location: "Sri Ramakrishna Institute of Technology",
          birthday: "14-June-2008",
          facebook: defaultProfileInfo.facebook,
          instagram: defaultProfileInfo.instagram,
          telegram: defaultProfileInfo.telegram,
          bio: defaultProfileInfo.bio
        };
        setProfile(updated);
        localStorage.setItem('portfolio_profile', JSON.stringify(updated));
      } catch (e) {
        setProfile(defaultProfileInfo);
      }
    } else {
      setProfile(defaultProfileInfo);
    }
    if (localSkills) {
      try {
        const parsed = JSON.parse(localSkills);
        if (Array.isArray(parsed) && parsed.length >= 8) {
          setSkills(parsed);
        } else {
          setSkills(defaultSkills);
          localStorage.setItem('portfolio_skills', JSON.stringify(defaultSkills));
        }
      } catch (e) {
        setSkills(defaultSkills);
      }
    } else {
      setSkills(defaultSkills);
      localStorage.setItem('portfolio_skills', JSON.stringify(defaultSkills));
    }

    if (localProjects) {
      try {
        const parsed: Project[] = JSON.parse(localProjects);
        const mapped = parsed.map(p => {
          if (p.category.toLowerCase() === 'ai') {
            return { ...p, category: 'Data Analysis' };
          }
          if (p.id === 'proj1' && (!p.demoUrl || p.demoUrl === '#')) {
            return { ...p, demoUrl: 'https://kaviyam-reading.netlify.app/' };
          }
          return p;
        });
        const filtered = mapped.filter(p => 
          p.id === 'proj1' || p.id === 'proj3' || p.id === 'proj4' || 
          p.name.toLowerCase().includes('noval reading') || 
          p.name.includes('Web Performance') || 
          p.name.includes('MathWorks')
        );
        const hasNoval = filtered.some(p => p.id === 'proj1' || p.name.toLowerCase().includes('noval reading'));
        let finalProjects = filtered;
        if (!hasNoval) {
          const novalProj = defaultProjects.find(dp => dp.id === 'proj1');
          if (novalProj) {
            finalProjects = [novalProj, ...filtered];
          }
        }
        if (finalProjects.length > 0) {
          setProjects(finalProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(finalProjects));
        } else {
          setProjects(defaultProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
        }
      } catch (e) {
        setProjects(defaultProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
    if (localAchievements) setAchievements(JSON.parse(localAchievements));
    if (localExperiences) {
      try {
        const parsedExp = JSON.parse(localExperiences);
        if (Array.isArray(parsedExp) && parsedExp.length > 0 && parsedExp[0].technologies?.length >= 5) {
          setExperiences(parsedExp);
        } else {
          setExperiences(defaultExperiences);
          localStorage.setItem('portfolio_experiences', JSON.stringify(defaultExperiences));
        }
      } catch (e) {
        setExperiences(defaultExperiences);
      }
    } else {
      setExperiences(defaultExperiences);
    }
    if (localEducation) setEducation(JSON.parse(localEducation));
    if (localBlogs) setBlogs(JSON.parse(localBlogs));

    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const saveProfile = (newProfile: ProfileInfo) => {
    setProfile(newProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(newProfile));
  };

  const saveSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
    localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
  };

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const saveAchievements = (newAchievements: Achievement[]) => {
    setAchievements(newAchievements);
    localStorage.setItem('portfolio_achievements', JSON.stringify(newAchievements));
  };

  const saveExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    localStorage.setItem('portfolio_experiences', JSON.stringify(newExperiences));
  };

  const saveEducation = (newEducation: Education[]) => {
    setEducation(newEducation);
    localStorage.setItem('portfolio_education', JSON.stringify(newEducation));
  };

  const saveBlogs = (newBlogs: BlogPost[]) => {
    setBlogs(newBlogs);
    localStorage.setItem('portfolio_blogs', JSON.stringify(newBlogs));
  };

  // Add Message locally & server
  const addMessage = async (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        await fetchMessages();
        return true;
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
    return false;
  };

  // Mark read
  const markMessageRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
      if (res.ok) {
        await fetchMessages();
      }
    } catch (err) {
      console.error('Failed to mark message read:', err);
    }
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchMessages();
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const resetAllData = () => {
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_achievements');
    localStorage.removeItem('portfolio_experiences');
    localStorage.removeItem('portfolio_education');
    localStorage.removeItem('portfolio_blogs');

    setProfile(defaultProfileInfo);
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    setAchievements(defaultAchievements);
    setExperiences(defaultExperiences);
    setEducation(defaultEducation);
    setBlogs(defaultBlogs);
  };

  return {
    profile,
    skills,
    projects,
    achievements,
    experiences,
    education,
    blogs,
    messages,
    loadingMessages,
    saveProfile,
    saveSkills,
    saveProjects,
    saveAchievements,
    saveExperiences,
    saveEducation,
    saveBlogs,
    addMessage,
    markMessageRead,
    deleteMessage,
    resetAllData,
    fetchMessages
  };
}
