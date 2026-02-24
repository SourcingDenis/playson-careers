import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Clock, Building, Globe, ArrowRight } from 'lucide-react';
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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

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

  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))].filter(Boolean);
  
  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.department === filter);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-zinc-950 to-zinc-950 -z-10" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Level up your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">career with us.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Join a leading iGaming supplier recognized worldwide. We're building high-end micro-service-based platforms that process billions of transactions per day.
            </p>
            <div className="flex gap-4">
              <a href="#openings" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95">
                View Openings
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job List */}
      <section id="openings" className="mx-auto max-w-7xl px-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === dept 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  to={`/job/${job.id}`}
                  className="group block bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all hover:bg-zinc-900"
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
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {job.employmentType}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-zinc-500 hidden md:block">
                        Posted {formatDistanceToNow(new Date(job.publishedAt))} ago
                      </div>
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-24 text-zinc-500">
                No open positions found for this department.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
