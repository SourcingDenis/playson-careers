import {  Cpu, Globe, Server, Database, Layout, Box, Cloud, Terminal, Code2, Layers } from 'lucide-react';

export interface TechBadge {
  label: string;
  icon: string;
  color: string;
  category: 'frontend' | 'backend' | 'devops' | 'data' | 'game' | 'general';
}

const TECH_MAP: Record<string, TechBadge> = {
  // Frontend
  'react': { label: 'React', icon: '⚛️', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', category: 'frontend' },
  'typescript': { label: 'TypeScript', icon: 'TS', color: 'bg-blue-600/10 text-blue-400 border-blue-600/20', category: 'frontend' },
  'javascript': { label: 'JavaScript', icon: 'JS', color: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20', category: 'frontend' },
  'next.js': { label: 'Next.js', icon: '▲', color: 'bg-zinc-800/50 text-white border-zinc-700', category: 'frontend' },
  'vue': { label: 'Vue', icon: '💚', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', category: 'frontend' },
  'angular': { label: 'Angular', icon: '🅰️', color: 'bg-red-600/10 text-red-500 border-red-600/20', category: 'frontend' },

  // Backend
  'node': { label: 'Node.js', icon: '🟢', color: 'bg-green-500/10 text-green-400 border-green-500/20', category: 'backend' },
  'c#': { label: 'C#', icon: '#', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', category: 'backend' },
  '.net': { label: '.NET', icon: '🟣', color: 'bg-purple-600/10 text-purple-400 border-purple-600/20', category: 'backend' },
  'c++': { label: 'C++', icon: '++', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', category: 'backend' },
  'go': { label: 'Go', icon: '🐹', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', category: 'backend' },
  'golang': { label: 'Go', icon: '🐹', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', category: 'backend' },
  'java': { label: 'Java', icon: '☕', color: 'bg-red-500/10 text-red-400 border-red-500/20', category: 'backend' },
  'python': { label: 'Python', icon: '🐍', color: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20', category: 'backend' },

  // Game
  'unity': { label: 'Unity', icon: '🎮', color: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20', category: 'game' },
  'unreal': { label: 'Unreal', icon: 'u', color: 'bg-zinc-700/50 text-white border-zinc-600', category: 'game' },
  'pixi': { label: 'PixiJS', icon: '🧚', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20', category: 'game' },

  // DevOps / Cloud
  'aws': { label: 'AWS', icon: '☁️', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', category: 'devops' },
  'kubernetes': { label: 'K8s', icon: '☸️', color: 'bg-blue-400/10 text-blue-300 border-blue-400/20', category: 'devops' },
  'k8s': { label: 'K8s', icon: '☸️', color: 'bg-blue-400/10 text-blue-300 border-blue-400/20', category: 'devops' },
  'docker': { label: 'Docker', icon: '🐳', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', category: 'devops' },
  'terraform': { label: 'Terraform', icon: '🏗️', color: 'bg-purple-400/10 text-purple-300 border-purple-400/20', category: 'devops' },
  'jenkins': { label: 'Jenkins', icon: '🤵', color: 'bg-red-400/10 text-red-300 border-red-400/20', category: 'devops' },

  // Data
  'sql': { label: 'SQL', icon: '🗄️', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', category: 'data' },
  'postgresql': { label: 'Postgres', icon: '🐘', color: 'bg-blue-400/10 text-blue-300 border-blue-400/20', category: 'data' },
  'mongodb': { label: 'MongoDB', icon: '🍃', color: 'bg-green-600/10 text-green-500 border-green-600/20', category: 'data' },
  'redis': { label: 'Redis', icon: '🔴', color: 'bg-red-600/10 text-red-500 border-red-600/20', category: 'data' },
  'kafka': { label: 'Kafka', icon: '📨', color: 'bg-zinc-600/10 text-zinc-400 border-zinc-600/20', category: 'data' },
};

// Helper to determine the "domain" of the job based on title
const getJobDomain = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('frontend') || t.includes('web') || t.includes('ui') || t.includes('react')) return 'frontend';
  if (t.includes('backend') || t.includes('server') || t.includes('api') || t.includes('go') || t.includes('java') || t.includes('.net')) return 'backend';
  if (t.includes('game') || t.includes('unity') || t.includes('client')) return 'game';
  if (t.includes('devops') || t.includes('sre') || t.includes('cloud') || t.includes('infrastructure')) return 'devops';
  if (t.includes('data') || t.includes('analytics') || t.includes('bi')) return 'data';
  return 'general';
};

export const isEngineeringRole = (title: string, dept: string): boolean => {
  const lowerTitle = title.toLowerCase();
  const lowerDept = dept.toLowerCase();
  
  // Exclude non-engineering roles that might match keywords
  if (['legal', 'counsel', 'hr', 'talent', 'recruiter', 'finance', 'account', 'sales', 'marketing', 'artist', 'animator', 'illustrator'].some(k => lowerTitle.includes(k))) {
    return false;
  }

  const engineeringKeywords = [
    'engineer', 'developer', 'qa', 'tech', 'data', 'platform', 'game', 
    'c++', 'c#', 'go', 'server', 'client', 'frontend', 'backend', 
    'full stack', 'devops', 'sre', 'software', 'architect', 'product', 
    'unity', 'java', 'net', 'node', 'react', 'typescript', 'javascript'
  ];

  return engineeringKeywords.some(keyword => lowerTitle.includes(keyword)) || 
         ['engineering', 'platform', 'technology', 'r&d', 'devops'].some(k => lowerDept.includes(k));
};

export const getTechStack = (title: string, description: string): TechBadge[] => {
  const lowerDesc = description.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const jobDomain = getJobDomain(title);
  
  const matches: { badge: TechBadge; score: number }[] = [];
  const seenLabels = new Set<string>();

  for (const [key, badge] of Object.entries(TECH_MAP)) {
    let score = 0;
    
    // 1. Check for keyword presence (Regex for whole word)
    // Escape special regex chars in key (like C++, C#, .NET)
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKey}\\b`, 'i');
    
    // Special handling for C# and C++ which might not work well with standard word boundaries depending on engine
    // But generally \bC\+\+\b works if followed by space/punctuation. 
    // Let's use a simpler includes check for symbols, regex for words.
    const isSymbol = key.includes('+') || key.includes('#') || key.startsWith('.');
    const hasMatch = isSymbol ? lowerDesc.includes(key) : regex.test(lowerDesc);

    if (hasMatch) {
      score += 1; // Base score for appearing in description

      // 2. Boost if it appears in the Title
      if (lowerTitle.includes(key)) {
        score += 10;
      }

      // 3. Boost if tech category matches job domain
      if (badge.category === jobDomain) {
        score += 5;
      }

      // 4. Contextual Boosts (Heuristics)
      // If job is "Frontend" but mentions "C#" (maybe as "interfacing with C# backend"), 
      // we don't want C# to outrank React. The domain boost helps here.
      
      // 5. Frequency (Optional - simple check for multiple occurrences)
      // const count = (lowerDesc.match(new RegExp(escapedKey, 'gi')) || []).length;
      // score += Math.min(count, 3); // Cap frequency boost
    }

    if (score > 0 && !seenLabels.has(badge.label)) {
      matches.push({ badge, score });
      seenLabels.add(badge.label);
    }
  }

  // Sort by Score DESC
  matches.sort((a, b) => b.score - a.score);

  // Return top 4
  return matches.slice(0, 4).map(m => m.badge);
};
