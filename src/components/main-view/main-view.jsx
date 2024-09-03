import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

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

    const onLoggedIn = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStroage.setItem("token", token);
    }

    const updatedUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    if (!user) {
        return (
            <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={onLoggedOut} />
                <Row className="justify-content-md-center mt=5">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                            <Col md={12} className="text-center my-3">
                                                <span>
                                                    <Link to="/login">Return to Login</Link>
                                                </span>
                                            </Col>
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView
                                                onLoggedIn={onLoggedIn}
                                            />
                                            <Col md={12} className="text-center my-3">
                                                <span>
                                                    <Link to="/signup">Click HERE to Sign up</Link>
                                                </span>
                                            </Col>
                                        </Col>
                                    )}                                
                                </>
                            }
                        />
                        <Route
                            path="/users/:Username"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <Col md={5}>
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                updatedUser={updatedUser}
                                                onLoggedOut={onLoggedOut}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView movies={movies} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>This list is empty!</Col>
                                    ) : (
                                        <>
                                            {movies.map((movie) => (
                                                <Col className="mb-4" key={movie.id} md={3}>
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                                {/* {!user ? (
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
                                )} */}
                                {/* <Button
                                    className="logout-button"
                                    onClick={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}
                                    >Logout
                                </Button> */}
                    </Routes>
                </Row>
            </BrowserRouter>
        );
}};
