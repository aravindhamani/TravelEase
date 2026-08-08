$(document).ready(function() {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchData = {
        from: urlParams.get('from') || 'Chennai',
        to: urlParams.get('to') || 'Raipur',
        departureDate: urlParams.get('departureDate'),
        returnDate: urlParams.get('returnDate'),
        passengers: urlParams.get('passengers') || '2',
        cabinClass: urlParams.get('cabinClass') || 'economy',
        tripType: urlParams.get('tripType') || 'roundtrip'
    };

    // Update page title and hotel deals title
    document.title = `${searchData.from} to ${searchData.to} - Flight Results - TravelEase`;
    $('#hotelDealsTitle').text(`${searchData.to} hotel deals`);

    // Initialize the page with sample data
    loadFlightResults(searchData);
    loadHotelDeals(searchData.to);
    
    // Filter functionality
    $('.filter-option input[type="checkbox"]').on('change', function() {
        filterFlights();
    });
    
    // Sort functionality
    $('#sortSelect').on('change', function() {
        sortFlights($(this).val());
    });
    
    // Hotel filter functionality
    $('.hotel-filter-btn').on('click', function() {
        $('.hotel-filter-btn').removeClass('active');
        $(this).addClass('active');
        filterHotels();
    });
});

// Load flight results
function loadFlightResults(searchData) {
    const flights = generateFlightData(searchData);
    displayFlightResults(flights);
}

// Generate sample flight data based on search
function generateFlightData(searchData) {
    const airlines = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'GoAir'];
    const flights = [];
    
    for (let i = 0; i < 6; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const price = Math.floor(Math.random() * 5000) + 5000;
        const duration = Math.floor(Math.random() * 3) + 1;
        const stops = Math.random() > 0.7 ? 1 : 0;
        
        flights.push({
            id: i + 1,
            airline: airline,
            from: searchData.from,
            to: searchData.to,
            departureTime: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '00' : '30'}`,
            arrivalTime: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '00' : '30'}`,
            returnDepartureTime: `${Math.floor(Math.random() * 12) + 12}:${Math.random() > 0.5 ? '00' : '30'}`,
            returnArrivalTime: `${Math.floor(Math.random() * 12) + 12}:${Math.random() > 0.5 ? '00' : '30'}`,
            duration: duration,
            returnDuration: duration - 0.1,
            price: price,
            stops: stops,
            deals: Math.floor(Math.random() * 10) + 1
        });
    }
    
    return flights;
}

// Display flight results
function displayFlightResults(flights) {
    const resultsHtml = flights.map(flight => `
        <div class="flight-card" data-price="${flight.price}" data-duration="${flight.duration}" data-stops="${flight.stops}">
            <div class="flight-card-header">
                <div class="airline-logo">${flight.airline}</div>
                <div class="flight-details">
                    <div class="flight-segment">
                        <div class="flight-time">${flight.departureTime}</div>
                        <div class="flight-airport">${flight.from}</div>
                        <div class="flight-date">Today</div>
                    </div>
                    <div class="flight-duration">
                        <div class="duration-text">${flight.duration}h ${flight.duration > 1 ? Math.round((flight.duration % 1) * 60) : ''}</div>
                        <div class="stops-info">${flight.stops === 0 ? 'Direct' : flight.stops + ' stop'}</div>
                    </div>
                    <div class="flight-segment">
                        <div class="flight-time">${flight.arrivalTime}</div>
                        <div class="flight-airport">${flight.to}</div>
                        <div class="flight-date">Today</div>
                    </div>
                </div>
                <div class="flight-actions">
                    <div class="flight-price">₹${flight.price.toLocaleString()}</div>
                    <div class="flight-deals">
                        ${flight.deals} deals from ₹${flight.price.toLocaleString()}
                        <i class="far fa-heart" onclick="toggleFavorite(${flight.id})"></i>
                    </div>
                    <button class="select-btn" onclick="selectFlight(${flight.id})">Select →</button>
                </div>
            </div>
            
            <!-- Return flight details -->
            <div class="flight-details">
                <div class="flight-segment">
                    <div class="flight-time">${flight.returnDepartureTime}</div>
                    <div class="flight-airport">${flight.to}</div>
                    <div class="flight-date">Tomorrow</div>
                </div>
                <div class="flight-duration">
                    <div class="duration-text">${flight.returnDuration}h ${flight.returnDuration > 1 ? Math.round((flight.returnDuration % 1) * 60) : ''}</div>
                    <div class="stops-info">${flight.stops === 0 ? 'Direct' : flight.stops + ' stop'}</div>
                </div>
                <div class="flight-segment">
                    <div class="flight-time">${flight.returnArrivalTime}</div>
                    <div class="flight-airport">${flight.from}</div>
                    <div class="flight-date">Tomorrow</div>
                </div>
            </div>
        </div>
    `).join('');
    
    $('#flightResults').html(resultsHtml);
}

// Load hotel deals
function loadHotelDeals(destination) {
    const hotels = generateHotelData(destination);
    displayHotelDeals(hotels);
}

// Generate sample hotel data
function generateHotelData(destination) {
    const hotelNames = [
        `${destination} Grand Hotel`, 
        `${destination} Palace Resort`, 
        `${destination} Business Inn`, 
        `${destination} Comfort Hotel`
    ];
    const hotels = [];
    
    for (let i = 0; i < 4; i++) {
        const price = Math.floor(Math.random() * 15000) + 1000;
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const stars = Math.floor(Math.random() * 3) + 3;
        const reviews = Math.floor(Math.random() * 10000) + 100;
        
        hotels.push({
            id: i + 1,
            name: hotelNames[i],
            price: price,
            rating: rating,
            stars: stars,
            reviews: reviews
        });
    }
    
    return hotels;
}

