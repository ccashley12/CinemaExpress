import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favMovies }) => {
    return (
        <div>
            {FavoriteMovies.length === 0 ? (
                <p>No Favorite Movies selected</p>
            ) : (
                favMovies.map((movie) = (
                    <Card key={movie._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.director}</Card.Text>
                            <Link to={`/movies/${movie._id}`}>
                                <Button variant="primary">About Movie</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

FavoriteMovies.prototype = {
    FavoriteMovies: PropTypes.array.isRequired
};