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
            { title: "Opening Microsoft Word", content: "Find and open Microsoft Word from the Start menu or desktop icon." },
            { title: "Understanding the Keyboard", content: "Learn the layout of the keyboard, including letters, numbers, and special keys." },
            { title: "Typing Your First Words", content: "Practice typing a simple sentence in Microsoft Word." },
            { title: "Saving Your Document", content: "Use 'Save As' to save your document in a chosen folder." },
            { title: "Formatting Text", content: "Change font size, style, and alignment to make your document look professional." },
            { title: "Creating a Letter", content: "Write a formal letter with a greeting, body, and closing." },
            { title: "Using Bullets for Lists", content: "Create bulleted lists to organize information clearly." },
            { title: "Saving and Closing", content: "Save your work and close Microsoft Word properly." },
            { title: "Practical Activity", content: "Type a letter, format it, and save it in a folder." },
            { title: "Why This Matters", content: "Typing and document creation are key skills for school and work." },
            { title: "Q&A and Homework", content: "Ask questions and practice typing a short letter at home." }
        ]
    },
    {
        title: "Module 3: Introduction to Spreadsheets",
        slides: [
            { title: "Welcome to Week 3!", content: "This week, we'll explore Microsoft Excel and learn how to use spreadsheets." },
            { title: "What Is Microsoft Excel?", content: "Excel is a spreadsheet program for organizing and analyzing data." },
            { title: "Opening Microsoft Excel", content: "Locate and open Excel from the Start menu or desktop." },
            { title: "Understanding Spreadsheets", content: "Learn about rows, columns, and cells in Excel." },
            { title: "Entering Data", content: "Type data into cells to create a simple table." },
            { title: "Saving Your Spreadsheet", content: "Save your Excel file in a specific folder." },
            { title: "Basic Formatting", content: "Adjust cell sizes and apply basic formatting like bold or colors." },
            { title: "Simple Calculations (SUM)", content: "Use the SUM function to add numbers in a column." },
            { title: "Creating an Expense Tracker", content: "Build a basic expense tracker with categories and totals." },
            { title: "Checking Your Work", content: "Review your spreadsheet for accuracy." },
            { title: "Practical Activity", content: "Create an expense tracker and calculate totals." },
            { title: "Why This Matters", content: "Spreadsheets help you manage budgets and data efficiently." },
            { title: "Q&A and Homework", content: "Ask questions and create a simple budget at home." }
        ]
    },
    {
        title: "Module 4: Email Setup and Communication",
        slides: [
            { title: "Welcome to Week 4!", content: "This week, we'll set up and use email for communication." },
            { title: "What Is Email?", content: "Email is a digital way to send and receive messages." },
            { title: "Opening Gmail", content: "Access Gmail through a web browser." },
            { title: "Creating a Gmail Account", content: "Sign up for a free Gmail account with a username and password." },
            { title: "Understanding the Gmail Inbox", content: "Learn to navigate the Gmail interface and read emails." },
            { title: "Writing an Email", content: "Compose and send a professional email with a subject and body." },
            { title: "Attaching a File", content: "Attach a document or image to an email." },
            { title: "Replying to an Email", content: "Reply to an email you receive." },
            { title: "Organizing Your Inbox", content: "Use labels and folders to keep your emails organized." },
            { title: "Checking Your Work", content: "Ensure your emails are clear and correctly sent." },
            { title: "Practical Activity", content: "Send an email with an attachment to a friend." },
            { title: "Why This Matters", content: "Email is a key tool for professional and personal communication." },
            { title: "Q&A and Homework", content: "Ask questions and practice sending emails." }
        ]
    },
    {
        title: "Module 5: Internet and Online Safety",
        slides: [
            { title: "Welcome to Week 5!", content: "This week, we'll learn to use the internet safely." },
            { title: "What Is the Internet?", content: "The internet is a global network connecting computers." },
            { title: "Opening Google Chrome", content: "Open the Google Chrome browser from the Start menu." },
            { title: "Understanding a Web Browser", content: "Learn how browsers help you access websites." },
            { title: "Searching the Internet", content: "Use Google to search for information online." },
            { title: "Saving Favorite Websites", content: "Bookmark websites for quick access later." },
            { title: "Staying Safe Online", content: "Learn tips to protect your personal information." },
            { title: "Recognizing Phishing Emails", content: "Identify suspicious emails that may harm your computer." },
            { title: "Safe Browsing Habits", content: "Avoid risky websites and keep your data secure." },
            { title: "Practical Activity", content: "Search for a topic and bookmark a useful website." },
            { title: "Why This Matters", content: "Safe internet use protects you and your information." },
            { title: "Q&A and Homework", content: "Ask questions and practice safe browsing." }
        ]
    },
    {
        title: "Module 6: Advanced Spreadsheets",
        slides: [
            { title: "Welcome to Week 6!", content: "This week, we'll dive deeper into Excel with advanced features." },
            { title: "Why Advanced Spreadsheets?", content: "Advanced Excel skills help with complex data tasks." },
            { title: "Reviewing Excel Basics", content: "Refresh your knowledge of cells, rows, and basic functions." },
            { title: "Using the IF Formula", content: "Use IF to make decisions based on data conditions." },
            { title: "Using VLOOKUP", content: "Search for data in a table with VLOOKUP." },
            { title: "Creating a Chart", content: "Visualize data with a simple chart in Excel." },
            { title: "Sorting Data", content: "Organize data alphabetically or numerically." },
            { title: "Filtering Data", content: "Filter data to focus on specific information." },
            { title: "Creating a Payment Schedule", content: "Build a payment schedule using Excel formulas." },
            { title: "Saving and Reviewing", content: "Save and check your spreadsheet for accuracy." },
            { title: "Practical Activity", content: "Create a payment schedule with charts and formulas." },
            { title: "Why This Matters", content: "Advanced Excel skills are valuable in business and finance." },
            { title: "Q&A and Homework", content: "Ask questions and practice advanced Excel tasks." }
        ]
    },
    {
        title: "Module 7: Creating Presentations",
        slides: [
            { title: "Welcome to Week 7!", content: "This week, we'll create presentations using PowerPoint." },
            { title: "What Is Microsoft PowerPoint?", content: "PowerPoint is a tool for creating visual presentations." },
            { title: "Opening Microsoft PowerPoint", content: "Find and open PowerPoint from the Start menu." },
            { title: "Understanding PowerPoint", content: "Learn about slides, layouts, and the PowerPoint interface." },
            { title: "Creating a New Slide", content: "Add a new slide with a chosen layout." },
            { title: "Adding Text to a Slide", content: "Insert text boxes and format text on slides." },
            { title: "Inserting an Image", content: "Add images to make your slides engaging." },
            { title: "Using Templates", content: "Apply a template for a professional look." },
            { title: "Creating a 3-Slide Presentation", content: "Build a short presentation with text and images." },
            { title: "Saving and Presenting", content: "Save your presentation and practice presenting." },
            { title: "Practical Activity", content: "Create and present a 3-slide presentation." },
            { title: "Why This Matters", content: "Presentations are key for sharing ideas effectively." },
            { title: "Q&A and Homework", content: "Ask questions and create a short presentation." }
        ]
    },
    {
        title: "Module 8: Virtual Meetings",
        slides: [
            { title: "Welcome to Week 8!", content: "This week, we'll learn to use Zoom for virtual meetings." },
            { title: "What Is Zoom?", content: "Zoom is a platform for video and audio meetings online." },
            { title: "Opening Zoom", content: "Open Zoom from your computer or browser." },
            { title: "Joining a Zoom Meeting", content: "Enter a meeting ID to join a Zoom call." },
            { title: "Using Zoom Controls", content: "Learn to mute, unmute, and turn video on/off." },
            { title: "Sharing Your Screen", content: "Share your screen to show documents or slides." },
            { title: "Scheduling a Meeting", content: "Set up your own Zoom meeting with a link." },
            { title: "Testing Your Audio and Video", content: "Check your microphone and camera before joining." },
            { title: "Etiquette for Zoom Meetings", content: "Learn best practices for professional meetings." },
            { title: "Practical Activity", content: "Join a test Zoom meeting and share your screen." },
            { title: "Why This Matters", content: "Virtual meetings are essential for remote work." },
            { title: "Q&A and Homework", content: "Ask questions and practice setting up a Zoom call." }
        ]
    },
    {
        title: "Module 9: Cloud Storage and Collaboration",
        slides: [
            { title: "Welcome to Week 9!", content: "This week, we'll explore Google Drive for storage and collaboration." },
            { title: "What Is Google Drive?", content: "Google Drive is a cloud storage service for files." },
            { title: "Accessing Google Drive", content: "Log in to Google Drive with your Gmail account." },
            { title: "Understanding Google Drive", content: "Learn to navigate folders and files in Google Drive." },
            { title: "Uploading a File", content: "Upload a document or image to Google Drive." },
            { title: "Creating a Folder", content: "Organize files by creating folders in Google Drive." },
            { title: "Sharing a File", content: "Share files with others via a link or email." },
            { title: "Collaborating on a File", content: "Work with others on a document in real-time." },
            { title: "Downloading a File", content: "Download files from Google Drive to your computer." },
            { title: "Practical Activity", content: "Upload, share, and collaborate on a file." },
            { title: "Why This Matters", content: "Cloud storage enables easy access and teamwork." },
            { title: "Q&A and Homework", content: "Ask questions and practice using Google Drive." }
        ]
    },
    {
        title: "Module 10: Working with PDFs",
        slides: [
            { title: "Welcome to Week 10!", content: "This week, we'll learn to work with PDF files." },
            { title: "What Is a PDF?", content: "A PDF is a portable document format for sharing files." },
            { title: "Opening Adobe Acrobat Reader", content: "Open Adobe Acrobat Reader to view PDFs." },
            { title: "Opening a PDF", content: "Learn to open a PDF file in Acrobat Reader." },
            { title: "Navigating a PDF", content: "Use tools to zoom and scroll through a PDF." },
            { title: "Highlighting Text", content: "Highlight important text in a PDF." },
            { title: "Adding Comments", content: "Add notes or comments to a PDF file." },
            { title: "Saving an Edited PDF", content: "Save your changes to a PDF file." },
            { title: "Emailing a PDF", content: "Attach a PDF to an email for sharing." },
            { title: "Practical Activity", content: "Open, edit, and email a PDF file." },
            { title: "Why This Matters", content: "PDFs are widely used for professional documents." },
            { title: "Q&A and Homework", content: "Ask questions and practice editing a PDF." }
        ]
    },
    {
        title: "Module 11: Document and Spreadsheet Integration",
        slides: [
            { title: "Welcome to Week 11!", content: "This week, we'll combine Word and Excel skills." },
            { title: "Why Combine Tools?", content: "Using Word and Excel together enhances productivity." },
            { title: "Reviewing Word and Excel", content: "Refresh your skills in both programs." },
            { title: "Creating a Data Table in Excel", content: "Build a table with data in Excel." },
            { title: "Creating a Chart in Excel", content: "Create a chart to visualize your data." },
            { title: "Copying a Chart to Word", content: "Paste an Excel chart into a Word document." },
            { title: "Writing a Report in Word", content: "Write a report incorporating your chart." },
            { title: "Saving Your Report", content: "Save your integrated report in Word." },
            { title: "Uploading to Google Drive", content: "Upload your report to Google Drive." },
            { title: "Practical Activity", content: "Create a report with an Excel chart and upload it." },
            { title: "Why This Matters", content: "Integration skills are key for professional reports." },
            { title: "Q&A and Homework", content: "Ask questions and practice creating a report." }
        ]
    },
    {
        title: "Module 12: Capstone Project and Review",
        slides: [
            { title: "Welcome to Week 12!", content: "This week, we'll complete a capstone project." },
            { title: "What Is the Capstone Project?", content: "Combine all skills in a final project." },
            { title: "Step 1 – Create an Excel Table", content: "Build a data table in Excel." },
            { title: "Step 2 – Write a Report in Word", content: "Write a report using your Excel data." },
            { title: "Step 3 – Save as PDF", content: "Convert your report to a PDF." },
            { title: "Step 4 – Create a Presentation", content: "Make a PowerPoint to present your report." },
            { title: "Step 5 – Upload to Google Drive", content: "Upload your files to Google Drive." },
            { title: "Step 6 – Share via Email", content: "Email your project files." },
            { title: "Step 7 – Present in Zoom", content: "Present your project in a Zoom meeting." },
            { title: "Practical Activity", content: "Complete and present your capstone project." },
            { title: "Review of Skills", content: "Review all skills learned in the course." },
            { title: "Why This Matters", content: "These skills prepare you for real-world tasks." },
            { title: "Q&A and Next Steps", content: "Ask questions and plan your next learning steps." }
        ]
    },
    {
        title: "Module 13: Artificial Intelligence",
        slides: [
            { title: "Welcome to AI", content: "This week, we'll explore the basics of Artificial Intelligence." },
            { title: "What is Artificial Intelligence?", content: "AI is the simulation of human intelligence in machines, enabling tasks like learning and problem-solving." },
            { title: "AI in Everyday Life", content: "Discover how AI powers virtual assistants, recommendations, and more." },
            { title: "Simple AI Tools", content: "Explore beginner-friendly AI tools like chatbots and image recognition." },
            { title: "The Future of AI", content: "Learn about AI's potential impact on jobs and society." },
            { title: "Q&A and Homework", content: "Ask questions and try a simple AI tool at home." }
        ]
    }
];

