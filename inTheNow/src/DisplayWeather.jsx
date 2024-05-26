import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

function DisplayWeather({ weather, setCity}) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(searchQuery.trim());
        console.log('Search Query:', searchQuery);
    };

    return (
    <>
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center shadow-lg">
                        <Card.Header className="bg-secondary text-white">
                            <form className="search-form" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Enter city name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{borderRadius: "2px", border: "none", outline: "none"}}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-success bg-dark text-white border-primary"
                                    style={{padding: "5px 10px", marginLeft: "10px"}}
                                >
                                    Search
                                </button>
                            </form>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="display-4">{weather.name}
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            />
                            </Card.Title>
                            <Card.Text className="fs-5">
                                <strong>Temperature: </strong>{weather.main.temp}°
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Humidity: </strong>{weather.main.humidity}%
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Wind Speed: </strong>{Math.floor(weather.wind.speed * 3.6)} KM/H
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Description: </strong>{weather.weather[0].description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
}

export default DisplayWeather;
