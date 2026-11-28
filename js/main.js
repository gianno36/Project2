
/* Contact Form */

/*Selects the necessary HTML elements from the contact form*/
const form = document.querySelector("#contact-form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const confirmBox = document.querySelector("#confirmation-message");
const message = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");

function showError(input, message) {
    /*Add an "inval" class to the input so that it can be styled with CSS correctly as an error */
    input.classList.add("inval");
    /*Adds an error suffix to the input's id to find the corresponding error message element */
    document.querySelector(`#${input.id}-error`).textContent = message;
    /*Unhides the error message element so that it is visible to the user */
    document.querySelector(`#${input.id}-error`).hidden = false;
}

function clearError(input) {
    /*Removes the "inval" class so that it can be styled with CSS correctly as not an error anymore*/
    input.classList.remove("inval");
    /*Clears the error message text content so that it is not visible to the user anymore*/
    document.querySelector(`#${input.id}-error`).textContent = "";
    /*Hides the error message element so that it is not visible to the user anymore*/
    document.querySelector(`#${input.id}-error`).hidden = true;
}

/*Checks whether the information entered into an input is valid*/
function checkField(input) {
    clearError(input);

    if (input.validity.valueMissing) {
        showError(input, "Please fill out this field.");
        return false;
    }

    if (input.validity.typeMismatch) {
        showError(input, "Enter a valid email address.");
        return false;
    }

    if (input.validity.tooShort) {
        showError(input, "Please write at least 1 character.");
        return false;
    }

    /*Returns true if the input passes all the validity checks*/
    return true;
}


function updateCharacterCount() {
    /*Updates the character count display */
    characterCount.textContent = `${message.value.length} / 500 characters`;
}

/*Checks if the contact form exists on the current page before running the following code*/
if (form) {

    form.addEventListener("submit", event => {
        /*Prevents the default form submission so that the page does not reload*/
        event.preventDefault();

        /*Assumes that all the fields are valid until an invalid field is found*/
        let good = true;

        /*Hides any previous confirmation message before validating the form*/
        confirmBox.hidden = true;

        /*Selects all required fields and checks each field individually*/
        form.querySelectorAll("[required]").forEach(field => {
            /*Changes good to false if any of the required fields are invalid*/
            if (!checkField(field)) good = false;
        });

        /*Checks if any of the fields are invalid*/
        if (!good) {
            /*Moves the user's focus to the first invalid field*/
            form.querySelector(".inval").focus();
            /*Stops the function so that the confirmation message is not displayed*/
            return;
        }

        /*Creates a personalized confirmation message using the first and last name entered by the user*/
        confirmBox.textContent = `Thanks, ${firstName.value} ${lastName.value}! Your form has been submitted successfully. No email has been sent.`;

        /*Unhides the confirmation message so that it is visible to the user*/
        confirmBox.hidden = false;

        /*Resets all the fields in the contact form*/
        form.reset();

        /*Updates the character counter back to zero after the form has been reset*/
        updateCharacterCount();

        /*Moves the user's focus to the confirmation message*/
        confirmBox.focus();
    });

    /*Runs the following function whenever the user changes an input in the contact form*/
    form.addEventListener("input", event => {
        /*Hides the previous confirmation message when the user begins entering new information*/
        confirmBox.hidden = true;

        /*Checks if the input being changed currently contains the inval class*/
        if (event.target.classList.contains("inval")) {
            /*Checks the field again to see if the user has corrected the error*/
            checkField(event.target);
        }
    });

    /*Updates the character counter every time the user types or removes a character from the message field*/
    message.addEventListener("input", updateCharacterCount);
}
