import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

function DisplayWeather({ weather, setCity }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(searchQuery.trim());
        console.log('Search Query:', searchQuery);
    };

    return (
    <>
        <Container className="bg-link py-5">
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
                                    className="btn btn-info"
                                    style={{padding: "5px 10px", marginLeft: "10px"}}
                                >
                                    Search
                                </button>
                            </form>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="display-4">{weather.name}</Card.Title>
                            <Card.Text className="fs-5">
                                <strong>Temperature: </strong>{weather.main.temp}
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Pressure: </strong>{weather.main.pressure}
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Humidity: </strong>{weather.main.humidity}
                            </Card.Text>
                            <Card.Text className="fs-5">
                                <strong>Wind: </strong>{weather.wind.speed} MPH
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
