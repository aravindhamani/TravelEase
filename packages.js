$(document).ready(function() {
    // Initialize date inputs
    const today = new Date().toISOString().split('T')[0];
    $('#packageDeparture').attr('min', today);

    // Price range slider
    $('#priceRange').on('input', function() {
        $('#priceValue').text('$' + $(this).val());
    });

    // Package search form
    $('#packageSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const searchData = {
            destination: $('#packageDestination').val(),
            departure: $('#packageDeparture').val(),
            duration: $('#packageDuration').val(),
            travelers: $('#packageTravelers').val(),
            budget: $('#packageBudget').val(),
            type: $('#packageType').val(),
            maxPrice: $('#priceRange').val()
        };

        if (!searchData.destination || !searchData.departure) {
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
            performPackageSearch(searchData);
        }, 2000);
    });

    // Initialize search suggestions
    initializePackageSuggestions();
});

// Perform package search
function performPackageSearch(searchData) {
    const packages = generatePackageResults(searchData);
    displayPackageResults(packages);
    $('#packageResults').show();
    showAlert('Found ' + packages.length + ' packages matching your criteria', 'success');
}

// Generate mock package results
function generatePackageResults(searchData) {
    const packageNames = [
        'Tropical Paradise Escape', 'European Adventure', 'Mountain Retreat', 'City Explorer',
        'Beach Bliss Getaway', 'Cultural Discovery', 'Adventure Expedition', 'Luxury Escape',
        'Family Fun Vacation', 'Romantic Honeymoon', 'Solo Explorer', 'Group Adventure'
    ];
    
    const destinations = [
        'Bali, Indonesia', 'Paris, France', 'Swiss Alps', 'Tokyo, Japan',
        'Maldives', 'Rome, Italy', 'Machu Picchu, Peru', 'Santorini, Greece',
        'Orlando, Florida', 'Venice, Italy', 'New Zealand', 'Iceland'
    ];
    
    const packages = [];
    
    for (let i = 0; i < 6; i++) {
        const rating = (Math.random() * 1 + 4).toFixed(1);
        const price = Math.floor(Math.random() * 2000) + 800;
        const duration = parseInt(searchData.duration) + Math.floor(Math.random() * 3);
        
        packages.push({
            id: i + 1,
            name: packageNames[i],
            destination: destinations[i],
            rating: rating,
            price: price,
            duration: duration,
            type: getRandomPackageType(),
            image: `https://images.unsplash.com/photo-${1500000000 + i}?w=400`,
            includes: getRandomIncludes()
        });
    }
    
    return packages.sort((a, b) => a.price - b.price);
}

// Get random package type
function getRandomPackageType() {
    const types = ['All-Inclusive', 'Adventure', 'Romantic', 'Family', 'Luxury'];
    return types[Math.floor(Math.random() * types.length)];
}

// Get random includes
function getRandomIncludes() {
    const includes = [
        'Flight Included', 'Hotel Included', 'Breakfast', 'Guided Tours',
        'Airport Transfer', 'All-Inclusive Meals', 'Activities', 'Insurance'
    ];
    const count = Math.floor(Math.random() * 4) + 3;
    const selected = [];
    
    for (let i = 0; i < count; i++) {
        const include = includes[Math.floor(Math.random() * includes.length)];
        if (!selected.includes(include)) {
            selected.push(include);
        }
    }
    
    return selected;
}

