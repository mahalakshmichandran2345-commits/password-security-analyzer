// 1. SELECT HTML ELEMENTS

const passwordInput = document.getElementById("password");

const toggleButton = document.getElementById("togglePassword");
const clearButton = document.getElementById("clearPassword");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const lengthCheck = document.getElementById("lengthCheck");
const upperCheck = document.getElementById("upperCheck");
const lowerCheck = document.getElementById("lowerCheck");
const numberCheck = document.getElementById("numberCheck");
const symbolCheck = document.getElementById("symbolCheck");
const invalidCheck = document.getElementById("invalidCheck");

const suggestionText = document.getElementById("suggestionText");


// 2. ALLOWED SYMBOLS

const allowedSymbolRegex = /[@#$&_+*!?-]/;

const invalidSymbolRegex = /[^A-Za-z0-9@#$&_+*!?-]/;


// 3. SHOW / HIDE PASSWORD

toggleButton.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggleButton.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        toggleButton.textContent = "Show";

    }

});


// 4. ANALYZE WHEN USER TYPES

passwordInput.addEventListener("input", analyzePassword);


function analyzePassword() {

    const password = passwordInput.value;


    // 5. RESET WHEN INPUT IS EMPTY

    if (password.length === 0) {

        resetAnalyzer();
        return;

    }


    // 6. CHARACTER CHECKS

    const hasLength = password.length >= 12;

    const hasUpper = /[A-Z]/.test(password);

    const hasLower = /[a-z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSymbol = allowedSymbolRegex.test(password);

    const hasInvalidSymbol = invalidSymbolRegex.test(password);


    // 7. DISPLAY CHECK RESULTS

    function showCheck(element, condition, label) {

        element.textContent =
            label + ": " + (condition ? "✓ Yes" : "✗ No");

        element.style.color =
            condition ? "#38e6b0" : "#ff7777";

    }

    showCheck(
        lengthCheck,
        hasLength,
        "Length (12+)"
    );

    showCheck(
        upperCheck,
        hasUpper,
        "Uppercase"
    );

    showCheck(
        lowerCheck,
        hasLower,
        "Lowercase"
    );

    showCheck(
        numberCheck,
        hasNumber,
        "Numbers"
    );

    showCheck(
        symbolCheck,
        hasSymbol,
        "Allowed Symbols"
    );

    showCheck(
        invalidCheck,
        !hasInvalidSymbol,
        "Invalid Symbols"
    );


    // 8. CALCULATE STRENGTH SCORE

    let score = 0;

    if (password.length >= 8) score++;

    if (hasLength) score++;

    if (hasUpper) score++;

    if (hasLower) score++;

    if (hasNumber) score++;

    if (hasSymbol) score++;


    // 9. DETERMINE PASSWORD STRENGTH

    let strength;
    let percentage;
    let barColor;

    if (hasInvalidSymbol) {

        strength = "Invalid Characters";
        percentage = 15;
        barColor = "#ff5555";

    } else if (score <= 2) {

        strength = "Weak";
        percentage = 25;
        barColor = "#ff5555";

    } else if (score <= 4) {

        strength = "Medium";
        percentage = 65;
        barColor = "#f5b942";

    } else {

        strength = "Strong";
        percentage = 100;
        barColor = "#38e6b0";

    }


    // 10. UPDATE STRENGTH METER

    strengthFill.style.width = percentage + "%";

    strengthFill.style.background = barColor;

    strengthText.textContent = strength;

    strengthText.style.color = barColor;


    // 11. SECURITY SUGGESTIONS

    let suggestions = [];

    if (password.length < 12) {

        suggestions.push(
            "Use at least 12 characters."
        );

    }

    if (!hasUpper) {

        suggestions.push(
            "Add uppercase letters (A-Z)."
        );

    }

    if (!hasLower) {

        suggestions.push(
            "Add lowercase letters (a-z)."
        );

    }

    if (!hasNumber) {

        suggestions.push(
            "Include numbers (0-9)."
        );

    }

    if (!hasSymbol) {

        suggestions.push(
            "Include one allowed symbol: @ # $ _ & - + * ! ?"
        );

    }

    if (hasInvalidSymbol) {

        suggestions.push(
            "Remove unsupported special characters."
        );

    }

    if (suggestions.length === 0) {

        suggestions.push(
            "All basic checks passed. Avoid common and reused passwords."
        );

    }


    // 12. DISPLAY SUGGESTIONS

    suggestionText.replaceChildren();

    suggestions.forEach(function (suggestion) {

        const listItem = document.createElement("li");

        listItem.textContent = suggestion;

        suggestionText.appendChild(listItem);

    });

}


// 13. RESET FUNCTION

function resetAnalyzer() {

    strengthFill.style.width = "0%";

    strengthFill.style.background = "#38e6b0";

    strengthText.textContent = "Not Analyzed";

    strengthText.style.color = "#b9c6d8";


    lengthCheck.textContent = "Length: Not checked";
    upperCheck.textContent = "Uppercase: Not checked";
    lowerCheck.textContent = "Lowercase: Not checked";
    numberCheck.textContent = "Numbers: Not checked";
    symbolCheck.textContent = "Allowed Symbols: Not checked";
    invalidCheck.textContent = "Invalid Symbols: Not checked";

    const checks = [
        lengthCheck,
        upperCheck,
        lowerCheck,
        numberCheck,
        symbolCheck,
        invalidCheck
    ];

    checks.forEach(function (element) {
        element.style.color = "#c1ccdc";
    });

    suggestionText.replaceChildren();

    const item = document.createElement("li");

    item.textContent = "Your suggestions will appear here.";

    suggestionText.appendChild(item);

}


// 14. CLEAR BUTTON

clearButton.addEventListener("click", function () {

    passwordInput.value = "";

    passwordInput.type = "password";

    toggleButton.textContent = "Show";

    resetAnalyzer();

});