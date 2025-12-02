import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/shop/ProductCard';
import { useToast } from '@/components/ui/use-toast';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kits', name: 'Kits' },
    { id: 'extensions', name: 'Extensions' },
    { id: 'bundles', name: 'Bundles' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
            Shop <span className="gradient-text">Our Kits</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to turn empty bottles into amazing aquariums.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'shadow-lg'
                    : 'hover:border-cyan-500 hover:text-cyan-600'
                }`}
                style={activeCategory === category.id ? { backgroundColor: '#00C2D1' } : {}}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100">
                <Skeleton className="aspect-square" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}