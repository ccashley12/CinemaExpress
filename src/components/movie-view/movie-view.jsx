import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom"
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const movie = movies.find((m) => m.id === movieId);

    useEffect(() => {
        if(user && user.FavoriteMovies) {
            const isFavorite = user.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId, user]);


    const addtoFavorite = () => {
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/favorites/${movieId}`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(true);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const removefromFavorite = () => {
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/favorites/${movieId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(false);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return (
        <Card className="h-100 w-100">
            <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                    <Card.Header className="text-center fs-1">{movie.title}</Card.Header>
                    <br></br>
                        <Card.Text><strong>Director</strong> - {movie.director}</Card.Text>
                        <Card.Text><strong>Genre</strong> - {movie.genre}</Card.Text>
                        <Card.Text><strong>Description</strong> - {movie.description}</Card.Text>
                    <Link to={"/"}>
                        <button className="back-button">Back</button>
                    </Link>
                    <div className="mt-1">
                        {isFavorite ? (
                            <Button variant="danger" onClick={removefromFavorite}>Remove from favorites</Button>
                        ) : (
                            <Button variant="primary" onClick={addtoFavorite}>Add to favorites</Button>
                        )}
                    </div>
                </Card.Body>
        </Card>
    )
}