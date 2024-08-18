import { useState } from 'react';
import { NavLink, Outlet, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';
import RouteGuard from './guard/RouteGuard';


export default function App() {
 const [show, setShow] = useState(true);
  return (
    <>
      <NavBar />
     
<RouteGuard>
<div className="mt-8">
        <Outlet />
      </div>
</RouteGuard> 



    </>
  );
}
