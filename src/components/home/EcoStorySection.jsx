import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart } from 'lucide-react';

export default function EcoStorySection() {
  const [counter, setCounter] = useState(0);
  const targetCount = 12847;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCounter(targetCount);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Turn Trash into<br />Living Art.
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Every Tipsy Tank kit helps upcycle bottles that would otherwise end up in landfills. 
              Join our community of eco-conscious creators who are making a difference, one bottle at a time.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <Recycle className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-sm text-white/70">Upcycled Materials</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <Heart className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl font-bold text-white">Safe</p>
                  <p className="text-sm text-white/70">For Fish & Planet</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
              <Leaf className="w-16 h-16 text-white mx-auto mb-6" />
              <p className="text-6xl sm:text-7xl font-bold text-white mb-4">
                {counter.toLocaleString()}
              </p>
              <p className="text-xl text-white/90">
                Bottles Saved From Landfills
              </p>
              <p className="text-sm text-white/60 mt-2">
                And counting every day...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}