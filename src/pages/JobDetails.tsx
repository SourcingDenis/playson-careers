import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Building, Globe, Share2, ExternalLink, Flame, ArrowRight, Download, Linkedin, Check } from 'lucide-react';
import { differenceInMonths } from 'date-fns';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Job } from './Home';
import SocialShareExplainer from '../components/SocialShareExplainer';
import { getTechStack, isEngineeringRole } from '../utils/jobUtils';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingCard, setGeneratingCard] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  const handleCopyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
  };

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

  const handleShare = async () => {
    if (cardRef.current) {
      setGeneratingCard(true);
      try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
        download(dataUrl, `playson-hiring-${job?.title.replace(/\s+/g, '-').toLowerCase()}.png`);
      } catch (err) {
        console.error('Failed to generate image', err);
      } finally {
        setGeneratingCard(false);
      }
    }
  };

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

  const isHot = differenceInMonths(new Date(), new Date(job.publishedAt)) > 6;

  return (
    <div className="pb-24 relative">
      {/* Hidden Share Card for Generation */}
      {job && (
        <div 
            ref={cardRef} 
            className="fixed top-[-9999px] left-[-9999px] -z-50 w-[1200px] h-[630px] bg-zinc-950 p-16 flex flex-col justify-between border-8 border-playson-red"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-playson-red/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 text-xl font-medium mb-8 border border-zinc-700/50">
                    <span className="w-3 h-3 rounded-full bg-playson-red animate-blink" />
                    We are hiring
                </div>
                <h1 className="text-7xl font-bold text-white tracking-tight mb-6 leading-tight max-w-4xl">
                    {job.title}
                </h1>
                <div className="flex items-center gap-6 text-zinc-400 text-2xl">
                    <div className="flex items-center gap-2">
                        <Building className="w-6 h-6" /> {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6" /> {job.location}
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex items-end justify-between">
                <div className="flex gap-4">
                    {/* Tech Stack Preview (First 3) */}
                    {isEngineeringRole(job.title, job.department) && getTechStack(job.title, job.descriptionHtml || '').slice(0, 3).map((tech, i) => (
                        <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xl font-medium">
                            <span>{tech.icon}</span> {tech.label}
                        </div>
                    ))}
                </div>
                
                <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-2">playson.com/careers</div>
                    <div className="text-playson-red text-xl font-medium">#PlaysonLife</div>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-zinc-900/50 border-b pt-12 pb-16 transition-colors duration-500 ${isHot ? 'border-playson-red/30' : 'border-zinc-800'}`}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to careers
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex flex-wrap items-center gap-4">
              {job.title}
              {isHot && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-playson-red/20 text-playson-red text-base font-bold border border-playson-red/30 animate-pulse">
                  <Flame className="w-5 h-5 fill-playson-red" /> Hot Role
                </span>
              )}
            </h1>

            {/* Tech Stack Badges */}
            {isEngineeringRole(job.title, job.department) && getTechStack(job.title, job.descriptionHtml || '').length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {getTechStack(job.title, job.descriptionHtml || '').map((tech, i) => (
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
          
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-playson-red hover:bg-red-600 text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-playson-red/20 hover:shadow-playson-red/40 hover:-translate-y-0.5"
              >
                Apply for this position <ExternalLink className="w-4 h-4" />
              </a>
              
              <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-none bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-600"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert prose-orange max-w-none prose-p:text-zinc-300 prose-li:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-zinc-100 prose-a:text-playson-red hover:prose-a:text-red-600"
              dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
            />
            
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Ready to apply?</h2>
              <p className="text-zinc-400 mb-8">
                Join our team and help us build the future of iGaming.
              </p>
              <a 
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-playson-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-playson-red/20"
              >
                Apply for this position <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className={`sticky top-24 bg-zinc-900/50 border rounded-2xl p-6 transition-colors duration-500 ${isHot ? 'border-playson-red/30 shadow-lg shadow-playson-red/5' : 'border-zinc-800'}`}>
              <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
              
              <div className="space-y-4">
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
