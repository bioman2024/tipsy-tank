import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { base44 } from '@/api/base44Client';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const sessionId = localStorage.getItem('tipsy_session') || crypto.randomUUID();
        localStorage.setItem('tipsy_session', sessionId);
        const items = await base44.entities.CartItem.filter({ session_id: sessionId });
        const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(total);
      } catch (e) {
        console.log('Cart not loaded');
      }
    };
    fetchCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [location]);

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Shop', page: 'Shop' },
    { name: 'How It Works', page: 'HowItWorks' },
    { name: 'About', page: 'About' },
    { name: 'FAQ', page: 'FAQ' },
    { name: 'Contact', page: 'Contact' }
  ];

  const isActive = (page) => {
    const currentPage = location.pathname.split('/').pop() || 'Home';
    return currentPage.toLowerCase() === page.toLowerCase();
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to={createPageUrl('Home')}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={createPageUrl(link.page)}
                className={`relative font-medium transition-colors duration-200 ${
                  isActive(link.page) 
                    ? 'text-cyan-500' 
                    : 'text-gray-700 hover:text-cyan-500'
                }`}
              >
                {link.name}
                {isActive(link.page) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Cart')}>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative rounded-full hover:bg-cyan-50"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FF6F61' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={createPageUrl(link.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        isActive(link.page)
                          ? 'bg-cyan-50 text-cyan-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t">
                  <Link 
                    to={createPageUrl('Cart')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      className="w-full rounded-full font-semibold"
                      style={{ backgroundColor: '#00C2D1' }}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      View Cart {cartCount > 0 && `(${cartCount})`}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}