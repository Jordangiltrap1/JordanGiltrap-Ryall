document.addEventListener('DOMContentLoaded', function() {
    // Fix for the summary section to ensure HTML tags are properly rendered
    const summaryContent = document.querySelector('.summary-content p');
    if (summaryContent) {
        // Get the text content
        const content = summaryContent.textContent;
        
        // Check if the content contains HTML tags as text
        if (content.includes('<strong>') || content.includes('</strong>')) {
            // Create a temporary div to parse the content
            const tempDiv = document.createElement('div');
            
            // Replace the HTML tags in the text with actual HTML
            const fixedContent = content
                .replace(/<strong>/g, '[[STRONG_START]]')
                .replace(/<\/strong>/g, '[[STRONG_END]]');
            
            // Set the text content first
            tempDiv.textContent = fixedContent;
            
            // Then replace the markers with actual HTML
            let innerHTML = tempDiv.innerHTML
                .replace(/\[\[STRONG_START\]\]/g, '<strong>')
                .replace(/\[\[STRONG_END\]\]/g, '</strong>');
            
            // Update the summary content
            summaryContent.innerHTML = innerHTML;
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Add active class to current nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Highlight active section in navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('main section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Parallax effect for header
        const header = document.querySelector('header');
        const scrolled = window.scrollY;
        
        if (scrolled <= 600) {
            header.style.backgroundPosition = `center ${scrolled * 0.4}px`;
        }
    });
    
    // Add CSS class for active navigation link
    const navActiveStyle = document.createElement('style');
    navActiveStyle.textContent = `
        .nav-links a.active {
            background-color: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(navActiveStyle);
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
    });
    
    // Intersection Observer for skill items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
    
    // Apply the same animation to award items
    const awardItems = document.querySelectorAll('.award-item');
    
    awardItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
        
        observer.observe(item);
    });
    
    // Add animation to education items
    const educationItems = document.querySelectorAll('.education-item');
    
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
        
        observer.observe(item);
    });
    
    // Add animation to association items
    const associationItems = document.querySelectorAll('.association-item');
    
    associationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
        
        observer.observe(item);
    });
    
    // Add animation to awards list items
    const awardsListItems = document.querySelectorAll('.awards-list li');
    
    awardsListItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        item.style.transitionDelay = `${0.1 + (index * 0.03)}s`;
        
        observer.observe(item);
    });
    
    // Add a back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);
    
    // Style the back to top button
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 99;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s, transform 0.3s;
        }
        
        .back-to-top:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        .back-to-top.visible {
            display: block;
            animation: fadeIn 0.3s ease-out forwards;
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
    printButton.classList.add('print-button');
    
    // Insert print button after the navigation
    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(printButton, nav.nextSibling);
    
    // Style the print button
    const printButtonStyle = document.createElement('style');
    printButtonStyle.textContent = `
        .print-button {
            display: block;
            margin: 1rem auto;
            padding: 0.5rem 1rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            transition: background-color 0.3s;
        }
        
        .print-button:hover {
            background-color: var(--secondary-color);
        }
        
        @media print {
            .print-button {
                display: none;
            }
        }
    `;
    document.head.appendChild(printButtonStyle);
    
    // Print resume when button is clicked
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add hover effect to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add subtle parallax effect to sections on scroll
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight && sectionTop > -section.offsetHeight) {
                const yPos = (sectionTop / 20);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    // Add counter animation to numbers in experience section
    const experienceDetails = document.querySelectorAll('.experience-details li');
    
    experienceDetails.forEach(item => {
        const text = item.innerHTML;
        const numberMatch = text.match(/\$([A-Za-z]+) million|\b([0-9]+)%\b/);
        
        if (numberMatch) {
            const originalHTML = item.innerHTML;
            let targetNumber;
            let prefix = '';
            let suffix = '';
            let isPercentage = false;
            
            if (numberMatch[1]) {
                // Handle "XXX million" case
                targetNumber = 100; // Default value for demonstration
                prefix = '$';
                suffix = ' million';
            } else if (numberMatch[2]) {
                // Handle percentage case
                targetNumber = parseInt(numberMatch[2]);
                suffix = '%';
                isPercentage = true;
            }
            
            // Only animate if we have a valid number
            if (targetNumber) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            let currentNumber = 0;
                            const duration = 2000; // 2 seconds
                            const interval = 50; // Update every 50ms
                            const increment = targetNumber / (duration / interval);
                            
                            const counter = setInterval(() => {
                                currentNumber += increment;
                                if (currentNumber >= targetNumber) {
                                    currentNumber = targetNumber;
                                    clearInterval(counter);
                                }
                                
                                const displayNumber = isPercentage ? Math.floor(currentNumber) : currentNumber.toFixed(1);
                                const newText = originalHTML.replace(
                                    isPercentage ? `${targetNumber}%` : `$XXX million`,
                                    `<span class="highlight">${prefix}${displayNumber}${suffix}</span>`
                                );
                                item.innerHTML = newText;
                            }, interval);
                            
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(item);
            }
        }
    });
    
    // Add a style for the highlighted numbers
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .highlight {
            color: var(--accent-color);
            font-weight: 700;
            display: inline-block;
            position: relative;
        }
        
        .highlight::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--accent-color);
            opacity: 0.3;
        }
    `;
    document.head.appendChild(highlightStyle);
}); 