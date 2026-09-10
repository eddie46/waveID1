/**
 * Definisi tipe data untuk portofolio web GitHub.io
 * File ini memudahkan kustomisasi dan memastikan struktur data tetap rapi.
 */

export interface ProfileData {
  greeting?: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  avatarUrl: string;
  status: {
    available: boolean;
    text: string;
  };
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'instagram' | 'telegram' | 'whatsapp' | 'globe';
  color?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  code?: string;
  brand?: string;
  compatibility?: string;
  priceEstimate?: string;
  description: string;
  tags: string[];
  category: 'controller' | 'power' | 'sensor' | 'actuator' | 'interface' | string;
  buttonLink?: {
    label: string;
    url: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  year?: string;
  metrics?: string;
  condition?: string;
  quantity?: string;
}

export interface SupportingComponentItem {
  id: string;
  name: string;
  quantity: string;
  type: string;
  spec?: string;
  functionDesc: string;
  buttonLink?: {
    label: string;
    url: string;
  };
}

export interface WaveidAdmin {
  id: string;
  name: string;
  role: string;
  category: 'Developer Evangelist' | 'Administrasi' | 'Developer' | 'Developer Design & Register';
  subRole?: string;
  photoUrl: string;
  divisionBadge: string;
  bio?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
}
