/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that can contain Tailwind class names (pages, JS-rendered slides, fetched slide partials).
  content: [
    './index.html',
    './*/*.html',
    './*/slides/*.html',
    './*/js/*.js',
    // Lesson HTML for the paid courses lives server-side now; it still uses Tailwind classes.
    './api/_data/*.json',
  ],
  // Excluded on purpose: other_trainings/ (kneck.html has its own CSS and does not use Tailwind).
  theme: { extend: {} },
  plugins: [],
};
