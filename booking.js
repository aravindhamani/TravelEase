$(document).ready(function() {
    // Get booking type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bookingType = urlParams.get('flight') ? 'flight' : 
                       urlParams.get('hotel') ? 'hotel' : 
                       urlParams.get('package') ? 'package' : null;
    
    const bookingId = urlParams.get('flight') || urlParams.get('hotel') || urlParams.get('package');
    
    if (bookingType && bookingId) {
        loadBookingDetails(bookingType, bookingId);
    } else {
        // Redirect to home if no booking type specified
        window.location.href = 'index.html';
    }

    // Initialize form validation
    initializeFormValidation();
    
    // Initialize payment form
    initializePaymentForm();
});

// Load booking details based on type
function loadBookingDetails(type, id) {
    let bookingData;
    
    switch(type) {
        case 'flight':
            bookingData = getFlightBookingData(id);
            break;
        case 'hotel':
            bookingData = getHotelBookingData(id);
            break;
        case 'package':
            bookingData = getPackageBookingData(id);
            break;
    }
    
    if (bookingData) {
        displayBookingSummary(bookingData);
        displayPriceBreakdown(bookingData);
    }
}

// Get flight booking data
function getFlightBookingData(id) {
    return {
        type: 'Flight',
        title: 'New York → Los Angeles',
        airline: 'American Airlines',
        flightNumber: 'AA123',
        departure: '10:00 AM',
        arrival: '1:30 PM',
        date: '2024-03-15',
        passengers: 2,
        cabinClass: 'Economy',
        basePrice: 299,
        taxes: 45,
        fees: 25,
        total: 369
    };
}

// Get hotel booking data
function getHotelBookingData(id) {
    return {
        type: 'Hotel',
        title: 'Grand Plaza Hotel',
        location: 'New York, NY',
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        nights: 3,
        guests: 2,
        roomType: 'Deluxe Room',
        basePrice: 199,
        taxes: 30,
        fees: 15,
        total: 244
    };
}

// Get package booking data
function getPackageBookingData(id) {
    return {
        type: 'Package',
        title: 'Paris Romantic Getaway',
        destination: 'Paris, France',
        duration: '7 Days',
        travelers: 2,
        includes: ['Flight', 'Hotel', 'Breakfast', 'Guided Tours'],
        basePrice: 1299,
        taxes: 120,
        fees: 50,
        total: 1469
    };
}

// Display booking summary
function displayBookingSummary(data) {
    let summaryHtml = '';
    
    switch(data.type) {
        case 'Flight':
            summaryHtml = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Airline:</strong> ${data.airline}</p>
                        <p><strong>Flight:</strong> ${data.flightNumber}</p>
                        <p><strong>Class:</strong> ${data.cabinClass}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Date:</strong> ${data.date}</p>
                        <p><strong>Departure:</strong> ${data.departure}</p>
                        <p><strong>Arrival:</strong> ${data.arrival}</p>
                    </div>
                </div>
                <p><strong>Passengers:</strong> ${data.passengers}</p>
            `;
            break;
        case 'Hotel':
            summaryHtml = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Room Type:</strong> ${data.roomType}</p>
                        <p><strong>Guests:</strong> ${data.guests}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Check-in:</strong> ${data.checkIn}</p>
                        <p><strong>Check-out:</strong> ${data.checkOut}</p>
                        <p><strong>Nights:</strong> ${data.nights}</p>
                    </div>
                </div>
            `;
            break;
        case 'Package':
            summaryHtml = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Destination:</strong> ${data.destination}</p>
                        <p><strong>Duration:</strong> ${data.duration}</p>
                        <p><strong>Travelers:</strong> ${data.travelers}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Includes:</strong></p>
                        <ul>
                            ${data.includes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            break;
    }
    
    $('#bookingDetails').html(summaryHtml);
}

// Display price breakdown
function displayPriceBreakdown(data) {
    const priceHtml = `
        <div class="price-item d-flex justify-content-between">
            <span>Base Price:</span>
            <span>$${data.basePrice}</span>
        </div>
        <div class="price-item d-flex justify-content-between">
            <span>Taxes:</span>
            <span>$${data.taxes}</span>
        </div>
        <div class="price-item d-flex justify-content-between">
            <span>Fees:</span>
            <span>$${data.fees}</span>
        </div>
        <hr>
        <div class="price-item d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>$${data.total}</strong>
        </div>
    `;
    
    $('#priceDetails').html(priceHtml);
    $('#totalPrice').text('$' + data.total);
    
    // Store booking data for processing
    window.bookingData = data;
}

// Initialize form validation
function initializeFormValidation() {
    // Real-time validation
    $('input[required]').on('blur', function() {
        validateField($(this));
    });
    
    // Card number formatting
    $('input[placeholder*="1234"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        $(this).val(value);
    });
    
    // Expiry date formatting
    $('input[placeholder="MM/YY"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        $(this).val(value);
    });
    
    // CVV validation
    $('input[placeholder="123"]').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        $(this).val(value.substring(0, 4));
    });
}

