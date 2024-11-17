import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, AddFavorite, RemoveFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
            </div>
            <br></br>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <br></br>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <br></br>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <br></br>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <br></br>
            <Button variant="primary" onClick={AddFavorite}>
                    Add to Favorites
            </Button>

            <Button variant="danger" onClick={RemoveFavorite}>
                    Remove from Favorites
            </Button>

            <Link to={'/'}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};