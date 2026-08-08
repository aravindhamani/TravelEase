$(document).ready(function() {
    // Initialize date inputs
    const today = new Date().toISOString().split('T')[0];
    $('#checkInDate').attr('min', today);
    $('#checkOutDate').attr('min', today);

    // Auto-fill check-out date
    $('#checkInDate').on('change', function() {
        const checkInDate = new Date($(this).val());
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + 2);
        $('#checkOutDate').val(checkOutDate.toISOString().split('T')[0]);
    });

    // Price range slider
    $('#priceRange').on('input', function() {
        $('#priceValue').text('$' + $(this).val());
    });

    // Hotel search form
    $('#hotelSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const searchData = {
            destination: $('#hotelDestination').val(),
            checkIn: $('#checkInDate').val(),
            checkOut: $('#checkOutDate').val(),
            guests: $('#guestCount').val(),
            rooms: $('#roomCount').val(),
            roomType: $('#roomType').val(),
            maxPrice: $('#priceRange').val()
        };

        if (!searchData.destination || !searchData.checkIn || !searchData.checkOut) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        // Show loading
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<span class="loading"></span> Searching...');
        submitBtn.prop('disabled', true);

        // Simulate search
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            performHotelSearch(searchData);
        }, 2000);
    });

    // Initialize search suggestions
    initializeHotelSuggestions();
});

// Perform hotel search
function performHotelSearch(searchData) {
    const hotels = generateHotelResults(searchData);
    displayHotelResults(hotels);
    $('#hotelResults').show();
    showAlert('Found ' + hotels.length + ' hotels matching your criteria', 'success');
}

// Generate mock hotel results
function generateHotelResults(searchData) {
    const hotelNames = [
        'Grand Plaza Hotel', 'Marina Bay Resort', 'Central Park Inn', 'Skyline Tower Hotel',
        'Ocean View Resort', 'Downtown Luxury Hotel', 'Garden Court Hotel', 'Riverside Lodge',
        'Mountain View Resort', 'City Center Hotel', 'Beachfront Resort', 'Historic Inn'
    ];
    
    const hotels = [];
    
    for (let i = 0; i < 6; i++) {
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const price = Math.floor(Math.random() * 200) + 100;
        const distance = (Math.random() * 5 + 0.5).toFixed(1);
        
        hotels.push({
            id: i + 1,
            name: hotelNames[i],
            rating: rating,
            price: price,
            distance: distance,
            stars: Math.floor(Math.random() * 2) + 4,
            amenities: getRandomAmenities(),
            image: `https://images.unsplash.com/photo-${1500000000 + i}?w=400`
        });
    }
    
    return hotels.sort((a, b) => a.price - b.price);
}

// Get random amenities
function getRandomAmenities() {
    const allAmenities = ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'spa'];
    const count = Math.floor(Math.random() * 4) + 2;
    const amenities = [];
    
    for (let i = 0; i < count; i++) {
        const amenity = allAmenities[Math.floor(Math.random() * allAmenities.length)];
        if (!amenities.includes(amenity)) {
            amenities.push(amenity);
        }
    }
    
    return amenities;
}

