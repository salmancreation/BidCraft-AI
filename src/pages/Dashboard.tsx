import { 
  Save, 
  RotateCcw, 
  Copy, 
  Smile, 
  Award, 
  Zap, 
  ChevronDown,
  Stars,
  DollarSign,
  Clock,
  Target,
  CheckCircle2,
  WandSparkles,
  X,
  Plus,
  LogIn
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { generateProposal } from "../services/gemini";
import { ProposalData, VoiceTone, ExperienceLevel } from "../types";
import { cn } from "../lib/utils";
import { auth, db, signInWithGoogle } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobDescription = location.state?.jobDescription || "";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [tone, setTone] = useState<VoiceTone>("Friendly");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Tailwind CSS", "UI/UX Strategy"]);
  const [experience, setExperience] = useState<ExperienceLevel>("Senior (5-8 years)");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleGenerate = async () => {
    if (!jobDescription) {
      navigate("/");
      return;
    }
    setLoading(true);
    try {
      const data = await generateProposal(jobDescription, tone, skills.join(", "), experience);
      setProposal(data);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !proposal) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "proposals"), {
        ...proposal,
        uid: user.uid,
        jobDescription,
        tone,
        skills,
        createdAt: serverTimestamp()
      });
      alert("Proposal saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const copyToClipboard = () => {
    if (proposal?.coverLetter) {
      navigator.clipboard.writeText(proposal.coverLetter);
    }
  };

  const addSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-on-surface-variant font-medium tracking-tight">Generating your proposal...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface">Proposal Workspace</h1>
            <p className="text-on-surface-variant text-sm mt-1">Refine your profile and tone to generate the perfect bid.</p>
          </div>
          <div className="flex gap-2">
            {!user ? (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login to Save
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Draft"}
              </button>
            )}
            <button 
              onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all"
            >
              <WandSparkles className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>

        {/* Profile & Tone Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-outline-variant/10">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Voice Tone</label>
            <div className="flex flex-col gap-2">
              {[
                { name: "Friendly" as VoiceTone, icon: Smile },
                { name: "Expert" as VoiceTone, icon: Award },
                { name: "Confident" as VoiceTone, icon: Zap }
              ].map((t) => (
                <button 
                  key={t.name}
                  onClick={() => setTone(t.name)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold transition-all",
                    tone === t.name 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-outline-variant/20 hover:border-primary/40 text-on-surface-variant"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <t.icon className="w-4 h-4" /> {t.name}
                  </div>
                  {tone === t.name && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Top Skills</label>
              <div className="space-y-3">
                <form onSubmit={addSkill} className="flex gap-2">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/10 rounded-lg text-sm p-2" 
                    placeholder="Add a skill..."
                  />
                  <button type="submit" className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1 px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-on-surface">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-error transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Experience Level</label>
              <div className="relative">
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
                  className="w-full appearance-none bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/10 rounded-lg text-sm p-3 pr-10"
                >
                  <option>Junior (0-2 years)</option>
                  <option>Mid-level (2-5 years)</option>
                  <option>Senior (5-8 years)</option>
                  <option>Expert (8+ years)</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 pointer-events-none text-on-surface-variant w-4 h-4" />
              </div>
              <p className="text-xs text-on-surface-variant">Experience used to calibrate the suggested hourly rate and complexity of the strategy.</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cover Letter Card */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col">
            <div className="px-6 py-4 flex justify-between items-center bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">📩</span>
                <h2 className="font-bold text-on-surface tracking-tight">Cover Letter</h2>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
            <div className="p-8 flex-grow">
              <div className="prose prose-sm max-w-none text-on-surface-variant leading-relaxed whitespace-pre-wrap markdown-body">
                <ReactMarkdown>
                  {proposal?.coverLetter || "Generating..."}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-on-surface tracking-tight">Suggested Rate</h2>
              </div>
              <div className="text-4xl font-extrabold text-on-surface tracking-tighter">
                {proposal?.suggestedRate || "---"}
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Based on current market trends for your experience level.</p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-tertiary-container" />
                <h2 className="font-bold text-on-surface tracking-tight">Estimated Time</h2>
              </div>
              <div className="flex items-baseline gap-2 text-on-surface">
                <span className="text-4xl font-extrabold tracking-tighter">{proposal?.estimatedTime.split(' ')[0] || "---"}</span>
                <span className="text-xl font-medium">{proposal?.estimatedTime.split(' ').slice(1).join(' ') || ""}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Predicted timeframe for initial concept and core architecture.</p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-on-surface tracking-tight">Strategy to Win</h2>
              </div>
              <ul className="space-y-4">
                {proposal?.strategyToWin.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <Stars className="text-primary w-5 h-5 shrink-0 fill-primary/10" />
                    <p className="text-sm text-on-surface-variant">
                      <strong className="text-on-surface">{s.title}:</strong> {s.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Confidence Score Section */}
        <section className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-4">Confidence Score</h3>
              <p className="text-on-surface-variant mb-6">
                Based on our analysis, this proposal has an <span className="text-primary font-bold">{proposal?.confidenceScore || 0}% match</span> with the client's historical hiring preferences.
              </p>
              <div className="w-full bg-surface-container-highest rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${proposal?.confidenceScore || 0}%` }}
                  className="bg-primary h-2 rounded-full" 
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                alt="Analytics" 
                className="w-full h-48 object-cover" 
                src="https://picsum.photos/seed/analytics/800/400" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </section>
      </div>
    </div>
  );
}
