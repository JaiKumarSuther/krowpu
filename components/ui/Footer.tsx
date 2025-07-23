"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
const linkClass = "text-white hover:text-[hsl(140_60%_85%)] transition-colors duration-150";

  return (
    <footer className="bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { title: "For Clients", items: ['How to Hire','Talent Marketplace','Project Catalog','Talent Scout','Hire an Agency','Enterprise','Payroll Services','Direct Contracts','Hire Worldwide','Hire in the USA'] },
            { title: "For Talents", items: ['How to Find Work','Direct Contracts','Find Freelance Jobs Worldwide','Find Freelance Jobs in the USA'] },
            { title: "Resources", items: ['Help & Support','Success Stories','Upwork Reviews','Resources','Blog','Community','Affiliate Program','Free Business tools'] },
            { title: "Company", items: ['About Us','Leaderships','Investor Relations','Careers','Our Impact','Press','Contact Us','Trust, Safety, and Security','Modern Slavery Statement'] },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[hsl(140_60%_85%)] font-medium mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <Link href="#" className={linkClass}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-8 border-t border-white/15">
          <div>
            <h4 className="text-[hsl(140_60%_85%)] font-medium mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-[hsl(0_0%_100%)/0.1] rounded-full flex items-center justify-center hover:bg-[hsl(140_60%_85%)] hover:text-[hsl(140_75%_20%)] transition-all duration-150"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <h4 className="text-[hsl(140_60%_85%)] font-medium mb-4">Mobile Apps</h4>
            <div className="flex space-x-4">
              {[FaApple, FaMobileAlt].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-[hsl(0_0%_100%)/0.1] rounded-full flex items-center justify-center hover:bg-[hsl(140_60%_85%)] hover:text-[hsl(140_75%_20%)] transition-all duration-150"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-white/15">
          <div className="text-[hsl(140_60%_85%)] text-sm mb-4 lg:mb-0">
            © 2015 - 2024 Krowpu® Global Inc.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {['Terms of Service','Privacy Policy','CA Notice at Collection','Cookie Settings','Accessibility'].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-[hsl(140_60%_85%)] hover:text-[hsl(0_0%_100%)] transition-colors duration-150"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
