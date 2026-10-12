'use strict';
// Analyst Pro gate. Password comes from the COURSE_PASSWORD_ANALYST environment variable.
const createCourseHandler = require('./_lib/course-handler');

module.exports = createCourseHandler({
  course: 'analyst',
  passwordEnv: 'COURSE_PASSWORD_ANALYST',
  modules: require('./_data/analyst.json'),
});
