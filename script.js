// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D Background
    initThreeJsBackground();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll events
    initScrollEvents();
    
    // Initialize theme switching
    initThemeSwitching();
    
    // Initialize quantity selector
    initQuantitySelector();
    
    // Initialize category navigation
    initCategoryNav();
    
    // Initialize size selection
    initSizeSelection();
    
    // Initialize cart functionality
    initCart();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize menu item animations
    initMenuItemAnimations();
});

// Initialize Three.js Background
function initThreeJsBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create multiple floating objects with different shapes
    const shapes = [];
    
    // Add spoons, forks, plates as abstract shapes
    for (let i = 0; i < 30; i++) {
        let geometry;
        const random = Math.random();
        
        if (random < 0.3) {
            // Circular plate-like shape
            geometry = new THREE.CircleGeometry(Math.random() * 1 + 0.5, 32);
        } else if (random < 0.6) {
            // Fork-like shape (elongated box)
            geometry = new THREE.BoxGeometry(0.2, Math.random() * 1 + 1, 0.1);
        } else {
            // Spoon-like shape
            geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 32, 32);
        }
        
        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color(Math.random(), Math.random(), Math.random()),
            transparent: true,
            opacity: 0.7
        });
        
        const shape = new THREE.Mesh(geometry, material);
        
        // Position randomly in space
        shape.position.x = (Math.random() - 0.5) * 30;
        shape.position.y = (Math.random() - 0.5) * 30;
        shape.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        shape.rotation.z = Math.random() * Math.PI;
        
        // Add to group
        group.add(shape);
        shapes.push({
            mesh: shape,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            movementSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        });
    }
    
    // Position the camera
    camera.position.z = 10;
    
    // Add mouse interaction
    const mouse = new THREE.Vector2();
    
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    window.addEventListener('mousemove', onMouseMove, false);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate and move each shape
        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
            shape.mesh.rotation.z += shape.rotationSpeed.z;
            
            shape.mesh.position.x += shape.movementSpeed.x;
            shape.mesh.position.y += shape.movementSpeed.y;
            shape.mesh.position.z += shape.movementSpeed.z;
            
            // Boundary check
            if (Math.abs(shape.mesh.position.x) > 15) shape.movementSpeed.x *= -1;
            if (Math.abs(shape.mesh.position.y) > 15) shape.movementSpeed.y *= -1;
            if (Math.abs(shape.mesh.position.z) > 5) shape.movementSpeed.z *= -1;
        });
        
        // Subtle camera movement based on mouse position
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.01;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.01;
        camera.lookAt(scene.position);
        
        // Rotate the entire group slowly
        group.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize scroll animations
function initAnimations() {
    // Add animation classes to elements
    const elements = document.querySelectorAll('.featured-item, .process-section, .about, .delivery, .newsletter, .featured-menu');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Add directional animations to specific elements
    document.querySelectorAll('.hero-text').forEach(el => el.classList.add('slide-in-left'));
    document.querySelectorAll('.hero-image, .featured-image, .about-image, .delivery-image').forEach(el => el.classList.add('slide-in-right'));
    
    // Add staggered animations to process items
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add staggered animations to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.08}s`;
    });
    
    // Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Don't unobserve to allow animations when scrolling up again
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove the class when element is out of view
                // This allows elements to animate again when they re-enter the viewport
                // entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Animate the repeated text in the hero section
    animateRepeatedText();
}

// Animate repeated text with staggering effect
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

// Initialize scroll events
function initScrollEvents() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        // Header transform on scroll
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            // Scroll to the category nav section
            const categoryNav = document.querySelector('.category-nav');
            categoryNav.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scroll for anchor links
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
    
    // Add active navigation highlight based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href*='${sectionId}']`)?.parentElement.classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href*='${sectionId}']`)?.parentElement.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
}

// Initialize theme switching

function initThemeSwitching() {
    const colorOptions = document.querySelectorAll('.color-option');
    const root = document.documentElement;
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const themeClass = this.classList[1]; // Get the color class (red, brown, dark)
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to selected option
            this.classList.add('active');
            
            // Apply the theme to the root
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
            
            // Save theme preference to localStorage
            localStorage.setItem('theme', themeClass);
        });
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.color-option.${savedTheme}`);
        if (themeOption) themeOption.click();
    }
}

