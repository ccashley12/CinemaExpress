import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [filter, setFilter] = useState("");

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
          // If you want, you can store this updated favorite list in state
          // but since this is MainView, you might just log it or handle it differently
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
      
      const handleFilterChange = (e) => {
        setFilter(e.target.value);
      };

      const filteredMovies = movies.filter((movie) =>
      movie?.title?.toLowerCase().includes(filter.toLowerCase())
      );

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
                                        <Form className="filter-form md-4">
                                            <Form.Group controlId="filter">
                                                <Form.Label className="form-label-dark"></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>
                                                        <i className="bi bi-search"></i>{" "}
                                                    </InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Start typing to find movie..."
                                                    value={filter}
                                                    onChange={handleFilterChange}
                                                    className="form-control-dark"
                                                />
                                                </InputGroup>
                                            </Form.Group>
                                            </Form>
                                            <Row>
                                                {filteredMovies.map((movie) => (
                                                    <Col
                                                        className="md-5"
                                                        key={movie._id}
                                                        xs={12}
                                                        sm={6}
                                                        md={4}
                                                        lg={3}
                                                    >
                                                        <MovieView movie={movie}/>
                                                    </Col>
                                                ))}
                                            </Row>
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
                                                            isFavorite={false} // or determine based on user's favorites if you have that info
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
