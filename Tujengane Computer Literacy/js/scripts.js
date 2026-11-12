// Course content is NOT bundled in this file. The server returns it from /api/literacy only after
// the course password has been verified (see api/ and README.md), then it is assigned here.
let modules = [];

// Celebration helpers (non-destructive) — reuse confetti library and cheerAudio in page
var _confettiIntervalCL = null;
function startCelebrationCL() {
    if (_confettiIntervalCL) return;
    var particleCount = window.innerWidth < 600 ? 40 : 80;
    _confettiIntervalCL = setInterval(function(){ if (typeof confetti === 'function') confetti({ particleCount: particleCount, spread: 100, origin: { y: 0.6 } }); }, 800);
    try { var cheer = document.getElementById('cheerAudio'); if (cheer) { cheer.loop = true; cheer.volume = 0.7; cheer.play().catch(function(){}); } } catch(e) {}
}
function stopCelebrationCL() {
    if (_confettiIntervalCL) { clearInterval(_confettiIntervalCL); _confettiIntervalCL = null; }
    try { var cheer = document.getElementById('cheerAudio'); if (cheer) { cheer.pause(); cheer.currentTime = 0; } } catch(e) {}
}

const welcomeSlide = {
    title: "Welcome to Tujengane Computer Literacy",
    content: `
    <div class="welcome-block" style="padding:1.2rem 0.5rem 1rem 0.5rem; text-align:center; max-width: 98vw; min-height: 0;">
        <div style="font-size:1rem; color:#333; margin-bottom:1rem;">
            Welcome to our 13-week digital skills course by <strong>dericBI</strong>!<br>
            <span style="color:#256d4f; font-weight:600;">Choose your next step below or use the sidebar to explore modules.</span>
        </div>
        <div class="welcome-links" style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.7rem; margin-bottom:1.2rem;">
            <a href="../Tujengane Analyst Pro/analystpro.html" class="welcome-card" style="background:#facc15; color:#1e293b; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;">
                <i class="fas fa-chart-bar" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Aspiring Data Analysts<br><span style="font-weight:400; font-size:0.9rem;">Go to Data literacy</span>
            </a>
            <a href="../computer basicss/computerbasicss.html" class="welcome-card" style="background:#49A078; color:#fff; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;">
                <i class="fas fa-database" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Computer Basics <br><span style="font-weight:400; font-size:0.9rem;">Go to Data Basics</span>
            </a>
            <a href="https://dericbi.vercel.app/" target="_blank" class="welcome-card" style="background:#256d4f; color:#fff; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;" rel="noopener noreferrer">
                <i class="fas fa-rocket" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Professional Analysis<br><span style="font-weight:400; font-size:0.9rem;">Visit dericBI</span>
            </a>
        </div>
        <div style="font-size:0.93rem; color:#666; margin-bottom:0.7rem;">
            <strong>Instructions:</strong> Use the sidebar to select a module and start your journey. Each module contains step-by-step lessons and practical activities.<br>
            <span style="color:#256d4f;">Ready to grow your digital skills? Start now!</span>
        </div>
        <div style="font-size:0.9rem; color:#888; margin-top:0.5rem;">
            <em>dericBI – Empowering your future with practical digital skills.</em>
        </div>
    </div>
    `
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

function updateSlide(moduleIndex, slideIndex) {
    // Ensure any running celebration is stopped when switching slides
    try { stopCelebrationCL(); } catch (e) {}

    const slide = moduleIndex !== null ? modules[moduleIndex].slides[slideIndex] : welcomeSlide;
    slideContainer.innerHTML = `
        <div class="slide-content">
            <h2>${slide.title}</h2>
            ${slide.content}
        </div>
    `;
    slideContainer.classList.add('active');

    if (moduleIndex !== null) {
        currentSlideDisplay.textContent = slideIndex + 1;
        totalSlidesDisplay.textContent = modules[moduleIndex].slides.length;
        prevBtn.disabled = slideIndex === 0;
        nextBtn.disabled = slideIndex === modules[moduleIndex].slides.length - 1 && moduleIndex === modules.length - 1;
        document.querySelector('.navigation').classList.remove('hidden');
        document.getElementById('slide-number-display').classList.remove('hidden');
    // Include module number in the visible slide counter (non-destructive change)
    document.getElementById('slide-number-display').textContent = `Module ${moduleIndex + 1} — ${modules[moduleIndex].title} - Slide ${slideIndex + 1} of ${modules[moduleIndex].slides.length}`;

        // If this is the last slide of the last module, start celebration
        if (moduleIndex === modules.length - 1 && slideIndex === modules[moduleIndex].slides.length - 1) {
            try { 
                startCelebrationCL(); 
                // Initialize certificate request functionality if it exists
                initializeCertificateRequest();
            } catch (e) {}
        }
    } else {
        currentSlideDisplay.textContent = 0;
        totalSlidesDisplay.textContent = 0;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        document.querySelector('.navigation').classList.add('hidden');
        document.getElementById('slide-number-display').classList.add('hidden');
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

// Small helper: set visible sidebar numbers to "module.slide" (e.g., 2.3) based on data attributes.
// This updates the existing <span class="slide-number"> elements at runtime and is intentionally non-destructive.
function setSidebarNumbersCL() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        try {
            var mod = parseInt(link.dataset.module, 10);
            var sl = parseInt(link.dataset.slide, 10);
            var span = link.querySelector('.slide-number');
            if (!isNaN(mod) && !isNaN(sl) && span) {
                span.textContent = `${mod + 1}.${sl + 1}.`;
            }
        } catch (e) { /* ignore and leave original numbering */ }
    });
}

