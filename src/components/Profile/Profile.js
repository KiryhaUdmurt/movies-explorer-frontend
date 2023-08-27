import { useForm } from "react-hook-form";
import "./Profile.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { PROFILE_CHANGE_STATUS } from "../../utils/constants";

function Profile({ logOut, setCurrentUser, reqError, setReqError }) {
  const currentUser = useContext(CurrentUserContext);

  const { register, handleSubmit, setValue, watch } = useForm({
    mode: "onChange",
  });

  const [activeInput, setActiveInput] = useState(true);

  const onSubmit = (data) => {
    setActiveInput(true);
    mainApi
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setReqError(PROFILE_CHANGE_STATUS.success);
        setTimeout(() => setReqError(""), 4000);
      })
      .catch((err) => {
        console.log(err);
        setActiveInput(false)
        setReqError(PROFILE_CHANGE_STATUS.error);
        setTimeout(() => setReqError(""), 4000);
      });
  };

  const onLogOut = () => {
    logOut();
  };

  const isSameValues =
    currentUser.name === watch("name") && currentUser.email === watch("email");

  return (
    <main className="profile">
      <p className="profile__greeting">Привет, {currentUser.name}!</p>
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="profile__label">
          Имя
          <input
            className="profile__input"
            type="text"
            placeholder={currentUser.name}
            disabled={activeInput}
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
        <div className="profile__divider"></div>
        <label className="profile__label">
          E-mail
          <input
            className="profile__input"
            type="email"
            placeholder={currentUser.email}
            disabled={activeInput}
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Введите корректный e-mail",
              },
            })}
          />
        </label>
        {!activeInput && (
          <>
            <button
              className="profile__save-changes"
              type="submit"
              disabled={isSameValues}
            >
              Сохранить
            </button>
          </>
        )}
        {activeInput && (
          <>
            <div className="profile__error-container">
              <p className="profile__error">{reqError}</p>
            </div>
            <button
              className="profile__change-btn"
              type="button"
              aria-label="Изменить профиль"
              onClick={() => {
                setActiveInput(false);
                setValue("name", currentUser.name);
                setValue("email", currentUser.email);
              }}
            >
              Редактировать
            </button>
            <button
              className="profile__exit"
              type="button"
              aria-label="Выйти из аккаунта"
              onClick={onLogOut}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </main>
  );
}

export default Profile;