// Display package results
function displayPackageResults(packages) {
    const resultsHtml = packages.map(pkg => `
        <div class="package-result-card mb-4" data-price="${pkg.price}" data-duration="${pkg.duration}" data-rating="${pkg.rating}">
            <div class="row">
                <div class="col-md-4">
                    <div class="package-image">
                        <img src="${pkg.image}" alt="${pkg.name}" class="img-fluid rounded" onerror="this.src='https://via.placeholder.com/400x300/6c757d/ffffff?text=Package+Image'">
                        <div class="package-badge">${pkg.type}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="package-info">
                        <h5 class="package-name">${pkg.name}</h5>
                        <div class="package-location mb-2">
                            <i class="fas fa-map-marker-alt text-muted"></i>
                            <span class="text-muted">${pkg.destination}</span>
                        </div>
                        <div class="package-rating mb-2">
                            ${getStarRating(4.5)}
                            <span class="rating-score">${pkg.rating}</span>
                            <span class="rating-text">(${Math.floor(Math.random() * 200) + 50} reviews)</span>
                        </div>
                        <div class="package-details mb-3">
                            <p><i class="fas fa-calendar"></i> ${pkg.duration} Days</p>
                            <p><i class="fas fa-users"></i> 2 Travelers</p>
                            <div class="package-includes">
                                <small class="text-muted">Includes: ${pkg.includes.join(', ')}</small>
                            </div>
                        </div>
                        <div class="package-description">
                            <p class="text-muted">Experience the perfect blend of adventure and relaxation with our carefully curated package.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="package-price text-end">
                        <div class="price-per-person">$${pkg.price}</div>
                        <small class="text-muted">per person</small>
                        <button class="btn btn-warning btn-sm mt-2 w-100" onclick="bookPackage(${pkg.id})">
                            Book Now
                        </button>
                        <button class="btn btn-outline-secondary btn-sm mt-1 w-100" onclick="viewPackageDetails(${pkg.id})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    $('#packageResultsList').html(resultsHtml);
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

// Book package function
function bookPackage(packageId) {
    showAlert('Redirecting to booking page...', 'info');
    setTimeout(() => {
        window.location.href = 'booking.html?package=' + packageId;
    }, 1500);
}

// Global bookPackage function for featured packages
window.bookPackage = function(packageId) {
    showAlert('Redirecting to booking page...', 'info');
    setTimeout(() => {
        window.location.href = 'booking.html?package=' + packageId;
    }, 1500);
};

// View package details
function viewPackageDetails(packageId) {
    showAlert('Opening package details...', 'info');
    // In a real application, this would open a modal or navigate to a details page
}

// Sort functions
function sortByPrice() {
    const cards = $('.package-result-card').get();
    cards.sort((a, b) => {
        return parseInt($(a).data('price')) - parseInt($(b).data('price'));
    });
    $('#packageResultsList').html(cards);
}

function sortByDuration() {
    const cards = $('.package-result-card').get();
    cards.sort((a, b) => {
        return parseInt($(a).data('duration')) - parseInt($(b).data('duration'));
    });
    $('#packageResultsList').html(cards);
}

function sortByRating() {
    const cards = $('.package-result-card').get();
    cards.sort((a, b) => {
        return parseFloat($(b).data('rating')) - parseFloat($(a).data('rating'));
    });
    $('#packageResultsList').html(cards);
}

// Initialize package search suggestions
function initializePackageSuggestions() {
    const destinations = [
        'Bali, Indonesia', 'Paris, France', 'Tokyo, Japan', 'New York, USA',
        'London, UK', 'Rome, Italy', 'Barcelona, Spain', 'Amsterdam, Netherlands',
        'Prague, Czech Republic', 'Vienna, Austria', 'Budapest, Hungary', 'Krakow, Poland',
        'Warsaw, Poland', 'Bratislava, Slovakia', 'Ljubljana, Slovenia', 'Zagreb, Croatia',
        'Belgrade, Serbia', 'Sofia, Bulgaria', 'Bucharest, Romania', 'Bucharest, Romania',
        'Maldives', 'Santorini, Greece', 'Swiss Alps', 'Machu Picchu, Peru',
        'Iceland', 'New Zealand', 'Australia', 'Thailand', 'Vietnam', 'Cambodia'
    ];

    // Add autocomplete to destination input
    $('#packageDestination').on('input', function() {
        const value = $(this).val().toLowerCase();
        const suggestions = destinations.filter(dest => 
            dest.toLowerCase().includes(value)
        ).slice(0, 5);

        $(this).siblings('.suggestions').remove();

        if (value && suggestions.length > 0) {
            const suggestionsHtml = `
                <div class="suggestions">
                    ${suggestions.map(dest => `<div class="suggestion-item">${dest}</div>`).join('')}
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

// Add CSS for package results
const packageStyles = `
<style>
.search-filters {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: fit-content;
}

.package-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    height: 100%;
}

.package-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.package-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.package-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.package-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ffc107;
    color: #000;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.package-content {
    padding: 1.5rem;
}

.package-content h5 {
    color: #333;
    margin-bottom: 0.5rem;
}

.package-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.rating-text {
    color: #6c757d;
    font-size: 0.9rem;
}

.package-details p {
    margin-bottom: 0.25rem;
    color: #6c757d;
    font-size: 0.9rem;
}

.package-details i {
    width: 16px;
    color: #ffc107;
}

.package-price {
    text-align: center;
    margin-top: 1rem;
}

.price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffc107;
}

.per-person {
    color: #6c757d;
    font-size: 0.9rem;
}

.package-result-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.package-result-card:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

.package-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.package-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.package-name {
    color: #333;
    margin-bottom: 0.5rem;
}

.package-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.package-includes {
    margin-top: 0.5rem;
}

.price-per-person {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffc107;
}

.page-header {
    background: linear-gradient(135deg, #ffc107, #ff8c00);
}

.btn-warning {
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    border: none;
    color: #000;
}

.btn-warning:hover {
    background: linear-gradient(135deg, #e0a800, #e67e00);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
    color: #000;
}
</style>
`;

$('head').append(packageStyles); 