import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const is_admin = user.role === 'admin';
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-auto text-primary" />
            <span className="font-bold text-2xl text-neutral-800 tracking-tight">
              Fluence {is_admin && <span className="text-xs font-bold tracking-wider text-accent-dark bg-accent-light px-2 py-1 rounded-full align-middle ml-2">ADMIN</span>}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-neutral-600">Welcome,</span>
              <span className="font-semibold text-primary">{user.name}</span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-base font-medium text-neutral-500 hover:text-primary transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};