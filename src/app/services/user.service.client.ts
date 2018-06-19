export class UserServiceClient {

  findUserById(userId) {
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/user/' + userId)
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  update(username, firstName, lastName, email, phone, address) {
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address
    };
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/update', {
      method: 'put',
      body: JSON.stringify(newUser),
      credentials: "include",
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => {
        if (response.status === 200)
          return response.json();
        else
          return response;
      });
  }

  createUser(username, password, type) {
    const user = {
      username: username,
      password: password,
      type: type
    };
    return fetch('https://webdev-summer1-nodejs-server.herokuapp.com/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