// Run once on load to tidy sidebar numbering.
try { setSidebarNumbersCL(); } catch (e) {}

// Certificate request functionality (from Data Basics system)
function initializeCertificateRequest() {
    const nameInput = document.getElementById('full-name-input');
    const certLink = document.getElementById('certificate-link');
    if (nameInput && certLink) {
        nameInput.addEventListener('input', () => {
            const fullName = encodeURIComponent(nameInput.value.trim());
            certLink.href = `https://wa.me/254791360805?text=I%20am%20requesting%20my%20certificate%20for%20completing%20Computer%20Literacy&name=${fullName}`;
            // Ensure the WhatsApp link opens in a new tab/window
            try { certLink.target = '_blank'; certLink.rel = 'noopener noreferrer'; } catch (e) {}
        });
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

function ensureModuleOpen(moduleIndex) {
    if (moduleIndex === null) return;
    
    const moduleToggles = document.querySelectorAll('.module-toggle');
    const moduleSlides = document.querySelectorAll('.module-slides');

    moduleToggles.forEach((toggle, index) => {
        if (index === moduleIndex) {
            // Force module to be open (remove collapsed class)
            toggle.classList.remove('collapsed');
            moduleSlides[index].classList.add('open');
            toggle.classList.remove('hidden');
        } else {
            toggle.classList.add('hidden');
            moduleSlides[index].classList.remove('open');
        }
    });
}

function handlePrev() {
    if (isNavigating) {
        showDisabledFeedback('prev');
        return;
    }
    
    // If on welcome screen, show disabled feedback
    if (currentModule === null) {
        showDisabledFeedback('prev');
        return;
    }
    
    if (currentModule !== null && currentSlide > 0) {
        isNavigating = true;
        currentSlide--;
        updateSlide(currentModule, currentSlide);
        setTimeout(() => { isNavigating = false; }, navigationDelay);
    } else {
        // Show disabled feedback when at beginning
        showDisabledFeedback('prev');
    }
}

function handleNext() {
    if (isNavigating) {
        showDisabledFeedback('next');
        return;
    }
    
    // If on welcome screen, go to first module (Module 1)
    if (currentModule === null) {
        isNavigating = true;
        currentModule = 0; // First module
        currentSlide = 0;  // First slide
        ensureModuleOpen(currentModule);
        updateSlide(currentModule, currentSlide);
        setTimeout(() => { isNavigating = false; }, navigationDelay);
        return;
    }
    
    if (currentModule !== null) {
        if (currentSlide < modules[currentModule].slides.length - 1) {
            isNavigating = true;
            currentSlide++;
            updateSlide(currentModule, currentSlide);
            setTimeout(() => { isNavigating = false; }, navigationDelay);
        } else if (currentModule < modules.length - 1) {
            isNavigating = true;
            currentModule++;
            currentSlide = 0;
            ensureModuleOpen(currentModule);
            updateSlide(currentModule, 0);
            setTimeout(() => { isNavigating = false; }, navigationDelay);
        } else {
            // Show disabled feedback when at end
            showDisabledFeedback('next');
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
        updateSlide(moduleIndex, slideIndex);
    });
});

prevBtn.addEventListener('click', () => {
    showNavigationFeedback('prev');
    handlePrev();
});
nextBtn.addEventListener('click', () => {
    showNavigationFeedback('next');
    handleNext();
});

hamburgerBtn.addEventListener('click', () => {
    isSidebarOpen = !isSidebarOpen;
    sidebar.classList.toggle('active', isSidebarOpen);
});

// Mobile navigation functionality
function setupMobileNavigation() {
    const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');
    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const floatingHomeBtn = document.getElementById('floatingHomeBtn');
    
    // Mobile navigation trigger - use floating home button
    if (floatingHomeBtn) {
        floatingHomeBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            mobileNavDropdown.classList.toggle('active');
        });
    }
    
    // Close mobile nav when clicking backdrop
    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', () => {
            mobileNavDropdown.classList.remove('active');
        });
    }
    
    // Close mobile nav when clicking close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNavDropdown.classList.remove('active');
        });
    }
    
    // Close mobile nav when clicking any link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavDropdown.classList.remove('active');
        });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = mobileNavDropdown.contains(e.target);
        const isHomeButtonClick = floatingHomeBtn && floatingHomeBtn.contains(e.target);
        
        if (!isClickInsideNav && !isHomeButtonClick && mobileNavDropdown.classList.contains('active')) {
            mobileNavDropdown.classList.remove('active');
        }
    });
    
    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavDropdown.classList.contains('active')) {
            mobileNavDropdown.classList.remove('active');
        }
    });
}

