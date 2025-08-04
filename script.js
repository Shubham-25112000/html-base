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
        showSignupModal();
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
                // Navigate to specific course pages
                switch(skill) {
                    case 'web-development':
                        window.location.href = 'web-development.html';
                        break;
                    case 'data-science':
                        window.location.href = 'data-science.html';
                        break;
                    case 'ui-design':
                        window.location.href = 'ui-design.html';
                        break;
                    case 'mobile-dev':
                        window.location.href = 'mobile-dev.html';
                        break;
                    case 'ai-ml':
                        window.location.href = 'ai-ml.html';
                        break;
                    case 'digital-marketing':
                        window.location.href = 'digital-marketing.html';
                        break;
                    case 'finance':
                        window.location.href = 'finance.html';
                        break;
                    case 'emotional-intelligence':
                        window.location.href = 'emotional-intelligence.html';
                        break;
                    default:
                        alert(`Great choice! "${skillName}" project details coming soon. You'll receive a curated project that takes 1-2 weeks to complete.`);
                }
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
    
    // Initialize sign-up modal functionality
    initSignupModal();
    
    // Initialize profile functionality
    initProfileSystem();
});

// Sign-up Modal Functionality
function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetSignupForm();
}

function resetSignupForm() {
    document.getElementById('registrationForm').reset();
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    clearErrorMessages();
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function validateForm() {
    clearErrorMessages();
    let isValid = true;
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const interests = document.getElementById('interests').value;
    const experience = document.getElementById('experience').value;
    const terms = document.getElementById('terms').checked;
    
    // Validate full name
    if (!fullName) {
        showError('name', 'Please enter your full name');
        isValid = false;
    } else if (fullName.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError('password', 'Please enter a password');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    // Validate interests
    if (!interests) {
        showError('interests', 'Please select your primary interest');
        isValid = false;
    }
    
    // Validate experience
    if (!experience) {
        showError('experience', 'Please select your experience level');
        isValid = false;
    }
    
    // Validate terms
    if (!terms) {
        showError('terms', 'Please agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

function getRecommendedCourse(interest) {
    const courseData = {
        'web-development': {
            title: 'Web Development',
            description: 'Perfect for building interactive websites and web applications!',
            icon: '💻',
            url: 'web-development.html'
        },
        'data-science': {
            title: 'Data Science',
            description: 'Great choice for analyzing data and creating meaningful insights!',
            icon: '📊',
            url: 'data-science.html'
        },
        'ui-design': {
            title: 'UI/UX Design',
            description: 'Ideal for creating beautiful and user-friendly interfaces!',
            icon: '🎨',
            url: 'ui-design.html'
        },
        'mobile-dev': {
            title: 'Mobile Development',
            description: 'Excellent for building iOS and Android applications!',
            icon: '📱',
            url: 'mobile-dev.html'
        },
        'ai-ml': {
            title: 'AI & Machine Learning',
            description: 'Perfect for building intelligent systems and algorithms!',
            icon: '🤖',
            url: 'ai-ml.html'
        },
        'digital-marketing': {
            title: 'Digital Marketing',
            description: 'Great for promoting products and services online!',
            icon: '📢',
            url: 'digital-marketing.html'
        },
        'finance': {
            title: 'Finance Course',
            description: 'Excellent for learning investment and compounding principles!',
            icon: '💰',
            url: 'finance.html'
        },
        'emotional-intelligence': {
            title: 'Emotional Intelligence',
            description: 'Perfect for mastering self-awareness and emotional control!',
            icon: '🧠',
            url: 'emotional-intelligence.html'
        }
    };
    
    return courseData[interest] || courseData['web-development'];
}

function saveUserData(userData) {
    // Save to localStorage for demo purposes
    localStorage.setItem('skillExplorerUser', JSON.stringify(userData));
    localStorage.setItem('userSignedUp', 'true');
}

function simulateAccountCreation(userData) {
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            saveUserData(userData);
            resolve({ success: true });
        }, 2000);
    });
}

function showSuccessMessage(userData) {
    const recommendedCourse = getRecommendedCourse(userData.interests);
    
    // Update recommendation section
    document.getElementById('recommendedTitle').textContent = recommendedCourse.title;
    document.getElementById('recommendedDesc').textContent = recommendedCourse.description;
    document.querySelector('.course-icon').textContent = recommendedCourse.icon;
    
    // Store recommended course URL for later use
    document.getElementById('startRecommended').dataset.courseUrl = recommendedCourse.url;
    
    // Show success message
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
}

async function handleFormSubmission(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        interests: document.getElementById('interests').value,
        experience: document.getElementById('experience').value,
        newsletter: document.getElementById('newsletter').checked,
        signupDate: new Date().toISOString()
    };
    
    try {
        const result = await simulateAccountCreation(formData);
        
        if (result.success) {
            showSuccessMessage(formData);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('There was an error creating your account. Please try again.');
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

function initSignupModal() {
    const modal = document.getElementById('signupModal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('registrationForm');
    const startRecommendedBtn = document.getElementById('startRecommended');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const showLoginLink = document.getElementById('showLogin');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', hideSignupModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideSignupModal();
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmission);
    
    // Handle recommended course button
    startRecommendedBtn.addEventListener('click', function() {
        const courseUrl = this.dataset.courseUrl;
        if (courseUrl) {
            window.location.href = courseUrl;
        }
    });
    
    // Handle close success button
    closeSuccessBtn.addEventListener('click', function() {
        hideSignupModal();
        // Scroll to courses section
        document.getElementById('skills').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Handle show login link (placeholder for now)
    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Login functionality would be implemented here. For now, you can sign up to explore courses!');
    });
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Clear previous error for this field
            const fieldName = this.name || this.id;
            const errorElement = document.getElementById(fieldName + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            
            // Validate specific field
            if (this.id === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    showError('email', 'Please enter a valid email address');
                }
            }
            
            if (this.id === 'password' && this.value && this.value.length < 6) {
                showError('password', 'Password must be at least 6 characters long');
            }
        });
    });
    
    // Check if user is already signed up
    if (localStorage.getItem('userSignedUp') === 'true') {
        // Update join button text for returning users
        const joinBtns = document.querySelectorAll('#joinNowBtn');
        joinBtns.forEach(btn => {
            btn.textContent = 'Welcome Back!';
        });
    }
}

