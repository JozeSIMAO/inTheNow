import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function NavBar({ setUrl, auth }) {
    const navigate = useNavigate();
    const location = useLocation();

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
      }

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
        <nav className={`navbar navbar-expand-lg ${location.pathname === '/DisplayWeather' ? 'bg-body-tertiary' : 'bg-dark'}`} data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" style={{cursor:"pointer"}} ><span className="badge bg-light text-dark fs-4">InThe<span className="bg-light text-danger fs-4">Now</span></span></a>
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
    );
}