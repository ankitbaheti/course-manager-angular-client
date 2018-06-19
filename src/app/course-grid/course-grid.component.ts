import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  courses: Course[] = [];
  sections = [];
  sectionCourse = [];
  type;
  sectionEnrolled = [] ;
  anonymous = true;

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.userService
      .profile()
      .then((response) => {
        if (response.status !== undefined) {
          this.anonymous = true;
        }
        else {
          this.type = response.type;
          this.anonymous = false;
          this.sectionService
            .findSectionsForStudent()
            .then(sections => {
              this.sections = sections;
              this.service.findAllCourses()
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
      });
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
