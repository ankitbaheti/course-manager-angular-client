export class SectionServiceClient {

  SECTION_URL = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unEnrollStudent(sectionId, enrollmentId){
    const url = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/section/' + sectionId + '/enrollment/' + enrollmentId;
    return fetch(url, {
      method: 'delete'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  deleteSection(sectionId) {
    const url = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/section/' + sectionId;
    return fetch(url, {
      method: 'delete'
    });
  }

  updateSection(sectionId, sectionName, seats){
    const newSection = {
      name: sectionName,
      seats: seats
    }
    const url = 'mongodb://heroku_1mhtcpr8:3aeb82h2mt0t32mlioe29ma9mv@ds261440.mlab.com:61440/heroku_1mhtcpr8/api/section/' + sectionId;
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(newSection),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