// Display hotel results
function displayHotelResults(hotels) {
    const resultsHtml = hotels.map(hotel => `
        <div class="hotel-result-card mb-4" data-price="${hotel.price}" data-rating="${hotel.rating}" data-distance="${hotel.distance}">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="hotel-image">
                        <img src="${hotel.image}" alt="${hotel.name}" class="img-fluid" onerror="this.src='https://via.placeholder.com/400x300/28a745/ffffff?text=${hotel.name.replace(' ', '+')}'">
                        <div class="hotel-badge">
                            <span class="badge bg-success">${hotel.stars}★</span>
                        </div>
                        <button class="hotel-favorite-btn" onclick="toggleFavorite(${hotel.id})" title="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="hotel-info">
                        <h5 class="hotel-name">${hotel.name}</h5>
                        <div class="hotel-rating mb-2">
                            ${getStarRating(hotel.stars)}
                            <span class="rating-score">${hotel.rating}</span>
                            <span class="rating-text">(${Math.floor(Math.random() * 500) + 100} reviews)</span>
                        </div>
                        <div class="hotel-location mb-2">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${hotel.distance} km from city center</span>
                        </div>
                        <div class="hotel-amenities mb-3">
                            ${hotel.amenities.map(amenity => getAmenityIcon(amenity)).join('')}
                        </div>
                        <div class="hotel-description">
                            <p>Comfortable rooms with modern amenities and excellent service. Perfect for both business and leisure travelers.</p>
                        </div>
                        <div class="hotel-tags">
                            <span class="tag">Free Cancellation</span>
                            <span class="tag">Breakfast Included</span>
                            <span class="tag">Best Price Guarantee</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="hotel-price">
                        <div class="price-per-night">$${hotel.price}</div>
                        <small>per night</small>
                        <div class="price-breakdown">
                            <small class="text-muted">+ $25 taxes & fees</small>
                        </div>
                        <button class="btn btn-success btn-sm mt-3 w-100" onclick="bookHotel(${hotel.id})">
                            <i class="fas fa-check"></i> Book Now
                        </button>
                        <button class="btn btn-outline-secondary btn-sm mt-2 w-100" onclick="viewHotelDetails(${hotel.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    $('#hotelResultsList').html(resultsHtml);
    
    // Add click effects to hotel cards
    $('.hotel-result-card').on('click', function(e) {
        if (!$(e.target).closest('.btn').length) {
            $(this).addClass('card-clicked');
            setTimeout(() => {
                $(this).removeClass('card-clicked');
            }, 200);
        }
    });
}

// Get star rating HTML
function getStarRating(stars) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
            starsHtml += '<i class="fas fa-star text-warning"></i>';
        } else {
            starsHtml += '<i class="far fa-star text-warning"></i>';
        }
    }
    return starsHtml;
}

// Get amenity icon
function getAmenityIcon(amenity) {
    const icons = {
        wifi: '<i class="fas fa-wifi" title="Free WiFi"></i>',
        pool: '<i class="fas fa-swimming-pool" title="Swimming Pool"></i>',
        gym: '<i class="fas fa-dumbbell" title="Fitness Center"></i>',
        parking: '<i class="fas fa-parking" title="Free Parking"></i>',
        restaurant: '<i class="fas fa-utensils" title="Restaurant"></i>',
        spa: '<i class="fas fa-spa" title="Spa"></i>'
    };
    return `<span class="amenity-icon me-2">${icons[amenity] || ''}</span>`;
}

// Book hotel function
function bookHotel(hotelId) {
    showAlert('Redirecting to booking page...', 'info');
    setTimeout(() => {
        window.location.href = 'booking.html?hotel=' + hotelId;
    }, 1500);
}

// View hotel details
function viewHotelDetails(hotelId) {
    showAlert('Opening hotel details...', 'info');
    // In a real application, this would open a modal or navigate to a details page
}

// Toggle favorite function
function toggleFavorite(hotelId) {
    const btn = event.target.closest('.hotel-favorite-btn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.background = '#dc3545';
        btn.style.color = 'white';
        showAlert('Added to favorites!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.background = 'rgba(255, 255, 255, 0.9)';
        btn.style.color = '#dc3545';
        showAlert('Removed from favorites!', 'info');
    }
}

// Global functions
window.toggleFavorite = toggleFavorite;
window.viewHotelDetails = viewHotelDetails;
window.bookHotel = bookHotel;

// Sort functions
function sortByPrice() {
    const cards = $('.hotel-result-card').get();
    cards.sort((a, b) => {
        return parseInt($(a).data('price')) - parseInt($(b).data('price'));
    });
    $('#hotelResultsList').html(cards);
}

function sortByRating() {
    const cards = $('.hotel-result-card').get();
    cards.sort((a, b) => {
        return parseFloat($(b).data('rating')) - parseFloat($(a).data('rating'));
    });
    $('#hotelResultsList').html(cards);
}

function sortByDistance() {
    const cards = $('.hotel-result-card').get();
    cards.sort((a, b) => {
        return parseFloat($(a).data('distance')) - parseFloat($(b).data('distance'));
    });
    $('#hotelResultsList').html(cards);
}

// Search destination function
function searchDestination(destination) {
    $('#hotelDestination').val(destination);
    $('#hotelSearchForm').submit();
}

// Initialize hotel search suggestions
function initializeHotelSuggestions() {
    const cities = [
        'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
        'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
        'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
        'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
        'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
        'Miami, FL', 'Orlando, FL', 'Las Vegas, NV', 'Atlanta, GA', 'New Orleans, LA'
    ];

    // Add autocomplete to destination input
    $('#hotelDestination').on('input', function() {
        const value = $(this).val().toLowerCase();
        const suggestions = cities.filter(city => 
            city.toLowerCase().includes(value)
        ).slice(0, 5);

        $(this).siblings('.suggestions').remove();

        if (value && suggestions.length > 0) {
            const suggestionsHtml = `
                <div class="suggestions">
                    ${suggestions.map(city => `<div class="suggestion-item">${city}</div>`).join('')}
                </div>
            `;
            $(this).after(suggestionsHtml);
        }
    });

    // Handle suggestion clicks
    $(document).on('click', '.suggestion-item', function() {
        const value = $(this).text();
        $(this).parent().siblings('input').val(value);
        $(this).parent().remove();
    });
}

// Add CSS for hotel results
const hotelStyles = `
<style>
.search-filters {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: fit-content;
}

.hotel-result-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.hotel-result-card:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

.hotel-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.hotel-name {
    color: #333;
    margin-bottom: 0.5rem;
}

.hotel-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.rating-score {
    font-weight: 600;
    color: #333;
}

.rating-text {
    color: #6c757d;
    font-size: 0.9rem;
}

.hotel-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.amenity-icon {
    color: #28a745;
    font-size: 1.1rem;
}

.price-per-night {
    font-size: 1.5rem;
    font-weight: 700;
    color: #28a745;
}

.page-header {
    background: linear-gradient(135deg, #28a745, #20c997);
}

.btn-success {
    background: linear-gradient(135deg, #28a745, #20c997);
    border: none;
}

.btn-success:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
}
</style>
`;

$('head').append(hotelStyles); 