document.addEventListener('click', (e) => {
    if (isSidebarOpen && !sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        isSidebarOpen = false;
        sidebar.classList.remove('active');
    }
});

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatOverlay = document.getElementById('chatOverlay');
    chatWidget.classList.toggle('hidden');
    chatOverlay.classList.toggle('hidden');
}

// Add click outside functionality for chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatOverlay = document.getElementById('chatOverlay');
    const chatWidget = document.getElementById('chatWidget');
    
    if (chatOverlay) {
        chatOverlay.addEventListener('click', function() {
            chatWidget.classList.add('hidden');
            chatOverlay.classList.add('hidden');
        });
    }
});

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.getElementById('chatOverlay').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById('chatOverlay').classList.add('hidden');
}

// Show welcome only if no module is open at start
if (currentModule === null && currentSlide === 0) {
    updateSlide(null, 0);
}

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const slideContainerWrapper = document.querySelector('.slide-container-wrapper');
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const navigation = document.querySelector('.navigation');
    const footer = document.querySelector('.footer');
    const layout = document.querySelector('.layout');

    if (isLandscape && window.innerWidth <= 768) {
        slideContainerWrapper.style.paddingBottom = '250px';
        chatButton.style.bottom = '120px';
        chatButton.style.zIndex = '60';
        chatWidget.style.bottom = '140px';
        chatWidget.style.zIndex = '60';
        navigation.style.bottom = '0';
        navigation.style.zIndex = '50';
        footer.style.position = 'relative';
        layout.style.marginBottom = '0';
    } else if (isLandscape && window.innerWidth <= 480) {
        slideContainerWrapper.style.paddingBottom = '200px';
        chatButton.style.bottom = '100px';
        chatButton.style.zIndex = '60';
        chatWidget.style.bottom = '120px';
        chatWidget.style.zIndex = '60';
        navigation.style.bottom = '0';
        navigation.style.zIndex = '50';
        footer.style.position = 'relative';
        layout.style.marginBottom = '0';
    } else {
        // Reset to default
        slideContainerWrapper.style.paddingBottom = '';
        chatButton.style.bottom = '';
        chatButton.style.zIndex = '';
        chatWidget.style.bottom = '';
        chatWidget.style.zIndex = '';
        navigation.style.bottom = '';
        navigation.style.zIndex = '';
        footer.style.position = '';
        layout.style.marginBottom = '';
    }
}

