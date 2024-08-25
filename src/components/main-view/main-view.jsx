import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    useEffect(() => {
        if (!token) return;

        fetch("https://cinema-express-948d60ca8d20.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
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

    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={12} className="text-center my-3">
                    <h1>CinemaExpress DB</h1> 
                </Col>
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                </Col>
                <Col md={12} className="text-center my-3">
                    <span>or</span>
                </Col>
                <Col md={5}>
                    <SignupView />
                </Col>
            </Row>
        );
    }

        return (
            <Row className="justify-content-md-center mt=5">
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
                        <Row className="justify-content-md-center mt-5">
                            <Col xs={12} className="text-center">
                                <h1>Movie Library</h1>
                            </Col>
                        </Row>
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
                <Button
                    className="logout-button"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                    >Logout
                </Button>
            </Row>
        );
};