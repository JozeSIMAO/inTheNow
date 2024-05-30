import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import FloatingButton from "./FloatingButton";
import CommentForm from '../commentSection/CommentForm';
import CommentList from '../commentSection/CommentList';

const NewsBoard = ({ url }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [comments, setComments] = useState([]);

    const addComment = (comment) => {
      setComments([...comments, comment]);
    }

    const handleDownClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                let newsUrl = url;
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
    }, [url]);

    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
            setIsButtonVisible(!isAtBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {isButtonVisible && <FloatingButton onClick={handleDownClick} />}
            <CommentForm addComment={addComment} />
            <CommentList comments={comments} />
        </>
    );
};

export default NewsBoard;
