const MAIN_URL = "https://api.movies-kirill.nomoreparties.co/";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";
const validateEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const DURATION = 40;

const DEVICE_SIZE_WINDOWS = {
  desctop: {
    WIDTH: 1100,
    INITIAL_CARD_COUNT: 16,
    ROW_CARD_COUNT: 4,
  },
  laptop: {
    WIDTH: 1099,
    INITIAL_CARD_COUNT: 8,
    ROW_CARD_COUNT: 2,
  },
  mobile: {
    WIDTH: 460,
    INITIAL_CARD_COUNT: 5,
    ROW_CARD_COUNT: 2,
  },
};

//фильтр по запросу
function filterForMovies(movies, query = "") {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const Movies = query.toLowerCase().trim();
    return movieRu.indexOf(Movies) !== -1 || movieEn.indexOf(Movies) !== -1;
  });
  return moviesByUserQuery;
}

// фильтрация по времени
function filterByDuration(listMovies) {
  return listMovies.filter((item) => item.duration < 40);
}

export {
  MOVIES_URL,
  MAIN_URL,
  DURATION,
  DEVICE_SIZE_WINDOWS,
  validateEmail,
  filterForMovies,
  filterByDuration,
};
