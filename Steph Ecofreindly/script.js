// Shopping cart functionality
let cart = [];
let cartCount = 1; // Starting with 1 as shown in the design

// Update cart badge
function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge');
  cartBadge.textContent = cartCount;
}

// Add to cart functionality
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  cartCount++;
  updateCartBadge();
  
  // Show feedback
  showNotification(`${productName} added to cart!`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search functionality
function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    showNotification(`Searching for "${searchTerm}"...`);
    console.log('Searching for:', searchTerm);
  }
}

// Newsletter subscription
function handleNewsletterSubscription() {
  const emailInput = document.querySelector('.newsletter-input');
  const email = emailInput.value.trim();
  
  if (email && isValidEmail(email)) {
    showNotification('Successfully subscribed to our newsletter!');
    emailInput.value = '';
  } else {
    showNotification('Please enter a valid email address.');
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth scrolling for internal links
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth'
  });
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = productCard.querySelector('.product-price').textContent;
      addToCart(productName, productPrice);
    });
  });
  
  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Newsletter subscription
  const newsletterBtn = document.querySelector('.newsletter-btn');
  const newsletterInput = document.querySelector('.newsletter-input');
  
  newsletterBtn.addEventListener('click', handleNewsletterSubscription);
  newsletterInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleNewsletterSubscription();
    }
  });
  
  // Category card hover effects
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const categoryName = this.querySelector('.category-name').textContent;
      showNotification(`Browsing ${categoryName} category...`);
    });
  });
  
  // Hero banner learn more button
  const heroBtn = document.querySelector('.hero-btn');
  heroBtn.addEventListener('click', function() {
    showNotification('Learn more about our sustainability mission!');
  });
  
  // Impact section learn more button
  const learnMoreBtn = document.querySelector('.learn-more-btn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function() {
      showNotification('Discover more about our community impact!');
    });
  }
  
  // See all buttons
  const seeAllButtons = document.querySelectorAll('.see-all-btn');
  seeAllButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.closest('section');
      const sectionTitle = section.querySelector('.section-title').textContent;
      showNotification(`Viewing all ${sectionTitle.toLowerCase()}...`);
    });
  });
  
  // Cart button click
  const cartBtn = document.querySelector('.cart-btn');
  cartBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      showNotification('Your cart is empty. Add some sustainable products!');
    } else {
      showNotification(`You have ${cart.length} items in your cart.`);
    }
  });
  
  // Profile button click
  const profileBtn = document.querySelector('.profile-btn');
  profileBtn.addEventListener('click', function() {
    showNotification('Welcome back, Steph the Baddie! 👋');
  });
  
  // Animate impact bars on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const impactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const impactBars = entry.target.querySelectorAll('.impact-bar');
        impactBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.animation = 'fillBar 1.5s ease-out forwards';
          }, index * 200);
        });
      }
    });
  }, observerOptions);
  
  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    impactObserver.observe(impactSection);
  }
  
  // Add CSS animation for impact bars
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fillBar {
      from {
        transform: scaleX(0);
        transform-origin: left;
      }
      to {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
    
    .impact-bar {
      transform: scaleX(0);
    }
  `;
  document.head.appendChild(style);
});

// Add some interactive features for better UX
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// Add loading states for better perceived performance
function showLoadingState(element) {
  const originalText = element.textContent;
  element.textContent = 'Loading...';
  element.disabled = true;
  
  setTimeout(() => {
    element.textContent = originalText;
    element.disabled = false;
  }, 1000);
}

// Export functions for potential future use
window.StepheeApp = {
  addToCart,
  handleSearch,
  handleNewsletterSubscription,
  showNotification,
  smoothScroll
};
