// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Initialize project filters if they exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                filterProjects(filter);
            });
        });
    }
});

// Function to filter projects by technology
function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (filter === 'all') {
            project.style.display = 'block';
            return;
        }
        
        const technologies = project.dataset.technologies.split(',');
        if (technologies.includes(filter)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
