// Custom cursor
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let speed = 0.1;

// Update cursor position with smooth animation
function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    
    cursorX = cursorX + (distX * speed);
    cursorY = cursorY + (distY * speed);
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animate);
}

animate();

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Scale cursor on clickable elements
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.mixBlendMode = 'difference';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'difference';
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelector('.nav-items');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        navItems.classList.add('active');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navItems.classList.remove('active');
        menuOpen = false;
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        if (menuOpen) {
            menuBtn.classList.remove('open');
            navItems.classList.remove('active');
            menuOpen = false;
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.project-card');
    
    parallaxElements.forEach(el => {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    skillObserver.observe(skillSection);
}

// Form handling
const form = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
    }, 3000);
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        projectCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.3';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        projectCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

// Glitch text effect enhancement
const glitchTexts = document.querySelectorAll('.glitch-text');

glitchTexts.forEach(text => {
    text.addEventListener('mouseenter', () => {
        text.style.animation = 'none';
        text.offsetHeight; // Trigger reflow
        text.style.animation = null;
    });
});

// Lazy loading images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
    imageObserver.observe(img);
}); 