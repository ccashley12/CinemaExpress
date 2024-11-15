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
                <Card.Text>{movie.Director}</Card.Text>
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text>{movie.Genre}</Card.Text>
                <Link to ={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>   
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }).isRequired,
        Description: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired,
};