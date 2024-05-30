import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function NavBar({ setUrl, auth }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        setUrl(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=relevancy&language=en&apiKey=${import.meta.env.VITE_API_KEY}`);
    };

    const handleWeather = (e) => {
        e.preventDefault();
        navigate('/DisplayWeather');
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderAuthButton = () => {
        if (auth.currentUser) {
            return (
                <div className='d-flex'>
                    <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
                        <button className="bg-dark fw-bold btn btn-outline-light" type="submit">Search</button>
                    </form>
                    <form className='d-flex mx-3' onSubmit={logout}>
                        <button className="bg-danger fw-bold btn btn-outline-light" type="submit">Sign Out</button>
                    </form>
                </div>
            );
        } else {
            return (
                <button className="bg-dark fw-bold btn btn-outline-light" onClick={() => navigate('/SignIn')}>Sign In</button>
            );
        }
    };

    if (location.pathname === '/SignIn' || location.pathname === '/login') {
        return null;
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${location.pathname === '/DisplayWeather' ? 'bg-body-tertiary' : 'bg-dark'}`} data-bs-theme="dark">
                <div className="container-fluid">
                    <FontAwesomeIcon icon={faUserCircle} className="text-light fs-3 me-3" style={{ cursor: "pointer" }} onClick={toggleSidebar} />
                    <div className="d-flex align-items-center mx-auto">
                        <a className="navbar-brand mx-auto" style={{ cursor: "pointer" }}>
                            <span className="badge bg-light text-dark fs-4">
                                InThe<span className="bg-light text-danger fs-4">Now</span>
                            </span>
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {location.pathname === '/DisplayWeather' ? (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link fw-bold" style={{ cursor: "pointer" }} onClick={handleBack}>Back To News</button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Technology&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                            Technology
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Business&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                            Business
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Health&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                            Health
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Sports&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                            Sports
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Entertainment&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                            Entertainment
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-light fw-bold btn-outline-primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleWeather}>
                                            Weather
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        {renderAuthButton()}
                    </div>
                </div>
            </nav>

            <div className={`sidebar bg-dark text-light position-fixed top-0 vh-100 p-3 ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{zIndex: "1050"}}>
                <button className="btn btn-light mb-3" onClick={toggleSidebar}>Close</button>
                {auth.currentUser ? (
                    <div>
                        <h5 className='text-light'>{auth.currentUser.email}</h5>
                        <ul className="list-unstyled d-flex justify-content-center flex-column">
                            <li className='btn bg-success' style={{width:"100px"}}><a href="/profile" className="text-light">Profile</a></li>
                            <li className='btn bg-success mt-2' style={{width:"100px"}}><a href="/settings" className="text-light">Settings</a></li>
                            <li className='btn bg-success mt-2' style={{width:"100px"}}><a href="/" className="text-light">Saved Links</a></li>
                            <li className='btn bg-success mt-2' style={{width:"100px"}}><a href="/" className="text-light" onClick={logout}>Sign Out</a></li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h5>Guest</h5>
                        <ul className="list-unstyled">
                            <li><a href="/SignIn" className="text-light">SIGN IN</a></li>
                        </ul>
                    </div>
                )}
            </div>

            <style jsx="true">{`
                .sidebar {
                    transition: transform 0.3s ease;
                    width: 250px;
                }
                .sidebar-closed {
                    transform: translateX(-250px);
                }
                .sidebar-open {
                    transform: translateX(0);
                }
            `}</style>
        </>
    );
}
