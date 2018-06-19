export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch('https://lit-wave-44684.herokuapp.com/api/course')
      .then(response => response.json());
  }
  findAllModulesForCourses(courseId) {
    return fetch('https://lit-wave-44684.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
