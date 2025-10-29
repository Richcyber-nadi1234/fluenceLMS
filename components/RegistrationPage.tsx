import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import type { User } from '../types';

interface RegistrationPageProps {
  onRegister: (userData: Omit<User, 'id'>) => void;
  onNavigateToLogin: () => void;
}

type Role = 'parent' | 'student';

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('parent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (role === 'parent' && !studentName) {
      setError("Please enter the student's name.");
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API call for registration
    setTimeout(() => {
      const userData: Omit<User, 'id'> = {
        name,
        role,
        ...(role === 'parent' && { studentName }),
      };
      onRegister(userData);
      setIsLoading(false);
    }, 1500);
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
            <h2 className="text-2xl font-bold text-neutral-800">Create Account</h2>
            <p className="text-neutral-500 mt-1">Get started with a free account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-base font-medium text-neutral-700 mb-2">I am a...</label>
              <div className="flex gap-4">
                {(['parent', 'student'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`w-full py-2 px-4 rounded-md text-base font-semibold border-2 transition-colors ${
                      role === r
                        ? 'bg-primary-light border-primary text-primary'
                        : 'bg-white border-neutral-300 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-base font-medium text-neutral-700">
                Your Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                placeholder={role === 'parent' ? "e.g., Ama Mensah" : "e.g., Kwame Mensah"}
              />
            </div>

            {role === 'parent' && (
              <div>
                <label htmlFor="studentName" className="block text-base font-medium text-neutral-700">
                  Student's Full Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  required={role === 'parent'}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                  placeholder="e.g., Kwame Mensah"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-base font-medium text-neutral-700">
                Email Address
              </label>
              <input
                id="email"
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
              <label htmlFor="password" className="block text-base font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-base font-medium text-neutral-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 mt-2 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-accent/50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </div>
          </form>
          <p className="text-base text-center text-neutral-500">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="font-semibold text-primary hover:underline focus:outline-none">
              Sign In
            </button>
          </p>
        </div>
        <p className="mt-6 text-center text-base text-neutral-500">
          Fluence Learning Management System
        </p>
      </div>
    </div>
  );
};