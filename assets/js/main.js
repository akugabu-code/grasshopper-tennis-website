// ========================================
// Asset Version (bump this when images change)
// ========================================
const ASSET_VERSION = '20260310001';

// ========================================
// DOM Content Loaded Event
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initQA();
    initMembers();
    initEventPhotos(); // これが完了後にGLightboxを初期化
    initEventAccordions();
    initScrollAnimations();
    initMonthTabs(); // 月タブの初期化
});

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#nav');
    const navLinks = document.querySelectorAll('#nav a');
    
    if (!menuToggle || !nav) return;
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// ========================================
// Month Tabs for Event Calendar
// ========================================
function initMonthTabs() {
    const tabs = document.querySelectorAll('.month-tab');
    const contents = document.querySelectorAll('.month-content');
    
    if (!tabs.length || !contents.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const month = this.getAttribute('data-month');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(month + '-events');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('#back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Q&A Accordion
// ========================================
function initQA() {
    const qaContainer = document.querySelector('#qa-container');
    
    if (!qaContainer) return;
    
    // Fetch Q&A data from JSON file
    fetch('data/qa.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Q&Aデータの読み込みに失敗しました');
            }
            return response.json();
        })
        .then(data => {
            renderQA(data);
            initAccordion();
        })
        .catch(error => {
            console.error('Error loading Q&A:', error);
            qaContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                    <p>Q&Aデータの読み込みに失敗しました。</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">data/qa.json ファイルを確認してください。</p>
                </div>
            `;
        });
}

function renderQA(qaData) {
    const qaContainer = document.querySelector('#qa-container');
    
    if (!qaContainer || !Array.isArray(qaData)) return;
    
    qaContainer.innerHTML = qaData.map((item, index) => `
        <div class="qa-item" data-index="${index}">
            <div class="qa-question">
                <span><strong>Q.</strong> ${escapeHtml(item.question)}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="qa-answer">
                <p><strong>A.</strong> ${escapeHtml(item.answer)}</p>
            </div>
        </div>
    `).join('');
}

function initAccordion() {
    const qaItems = document.querySelectorAll('.qa-item');
    
    qaItems.forEach(item => {
        const question = item.querySelector('.qa-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all other items
            qaItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// Members Dynamic Loading
// ========================================
function initMembers() {
    const membersContainer = document.querySelector('#members-container');
    
    if (!membersContainer) return;
    
    // Fetch members data from JSON file
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('メンバーデータの読み込みに失敗しました');
            }
            return response.json();
        })
        .then(data => {
            renderMembers(data);
        })
        .catch(error => {
            console.error('Error loading members:', error);
            membersContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #e74c3c;">
                    <p>メンバーデータの読み込みに失敗しました。</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">data/members.json ファイルを確認してください。</p>
                </div>
            `;
        });
}

function renderMembers(membersData) {
    const membersContainer = document.querySelector('#members-container');
    
    if (!membersContainer || !Array.isArray(membersData)) return;
    
    let imageLoadedCount = 0;
    
    membersData.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        const photoNumber = index + 1;
        const imagePath = `assets/images/members/${photoNumber}.jpg?v=${ASSET_VERSION}`;
        
        // Member photo with lazy loading
        const photoDiv = document.createElement('div');
        photoDiv.className = 'member-photo';
        
        // Create lightbox link
        const link = document.createElement('a');
        link.href = imagePath;
        link.className = 'glightbox';
        link.dataset.gallery = 'members';
        link.dataset.glightbox = `title: ${member.name} (${member.role})`;
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = member.name;
        img.loading = 'lazy';
        
        // Check if image exists
        let isPlaceholder = false;
        
        img.onload = function() {
            imageLoadedCount++;
            if (imageLoadedCount === membersData.length) {
                // Re-initialize GLightbox after all members are loaded
                setTimeout(() => {
                    if (typeof GLightbox !== 'undefined') {
                        GLightbox();
                    }
                }, 100);
            }
        };
        
        // Default placeholder if image doesn't exist
        img.onerror = function() {
            isPlaceholder = true;
            // プレースホルダーの場合はlightboxを無効化
            link.classList.remove('glightbox');
            link.removeAttribute('href');
            link.style.cursor = 'default';
            this.src = 'https://via.placeholder.com/600x600/2ecc71/ffffff?text=' + encodeURIComponent(member.name);
            
            imageLoadedCount++;
            if (imageLoadedCount === membersData.length) {
                setTimeout(() => {
                    if (typeof GLightbox !== 'undefined') {
                        GLightbox();
                    }
                }, 100);
            }
        };
        
        link.appendChild(img);
        photoDiv.appendChild(link);
        memberCard.appendChild(photoDiv);
        
        // Member name
        const name = document.createElement('h3');
        name.textContent = member.name;
        memberCard.appendChild(name);
        
        // Member furigana
        if (member.furigana) {
            const furigana = document.createElement('p');
            furigana.className = 'member-furigana';
            furigana.textContent = member.furigana;
            memberCard.appendChild(furigana);
        }
        
        // Member role
        const role = document.createElement('p');
        role.className = 'member-role';
        role.textContent = member.role;
        memberCard.appendChild(role);
        
        // Member university and department
        if (member.university || member.department) {
            const education = document.createElement('p');
            education.className = 'member-education';
            const parts = [];
            if (member.university) parts.push(member.university);
            if (member.grade) parts.push(member.grade);
            if (member.department) parts.push(member.department);
            education.textContent = parts.join(' ');
            memberCard.appendChild(education);
        }
        
        // Member bio
        const bio = document.createElement('p');
        bio.className = 'member-bio';
        bio.textContent = member.bio;
        memberCard.appendChild(bio);
        
        membersContainer.appendChild(memberCard);
    });
}

