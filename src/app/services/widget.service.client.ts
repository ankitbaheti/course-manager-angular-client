export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('https://lit-wave-44684.herokuapp.com/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
