// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        eventCards.forEach(card => {
            const title = card.querySelector('.event-title').textContent.toLowerCase();
            const category = card.querySelector('.event-category').textContent.toLowerCase();
            const location = card.querySelector('.event-location').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || category.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners for search
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter category
            const filterCategory = this.textContent.trim().toLowerCase();
            
            // Show/hide events based on category
            eventCards.forEach(card => {
                if (filterCategory === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.querySelector('.event-category').textContent.toLowerCase();
                    
                    if (cardCategory.includes(filterCategory)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all pagination buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button if it's a number
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            // Here you would implement actual pagination logic
            // For now we'll just log which page was clicked
            console.log('Pagination clicked:', this.textContent);
            
            // Actual implementation would involve:
            // 1. Calculate which events to show based on page number
            // 2. Hide/show appropriate events
            // 3. Possibly load more events from server
        });
    });

    // Reset all filters function (can be called from elsewhere if needed)
    window.resetFilters = function() {
        // Clear search input
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Reset filter buttons
        filterButtons.forEach((btn, index) => {
            btn.classList.remove('active');
            if (index === 0) { // First button (All)
                btn.classList.add('active');
            }
        });
        
        // Show all event cards
        eventCards.forEach(card => {
            card.style.display = 'block';
        });
    };
});