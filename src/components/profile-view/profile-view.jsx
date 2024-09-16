import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "./profile-info";
import DeleteAccountButton from "./delete-account";
import FavoriteMovies from "./favorite-movies";
import ProfileUpdate from"./profile-update";
import { Card, Col, Container, Row } from "react-bootstrap";

export const ProfileView = ({users = [], favoriteMovies, handleFavoriteToggle, setFavoriteMovies}) => {
    const { userId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    //Find User by userId
    const user = users.find((u) => u.userId === userId);

    useEffect(() => {
        if (user) {
            setFavoriteMovies(user.favoriteMovies);
        }
    }, [user]);

    useEffect(() => {
        if(!token) return;

        fetch("https://cinema-express-948d60ca8d20.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                    id: movie._id,
                    title: movie.Title,
                    description: movie.Description,
                    genre: movie.Genre.Name,
                    image: movie.ImagePath,
                    director: movie.Director.Name,
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error loading movies:", error);
                setError(error.message);
            });
    }, [token]);

    const favoriteMovieList = movies.filter (
        (m) = favoriteMovies.includes(String(m.id))
    );

    console.log(favoriteMovieList);

    //Start editUser w/ user data when going into edit user
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedUser({ ...user });
    };

    //Handle input changes
    const handleChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    //Handle saving
    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) {
                throw new Error(`Failed to update user information: ${response.statusText}`);
            }

            //Update user locally after success repsonse
            Oject.assign(user, editedUser);

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const onLoggedOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    if (!user) {
        return<div>User not found</div>;
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <Card>
                            <Card.Header>
                                <ProfileInfo name={user.name} email={user.email}/>
                            </Card.Header>
                        </Card>
                    </Col>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <ProfileUpdate
                                    user={user}
                                    handleChange={handleChange}
                                    handleSaveClick={handleSaveClick}
                                    handleEditClick={handleEditClick}
                                    isEditing={isEditing}
                                    editedUser={editedUser}
                                />
                            </Card.Body>
                            <Card.Footer>
                                <h3>Delete Account</h3>
                                <DeleteAccountButton
                                    username={user.username}
                                    token={token}
                                    onLoggedOut={onLoggedOut}
                                />
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <FavoriteMovies
                        user={user}
                        favoriteMovies={favoriteMovies}
                        handleFavoriteToggle={handleFavoriteToggle}
                        favoriteMovieList={favoriteMovieList}
                    />
                </Row>
            </Container>
        </>
    );
};