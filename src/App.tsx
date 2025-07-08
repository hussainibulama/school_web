import './App.css';
import { Routes, Route } from 'react-router';
import { ThemeWrapper } from './hoc';
import { Login, Dashboard, Staff, Parent, Student } from './pages';
import { DashboardLayout } from './components';
import Auth from './components/auth';

function App() {
  return (
    <ThemeWrapper>
      <Routes>
        <Route path='/' Component={Login} />
        <Route
          path='/dashboard'
          element={
            <Auth>
              <DashboardLayout />
            </Auth>
          }
        >
          <Route index Component={Dashboard} />
          <Route path='staff' Component={Staff} />
          <Route path='student' Component={Student} />
          <Route path='parent' Component={Parent} />
          <Route path='fees' Component={Dashboard} />
          <Route path='classes' Component={Dashboard} />
          <Route path='broadsheet' Component={Dashboard} />
          <Route path='cbt' Component={Dashboard} />
          <Route path='lesson-plan' Component={Dashboard} />
          <Route path='messaging' Component={Dashboard} />
          <Route path='time-table' Component={Dashboard} />
          <Route path='assessment' Component={Dashboard} />
        </Route>
      </Routes>
    </ThemeWrapper>
  );
}

export default App;
