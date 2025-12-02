import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import ShopPreviewSection from '@/components/home/ShopPreviewSection';
import EcoStorySection from '@/components/home/EcoStorySection';
import SocialSection from '@/components/home/SocialSection';

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <ShopPreviewSection products={products} />
      <EcoStorySection />
      <SocialSection />
    </div>
  );
}