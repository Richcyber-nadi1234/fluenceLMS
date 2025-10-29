import React, { useState } from 'react';
import { SummaryCard } from './SummaryCard';
import { PerformanceChart } from './PerformanceChart';
import { InstructorNotes } from './InstructorNotes';
import { SettingsPanel } from './SettingsPanel';
import type { PerformanceData, InstructorNote, User } from '../types';
import { BookOpenIcon, CheckCircleIcon, UserCircleIcon } from './icons';

interface ParentDashboardProps {
    user: User;
    data: {
        todaySummary: { classesAttended: number; assignmentsCompleted: number; };
        performanceData: PerformanceData[];
        instructorNotes: InstructorNote[];
    }
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, data }) => {
    const [emailPreferences, setEmailPreferences] = useState({ daily_email: true });

    const handlePreferencesChange = (newPrefs: { daily_email: boolean }) => {
        setEmailPreferences(newPrefs);
        // Here you would typically make an API call to save the preferences
        console.log('Email preferences updated:', newPrefs);
    };

    if (user.role !== 'parent') {
        return <div>Error: Invalid user for this dashboard.</div>;
    }

    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-6">
                {user.studentName}'s Dashboard
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Today's Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SummaryCard
                                title="Classes Attended"
                                value={String(data.todaySummary.classesAttended)}
                                icon={<BookOpenIcon className="w-8 h-8 text-primary" />}
                            />
                            <SummaryCard
                                title="Assignments Completed"
                                value={String(data.todaySummary.assignmentsCompleted)}
                                icon={<CheckCircleIcon className="w-8 h-8 text-accent" />}
                            />
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <PerformanceChart data={data.performanceData} />

                    {/* Instructor Notes */}
                    <InstructorNotes notes={data.instructorNotes} />
                </div>

                {/* Sidebar/Settings area */}
                <div className="lg:col-span-1 space-y-6">
                    <SettingsPanel
                        emailPreferences={emailPreferences}
                        onPreferencesChange={handlePreferencesChange}
                    />
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 text-neutral-800">Your Profile</h3>
                        <div className="flex items-center space-x-4">
                            <UserCircleIcon className="w-16 h-16 text-neutral-300" />
                            <div>
                                <p className="font-bold text-lg text-neutral-800">{user.name}</p>
                                <p className="text-base text-neutral-500">Parent of {user.studentName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};