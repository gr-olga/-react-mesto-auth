const token = '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc'
const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

class Api {
    constructor(config) {
        this.headers = config.headers
        this.baseUrl = config.baseUrl
    }



    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(handleResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }

    getInitialProfile() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(handleResponse)
    }

    updateUserProfile(inputData) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(inputData)
        })
            .then(handleResponse);
    }

    updateProfileAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(handleResponse);
    }

    addCard(inputData) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(inputData)
        })
            .then(handleResponse);
    }

    updateLikes(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(
                {likes: ''}
            )
        })
            .then(handleResponse);
    }

    deleteLikes(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(handleResponse);
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