// Call on load and resize
checkOrientation();
window.addEventListener('resize', checkOrientation);

// Password protection and authentication functions
function initializePasswordProtection() {
    // Access is verified by the server (api/literacy.js). No password or course content lives in this file.
    var COURSE_API = '/api/literacy';
    var tries = 0;

    function unlockCourse(data) {
        modules = data.modules;
        document.body.style.display = '';
    }

    function showWhatsAppOverlay(){
        var waUrl = 'https://wa.me/254791360805?text=' + encodeURIComponent('Hey, I am requesting for the password to access Tujengane Computer Literacy.');
        var wrapper = document.createElement('div');
        wrapper.id = 'waIframeWrapper';
        wrapper.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;';

        var bgFrame = document.createElement('iframe');
        bgFrame.src = '../index.html';
        bgFrame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
        bgFrame.setAttribute('aria-hidden','true');

        var backdrop = document.createElement('div');
        backdrop.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.42);backdrop-filter:blur(2px);pointer-events:none;';

        var box = document.createElement('div');
        box.style.cssText = 'position:relative;max-width:520px;width:100%;background:linear-gradient(180deg, rgba(20,20,20,0.95), rgba(18,18,18,0.96));color:#fff;padding:18px;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.5);font-family:system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;z-index:100002;';
        box.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:12px;">
                <div style="flex:1;min-width:0">
                    <div style="font-weight:800;font-size:1.05rem;color:#fff;">Access blocked</div>
                    <div style="margin-top:6px;color:#ddd;font-size:0.95rem;line-height:1.25">We couldn't verify your access. Use the button below to message us on WhatsApp to request access. You must click the link to open WhatsApp.</div>
                </div>
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;align-items:center;">
                <a id="waOpenLink" href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:700;">Open WhatsApp</a>
                <button id="waCopyBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff;padding:9px 12px;border-radius:8px;cursor:pointer;">Copy link</button>
                <button id="waCancelBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff;padding:9px 12px;border-radius:8px;cursor:pointer;">Cancel</button>
            </div>
        `;

        wrapper.appendChild(bgFrame);
        wrapper.appendChild(backdrop);
        wrapper.appendChild(box);
        document.documentElement.appendChild(wrapper);

        var toast = document.createElement('div');
        toast.id = 'waToast';
        toast.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:36px;background:rgba(0,0,0,0.8);color:#fff;padding:8px 12px;border-radius:8px;z-index:100003;display:none;font-size:0.95rem;';
        toast.textContent = 'Link copied to clipboard';
        document.documentElement.appendChild(toast);

        document.getElementById('waCopyBtn').addEventListener('click', function(){
            try {
                navigator.clipboard.writeText(waUrl).then(function(){
                    toast.style.display = 'block';
                    setTimeout(function(){ toast.style.display='none'; }, 1800);
                }, function(){
                    var ta = document.createElement('textarea'); ta.value = waUrl; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast.style.display='block'; setTimeout(function(){ toast.style.display='none'; },1800); } catch(e){} ta.remove();
                });
            } catch(e){
                var ta = document.createElement('textarea'); ta.value = waUrl; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast.style.display='block'; setTimeout(function(){ toast.style.display='none'; },1800); } catch(err){} ta.remove();
            }
        });
        document.getElementById('waCancelBtn').addEventListener('click', function(){ window.location.href = '../index.html'; });
    }

    function askPassword() {
        // Visual wrapper/backdrop/box pattern (matches the WhatsApp overlay visual)
        var wrapper = document.createElement('div');
        wrapper.id = 'pwModalWrapper';
        wrapper.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;';

        var bgFrame = document.createElement('iframe');
        bgFrame.src = '../index.html';
        bgFrame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
        bgFrame.setAttribute('aria-hidden','true');

        var backdrop = document.createElement('div');
        backdrop.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.42);backdrop-filter:blur(2px);pointer-events:none;';

        var box = document.createElement('div');
        box.style.cssText = 'position:relative;max-width:520px;width:100%;background:linear-gradient(180deg, rgba(20,20,20,0.95), rgba(18,18,18,0.96));color:#fff;padding:18px;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.5);font-family:system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;z-index:100002;';
        box.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:12px;">
                <div style="flex:1;min-width:0">
                    <div style="font-weight:800;font-size:1.05rem;color:#fff;">Authorized access</div>
                    <div style="margin-top:6px;color:#ddd;font-size:0.95rem;line-height:1.25">This section is for authorized users only. Enter the password to continue.</div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px;">
                <div style="display:flex;gap:8px;align-items:center;min-width:0;">
                    <input id="pwInput" type="password" placeholder="Password" style="flex:1;min-width:0;padding:10px;border:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.26);color:#fff;border-radius:8px;font-size:1rem;">
                    <button id="pwToggle" aria-label="Show password" style="background:transparent;border:0;font-size:1.1rem;cursor:pointer;color:#fff;opacity:0.95;margin-left:6px;flex:0 0 auto;">👁️</button>
                </div>
                <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:nowrap;">
                    <button id="pwCancel" style="background:transparent;border:1px solid rgba(255,255,255,0.12);padding:9px 12px;border-radius:8px;cursor:pointer;color:#fff;flex:0 0 auto;white-space:nowrap;">Cancel</button>
                    <button id="pwSubmit" style="background:#49A078;color:#fff;border:0;padding:10px 14px;border-radius:8px;cursor:pointer;font-weight:700;flex:0 0 auto;white-space:nowrap;">Submit</button>
                </div>
            </div>
        `;

        wrapper.appendChild(bgFrame);
        wrapper.appendChild(backdrop);
        wrapper.appendChild(box);
        document.documentElement.appendChild(wrapper);

        var pwInput = document.getElementById('pwInput');
        if (pwInput) pwInput.focus();

        function cleanup(){ var w = document.getElementById('pwModalWrapper'); if (w) w.remove(); }

        document.getElementById('pwToggle').addEventListener('click', function(){
            if (pwInput.type === 'password') { pwInput.type = 'text'; this.textContent = '🙈'; } else { pwInput.type = 'password'; this.textContent = '👁️'; }
            pwInput.focus();
        });

        document.getElementById('pwCancel').addEventListener('click', function(){ cleanup(); window.location.href = '../index.html'; });

        var submitBtn = document.getElementById('pwSubmit');
        submitBtn.addEventListener('click', function(){
            var input = (pwInput && pwInput.value) ? pwInput.value : '';
            submitBtn.disabled = true;
            fetch(COURSE_API, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: input })
            }).then(function(res){
                return res.json().catch(function(){ return {}; }).then(function(data){
                    return { status: res.status, data: data };
                });
            }).then(function(result){
                if (result.status === 200 && result.data && Array.isArray(result.data.modules)) {
                    cleanup();
                    unlockCourse(result.data);
                    return;
                }
                // wrong password, throttled (429) or server not configured (503)
                tries++;
                cleanup();
                if (tries >= 2 || result.status === 429 || result.status === 503) { showWhatsAppOverlay(); return; }
                askPassword();
            }).catch(function(){
                tries++;
                cleanup();
                if (tries >= 2) { showWhatsAppOverlay(); return; }
                askPassword();
            });
        });

        if (pwInput) {
            pwInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') { document.getElementById('pwSubmit').click(); } });
        }
    }

    document.body.style.display = 'none';
    // Returning visitor with a valid server session? Skip the prompt (replaces the old browser-side flag).
    fetch(COURSE_API, { credentials: 'same-origin', cache: 'no-store' })
        .then(function(res){ if (!res.ok) { throw new Error('locked'); } return res.json(); })
        .then(unlockCourse)
        .catch(function(){ askPassword(); });
}

