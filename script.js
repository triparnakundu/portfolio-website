// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(10, 14, 39, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(10, 14, 39, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced fade in animation on scroll with stagger
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }, index * 100); // Stagger animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards with enhanced animations
document.querySelectorAll('.timeline-item, .research-card, .publication-item, .skill-category, .honor-card, .service-card, .blog-card, .blog-post, .education-card, .talk-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Animate section titles
document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});

// Enhanced parallax effect to hero section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroImage = document.querySelector('.hero-image-wrapper');
            const heroText = document.querySelector('.hero-text');
            
            if (hero && scrolled < window.innerHeight) {
                const opacity = Math.max(0, 1 - (scrolled / window.innerHeight) * 1.5);
                hero.style.opacity = opacity;
                
                // Parallax for image and text
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                if (heroText) {
                    heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Number counting animation for hero stats
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end + suffix;
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in to hero content
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'fadeInUp 1s ease';
    }
    
    // Animate hero stats with counting effect
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.hero-stat-value');
                if (statValue && !statValue.classList.contains('counted')) {
                    statValue.classList.add('counted');
                    const text = statValue.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    // Preserve the prefix (like $) and suffix (like K+)
                    let prefix = '';
                    let suffix = '';
                    const originalText = text.trim();
                    
                    // Check if it starts with $ or other currency symbols
                    if (originalText.startsWith('$')) {
                        prefix = '$';
                        suffix = originalText.replace(/^\$?\d+/, '').replace(/\d+/g, '');
                    } else {
                        suffix = originalText.replace(/[0-9]/g, '');
                    }
                    
                    if (number) {
                        statValue.textContent = prefix + '0' + suffix;
                        setTimeout(() => {
                            // Create a custom animation that preserves prefix
                            function animateWithPrefix(element, start, end, duration, prefix, suffix) {
                                let startTimestamp = null;
                                const step = (timestamp) => {
                                    if (!startTimestamp) startTimestamp = timestamp;
                                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                    const current = Math.floor(progress * (end - start) + start);
                                    element.textContent = prefix + current + suffix;
                                    if (progress < 1) {
                                        window.requestAnimationFrame(step);
                                    } else {
                                        element.textContent = prefix + end + suffix;
                                    }
                                };
                                window.requestAnimationFrame(step);
                            }
                            animateWithPrefix(statValue, 0, number, 2000, prefix, suffix);
                        }, 500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.hero-stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Smooth scroll to top on page refresh
    window.scrollTo(0, 0);
    
    // Add golden glow cursor effect
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
    
    // Add enhanced glow effect to interactive elements (including dynamically added ones)
    function addGlowToElements() {
        document.querySelectorAll('a, button, .btn, .nav-link, .social-link, .hero-collab-link, .publication-link, .service-card, .skill-tag, .timeline-content, .research-card, .honor-card, .blog-card, .contact-link, .education-card').forEach(el => {
            // Remove existing listeners to avoid duplicates
            if (!el.hasAttribute('data-glow-attached')) {
                el.setAttribute('data-glow-attached', 'true');
                el.addEventListener('mouseenter', () => {
                    cursorGlow.classList.add('glow-intense');
                });
                el.addEventListener('mouseleave', () => {
                    cursorGlow.classList.remove('glow-intense');
                });
            }
        });
    }
    
    // Initial attachment
    addGlowToElements();
    
    // Re-attach when new content loads (for dynamic content)
    const observer = new MutationObserver(() => {
        addGlowToElements();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for enhanced effects
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--gold-dark);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .cursor-glow {
        width: 200px;
        height: 200px;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.2) 30%, transparent 70%);
        border-radius: 50%;
        filter: blur(30px);
        opacity: 0.6;
        transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
        animation: glowPulse 3s ease-in-out infinite;
        mix-blend-mode: screen;
        will-change: transform, opacity;
    }
    
    .cursor-glow.glow-intense {
        opacity: 0.9;
        filter: blur(40px);
        transform: translate(-50%, -50%) scale(1.3);
        background: radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, rgba(212, 175, 55, 0.4) 30%, rgba(212, 175, 55, 0.2) 50%, transparent 70%);
        animation: glowPulseIntense 1.5s ease-in-out infinite;
    }
    
    @keyframes glowPulse {
        0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
    
    @keyframes glowPulseIntense {
        0%, 100% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.4);
        }
    }
    
    @media (max-width: 768px) {
        .cursor-glow {
            display: none;
        }
    }
    
    .animated {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Smooth scrollbar styling */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-cream);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--gold-primary), var(--gold-dark));
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, var(--gold-dark), var(--burgundy));
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                formStatus.style.display = 'block';
                contactForm.reset();
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! There was an error sending your message. Please try again or email me directly at triparna178@gmail.com';
            formStatus.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
