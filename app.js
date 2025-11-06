// ========== GLOBAL STATE ==========
let allMovies = [];

// ========== APP INITIALIZATION ==========
window.addEventListener("load", initApp);

function initApp() {
  console.log("initApp: app.js is running 🎉");
  getMovies();

  // Event listeners for filtrering og sortering
  document.querySelector("#search-input").addEventListener("input", filterMovies);
  document.querySelector("#genre-select").addEventListener("change", filterMovies);
  document.querySelector("#sort-select").addEventListener("change", filterMovies);
  document.querySelector("#year-from").addEventListener("input", filterMovies);
  document.querySelector("#year-to").addEventListener("input", filterMovies);
  document.querySelector("#rating-from").addEventListener("input", filterMovies);
  document.querySelector("#rating-to").addEventListener("input", filterMovies);
  //rydder alle filtre 
  document.querySelector("#clear-filters").addEventListener("click", clearAllFilters);
}

// ========== DATA FETCHING ==========

async function getMovies() {
  console.log("🌐 Henter alle movies fra JSON...");

  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
  );
  allMovies = await response.json();

  console.log(`📊 JSON data modtaget: ${allMovies.length} movies`);

  populateGenreDropdown();
  displayMovies(allMovies);
}

// ========== GENRE DROPDOWN ==========

function populateGenreDropdown() {
  const genreSelect = document.querySelector("#genre-select");
  const genres = new Set();

  // Saml alle unikke genrer
  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
    }
  }

  // Fjern gamle options undtagen 'Alle genrer'
  genreSelect.innerHTML = '<option value="all">Alle genrer</option>';

  // Sorter og tilføj genres
  const sortedGenres = Array.from(genres).sort();
  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre}</option>`
    );
  }
}

// ========== FILTERING & SORTING ==========

function filterMovies() {
  const searchValue = document
    .querySelector("#search-input")
    .value.toLowerCase();
  const genreValue = document.querySelector("#genre-select").value;
  const sortValue = document.querySelector("#sort-select").value;
  const yearFrom = Number(document.querySelector("#year-from").value) || 0;
  const yearTo = Number(document.querySelector("#year-to").value) || 9999;

  // NYE rating variable - TILFØJ EFTER år variablerne
  const ratingFrom = Number(document.querySelector("#rating-from").value) || 0;
  const ratingTo = Number(document.querySelector("#rating-to").value) || 10;

  console.log("Rating filter:", ratingFrom, "til", ratingTo);

  // Start med alle movies
  let filteredMovies = allMovies;

  // FILTER 1: Tekstsøgning
  if (searchValue) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchValue);
    });
  }

  // FILTER 2: Genre filtrering
  if (genreValue !== "all") {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genre.includes(genreValue);
    });
  }

  // Tilføj EFTER genre filter, FØR sortering

  // År range filter - TILFØJ DENNE SEKTION
  if (yearFrom > 0 || yearTo < 9999) {
    console.log("Anvender år filter:", yearFrom, "-", yearTo);
    const before = filteredMovies.length;

    filteredMovies = filteredMovies.filter((movie) => {
      return movie.year >= yearFrom && movie.year <= yearTo;
    });

    console.log("År filter:", before, "→", filteredMovies.length, "film");
  } else {
    console.log("Ingen år filter (alle år)");
  }

  // Rating range filter - TILFØJ EFTER år filter
  if (ratingFrom > 0 || ratingTo < 10) {
    console.log("Anvender rating filter:", ratingFrom, "-", ratingTo);
    const before = filteredMovies.length;

    filteredMovies = filteredMovies.filter((movie) => {
      return movie.rating >= ratingFrom && movie.rating <= ratingTo;
    });

    console.log("Rating filter:", before, "→", filteredMovies.length, "film");
  } else {
    console.log("Ingen rating filter (alle ratings)");
  }
  // SORTERING
  if (sortValue === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "year") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortValue === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  }

  displayMovies(filteredMovies);
}

// ========== DISPLAY FUNCTIONS ==========

function displayMovies(movies) {
  console.log(`🎬 Viser ${movies.length} movies`);
  document.querySelector("#movie-list").innerHTML = "";

  for (const movie of movies) {
    displayMovie(movie);
  }
}

function displayMovie(movie) {
  const movieList = document.querySelector("#movie-list");

  const movieHTML = `
    <article class="movie-card">
      <img src="${movie.image}" 
           alt="Poster of ${movie.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movie.title} <span class="movie-year">(${movie.year})</span></h3>
        <p class="movie-genre">${movie.genre.join(", ")}</p>
        <p class="movie-rating">⭐ ${movie.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movie.director}</p>
      </div>
    </article>
  `;

  movieList.insertAdjacentHTML("beforeend", movieHTML);

  // Tilføj click event (bonus feature)
  const newCard = movieList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`🎬 Klik på: "${movie.title}"`);
    showMovieModal(movie);
  });
}

// ========== MOVIE DETAILS (BONUS) ==========
// #7: Vis movie details (Session 3 version)

// #7: Vis movie details (Session 3 version)
function showMovieDetails(movie) {
  alert(`
🎬 ${movie.title} (${movie.year})

🎭 Genre: ${movie.genre.join(", ")}
⭐ Rating: ${movie.rating}
🎥 Director: ${movie.director}

📝 ${movie.description}
  `);
}

// Ny funktion: Ryd alle filtre - TILFØJ DENNE
function clearAllFilters() {
  console.log("🗑️ Rydder alle filtre");

  // Ryd søgning og dropdown felter
  document.querySelector("#search-input").value = "";
  document.querySelector("#genre-select").value = "all";
  document.querySelector("#sort-select").value = "none";

  // Ryd de nye range felter
  document.querySelector("#year-from").value = "";
  document.querySelector("#year-to").value = "";
  document.querySelector("#rating-from").value = "";
  document.querySelector("#rating-to").value = "";

  // Kør filtrering igen (viser alle film)
  filterMovies();
}

// #8: Vis movie i modal dialog
function showMovieModal(movie) {
  console.log("🎭 Åbner modal for:", movie.title);

  // Byg HTML struktur dynamisk
  const dialogContent = document.querySelector("#dialog-content");
  dialogContent.innerHTML = `
    <img src="${movie.image}" alt="Poster af ${movie.title}" class="movie-poster">
    <div class="dialog-details">
      <h2>${movie.title} <span class="movie-year">(${movie.year})</span></h2>
      <p class="movie-genre">${movie.genre.join(", ")}</p>
      <p class="movie-rating">⭐ ${movie.rating}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
      <p class="movie-description">${movie.description}</p>
    </div>
  `;

  // Åbn modalen
  document.querySelector("#movie-dialog").showModal();
}