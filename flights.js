$(document).ready(function() {
    // Initialize date inputs
    const today = new Date().toISOString().split('T')[0];
    $('#departureDate').attr('min', today);
    $('#returnDate').attr('min', today);

    // Auto-fill return date
    $('#departureDate').on('change', function() {
        const departureDate = new Date($(this).val());
        const returnDate = new Date(departureDate);
        returnDate.setDate(returnDate.getDate() + 7);
        $('#returnDate').val(returnDate.toISOString().split('T')[0]);
    });

    // Initialize autocomplete for both inputs
    initializeAutocomplete('#flightFrom', 'from');
    initializeAutocomplete('#flightTo', 'to');

    // Flight search form
    $('#flightSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        const searchData = {
            from: $('#flightFrom').val(),
            to: $('#flightTo').val(),
            departureDate: $('#departureDate').val(),
            returnDate: $('#returnDate').val(),
            passengers: $('#passengers').val(),
            cabinClass: $('#cabinClass').val(),
            tripType: $('#tripType').val()
        };

        if (!searchData.from || !searchData.to || !searchData.departureDate) {
            showAlert('Please fill in all required fields', 'danger');
            return;
        }

        // Show loading
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<span class="loading"></span> Searching...');
        submitBtn.prop('disabled', true);

        // Simulate search and redirect to results
        setTimeout(function() {
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            // Redirect to results page with search parameters
            const params = new URLSearchParams(searchData);
            window.location.href = 'flight-results.html?' + params.toString();
        }, 2000);
    });
});

// City database for autocomplete
const cities = [
    { name: 'Chennai', code: 'MAA', country: 'India' },
    { name: 'Raipur', code: 'RPR', country: 'India' },
    { name: 'Delhi', code: 'DEL', country: 'India' },
    { name: 'Mumbai', code: 'BOM', country: 'India' },
    { name: 'Bangalore', code: 'BLR', country: 'India' },
    { name: 'Hyderabad', code: 'HYD', country: 'India' },
    { name: 'Kolkata', code: 'CCU', country: 'India' },
    { name: 'Pune', code: 'PNQ', country: 'India' },
    { name: 'Ahmedabad', code: 'AMD', country: 'India' },
    { name: 'Jaipur', code: 'JAI', country: 'India' },
    { name: 'Lucknow', code: 'LKO', country: 'India' },
    { name: 'Patna', code: 'PAT', country: 'India' },
    { name: 'Bhopal', code: 'BHO', country: 'India' },
    { name: 'Indore', code: 'IDR', country: 'India' },
    { name: 'Nagpur', code: 'NAG', country: 'India' },
    { name: 'Varanasi', code: 'VNS', country: 'India' },
    { name: 'Guwahati', code: 'GAU', country: 'India' },
    { name: 'Bhubaneswar', code: 'BBI', country: 'India' },
    { name: 'Thiruvananthapuram', code: 'TRV', country: 'India' },
    { name: 'Kochi', code: 'COK', country: 'India' },
    { name: 'Goa', code: 'GOI', country: 'India' },
    { name: 'Srinagar', code: 'SXR', country: 'India' },
    { name: 'Amritsar', code: 'ATQ', country: 'India' },
    { name: 'Chandigarh', code: 'IXC', country: 'India' },
    { name: 'Dehradun', code: 'DED', country: 'India' },
    { name: 'Shimla', code: 'SLV', country: 'India' },
    { name: 'Manali', code: 'KUU', country: 'India' },
    { name: 'Leh', code: 'IXL', country: 'India' },
    { name: 'Port Blair', code: 'IXZ', country: 'India' },
    { name: 'Imphal', code: 'IMF', country: 'India' },
    { name: 'Aizawl', code: 'AJL', country: 'India' },
    { name: 'Agartala', code: 'IXA', country: 'India' },
    { name: 'Shillong', code: 'SHL', country: 'India' },
    { name: 'Gangtok', code: 'IXB', country: 'India' },
    { name: 'Itanagar', code: 'HGI', country: 'India' },
    { name: 'Kohima', code: 'DMU', country: 'India' },
    { name: 'Aizawl', code: 'AJL', country: 'India' },
    { name: 'Silchar', code: 'IXS', country: 'India' },
    { name: 'Dibrugarh', code: 'DIB', country: 'India' },
    { name: 'Jorhat', code: 'JRH', country: 'India' },
    { name: 'Tezpur', code: 'TEZ', country: 'India' },
    { name: 'Lilabari', code: 'IXI', country: 'India' },
    { name: 'Dimapur', code: 'DMU', country: 'India' },
    { name: 'Imphal', code: 'IMF', country: 'India' },
    { name: 'Agartala', code: 'IXA', country: 'India' },
    { name: 'Silchar', code: 'IXS', country: 'India' },
    { name: 'Aizawl', code: 'AJL', country: 'India' },
    { name: 'Shillong', code: 'SHL', country: 'India' },
    { name: 'Gangtok', code: 'IXB', country: 'India' },
    { name: 'Itanagar', code: 'HGI', country: 'India' },
    { name: 'Kohima', code: 'DMU', country: 'India' }
];

