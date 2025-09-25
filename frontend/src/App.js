// client/src/App.js
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { Link, useNavigate, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import YourProjects from './components/YourProjects.js'
import CreateProject from './components/CreateProject';
import ProjectDetails from './components/ProjectDetails.js'
import logo from './logo.png'

import logout from './logout.png'
import menu from './menu.png'
import toast from 'react-hot-toast'
import About from './components/About.js';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [hamburgerMenu, setHamburgerMenu] = useState(false)

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setLoggedInUser(null); // Set logged-in user to null
        navigate('/')
        toast.error("Logged out of your account!")
    };

    // const location = useLocation()
    // if ((location.pathname !== '/' && location.pathname !== '/register') && !loggedInUser) {
    //   navigate('/')
    // } else if (location.pathname == '/' || location.pathname =='/register' && loggedInUser) {
    //   navigate('/home')
    // }
    var tooltip = document.querySelectorAll('.tooltip');

    document.addEventListener('mousemove', fn, false);

    function fn(e) {
        for (var i=tooltip.length; i--;) {
            tooltip[i].style.left = e.pageX + 'px';
            tooltip[i].style.top = e.pageY + 'px';
        }
    }
    const inRoutes = (
      <>
        <Route path={"/home"} element={<Home tooltip={tooltip}/>} />
        <Route path={"/projects"} element={<YourProjects />} />
        <Route path={"/create-project"} element={<CreateProject />} />
        <Route path={"/project-details/:project-id"} element={<ProjectDetails />} />
      </>
    )
    const loggedInRoutes = (
        loggedInUser && inRoutes
    )
   
    return (
        <div className="App">
          <header>
            <div className='header'>
              <img src={logo} alt="logo" className='logo' /><h1>EcoTogether</h1>
              {
                loggedInUser && 
                <div className='header-buttons'>
                  <button className='menu-button' onClick={e => setHamburgerMenu(p => !p)}>
                      <img src={menu}/>
                      {
                        hamburgerMenu && (
                          <div className='menu'>
                            <Link to={'/home'} className='menu-link'>Home</Link>
                            <Link to={'/projects'} className='menu-link'>Projects</Link>
                            <Link to={'/create-project'} className='menu-link'>Create New Project</Link>
                          </div>
                        )
                      }
                    </button>
                  <button className='logout' onClick={handleLogout}><img src={logout}/></button>
                </div>
              }
            </div>
          </header>
            <Routes>
              {loggedInRoutes}
              <Route path="*" element={<Navigate to ="/" />}/>
              <Route path={"/"} element={<Login setLoggedInUser={setLoggedInUser} />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={'/about'} element={<About />} />
            </Routes>
        </div>
    );
};

export default App;