import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    const handleAddFavorite = (movieId) => {
        console.log("Adding movie to favorites from MainView:", movieId);
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => {
            console.log("FavoriteMovies updated (MainView):", data.FavoriteMovies);
        })
        .catch(error => console.error("Error adding favorite (MainView):", error));
      };
      
      const handleRemoveFavorite = (movieId) => {
        console.log("Removing movie from favorites from MainView:", movieId);
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log("FavoriteMovies updated after removal (MainView):", data.FavoriteMovies);
        })
        .catch(error => console.error("Error removing favorite (MainView):", error));
      };
      

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://cinema-express-948d60ca8d20.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((moviesApi) => {
            setMovies(moviesApi);
        });
    }, [token]);

        return (
            <BrowserRouter>
                <NavigationBar 
                    user={user}
                    token={token} 
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }} 
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
                                                <LoginView onLoggedIn={(user, token) => {
                                                    setUser(user);
                                                    setToken(token);
                                                    localStorage.setItem("user", JSON.stringify(user));
                                                    localStorage.setItem("token", token);
                                                }}/>
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
                                            <Col md={8}>
                                                <ProfileView
                                                    user={user}
                                                    token={token}
                                                    movies={movies}
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
                                                    <Col className="mb-4" key={movie._id} md={3}>
                                                        <MovieCard
                                                        movie={movie}
                                                        isFavorite={false}
                                                        handleAddFavorite={handleAddFavorite}
                                                        handleRemoveFavorite={handleRemoveFavorite}
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
