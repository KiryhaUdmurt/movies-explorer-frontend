import "./MoreBtn.css";

function MoreBtn({ loadMore, cards, elementNum }) {
  return (
    <>
      {elementNum > cards.length ? null : (
        <button
          className="more-btn"
          type="button"
          aria-label="Больше карточек"
          onClick={loadMore}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default MoreBtn;
