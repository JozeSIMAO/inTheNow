import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function NavBar({ setUrl }) {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        setUrl(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=relevency&language=en&apiKey=${import.meta.env.VITE_API_KEY}`)
    };
    const handleWeather= (e) => {
        e.preventDefault();
        navigate('/DisplayWeather');
    }

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    if (location.pathname === '/DisplayWeather') {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid" >
                    <a className="navbar-brand" href="#"><span className="badge bg-dark text-primary fs-4">InTheNow</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link fw-bold" style={{ cursor: "pointer" }} onClick={handleBack}>Back To News</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link fw-bold" style={{ cursor: "pointer" }} onClick={handleWeather}>Weather</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg bg-success" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><span className="badge bg-light text-dark fs-4">InTheNow</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                style={{ cursor: "pointer" }} 
                                onClick={() => {setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&category=Technology&apiKey=${import.meta.env.VITE_API_KEY}`)}}>
                                    Technology
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => {setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&category=Business&apiKey=${import.meta.env.VITE_API_KEY}`)}}>
                                    Business
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => {setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&category=Health&apiKey=${import.meta.env.VITE_API_KEY}`)}}>
                                    Health
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => {setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&category=sports&apiKey=${import.meta.env.VITE_API_KEY}`)}}>
                                    Sport
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark fw-bold btn-outline-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => {setUrl(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&category=Entertainment&apiKey=${import.meta.env.VITE_API_KEY}`)}}>
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
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
                            <button className="bg-dark fw-bold btn btn-outline-light" type="submit" >Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
