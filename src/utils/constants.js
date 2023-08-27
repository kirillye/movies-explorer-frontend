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

export { MOVIES_URL, MAIN_URL, DURATION, DEVICE_SIZE_WINDOWS, validateEmail };
