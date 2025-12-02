import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "Is this safe for real fish?",
      answer: "Yes! Our kits are designed with fish safety in mind. The nano heaters maintain proper temperatures, and the bubblers provide adequate oxygenation. However, bottle aquariums are best suited for small species like shrimp, snails, and nano fish (like bettas in larger bottle setups or endlers in connected systems). Always research the specific needs of any species before adding them."
    },
    {
      question: "What kind of fish or animals can I keep?",
      answer: "For single bottle tanks, we recommend small invertebrates like cherry shrimp, snails, or small shrimp colonies. For connected multi-bottle systems, you can keep nano fish like endlers, microrasboras, or even a betta (in a larger setup). The key is providing adequate space and proper care for whatever you choose to keep."
    },
    {
      question: "Do I need my own bottle?",
      answer: "Yes! We don't include bottles because half the fun is choosing your own. Plus, this means you're actually upcycling a bottle that would otherwise go to waste. Any glass liquor bottle with thick walls works great. Whiskey, wine, and vodka bottles are all popular choices. Just make sure it's clean and dry before you start."
    },
    {
      question: "How long does setup take?",
      answer: "Most people complete their first Tipsy Tank in 2-3 hours. The cutting and sanding takes about 30 minutes once you get the hang of it. Hardware installation is quick, and decorating is the fun part! After that, you'll need to let the silicone cure for 24 hours before adding water, and cycle the tank for 1-2 weeks before adding any living creatures."
    },
    {
      question: "Do you ship internationally?",
      answer: "We currently ship to the US and Canada. International shipping is coming soon! Sign up for our newsletter to be the first to know when we expand. If you're outside our shipping zone, feel free to contact us and we'll see what we can do."
    },
    {
      question: "What if I mess up the cut?",
      answer: "Don't worry! Glass cutting takes a little practice. If your first cut doesn't come out perfectly, just grab another bottle and try again. Our instructions include tips for getting a clean cut, and there are plenty of tutorials online. Most people get it right by their second or third bottle."
    },
    {
      question: "Is the heater safe in such a small space?",
      answer: "Our nano heaters are specifically designed for small aquariums. They're low-wattage, fully submersible, and have automatic shut-off safety features. They maintain a steady temperature without overheating. Just make sure to follow the installation instructions carefully."
    },
    {
      question: "Can I connect bottles of different sizes?",
      answer: "Absolutely! Mixing bottle sizes can create really cool effects. Our Maze Extension Kit includes various connector sizes and flexible tubing that works with most bottle combinations. Just keep in mind that fish need clear swimming paths, so plan your layout accordingly."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day satisfaction guarantee on all unopened kits. If you've opened the kit but haven't used it, we'll accept returns within 14 days. Unfortunately, we can't accept returns on kits that have been used (for hygiene and safety reasons). If you received a defective item, contact us immediately and we'll make it right."
    },
    {
      question: "Do you offer replacement parts?",
      answer: "Yes! If you need extra grommets, tubing, silicone, or any other components, just reach out through our contact page. We sell individual parts at cost for existing customers."
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to know about building your Tipsy Tank.
          </motion.p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem 
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-semibold text-lg hover:no-underline hover:bg-gray-50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-12"
        >
          <MessageCircle className="w-12 h-12 mx-auto mb-6" style={{ color: '#00C2D1' }} />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We're here to help! Drop us a message and we'll get back to you as soon as possible.
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold"
              style={{ backgroundColor: '#00C2D1' }}
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}