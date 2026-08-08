// Global showAlert function
window.showAlert = function(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Remove existing alerts
    $('.alert').remove();
    
    // Add new alert at the top of the page
    $('body').prepend(alertHtml);
    
    // Auto-dismiss after 5 seconds
    setTimeout(function() {
        $('.alert').fadeOut();
    }, 5000);
};

$(document).ready(function() {
    // Initialize tooltips and popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
            
            // Update active navigation
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Update active navigation on scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.nav-link.active').removeClass('active');
                $('.nav-link').eq(i).addClass('active');
            }
        });
    });

    // Flight Search Form
    $('#flightSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const from = $('#flightFrom').val();
        const to = $('#flightTo').val();
        const departure = $('#flightDeparture').val();
        const returnDate = $('#flightReturn').val();
        const passengers = $('#flightPassengers').val();

        if (!from || !to || !departure) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.html('<span class="loading"></span> Searching...');
        submitBtn.prop('disabled', true);
    
    // Simulate API call
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // Show search results
            showFlightResults({
                from: from,
                to: to,
                departure: departure,
                returnDate: returnDate,
                passengers: passengers
            });
    }, 2000);
});

    // Hotel Search Form
    $('#hotelSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const destination = $('#hotelDestination').val();
        const checkIn = $('#hotelCheckIn').val();
        const checkOut = $('#hotelCheckOut').val();
        const guests = $('#hotelGuests').val();

        if (!destination || !checkIn || !checkOut) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.html('<span class="loading"></span> Searching...');
        submitBtn.prop('disabled', true);

        // Simulate API call
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // Show search results
            showHotelResults({
                destination: destination,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests
            });
        }, 2000);
    });

    // Package Search Form
    $('#packageSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const destination = $('#packageDestination').val();
        const departure = $('#packageDeparture').val();
        const duration = $('#packageDuration').val();
        const travelers = $('#packageTravelers').val();
        const budget = $('#packageBudget').val();

        if (!destination || !departure) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.html('<span class="loading"></span> Searching...');
        submitBtn.prop('disabled', true);

        // Simulate API call
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // Show search results
            showPackageResults({
                destination: destination,
                departure: departure,
                duration: duration,
                travelers: travelers,
                budget: budget
            });
        }, 2000);
    });

    // Login Form
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        const password = $(this).find('input[type="password"]').val();

        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Simulate login
        showAlert('Login successful! Welcome back.', 'success');
        $('#loginModal').modal('hide');
        
        // Update navbar
        updateNavbarAfterLogin();
    });

    // Register Form
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        const firstName = $(this).find('input[type="text"]').first().val();
        const lastName = $(this).find('input[type="text"]').last().val();
        const email = $(this).find('input[type="email"]').val();
        const password = $(this).find('input[type="password"]').first().val();
        const confirmPassword = $(this).find('input[type="password"]').last().val();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }

        // Simulate registration
        showAlert('Account created successfully! You can now login.', 'success');
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    });

    // Contact Form
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: $(this).find('input[type="text"]').first().val(),
            lastName: $(this).find('input[type="text"]').last().val(),
            email: $(this).find('input[type="email"]').val(),
            phone: $(this).find('input[type="tel"]').val(),
            subject: $(this).find('select').val(),
            message: $(this).find('textarea').val()
        };

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<span class="loading"></span> Sending...');
        submitBtn.prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            showAlert('Thank you for your message! We\'ll get back to you soon.', 'success');
            $('#contactForm')[0].reset();
        }, 2000);
    });

    // Newsletter Form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        if (!email) {
            showAlert('Please enter your email address', 'danger');
            return;
        }

        showAlert('Thank you for subscribing to our newsletter!', 'success');
        $(this).find('input[type="email"]').val('');
    });

    // Destination card click handler
    $('.destination-card').on('click', function() {
        const destination = $(this).find('h4').text();
        showAlert(`Exploring ${destination}... Redirecting to search page.`, 'info');
        
        // Switch to search tab
        setTimeout(function() {
            $('#packages-tab').tab('show');
            $('#packageDestination').val(destination.split(',')[0]);
        }, 1000);
    });

    // Set minimum dates for date inputs
    const today = new Date().toISOString().split('T')[0];
    $('input[type="date"]').attr('min', today);

    // Auto-fill return date for flights
    $('#flightDeparture').on('change', function() {
        const departureDate = new Date($(this).val());
        const returnDate = new Date(departureDate);
        returnDate.setDate(returnDate.getDate() + 7);
        $('#flightReturn').val(returnDate.toISOString().split('T')[0]);
    });

    // Auto-fill check-out date for hotels
    $('#hotelCheckIn').on('change', function() {
        const checkInDate = new Date($(this).val());
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + 2);
        $('#hotelCheckOut').val(checkOutDate.toISOString().split('T')[0]);
    });

    // Initialize search suggestions
    initializeSearchSuggestions();
});

