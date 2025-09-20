// scripts.js
const slides = [
    'slides/slide1.html', 'slides/slide2.html', 'slides/slide3.html', 'slides/slide4.html',
    'slides/slide5.html', 'slides/slide6.html', 'slides/slide7.html', 'slides/slide8.html',
    'slides/slide9.html', 'slides/slide10.html', 'slides/slide11.html', 'slides/slide12.html',
    'slides/slide13.html', 'slides/slide14.html', 'slides/slide15.html', 'slides/slide16.html',
    'slides/slide17.html', 'slides/slide18.html', 'slides/slide19.html', 'slides/slide20.html',
    'slides/slide21.html', 'slides/slide22.html' // Added slide22
];
let currentSlide = 0;
let isNavigating = false;

function loadSlide(index) {
    if (isNavigating) return;
    if (index < 0 || index >= slides.length) return;
    isNavigating = true;
    const slideContainer = document.getElementById('slide-container');
    const currentSlideDisplay = document.getElementById('current-slide');
    slideContainer.style.opacity = '0';
    setTimeout(() => {
        fetch(slides[index])
            .then(response => {
                if (!response.ok) throw new Error('Slide not found');
                return response.text();
            })
            .then(data => {
                slideContainer.innerHTML = data;
                slideContainer.style.opacity = '1';
                slideContainer.classList.add('active');
                document.querySelectorAll('.sidebar-item').forEach(item => {
                    const link = item.querySelector('.sidebar-link');
                    const isActive = parseInt(link.dataset.slide) === index;
                    link.classList.toggle('active', isActive);
                    item.classList.toggle('active', isActive);
                });
                currentSlideDisplay.textContent = index + 1;
                updateNavigation();
                initializeSlideContent();
                const activeItem = document.querySelector('.sidebar-item.active');
                if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            })
            .catch(error => console.error('Error loading slide:', error))
            .finally(() => { isNavigating = false; });
    }, 400); // Match CSS transition duration
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
}

function prevSlide() {
    if (isNavigating) return;
    if (currentSlide > 0) {
        currentSlide--;
        loadSlide(currentSlide);
    }
}

function nextSlide() {
    if (isNavigating) return;
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        loadSlide(currentSlide);
    }
}

function goToSlide(index) {
    if (isNavigating) return;
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        loadSlide(currentSlide);
    }
}
window.goToSlide = goToSlide;

function initializeSlideContent() {
    const interactiveElements = document.querySelectorAll('.highlight-list li, .rule-card, .cta-button, .finalize-btn');
    interactiveElements.forEach(elem => {
        elem.addEventListener('click', () => {
            interactiveElements.forEach(other => other.classList.remove('clicked'));
            elem.classList.add('clicked');
            setTimeout(() => elem.classList.remove('clicked'), 3000);
        });
    });
    if (document.querySelector('.quiz-container')) {
        initializeQuiz();
    }
    if (currentSlide === slides.length - 1) {
        initializeCertificateRequest();
        triggerConfetti();
        playCheer();
    }
}

function initializeQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.querySelector('.quiz-feedback');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('correct', 'wrong'));
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
                feedback.textContent = 'Correct! Well done!';
                feedback.style.display = 'block';
                feedback.style.background = '#059669';
            } else {
                option.classList.add('wrong');
                feedback.textContent = 'Try again! Review the slide content.';
                feedback.style.display = 'block';
                feedback.style.background = '#dc2626';
            }
        });
    });
}

function initializeCertificateRequest() {
    const nameInput = document.getElementById('full-name-input');
    const certLink = document.getElementById('certificate-link');
    if (nameInput && certLink) {
        nameInput.addEventListener('input', () => {
            const fullName = encodeURIComponent(nameInput.value.trim());
            certLink.href = `https://wa.me/254791360805?text=I%20am%20requesting%20my%20certificate%20for%20completing%20TDB&name=${fullName}`;
            // Ensure the WhatsApp link opens in a new tab/window
            try { certLink.target = '_blank'; certLink.rel = 'noopener noreferrer'; } catch (e) {}
        });
    }
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function playCheer() {
    const cheer = document.getElementById('cheerAudio');
    cheer.play().catch(error => console.error('Error playing audio:', error));
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('hidden');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Touch swipe navigation variables
let touchStartX = null;
let touchStartY = null;
let touchEndX = null;
let touchEndY = null;
const minSwipeDistance = 50;

// Visual feedback functions
function showNavigationFeedback(direction) {
    const feedbackId = direction === 'prev' ? 'nav-feedback-left' : 'nav-feedback-right';
    const feedbackEl = document.getElementById(feedbackId);
    if (feedbackEl) {
        feedbackEl.classList.add('show');
        setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 800);
    }
}

// Touch event handlers for swipe navigation
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    if (!touchStartX || !touchStartY) return;
    
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Check if it's a horizontal swipe (not vertical scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            // Swipe right - go to previous slide
            showNavigationFeedback('prev');
            prevSlide();
        } else {
            // Swipe left - go to next slide  
            showNavigationFeedback('next');
            nextSlide();
        }
    }
    
    // Reset touch variables
    touchStartX = null;
    touchStartY = null;
    touchEndX = null;
    touchEndY = null;
}

document.addEventListener('DOMContentLoaded', () => {
    loadSlide(currentSlide);
    
    // Add touch event listeners for swipe navigation
    const slideContainer = document.getElementById('slide-container');
    const mainContent = document.querySelector('.main-content');
    
    if (slideContainer && mainContent) {
        slideContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        mainContent.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainContent.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Add keyboard navigation for arrow keys
    document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields or text areas
        const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
        if (isInputActive) return;
        
        // Left arrow key - previous slide
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showNavigationFeedback('prev');
            prevSlide();
        }
        // Right arrow key - next slide
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNavigationFeedback('next');
            nextSlide();
        }
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
    // Sidebar navigation: click to go to slide
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            if (!isNaN(slideIndex)) {
                window.goToSlide(slideIndex);
            }
        });
    });

    // Prevent page jump on prev/next button click (especially prev)
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) {
        prevBtn.addEventListener('mousedown', e => e.preventDefault());
        prevBtn.addEventListener('click', e => {
            e.preventDefault();
            prevSlide();
            // Remove focus after click to prevent outline or jump
            prevBtn.blur();
        });
        prevBtn.addEventListener('focus', e => {
            // Remove focus immediately if somehow focused
            prevBtn.blur();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('mousedown', e => e.preventDefault());
        nextBtn.addEventListener('click', e => {
            e.preventDefault();
            nextSlide();
            nextBtn.blur();
        });
        nextBtn.addEventListener('focus', e => {
            nextBtn.blur();
        });
    }

    // Tooltip auto-hide on small screens for nav-btns
    function isSmallScreen() {
        return window.innerWidth <= 768;
    }
    let tooltipTimeout;
    document.querySelectorAll('.nav-btn[data-tip]').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (isSmallScreen()) {
                clearTimeout(tooltipTimeout);
                const self = this;
                tooltipTimeout = setTimeout(() => {
                    // Remove tooltip by blurring or triggering mouseleave
                    self.dispatchEvent(new Event('mouseleave'));
                }, 2000); // Show for 2 seconds
            }
        });
        btn.addEventListener('mouseleave', function() {
            clearTimeout(tooltipTimeout);
        });
    });
});