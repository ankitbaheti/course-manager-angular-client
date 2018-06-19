export class LessonServiceClient {
  findLessonsForModule(moduleId) {
    return fetch('https://lit-wave-44684.herokuapp.com/api/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
