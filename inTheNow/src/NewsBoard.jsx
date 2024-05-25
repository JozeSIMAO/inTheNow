import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category, query}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let url = `https://newsapi.org/v2/top-headlines?q=${query}&sortBy=relevency&language=en&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                setArticles(data.articles);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchNews();
    }, [category, query]);

    if (loading) {
        return <div>Loading...</div>;
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