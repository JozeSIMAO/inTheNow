import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, query, url }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                let newsUrl = url || `https://newsapi.org/v2/top-headlines?q=${query}&sortBy=relevency&language=en&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}` ;
                let response = await fetch(newsUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category, query, url]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {articles.map((news, index) => (
                <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
            ))}
        </>
    );
};

export default NewsBoard;
