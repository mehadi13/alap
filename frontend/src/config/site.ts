export const siteConfig = {
  name: "ALAP",
  nameBn: "আলাপ",
  description: "Business Automation & Digital Solutions Company",
  descriptionBn: "ব্যবসা স্বয়ংক্রিয়করণ ও ডিজিটাল সলিউশন কোম্পানি",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  mainNav: [
    { title: "Solutions", href: "/solutions" },
    { title: "How It Works", href: "/how-it-works" },
    { title: "Contact", href: "/contact" },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
};