// Validate individual field
function validateField(field) {
    const value = field.val().trim();
    const type = field.attr('type');
    
    field.removeClass('is-valid is-invalid');
    
    if (!value) {
        field.addClass('is-invalid');
        return false;
    }
    
    switch(type) {
        case 'email':
            if (!isValidEmail(value)) {
                field.addClass('is-invalid');
                return false;
            }
            break;
        case 'tel':
            if (!isValidPhone(value)) {
                field.addClass('is-invalid');
                return false;
            }
            break;
    }
    
    field.addClass('is-valid');
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Initialize payment form
function initializePaymentForm() {
    // Insurance toggle
    $('#addInsurance').on('change', function() {
        const isChecked = $(this).is(':checked');
        const insuranceAmount = 49;
        
        if (isChecked) {
            addInsuranceToPrice(insuranceAmount);
        } else {
            removeInsuranceFromPrice(insuranceAmount);
        }
    });
}

// Add insurance to price
function addInsuranceToPrice(amount) {
    const currentTotal = parseInt($('#totalPrice').text().replace('$', ''));
    const newTotal = currentTotal + amount;
    $('#totalPrice').text('$' + newTotal);
    
    // Add insurance to price breakdown
    $('#priceDetails').append(`
        <div class="price-item d-flex justify-content-between">
            <span>Travel Insurance:</span>
            <span>$${amount}</span>
        </div>
    `);
}

// Remove insurance from price
function removeInsuranceFromPrice(amount) {
    const currentTotal = parseInt($('#totalPrice').text().replace('$', ''));
    const newTotal = currentTotal - amount;
    $('#totalPrice').text('$' + newTotal);
    
    // Remove insurance from price breakdown
    $('.price-item:contains("Travel Insurance")').remove();
}

// Process booking
function processBooking() {
    // Validate all required fields
    const requiredFields = $('input[required]');
    let isValid = true;
    
    requiredFields.each(function() {
        if (!validateField($(this))) {
            isValid = false;
        }
    });
    
    // Check terms acceptance
    if (!$('#termsAccepted').is(':checked')) {
        showAlert('Please accept the terms and conditions', 'danger');
        return;
    }
    
    if (!isValid) {
        showAlert('Please fill in all required fields correctly', 'danger');
        return;
    }
    
    // Show loading state
    const submitBtn = $('.btn-primary');
    const originalText = submitBtn.html();
    submitBtn.html('<span class="loading"></span> Processing...');
    submitBtn.prop('disabled', true);
    
    // Simulate payment processing
    setTimeout(function() {
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
        
        // Simulate successful booking
        showBookingConfirmation();
    }, 3000);
}

// Show booking confirmation
function showBookingConfirmation() {
    const confirmationHtml = `
        <div class="booking-confirmation text-center py-5">
            <div class="confirmation-icon mb-4">
                <i class="fas fa-check-circle text-success fa-4x"></i>
            </div>
            <h2 class="text-success mb-3">Booking Confirmed!</h2>
            <p class="lead mb-4">Your booking has been successfully processed. You will receive a confirmation email shortly.</p>
            <div class="booking-reference mb-4">
                <h5>Booking Reference</h5>
                <p class="h3 text-primary">TRV-${Date.now().toString().slice(-6)}</p>
            </div>
            <div class="confirmation-actions">
                <a href="index.html" class="btn btn-primary me-3">
                    <i class="fas fa-home"></i> Back to Home
                </a>
                <button class="btn btn-outline-primary" onclick="window.print()">
                    <i class="fas fa-print"></i> Print Confirmation
                </button>
            </div>
        </div>
    `;
    
    $('.booking-section').html(confirmationHtml);
}

// Add CSS for booking page
const bookingStyles = `
<style>
.booking-section {
    background: #f8f9fa;
    min-height: calc(100vh - 80px);
}

.booking-form {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.booking-sidebar {
    position: sticky;
    top: 100px;
}

.price-breakdown {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.price-item {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
}

.total-price {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
}

.booking-actions {
    padding: 2rem 0;
    border-top: 1px solid #e9ecef;
    margin-top: 2rem;
}

.booking-confirmation {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin: 2rem 0;
}

.confirmation-icon {
    animation: bounce 1s ease-in-out;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.booking-reference {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    margin: 2rem 0;
}

.confirmation-actions {
    margin-top: 2rem;
}

/* Form validation styles */
.is-valid {
    border-color: #28a745 !important;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
}

.is-invalid {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}

/* Loading animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Print styles */
@media print {
    .navbar, .booking-actions, .customer-support {
        display: none !important;
    }
    
    .booking-confirmation {
        box-shadow: none;
        border: 2px solid #000;
    }
}
</style>
`;

$('head').append(bookingStyles); 