export class SectionServiceClient {

  SECTION_URL = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unEnrollStudent(sectionId, enrollmentId){
    const url = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/section/' + sectionId + '/enrollment/' + enrollmentId;
    return fetch(url, {
      method: 'delete'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  deleteSection(sectionId) {
    const url = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/section/' + sectionId;
    return fetch(url, {
      method: 'delete'
    });
  }

  updateSection(sectionId, sectionName, seats){
    const newSection = {
      name: sectionName,
      seats: seats
    }
    const url = 'https://webdev-summer1-nodejs-server.herokuapp.com/api/section/' + sectionId;
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
