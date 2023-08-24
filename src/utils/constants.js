const MAIN_URL = "https://api.movies-kirill.nomoreparties.co";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";
const DURATION = 40;

const DEVICE_SIZE_WINDOWS = {
  desctop: {
    INITIAL_CARD_COUNT: 16,
    ROW_CARD_COUNT: 4,
  },
  laptop: {
    INITIAL_CARD_COUNT: 8,
    ROW_CARD_COUNT: 2,
  },
  mobile: {
    INITIAL_CARD_COUNT: 5,
    ROW_CARD_COUNT: 2,
  },
};

export { MOVIES_URL, MAIN_URL, DURATION, DEVICE_SIZE_WINDOWS };