// Chat widget functionality
function setupChatWidget() {
    // Close chat widget when clicking outside
    document.addEventListener('mousedown', function(event) {
        const chatWidget = document.getElementById('chatWidget');
        const chatButton = document.getElementById('chatButton');
        if (!chatWidget.classList.contains('hidden')) {
            if (!chatWidget.contains(event.target) && !chatButton.contains(event.target)) {
                chatWidget.classList.add('hidden');
            }
        }
    });
}

// Floating home button functionality
function setupFloatingHomeButton() {
    // Show floating Home button only on small screens
    function toggleFloatingHomeBtn() {
        var btn = document.getElementById('floatingHomeBtn');
        if (!btn) return;
        if (window.innerWidth <= 768) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }
    window.addEventListener('resize', toggleFloatingHomeBtn);
    window.addEventListener('DOMContentLoaded', toggleFloatingHomeBtn);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePasswordProtection();
    setupChatWidget();
    setupFloatingHomeButton();
    setupMobileNavigation();
    initializeSwipeNavigation();
    initializeKeyboardNavigation();
});

// Touch swipe navigation variables
let touchStartX = null;
let touchStartY = null;
let touchEndX = null;
let touchEndY = null;
let isNavigating = false;
const minSwipeDistance = 50;
const navigationDelay = 300; // Prevent too rapid navigation

