// Slide navigation and foldable modules for Tujengane Computer Literacy
// This script matches the taste and logic of Data Basics, with module folding and slide navigation

document.addEventListener('DOMContentLoaded', function() {
  // Sidebar module toggling
  document.querySelectorAll('.module-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const slides = this.nextElementSibling;
      const icon = this.querySelector('.fa-chevron-down');
      if (slides.classList.contains('open')) {
        slides.classList.remove('open');
        toggle.classList.add('collapsed');
      } else {
        slides.classList.add('open');
        toggle.classList.remove('collapsed');
      }
    });
  });

  // Slide navigation
  window.goToSlide = function(slideIndex) {
    // Implement slide loading logic here
    // Example: loadSlide(slideIndex);
  };
});
