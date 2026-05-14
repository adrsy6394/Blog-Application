"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { addNotification } from "@/store/slices/uiSlice";
import { validateRequired, validateEmail, validatePassword, validateUsername } from "@/utils/validators";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    const fNameError = validateRequired(formData.firstName, "First Name");
    if (fNameError) newErrors.firstName = fNameError;
    
    const lNameError = validateRequired(formData.lastName, "Last Name");
    if (lNameError) newErrors.lastName = lNameError;
    
    const userError = validateUsername(formData.username);
    if (userError) newErrors.username = userError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passError = validatePassword(formData.password);
    if (passError) newErrors.password = passError;
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    
    // Store user for mock login (since DummyJSON doesn't persist new users)
    if (typeof window !== 'undefined') {
      const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
      mockUsers.push({
        ...formData,
        id: Math.floor(Math.random() * 1000) + 500, // Random ID
        image: `https://i.pravatar.cc/150?u=${formData.username}`,
        token: `mock-token-${Date.now()}`
      });
      localStorage.setItem('mock_users', JSON.stringify(mockUsers));
    }
    
    dispatch(addNotification({ message: "Account created successfully! Please login with your credentials.", type: "success" }));
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create an Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>
        
        <button type="submit" className="w-full py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Sign Up
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account? <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
