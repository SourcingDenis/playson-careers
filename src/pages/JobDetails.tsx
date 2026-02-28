import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Building, Globe, Share2, ExternalLink, Flame, ArrowRight } from 'lucide-react';
import { differenceInMonths } from 'date-fns';
import { Job } from './Home';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        // Fetch basic job list data
        const listRes = await fetch('https://api.ashbyhq.com/posting-api/job-board/playson');
        const listData = await listRes.json();
        const found = listData.jobs?.find((j: Job) => j.id === id);
        setJob(found || null);

        if (found && listData.jobs) {
            // Find similar jobs: same department AND same location, excluding current job
            // If not enough, fallback to same department
            let similar = listData.jobs.filter((j: Job) => 
                j.id !== found.id && 
                j.department === found.department &&
                j.location === found.location
            );

            if (similar.length < 3) {
                const sameDept = listData.jobs.filter((j: Job) => 
                    j.id !== found.id && 
                    j.department === found.department &&
                    !similar.includes(j)
                );
                similar = [...similar, ...sameDept];
            }

            setSimilarJobs(similar.slice(0, 3));
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-playson-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <p className="text-zinc-400 mb-8">The position you're looking for might have been filled or removed.</p>
        <Link to="/" className="text-playson-red hover:text-red-600 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to all jobs
        </Link>
      </div>
    );
  }

  const isEngineeringRole = (title: string, dept: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerDept = dept.toLowerCase();
    return ['engineer', 'developer', 'architect', 'qa', 'tech', 'data', 'software'].some(k => lowerTitle.includes(k)) ||
           ['engineering', 'product', 'game', 'platform', 'tech'].some(k => lowerDept.includes(k));
  };

  const getTechStack = (description: string) => {
    const stack = [];
    const lowerDesc = description.toLowerCase();
    
    const techMap: Record<string, { icon: string, label: string, color: string }> = {
      'react': { icon: '⚛️', label: 'React', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      'typescript': { icon: 'TS', label: 'TypeScript', color: 'bg-blue-600/10 text-blue-400 border-blue-600/20' },
      'node': { icon: '🟢', label: 'Node.js', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'c#': { icon: '#', label: 'C#', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      'c++': { icon: '++', label: 'C++', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
      'go': { icon: '🐹', label: 'Go', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
      'unity': { icon: '🎮', label: 'Unity', color: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20' },
      'aws': { icon: '☁️', label: 'AWS', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'kubernetes': { icon: '☸️', label: 'K8s', color: 'bg-blue-400/10 text-blue-300 border-blue-400/20' },
      'docker': { icon: '🐳', label: 'Docker', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      'sql': { icon: '🗄️', label: 'SQL', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
      'python': { icon: '🐍', label: 'Python', color: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20' },
      'java': { icon: '☕', label: 'Java', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
    };

    for (const [key, value] of Object.entries(techMap)) {
      if (lowerDesc.includes(key)) {
        stack.push(value);
      }
    }
    return stack.slice(0, 4);
  };

  const isHot = differenceInMonths(new Date(), new Date(job.publishedAt)) > 6;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className={`bg-zinc-900/50 border-b pt-12 pb-16 transition-colors duration-500 ${isHot ? 'border-playson-red/30' : 'border-zinc-800'}`}>
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to careers
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex flex-wrap items-center gap-4">
              {job.title}
              {isHot && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-playson-red/20 text-playson-red text-base font-bold border border-playson-red/30 animate-pulse">
                  <Flame className="w-5 h-5 fill-playson-red" /> Hot Role
                </span>
              )}
            </h1>

            {/* Tech Stack Badges */}
            {isEngineeringRole(job.title, job.department) && getTechStack(job.descriptionHtml || '').length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {getTechStack(job.descriptionHtml || '').map((tech, i) => (
                        <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${tech.color.replace('text-', 'border-').replace('bg-', 'bg-opacity-10 ')} bg-zinc-900/50`}>
                            <span>{tech.icon}</span> {tech.label}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 mb-8">
              <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-full text-sm">
                <Building className="w-4 h-4 text-zinc-500" />
                {job.department}
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-full text-sm">
                <MapPin className="w-4 h-4 text-zinc-500" />
                {job.location}
              </div>
              {job.isRemote && (
                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-sm">
                  <Globe className="w-4 h-4" />
                  Remote
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-full text-sm">
                <Clock className="w-4 h-4 text-zinc-500" />
                {job.employmentType}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-playson-red hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              >
                Apply for this position <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    const btn = document.getElementById('share-btn-text');
                    if (btn) btn.innerText = 'Copied!';
                    setTimeout(() => {
                      if (btn) btn.innerText = 'Share';
                    }, 2000);
                  } catch (err) {
                    console.error('Failed to copy:', err);
                    alert('Failed to copy link to clipboard');
                  }
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 min-w-[120px] justify-center"
              >
                <Share2 className="w-4 h-4" /> <span id="share-btn-text">Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert prose-orange max-w-none prose-p:text-zinc-300 prose-li:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-zinc-100 prose-a:text-playson-red hover:prose-a:text-red-600"
              dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
            />
            
            <div className="mt-16 pt-12 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Ready to apply?</h2>
              <p className="text-zinc-400 mb-8">
                Join our team and help us build the future of iGaming.
              </p>
              <a 
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-playson-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
              >
                Apply for this position <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Similar Roles Section */}
            {similarJobs.length > 0 && (
                <div className="mt-24 pt-12 border-t border-zinc-800">
                    <h3 className="text-2xl font-bold mb-8">You might also like</h3>
                    <div className="grid gap-4">
                        {similarJobs.map((similarJob) => (
                            <Link 
                                key={similarJob.id}
                                to={`/job/${similarJob.id}`}
                                className="group block bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 transition-all hover:bg-zinc-900 hover:border-playson-red/30 hover:shadow-lg hover:shadow-playson-red/5"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-playson-red transition-colors mb-2">
                                            {similarJob.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <Building className="w-3.5 h-3.5" />
                                                {similarJob.department}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {similarJob.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-playson-red group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className={`sticky top-24 bg-zinc-900/50 border rounded-2xl p-6 transition-colors duration-500 ${isHot ? 'border-playson-red/30 shadow-lg shadow-playson-red/5' : 'border-zinc-800'}`}>
              <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
              
              <div className="space-y-4">
                {/* Posted date removed */}
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Department</div>
                  <div className="font-medium">{job.department}</div>
                </div>
                {job.team && (
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Team</div>
                    <div className="font-medium">{job.team}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Location</div>
                  <div className="font-medium">{job.location} {job.isRemote && '(Remote)'}</div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Employment Type</div>
                  <div className="font-medium">{job.employmentType}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
