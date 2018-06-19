import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {Course} from "../models/coruse.model.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) { }

  user = {};
  username;
  password;
  firstName;
  lastName;
  email;
  phone;
  address;
  type;
  sections = [];
  courses: Course[] = [];
  sectionEnrolled =[] ;

  update() {
    this.service
      .update(this.username, this.firstName, this.lastName, this.email, this.phone, this.address)
      .then((user) => console.log(user));
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  unenroll(sectionId, enrollmentId) {
    this.sectionService
      .unEnrollStudent(sectionId, enrollmentId)
      .then(() => {
        location.reload();
      });
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user => {
        console.log(user);
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
        this.address = user.address;
        this.type = user.type;
      });

    // this.courseService.findAllCourses()
    //   .then(courses => this.courses = courses);

    this.sectionService
      .findSectionsForStudent()
      .then(sections => {
        this.sections = sections;
        this.courseService.findAllCourses()
          .then(courses => this.courses = courses)
          .then(() => {
            // this.sectionEnrolled = new Array(this.sections.length);
            for (const i in this.sections) {
              for (const j in this.courses) {
                if (this.sections[i].section.courseId === this.courses[j].id) {
                  this.sectionEnrolled[i] = {
                    grade: this.sections[i].grade,
                    courseName: this.courses[j].title,
                    sectionName: this.sections[i].section.name,
                    sectionSeats: this.sections[i].section.seats,
                    enrollmentId: this.sections[i]._id,
                    sectionId: this.sections[i].section._id
                  };
                }
              }
            }
          });
      });
  }

}
