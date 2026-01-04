import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>

        {images.length > 1 && (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        <motion.img
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          src={images[currentIndex]}
          alt="Product"
          className="max-w-full max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}