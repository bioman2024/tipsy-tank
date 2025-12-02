import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Fish, Link2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Scissors,
      title: "Cut It",
      description: "Use our precision bottle cutter to safely score and split your empty bottle.",
      color: '#00C2D1',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: Fish,
      title: "Build It",
      description: "Add the mini heater, bubbler, gravel, and decorations to create your ecosystem.",
      color: '#8A2BE2',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Link2,
      title: "Extend It",
      description: "Connect multiple bottles with tunnels or window bridges for an amazing maze.",
      color: '#FF6F61',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Three Simple Steps to{' '}
            <span className="gradient-text">Bottle Bliss</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your empty bottles into stunning aquariums in just a few easy steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
              )}

              <div className={`${step.bgColor} rounded-3xl p-8 text-center hover-lift`}>
                {/* Step number */}
                <div 
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold mb-6"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div 
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-10 h-10" style={{ color: step.color }} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}