// Profile System Functionality
function initProfileSystem() {
    checkUserLogin();
    initProfileDropdown();
    initProfileModal();
}

function checkUserLogin() {
    const isSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const userData = getUserData();
    
    if (isSignedUp && userData) {
        showProfileButton(userData);
        updateJoinButtonForLoggedInUser();
    }
}

function showProfileButton(userData) {
    const profileSection = document.getElementById('profileSection');
    const profileName = document.getElementById('profileName');
    const profileAvatar = document.getElementById('profileAvatar');
    
    // Show profile section
    profileSection.style.display = 'block';
    
    // Update profile button with user info
    profileName.textContent = userData.fullName.split(' ')[0]; // First name
    
    // Generate avatar from first letter of name
    const firstLetter = userData.fullName.charAt(0).toUpperCase();
    profileAvatar.textContent = firstLetter;
}

function updateJoinButtonForLoggedInUser() {
    const joinBtns = document.querySelectorAll('#joinNowBtn');
    joinBtns.forEach(btn => {
        btn.textContent = 'Welcome Back!';
        btn.onclick = function() {
            showProfileModal();
        };
    });
}

function initProfileDropdown() {
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    
    profileButton.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
        profileButton.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        profileDropdown.classList.remove('show');
        profileButton.classList.remove('active');
    });
    
    // Dropdown menu handlers
    document.getElementById('viewProfile').addEventListener('click', function(e) {
        e.preventDefault();
        showProfileModal();
        profileDropdown.classList.remove('show');
        profileButton.classList.remove('active');
    });
    
    document.getElementById('myProgress').addEventListener('click', function(e) {
        e.preventDefault();
        showProfileModal();
        showTab('progress');
        profileDropdown.classList.remove('show');
        profileButton.classList.remove('active');
    });
    
    document.getElementById('settings').addEventListener('click', function(e) {
        e.preventDefault();
        showProfileModal();
        showTab('settings');
        profileDropdown.classList.remove('show');
        profileButton.classList.remove('active');
    });
    
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
        profileDropdown.classList.remove('show');
        profileButton.classList.remove('active');
    });
}

function initProfileModal() {
    const profileModal = document.getElementById('profileModal');
    const closeProfileBtn = document.getElementById('closeProfile');
    
    // Close modal handlers
    closeProfileBtn.addEventListener('click', closeProfileModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            closeProfileModal();
        }
    });
    
    // Profile update form handler
    const profileUpdateForm = document.getElementById('profileUpdateForm');
    profileUpdateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateUserProfile();
    });
    
    // Recommended course button handler
    document.getElementById('startRecCourse').addEventListener('click', function() {
        const userData = getUserData();
        if (userData && userData.interests) {
            const courseData = getRecommendedCourse(userData.interests);
            window.location.href = courseData.url;
        }
    });
}

