import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private sectionService: SectionServiceClient) { }

  courses = [];
  sectionName = '';
  seats = 10;
  courseId;
  sections = [];
  clicked = false;

  loadSections(courseId) {
    this.clicked = true;
    this.courseId = courseId;
    this.sectionService
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  createSection(sectionName, seats) {
    if (sectionName === ''){
      this.service.findCourseById(this.courseId)
        .then(course => {
          this.sectionName = course.title + ' Section 1';
          this.sectionService
            .createSection(this.courseId, this.sectionName, seats)
            .then(() => {
              this.loadSections(this.courseId);
            });
        });
    }
    else {
      this.sectionService
        .createSection(this.courseId, sectionName, seats)
        .then(() => {
          this.loadSections(this.courseId);
        });
    }
  }

  deleteSection(section) {
    this.sectionService
      .deleteSection(section._id)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  updateSection(sectionId, sectionName, seats){
    this.sectionService
      .updateSection(sectionId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  populate(section) {
    this.sectionName = section.name;
    this.seats = section.seats;
  }

  ngOnInit() {
    this.service
      .findAllCourses()
      .then(courses => this.courses = courses);
  }

}
