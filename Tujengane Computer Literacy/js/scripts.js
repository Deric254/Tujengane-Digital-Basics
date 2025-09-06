let currentModule = 0;
let currentSlide = 0;
let isNavigating = false;
let openModuleIndex = -1;

function toggleModule(moduleIndex) {
    const toggles = document.querySelectorAll('.module-toggle');
    const slides = document.querySelectorAll('.module-slides');
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (openModuleIndex === moduleIndex) {
        // Collapsing the open module
        toggles.forEach((toggle, index) => {
            toggle.style.display = 'flex';
            slides[index].style.display = 'none';
            toggle.classList.add('collapsed');
        });
        sidebarFooter.style.display = 'block';
        openModuleIndex = -1;
        currentModule = 0;
        currentSlide = 0;
        loadSlide(0, 0);
    } else {
        // Opening a new module, close any open one
        toggles.forEach((toggle, index) => {
            if (index === moduleIndex) {
                toggle.style.display = 'flex';
                slides[index].style.display = 'block';
                toggle.classList.remove('collapsed');
            } else {
                toggle.style.display = 'none';
                slides[index].style.display = 'none';
                toggle.classList.add('collapsed');
            }
        });
        sidebarFooter.style.display = 'none';
        openModuleIndex = moduleIndex;
        currentModule = moduleIndex;
        currentSlide = 0;
        loadSlide(moduleIndex, 0);
    }
}

function loadSlide(moduleIndex, slideIndex) {
    if (isNavigating) return;
    const slideContainer = document.getElementById('slide-container');
    const currentSlideDisplay = document.getElementById('current-slide');
    const totalSlidesDisplay = document.getElementById('total-slides');
    slideContainer.style.opacity = '0';
    setTimeout(() => {
        // Placeholder for actual slide loading
        slideContainer.innerHTML = `<h2>${modules[moduleIndex].name} - Slide ${slideIndex + 1}</h2><p>Content for slide ${slideIndex + 1}.</p>`;
        slideContainer.style.opacity = '1';
        slideContainer.classList.add('active');
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.dataset.module) === moduleIndex && parseInt(link.dataset.slide) === slideIndex) {
                link.classList.add('active');
            }
        });
        currentSlideDisplay.textContent = slideIndex + 1;
        totalSlidesDisplay.textContent = modules[moduleIndex].slides.length;
        updateNavigationButtons();
        isNavigating = false;
    }, 400);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentSlide === 0 && currentModule === 0;
    nextBtn.disabled = currentSlide === modules[currentModule].slides.length - 1 && currentModule === modules.length - 1;
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else if (currentModule > 0) {
        currentModule--;
        currentSlide = modules[currentModule].slides.length - 1;
        toggleModule(currentModule);
        return; // toggleModule will load the slide
    }
    loadSlide(currentModule, currentSlide);
}

function nextSlide() {
    if (currentSlide < modules[currentModule].slides.length - 1) {
        currentSlide++;
    } else if (currentModule < modules.length - 1) {
        currentModule++;
        currentSlide = 0;
        toggleModule(currentModule);
        return; // toggleModule will load the slide
    }
    loadSlide(currentModule, currentSlide);
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatOverlay = document.getElementById('chatOverlay');
    chatWidget.classList.toggle('hidden');
    chatOverlay.classList.toggle('hidden');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    toggleModule(0); // Open Module 1 by default
    document.querySelectorAll('.module-toggle').forEach((toggle, index) => {
        toggle.addEventListener('click', () => toggleModule(index));
    });
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleIndex = parseInt(link.dataset.module);
            const slideIndex = parseInt(link.dataset.slide);
            if (openModuleIndex !== moduleIndex) {
                toggleModule(moduleIndex);
            }
            currentSlide = slideIndex;
            loadSlide(moduleIndex, slideIndex);
        });
    });
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const sidebar = document.getElementById('slide-nav-panel');
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        sidebar.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            sidebar.classList.remove('active');
        });
    });
    document.getElementById('chatOverlay').addEventListener('click', toggleChat);
});