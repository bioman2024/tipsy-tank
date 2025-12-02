import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Flame, Droplets, Leaf, Link2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Droplets,
      title: 'Choose Your Bottle',
      description: 'Clean and rinse an empty liquor bottle. Whiskey, wine, or vodka bottles all work great. Make sure it\'s completely dry before the next step.',
      image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=400&fit=crop',
      color: '#00C2D1'
    },
    {
      number: '02',
      icon: Scissors,
      title: 'Cut & Prep',
      description: 'Use our precision glass cutter to score the bottle where you want to cut. Then use the thermal shock method (hot and cold water) to cleanly separate the pieces. Sand the edges smooth.',
      image: 'https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=600&h=400&fit=crop',
      color: '#8A2BE2'
    },
    {
      number: '03',
      icon: Flame,
      title: 'Add Hardware',
      description: 'Insert the nano heater and air tubing. Apply silicone sealant around any openings. Our slim heater fits perfectly in standard bottles to keep your tank at the ideal temperature.',
      image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600&h=400&fit=crop',
      color: '#FF6F61'
    },
    {
      number: '04',
      icon: Leaf,
      title: 'Decorate',
      description: 'Add aquarium gravel, plants, and decorations. Our kits include everything you need to create a beautiful underwater scene. Get creative with your layout!',
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600&h=400&fit=crop',
      color: '#00C2D1'
    },
    {
      number: '05',
      icon: Link2,
      title: 'Extend It',
      description: 'Ready for more? Use our Maze Extension Kit to connect multiple bottles with clear tunnels, or the Window Bridge Kit to create a shared wall between tanks. Build an empire!',
      image: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=600&h=400&fit=crop',
      color: '#8A2BE2'
    }
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From empty bottle to living aquarium in five simple steps.
          </motion.p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div 
                    className="absolute top-6 left-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>
                </div>
                {/* Decorative blob */}
                <div 
                  className="absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-30"
                  style={{ 
                    backgroundColor: step.color,
                    top: index % 2 === 0 ? '-20%' : 'auto',
                    bottom: index % 2 === 1 ? '-20%' : 'auto',
                    right: index % 2 === 0 ? '-10%' : 'auto',
                    left: index % 2 === 1 ? '-10%' : 'auto'
                  }}
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{step.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Your First Tank?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Our Starter Kit has everything you need to get started. No experience required!
          </p>
          <Link to={createPageUrl('Shop')}>
            <Button 
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold shadow-lg"
            >
              Shop Starter Kit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}