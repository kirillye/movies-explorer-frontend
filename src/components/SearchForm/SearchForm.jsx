import "./SearchForm.css";
// import prfileImage from "../../images/find.png";

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="search">
      <div className="container-padding-small search__body">
        <form action="search__form" onSubmit={handleSubmit}>
          <div className="search__line-input">
            <input
              type="text"
              placeholder="Фильм"
              className="search__input"
              required
            />
            <button type="submit" className="search__btn"></button>
          </div>
          <div className="search__line-switch">
            <div className="search__box">
              <input type="checkbox" id="switch" className="search__switch" />
              <label htmlFor="switch" className="search__switch-label"></label>
              <label htmlFor="switch" className="search__switch-info">
                Короткометражки
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
