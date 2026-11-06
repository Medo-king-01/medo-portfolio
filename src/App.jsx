import { siteConfig } from './config/site.config';
import { translations } from './data/translations';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Story from './components/Story';
import TechnicalSkills from './components/TechnicalSkills';
import Services from './components/Services';
import HowIWork from './components/HowIWork';
import Projects from './components/Projects';
import CertificationsSection from './components/CertificationsSection';
import BeyondTech from './components/BeyondTech';
import AIToolkit from './components/AIToolkit';
import Perspective from './components/Perspective';
import Content from './components/Content';
import Leadership from './components/Leadership';
import SoftSkills from './components/SoftSkills';
import Footer from './components/Footer';
import { skillsContent, projects, leadershipList, softSkillsList } from './data/portfolioData';

const SECTION_COMPONENTS = {
  preloader: Preloader,
  navbar: Navbar,
  hero: Hero,
  about: About,
  story: Story,
  skills: TechnicalSkills,
  process: Services,
  howIWork: HowIWork,
  projects: Projects,
  certifications: CertificationsSection,
  beyondTech: BeyondTech,
  aiToolkit: AIToolkit,
  perspective: Perspective,
  leadership: Leadership,
  softskills: SoftSkills,
  contact: Content,
  footer: Footer,
};

function hasValidData(sectionKey) {
  switch (sectionKey) {
    case 'skills':
      return translations.en.technicalSkills.groups.some((group) => group.items.length > 0);
    case 'process':
      return skillsContent?.cards?.length > 0;
    case 'projects':
      return projects?.length > 0;
    case 'leadership':
      return leadershipList?.length > 0;
    case 'softskills':
      return softSkillsList?.length > 0;
    default:
      return true;
  }
}

function App() {
  const activeSections = Object.entries(siteConfig.sections)
    .filter(([key, cfg]) => {
      if (!SECTION_COMPONENTS[key]) return false;
      if (cfg.enabled === false) return false;
      if (!hasValidData(key)) return false;
      return true;
    })
    .sort(([, a], [, b]) => a.order - b.order);

  return (
    <>
      {activeSections.map(([key]) => {
        const Component = SECTION_COMPONENTS[key];
        return Component ? <Component key={key} /> : null;
      })}
    </>
  );
}

export default App;
