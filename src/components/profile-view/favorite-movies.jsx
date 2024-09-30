import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favMovies }) => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {favMovies?.map((movie) => (
                            <Card key={movie._id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.director}</Card.Text>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button variant="primary">About Movie</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
                    )}
                </Col>
            </Row>
        </>
    );
};

FavoriteMovies.propTypes = {
    favMovies: PropTypes.array.isRequired
};