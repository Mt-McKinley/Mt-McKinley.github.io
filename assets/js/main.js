// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeNavigation();
    initializeProjectFilters();
    initializeFormValidation();
    initializeButtonEffects();
    initializeAnimations();
});

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Add active class to current page
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }

        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                filterProjects(filter);
            });
        });
    }
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            if (filter === 'all' || project.dataset.technologies.split(',').includes(filter)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 50);
            } else {
                project.style.display = 'none';
            }
        }, 300);
    });
}

// Form validation
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const fields = ['name', 'email', 'message'];
            
            fields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                } else {
                    removeError(input);
                }
            });

            if (isValid) {
                // Show success message
                showSuccess(contactForm);
                // Here you would typically send the form data to a server
            }
        });
    }
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

function showSuccess(form) {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = 'Message sent successfully!';
    form.appendChild(success);
    setTimeout(() => form.removeChild(success), 3000);
}

// Button effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
}

// Page animations
function initializeAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}
