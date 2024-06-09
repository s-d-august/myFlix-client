import { useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { "_id": { "$oid": "6648fe6af50042a06dcdce04" }, "Title": "Goncharov", "Description": "After the dissolution of the Soviet Union, Russian hitman Lo Straniero -- also known as Goncharov -- becomes entangled with the Naples mafia.", "Director": { "Name": "Martin Scorsese", "Bio": "Martin Scorsese is an American filmmaker. He emerged as one of the major figures of the New Hollywood era.", "Birth": "1962", "Death": null }, "Genre": { "Name": "Thriller", "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspence in the audience." }, "ImagePath": "https://cdna.artstation.com/p/assets/images/images/060/707/560/large/coyote-studio-img-3094.jpg?1679145129", "Featured": true },
    { "_id": { "$oid": "6648f167f50042a06dcdcdf8" }, "Title": "Princess Mononoke", "Description": "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forect gods and Tatara, a mining colony.", "Director": { "Name": "Hayao Miyazaki", "Bio": "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.", "Birth": "1941", "Death": null }, "Genre": { "Name": "Animation", "Description": "Animation is a method in which pictures are manipulated to appear as moving images." }, "ImagePath": "https://i.etsystatic.com/26442830/r/il/ad2289/3083247077/il_fullxfull.3083247077_6ymt.jpg", "Featured": true },
    { "_id": { "$oid": "6648f21ef50042a06dcdcdf9" }, "Title": "Spirited Away", "Description": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.", "Director": { "Name": "Hayao Miyazaki", "Bio": "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.", "Birth": "1941", "Death": null }, "Genre": { "Name": "Animation", "Description": "Animation is a method in which pictures are manipulated to appear as moving images." }, "ImagePath": "https://i.etsystatic.com/26442830/r/il/ecd133/3035509656/il_fullxfull.3035509656_n6mh.jpg", "Featured": false },
    { "_id": { "$oid": "6648f349f50042a06dcdcdfa" }, "Title": "The Thing", "Description": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.", "Director": { "Name": "John Carpenter", "Bio": "John Howard Carpenter is an American filmmaker, composer, and actor.", "Birth": "1948", "Death": null }, "Genre": { "Name": "Horror", "Description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes." }, "ImagePath": "https://image.tmdb.org/t/p/original/tzGY49kseSE9QAKk47uuDGwnSCu.jpg", "Featured": true }
  ])


const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
  return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  )
}

if (movies.length === 0) {
  return <div>The list is empty!</div>
}

return (
  <div>
    {movies.map((movie) => (
      <MovieCard
        key={movie._id.$oid}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie)
        }}
      />
    ))}
  </div>
)}