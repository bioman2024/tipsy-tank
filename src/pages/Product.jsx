import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, ArrowLeft, AlertCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/shop/ProductCard';
import { useToast } from '@/components/ui/use-toast';

export default function Product() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.slug !== slug).slice(0, 3);

  const placeholderImages = {
    'starter-kit': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop',
    'deluxe-kit': 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&h=800&fit=crop',
    'maze-extension-kit': 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&h=800&fit=crop',
    'window-bridge-kit': 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800&h=800&fit=crop',
    'ultimate-bundle': 'https://images.unsplash.com/photo-1559717865-a99cac1c95d8?w=800&h=800&fit=crop'
  };

  const handleAddToCart = async (prod) => {
    const sessionId = localStorage.getItem('tipsy_session') || crypto.randomUUID();
    localStorage.setItem('tipsy_session', sessionId);

    try {
      const existingItems = await base44.entities.CartItem.filter({
        session_id: sessionId,
        product_id: prod.id
      });

      if (existingItems.length > 0) {
        await base44.entities.CartItem.update(existingItems[0].id, {
          quantity: (existingItems[0].quantity || 1) + 1
        });
      } else {
        await base44.entities.CartItem.create({
          product_id: prod.id,
          product_name: prod.name,
          price: prod.price,
          quantity: 1,
          session_id: sessionId
        });
      }

      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      toast({
        title: "Added to cart!",
        description: `${prod.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Could not add to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to={createPageUrl('Shop')}>
            <Button className="rounded-full" style={{ backgroundColor: '#00C2D1' }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.image_url || placeholderImages[product.slug] || placeholderImages['starter-kit'];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link 
            to={createPageUrl('Shop')}
            className="inline-flex items-center text-gray-500 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-50 to-purple-50 shadow-xl">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Badge 
              className="absolute top-6 right-6 px-4 py-2 text-lg font-bold"
              style={{ backgroundColor: '#00C2D1' }}
            >
              ${product.price}
            </Badge>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:py-8"
          >
            <Badge variant="outline" className="mb-4 capitalize">
              {product.category?.replace('-', ' ') || 'Kit'}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {product.name}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {product.intro || product.short_description}
            </p>

            <Button
              size="lg"
              onClick={() => handleAddToCart(product)}
              className="w-full sm:w-auto rounded-full px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-8"
              style={{ backgroundColor: '#00C2D1' }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart – ${product.price}
            </Button>

            {/* What's In The Box */}
            {product.whats_in_box && product.whats_in_box.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" style={{ color: '#00C2D1' }} />
                  What's In The Box
                </h3>
                <ul className="space-y-3">
                  {product.whats_in_box.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#00C2D1' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perfect For */}
            {product.perfect_for && product.perfect_for.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Perfect For</h3>
                <ul className="space-y-3">
                  {product.perfect_for.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8A2BE2' }} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                These kits are best suited for small species (like shrimp, snails, or nano fish) and larger multi-bottle setups. Always research appropriate tank size and stocking.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={p} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}