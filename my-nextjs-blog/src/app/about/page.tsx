import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About | BlogApp",
  description: "Learn more about BlogApp and our mission.",
};

import AnimatedSection from '@/components/common/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <AnimatedSection direction="none" duration={1.5} className="relative aspect-[4/5] lg:aspect-square overflow-hidden order-2 lg:order-1">
           <Image 
             src="/images/about_hero.png" 
             alt="About Us" 
             fill 
             className="object-cover brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
        </AnimatedSection>
        
        <div className="order-1 lg:order-2">
          <AnimatedSection delay={0.2} direction="up">
            <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Our Essence</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} direction="right">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8] mb-12">
              The <br /> Mind <br /> Behind
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.6} direction="up">
            <p className="max-w-md text-white/60 text-lg leading-relaxed italic border-l border-white/10 pl-8">
              Transcending the ordinary boundaries of digital expression, we craft spaces where ideas breathe and innovation takes form.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="grid md:grid-cols-3 gap-12 mb-32">
        {[
          { num: "01. Precision", title: "Meticulous Detail", desc: "Every pixel, every word, and every line of code is chosen with intent. We don't just build, we compose." },
          { num: "02. Elegance", title: "Fluid Design", desc: "Complexity simplified. Our philosophy is rooted in the belief that beauty lies in the absence of the unnecessary." },
          { num: "03. Impact", title: "Lasting Influence", desc: "We measure success not in clicks, but in the thoughts we provoke and the connections we enable." }
        ].map((item, i) => (
          <AnimatedSection key={i} delay={0.8 + (i * 0.2)} direction="up" className="glass p-10 border-l-2 border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">{item.num}</p>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">{item.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
          </AnimatedSection>
        ))}
      </div>

      {/* Tech Stack (Editorial Style) */}
      <AnimatedSection delay={1.4} direction="none" className="py-20 border-t border-white/5 text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-white/20 mb-12">Engineered with Excellence</h2>
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-12">
          {['Next.js', 'Redux', 'Tailwind', 'Saga'].map((tech, i) => (
            <AnimatedSection key={tech} delay={1.6 + (i * 0.1)} direction="up" className="flex flex-col items-center">
               <span className="text-4xl font-black uppercase tracking-tighter text-white">{tech}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-2">
                 {i === 0 ? 'Architecture' : i === 1 ? 'Intelligence' : i === 2 ? 'Aesthetics' : 'Fluidity'}
               </span>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={2} direction="up" className="mt-32 text-center">
        <Link href="/contact" className="inline-block px-12 py-5 bg-white text-[#0f172a] font-bold uppercase tracking-[0.3em] text-xs hover:bg-gray-200 transition-all rounded-none">
          Contact Us
        </Link>
      </AnimatedSection>
    </div>
  );
}
