"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store';
import { addNotification } from '@/store/slices/uiSlice';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

import Image from 'next/image';
import AnimatedSection from '@/components/common/AnimatedSection';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(addNotification({
        message: 'Your message has been sent successfully! We will get back to you soon.',
        type: 'success'
      }));
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <AnimatedSection direction="up" delay={0.1}>
            <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Reach Out</p>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.3}>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8] mb-12">
              Stay <br /> In <br /> Touch
            </h1>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.5}>
            <p className="max-w-md text-white/60 text-lg leading-relaxed italic border-l border-white/10 pl-8">
              Have a question, suggestion, or just want to start a conversation? Our doors are always open for visionary ideas.
            </p>
          </AnimatedSection>
        </div>
        
        <AnimatedSection direction="none" delay={0.7} className="relative aspect-[4/5] lg:aspect-square overflow-hidden">
           <Image 
             src="/images/contact_hero.png" 
             alt="Contact Us" 
             fill 
             className="object-cover brightness-75 hover:scale-105 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
        </AnimatedSection>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Contact Sidebar */}
        <div className="lg:col-span-4 space-y-16">
          <AnimatedSection delay={0.9} direction="up" className="border-l-2 border-white/5 pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Email Us</p>
            <p className="text-xl font-black uppercase tracking-tighter text-white">hello@blogapp.com</p>
          </AnimatedSection>
          
          <AnimatedSection delay={1.1} direction="up" className="border-l-2 border-white/5 pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Visit Us</p>
            <p className="text-xl font-black uppercase tracking-tighter text-white">San Francisco, CA</p>
          </AnimatedSection>

          <AnimatedSection delay={1.3} direction="up" className="border-l-2 border-white/5 pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Follow</p>
            <div className="flex gap-6 mt-2">
               <span className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white cursor-pointer transition-colors">TW</span>
               <span className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white cursor-pointer transition-colors">LN</span>
               <span className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white cursor-pointer transition-colors">GH</span>
            </div>
          </AnimatedSection>
        </div>

        {/* Contact Form */}
        <AnimatedSection delay={1.5} direction="up" className="lg:col-span-8">
          <div className="glass p-12 rounded-none">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light"
                    placeholder="Full Name"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light"
                  placeholder="Subject"
                />
              </div>
              
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light resize-none"
                  placeholder="Your Message"
                />
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-white text-[#0f172a] font-bold uppercase tracking-[0.3em] text-xs hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
