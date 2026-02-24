import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Building, Globe, Share2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from './Home';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://api.ashbyhq.com/posting-api/job-board/playson')
      .then(res => res.json())
      .then(data => {
        const found = data.jobs?.find((j: Job) => j.id === id);
        setJob(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <p className="text-zinc-400 mb-8">The position you're looking for might have been filled or removed.</p>
        <Link to="/" className="text-orange-500 hover:text-orange-400 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to all jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-zinc-900/50 border-b border-zinc-800 pt-12 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to careers
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{job.title}</h1>
            
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
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share
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
              className="prose prose-invert prose-orange max-w-none prose-p:text-zinc-300 prose-li:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-zinc-100 prose-a:text-orange-500 hover:prose-a:text-orange-400"
              dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
            />
            
            <div className="mt-16 pt-8 border-t border-zinc-800">
              <a 
                href={job.applyUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition-all items-center gap-2"
              >
                Apply for this position <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Posted</div>
                  <div className="font-medium">{formatDistanceToNow(new Date(job.publishedAt))} ago</div>
                </div>
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
