
    // Add input validation for phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
            if (value.length > 3 && value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
            this.value = value.slice(0, 12); // Limit to 12 characters (including dashes)
        });
    }

    // Add input validation for first and last name
    const firstNameInput = document.getElementById('firstName');
    if (firstNameInput) {
        firstNameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z]/g, '').slice(0, 20);
        });
    }

    const lastNameInput = document.getElementById('lastName');
    if (lastNameInput) {
        lastNameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z]/g, '').slice(0, 20);
        });
    }

    // Attach form submission handler
    const form = document.getElementById('yourFormId'); // Replace 'yourFormId' with the actual form ID
    if (form) {
        form.addEventListener('submit', storeUserData);
    }


let formSubmitted = false;

function storeUserData(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    if (formSubmitted) return;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value.replace(/-/g, '');
    const autoSignIn = document.getElementById('autoSignIn').checked;
    const company = document.getElementById('company').value.trim();

    if (!isValidName(firstName) || !isValidName(lastName)) {
        alert('Names can only contain letters and must not exceed 20 characters.');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    const userData = {
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
        email: email,
        phone: phone,
        autoSignIn: autoSignIn,
        company: company
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    displayThankYouMessage(userData.firstName);

    formSubmitted = true;
    disableFormFields();

    // Display user data on the Ace card
    document.getElementById('aceFirstName').textContent = userData.firstName;
    document.getElementById('aceLastName').textContent = userData.lastName;
    document.getElementById('aceEmail').textContent = userData.email;
    document.getElementById('acePhone').textContent = userData.phone;
    document.getElementById('aceCompany').textContent = userData.company;
    document.getElementById('aceAutoSignIn').textContent = userData.autoSignIn ? 'Yes' : 'No';

    document.getElementById('aceCard').style.display = 'block';
}

function isValidName(name) {
    const regex = /^[a-zA-Z]{1,20}$/;
    return regex.test(name);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function displayThankYouMessage(firstName) {
    const thankYouMessage = document.getElementById('thankYouMessage');
    if (thankYouMessage) {
        thankYouMessage.textContent = `Thank you for registering, ${firstName}!`;
        thankYouMessage.style.display = 'block';
    }
}

function disableFormFields() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'company', 'autoSignIn'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.disabled = true;
        }
    });
}

function recordData() {
    const userInput = document.getElementById('userInput').value;
    const recordedData = document.getElementById('recordedData');
    const card = document.querySelector('.king-of-hearts-card');

    recordedData.textContent = userInput;
    card.style.display = 'block';
}