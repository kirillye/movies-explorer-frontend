import "./NotFoundError.css";

function NotFoundError({ isFirstLoad }) {
  return (
    <section className="container">
      {!isFirstLoad && (
        <h1 className="title-not-found">Ничего не найдено...</h1>
      )}
    </section>
  );
}

export default NotFoundError;
