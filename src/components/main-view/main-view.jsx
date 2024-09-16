import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Link } from "react-router-dom";
import axios from "axios";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [users,setUsers] = useState([]);
    const [favoriteMovies,setFavoriteMovies] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(storedUser);
    const [token, setToken] = useState(storedToken);

    const handleFavoriteToggle = async (movieId, isFavorite) => {
        const storedToken = localStorage.getItem("token");
        const username = user.username;

        try {
            const headers = {
                Authorization: `Bearer ${storedToken}`,
            };

            if (isFavorite) {
                await axios.post(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${username}/movies/${movieId}`,
                {},
                { headers }
            );

            const user = JSON.parse(localStorage.getItem('user'));
            user.favorite_movies.push(movieId);
            localStorage.setItem('user', JSON.stringify(user));
            setFavoriteMovies([...user.favorite_movies]);

            } else {
                await axios.delete(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${username}/movies/${movieId}`,
                { headers}
                );

                const user = JSON.parse(localStorage.getItem('user'));
                const favorites = user.favorite_movies.filter((id) => id !== movieId);
                user.favorite_movies = [...favorites];
                localStorage.setItem("user", JSON.stringify(user));
                setFavoriteMovies([...favorites]);
            }
        } catch (error) {
            console.error("Error updating favorite movies:", error);
        }
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
            }).catch((error) => {
                console.error("Error loading movies:", error);
                setError(error.message);
            });
        
        fetch ("https://cinema-express-948d60ca8d20.herokuapp.com/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const usersFromApi = data.map((user) => ({
                    userId: user._id,
                    name: user.name,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    birthday: user.birthday,
                    favoriteMovies: user.favorite_movies || [],
                }));
                setUsers(usersFromApi);
            })
            .catch((error) => {
                console.error("Error loading users:", error);
                setError(error.message);
            });
    }, [token]);

    if(error) {
        return <div>Error: {error}</div>;
    }

    // const onLoggedIn = (user, token) => {
    //     setUser(user);
    //     setToken(token);
    //     localStorage.setItem("user", JSON.stringify(user));
    //     localStroage.setItem("token", token);
    // }

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    useEffect(() => {
        if (user) {
            setFavoriteMovies(users.favorite_movies);
        }
    }, [user]);
    console.log(movies);

    // const updatedUser = user => {
    //     setUser(user);
    //     localStorage.setItem("user", JSON.stringify(user));
    // }

    // if (!user) {
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
                                                    onLoggedIn={(user, token) => {
                                                        setUser(user);
                                                        setToken(token);
                                                    }}
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
                                path="/users/:userId"
                                element={
                                    <>
                                        {!user ? (
                                            <Navigate to="/login" replace />
                                        ) : (
                                            <Col md={5}>
                                                <ProfileView
                                                    users={users}
                                                    favoriteMovies={favoriteMovies}
                                                    handleFavoriteToggle={handleFavoriteToggle}
                                                    setFavoriteMovies = {setFavoriteMovies}
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
                                                <Row className="justify-content-md-center mt-5">
                                                    <Col is={8} className="text-center">
                                                        <h1>Movies</h1>
                                                    </Col>
                                                </Row>

                                                {movies.map((movie) => (
                                                    <Col className="mb-4" key={movie.id} md={3}>
                                                        <MovieCard 
                                                            movie={movie}
                                                            isFavorite={favoriteMovies.includes(String(movie.id))}
                                                            onFavoriteToggle={handleFavoriteToggle}
                                                            username={user.username}
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
