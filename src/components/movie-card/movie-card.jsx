import React from "react";
import PropTypes from "prop-types";
import { Button,  Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, handleAddFavorite, handleRemoveFavorite, isFavorite }) => {

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            handleRemoveFavorite(movie._id);
        } else {
            handleAddFavorite(movie._id);
        }
    };

    return (
        <>
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director.Name}</Card.Text>
                    <Link to ={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button variant="link">Open</Button>
                    </Link>

                    <Button variant={isFavorite ? "danger" : "primary"} onClick={handleFavoriteToggle}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>

                </Card.Body>
            </Card>
        </> 
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }).isRequired,
    }).isRequired,
    handleAddFavorite: PropTypes.func.isRequired,
    handleRemoveFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};