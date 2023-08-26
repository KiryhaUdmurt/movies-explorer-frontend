export const REQ_ERRORS_TXT = {
  authErr: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
  registerErr: "При регистрации пользователя произошла ошибка.",
  loginErr: "Вы ввели неправильный логин или пароль.",
  emailErr: "Пользователь с таким email уже существует.",
};

export const PROFILE_CHANGE_STATUS = {
  success: "Данные пользователя успешно обновлены.",
  error: "Произошла ошибка при обновлении профиля.",
}

export const SCREEN_SIZE_L = 1280;
export const SCREEN_SIZE_S = 651;

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;