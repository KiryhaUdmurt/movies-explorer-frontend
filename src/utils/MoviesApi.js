class MoviesApi {
    constructor() {}

    getAllCards() {
        return fetch('https://api.nomoreparties.co/beatfilm-movies', {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка - ${response.status}`);
        })
    }
}

export const moviesApi = new MoviesApi();