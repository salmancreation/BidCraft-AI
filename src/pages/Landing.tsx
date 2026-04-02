import { 
  ClipboardPaste, 
  BrainCircuit, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  Ban, 
  TrendingUp, 
  Eye, 
  Zap,
  Rocket,
  WandSparkles
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!jobDescription.trim()) return;
    navigate("/dashboard", { state: { jobDescription } });
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/5 opacity-50 blur-[80px]"></div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-headline tracking-tighter text-on-surface max-w-4xl mb-6 text-balance"
          >
            Generate Winning <span className="bg-gradient-to-r from-primary to-tertiary-container bg-clip-text text-transparent">Upwork Proposals</span> in Seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-on-surface-variant max-w-2xl mb-12 text-balance leading-relaxed"
          >
            Paste any job post and get a high-converting cover letter, pricing suggestions, and custom strategy using specialized AI.
          </motion.p>

          {/* Generator Input Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-3xl glass-card rounded-3xl p-4 mb-8"
          >
            <div className="relative">
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-48 bg-surface-container-lowest border-none rounded-2xl p-6 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/10 resize-none transition-all duration-300" 
                placeholder="Paste the Upwork job description here..."
              />
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={handleGenerate}
                  className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 shadow-xl shadow-primary/20 hover:brightness-105 active:scale-95 transition-all duration-300"
                >
                  Generate Proposal <WandSparkles className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary w-5 h-5" />
              <span className="text-sm font-medium">No auto apply</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary w-5 h-5" />
              <span className="text-sm font-medium">Safe for Upwork</span>
            </div>
            <div className="flex items-center gap-2">
              <Ban className="text-primary w-5 h-5" />
              <span className="text-sm font-medium">No spam</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-surface-container-low" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Lead to Proposal in 3 Steps</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ClipboardPaste, title: "Paste Job Post", desc: "Simply copy the entire description from any Upwork job listing and drop it into our tool." },
              { icon: BrainCircuit, title: "AI Analyzes", desc: "Our specialized model identifies key requirements, client pain points, and preferred tech stack." },
              { icon: Copy, title: "Copy & Apply", desc: "Review your personalized proposal, refine the tone, and paste it directly into Upwork." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-on-surface-variant px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Built for Professionals</h2>
            <p className="text-on-surface-variant max-w-xl text-lg">Stop wasting hours on repetitive cover letters. Focus on what you do best while we handle the pitch.</p>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-between border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              <div>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>
                <h3 className="text-2xl font-bold mt-6 mb-4">Instant Proposal Generation</h3>
                <p className="text-on-surface-variant max-w-md">Our AI crafts high-converting proposals tailored to your unique voice and the specific job requirements in less than 5 seconds.</p>
              </div>
              <div className="mt-8">
                <img 
                  className="rounded-2xl object-cover h-48 w-full shadow-lg" 
                  src="https://picsum.photos/seed/dashboard/800/400" 
                  alt="Dashboard"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="md:col-span-4 bg-primary p-8 rounded-3xl text-white flex flex-col justify-between shadow-xl shadow-primary/10 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 opacity-10 scale-150 rotate-12">
                <TrendingUp className="w-32 h-32" />
              </div>
              <div>
                <TrendingUp className="w-10 h-10 mb-6" />
                <h3 className="text-2xl font-bold mb-4 leading-tight">Smart Pricing Suggestions</h3>
                <p className="text-white/80">Receive data-driven advice on how to price your bid based on client history and job complexity.</p>
              </div>
            </div>
            <div className="md:col-span-4 bg-surface-container-low p-8 rounded-3xl flex flex-col gap-4 border border-outline-variant/10 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Eye className="text-tertiary-container w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Client Insight Analysis</h3>
              <p className="text-on-surface-variant text-sm">We dig through the client's past history to find their name, preferred style, and budget patterns.</p>
            </div>
            <div className="md:col-span-8 bg-surface-container-low p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Human-like Writing</h3>
                <p className="text-on-surface-variant">Our templates avoid the typical "AI-isms." No more "I am excited to apply..." generic openers that clients instantly ignore.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {["Casual Tone", "Professional", "Direct"].map(tone => (
                  <div key={tone} className="bg-white px-4 py-3 rounded-lg shadow-sm font-medium text-xs border border-primary/20 text-center w-full sm:w-auto">{tone}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-surface-container-lowest" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Choose Your Path to Winning</h2>
            <p className="text-on-surface-variant">Simple pricing for freelancers at every stage.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-surface p-10 rounded-[2rem] flex flex-col border border-outline-variant/20 hover:border-primary/30 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-on-surface-variant">/month</span>
                </div>
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {["3 proposals per day", "Standard AI Analysis", "Basic Tone Selection"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="text-on-surface-variant font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-primary/20 font-bold hover:bg-primary/5 transition-colors">Get Started</button>
            </div>
            <div className="bg-white p-10 rounded-[2rem] flex flex-col border-2 border-primary shadow-2xl shadow-primary/10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-tighter">Recommended</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-extrabold">$19</span>
                  <span className="text-on-surface-variant font-medium">/month</span>
                </div>
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {["Unlimited proposals", "Advanced Professional Tone", "Competitor Price Analysis", "Client Name Extractor"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 fill-primary/10" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:brightness-110 transition-all">Go Unlimited</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-primary-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to double your hire rate?</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Join 1,000+ freelancers winning higher-paying contracts on Upwork today.</p>
              <button className="bg-white text-primary px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:-translate-y-1 transition-all w-full md:w-auto">Start Your Free Trial</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
