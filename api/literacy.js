'use strict';
// Computer Literacy gate. Password comes from the COURSE_PASSWORD_LITERACY environment variable.
const createCourseHandler = require('./_lib/course-handler');

module.exports = createCourseHandler({
  course: 'literacy',
  passwordEnv: 'COURSE_PASSWORD_LITERACY',
  modules: require('./_data/literacy.json'),
});
