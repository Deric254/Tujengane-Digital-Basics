
// Module and slide data
const modules = [
    {
        title: "Module 1: Computer Basics and File Management",
        slides: [
            { title: "Welcome to Digital Literacy!", content: "Get ready to embark on a 12-week journey to master essential digital skills with Tujengane Computer Literacy by EXES BI." },
            { title: "What Is a Computer?", content: "A computer is an electronic device that processes data to perform tasks, such as calculations, communication, and data storage." },
            { title: "Parts of a Computer", content: "Learn about the monitor, keyboard, mouse, CPU, and storage devices that make up a computer system." },
            { title: "Turning On/Off a Computer", content: "Press the power button to turn on; use the Start menu to shut down properly." },
            { title: "Using the Mouse", content: "Practice clicking, double-clicking, and dragging with the mouse to navigate." },
            { title: "Exploring the Desktop", content: "The desktop is your main workspace with icons for apps and files." },
            { title: "Opening File Explorer", content: "Use File Explorer to browse files and folders on your computer." },
            { title: "Creating a Folder", content: "Right-click on the desktop, select 'New,' then 'Folder' to create and name a folder." },
            { title: "Saving a File", content: "Learn to save files in specific folders using the 'Save As' option." },
            { title: "Using the Calculator App", content: "Open the Calculator app to perform basic math operations." },
            { title: "Practical Activity", content: "Create a folder, save a text file, and perform a calculation using the Calculator app." },
            { title: "Why This Matters", content: "Basic computer skills are essential for education, work, and daily tasks in a digital world." },
            { title: "Q&A and Homework", content: "Ask questions and practice creating folders and saving files at home." }
        ]
    },
    {
        title: "Module 2: Typing and Document Creation",
        slides: [
            { title: "Welcome to Week 2!", content: "This week, we'll learn typing basics and how to create documents using Microsoft Word." },
            { title: "What Is Microsoft Word?", content: "Microsoft Word is a word processing program for creating and editing documents." },
            { title: "Opening Microsoft Word", content: "Find Word in the Start menu or desktop and open it to start a new document." },
            { title: "Understanding the Keyboard", content: "Learn the layout of the keyboard, including letters, numbers, and special keys." },
            { title: "Typing Your First Words", content: "Practice typing a sentence in Word to get comfortable with the keyboard." },
            { title: "Saving Your Document", content: "Use 'Save As' to name and save your document in a specific folder." },
            { title: "Formatting Text", content: "Change font size, style, and alignment to make your document look professional." },
            { title: "Creating a Letter", content: "Write a simple letter with a greeting, body, and closing in Word." },
            { title: "Using Bullets for Lists", content: "Add bullet points to organize information clearly in your document." },
            { title: "Saving and Closing", content: "Save your work and close Word properly to avoid losing data." },
            { title: "Practical Activity", content: "Type and format a short letter, then save it in a folder." },
            { title: "Why This Matters", content: "Document creation is key for communication, school assignments, and professional work." },
            { title: "Q&A and Homework", content: "Review your letter and practice typing a new one for homework." }
        ]
    },
    // Add other modules similarly...
    {
        title: "Module 13: Artificial Intelligence",
        slides: [
            { title: "Welcome to AI", content: "Explore the exciting world of Artificial Intelligence in this final module!" },
            { title: "What is Artificial Intelligence?", content: "AI is the simulation of human intelligence in machines to perform tasks like problem-solving." },
            { title: "AI in Everyday Life", content: "AI powers virtual assistants, recommendation systems, and more in daily life." },
            { title: "Simple AI Tools", content: "Try using AI tools like chatbots or image recognition apps." },
            { title: "The Future of AI", content: "AI is shaping industries, from healthcare to education, with endless possibilities." },
            { title: "Q&A and Homework", content: "Discuss AI applications and explore an AI tool for homework." },
            { title: "Placeholder Slide 7", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 8", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 9", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 10", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 11", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 12", content: "Placeholder content for future expansion." },
            { title: "Placeholder Slide 13", content: "Placeholder content for future expansion." }
        ]
    }
];

let currentModule = 0;
let currentSlide = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    loadSlide(currentModule, currentSlide);
    updateNavigation();
});

