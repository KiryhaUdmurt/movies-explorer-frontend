import "./Login.css";
import Logo from "../Logo/Logo";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { EMAIL_REGEXP } from "../../utils/constants";

function Login({ authorizeUser, isLoggedIn, reqError, setReqError }) {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    authorizeUser(data);
    reset();
    setReqError("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies", { replace: true });
    }
  });

  return (
    <main className="signin">
      <div className="signin__flexbox">
        <Logo className={`signin__logo`} />
        <p className="signin__greeting">Рады видеть!</p>
        <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="signin__label">
            E-mail
            <input
              className={`signin__input ${
                errors?.email ? "signin__input_error" : ""
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
          <div className="signin__error-container">
            {errors?.email && (
              <span className="signin__error">
                {errors?.email?.message || "Что-то пошло не так.."}
              </span>
            )}
          </div>
          <label className="signin__label">
            Пароль
            <input
              className={`signin__input ${
                errors?.password ? "signin__input_error" : ""
              }`}
              placeholder="Введите пароль"
              type="password"
              {...register("password", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символа",
                },
              })}
            />
          </label>
          <div className="signin__error-container">
            {errors?.password && (
              <span className="signin__error">
                {errors?.password?.message || "Что-то пошло не так.."}
              </span>
            )}
          </div>
          <div className="signin__req-error-container">
            <p className="signin__req-error">{reqError}</p>
          </div>
          <button
            className={`signin__submit ${
              !isValid ? "signin__submit_disabled" : ""
            }`}
            type="submit"
            aria-label="Войти"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className="signin__txt">Ещё не зарегистрированы?</p>
        <Link className="signin__register-btn" to="/signup">
          Регистрация
        </Link>
      </div>
    </main>
  );
}

export default Login;
