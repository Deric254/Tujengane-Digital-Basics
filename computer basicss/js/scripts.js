// Copied from Tujengane data basics scripts.js - updated slides path to local slides folder
const slides = [
    'slides/slide1.html', 'slides/slide2.html', 'slides/slide3.html', 'slides/slide4.html',
    'slides/slide5.html', 'slides/slide6.html', 'slides/slide7.html', 'slides/slide8.html',
    'slides/slide9.html', 'slides/slide10.html', 'slides/slide11.html', 'slides/slide12.html',
    'slides/slide13.html', 'slides/slide14.html', 'slides/slide15.html', 'slides/slide16.html',
    'slides/slide17.html', 'slides/slide18.html', 'slides/slide19.html', 'slides/slide20.html',
    'slides/slide21.html', 'slides/slide22.html'
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
    // Initialize the lightweight, client-side AI demo if the slide provides it
    initializeAIDemo();
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
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function playCheer() {
    const cheer = document.getElementById('cheerAudio');
    if (cheer) cheer.play().catch(error => console.error('Error playing audio:', error));
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) chatWidget.classList.toggle('hidden');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSlide(currentSlide);
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const sidebar = document.getElementById('slide-nav-panel');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            sidebar.classList.toggle('active');
        });
    }
    if (navLinks) navLinks.querySelectorAll('a').forEach(link => {
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
                    self.dispatchEvent(new Event('mouseleave'));
                }, 2000); // Show for 2 seconds
            }
        });
        btn.addEventListener('mouseleave', function() {
            clearTimeout(tooltipTimeout);
        });
    });
});

// ---------------------------
// Lightweight client-side AI demo (deterministic, local-only)
// ---------------------------
function initializeAIDemo() {
    const modal = document.getElementById('aiDemoModal');
    if (!modal) return; // nothing to do on slides without the demo

    const aiInput = document.getElementById('aiInput');
    const aiSummarizeBtn = document.getElementById('aiSummarizeBtn');
    const aiGenerateBtn = document.getElementById('aiGenerateBtn');
    const aiResult = document.getElementById('aiResult');
    const aiClose = document.getElementById('aiCloseBtn');

    if (aiClose) aiClose.addEventListener('click', () => closeModal('aiDemoModal'));

    if (aiSummarizeBtn) aiSummarizeBtn.addEventListener('click', () => {
        const text = (aiInput && aiInput.value) ? aiInput.value.trim() : '';
        if (!text) {
            aiResult.textContent = 'Type or paste a paragraph from the slide to see a short summary.';
            return;
        }
        const summary = summarizeText(text);
        aiResult.innerHTML = '<strong>Summary:</strong><p>' + escapeHtml(summary) + '</p>';
    });

    if (aiGenerateBtn) aiGenerateBtn.addEventListener('click', () => {
        const topic = (aiInput && aiInput.value.trim()) ? aiInput.value.trim() : 'Computer Basics';
        const ideas = generateCourseIdeas(topic);
        aiResult.innerHTML = '<strong>Course Ideas:</strong><ul>' + ideas.map(i => '<li>' + escapeHtml(i) + '</li>').join('') + '</ul>';
    });
}

function summarizeText(text) {
    // Very small, deterministic summarizer: pick the first 1-2 sentences and trim to 250 chars.
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
    let pick = sentences.slice(0, 2).join(' ').trim();
    if (pick.length > 250) pick = pick.slice(0, 247) + '...';
    return pick;
}

function generateCourseIdeas(topic) {
    // Deterministic idea generator based on topic words
    const base = topic.split(/\s+/).slice(0,3).join(' ');
    return [
        `Intro to ${base}: a 4-week hands-on course for beginners (tools, basics, practical tasks)`,
        `${base} in Practice: 6 mini-projects to build real skills and a portfolio-worthy project`,
        `Certification Prep: essential ${base} concepts, quizzes, and a final assessment to certify learning`
    ];
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;');
}