// Show flight search results
function showFlightResults(searchData) {
    const resultsHtml = `
        <div class="search-results mt-4">
            <h4>Flight Results</h4>
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>Economy Class</h5>
                            <span class="price">$299</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.from}</strong> → <strong>${searchData.to}</strong></p>
                            <p>Departure: ${searchData.departure}</p>
                            <p>Return: ${searchData.returnDate}</p>
                            <p>Passengers: ${searchData.passengers}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>Business Class</h5>
                            <span class="price">$599</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.from}</strong> → <strong>${searchData.to}</strong></p>
                            <p>Departure: ${searchData.departure}</p>
                            <p>Return: ${searchData.returnDate}</p>
                            <p>Passengers: ${searchData.passengers}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#flights-search').append(resultsHtml);
    showAlert('Flight search completed!', 'success');
}

// Show hotel search results
function showHotelResults(searchData) {
    const resultsHtml = `
        <div class="search-results mt-4">
            <h4>Hotel Results</h4>
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>Luxury Hotel</h5>
                            <span class="price">$199/night</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.destination}</strong></p>
                            <p>Check-in: ${searchData.checkIn}</p>
                            <p>Check-out: ${searchData.checkOut}</p>
                            <p>Guests: ${searchData.guests}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>Boutique Hotel</h5>
                            <span class="price">$149/night</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.destination}</strong></p>
                            <p>Check-in: ${searchData.checkIn}</p>
                            <p>Check-out: ${searchData.checkOut}</p>
                            <p>Guests: ${searchData.guests}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#hotels-search').append(resultsHtml);
    showAlert('Hotel search completed!', 'success');
}

