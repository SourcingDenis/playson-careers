import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Building, Globe, Share2, ExternalLink, Upload, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from './Home';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    const formData = new FormData(e.currentTarget);
    formData.append('jobId', id || '');
    
    // Extract UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (urlParams.has(param)) {
        utmData[param] = urlParams.get(param) as string;
      }
    });
    
    if (Object.keys(utmData).length > 0) {
      formData.append('utmData', JSON.stringify(utmData));
    }
    
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                href="#apply-form"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              >
                Apply Now
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
            
            <div id="apply-form" className="mt-16 pt-12 border-t border-zinc-800 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-8">Apply for this position</h2>
              
              {submitSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">Application Submitted!</h3>
                  <p className="text-zinc-400">Thank you for applying. Our team will review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-300">Resume/CV *</label>
                    <div 
                      className="border-2 border-dashed border-zinc-800 hover:border-orange-500/50 rounded-xl p-8 text-center cursor-pointer transition-all bg-zinc-900/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
                      <p className="text-zinc-300 font-medium mb-1">
                        {fileName ? fileName : 'Click to upload your resume'}
                      </p>
                      <p className="text-xs text-zinc-500">PDF, DOC, DOCX up to 10MB</p>
                      <input 
                        type="file" 
                        name="resume" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                  
                  <div className="text-center text-sm text-zinc-500 mt-4">
                    Or <a href={job.applyUrl} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">apply on Ashby</a> directly.
                  </div>
                </form>
              )}
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
