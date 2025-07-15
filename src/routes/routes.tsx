import {
  Login,
  Signup,
  Dashboard,
  Staff,
  Student,
  Parent,
  ViewStaff,
  ViewStudent,
  ViewParent,
  Settings,
  ClassArms,
  ClassLevels,
  Subjects,
  Classes,
  ViewClasses,
  ClassSubjects,
  Session,
  Assessment,
  ViewAssessmentSubjects,
  AddSubjectScore,
} from '../pages';
import { DashboardLayout, AuthWrapper } from '../components';

export const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <AuthWrapper>
        <DashboardLayout />
      </AuthWrapper>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'staff', element: <Staff /> },
      { path: 'staff/:id', element: <ViewStaff /> },
      { path: 'student', element: <Student /> },
      { path: 'student/:id', element: <ViewStudent /> },
      { path: 'parent', element: <Parent /> },
      { path: 'parent/:id', element: <ViewParent /> },
      { path: 'fees', element: <Dashboard /> },
      { path: 'classes', element: <Classes /> },
      { path: 'classes/:id', element: <ViewClasses /> },
      { path: 'broadsheet', element: <Dashboard /> },
      { path: 'cbt', element: <Dashboard /> },
      { path: 'lesson-plan', element: <Dashboard /> },
      { path: 'messaging', element: <Dashboard /> },
      { path: 'time-table', element: <Dashboard /> },
      { path: 'assessment', element: <Assessment /> },
      { path: 'assessment/:schoolClassId', element: <ViewAssessmentSubjects /> },
      { path: 'assessment/:schoolClassId/:subjectId', element: <AddSubjectScore /> },
      { path: 'settings', element: <Settings /> },
      { path: 'settings/class-arms', element: <ClassArms /> },
      { path: 'settings/class-levels', element: <ClassLevels /> },
      { path: 'settings/subjects', element: <Subjects /> },
      { path: 'settings/subjects/:id', element: <ClassSubjects /> },
      { path: 'settings/session', element: <Session /> },
    ],
  },
];