// Initialize sidebar
function initSidebar() {
    const toggles = document.querySelectorAll('.module-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const moduleIndex = parseInt(toggle.getAttribute('data-module'));
            const slides = toggle.nextElementSibling;
            const isCollapsed = toggle.classList.contains('collapsed');
            
            // Close all other modules
            document.querySelectorAll('.module-toggle').forEach(t => {
                t.classList.add('collapsed');
                t.nextElementSibling.classList.remove('open');
            });
            
            // Open or close the clicked module
            if (isCollapsed) {
                toggle.classList.remove('collapsed');
                slides.classList.add('open');
            } else {
                toggle.classList.add('collapsed');
                slides.classList.remove('open');
            }
        });
    });

    // Open the first module by default
    const firstToggle = document.querySelector('.module-toggle[data-module="0"]');
    firstToggle.classList.remove('collapsed');
    firstToggle.nextElementSibling.classList.add('open');

    // Add click events to sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const module = parseInt(link.getAttribute('data-module'));
            const slide = parseInt(link.getAttribute('data-slide'));
            loadSlide(module, slide);
        });
    });
}

// Load a specific slide
function loadSlide(moduleIndex, slideIndex) {
    const slideContainer = document.getElementById('slide-container');
    const slideData = modules[moduleIndex].slides[slideIndex];
    
    // Update current module and slide
    currentModule = moduleIndex;
    currentSlide = slideIndex;

    // Update slide content
    slideContainer.innerHTML = `
        <div class="slide-content">
            <h2>${slideData.title}</h2>
            <p>${slideData.content}</p>
        </div>
    `;
    
    // Ensure the slide is visible
    slideContainer.classList.add('active');

    // Update slide number display
    document.getElementById('current-slide').textContent = slideIndex + 1;
    document.getElementById('total-slides').textContent = modules[moduleIndex].slides.length;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active');
    });
    const activeLink = document.querySelector(`.sidebar-link[data-module="${moduleIndex}"][data-slide="${slideIndex}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.parentElement.classList.add('active');
    }

    // Update navigation buttons
    updateNavigation();
}

// Update navigation button states
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextModuleBtn = document.getElementById('nextModuleBtn');

    // Disable prev button on first slide of first module
    prevBtn.disabled = currentModule === 0 && currentSlide === 0;

    // Show/hide next module button
    if (currentSlide === modules[currentModule].slides.length - 1 && currentModule < modules.length - 1) {
        nextBtn.classList.add('hidden');
        nextModuleBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        nextModuleBtn.classList.add('hidden');
    }

    // Disable next button on last slide of last module
    nextBtn.disabled = currentModule === modules.length - 1 && currentSlide === modules[currentModule].slides.length - 1;
}

// Navigate to previous slide
function prevSlide() {
    if (currentSlide > 0) {
        loadSlide(currentModule, currentSlide - 1);
    } else if (currentModule > 0) {
        // Move to last slide of previous module
        const prevModule = currentModule - 1;
        loadSlide(prevModule, modules[prevModule].slides.length - 1);
        // Open the previous module in sidebar
        toggleModule(prevModule);
    }
}

// Navigate to next slide
function nextSlide() {
    if (currentSlide < modules[currentModule].slides.length - 1) {
        loadSlide(currentModule, currentSlide + 1);
    }
}

// Navigate to next module
function nextModule() {
    if (currentModule < modules.length - 1) {
        // Close current module and open next
        toggleModule(currentModule + 1);
        loadSlide(currentModule + 1, 0);
    }
}

// Toggle module in sidebar
function toggleModule(moduleIndex) {
    document.querySelectorAll('.module-toggle').forEach(t => {
        t.classList.add('collapsed');
        t.nextElementSibling.classList.remove('open');
    });
    const toggle = document.querySelector(`.module-toggle[data-module="${moduleIndex}"]`);
    toggle.classList.remove('collapsed');
    toggle.nextElementSibling.classList.add('open');
}

// Toggle sidebar on mobile
document.getElementById('hamburger-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('slide-nav-panel');
    sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('slide-nav-panel');
    const hamburger = document.getElementById('hamburger-btn');
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// Chat and modal functions
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
