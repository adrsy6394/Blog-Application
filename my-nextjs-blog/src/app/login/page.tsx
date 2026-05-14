import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/common/AnimatedSection";

export const metadata: Metadata = {
  title: "Login | BlogApp",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Editorial Image */}
      <div className="relative hidden lg:block overflow-hidden bg-[#0f172a]">
        <AnimatedSection direction="none" duration={1.5} className="h-full">
          <Image 
            src="/images/login_hero.png" 
            alt="Secure Access" 
            fill 
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]" />
          
          <div className="absolute bottom-20 left-20 z-10">
            <AnimatedSection delay={0.5} direction="up">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Secure Portal</p>
              <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">
                Entry <br /> Point
              </h2>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-24 bg-[#0f172a]">
        <div className="w-full max-w-sm">
          <AnimatedSection direction="up" delay={0.2} className="mb-16">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-8">Access Control</h1>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">Welcome <br /> Back</h2>
            <p className="text-white/40 text-sm italic">Please establish your credentials to continue to the dashboard.</p>
          </AnimatedSection>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
