import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';

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

    const renderAuthButton = () => {
        if (auth.currentUser) {
            return (
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
                    <button className="bg-dark fw-bold btn btn-outline-light" type="submit">Search</button>
                </form>
            );
        } else {
            return (
                <button className="bg-dark fw-bold btn btn-outline-light" onClick={() => navigate('/SignIn')}>Sign In</button>
            );
        }
    };

    if (location.pathname === '/SignIn') {
        return null;
    }

    return (
        <nav className={`navbar navbar-expand-lg ${location.pathname === '/DisplayWeather' ? 'bg-body-tertiary' : 'bg-success'}`} data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><span className="badge bg-light text-dark fs-4">InTheNow</span></a>
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
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Technology&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                        Technology
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Business&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                        Business
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Health&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                        Health
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Sports&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                        Sports
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevancy&language=en&category=Entertainment&pageSize=12&apiKey=${import.meta.env.VITE_API_KEY}`)}>
                                        Entertainment
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
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
