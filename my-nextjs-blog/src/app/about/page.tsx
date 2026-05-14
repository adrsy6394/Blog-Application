import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About | BlogApp",
  description: "Learn more about BlogApp and our mission.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight mb-4">
          About BlogApp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We are dedicated to providing a fast, elegant, and modern platform for writers and readers alike.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            At BlogApp, we believe that great ideas deserve a great platform. Our mission is to empower creators by providing them with a frictionless writing experience, while giving readers an engaging, fast, and accessible way to consume content.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you're sharing profound technical insights, personal stories, or breaking news, BlogApp ensures your voice is heard clearly and beautifully.
          </p>
        </div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src="https://picsum.photos/seed/mission/600/800" 
            alt="Our Mission" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Built With Modern Tech</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Next.js 14</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">App Router & SSR</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">React</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Server Components</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Redux</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Saga & Toolkit</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Tailwind</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Utility-first CSS</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet the Creator</h2>
        <div className="inline-block relative">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
            <Image 
              src="https://picsum.photos/seed/avatar/200/200" 
              alt="Author Avatar" 
              width={128} 
              height={128} 
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full ring-2 ring-blue-600 dark:ring-blue-400 -m-1"></div>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">Alex Developer</h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">Lead Engineer</p>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
          Passionate about building fast, accessible, and highly scalable web applications using the latest JavaScript ecosystem tools.
        </p>
        <Link href="/contact" className="inline-flex justify-center items-center px-6 py-3 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg transition-colors">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
