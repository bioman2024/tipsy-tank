import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onAddToCart }) {
  const placeholderImages = {
    'starter-kit': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    'deluxe-kit': 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400&h=400&fit=crop',
    'maze-extension-kit': 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop',
    'window-bridge-kit': 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=400&h=400&fit=crop',
    'ultimate-bundle': 'https://images.unsplash.com/photo-1559717865-a99cac1c95d8?w=400&h=400&fit=crop'
  };

  const imageUrl = (product.image_urls && product.image_urls[0]) || product.image_url || placeholderImages[product.slug] || 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-cyan-50 to-purple-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="font-bold text-lg" style={{ color: '#00C2D1' }}>${product.price}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {product.short_description}
        </p>
        
        <div className="flex gap-3">
          <Button
            onClick={() => onAddToCart(product)}
            className="flex-1 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#00C2D1' }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link to={createPageUrl(`Product?slug=${product.slug}`)}>
            <Button
              variant="outline"
              className="rounded-full px-4 border-2 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}