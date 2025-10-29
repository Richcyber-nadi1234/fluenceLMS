import React from 'react';

interface SettingsPanelProps {
  emailPreferences: { daily_email: boolean };
  onPreferencesChange: (prefs: { daily_email: boolean }) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ emailPreferences, onPreferencesChange }) => {
  const handleToggle = () => {
    onPreferencesChange({ daily_email: !emailPreferences.daily_email });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">Settings & Actions</h3>
      <div className="space-y-6">
        {/* Email Preferences */}
        <div>
          <h4 className="font-semibold text-neutral-700 mb-2">Notification Preferences</h4>
          <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-lg">
            <label htmlFor="daily-email" className="text-base text-neutral-800 cursor-pointer">
              Receive Daily Email Reports
            </label>
            <button
              id="daily-email"
              onClick={handleToggle}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                emailPreferences.daily_email ? 'bg-primary' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  emailPreferences.daily_email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Request Meeting */}
        <div>
           <h4 className="font-semibold text-neutral-700 mb-2">Contact Instructor</h4>
          <button className="w-full bg-accent text-white font-semibold py-3 px-4 rounded-xl hover:bg-accent-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent shadow-sm">
            Request a Meeting
          </button>
        </div>
      </div>
    </div>
  );
};