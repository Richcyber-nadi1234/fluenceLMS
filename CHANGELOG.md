# Fluence LMS Dashboard Changelog

## [Unreleased] - 2024-05-22

### Added
- **School Management (Admin):**
  - Admins can now add new partner schools with details like logo, name, location, and category.
  - A dedicated "Edit School" page allows admins to update existing school information.
  - The "Students by School" view now displays rich school details and serves as a central management hub.
- **Instructor "Go Live" Feature:** Instructors can now start a live video session from their dashboard, with camera/mic access and session controls.
- **Instructor Class Scheduling:** Instructors can schedule new classes via a modal on their dashboard, which appear in a new "My Schedule" tab.
- **Instructor Assignment Management:**
  - Instructors can add new assignments for their courses via a modal.
  - A new "Assignments" tab on the instructor dashboard allows instructors to view, edit, and delete created assignments with a confirmation step.
- **Admin School Roster Management:**
  - Admins can simulate a CSV/Excel import to bulk-add students to a specific school.
  - Admins can add individual students to a specific school, with school details pre-filled for accuracy.
- **Student Assignment Reminders:** Students can set reminders for their pending assignments.
- **Visual "Due Soon" Indicators:** Assignments due within 3 days are now highlighted with a special color and icon for students.
- **Assignment Score Chart (Student):** A new bar chart on the student dashboard visualizes scores from completed assignments.

### Changed
- **UI/UX Enhancements:**
  - The Instructor Dashboard now features a tabbed interface ("My Students", "My Schedule", "Assignments") for better organization.
  - The "Students by School" page for admins now uses a collapsible accordion layout for improved readability.
  - Assignment cards on the student page have been restyled with better visual hierarchy and hover effects.
  - Stat cards on the admin dashboard are now fully interactive, navigating to detailed list views on click.
- **Refined Data Model:**
  - The data structure for schools has been centralized, and students are now linked via a `schoolId`.
  - The "Add Student" form for admins now uses a dropdown for school selection to ensure data consistency.
- **Instructor Dashboard Redesign:** The dashboard now has a more intuitive, course-centric workflow for viewing students.
- **Login Flow:** The application now supports a new `instructor` role with a dedicated dashboard.
- **Student Management:** Admins can now associate students with a `schoolId` upon creation.

### Fixed
- **Module Resolution Error:** Corrected an import path error for mock data (`@/mockData` to `./mockData`).
- **Parent Dashboard Type Error:** Added a type guard to ensure `user.studentName` is only accessed for users with the 'parent' role.
