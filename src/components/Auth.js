const baseUrl = 'https://auth.nomoreparties.co'


export function signUp(password, email) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
        .then(res => {
            if (res.status < 300) {
                return res.json();
            } else {
                throw new Error(`Ошибка регистрации`)
            }
        })
}

export function signIn(password, email) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    // }).then(data => localStorage.setItem('token', data.token))
    //     .catch(err => {
    //         console.log(err)
        })
}

export function getLoginStatus(jwt) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
        .catch(err => {
            console.log(err)
        })
}




