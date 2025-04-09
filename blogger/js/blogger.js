/**
 * @file
 * Blogger theme behaviors.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.bloggerTheme = {
    attach: function (context, settings) {
      // Header functionality
      once('blogger-header', '.site-header', context).forEach(function(header) {
        // Menu toggle functionality
        const menuToggle = header.querySelector('.menu-toggle');
        if (menuToggle) {
          menuToggle.addEventListener('click', function() {
            header.classList.toggle('menu-open');
            this.setAttribute('aria-expanded', 
              this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
          });
        }
        
        // Search toggle functionality
        const searchToggle = header.querySelector('.search-toggle');
        if (searchToggle) {
          searchToggle.addEventListener('click', function() {
            const searchForm = document.querySelector('.search-form-wrapper');
            if (searchForm) {
              searchForm.classList.toggle('open');
              this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
              );
            }
          });
        }
        
        // Font size controls
        const decreaseBtn = header.querySelector('.font-size-btn.decrease');
        const defaultBtn = header.querySelector('.font-size-btn.active');
        const increaseBtn = header.querySelector('.font-size-btn.increase');
        
        if (decreaseBtn && defaultBtn && increaseBtn) {
          // Base font size value in pixels
          let baseFontSize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
          
          decreaseBtn.addEventListener('click', function() {
            if (baseFontSize > 14) {
              baseFontSize -= 2;
              document.documentElement.style.fontSize = baseFontSize + 'px';
              
              defaultBtn.classList.remove('active');
              increaseBtn.classList.remove('active');
              decreaseBtn.classList.add('active');
            }
          });
          
          defaultBtn.addEventListener('click', function() {
            baseFontSize = 16; // Reset to default
            document.documentElement.style.fontSize = baseFontSize + 'px';
            
            decreaseBtn.classList.remove('active');
            increaseBtn.classList.remove('active');
            defaultBtn.classList.add('active');
          });
          
          increaseBtn.addEventListener('click', function() {
            if (baseFontSize < 20) {
              baseFontSize += 2;
              document.documentElement.style.fontSize = baseFontSize + 'px';
              
              defaultBtn.classList.remove('active');
              decreaseBtn.classList.remove('active');
              increaseBtn.classList.add('active');
            }
          });
        }
        
        // Trending content slider
        const trendingContent = header.querySelector('.trending-content');
        const prevBtn = header.querySelector('.prev-btn');
        const nextBtn = header.querySelector('.next-btn');
        
        if (trendingContent && prevBtn && nextBtn) {
          // Sample trending items for demonstration
          const trendingItems = [
            "The most common business debate isn't as black and white as you might think",
            "10 productivity tools every blogger should know about",
            "How remote work is changing the way we collaborate",
            "Why content strategy matters more than ever in 2023"
          ];
          
          let currentIndex = 0;
          
          // Display initial trending item
          trendingContent.textContent = trendingItems[currentIndex];
          
          // Handle previous button click
          prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + trendingItems.length) % trendingItems.length;
            trendingContent.textContent = trendingItems[currentIndex];
          });
          
          // Handle next button click
          nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % trendingItems.length;
            trendingContent.textContent = trendingItems[currentIndex];
          });
        }
      });
      
      // Add smooth scrolling for anchor links
      once('blogger-smooth-scroll', 'a[href^="#"]', context).forEach(function(link) {
        link.addEventListener('click', function (e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            window.scrollTo({
              top: target.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

})(Drupal); 