// Initialize autocomplete functionality
function initializeAutocomplete(inputSelector, type) {
    const input = $(inputSelector);
    const inputGroup = input.closest('.input-group');
    
    // Create suggestions container
    const suggestionsContainer = $('<div class="autocomplete-suggestions"></div>');
    inputGroup.after(suggestionsContainer);
    
    // Handle input events
    input.on('input', function() {
        const query = $(this).val().toLowerCase();
        
        if (query.length < 2) {
            suggestionsContainer.hide();
            return;
        }
        
        // Filter cities based on query
        const filteredCities = cities.filter(city => 
            city.name.toLowerCase().includes(query) || 
            city.code.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 suggestions
        
        if (filteredCities.length > 0) {
            displaySuggestions(filteredCities, suggestionsContainer, input);
        } else {
            suggestionsContainer.hide();
        }
    });
    
    // Handle focus events
    input.on('focus', function() {
        const query = $(this).val().toLowerCase();
        if (query.length >= 2) {
            const filteredCities = cities.filter(city => 
                city.name.toLowerCase().includes(query) || 
                city.code.toLowerCase().includes(query)
            ).slice(0, 8);
            
            if (filteredCities.length > 0) {
                displaySuggestions(filteredCities, suggestionsContainer, input);
            }
        }
    });
    
    // Handle blur events
    input.on('blur', function() {
        // Delay hiding to allow for clicks
        setTimeout(() => {
            suggestionsContainer.hide();
        }, 200);
    });
    
    // Handle keydown events
    input.on('keydown', function(e) {
        const suggestions = suggestionsContainer.find('.suggestion-item');
        const activeSuggestion = suggestionsContainer.find('.suggestion-item.active');
        
        switch(e.keyCode) {
            case 40: // Down arrow
                e.preventDefault();
                if (activeSuggestion.length === 0) {
                    suggestions.first().addClass('active');
                } else {
                    activeSuggestion.removeClass('active').next().addClass('active');
                }
                break;
            case 38: // Up arrow
                e.preventDefault();
                if (activeSuggestion.length === 0) {
                    suggestions.last().addClass('active');
                } else {
                    activeSuggestion.removeClass('active').prev().addClass('active');
                }
                break;
            case 13: // Enter
                e.preventDefault();
                if (activeSuggestion.length > 0) {
                    selectSuggestion(activeSuggestion, input, suggestionsContainer);
                }
                break;
            case 27: // Escape
                suggestionsContainer.hide();
                break;
        }
    });
}

// Display suggestions
function displaySuggestions(cities, container, input) {
    const suggestionsHtml = cities.map(city => `
        <div class="suggestion-item" data-city="${city.name}" data-code="${city.code}">
            <div class="suggestion-main">
                <div class="suggestion-name">${city.name}</div>
                <div class="suggestion-code">${city.code}</div>
            </div>
            <div class="suggestion-country">${city.country}</div>
        </div>
    `).join('');
    
    container.html(suggestionsHtml).show();
    
    // Handle suggestion clicks
    container.find('.suggestion-item').on('click', function() {
        selectSuggestion($(this), input, container);
    });
    
    // Handle hover events
    container.find('.suggestion-item').on('mouseenter', function() {
        container.find('.suggestion-item').removeClass('active');
        $(this).addClass('active');
    });
}

// Select suggestion
function selectSuggestion(suggestionElement, input, container) {
    const cityName = suggestionElement.data('city');
    const cityCode = suggestionElement.data('code');
    
    input.val(cityName);
    container.hide();
    
    // Add visual feedback
    input.addClass('suggestion-selected');
    setTimeout(() => {
        input.removeClass('suggestion-selected');
    }, 500);
}

// Search route function for popular routes
function searchRoute(from, to) {
    $('#flightFrom').val(from);
    $('#flightTo').val(to);
    
    // Set default dates
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    $('#departureDate').val(today.toISOString().split('T')[0]);
    $('#returnDate').val(nextWeek.toISOString().split('T')[0]);
    
    // Scroll to search form
    $('html, body').animate({
        scrollTop: $('#flightSearchForm').offset().top - 100
    }, 500);
}

// Show alert function
function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('.search-section').prepend(alertHtml);
    
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 3000);
}

// Global functions
window.searchRoute = searchRoute; 