document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'var(--shadow-md)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);

    // Slideshow for Index Page
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Gallery Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption h3');
        const lightboxDesc = lightbox.querySelector('.lightbox-caption p');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const caption = this.querySelector('.gallery-caption h3').textContent;
                const desc = this.querySelector('.gallery-caption p').textContent;
                
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightboxDesc.textContent = desc;
                
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
            });
        });
        
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightboxClose.click();
            }
        });
    }

    // District Tabs for Gallery Page
    const districtTabs = document.querySelectorAll('.district-tab');
    const districtSections = document.querySelectorAll('.district-section');
    
    if (districtTabs.length > 0) {
        districtTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const district = this.getAttribute('data-district');
                
                // Update active tab
                districtTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                if (district === 'all') {
                    // Show all sections
                    districtSections.forEach(section => {
                        section.style.display = 'block';
                        setTimeout(() => {
                            section.style.opacity = '1';
                        }, 10);
                    });
                } else {
                    // Show only selected district
                    districtSections.forEach(section => {
                        if (section.id === `${district}-section`) {
                            section.style.display = 'block';
                            setTimeout(() => {
                                section.style.opacity = '1';
                            }, 10);
                        } else {
                            section.style.opacity = '0';
                            setTimeout(() => {
                                section.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }

    // Form Validation for Contact Page
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = 'var(--error)';
            } else if (nameInput) {
                nameInput.style.borderColor = 'var(--gray-300)';
            }
            
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = 'var(--error)';
                } else {
                    emailInput.style.borderColor = 'var(--gray-300)';
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = 'var(--error)';
            } else if (messageInput) {
                messageInput.style.borderColor = 'var(--gray-300)';
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    }
});