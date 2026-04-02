import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="glass-nav border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="text-primary w-6 h-6" />
            <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">BidCraft AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
            <a href="#how-it-works" className="text-on-surface-variant hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-low rounded-lg transition-all duration-300">Log In</button>
          <button className="bg-primary-container text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all duration-200">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