// Display hotel deals
function displayHotelDeals(hotels) {
    const dealsHtml = hotels.map(hotel => `
        <div class="hotel-deal-card">
            <div class="hotel-deal-image">
                <i class="fas fa-hotel"></i>
            </div>
            <div class="hotel-deal-info">
                <div class="hotel-deal-name">${hotel.name}</div>
                <div class="hotel-deal-rating">
                    <div class="hotel-stars">
                        ${'★'.repeat(hotel.stars)}${'☆'.repeat(5 - hotel.stars)}
                    </div>
                    <div class="hotel-rating-text">${hotel.rating}/5 ${hotel.rating >= 4.5 ? 'With honours' : 'Very good'} ${hotel.reviews.toLocaleString()} reviews</div>
                </div>
                <div class="hotel-deal-price">₹${hotel.price.toLocaleString()} per night</div>
                <button class="view-details-btn" onclick="viewHotelDetails(${hotel.id})">View details</button>
            </div>
        </div>
    `).join('');
    
    $('#hotelDeals').html(dealsHtml);
}

// Filter flights
function filterFlights() {
    const selectedStops = [];
    const selectedAirlines = [];
    
    // Get selected filters
    $('.filter-option input[type="checkbox"]:checked').each(function() {
        const id = $(this).attr('id');
        if (['direct', 'oneStop', 'twoStops'].includes(id)) {
            selectedStops.push(id);
        } else if (['starAlliance', 'airIndia', 'indigo', 'airlineCombinations'].includes(id)) {
            selectedAirlines.push(id);
        }
    });
    
    // Apply filters to flight cards
    $('.flight-card').each(function() {
        const card = $(this);
        const stops = parseInt(card.data('stops'));
        const airline = card.find('.airline-logo').text();
        
        let showCard = true;
        
        // Filter by stops
        if (selectedStops.length > 0) {
            const hasDirect = selectedStops.includes('direct') && stops === 0;
            const hasOneStop = selectedStops.includes('oneStop') && stops === 1;
            const hasTwoStops = selectedStops.includes('twoStops') && stops >= 2;
            
            if (!hasDirect && !hasOneStop && !hasTwoStops) {
                showCard = false;
            }
        }
        
        // Filter by airlines
        if (selectedAirlines.length > 0) {
            const airlineMatches = selectedAirlines.some(selected => {
                switch(selected) {
                    case 'airIndia': return airline === 'Air India';
                    case 'indigo': return airline === 'IndiGo';
                    default: return true;
                }
            });
            
            if (!airlineMatches) {
                showCard = false;
            }
        }
        
        card.toggle(showCard);
    });
    
    updateResultsCount();
}

// Sort flights
function sortFlights(sortBy) {
    const cards = $('.flight-card').get();
    
    cards.sort((a, b) => {
        const cardA = $(a);
        const cardB = $(b);
        
        switch(sortBy) {
            case 'Sort by Price':
                return cardA.data('price') - cardB.data('price');
            case 'Sort by Duration':
                return cardA.data('duration') - cardB.data('duration');
            case 'Sort by Departure Time':
                const timeA = cardA.find('.flight-time').first().text();
                const timeB = cardB.find('.flight-time').first().text();
                return timeA.localeCompare(timeB);
            default:
                return 0;
        }
    });
    
    $('#flightResults').html(cards);
}

// Filter hotels
function filterHotels() {
    const activeFilter = $('.hotel-filter-btn.active').text();
    
    $('.hotel-deal-card').each(function() {
        const card = $(this);
        const rating = parseFloat(card.find('.hotel-rating-text').text().split('/')[0]);
        const stars = card.find('.hotel-stars').text().split('★').length - 1;
        
        let showCard = true;
        
        switch(activeFilter) {
            case '4 stars+':
                showCard = stars >= 4;
                break;
            case '3 stars+':
                showCard = stars >= 3;
                break;
            case 'Excellent reviews':
                showCard = rating >= 4.5;
                break;
            default:
                showCard = true;
        }
        
        card.toggle(showCard);
    });
}

// Update results count
function updateResultsCount() {
    const visibleCards = $('.flight-card:visible').length;
    const totalCards = $('.flight-card').length;
    $('#resultsCount').text(`${visibleCards} of ${totalCards} results (show all)`);
}

// Toggle favorite
function toggleFavorite(flightId) {
    const heart = $(`.flight-card[data-id="${flightId}"] .fa-heart`);
    heart.toggleClass('far fas');
    
    if (heart.hasClass('fas')) {
        showAlert('Flight added to favorites!', 'success');
    } else {
        showAlert('Flight removed from favorites!', 'info');
    }
}

// Select flight
function selectFlight(flightId) {
    showAlert('Redirecting to booking page...', 'info');
    setTimeout(() => {
        window.location.href = 'booking.html?flight=' + flightId;
    }, 1500);
}

// View hotel details
function viewHotelDetails(hotelId) {
    showAlert('Opening hotel details...', 'info');
    setTimeout(() => {
        window.location.href = 'hotels.html?hotel=' + hotelId;
    }, 1000);
}

// Show alert
function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('.main-content').prepend(alertHtml);
    
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 3000);
}

// Global functions
window.toggleFavorite = toggleFavorite;
window.selectFlight = selectFlight;
window.viewHotelDetails = viewHotelDetails; 