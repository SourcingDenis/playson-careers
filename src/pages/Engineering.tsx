import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Clock, Building, Globe, ArrowRight, Zap, Server, Globe2, Activity, Users, Cpu, Search, Sparkles, ExternalLink, ChevronDown, ChevronUp, BarChart3, Shield, Headphones } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Job {
  id: string;
  title: string;
  department: string;
  team: string;
  employmentType: string;
  location: string;
  isRemote: boolean;
  publishedAt: string;
  jobUrl: string;
  applyUrl: string;
  descriptionHtml: string;
}

export default function Engineering() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('https://api.ashbyhq.com/posting-api/job-board/playson')
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const engineeringKeywords = [
    'engineer', 'developer', 'qa', 'tech', 'data', 'platform', 'game', 
    'c++', 'c#', 'go', 'server', 'client', 'frontend', 'backend', 
    'full stack', 'devops', 'sre', 'software', 'architect', 'product', 
    'unity', 'java', 'net', 'node', 'react', 'typescript', 'javascript'
  ];

  const isEngineeringRole = (title: string, dept: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerDept = dept.toLowerCase();

    // Exclude non-engineering roles that might match keywords
    if (lowerTitle.includes('artist') || lowerTitle.includes('animator') || lowerTitle.includes('illustrator') || lowerTitle.includes('sound designer')) {
      return false;
    }

    return engineeringKeywords.some(keyword => lowerTitle.includes(keyword)) || 
           ['engineering', 'product', 'game', 'platform', 'tech'].some(k => lowerDept.includes(k));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && isEngineeringRole(job.title, job.department);
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group jobs by department for better organization if needed, or just keep flat list with show more
  // For this request, we'll implement a "Show More" for the main list since it's all "Engineering"
  // But let's group by "Engineering", "Product", "Data" if possible, or just one big list.
  // The user asked for "categories expandable", implying multiple categories.
  // Let's group by Department.

  const jobsByDepartment = filteredJobs.reduce((acc, job) => {
    const dept = job.department || 'Other Engineering';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  return (
    <div className="pb-0 bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-zinc-950 to-zinc-950 -z-10" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-6 border border-orange-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Hiring Engineers & Product Leaders
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
                xPlatform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 inline-block pb-2">Built for Scale.</span>
              </h1>
              
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-lg">
                Join the team building a highly adaptable solution that provides superior gaming and business experience through flexible API, powerful BI tools, and streamlined integration.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#openings" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25 flex items-center gap-2">
                  View Open Roles <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://playson.com/x-platform" target="_blank" rel="noreferrer" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 px-8 py-4 rounded-full font-medium transition-all border border-zinc-800 hover:border-zinc-700 flex items-center gap-2">
                  About xPlatform <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-orange-500/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-xs font-mono text-zinc-500">xPlatform_metrics.tsx</div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span><span className="text-purple-400">const</span> <span className="text-blue-400">uptime</span> =</span>
                    <span className="text-emerald-400">99.99%</span>;
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span><span className="text-purple-400">const</span> <span className="text-blue-400">tps</span> =</span>
                    <span className="text-yellow-400">7000+</span>;
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span><span className="text-purple-400">const</span> <span className="text-blue-400">spinTime</span> =</span>
                    <span className="text-orange-400">200ms</span>;
                  </div>
                  
                  <div className="pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-3 text-zinc-300 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>System Operational</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Business Intelligence</h3>
              <p className="text-zinc-400">Powerful tools to understand players and make data-driven decisions.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Advanced Security</h3>
              <p className="text-zinc-400">Anti-fraud management and advanced security measures to ensure safety.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">24/7 Tech Support</h3>
              <p className="text-zinc-400">Customer-centric approach with prompt resolutions to technical challenges.</p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Uptime', value: '99.99%', sub: 'Powered by AWS', icon: Activity },
              { label: 'Transactions / s', value: '7000+', sub: 'High-load capacity', icon: Zap },
              { label: 'Spin time', value: '200ms', sub: 'Stable performance', icon: Clock },
              { label: 'Tech Stack', value: 'Modern', sub: 'Cloud-native', icon: Cpu },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-orange-500/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-zinc-500 mb-4" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-orange-500 mb-2">{stat.label}</div>
                <div className="text-xs text-zinc-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold mb-4">Our tech stack:</h2>
          <p className="text-zinc-400 mb-12 max-w-2xl">Built with modern technologies for performance and scale.</p>
          <div className="bg-white/5 rounded-3xl p-8 md:p-12 flex items-center justify-center">
            <img 
              src="https://cdn.prod.website-files.com/69038a3e1adee10d6f7b7485/698b141f97b50900460d42af_Group%2022.svg" 
              alt="Tech Stack" 
              className="w-full max-w-4xl opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Job List */}
      <section id="openings" className="mx-auto max-w-7xl px-6 py-24 border-t border-zinc-800/50">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-6">Join Playson Engineering</h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            We combine agility, ownership, and deep technical expertise to deliver products that millions of people enjoy daily.
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-2xl font-bold tracking-tight">Open Technical Roles</h3>
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search by role, keyword or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm transition-all"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(jobsByDepartment).map(([dept, deptJobs]) => {
                const isExpanded = expandedCategories[dept];
                const displayedJobs = isExpanded ? deptJobs : deptJobs.slice(0, 5);
                const hasMore = deptJobs.length > 5;

                return (
                    <div key={dept} className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Cpu className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{dept}</h3>
                            <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full">{deptJobs.length}</span>
                        </div>

                        <div className="grid gap-4">
                            {displayedJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Link 
                                    to={`/job/${job.id}`}
                                    className="group block bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all hover:bg-zinc-900 hover:shadow-lg hover:shadow-orange-500/5"
                                    >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                        <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-orange-400 transition-colors mb-3">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                            <Building className="w-4 h-4" />
                                            {job.department}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                            </div>
                                            {job.isRemote && (
                                            <div className="flex items-center gap-1.5 text-emerald-400">
                                                <Globe className="w-4 h-4" />
                                                Remote
                                            </div>
                                            )}
                                        </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                        </div>
                                    </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {hasMore && (
                            <button 
                                onClick={() => toggleCategory(dept)}
                                className="mt-4 flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors text-sm font-medium"
                            >
                                {isExpanded ? (
                                    <>Show Less <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Show {deptJobs.length - 5} More <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>
                );
            })}

            {filteredJobs.length === 0 && (
              <div className="text-center py-24 text-zinc-500 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                <p className="text-lg">No open engineering positions found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchQuery('');}}
                  className="mt-4 text-orange-500 hover:text-orange-400 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Don’t see your role listed?</h3>
            <p className="text-zinc-400">Submit your information and we’ll reach out soon.</p>
          </div>
          <a href="https://jobs.ashbyhq.com/playson/form/general-interest" target="_blank" rel="noreferrer" className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-full font-medium transition-colors">
            Submit
          </a>
        </div>
      </section>
    </div>
  );
}
