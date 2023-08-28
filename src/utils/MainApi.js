class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getHeaders() {
        const token = localStorage.getItem('token');
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка - ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    }

    updateUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                email: userData.email,
                name: userData.name
            })
        }).then(this._getJson);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    }

    addMovie(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                country: movieData.country,
                director: movieData.director,
                duration: movieData.duration,
                year: movieData.year,
                description: movieData.description,
                image: (`https://api.nomoreparties.co/${movieData.image.url}`),
                trailerLink: movieData.trailerLink,
                nameRU: movieData.nameRU,
                nameEN: movieData.nameEN,
                thumbnail: `https://api.nomoreparties.co/${movieData.image.formats.thumbnail.url}`,
                movieId: movieData.id
            })
        }).then(this._getJson);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then(this._getJson);
    }
}

export const mainApi = new MainApi('https://api.movies-diploma.nomoredomains.work');