// Show package search results
function showPackageResults(searchData) {
    const resultsHtml = `
        <div class="search-results mt-4">
            <h4>Package Results</h4>
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>All-Inclusive Package</h5>
                            <span class="price">$1,299</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.destination}</strong></p>
                            <p>Duration: ${searchData.duration} days</p>
                            <p>Travelers: ${searchData.travelers}</p>
                            <p>Budget: ${searchData.budget}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="result-card">
                        <div class="result-header">
                            <h5>Adventure Package</h5>
                            <span class="price">$999</span>
                        </div>
                        <div class="result-details">
                            <p><strong>${searchData.destination}</strong></p>
                            <p>Duration: ${searchData.duration} days</p>
                            <p>Travelers: ${searchData.travelers}</p>
                            <p>Budget: ${searchData.budget}</p>
                        </div>
                        <button class="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#packages-search').append(resultsHtml);
    showAlert('Package search completed!', 'success');
}

// Update navbar after login
function updateNavbarAfterLogin() {
    $('.navbar-nav .btn-outline-light').replaceWith(`
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user"></i> My Account
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"><i class="fas fa-ticket-alt"></i> My Bookings</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </li>
    `);
}

// Logout function
function logout() {
    showAlert('Logged out successfully', 'info');
    location.reload();
}

// Initialize search suggestions
function initializeSearchSuggestions() {
    const cities = [
        // United States
        'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
        'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
        'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
        'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
        'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
        'Miami, FL', 'Orlando, FL', 'Las Vegas, NV', 'Atlanta, GA', 'New Orleans, LA',
        'Portland, OR', 'Salt Lake City, UT', 'Kansas City, MO', 'Minneapolis, MN',
        
        // Europe
        'London, UK', 'Paris, France', 'Berlin, Germany', 'Madrid, Spain', 'Rome, Italy',
        'Amsterdam, Netherlands', 'Barcelona, Spain', 'Prague, Czech Republic', 'Vienna, Austria',
        'Budapest, Hungary', 'Krakow, Poland', 'Warsaw, Poland', 'Bratislava, Slovakia',
        'Ljubljana, Slovenia', 'Zagreb, Croatia', 'Belgrade, Serbia', 'Sofia, Bulgaria',
        'Bucharest, Romania', 'Athens, Greece', 'Istanbul, Turkey', 'Moscow, Russia',
        'St. Petersburg, Russia', 'Stockholm, Sweden', 'Oslo, Norway', 'Copenhagen, Denmark',
        'Helsinki, Finland', 'Reykjavik, Iceland', 'Dublin, Ireland', 'Edinburgh, Scotland',
        'Manchester, UK', 'Birmingham, UK', 'Glasgow, Scotland', 'Cardiff, Wales',
        
        // Asia
        'Tokyo, Japan', 'Osaka, Japan', 'Kyoto, Japan', 'Seoul, South Korea', 'Busan, South Korea',
        'Beijing, China', 'Shanghai, China', 'Guangzhou, China', 'Shenzhen, China', 'Hong Kong',
        'Taipei, Taiwan', 'Singapore', 'Bangkok, Thailand', 'Chiang Mai, Thailand', 'Phuket, Thailand',
        'Kuala Lumpur, Malaysia', 'Penang, Malaysia', 'Jakarta, Indonesia', 'Bali, Indonesia',
        'Yogyakarta, Indonesia', 'Manila, Philippines', 'Cebu, Philippines', 'Ho Chi Minh City, Vietnam',
        'Hanoi, Vietnam', 'Da Nang, Vietnam', 'Phnom Penh, Cambodia', 'Siem Reap, Cambodia',
        'Vientiane, Laos', 'Luang Prabang, Laos', 'Yangon, Myanmar', 'Mandalay, Myanmar',
        'Dhaka, Bangladesh', 'Kathmandu, Nepal', 'Pokhara, Nepal', 'Thimphu, Bhutan',
        'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India', 'Kolkata, India',
        'Hyderabad, India', 'Pune, India', 'Jaipur, India', 'Agra, India', 'Varanasi, India',
        'Udaipur, India', 'Jodhpur, India', 'Jaisalmer, India', 'Goa, India', 'Kerala, India',
        'Rishikesh, India', 'Amritsar, India', 'Srinagar, India',
        
        // Middle East
        'Dubai, UAE', 'Abu Dhabi, UAE', 'Sharjah, UAE', 'Doha, Qatar', 'Kuwait City, Kuwait',
        'Manama, Bahrain', 'Muscat, Oman', 'Riyadh, Saudi Arabia', 'Jeddah, Saudi Arabia',
        'Mecca, Saudi Arabia', 'Medina, Saudi Arabia', 'Amman, Jordan', 'Petra, Jordan',
        'Jerusalem, Israel', 'Tel Aviv, Israel', 'Haifa, Israel', 'Beirut, Lebanon',
        'Damascus, Syria', 'Baghdad, Iraq', 'Tehran, Iran', 'Isfahan, Iran', 'Shiraz, Iran',
        'Yerevan, Armenia', 'Tbilisi, Georgia', 'Baku, Azerbaijan', 'Tashkent, Uzbekistan',
        'Samarkand, Uzbekistan', 'Bukhara, Uzbekistan', 'Ashgabat, Turkmenistan',
        
        // Africa
        'Cairo, Egypt', 'Alexandria, Egypt', 'Luxor, Egypt', 'Aswan, Egypt', 'Giza, Egypt',
        'Cape Town, South Africa', 'Johannesburg, South Africa', 'Durban, South Africa',
        'Pretoria, South Africa', 'Port Elizabeth, South Africa', 'Nairobi, Kenya',
        'Mombasa, Kenya', 'Dar es Salaam, Tanzania', 'Zanzibar, Tanzania', 'Arusha, Tanzania',
        'Kampala, Uganda', 'Kigali, Rwanda', 'Addis Ababa, Ethiopia', 'Lalibela, Ethiopia',
        'Marrakech, Morocco', 'Fez, Morocco', 'Casablanca, Morocco', 'Rabat, Morocco',
        'Tangier, Morocco', 'Agadir, Morocco', 'Tunis, Tunisia', 'Sousse, Tunisia',
        'Algiers, Algeria', 'Oran, Algeria', 'Tripoli, Libya', 'Khartoum, Sudan',
        'Dakar, Senegal', 'Bamako, Mali', 'Ouagadougou, Burkina Faso', 'Niamey, Niger',
        'Lagos, Nigeria', 'Abuja, Nigeria', 'Accra, Ghana', 'Kumasi, Ghana',
        'Lome, Togo', 'Cotonou, Benin', 'Porto-Novo, Benin', 'Yaounde, Cameroon',
        'Douala, Cameroon', 'Libreville, Gabon', 'Brazzaville, Republic of Congo',
        'Kinshasa, Democratic Republic of Congo', 'Luanda, Angola', 'Windhoek, Namibia',
        'Gaborone, Botswana', 'Harare, Zimbabwe', 'Lusaka, Zambia', 'Lilongwe, Malawi',
        'Maputo, Mozambique', 'Antananarivo, Madagascar', 'Victoria, Seychelles',
        'Port Louis, Mauritius', 'Saint-Denis, Reunion', 'Djibouti City, Djibouti',
        
        // Oceania
        'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia',
        'Adelaide, Australia', 'Canberra, Australia', 'Darwin, Australia', 'Hobart, Australia',
        'Gold Coast, Australia', 'Cairns, Australia', 'Alice Springs, Australia', 'Uluru, Australia',
        'Auckland, New Zealand', 'Wellington, New Zealand', 'Christchurch, New Zealand',
        'Queenstown, New Zealand', 'Rotorua, New Zealand', 'Hamilton, New Zealand',
        'Tauranga, New Zealand', 'Napier, New Zealand', 'Dunedin, New Zealand',
        'Port Moresby, Papua New Guinea', 'Lae, Papua New Guinea', 'Honiara, Solomon Islands',
        'Port Vila, Vanuatu', 'Noumea, New Caledonia', 'Suva, Fiji', 'Nadi, Fiji',
        'Apia, Samoa', 'Nuku\'alofa, Tonga', 'Alofi, Niue', 'Avarua, Cook Islands',
        'Papeete, French Polynesia', 'Majuro, Marshall Islands', 'Palikir, Micronesia',
        'Yaren, Nauru', 'Tarawa, Kiribati', 'Funafuti, Tuvalu', 'Palikir, Micronesia',
        
        // Americas
        'Toronto, Canada', 'Montreal, Canada', 'Vancouver, Canada', 'Calgary, Canada',
        'Edmonton, Canada', 'Ottawa, Canada', 'Quebec City, Canada', 'Winnipeg, Canada',
        'Halifax, Canada', 'Victoria, Canada', 'Mexico City, Mexico', 'Guadalajara, Mexico',
        'Monterrey, Mexico', 'Puebla, Mexico', 'Cancun, Mexico', 'Tijuana, Mexico',
        'Merida, Mexico', 'Oaxaca, Mexico', 'San Miguel de Allende, Mexico', 'Puerto Vallarta, Mexico',
        'Sao Paulo, Brazil', 'Rio de Janeiro, Brazil', 'Brasilia, Brazil', 'Salvador, Brazil',
        'Recife, Brazil', 'Fortaleza, Brazil', 'Belo Horizonte, Brazil', 'Curitiba, Brazil',
        'Porto Alegre, Brazil', 'Manaus, Brazil', 'Buenos Aires, Argentina', 'Cordoba, Argentina',
        'Rosario, Argentina', 'Mendoza, Argentina', 'Bariloche, Argentina', 'Ushuaia, Argentina',
        'Santiago, Chile', 'Valparaiso, Chile', 'Antofagasta, Chile', 'La Serena, Chile',
        'Lima, Peru', 'Cusco, Peru', 'Arequipa, Peru', 'Trujillo, Peru', 'Iquitos, Peru',
        'Bogota, Colombia', 'Medellin, Colombia', 'Cali, Colombia', 'Cartagena, Colombia',
        'Santa Marta, Colombia', 'Bucaramanga, Colombia', 'Quito, Ecuador', 'Guayaquil, Ecuador',
        'Cuenca, Ecuador', 'Galapagos Islands, Ecuador', 'Caracas, Venezuela', 'Maracaibo, Venezuela',
        'Valencia, Venezuela', 'Barquisimeto, Venezuela', 'La Paz, Bolivia', 'Santa Cruz, Bolivia',
        'Cochabamba, Bolivia', 'Sucre, Bolivia', 'Asuncion, Paraguay', 'Ciudad del Este, Paraguay',
        'Montevideo, Uruguay', 'Punta del Este, Uruguay', 'Colonia del Sacramento, Uruguay',
        'Havana, Cuba', 'Santiago de Cuba, Cuba', 'Trinidad, Cuba', 'Varadero, Cuba',
        'Santo Domingo, Dominican Republic', 'Punta Cana, Dominican Republic', 'Puerto Plata, Dominican Republic',
        'San Juan, Puerto Rico', 'Ponce, Puerto Rico', 'Mayaguez, Puerto Rico', 'Kingston, Jamaica',
        'Montego Bay, Jamaica', 'Ocho Rios, Jamaica', 'Negril, Jamaica', 'Port-au-Prince, Haiti',
        'Cap-Haitien, Haiti', 'Nassau, Bahamas', 'Freeport, Bahamas', 'Bridgetown, Barbados',
        'Port of Spain, Trinidad and Tobago', 'Georgetown, Guyana', 'Paramaribo, Suriname',
        'Cayenne, French Guiana', 'Belmopan, Belize', 'Belize City, Belize', 'San Salvador, El Salvador',
        'Tegucigalpa, Honduras', 'San Pedro Sula, Honduras', 'Managua, Nicaragua', 'Leon, Nicaragua',
        'San Jose, Costa Rica', 'Liberia, Costa Rica', 'Panama City, Panama', 'Colon, Panama',
        'Guatemala City, Guatemala', 'Antigua Guatemala, Guatemala', 'Tikal, Guatemala'
    ];

    // Add autocomplete functionality
    $('input[type="text"]').on('input', function() {
        const value = $(this).val().toLowerCase();
        const suggestions = cities.filter(city => 
            city.toLowerCase().includes(value)
        ).slice(0, 5);

        // Remove existing suggestions
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

    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('input, .suggestions').length) {
            $('.suggestions').remove();
        }
    });
}

// Add CSS for search suggestions
const suggestionStyles = `
<style>
.suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 8px 8px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.suggestion-item {
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
}

.suggestion-item:hover {
    background: #f8f9fa;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.search-results {
    margin-top: 2rem;
}

.result-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.result-card:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.price {
    font-size: 1.25rem;
    font-weight: 600;
    color: #007bff;
}

.result-details p {
    margin-bottom: 0.5rem;
    color: #6c757d;
}

.result-details strong {
    color: #333;
}
</style>
`;

$('head').append(suggestionStyles); 