import { Login, Signup, Dashboard, Staff, Student, Parent, ViewStaff } from '../pages';
import { DashboardLayout } from '../components';
import Auth from '../components/auth';

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
      <Auth>
        <DashboardLayout />
      </Auth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'staff', element: <Staff /> },
      { path: 'staff/:id', element: <ViewStaff /> },
      { path: 'student', element: <Student /> },
      { path: 'parent', element: <Parent /> },
      { path: 'fees', element: <Dashboard /> },
      { path: 'classes', element: <Dashboard /> },
      { path: 'broadsheet', element: <Dashboard /> },
      { path: 'cbt', element: <Dashboard /> },
      { path: 'lesson-plan', element: <Dashboard /> },
      { path: 'messaging', element: <Dashboard /> },
      { path: 'time-table', element: <Dashboard /> },
      { path: 'assessment', element: <Dashboard /> },
    ],
  },
];
