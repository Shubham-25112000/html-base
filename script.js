document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const joinNowBtn = document.getElementById('joinNowBtn');
    const skillCards = document.querySelectorAll('.skill-card');
    const navLinks = document.querySelectorAll('.nav-links a');

    getStartedBtn.addEventListener('click', function() {
        document.getElementById('skills').scrollIntoView({
            behavior: 'smooth'
        });
    });

    joinNowBtn.addEventListener('click', function() {
        alert('Welcome to SkillExplorer! Sign-up functionality coming soon.');
    });

    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            const skillName = this.querySelector('h3').textContent;
            
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px)';
            }, 150);
            
            setTimeout(() => {
                alert(`Great choice! "${skillName}" project details coming soon. You'll receive a curated project that takes 1-2 weeks to complete.`);
            }, 300);
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.color = '#333';
            navbar.querySelectorAll('a').forEach(link => {
                link.style.color = '#333';
            });
            navbar.querySelector('.nav-brand h2').style.color = '#333';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.color = 'white';
            navbar.querySelectorAll('a').forEach(link => {
                link.style.color = 'white';
            });
            navbar.querySelector('.nav-brand h2').style.color = 'white';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .skill-card, .step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const skillCardHoverEffect = () => {
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    skillCardHoverEffect();

    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});