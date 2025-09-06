
// Define modules and their slides for modularity
const modules = [
	{
		name: 'Module 1: Computer Basics and File Management',
		slides: [
			'modules/module1/slide1.html', 'modules/module1/slide2.html', 'modules/module1/slide3.html',
			'modules/module1/slide4.html', 'modules/module1/slide5.html', 'modules/module1/slide6.html',
			'modules/module1/slide7.html', 'modules/module1/slide8.html', 'modules/module1/slide9.html',
			'modules/module1/slide10.html', 'modules/module1/slide11.html', 'modules/module1/slide12.html',
			'modules/module1/slide13.html'
		]
	},
	{
		name: 'Module 2: Typing and Document Creation',
		slides: [
			'modules/module2/slide1.html', 'modules/module2/slide2.html', 'modules/module2/slide3.html',
			'modules/module2/slide4.html', 'modules/module2/slide5.html', 'modules/module2/slide6.html',
			'modules/module2/slide7.html', 'modules/module2/slide8.html', 'modules/module2/slide9.html',
			'modules/module2/slide10.html', 'modules/module2/slide11.html', 'modules/module2/slide12.html',
			'modules/module2/slide13.html'
		]
	},
	// ...repeat for modules 3-12...
	{
		name: 'Module 13: Artificial Intelligence',
		slides: [
			'modules/module13/slide1.html', 'modules/module13/slide2.html', 'modules/module13/slide3.html',
			'modules/module13/slide4.html', 'modules/module13/slide5.html', 'modules/module13/slide6.html'
		]
	}
];

let currentModule = 0;
let currentSlide = 0;

function loadSlide(moduleIdx, slideIdx) {
	const mod = modules[moduleIdx];
	if (!mod || slideIdx < 0 || slideIdx >= mod.slides.length) return;
	const slideContainer = document.getElementById('slide-container');
	const currentSlideDisplay = document.getElementById('current-slide');
	slideContainer.style.opacity = '0';
	setTimeout(() => {
		fetch(mod.slides[slideIdx])
			.then(response => {
				if (!response.ok) throw new Error('Slide not found');
				return response.text();
			})
			.then(data => {
				slideContainer.innerHTML = data;
				slideContainer.style.opacity = '1';
				slideContainer.classList.add('active');
				// Highlight active sidebar item
				document.querySelectorAll('.sidebar-item').forEach(item => {
					const link = item.querySelector('.sidebar-link');
					const m = parseInt(link.dataset.module);
					const s = parseInt(link.dataset.slide);
					const isActive = m === moduleIdx && s === slideIdx;
					link.classList.toggle('active', isActive);
					item.classList.toggle('active', isActive);
				});
				currentSlideDisplay.textContent = (slideIdx + 1) + ' of ' + mod.slides.length;
				updateNavigation();
				initializeSlideContent();
				const activeItem = document.querySelector('.sidebar-item.active');
				if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			})
			.catch(error => console.error('Error loading slide:', error));
	}, 400);
}

function updateNavigation() {
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	const mod = modules[currentModule];
	prevBtn.disabled = false;
	nextBtn.disabled = false;
}

function prevSlide() {
	const mod = modules[currentModule];
	if (currentSlide > 0) {
		currentSlide--;
	} else {
		currentSlide = mod.slides.length - 1; // loop to last
	}
	loadSlide(currentModule, currentSlide);
}

function nextSlide() {
	const mod = modules[currentModule];
	if (currentSlide < mod.slides.length - 1) {
		currentSlide++;
	} else {
		currentSlide = 0; // loop to first
	}
	loadSlide(currentModule, currentSlide);
}

function goToSlide(moduleIdx, slideIdx) {
	currentModule = moduleIdx;
	currentSlide = slideIdx;
	loadSlide(currentModule, currentSlide);
}

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

document.addEventListener('DOMContentLoaded', () => {
	// Hamburger menu (if present)
	const hamburgerBtn = document.getElementById('hamburger-btn');
	if (hamburgerBtn) {
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
	}

	// Sidebar logic: only one module open at a time, others hidden
	const toggles = document.querySelectorAll('.module-toggle');
	const slidesPanels = document.querySelectorAll('.module-slides');
	toggles.forEach((toggle, idx) => {
		toggle.addEventListener('click', function () {
			const isCollapsed = this.classList.contains('collapsed');
			if (isCollapsed) {
				// Hide all other modules and slides
				toggles.forEach((tg, i) => {
					if (i !== idx) {
						tg.style.display = 'none';
						slidesPanels[i].style.display = 'none';
						tg.classList.add('collapsed');
						tg.classList.remove('open');
					}
				});
				// Open this one
				this.classList.remove('collapsed');
				this.classList.add('open');
				this.style.display = '';
				slidesPanels[idx].style.display = 'block';
				// Set current module and load first slide
				currentModule = idx;
				currentSlide = 0;
				loadSlide(currentModule, currentSlide);
			} else {
				// Collapse: show all modules, hide all slides
				toggles.forEach((tg, i) => {
					tg.style.display = '';
					tg.classList.add('collapsed');
					tg.classList.remove('open');
					slidesPanels[i].style.display = 'none';
				});
			}
		});
	});

	// Sidebar slide navigation
	document.querySelectorAll('.sidebar-link').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const m = parseInt(link.dataset.module);
			const s = parseInt(link.dataset.slide);
			goToSlide(m, s);
		});
	});

	// By default, show only the first module
	toggles.forEach((el, idx) => {
		if (idx === 0) {
			el.classList.remove('collapsed');
			el.classList.add('open');
			el.style.display = '';
			slidesPanels[idx].style.display = 'block';
		} else {
			el.classList.add('collapsed');
			el.classList.remove('open');
			el.style.display = '';
			slidesPanels[idx].style.display = 'none';
		}
	});
	currentModule = 0;
	currentSlide = 0;
	loadSlide(currentModule, currentSlide);
});