const welcomeSlide = {
    title: "Welcome to Tujengane Computer Literacy",
    content: "Welcome to our 12-week digital skills course by EXES BI! To get started, click on a module in the sidebar to explore its lessons. Use the navigation buttons below to move through slides."
};

let currentModule = null;
let currentSlide = 0;
let isSidebarOpen = false;

const slideContainer = document.getElementById('slide-container');
const currentSlideDisplay = document.getElementById('current-slide');
const totalSlidesDisplay = document.getElementById('total-slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.getElementById('nav-links');

function updateSlide(moduleIndex, slideIndex) {
    const slide = moduleIndex !== null ? modules[moduleIndex].slides[slideIndex] : welcomeSlide;
    slideContainer.innerHTML = `
        <div class="slide-content">
            <h2>${slide.title}</h2>
            <p>${slide.content}</p>
        </div>
    `;
    slideContainer.classList.add('active');

    if (moduleIndex !== null) {
        currentSlideDisplay.textContent = slideIndex + 1;
        totalSlidesDisplay.textContent = modules[moduleIndex].slides.length;
        prevBtn.disabled = slideIndex === 0;
        nextBtn.disabled = slideIndex === modules[moduleIndex].slides.length - 1 && moduleIndex === modules.length - 1;
    } else {
        currentSlideDisplay.textContent = 0;
        totalSlidesDisplay.textContent = 0;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active');
    });
    if (moduleIndex !== null) {
        const activeLink = document.querySelector(`.sidebar-link[data-module="${moduleIndex}"][data-slide="${slideIndex}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.parentElement.classList.add('active');
        }
    }
}

function toggleModule(moduleIndex) {
    const moduleToggles = document.querySelectorAll('.module-toggle');
    const moduleSlides = document.querySelectorAll('.module-slides');

    moduleToggles.forEach((toggle, index) => {
        if (index === moduleIndex) {
            toggle.classList.toggle('collapsed');
            moduleSlides[index].classList.toggle('open', !toggle.classList.contains('collapsed'));
            toggle.classList.remove('hidden');
        } else {
            toggle.classList.add('hidden');
            moduleSlides[index].classList.remove('open');
        }
    });

    if (moduleIndex !== null && moduleToggles[moduleIndex].classList.contains('collapsed')) {
        currentModule = null;
        currentSlide = 0;
        updateSlide(null, 0);
        moduleToggles.forEach(toggle => toggle.classList.remove('hidden'));
    } else if (moduleIndex !== null) {
        currentModule = moduleIndex;
        currentSlide = 0;
        updateSlide(moduleIndex, 0);
    }
}

function handlePrev() {
    if (currentModule !== null && currentSlide > 0) {
        currentSlide--;
        updateSlide(currentModule, currentSlide);
    }
}

function handleNext() {
    if (currentModule !== null) {
        if (currentSlide < modules[currentModule].slides.length - 1) {
            currentSlide++;
            updateSlide(currentModule, currentSlide);
        } else if (currentModule < modules.length - 1) {
            currentModule++;
            currentSlide = 0;
            toggleModule(currentModule);
            updateSlide(currentModule, 0);
        }
    }
}

document.querySelectorAll('.module-toggle').forEach((toggle, index) => {
    toggle.addEventListener('click', () => toggleModule(index));
    toggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleModule(index);
        }
    });
});

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const moduleIndex = parseInt(link.dataset.module);
        const slideIndex = parseInt(link.dataset.slide);
        currentModule = moduleIndex;
        currentSlide = slideIndex;
        toggleModule(moduleIndex);
        updateSlide(moduleIndex, slideIndex);
    });
});

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

hamburgerBtn.addEventListener('click', () => {
    isSidebarOpen = !isSidebarOpen;
    sidebar.classList.toggle('active', isSidebarOpen);
    navLinks.classList.toggle('mobile-active', isSidebarOpen);
});

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatOverlay = document.getElementById('chatOverlay');
    chatWidget.classList.toggle('hidden');
    chatOverlay.classList.toggle('hidden');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.getElementById('chatOverlay').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById('chatOverlay').classList.add('hidden');
}

updateSlide(null, 0);