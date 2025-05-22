import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-aqua-600 font-bold text-4xl">JalPearl</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
                Home
              </Link>
              <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'nav-link-active' : ''}`}>
                Shop
              </Link>
              <Link to="/care-guide" className={`nav-link ${isActive('/care-guide') ? 'nav-link-active' : ''}`}>
                Care Guide
              </Link>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>
                About
              </Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <Badge className="absolute -top-2 -right-2 bg-aqua-500 text-white h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {cartCount}
                </Badge>}
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2">
              {isOpen ? <X className="h-6 w-6" /> : <div className="flex items-center space-x-2">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && <Badge className="absolute -top-2 -right-2 bg-aqua-500 text-white h-5 w-5 flex items-center justify-center p-0 rounded-full">
                        {cartCount}
                      </Badge>}
                  </div>
                  <Menu className="h-6 w-6" />
                </div>}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link to="/" className={`block nav-link ${isActive('/') ? 'nav-link-active' : ''}`} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className={`block nav-link ${isActive('/shop') ? 'nav-link-active' : ''}`} onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link to="/care-guide" className={`block nav-link ${isActive('/care-guide') ? 'nav-link-active' : ''}`} onClick={() => setIsOpen(false)}>
            Care Guide
          </Link>
          <Link to="/about" className={`block nav-link ${isActive('/about') ? 'nav-link-active' : ''}`} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={`block nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`} onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>;
};
export default NavBar;