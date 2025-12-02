import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shop/ProductCard';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';

export default function ShopPreviewSection({ products }) {
  const { toast } = useToast();

  const handleAddToCart = async (product) => {
    const sessionId = localStorage.getItem('tipsy_session') || crypto.randomUUID();
    localStorage.setItem('tipsy_session', sessionId);

    try {
      const existingItems = await base44.entities.CartItem.filter({
        session_id: sessionId,
        product_id: product.id
      });

      if (existingItems.length > 0) {
        await base44.entities.CartItem.update(existingItems[0].id, {
          quantity: (existingItems[0].quantity || 1) + 1
        });
      } else {
        await base44.entities.CartItem.create({
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
          session_id: sessionId
        });
      }

      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Could not add to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Shop <span className="gradient-text">Our Kits</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Everything you need to start your bottle aquarium journey.
            </p>
          </div>
          <Link to={createPageUrl('Shop')} className="mt-6 md:mt-0">
            <Button 
              variant="outline" 
              className="rounded-full px-6 border-2 hover:border-cyan-500 hover:text-cyan-600 transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}