import "./AboutProject.css"

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__divider"></div>
      <div className="about-project__text-container">
        <p className="about-project__text about-project__text_size_m">Дипломный проект включал 5 этапов</p>
        <p className="about-project__text about-project__text_size_m">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="about-project__text about-project__text_size_s">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и&nbsp;финальные доработки.
        </p>
        <p className="about-project__text about-project__text_size_s">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__timeline-container">
        <p className="about-project__timeline about-project__timeline_size_m">1 неделя</p>
        <p className="about-project__timeline about-project__timeline_size_m">4 недели</p>
        <p className="about-project__timeline about-project__timeline_size_s">Back-end</p>
        <p className="about-project__timeline about-project__timeline_size_s">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
