document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Navigation Container
    const navContainer = document.createElement('div');
    navContainer.className = 'scroll-nav-container';

    // 2. Create Up Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'scroll-btn prev';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    prevBtn.onclick = () => scrollToSection('prev');

    // 3. Create Down Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'scroll-btn next';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    nextBtn.onclick = () => scrollToSection('next');

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    document.body.appendChild(navContainer);

    // 4. Scroll Logic
    function scrollToSection(direction) {
        // Get all sections (adjust selector if sections have different class)
        const sections = Array.from(document.querySelectorAll('.slide-container'));

        // Add Header as a "section" if scrolled to top
        const header = document.querySelector('body');

        // Calculate current scroll position center line for accuracy
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Find current active section based on scroll position
        let currentIndex = -1;

        // Simple logic: Find the first section that is mostly in view or below the scroll top
        for (let i = 0; i < sections.length; i++) {
            const offset = sections[i].offsetTop;
            // If the section top is roughly at the scroll point (with some tolerance)
            if (offset >= currentScroll - 100) {
                currentIndex = i;
                break;
            }
        }

        // If we didn't find one (we are at bottom), set to last
        if (currentIndex === -1) currentIndex = sections.length;

        // Determine Target
        let targetIndex = direction === 'next' ? currentIndex : currentIndex - 1;

        // Edge case corrections
        // If we are "before" the first section (at the very top) and click next, go to first section (index 0)
        if (direction === 'next' && currentScroll < sections[0].offsetTop - 200) {
            targetIndex = 0;
        }

        // If searching previous and we are exactly at a section, go to previous index
        // The loop above finds the section *at or below*. So if we are AT section 2, currentIndex is 2. Prev is 1. Correct.

        if (targetIndex >= 0 && targetIndex < sections.length) {
            const targetSection = sections[targetIndex];
            // Scroll with offset for header
            const headerOffset = 100;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else if (targetIndex < 0) {
            // Scroll to very top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});
