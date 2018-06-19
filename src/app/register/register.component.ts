import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  password2;
  type = 'Student';
  register(username, password, password2, type) {
    this.service
      .createUser(username, password, type)
      .then((response) => {
        if (response.status === 500) {
          alert("User already exist");
        }
        else {
          this.router.navigate(['profile']);
        }
      });
  }

  ngOnInit() {
  }

}
