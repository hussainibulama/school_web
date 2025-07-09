import './App.css';
import { Routes } from 'react-router';
import { renderRoutes, routes } from './routes';

function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}

export default App;
