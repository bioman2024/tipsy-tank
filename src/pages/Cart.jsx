import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Cart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const sessionId = localStorage.getItem('tipsy_session') || '';

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart', sessionId],
    queryFn: () => base44.entities.CartItem.filter({ session_id: sessionId }),
    enabled: !!sessionId
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }) => {
      if (quantity <= 0) {
        await base44.entities.CartItem.delete(id);
      } else {
        await base44.entities.CartItem.update(id, { quantity });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', sessionId]);
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  });

  const removeItem = useMutation({
    mutationFn: (id) => base44.entities.CartItem.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', sessionId]);
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    }
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const placeholderImages = {
    'Starter Kit': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop',
    'Deluxe Kit': 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=200&h=200&fit=crop',
    'Maze Extension Kit': 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=200&fit=crop',
    'Window Bridge Kit': 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=200&h=200&fit=crop',
    'Ultimate Bundle': 'https://images.unsplash.com/photo-1559717865-a99cac1c95d8?w=200&h=200&fit=crop'
  };

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Your <span className="gradient-text">Cart</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border">
                <Skeleton className="w-24 h-24 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#00C2D120' }}
            >
              <ShoppingBag className="w-12 h-12" style={{ color: '#00C2D1' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any kits yet.</p>
            <Link to={createPageUrl('Shop')}>
              <Button 
                size="lg"
                className="rounded-full px-10"
                style={{ backgroundColor: '#00C2D1' }}
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={placeholderImages[item.product_name] || placeholderImages['Starter Kit']}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.product_name}</h3>
                      <p className="text-gray-500 text-sm mb-3">${item.price.toFixed(2)} each</p>
                      
                      <div className="flex items-center gap-4">
                        {/* Quantity controls */}
                        <div className="flex items-center bg-gray-100 rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => updateQuantity.mutate({ id: item.id, quantity: (item.quantity || 1) - 1 })}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => updateQuantity.mutate({ id: item.id, quantity: (item.quantity || 1) + 1 })}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem.mutate(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: '#00C2D1' }}>
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link to={createPageUrl('Shop')} className="inline-flex items-center text-gray-500 hover:text-cyan-600 transition-colors mt-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-28">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal < 75 && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                      Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span style={{ color: '#00C2D1' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-full py-6 text-lg font-semibold mb-4"
                  style={{ backgroundColor: '#00C2D1' }}
                >
                  Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}