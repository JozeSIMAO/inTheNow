import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ setCategory, setQuery }) {
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        const queryString = `${encodeURIComponent(searchQuery)}`;
        setQuery(queryString);
    };
    const handleWeather= (e) => {
        e.preventDefault();
        navigate('/DisplayWeather');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className="badge bg-light text-dark fs-4">InTheNow</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={() => setCategory("Technology")}>Technology</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={() => setCategory("Business")}>Business</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={() => setCategory("Health")}>Health</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={() => setCategory("Sport")}>Sport</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={() => setCategory("Entertainment")}>Entertainment</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={handleWeather}>Weather</button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
