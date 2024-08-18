import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import About from './components/about/About.jsx';
import Contact from './components/contacts/Contact.jsx';
import Home from './components/Home.jsx'; // Ensure Home component is created
import Project from './components/projects/Project.jsx';
import './index.css';
import Skills from './components/skills/Skills.jsx';
import { WheelProvider } from './store/WheelContext.jsx';
import { RouteProtectionProvider } from './store/RouteContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component always renders
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "projects",
        element: <Project />
      },
      {
        path: "skills",
        element: <Skills />
      }
    
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteProtectionProvider>
      <WheelProvider>
        <RouterProvider router={router} />
      </WheelProvider>
    </RouteProtectionProvider>
  </StrictMode>,
);
