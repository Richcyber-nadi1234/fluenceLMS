import React, { useState, useEffect } from 'react';
import type { School } from '../../types';
import { ArrowLeftIcon, PencilIcon } from '../icons';

interface EditSchoolPageProps {
  school: School;
  onEditSchool: (schoolData: School) => void;
  onCancel: () => void;
}

export const EditSchoolPage: React.FC<EditSchoolPageProps> = ({ school, onEditSchool, onCancel }) => {
  const [name, setName] = useState(school.name);
  const [location, setLocation] = useState(school.location);
  const [category, setCategory] = useState<School['category']>(school.category);
  const [logoUrl, setLogoUrl] = useState(school.logoUrl || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(school.name);
    setLocation(school.location);
    setCategory(school.category);
    setLogoUrl(school.logoUrl || '');
  }, [school]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      onEditSchool({
        ...school,
        name,
        location,
        category,
        logoUrl: logoUrl,
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
       <div className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Schools
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b">
           <div className="flex items-center gap-3">
              <div className="bg-primary-light p-3 rounded-full">
                  <PencilIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-800">Edit School Details</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-base font-medium text-neutral-700">School Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
             <div>
                <label htmlFor="location" className="block text-base font-medium text-neutral-700">Location</label>
                <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
            <div>
                <label htmlFor="category" className="block text-base font-medium text-neutral-700">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value as School['category'])} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base">
                    <option>International</option>
                    <option>Public</option>
                    <option>Private</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="logoUrl" className="block text-base font-medium text-neutral-700">Logo URL (Optional)</label>
                <input id="logoUrl" type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-base font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving || !name || !location}
                    className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
