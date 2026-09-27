export default function ImageComingSoon({ className = "" }) {
  return (
    <div className={`flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-[#f8f4ed] p-6 text-center ${className}`}>
      <img src="/images/logo.jpeg" alt="Daily Spread logo" className="h-16 w-auto object-contain" />
      <span className="font-heading text-sm font-semibold text-foreground">Image Coming Soon</span>
    </div>
  );
}
