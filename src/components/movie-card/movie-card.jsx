import React from "react";
import PropTypes from "prop-types";
import { Button,  Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to ={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>   
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string
        }).isRequired
    })
};