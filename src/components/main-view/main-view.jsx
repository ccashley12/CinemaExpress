import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch("https://cinema-express-948d60ca8d20.herokuapp.com/movies", {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        image: movie.ImagePath,
                        director: movie.Director.Name,
                    };
                });

                setMovies(moviesFromApi);
            }).catch((e) => {
                console.log(e);
            });
    }, [token]);

        return (
            <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={5}>
                        <LoginView onLoggedIn={(user) => setUser(user)} />
                        or
                        <SignupView />
                    </Col>
                ) : selectedMovie ? (
                    <Col md={8}>
                        <MovieView 
                            style={{ border:"1px solid pink" }}
                            movie={selectedMovie} 
                            onBackClick={() => setSelectedMovie(null)}
                        />
                    </Col>
                ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                ) : (
                    <>
                        {movies.map((movie) => (
                            <Col className="mb-4" key={movie.id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                    </>
                )}
                <button
                    className="logout-button"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                    >Logout
                </button>
            </Row>
        );
};