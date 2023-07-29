import "./MoreBtn.css";

function MoreBtn({ searchResult }) {
  return (
    <>
      {searchResult && (
        <button className="more-btn" type="button" aria-label="Больше карточек">
          Ещё
        </button>
      )}
    </>
  );
}

export default MoreBtn;