// ========================================
// Event Photos Dynamic Loading
// ========================================
function initEventPhotos() {
    const photoGrids = document.querySelectorAll('.photo-grid[data-month]');
    const maxPhotos = 20;
    
    photoGrids.forEach(grid => {
        const month = grid.dataset.month;
        const eventName = grid.dataset.eventName || '';
        
        for (let i = 1; i <= maxPhotos; i++) {
            const imagePath = `assets/images/events/${month}/${i}.jpg?v=${ASSET_VERSION}`;
            
            const link = document.createElement('a');
            link.href = imagePath;
            link.className = 'glightbox';
            link.dataset.gallery = month;
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = eventName;
            img.loading = 'lazy';
            
            const overlay = document.createElement('div');
            overlay.className = 'photo-overlay';
            overlay.innerHTML = '<i class="fas fa-search-plus"></i>';
            
            link.appendChild(img);
            link.appendChild(overlay);
            grid.appendChild(link);
            
            // Remove link if image fails to load
            img.onerror = function() {
                link.remove();
            };
        }
    });
    
    // Initialize GLightbox after a short delay to ensure all elements are in DOM
    setTimeout(() => {
        if (typeof GLightbox !== 'undefined') {
            const lightbox = GLightbox({
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
        }
    }, 100);
}

// ========================================
// Gallery Lightbox
// ========================================
function initGallery() {
    // Check if GLightbox is loaded
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    } else {
        console.warn('GLightbox is not loaded. Gallery lightbox will not work.');
    }
}

// ========================================
// Event Accordions (Monthly Events)
// ========================================
function initEventAccordions() {
    const accordions = document.querySelectorAll('.event-accordion');
    
    accordions.forEach(accordion => {
        const btn = accordion.querySelector('.event-accordion-btn');
        const content = accordion.querySelector('.event-accordion-content');
        
        if (!btn || !content) return;
        
        btn.addEventListener('click', function() {
            // Toggle active class
            const isActive = this.classList.contains('active');
            
            // Close all accordions
            accordions.forEach(acc => {
                acc.querySelector('.event-accordion-btn').classList.remove('active');
                acc.querySelector('.event-accordion-content').classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.about-card, .event-card, .member-card, .qa-item');
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// Header Scroll Effect
// ========================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('#header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ========================================
// Form Validation Enhancement
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.apply-form');
    
    if (!form) return;
    
    // Add custom validation messages
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            if (input.validity.valueMissing) {
                input.setCustomValidity('この項目は必須です');
            } else if (input.validity.typeMismatch) {
                if (input.type === 'email') {
                    input.setCustomValidity('正しいメールアドレスを入力してください');
                }
            }
        });
        
        input.addEventListener('input', function() {
            input.setCustomValidity('');
        });
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        // If form is being submitted to Netlify, show a loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
        }
    });
});

// ========================================
// Utility Functions
// ========================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================
// Active Navigation Link Highlighting
// ========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('#header').offsetHeight;
        
        if (pageYOffset >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Image Lazy Loading Fallback
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Console Message
// ========================================
console.log('%c○○大学テニスサークル 公式サイト', 'font-size: 20px; font-weight: bold; color: #2ecc71;');
console.log('%cWebsite developed with ❤️', 'font-size: 14px; color: #95a5a6;');
