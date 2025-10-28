"use strict";
// ========== MOVIE OBJECTS ==========

// Movie 1: Barbie JSON struktur
const barbieMovie = {
  id: 1,
  title: "Barbie",
  year: 2023,
  genre: ["Adventure", "Comedy", "Fantasy"],
  rating: 7.0,
  director: "Greta Gerwig",
  image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  actors: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
  description:
    "Barbie and Ken embark on a journey of self-discovery after leaving the utopian Barbie Land for the real world."
};


console.log("Barbie movie object:", barbieMovie);

// Movie 2: Dune
const duneMovie = {
  id: 2,
  title: "Dune",
  year: 2021,
  genre: ["Adventure", "Drama", "Sci-Fi"],
  rating: 8.0,
  director: "Denis Villeneuve",
  image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
  actors: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
  description:
    "Paul Atreides leads nomadic tribes in a battle to control the desert planet Arrakis and its valuable spice."
};

console.log("Dune movie object:", duneMovie);

// Movie 3: Dune: Part Two
const duneTwoMovie = {
  id: 3,
  title: "Dune: Part Two",
  year: 2024,
  genre: ["Action", "Adventure", "Drama"],
  rating: 8.7,
  director: "Denis Villeneuve",
  image:
    "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
  actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
  description:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
};

console.log("Dune: Part Two movie object:", duneTwoMovie);

// Movie 4: Everhthing Everywhere All At Once
const EverythingEverywhereAllAtOnce = {
  id: 4,
  title: "Everything Everywhere All At Once",
  year: 2022,
  genre: ["Action, Adventure, Comedy"],
  rating: 8.7,
  director: "Daniel Kwan, Daniel Scheinert",
  image: "https://m.media-amazon.com/images/M/MV5BOWNmMzAzZmQtNDQ1NC00Nzk5LTkyMmUtNGI2N2NkOWM4MzEyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  actors: ["Micehlle Yeoh", "Ke Huy Qaun", "Stephanie Hsu"],
};

console.log("EverythingEverywhereAllAtOnce:", EverythingEverywhereAllAtOnce);

// Movie 5: Fight Club
const FightClub = {
  id: 5,
  title: "Fight Club",
  year: 1999,
  genre: ["Action, Krimi"],
  rating: 8.8,
  director: "David Fincher",
  image: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
  actors: ["Edward Norton", "Brad Pitt", "Helena Bonhom Carter"],
};

console.log("FightClub:", FightClub);



// Movie 6: Forrest Gump
const forrestGumpMovie = {
  id: 6,
  title: "Poser of forrest gump",
  year: 1994,
  genre: ["Romance, Drama"],
  rating: 8.8,
  director: "Robert Zemeckis",
  image:
"https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
  actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
  };
 
console.log("Poster of forrest gump movie object:", forrestGumpMovie);
 
 
// Movie 7: Poster of Godfellas
const Godfellas = {
  id: 7,
  title: "Poster of Godfellas",
  year: 1990,
  genre: ["biography, crime, Drama"],
  rating: 8.8,
  director: "Martin Scorsese",
  image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
  actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
};
 
console.log("Godfellas movie object:", Godfellas);

// Movie 8: Inception
const Inception = {
  id: 8,
  title: "Inception",
  year: 2010,
  genre: ["Action", "Adventure", "sci-fi"],
  rating: 8.8,
  director: "Christopher Nolan",
  image:
    "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
  actors: ["leonardo decaprio", "Zendaya", "Rebecca Ferguson"],
  description:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
};
 
console.log("Inception object:", Inception);




// ========== DOM REFERENCE ==========
const movieListContainer = document.querySelector("#movie-list");

// ========== DISPLAY SINGLE MOVIE ==========
function displayMovie(movieObject) {
  const genreString = movieObject.genre.join(", ");

  const movieHTML = `
    <article class="movie-card">
      <img src="${movieObject.image}" 
           alt="Poster of ${movieObject.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movieObject.title} <span class="movie-year">(${movieObject.year})</span></h3>
        <p class="movie-genre">${genreString}</p>
        <p class="movie-rating">⭐ ${movieObject.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movieObject.director}</p>
      </div>
    </article>
  `;

  movieListContainer.insertAdjacentHTML("beforeend", movieHTML);
}

// ========== DISPLAY ALL MOVIES ==========
function displayMovies(movieArray) {
  movieListContainer.innerHTML = "";

  for (const movie of movieArray) {
    displayMovie(movie);
  }

  console.log(`🎉 ${movieArray.length} movies vist!`);
}

// ========== LOAD MOVIES FROM JSON ==========
async function loadMovies() {
  console.log("🌐 Henter movies fra JSON...");

  const response = await fetch("https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json");
  const moviesFromJSON = await response.json();

  console.log("📊 Data modtaget:", moviesFromJSON.length, "movies");

  displayMovies(moviesFromJSON);
}

// ===== APP INITIALISERING =====
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadMovies();
}

