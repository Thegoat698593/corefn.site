
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // ---------------- Navbar Functionality ----------------
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Trigger scroll event to set initial state
    window.dispatchEvent(new Event('scroll'));
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-links .nav-link').forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
      });
    });
    
    // ---------------- Image Gallery/Carousel ----------------
    const carousel = document.getElementById('gallery-carousel');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Handle next/prev buttons
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
    
    // Update carousel position and state
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active state visually if needed
      carouselItems.forEach((item, index) => {
        if (index === currentIndex) {
          item.style.opacity = '1';
        } else {
          item.style.opacity = '0.7';
        }
      });
    }
    
    // Auto-rotate carousel (optional)
    const autoRotateInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
    
    // Stop auto-rotation on user interaction
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });
    
    // ---------------- FAQ Accordion ----------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const accordionContent = this.nextElementSibling;
        
        // Toggle current item
        accordionItem.classList.toggle('active');
        
        if (accordionItem.classList.contains('active')) {
          accordionContent.style.height = accordionContent.scrollHeight + 'px';
        } else {
          accordionContent.style.height = '0';
        }
        
        // Close other items (optional - for accordion style)
        const allItems = document.querySelectorAll('.accordion-item');
        allItems.forEach(item => {
          if (item !== accordionItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.accordion-content').style.height = '0';
          }
        });
      });
    });
    
    // Open first FAQ item by default
    if (accordionHeaders.length > 0) {
      accordionHeaders[0].click();
    }
    
    // ---------------- Current Year for Footer ----------------
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // ---------------- Smooth Scrolling for Anchor Links ----------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Skip if the href is just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Offset for fixed navbar
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // ---------------- Animate Elements on Scroll ----------------
    // This is a simple implementation - consider using Intersection Observer for better performance
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card, .step-card, .section-header, .carousel-container, .faq-container, .cta-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Initialize elements as invisible
    document.querySelectorAll('.feature-card, .step-card, .section-header, .carousel-container, .faq-container, .cta-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load and then on scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ---------------- Create images directory ----------------
    // Note: In a real project, you would have an actual images folder with real images
    // This is just a placeholder function to show where images would go
    function createImageDirectory() {
      console.log('In a real project, create an images folder with:');
      console.log('- project-Core-gui.png');
      console.log('- fortnite-map.jpg');
      console.log('- fortnite-weapons.jpg');
      console.log('- fortnite-gameplay.jpg');
    }
    
    createImageDirectory();
  });
  