function showProfileModal() {
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Load user data into profile
    loadProfileData();
    
    // Show overview tab by default
    showTab('overview');
}

function closeProfileModal() {
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadProfileData() {
    const userData = getUserData();
    if (!userData) return;
    
    // Update profile header
    document.getElementById('profileFullName').textContent = userData.fullName;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileLevel').textContent = capitalizeFirst(userData.experience);
    
    // Update profile avatar
    const firstLetter = userData.fullName.charAt(0).toUpperCase();
    document.getElementById('profileAvatarLarge').textContent = firstLetter;
    
    // Update overview stats
    document.getElementById('primaryInterest').textContent = getCourseName(userData.interests);
    document.getElementById('joinDate').textContent = formatJoinDate(userData.signupDate);
    
    // Update recommended course
    const recommendedCourse = getRecommendedCourse(userData.interests);
    document.getElementById('recCourseIcon').textContent = recommendedCourse.icon;
    document.getElementById('recCourseTitle').textContent = recommendedCourse.title;
    document.getElementById('recCourseDesc').textContent = recommendedCourse.description;
    
    // Update settings form
    document.getElementById('updateFullName').value = userData.fullName;
    document.getElementById('updateEmail').value = userData.email;
    document.getElementById('updateInterests').value = userData.interests;
    document.getElementById('updateExperience').value = userData.experience;
    document.getElementById('updateNewsletter').checked = userData.newsletter || false;
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Update button states
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabIndex = tabName === 'overview' ? 0 : tabName === 'progress' ? 1 : 2;
    tabButtons[tabIndex].classList.add('active');
}

function updateUserProfile() {
    const updatedData = {
        fullName: document.getElementById('updateFullName').value.trim(),
        email: document.getElementById('updateEmail').value.trim(),
        interests: document.getElementById('updateInterests').value,
        experience: document.getElementById('updateExperience').value,
        newsletter: document.getElementById('updateNewsletter').checked
    };
    
    // Get existing user data and merge with updates
    const existingData = getUserData();
    const mergedData = { ...existingData, ...updatedData };
    
    // Save updated data
    localStorage.setItem('skillExplorerUser', JSON.stringify(mergedData));
    
    // Update UI
    showProfileButton(mergedData);
    loadProfileData();
    
    // Show success message
    alert('Profile updated successfully!');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('skillExplorerUser');
        localStorage.removeItem('userSignedUp');
        
        // Hide profile section
        document.getElementById('profileSection').style.display = 'none';
        
        // Reset join buttons
        const joinBtns = document.querySelectorAll('#joinNowBtn');
        joinBtns.forEach(btn => {
            btn.textContent = 'Join Now - It\'s Free!';
            btn.onclick = function() {
                showSignupModal();
            };
        });
        
        // Close any open modals
        closeProfileModal();
        
        // Show logout success
        alert('You have been logged out successfully!');
    }
}

function confirmDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
            // Clear all user data
            localStorage.removeItem('skillExplorerUser');
            localStorage.removeItem('userSignedUp');
            
            // Hide profile section
            document.getElementById('profileSection').style.display = 'none';
            
            // Reset join buttons
            const joinBtns = document.querySelectorAll('#joinNowBtn');
            joinBtns.forEach(btn => {
                btn.textContent = 'Join Now - It\'s Free!';
                btn.onclick = function() {
                    showSignupModal();
                };
            });
            
            // Close modals
            closeProfileModal();
            
            alert('Your account has been deleted successfully.');
        }
    }
}

function getUserData() {
    const userData = localStorage.getItem('skillExplorerUser');
    return userData ? JSON.parse(userData) : null;
}

function getCourseName(courseId) {
    const courseNames = {
        'web-development': 'Web Development',
        'data-science': 'Data Science',
        'ui-design': 'UI/UX Design',
        'mobile-dev': 'Mobile Development',
        'ai-ml': 'AI & Machine Learning',
        'digital-marketing': 'Digital Marketing',
        'finance': 'Finance',
        'emotional-intelligence': 'Emotional Intelligence'
    };
    return courseNames[courseId] || 'Unknown Course';
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

function formatJoinDate(dateString) {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}