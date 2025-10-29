import React from 'react';
import { SummaryCard } from './SummaryCard';
import { PerformanceChart } from './PerformanceChart';
import { AssignmentScoreChart } from './AssignmentScoreChart';
import { InstructorNotes } from './InstructorNotes';
import type { PerformanceData, InstructorNote, User, Assignment, AssignmentScoreData, DashboardStudent } from '../types';
import { BookOpenIcon, CheckCircleIcon, UserCircleIcon, ArrowLeftIcon, DocumentTextIcon, UsersIcon, BellIcon } from './icons';

interface StudentDashboardProps {
    student: DashboardStudent;
    data: {
        todaySummary: { classesAttended: number; assignmentsCompleted: number; };
        performanceData: PerformanceData[];
        instructorNotes: InstructorNote[];
        assignments: Assignment[];
    };
    onBack?: () => void;
    onNavigateToAssignments: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, data, onBack, onNavigateToAssignments }) => {
    const pendingAssignments = data.assignments.filter(a => a.status === 'Pending' || a.status === 'Overdue').length;
    
    // Prepare data for the new assignment scores chart
    const assignmentScoreData: AssignmentScoreData[] = data.assignments
        .filter(a => a.status === 'Completed' && typeof a.score === 'number')
        .map(a => ({ 
            name: a.title.split(' ')[0], // Use first word of title for brevity
            score: a.score! 
        }))
        .slice(-5); // Show last 5 completed assignments for clarity

    const getAttendanceIndicator = () => {
        const attendance = student.attendance;
        if (attendance >= 90) {
            return {
                Icon: CheckCircleIcon,
                color: 'text-green-500',
                statusText: 'Excellent',
                status: 'success' as const,
            };
        }
        if (attendance >= 75) {
            return {
                Icon: UsersIcon,
                color: 'text-yellow-500',
                statusText: 'Good',
                status: 'warning' as const,
            };
        }
        return {
            Icon: BellIcon,
            color: 'text-red-500',
            statusText: 'Needs Improvement',
            status: 'danger' as const,
        };
    };

    const attendanceIndicator = getAttendanceIndicator();

    return (
        <>
            {onBack && (
                <div className="mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Back to Admin Dashboard
                    </button>
                </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-6">
                Welcome back, {student.name}!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Today's Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-neutral-800">Overall Summary</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <SummaryCard
                                title="Attendance"
                                value={`${student.attendance}%`}
                                icon={<attendanceIndicator.Icon className={`w-8 h-8 ${attendanceIndicator.color}`} />}
                                status={attendanceIndicator.status}
                                statusText={attendanceIndicator.statusText}
                            />
                            <SummaryCard
                                title="Avg. Score"
                                value={`${student.overallScore}%`}
                                icon={<CheckCircleIcon className="w-8 h-8 text-primary" />}
                            />
                             <SummaryCard
                                title="Completed"
                                value={String(student.assignmentsCompleted)}
                                icon={<BookOpenIcon className="w-8 h-8 text-accent" />}
                            />
                        </div>
                    </div>

                    {/* Assignment Score Chart */}
                    <AssignmentScoreChart data={assignmentScoreData} />

                    {/* Performance Chart */}
                    <PerformanceChart data={data.performanceData} />
                </div>

                {/* Sidebar area */}
                <div className="lg:col-span-1 space-y-6">
                     {/* My Assignments */}
                     {!onBack && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-800">My Assignments</h3>
                            <div className="flex items-center bg-neutral-100 p-4 rounded-xl">
                                <DocumentTextIcon className="w-8 h-8 text-primary mr-4" />
                                <div>
                                    <p className="font-bold text-lg text-neutral-800">{pendingAssignments} Pending</p>
                                    <p className="text-base text-neutral-500">Assignments due soon</p>
                                </div>
                            </div>
                            <button 
                                onClick={onNavigateToAssignments}
                                className="mt-4 w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
                            >
                                View All Assignments
                            </button>
                        </div>
                     )}

                     {/* Instructor Notes */}
                    <InstructorNotes notes={data.instructorNotes} />

                     <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-4 text-neutral-800">Your Profile</h3>
                        <div className="flex items-center space-x-4">
                            <UserCircleIcon className="w-16 h-16 text-neutral-300" />
                            <div>
                                <p className="font-bold text-lg text-neutral-800">{student.name}</p>
                                <p className="text-base text-neutral-500">Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
