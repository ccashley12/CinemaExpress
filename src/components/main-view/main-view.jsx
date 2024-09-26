import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if(!token) {
            return;
        }

        fetch("https://cinema-express-948d60ca8d20.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesApi = data.map((movie) => {
                return {
                    id: movie._id,
                    title: movie.Title,
                    description: movie.Description,
                    image: movie.ImagePath,
                    genre: movie.Genre.Name,
                    director: movie.Director.Name
                };
            });
            setMovies(moviesApi);
        }).catch((e) => {
            console.log(e);
        });
    }, [token]);

    const onLoggedIn = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }
    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }
    const updatedUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

        return (
            <BrowserRouter>
                <NavigationBar 
                    user={user} 
                    onLoggedOut={onLoggedOut} 
                />
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
                                                <MovieView 
                                                    movies={movies}
                                                    user={user}
                                                    token={token}
                                                    setUser={setUser}
                                                />
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
                                                        <MovieCard 
                                                            movie={movie}
                                                        />
                                                    </Col>
                                                ))}
                                            </>
                                        )}
                                    </>
                                }
                            />
                        </Routes>
                    </Row>
            </BrowserRouter>
        );
};
