import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__content-container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__divider"></div>
        <h3 className="techs__count">7 технологий</h3>
        <p className="techs__about">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
          применили в дипломном проекте.
        </p>
        <ul className="techs__items-container">
          <div className="techs__private-box">
            <li className="techs__item">HTML</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">CSS</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">JS</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">React</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">Git</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">Express.js</li>
          </div>
          <div className="techs__private-box">
            <li className="techs__item">mongoDB</li>
          </div>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
