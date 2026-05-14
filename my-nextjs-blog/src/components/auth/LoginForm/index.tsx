"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { validateRequired, validatePassword } from "@/utils/validators";
import Link from "next/link";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Welcome Back</h2>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Enter username"
          />
          {validationErrors.username && <p className="text-xs text-red-500 mt-1">{validationErrors.username}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter password"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {validationErrors.password && <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account? <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
