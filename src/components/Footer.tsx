
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-aqua-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AquaShrimp</h3>
            <p className="mb-4 text-aqua-100">
              Specializing in breeding and selling high-quality Neocaridina shrimps, guppies, 
              and other ornamental fish for your aquarium needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-aqua-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-aqua-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:info@aquashrimp.com" className="text-aqua-200 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-aqua-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-aqua-200 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-aqua-200 hover:text-white transition-colors">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-aqua-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-aqua-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=shrimp" className="text-aqua-200 hover:text-white transition-colors">
                  Neocaridina Shrimps
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fish" className="text-aqua-200 hover:text-white transition-colors">
                  Guppies & Ornamental Fish
                </Link>
              </li>
              <li>
                <Link to="/shop?category=food" className="text-aqua-200 hover:text-white transition-colors">
                  Shrimp Food
                </Link>
              </li>
              <li>
                <Link to="/shop?category=care" className="text-aqua-200 hover:text-white transition-colors">
                  Care Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=combo" className="text-aqua-200 hover:text-white transition-colors">
                  Combo Deals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-aqua-200" />
                <span>000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-aqua-200" />
                <a href="mailto:info@aquashrimp.com" className="hover:text-aqua-200 transition-colors">
                  info@aquashrimp.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="inline-flex items-center px-4 py-2 bg-aqua-600 hover:bg-aqua-500 text-white rounded transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-aqua-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-aqua-200 text-sm">
              © {year} AquaShrimp. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a href="#" className="text-aqua-200 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-aqua-200 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-aqua-200 hover:text-white transition-colors">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
