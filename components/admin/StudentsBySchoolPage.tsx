import React, { useState } from 'react';
import type { School, DashboardStudent } from '../../types';
import { ArrowLeftIcon, BuildingLibraryIcon, PencilIcon, PlusCircleIcon, MapPinIcon, ChevronDownIcon, UserCircleIcon, ArrowUpTrayIcon } from '../icons';

interface StudentsBySchoolPageProps {
  schools: School[];
  students: DashboardStudent[];
  onBack: () => void;
  onNavigateToAddSchool: () => void;
  onNavigateToEditSchool: (school: School) => void;
}

export const StudentsBySchoolPage: React.FC<StudentsBySchoolPageProps> = ({ schools, students, onBack, onNavigateToAddSchool, onNavigateToEditSchool }) => {
  const [expandedSchoolId, setExpandedSchoolId] = useState<number | null>(schools[0]?.id || null);

  const getStudentsForSchool = (schoolId: number) => {
    return students.filter(s => s.schoolId === schoolId);
  }

  const handleToggle = (schoolId: number) => {
    setExpandedSchoolId(prevId => prevId === schoolId ? null : schoolId);
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-light p-3 rounded-full">
                <BuildingLibraryIcon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800">Partner Schools</h1>
          </div>
           <button
            onClick={onNavigateToAddSchool}
            className="flex items-center gap-2 text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add School
          </button>
        </div>
        <div className="space-y-2">
          {schools.map(school => {
            const schoolStudents = getStudentsForSchool(school.id);
            const isExpanded = expandedSchoolId === school.id;
            
            return (
              <div key={school.id} className="bg-neutral-100 rounded-xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => handleToggle(school.id)}
                  className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 text-left hover:bg-neutral-200/50"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img src={school.logoUrl} alt={`${school.name} logo`} className="w-16 h-16 rounded-lg object-cover bg-white p-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-neutral-800 text-lg">{school.name}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-neutral-500 mt-1">
                            <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" />{school.location}</span>
                            <span className="font-semibold text-accent-dark bg-accent-light px-2 py-0.5 rounded-full text-sm">{school.category}</span>
                        </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <div className="text-right">
                        <p className="text-sm text-neutral-500 font-semibold">STUDENTS</p>
                        <p className="font-bold text-xl text-neutral-800">{schoolStudents.length}</p>
                    </div>
                    {/* Stop propagation to prevent accordion from toggling when clicking buttons */}
                    <button
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            alert(`Simulating CSV/Excel import for ${school.name}.`); 
                        }}
                        className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-200 rounded-full transition-colors"
                        aria-label={`Import students for ${school.name}`}
                        title="Import Students"
                    >
                        <ArrowUpTrayIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNavigateToEditSchool(school); }}
                        className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-200 rounded-full transition-colors"
                        aria-label={`Edit ${school.name}`}
                        title="Edit School"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <ChevronDownIcon className={`w-6 h-6 text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {isExpanded && (
                  <div className="p-4 border-t border-neutral-200">
                    {schoolStudents.length > 0 ? (
                      <div className="space-y-3">
                        {schoolStudents.map(student => (
                          <div key={student.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                            <div>
                              <p className="font-semibold text-neutral-800">{student.name}</p>
                              <p className="text-base text-neutral-500">{student.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-neutral-500 py-4">No students are currently assigned to this school.</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};