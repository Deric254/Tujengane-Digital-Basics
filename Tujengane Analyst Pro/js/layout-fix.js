// This script ensures the layout fix CSS is applied to all slide pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the Analyst Pro section
    if (window.location.href.includes('Analyst Pro')) {
        // Check if our layout fix is already loaded
        const layoutFixExists = Array.from(document.styleSheets).some(sheet => 
            sheet.href && sheet.href.includes('layout-fix.css')
        );
        
        // If not already loaded, add it
        if (!layoutFixExists) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = '../../css/layout-fix.css';
            
            // If we're in a module subdirectory, adjust the path
            if (window.location.href.includes('/modules/')) {
                linkElement.href = '../../css/layout-fix.css';
            } else {
                linkElement.href = './css/layout-fix.css';
            }
            
            document.head.appendChild(linkElement);
        }
    }
});