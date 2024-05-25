import React from 'react';
import image from './assets/news.jpg';

export default function NewsItem({ title, description, src, url }) {
    const defaultImage = image;

    return (
        <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "300px" }}>
            <img
                src={src || defaultImage}
                onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
                className="card-img-top"
                alt={title}
            />
            <div className="card-body">
                <h5 className="card-title">{title ? title.slice(0, 100) : "No Title Available"}</h5>
                <p className="card-text">{description ? description.slice(0, 90) : "No description available"}</p>
                <a href={url} className="btn btn-primary">Read More</a>
            </div>
        </div>
    );
}
