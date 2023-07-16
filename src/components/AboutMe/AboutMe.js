import "./AboutMe.css";
import profilepic from "../../images/IMG_20220709_124504.jpg";

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__divider"></div>
      <div className="aboutme__info-container">
        <div className="aboutme__text-container">
          <p className="aboutme__name">Кирилл</p>
          <p className="aboutme__in-short">Фронтенд-разработчик, 23 года</p>
          <p className="aboutme__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="aboutme__github" href="https://github.com/KiryhaUdmurt">
            Github
          </a>
        </div>
        <img className="aboutme__avatar" src={profilepic} alt="Фото студента" />
      </div>
      <p className="aboutme__portfolio">Портфолио</p>
      <div className="aboutme__link-container">
        <a href="" className="aboutme__link">
          Статичный сайт
        </a>
        <p className="aboutme__link-symbol">↗</p>
      </div>
      <div className="aboutme__link-container">
        <a href="" className="aboutme__link">
          Адаптивный сайт
        </a>
        <p className="aboutme__link-symbol">↗</p>
      </div>
      <div className="aboutme__link-container">
        <a href="" className="aboutme__link">
          Одностраничное приложение
        </a>
        <p className="aboutme__link-symbol">↗</p>
      </div>
    </section>
  );
}

export default AboutMe;
