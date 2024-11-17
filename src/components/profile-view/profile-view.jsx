import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({ movies, user, token, onLoggedOut }) => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && token) {
            fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setUsername(data.Username);
                setEmail(data.Email);
                setBirthday(data.Birthday);
                setFavoriteMovies(data.FavoriteMovies || []);
            })
            .catch((error) => console.error("Error fetching user data", error));
        }
    }, [user, token]);

        const handleUpdate = (event) => {
            event.preventDefault();

            fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                }),
            })
            .then((response) => {
                if(response.ok) {
                    alert("Profile updated successfully!");
                } else {
                    alert("Failed to update profile");
                }
            })
            .catch((error) => console.error("Error updating profile!", error));
        };

        const handleDelete = () => {
            fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`, {
                method:"DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.ok) {
                    onLoggedOut();
                    navigate("/");
                } else {
                    alert("Failed to delete profile!");
                }
            })
            .catch((error) => console.error("Error deleting profile:", error));
        };

        const handleAddFavorite = (movieId) => {
            fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setFavoriteMovies(data.FavoriteMovies);
            })
            .catch((error) => console.error("Error adding movie to favorites", error));
        };

        const handleRemoveFavorite = (movieId) => {
            fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.json())
            .then((data) => {
                setFavoriteMovies(data.FavoriteMovies);
            })
            .catch((error) => console.error("Error removing movie from favorites", error));
        };

        if(!userData) return <div>Loading profile...</div>;

        return (
            <div className="profile-view">
                <h2>Account Information</h2>
                <p>Username: {userData.Username}</p>
                <p>Email: {userData.Email}</p>
                <p>Birthday: {userData.Birthday}</p>

                <h2>Update Account Information</h2>

            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="updateUsername">
                    <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                </Form.Group>

                <Form.Group controlId="updatePassword">
                    <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </Form.Group>

                <Form.Group controlId="updateEmail">
                    <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                </Form.Group>

                <Form.Group controlId="updateBirthday">
                    <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                </Form.Group>

                <Button type="submit">Update Profile</Button>
            </Form>
            
            <Button variant="danger" onClick={handleDelete}>
                Deactivate Account
            </Button>

            <h3>Favorite Movies</h3>
            {favoriteMovies.length === 0 ? (
                <p>No favorite movies yet! :/ </p>
            ) : (
                <ul>
                {favoriteMovies.map((movie) => (
                    <li key={movie._id}>
                        <MovieView
                            movie={movie}
                            onAddFavorite={() => handleAddFavorite(movie._id)}
                            onRemoveFavorite={() => handleRemoveFavorite(movie._id)}
                        />
                    </li>
                ))}
                </ul>
            )}
            </div>
    );
};