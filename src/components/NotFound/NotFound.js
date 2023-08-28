import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-2, {replace: true});
  }
  return (
    <main className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__txt">Страница не найдена</p>
      <button
        className="not-found__back-btn"
        onClick={goBack}
        type="button"
        aria-label="Вернуться"
      >
        Назад
      </button>
    </main>
  );
}

export default NotFound;
