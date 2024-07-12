import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/Error/NotFound';
import CreateProject from './pages/CreateProject/CreateProject';
import ProjectList from './pages/Projects/ProjectList';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('data_token');
  return token ? element : <Navigate to="/" replace />;
}


const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>,
    errorElement: <NotFound/>
  },
  {
    path: '/dashboard',
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: '/project-List',
    element: <PrivateRoute element={<ProjectList />} />,
  },
  {
    path: '/create-project',
    element: <PrivateRoute element={<CreateProject />} />,
  },
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
