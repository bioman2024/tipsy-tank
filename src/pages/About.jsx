import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Leaf, Lightbulb, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Every kit helps upcycle bottles that would otherwise end up in landfills. We\'re turning trash into treasure, one bottle at a time.',
      color: '#00C2D1'
    },
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'We believe everyone has an inner artist. Our kits make it easy to express yourself and create something truly unique.',
      color: '#8A2BE2'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Aquariums shouldn\'t be intimidating or expensive. We\'re making the hobby fun, affordable, and approachable for everyone.',
      color: '#FF6F61'
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
            About <span className="gradient-text">Tipsy Tank</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From empty bottles to living art.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Story Started With<br />
              <span className="gradient-text">Empty Bottles</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                It all began in a college apartment with too many empty bottles and not enough shelf space. One late night, staring at a beautiful whiskey bottle, we thought: "This is too pretty to throw away."
              </p>
              <p>
                What started as a fun weekend project quickly became an obsession. We learned to cut glass, figured out the perfect nano heating systems, and eventually connected multiple bottles into maze-like aquariums.
              </p>
              <p>
                Friends went crazy for them. Neighbors wanted their own. And Tipsy Tank was born.
              </p>
              <p>
                Today, we're on a mission to help people upcycle their bottles into stunning living art pieces. It's eco-friendly, it's creative, and honestly? It's just really fun.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&h=600&fit=crop"
                alt="Tipsy Tank setup"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-2xl bg-cyan-100 -z-10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-purple-100 -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What We <span className="gradient-text">Believe In</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-3xl p-8 text-center hover-lift"
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <value.icon className="w-8 h-8" style={{ color: value.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team/CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join the Tipsy Tank Community
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Thousands of builders have already created their own bottle aquariums. Ready to start your journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Shop')}>
              <Button 
                size="lg"
                className="w-full sm:w-auto rounded-full px-10 py-6 text-lg font-semibold"
                style={{ backgroundColor: '#00C2D1' }}
              >
                Shop Our Kits
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-10 py-6 text-lg font-semibold border-2"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}