import "./Login.css";
import Logo from "../Logo/Logo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    reset();
  };
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
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
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