// Visual feedback functions
function showNavigationFeedback(direction) {
    const feedbackId = direction === 'prev' ? 'nav-feedback-left' : 'nav-feedback-right';
    const feedbackEl = document.getElementById(feedbackId);
    if (feedbackEl) {
        // Clear any existing timeout
        if (feedbackEl.hideTimeout) {
            clearTimeout(feedbackEl.hideTimeout);
        }
        
        feedbackEl.classList.add('show');
        
        // Auto-hide after a delay
        feedbackEl.hideTimeout = setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 1200);
    }
}

// Add visual feedback for disabled navigation
function showDisabledFeedback(direction) {
    const feedbackId = direction === 'prev' ? 'nav-feedback-left' : 'nav-feedback-right';
    const feedbackEl = document.getElementById(feedbackId);
    if (feedbackEl) {
        const originalBg = feedbackEl.style.background;
        feedbackEl.style.background = 'rgba(156, 163, 175, 0.9)';
        feedbackEl.classList.add('show');
        
        setTimeout(() => {
            feedbackEl.classList.remove('show');
            feedbackEl.style.background = originalBg;
        }, 600);
    }
}

// Touch event handlers for swipe navigation
// A swipe that starts inside something that scrolls sideways (code block, wide table) must scroll it, not change the slide.
function startsInHorizontalScroller(el) {
    for (; el && el !== document.body; el = el.parentElement) {
        if (el.scrollWidth > el.clientWidth + 1) {
            const ox = getComputedStyle(el).overflowX;
            if (ox === 'auto' || ox === 'scroll') return true;
        }
    }
    return false;
}

function handleTouchStart(e) {
    // Only handle single finger touches; ignore swipes that start inside a sideways-scrolling block
    if (e.touches.length !== 1 || startsInHorizontalScroller(e.target)) {
        touchStartX = null;
        touchStartY = null;
        return;
    }
    
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    // Only handle single finger touches
    if (e.changedTouches.length !== 1) return;
    if (touchStartX === null || touchStartY === null) return;
    
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Check if it's a horizontal swipe (not vertical scroll)
    // Require more horizontal movement than vertical to avoid interfering with scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > minSwipeDistance) {
        // Prevent default behavior for horizontal swipes
        e.preventDefault();
        
        if (deltaX > 0) {
            // Swipe right - go to previous slide
            showNavigationFeedback('prev');
            handlePrev();
        } else {
            // Swipe left - go to next slide  
            showNavigationFeedback('next');
            handleNext();
        }
    }
    
    // Reset touch variables
    touchStartX = null;
    touchStartY = null;
    touchEndX = null;
    touchEndY = null;
}

// Handle touch move to prevent scrolling during horizontal swipes
function handleTouchMove(e) {
    if (touchStartX === null || touchStartY === null) return;
    
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
    
    const deltaX = touchMoveX - touchStartX;
    const deltaY = touchMoveY - touchStartY;
    
    // If it's clearly a horizontal swipe, prevent vertical scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 10) {
        e.preventDefault();
    }
}

// Initialize swipe navigation
function initializeSwipeNavigation() {
    const slideContainer = document.getElementById('slide-container');
    const mainContent = document.querySelector('.main-content');
    
    if (slideContainer) {
        slideContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        slideContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    if (mainContent) {
        mainContent.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainContent.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainContent.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields or text areas
        const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
        if (isInputActive || e.altKey || e.ctrlKey || e.metaKey) return;
        
        // Left arrow key - previous slide
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showNavigationFeedback('prev');
            handlePrev();
        }
        // Right arrow key - next slide
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNavigationFeedback('next');
            handleNext();
        }
    });
}