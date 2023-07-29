import promologo from "../../images/text__COLOR_landing-logo.png";
import NavTab from "../NavTab/NavTab";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <img className="promo__logo" src={promologo} alt="promo logo" />
        </div>
        <p className="promo__instruction">
          Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
          создателя.
        </p>
        <NavTab />
      </div>
    </section>
  );
}

export default Promo;
