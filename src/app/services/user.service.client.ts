export class UserServiceClient {

  findUserById(userId) {
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/user/' + userId)
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/login', {
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
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/update', {
      method: 'put',
      body: JSON.stringify(newUser),
      credentials: "include",
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/profile',
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
    return fetch('mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
