import "./Register.css";
import Logo from "../Logo/Logo";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { EMAIL_REGEXP } from "../../utils/constants";

function Register({ registerUser, isLoggedIn, reqError, setReqError }) {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
    reset();
    setReqError("")
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies", { replace: true });
    }
  });

  return (
    <main className="signup">
      <div className="signup__flexbox">
        <Logo className={`signup__logo`} />
        <p className="signup__greeting">Добро пожаловать!</p>
        <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="signup__label">
            Имя
            <input
              className={`signup__input ${
                errors?.name ? "signup__input_error" : ""
              }`}
              type="text"
              placeholder="Введите ваше имя"
              {...register("name", {
                required: "Обязательное поле",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
            />
          </label>
          <div className="signup__error-container">
            {errors?.name && (
              <span className="signup__error">
                {errors?.name?.message || "Что-то пошло не так.."}
              </span>
            )}
          </div>
          <label className="signup__label">
            E-mail
            <input
              className={`signup__input ${
                errors?.email ? "signup__input_error" : ""
              }`}
              type="email"
              placeholder="Введите вашу почту"
              {...register("email", {
                required: "Обязательное поле",
                pattern: {
                  value: EMAIL_REGEXP,
                  message: "Введите корректный e-mail",
                },
              })}
            />
          </label>
          <div className="signup__error-container">
            {errors?.email && (
              <span className="signup__error">
                {errors?.email?.message || "Что-то пошло не так.."}
              </span>
            )}
          </div>
          <label className="signup__label">
            Пароль
            <input
              className={`signup__input ${
                errors?.password ? "signup__input_error" : ""
              }`}
              type="password"
              placeholder="Придумайте пароль"
              {...register("password", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символа",
                },
              })}
            />
          </label>
          <div className="signup__error-container">
            {errors?.password && (
              <span className="signup__error">
                {errors?.password?.message || "Что-то пошло не так.."}
              </span>
            )}
          </div>
          <div className="signup__req-error-container">
            <p className="signup__req-error">{reqError}</p>
          </div>
          <button
            className={`signup__submit ${
              !isValid ? "signup__submit_disabled" : ""
            }`}
            type="submit"
            aria-label="Зарегистрироваться"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="signup__txt">Уже зарегистрированы?</p>
        <Link className="signup__login-btn" to="/signin">
          Войти
        </Link>
      </div>
    </main>
  );
}

export default Register;
