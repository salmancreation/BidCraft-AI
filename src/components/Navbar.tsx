import { Terminal, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, signInWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="glass-nav border-b border-outline-variant/10 fixed top-0 left-0 right-0 z-50">
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
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/10">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-6 h-6 rounded-full" />
                ) : (
                  <UserIcon className="w-4 h-4 text-on-surface-variant" />
                )}
                <span className="text-xs font-bold text-on-surface">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-on-surface-variant hover:text-error transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={signInWithGoogle}
                className="hidden md:block px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-low rounded-lg transition-all duration-300"
              >
                Log In
              </button>
              <button 
                onClick={signInWithGoogle}
                className="bg-primary-container text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
