document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initScrollEvents();
    initThemeSwitching();
    initQuantitySelector();
    initCategoryNav();
    initSizeSelection();
    initCart();
    initParallax();
    initMenuItemAnimations();
});

window.addEventListener("load", function() {
    document.getElementById("preloader").style.display = "none";
  });
  
function initAnimations() {
    const elements = document.querySelectorAll('.featured-item, .process-section, .about, .delivery, .newsletter, .featured-menu');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    document.querySelectorAll('.hero-image, .featured-image, .about-image, .delivery-image')
        .forEach(el => el.classList.add('slide-in-right'));
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.08}s`;
    });
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    animateRepeatedText();
}

function animateRepeatedText() {
    const repeatedTextContainer = document.querySelector('.repeated-text');
    if (!repeatedTextContainer) return;
    const words = repeatedTextContainer.querySelectorAll('h3');
    words.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(20px)';
        word.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        word.style.transitionDelay = `${index * 0.2}s`;
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 100);
    });
}

function initScrollEvents() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const categoryNav = document.querySelector('.category-nav');
            categoryNav.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href*='${sectionId}']`)
                  ?.parentElement.classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href*='${sectionId}']`)
                  ?.parentElement.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavOnScroll);
}

function initThemeSwitching() {
    const colorOptions = document.querySelectorAll('.color-option');
    const root = document.documentElement;
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const themeClass = this.classList[1];
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            if (themeClass === 'red') {
                root.style.setProperty('--primary-color', '#8B0000');
                root.style.setProperty('--secondary-color', '#5A3E36');
            } else if (themeClass === 'brown') {
                root.style.setProperty('--primary-color', '#5A3E36');
                root.style.setProperty('--secondary-color', '#8B4513');
            } else if (themeClass === 'dark') {
                root.style.setProperty('--primary-color', '#2C2C2C');
                root.style.setProperty('--secondary-color', '#4A4A4A');
            }
            localStorage.setItem('theme', themeClass);
        });
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.color-option.${savedTheme}`);
        if (themeOption) themeOption.click();
    }
}

function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn:first-child');
    const plusBtn = document.querySelector('.quantity-btn:last-child');
    const quantityElement = document.querySelector('.quantity');
    if (!minusBtn || !plusBtn || !quantityElement) return;
    let quantity = 1;
    minusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updatePrice();
        }
        minusBtn.classList.add('clicked');
        setTimeout(() => {
            minusBtn.classList.remove('clicked');
        }, 200);
    });
    plusBtn.addEventListener('click', function() {
        quantity++;
        quantityElement.textContent = quantity;
        updatePrice();
        plusBtn.classList.add('clicked');
        setTimeout(() => {
            plusBtn.classList.remove('clicked');
        }, 200);
    });
    function updatePrice() {
        const priceElement = document.querySelector('.featured-details .price');
        if (!priceElement) return;
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price') 
          || priceElement.textContent.replace('$', ''));
        priceElement.textContent = `$${(basePrice * quantity).toFixed(2)}`;
    }
    const priceElement = document.querySelector('.featured-details .price');
    if (priceElement) {
        const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
        priceElement.setAttribute('data-base-price', basePrice.toFixed(2));
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            plusBtn.click();
        } else if (e.key === 'ArrowDown') {
            minusBtn.click();
        }
    });
}

function initCategoryNav() {
    const categoryLinks = document.querySelectorAll('.category-nav ul li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            const category = this.getAttribute('data-category');
            filterMenuItems(category);
        });
    });
    function filterMenuItems(category) {
        const menuItems = document.querySelectorAll('.menu-item');
        if (category === 'all') {
            menuItems.forEach(item => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            });
        } else {
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
    }
    const defaultCategory = document.querySelector('.category-nav ul li.active a');
    if (defaultCategory) {
        const category = defaultCategory.getAttribute('data-category') || 'all';
        filterMenuItems(category);
    }
}

function initSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const sizePrice = parseFloat(this.getAttribute('data-price') || 0);
            const priceElement = document.querySelector('.featured-details .price');
            if (priceElement) {
                const basePrice = parseFloat(priceElement.getAttribute('data-original-price') 
                  || priceElement.getAttribute('data-base-price'));
                priceElement.setAttribute('data-base-price', (basePrice + sizePrice).toFixed(2));
                const quantity = parseInt(document.querySelector('.quantity')?.textContent || 1);
                priceElement.textContent = `$${((basePrice + sizePrice) * quantity).toFixed(2)}`;
            }
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 500);
        });
    });
    const priceElement = document.querySelector('.featured-details .price');
    if (priceElement) {
        const originalPrice = parseFloat(priceElement.textContent.replace('$', ''));
        priceElement.setAttribute('data-original-price', originalPrice.toFixed(2));
        priceElement.setAttribute('data-base-price', originalPrice.toFixed(2));
    }
}

function initCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const addToCartBtns = document.querySelectorAll('.btn');
    if (!cartIcon) return;
    let cartCount = 0;
    const cartCountElement = document.createElement('span');
    cartCountElement.className = 'cart-count';
    cartCountElement.style.position = 'absolute';
    cartCountElement.style.top = '-8px';
    cartCountElement.style.right = '-8px';
    cartCountElement.style.backgroundColor = 'var(--primary-color)';
    cartCountElement.style.color = 'white';
    cartCountElement.style.borderRadius = '50%';
    cartCountElement.style.width = '20px';
    cartCountElement.style.height = '20px';
    cartCountElement.style.display = 'flex';
    cartCountElement.style.justifyContent = 'center';
    cartCountElement.style.alignItems = 'center';
    cartCountElement.style.fontSize = '0.8rem';
    cartCountElement.style.fontWeight = 'bold';
    cartCountElement.textContent = cartCount;
    cartIcon.appendChild(cartCountElement);
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Shopping cart functionality would go here!');
    });
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productSection = this.closest('.featured-details') || this.closest('.menu-item-content');
            const productName = productSection?.querySelector('h2, h3')?.textContent || 'Product';
            cartCount++;
            cartCountElement.textContent = cartCount;
            cartIcon.classList.add('pulse');
            setTimeout(() => {
                cartIcon.classList.remove('pulse');
            }, 500);
            const message = document.createElement('div');
            message.textContent = `${productName} added to cart!`;
            message.style.position = 'fixed';
            message.style.top = '20px';
            message.style.right = '20px';
            message.style.backgroundColor = 'var(--primary-color)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '5px';
            message.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            message.style.zIndex = '1000';
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            document.body.appendChild(message);
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, 10);
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 3000);
        });
    });
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'c') {
            cartIcon.click();
        }
    });
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .featured-image, .about-image, .delivery-image');
    window.addEventListener("scroll", function() {
        const parallaxElements = document.querySelectorAll(".floating");
        parallaxElements.forEach(element => {
            const scrollY = window.scrollY;
            const speed = 0.15;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;
            if (scrollY + viewportHeight > elementTop && scrollY < elementTop + elementHeight) {
                let yOffset = (scrollY - elementTop) * speed;
                const maxOffset = 30;
                const minOffset = -20;
                yOffset = Math.max(minOffset, Math.min(maxOffset, yOffset));
                element.style.transform = `translateY(${yOffset}px)`;
            }
        });
    });
}

function initMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(139, 0, 0, 0.2)';
            const image = this.querySelector('img');
            if (image) {
                image.style.transition = 'transform 0.5s ease';
                image.style.transform = 'scale(1.05)';
            }
        });
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.transform = 'translateY(-10px) rotate(5deg)';
            }
        });
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .quantity-btn.clicked {
            transform: scale(0.9);
            transition: transform 0.2s ease;
        }
        .pulse {
            animation: pulse-animation 0.5s ease-out;
        }
        @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}
window.addEventListener('load', preloadImages);
