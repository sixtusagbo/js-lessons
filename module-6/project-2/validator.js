// Smart Contact Form with Real-time Validation
// Demonstrates form handling, validation, and user feedback

console.log("📧 Contact Form Validator Starting...");

// DOM Elements
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');
const sendAnotherBtn = document.getElementById('send-another');

// Form fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');
const termsField = document.getElementById('terms');
const newsletterField = document.getElementById('newsletter');

// Feedback elements
const nameFeedback = document.getElementById('name-feedback');
const emailFeedback = document.getElementById('email-feedback');
const phoneFeedback = document.getElementById('phone-feedback');
const subjectFeedback = document.getElementById('subject-feedback');
const messageFeedback = document.getElementById('message-feedback');
const termsFeedback = document.getElementById('terms-feedback');

// Status elements
const formValidStatus = document.getElementById('form-valid-status');
const fieldsCompleted = document.getElementById('fields-completed');
const charCount = document.getElementById('char-count');

// Validation rules and patterns
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        message: "Name should contain only letters and spaces (2-50 characters)"
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
    },
    phone: {
        required: false,
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: "Please enter a valid phone number"
    },
    subject: {
        required: true,
        message: "Please select a subject"
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        message: "Message should be between 10-500 characters"
    },
    terms: {
        required: true,
        message: "You must agree to the terms of service"
    }
};

// Validation functions
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true, message: "" };

    // Check if required field is empty
    if (rules.required && (!value || value.trim() === "")) {
        return { isValid: false, message: `${fieldName} is required` };
    }

    // If field is empty and not required, it's valid
    if (!rules.required && (!value || value.trim() === "")) {
        return { isValid: true, message: "" };
    }

    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
        return { isValid: false, message: `Minimum ${rules.minLength} characters required` };
    }

    // Check maximum length
    if (rules.maxLength && value.length > rules.maxLength) {
        return { isValid: false, message: `Maximum ${rules.maxLength} characters allowed` };
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        return { isValid: false, message: rules.message };
    }

    return { isValid: true, message: "✓ Looks good!" };
}

// Special validation for checkbox
function validateCheckbox(fieldName, isChecked) {
    const rules = validationRules[fieldName];
    if (rules && rules.required && !isChecked) {
        return { isValid: false, message: rules.message };
    }
    return { isValid: true, message: "" };
}

// Update field feedback
function updateFieldFeedback(field, feedbackElement, validation) {
    if (validation.isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        feedbackElement.textContent = validation.message;
        feedbackElement.className = 'feedback success';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        feedbackElement.textContent = validation.message;
        feedbackElement.className = 'feedback error';
    }
}

// Update character counter for message field
function updateCharCounter() {
    const count = messageField.value.length;
    charCount.textContent = count;
    
    if (count > 450) {
        charCount.style.color = '#dc3545';
    } else if (count > 400) {
        charCount.style.color = '#ffc107';
    } else {
        charCount.style.color = '#666';
    }
}

// Check overall form validity
function checkFormValidity() {
    const nameValid = validateField('name', nameField.value).isValid;
    const emailValid = validateField('email', emailField.value).isValid;
    const phoneValid = validateField('phone', phoneField.value).isValid;
    const subjectValid = validateField('subject', subjectField.value).isValid;
    const messageValid = validateField('message', messageField.value).isValid;
    const termsValid = validateCheckbox('terms', termsField.checked).isValid;

    const allValid = nameValid && emailValid && phoneValid && subjectValid && messageValid && termsValid;
    
    // Count completed required fields
    const requiredFields = [nameField.value, emailField.value, subjectField.value, messageField.value];
    const completedFields = requiredFields.filter(field => field.trim() !== "").length + (termsField.checked ? 1 : 0);
    
    // Update status display
    formValidStatus.textContent = allValid ? "✅ Yes" : "❌ No";
    formValidStatus.style.color = allValid ? "#28a745" : "#dc3545";
    fieldsCompleted.textContent = `${completedFields}/5`;
    
    // Enable/disable submit button
    submitBtn.disabled = !allValid;
    
    console.log(`Form validity: ${allValid}, Completed fields: ${completedFields}/5`);
    
    return allValid;
}

// Event listeners for real-time validation
nameField.addEventListener('input', (e) => {
    const validation = validateField('name', e.target.value);
    updateFieldFeedback(nameField, nameFeedback, validation);
    checkFormValidity();
});

emailField.addEventListener('input', (e) => {
    const validation = validateField('email', e.target.value);
    updateFieldFeedback(emailField, emailFeedback, validation);
    checkFormValidity();
});

phoneField.addEventListener('input', (e) => {
    const validation = validateField('phone', e.target.value);
    updateFieldFeedback(phoneField, phoneFeedback, validation);
    checkFormValidity();
});

subjectField.addEventListener('change', (e) => {
    const validation = validateField('subject', e.target.value);
    updateFieldFeedback(subjectField, subjectFeedback, validation);
    checkFormValidity();
});

messageField.addEventListener('input', (e) => {
    const validation = validateField('message', e.target.value);
    updateFieldFeedback(messageField, messageFeedback, validation);
    updateCharCounter();
    checkFormValidity();
});

termsField.addEventListener('change', (e) => {
    const validation = validateCheckbox('terms', e.target.checked);
    updateFieldFeedback(termsField, termsFeedback, validation);
    checkFormValidity();
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    
    console.log("📤 Form submitted!");
    
    // Collect form data
    const formData = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        subject: subjectField.value,
        message: messageField.value,
        newsletter: newsletterField.checked,
        terms: termsField.checked,
        timestamp: new Date().toISOString()
    };
    
    console.log("Form data:", formData);
    
    // Simulate form submission
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        console.log("✅ Form submitted successfully!");
    }, 1500);
});

// Send another message button
sendAnotherBtn.addEventListener('click', () => {
    // Reset form
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Clear all validation classes and feedback
    [nameField, emailField, phoneField, subjectField, messageField, termsField].forEach(field => {
        field.classList.remove('valid', 'invalid');
    });
    
    [nameFeedback, emailFeedback, phoneFeedback, subjectFeedback, messageFeedback, termsFeedback].forEach(feedback => {
        feedback.textContent = '';
        feedback.className = 'feedback';
    });
    
    // Reset submit button
    submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon">📤</span>';
    submitBtn.disabled = true;
    
    // Reset counters
    updateCharCounter();
    checkFormValidity();
    
    console.log("🔄 Form reset for new message");
});

// Initialize the form
function initForm() {
    console.log("🚀 Initializing contact form...");
    updateCharCounter();
    checkFormValidity();
    nameField.focus();
}

// Start the form when DOM is loaded
document.addEventListener('DOMContentLoaded', initForm);