// Initialize quantity selector
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
        
        // Add animation effect
        minusBtn.classList.add('clicked');
        setTimeout(() => {
            minusBtn.classList.remove('clicked');
        }, 200);
    });
    
    plusBtn.addEventListener('click', function() {
        quantity++;
        quantityElement.textContent = quantity;
        updatePrice();
        
        // Add animation effect
        plusBtn.classList.add('clicked');
        setTimeout(() => {
            plusBtn.classList.remove('clicked');
        }, 200);
    });
    
    function updatePrice() {
        const priceElement = document.querySelector('.featured-details .price');
        if (!priceElement) return;
        
        // Get the base price (remove $ and convert to number)
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price') || priceElement.textContent.replace('$', ''));
        
        // Update the price display
        priceElement.textContent = `$${(basePrice * quantity).toFixed(2)}`;
    }
    
    // Set the initial base price attribute
    const priceElement = document.querySelector('.featured-details .price');
    if (priceElement) {
        const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
        priceElement.setAttribute('data-base-price', basePrice.toFixed(2));
    }
    
    // Add key event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            plusBtn.click();
        } else if (e.key === 'ArrowDown') {
            minusBtn.click();
        }
    });
}

// Initialize category navigation
function initCategoryNav() {
    const categoryLinks = document.querySelectorAll('.category-nav ul li a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get the category to filter
            const category = this.getAttribute('data-category');
            
            // Filter the menu items
            filterMenuItems(category);
        });
    });
    
    function filterMenuItems(category) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        if (category === 'all') {
            // Show all items
            menuItems.forEach(item => {
                item.style.display = 'block';
                
                // Add animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            });
        } else {
            // Filter items
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (itemCategory === category) {
                    item.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    // Animate out first, then hide
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
    }
    
    // Set initial active category
    const defaultCategory = document.querySelector('.category-nav ul li.active a');
    if (defaultCategory) {
        const category = defaultCategory.getAttribute('data-category') || 'all';
        filterMenuItems(category);
    }
}

// Initialize size selection
function initSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update the price based on size
            const sizePrice = parseFloat(this.getAttribute('data-price') || 0);
            const priceElement = document.querySelector('.featured-details .price');
            
            if (priceElement) {
                const basePrice = parseFloat(priceElement.getAttribute('data-original-price') || priceElement.getAttribute('data-base-price'));
                const quantity = parseInt(document.querySelector('.quantity')?.textContent || 1);
                
                // Set the new base price
                priceElement.setAttribute('data-base-price', (basePrice + sizePrice).toFixed(2));
                
                // Update displayed price
                priceElement.textContent = `$${((basePrice + sizePrice) * quantity).toFixed(2)}`;
            }
            
            // Add pulse animation
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 500);
        });
    });
    
    // Set initial original price for reference
    const priceElement = document.querySelector('.featured-details .price');
    if (priceElement) {
        const originalPrice = parseFloat(priceElement.textContent.replace('$', ''));
        priceElement.setAttribute('data-original-price', originalPrice.toFixed(2));
        priceElement.setAttribute('data-base-price', originalPrice.toFixed(2));
    }
}

// Initialize cart functionality
function initCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const addToCartBtns = document.querySelectorAll('.btn');
    
    if (!cartIcon) return;
    
    // Set up cart count
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
    
    // Handle cart icon click
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        
        alert('Shopping cart functionality would go here!');
    });
    
    // Handle add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details
            const productSection = this.closest('.featured-details') || this.closest('.menu-item-content');
            const productName = productSection?.querySelector('h2, h3')?.textContent || 'Product';
            
            // Increment cart count
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Animate cart icon
            cartIcon.classList.add('pulse');
            setTimeout(() => {
                cartIcon.classList.remove('pulse');
            }, 500);
            
            // Show confirmation message
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
            
            // Animate in
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, 10);
            
            // Animate out and remove
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 3000);
        });
    });
    
    // Add keydown event for checkout shortcut (Alt+C)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'c') {
            cartIcon.click();
        }
    });
}

// Initialize parallax effect
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

// Initialize menu item animations
function initMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 10px 30px rgba(139, 0, 0, 0.2)';
            
            // Scale up the image slightly
            const image = this.querySelector('img');
            if (image) {
                image.style.transition = 'transform 0.5s ease';
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove the glow effect
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            
            // Reset the image scale
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add hover effects to process items
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
            if (icon) {Parallax 
                icon.style.transform = '';
            }
        });
    });
}

// Add smooth animation to quantity buttons
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

// Preload images to avoid flicker during animations
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

// Call preloadImages after DOM content is loaded
window.addEventListener('load', preloadImages);