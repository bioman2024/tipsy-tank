import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function SocialSection() {
  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=600&fit=crop',
      title: 'Making my first Tipsy Tank!'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400&h=600&fit=crop',
      title: 'The maze extension is insane'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=400&h=600&fit=crop',
      title: 'Fish love their new home'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
            <span className="text-sm font-medium">@tipsytank</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tipsy Tank <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our community is creating. Tag us in your builds!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer hover-lift"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}