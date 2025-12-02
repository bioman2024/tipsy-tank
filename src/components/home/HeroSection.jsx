import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-purple-50" />
      
      {/* Floating decorative elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-20 w-20 h-20 rounded-full bg-cyan-200/30 blur-xl"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-purple-200/30 blur-xl"
      />
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 left-1/4 w-16 h-16 rounded-full bg-coral-200/30 blur-xl"
        style={{ backgroundColor: 'rgba(255, 111, 97, 0.2)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-gray-700">Eco-Friendly DIY Kits</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Build an Aquarium From Your{' '}
              <span className="gradient-text">Empty Bottles.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg">
              Eco-friendly DIY kits that turn old liquor bottles into living art. 
              Create stunning mini aquariums and connect them into maze systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Shop')}>
                <Button 
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#00C2D1' }}
                >
                  Shop Kits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('HowItWorks')}>
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold border-2 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" style={{ color: '#8A2BE2' }} />
                  Watch How It Works
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold" style={{ color: '#00C2D1' }}>10K+</p>
                <p className="text-sm text-gray-500">Bottles Saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: '#8A2BE2' }}>5K+</p>
                <p className="text-sm text-gray-500">Happy Builders</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: '#FF6F61' }}>4.9★</p>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main image container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&h=800&fit=crop"
                  alt="Tipsy Tank Bottle Aquarium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent" />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Eco-Friendly</p>
                    <p className="text-xs text-gray-500">100% Upcycled</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-4 bottom-1/3 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                      <ellipse cx="12" cy="12" rx="8" ry="5" />
                      <path d="M4 12 L1 9 L1 15 Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fish Safe</p>
                    <p className="text-xs text-gray-500">Nano Species Ready</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}