import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import type { User } from '../types';


interface LoginPageProps {
  onLogin: (userData: User) => void;
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (email.toLowerCase() === 'admin@fluence.com' && password === 'admin') {
        onLogin({
          name: 'Admin User',
          role: 'admin',
        });
      } else if (email.toLowerCase() === 'instructor@fluence.com' && password === 'instructor') {
          onLogin({
              id: 1,
              name: 'Aisha Mensah',
              role: 'instructor',
              courses: ['Python Beginners', 'Advanced Python']
          });
      } else if (email.toLowerCase().includes('student')) {
        // For this demo, any email with 'student' is a student
        onLogin({ id: 1, name: 'Kwame', role: 'student' });
      } else {
        // Any other login is a parent
        onLogin({ name: 'Ama', studentName: 'Kwame', role: 'parent' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center items-center mb-8 space-x-3">
          <LogoIcon className="h-10 w-auto text-primary" />
          <span className="font-bold text-4xl text-neutral-800 tracking-tight">
            Fluence
          </span>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800">Login</h2>
            <p className="text-neutral-500 mt-1">Welcome! Please sign in.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-neutral-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-neutral-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                placeholder="••••••••"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          <p className="text-base text-center text-neutral-500">
            Don't have an account?{' '}
            <button onClick={onNavigateToRegister} className="font-semibold text-primary hover:underline focus:outline-none">
              Sign Up
            </button>
          </p>
           <div className="text-sm text-center text-neutral-400 pt-4 border-t space-y-1">
             <p>Hint: Use <span className="font-semibold">admin@fluence.com</span> / <span className="font-semibold">admin</span> for admin login.</p>
             <p>Use <span className="font-semibold">instructor@fluence.com</span> / <span className="font-semibold">instructor</span> for instructor login.</p>
             <p>Use an email with "student" in it (e.g. <span className="font-semibold">student@example.com</span>) for student login.</p>
           </div>
        </div>
        <p className="mt-6 text-center text-base text-neutral-500">
          Fluence Learning Management System
        </p>
      </div>
    </div>
  );
};