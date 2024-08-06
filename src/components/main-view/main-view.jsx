import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Forest Gump",
            description: "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran, who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone.",
            genre: "Drama",
            director: "Robert Zemeckis",
            image: "https://c7.alamy.com/comp/EJWNWN/forrest-gump-movie-poster-1994-EJWNWN.jpg"
        },
        {
            id: 2,
            title: "Pulp Fiction",
            description: "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
            genre: "Drama",
            director: "Quentin Tarantino",
            image: "https://c7.alamy.com/comp/EJWNYT/pulp-fiction-movie-poster-EJWNYT.jpg"
        },
        {
            id: 3,
            title: "American Psycho",
            description: "It's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.",
            genre: "Drama",
            director: "Marry Harron",
            image: "https://c7.alamy.com/comp/R59GMT/american-psycho-original-movie-poster-R59GMT.jpg"
        },
        {
            id: 4,
            title: "Donnie Darko",
            description: "Donnie Darko doesn't get along too well with his family, his teachers, and his classmates; but he does manage to find a sympathetic friend in Gretchen, who agrees to date him. He has a compassionate psychiatrist, who discovers hypnosis is the means to unlock hidden secrets. His other companion may not be a true ally. Donnie has a friend named Frank, a large bunny which only Donnie can see. When an engine falls off a plane and destroys his bedroom, Donnie is not there. Both the event, and Donnie's escape, seem to have been caused by supernatural events.",
            genre: "Drama",
            director: "Richard Kelly",
            image: "https://c7.alamy.com/comp/K36828/donnie-darko-date-2001-K36828.jpg"
        },
        {
            id: 5,
            title: "The Matrix",
            description: "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion.",
            genre: "Action",
            director: "Lilly Wachowski & Lana Wachowski",
            image: "https://c7.alamy.com/comp/K38PKY/the-matrix-date-1999-K38PKY.jpg"
        },
        {
            id: 6,
            title: "Kill Bill: Vol. 1",
            description: "The lead character, called 'The Bride,' was a member of the Deadly Viper Assassination Squad, led by her lover 'Bill.' Upon realizing she was pregnant with Bill's child, 'The Bride' decided to escape her life as a killer. She fled to Texas, met a young man, who, on the day of their wedding rehearsal was gunned down by an angry and jealous Bill (with the assistance of the Deadly Viper Assassination Squad). Four years later, 'The Bride' wakes from a coma, and discovers her baby is gone. She, then, decides to seek revenge upon the five people who destroyed her life and killed her baby. The saga of Kill Bill Volume I begins.",
            genre: "Thriller",
            director: "Quentin Tarantino",
            image: "https://c7.alamy.com/comp/E5MG8G/kill-bill-vol-1-us-poster-art-uma-thurman-2003-miramax-courtesy-everett-E5MG8G.jpg"
        },
        {
            id: 7,
            title: "Charlie's Angels",
            description: "The captivating crime-fighting trio who are the masters of disguise, espionage, and martial arts. When a devious mastermind embroils them in a plot to destroy individual privacy, the Angels, aided by their loyal sidekick Bosley (Bill Murray), set out to bring down the bad guys. But when a terrible secret is revealed, it makes the Angels targets for assassination.",
            genre: "Action",
            director: "McG",
            image: "https://c7.alamy.com/comp/E5N72F/charlies-angels-2000-ccolumbia-picturescourtesy-everett-collection-E5N72F.jpg"
        },
        {
            id: 8,
            title: "Parasite",
            description: "The Kims - mother and father Chung-sook and Ki-taek, and their young adult offspring, son Ki-woo and daughter Ki-jung - are a poor family living in a shabby and cramped half basement apartment in a busy lower working class commercial district of Seoul. Ki-woo is the one who has dreams of getting out of poverty by one day going to university. Despite not having that university education, Ki-woo is chosen by his university student friend Min, who is leaving to go to school, to take over his tutoring job to Park Da-hye, who Min plans to date once he returns to Seoul and she herself is in university. The Parks are a wealthy family who for four years have lived in their modernistic house designed by and the former residence of famed architect Namgoong. While Mr. and Mrs. Park are all about status, Mrs. Park has a flighty, simpleminded mentality and temperament, which Min tells Ki-woo to feel comfortable in lying to her about his education to get the job. In getting the job, Ki-woo further learns that Mrs. Park is looking for an art therapist for the Parks' adolescent son, Da-song, Ki-woo quickly recommending his professional art therapist friend Jessica, really Ki-jung who he knows can pull off the scam in being the easiest liar of the four Kims. In Ki-woo also falling for Da-hye, he begins to envision himself in that house, and thus the Kims as a collective start a plan for all the Kims, like Ki-jung using assumed names, to replace existing servants in the Parks' employ in orchestrating reasons for them to be fired.",
            genre: "Drama",
            director: "Bong Joon-Ho",
            image: "https://c7.alamy.com/comp/2AMJ06T/parasite-gisaengchung-2019-directed-by-bong-joon-ho-and-starring-kang-ho-song-sun-kyun-lee-and-yeo-jeong-jo-a-poor-family-ingratiates-itself-with-a-wealthy-family-leads-to-unexpected-results-in-this-clever-south-korean-thriller-2AMJ06T.jpg"
        },
        {
            id: 9,
            title: "Everything Everywhere All at Once",
            description: "With her laundromat teetering on the brink of failure and her marriage to wimpy husband Waymond on the rocks, overworked Evelyn Wang struggles to cope with everything, including tattered relationships with her judgmental father Gong Gong and her daughter Joy. She must also brace herself for an unpleasant meeting with an impersonal bureaucrat: Deirdre, the shabbily-dressed IRS auditor. However, as the stern agent loses patience, an inexplicable multiverse rift becomes an eye-opening exploration of parallel realities. Will Evelyn jump down the rabbit hole? How many stars are in the universe? Can weary Evelyn fathom the irrepressible force of possibilities, tap into newfound powers, and prevent an evil entity from destroying the thin, countless layers of the unseen world?",
            genre: "Action",
            director: "Daniel Kwwan & Danel Scheinert",
            image: "https://c7.alamy.com/comp/2J2NT2W/everything-everywhere-all-at-once-2022-directed-by-dan-kwan-and-daniel-scheinert-credit-agbo-ley-line-entertainment-album-2J2NT2W.jpg"
        },
        {
            id: 10,
            title: "Poor Things",
            description: "From filmmaker Yorgos Lanthimos and producer Emma Stone comes the incredible tale and fantastical evolution of Bella Baxter (Stone), a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter (Willem Dafoe). Under Baxter's protection, Bella is eager to learn. Hungry for the worldliness she is lacking, Bella runs off with Duncan Wedderburn (Mark Ruffalo), a slick and debauched lawyer, on a whirlwind adventure across the continents. Free from the prejudices of her times, Bella grows steadfast in her purpose to stand for equality and liberation.",
            genre: "Drama",
            director: "Yorgos Lanthimos",
            image: "https://c7.alamy.com/comp/2WKEAW7/poor-things-2023-directed-by-yorgos-lanthimos-credit-element-pictures-album-2WKEAW7.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() =>
                setSelectedMovie(null)}/>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};