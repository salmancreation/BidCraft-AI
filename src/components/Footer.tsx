export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-outline-variant/10 bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <span className="font-bold text-on-surface font-headline text-lg">BidCraft AI</span>
          <p className="text-sm text-on-surface-variant mt-2">© 2026 BidCraft AI. Precision Editorial.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
