"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { validateRequired, validatePassword } from "@/utils/validators";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [validationErrors, setValidationErrors] = useState<{username?: string; password?: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uError = validateRequired(username, "Username");
    const pError = validatePassword(password);
    if (uError || pError) {
      setValidationErrors({ username: uError || undefined, password: pError || undefined });
      return;
    }
    setValidationErrors({});
    login(username, password);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-sm"
    >
      {error && (
        <div className="mb-8 p-4 text-xs font-bold uppercase tracking-widest text-red-400 border-l-2 border-red-400 bg-red-400/5">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Identify</p>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light"
            placeholder="Username"
          />
          {validationErrors.username && <p className="text-[10px] text-red-500 mt-2 uppercase font-bold tracking-widest">{validationErrors.username}</p>}
        </div>
        
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Access Key</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white transition-colors placeholder:text-white/10 text-lg font-light"
            placeholder="Password"
          />
          {validationErrors.password && <p className="text-[10px] text-red-500 mt-2 uppercase font-bold tracking-widest">{validationErrors.password}</p>}
        </div>
        
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 bg-white text-[#0f172a] font-bold uppercase tracking-[0.3em] text-xs hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Establish Connection"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
