import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {CourseServiceClient} from "../services/course.service.client";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private courseService: CourseServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']))
  }

  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  type;

  loadSections(courseId) {
    this.courseId = courseId;
    this.service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  enroll(section) {
    // alert(section._id);
    if (section.seats == 0) {
      alert("No seats available");
    }
    else {
      this.service
        .enrollStudentInSection(section._id)
        .then(() => {
          this.router.navigate(['profile']);
        });
    }
  }



  ngOnInit() {
    this.userService
      .profile()
      .then(user => this.type = user.type);
  }

}
