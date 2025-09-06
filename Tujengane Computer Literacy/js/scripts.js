document.addEventListener('DOMContentLoaded', function() {
  let currentModule = 0;
  let currentSlide = 0;
  const modules = [
    { slides: 13, startIndex: 0 },  // Module 1
    { slides: 13, startIndex: 13 }, // Module 2
    { slides: 13, startIndex: 26 }, // Module 3
    { slides: 13, startIndex: 39 }, // Module 4
    { slides: 12, startIndex: 52 }, // Module 5
    { slides: 13, startIndex: 64 }, // Module 6
    { slides: 13, startIndex: 77 }, // Module 7
    { slides: 12, startIndex: 90 }, // Module 8
    { slides: 12, startIndex: 102 }, // Module 9
    { slides: 12, startIndex: 114 }, // Module 10
    { slides: 12, startIndex: 126 }, // Module 11
    { slides: 13, startIndex: 138 }, // Module 12
    { slides: 6, startIndex: 151 }  // Module 13
  ];
  const totalSlides = 162;

  // Mock slide content (replace with actual content loading logic)
  const slideContent = Array(totalSlides).fill().map((_, i) => `<h2>Slide ${i + 1}</h2><p>Content for slide ${i + 1} of Module ${Math.floor(i / 13) + 1}</p>`);

  // Toggle module visibility
  function toggleModule(moduleIndex, forceOpen = false) {
    const isSameModule = moduleIndex === currentModule;
    const isCollapsed = document.querySelector(`.module-toggle[data-module="${moduleIndex}"]`).classList.contains('collapsed');
    
    // Show all module toggles by default
    document.querySelectorAll('.module-toggle').forEach((toggle, index) => {
      toggle.style.display = 'flex';
      const slides = toggle.nextElementSibling;
      slides.style.display = 'none';
      toggle.classList.add('collapsed');
    });

    // If opening a module or forcing open
    if (forceOpen || (isSameModule && isCollapsed) || (!isSameModule)) {
      const toggle = document.querySelector(`.module-toggle[data-module="${moduleIndex}"]`);
      const slides = toggle.nextElementSibling;
      toggle.style.display = 'flex';
      slides.style.display = 'block';
      toggle.classList.remove('collapsed');
      slides.classList.add('open');
      
      // Hide other module toggles
      document.querySelectorAll('.module-toggle').forEach((t, index) => {
        if (index !== moduleIndex) {
          t.style.display = 'none';
        }
      });

      currentModule = moduleIndex;
      currentSlide = 0; // Start at first slide of the module
      loadSlide(modules[moduleIndex].startIndex);
    } else {
      // Collapsing the current module, show all toggles
      document.querySelector(`.module-toggle[data-module="${moduleIndex}"]`).classList.add('collapsed');
      document.querySelector(`.module-slides[data-module="${moduleIndex}"]`).classList.remove('open');
    }
  }

  // Load a specific slide
  function loadSlide(globalIndex) {
    const slideContainer = document.getElementById('slide-container');
    slideContainer.innerHTML = slideContent[globalIndex];
    document.getElementById('current-slide').textContent = globalIndex + 1;
    updateActiveLink(globalIndex);
    // Update prev/next button states
    document.getElementById('prevBtn').disabled = globalIndex === modules[currentModule].startIndex;
    document.getElementById('nextBtn').disabled = globalIndex === modules[currentModule].startIndex + modules[currentModule].slides - 1;
  }

  // Update active sidebar link
  function updateActiveLink(globalIndex) {
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.remove('active');
      if (parseInt(link.dataset.module) === currentModule && parseInt(link.dataset.slide) === globalIndex - modules[currentModule].startIndex) {
        link.classList.add('active');
      }
    });
  }

  // Sidebar module toggling
  document.querySelectorAll('.module-toggle').forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      toggleModule(index);
    });
  });

  // Sidebar link navigation
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const moduleIndex = parseInt(link.dataset.module);
      const slideIndex = parseInt(link.dataset.slide);
      if (moduleIndex !== currentModule) {
        toggleModule(moduleIndex, true); // Force open the new module
      }
      currentModule = moduleIndex;
      currentSlide = slideIndex;
      loadSlide(modules[moduleIndex].startIndex + slideIndex);
    });
  });

  // Previous slide navigation
  window.prevSlide = function() {
    if (currentSlide > 0) {
      currentSlide--;
      loadSlide(modules[currentModule].startIndex + currentSlide);
    } else {
      currentSlide = modules[currentModule].slides - 1; // Loop to last slide of current module
      loadSlide(modules[currentModule].startIndex + currentSlide);
    }
  };

  // Next slide navigation
  window.nextSlide = function() {
    if (currentSlide < modules[currentModule].slides - 1) {
      currentSlide++;
      loadSlide(modules[currentModule].startIndex + currentSlide);
    } else {
      currentSlide = 0; // Loop to first slide of current module
      loadSlide(modules[currentModule].startIndex);
    }
  };

  // Initialize first module and slide
  toggleModule(0, true);
});
document.addEventListener('DOMContentLoaded', function() {
  const marquee = document.querySelector('.marquee');
  if (marquee) {
    // Pause animation on hover
    marquee.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }
});