const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

// CHARACTER KO SET KIA HAI EK HI JAGA
const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};


// PASSWORD KO GENERATE KRNE K FUNCTIONS
function generatePassword() {
    let availableCharacters = "";

    // Uppercase
    if (uppercase.checked) {
        availableCharacters += characters.uppercase;
    }

    // Lowercase
    if (lowercase.checked) {
        availableCharacters += characters.lowercase;
    }

    // Numbers
    if (numbers.checked) {
        availableCharacters += characters.numbers;
    }

    // Symbols
    if (symbols.checked) {
        availableCharacters += characters.symbols;
    }

    // No option selected
    if (availableCharacters.length === 0) {
        passwordInput.value = "";
        passwordInput.placeholder = "Select at least one option";
        strengthText.textContent = "None";
        gsap.to(strengthBar, {
            width: "0%",
            duration: 0.3,
            ease: "power2.out"
        });
        return;
    }

    let generatedPassword = "";

    // GENERATE PASSWORD KI LENGTH PR LOOP
    for (
        let i = 0;
        i < Number(lengthInput.value);
        i++
    ) {
        const randomIndex = Math.floor(
            Math.random() * availableCharacters.length
        );

        generatedPassword +=
            availableCharacters[randomIndex];
    }

    // Show password
    passwordInput.value = generatedPassword;

    // GSAP ANIMATIONS START
    gsap.fromTo(
        passwordInput,
        {
            opacity: 0.4,
            scale: 0.98
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "power2.out"
        }
    );

    // Check strength
    checkStrength(generatedPassword);
}


function checkStrength(value) {
    let score = 0;

    // Empty password
    if (value.length === 0) {
        strengthText.textContent = "None";

        gsap.to(strengthBar, {
            width: "0%",
            duration: 0.3,
            ease: "power2.out"
        });

        return;
    }

    if (value.length >= 12) {
        score++;
    }

    // Uppercase
    if (/[A-Z]/.test(value)) {
        score++;
    }

    // Lowercase
    if (/[a-z]/.test(value)) {
        score++;
    }

    // Numbers
    if (/[0-9]/.test(value)) {
        score++;
    }

    // Symbols
    if (/[^A-Za-z0-9]/.test(value)) {
        score++;
    }

    // WEAK
    if (score <= 2) {
        strengthText.textContent = "Weak";

        gsap.to(strengthBar, {
            width: "30%",
            duration: 0.4,
            ease: "power2.out"
        });
    }

    // MEDUIM
    else if (score <= 4) {
        strengthText.textContent = "Medium";

        gsap.to(strengthBar, {
            width: "65%",
            duration: 0.4,
            ease: "power2.out"
        });
    }

    // STRONG
    else {
        strengthText.textContent = "Strong";

        gsap.to(strengthBar, {
            width: "100%",
            duration: 0.4,
            ease: "power2.out"
        });
    }
}


// KHUD PASSWORD GENERATE KRNE K LYE INPUT EVENT LISTENER
passwordInput.addEventListener(
    "input",
    function () {
        checkStrength(passwordInput.value);
    }
);


lengthInput.addEventListener(
    "input",
    function () {
        lengthValue.textContent = lengthInput.value;
    }
);


generateBtn.addEventListener(
    "click",
    function () {
        generatePassword();

        // Button click animation
        gsap.fromTo(
            generateBtn,
            {
                scale: 0.97
            },
            {
                scale: 1,
                duration: 0.25,
                ease: "back.out(2)"
            }
        );
    }
);


uppercase.addEventListener(
    "change",
    generatePassword
);


lowercase.addEventListener(
    "change",
    generatePassword
);


numbers.addEventListener(
    "change",
    generatePassword
);


symbols.addEventListener(
    "change",
    generatePassword
);


copyBtn.addEventListener(
    "click",
    async function () {
        const value = passwordInput.value;

        // Nothing to copy
        if (!value) {
            return;
        }

        try {
            await navigator.clipboard.writeText(value);

            copyBtn.textContent = "Copied!";

            // Copy button animation
            gsap.fromTo(
                copyBtn,
                {
                    scale: 0.9
                },
                {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(2)"
                }
            );

            // Reset button
            setTimeout(
                function () {
                    copyBtn.textContent = "Copy";
                },
                1500
            );

        } catch (error) {
            copyBtn.textContent = "Copy failed";

            setTimeout(
                function () {
                    copyBtn.textContent = "Copy";
                },
                1500
            );
        }
    }
);


// AUTO GENERATE PASSWORD
generatePassword();


// GSAP PAGE ANIMATION
gsap.from(".password-card", {
    y: 30,
    opacity: 0,
    scale: 0.98,
    duration: 0.5,
    ease: "power3.out"
});


gsap.from(".header > *", {
    y: 15,
    opacity: 0,
    duration: 0.35,
    stagger: 0.06,
    delay: 0.15,
    ease: "power2.out"
});


gsap.from(
    ".password-box, .strength-container, .option, .options",
    {
        y: 12,
        opacity: 0,
        duration: 0.3,
        stagger: 0.06,
        delay: 0.3,
        ease: "power2.out"
    }
);


// GENERATE BUTTON HOVER
generateBtn.addEventListener(
    "mouseenter",
    function () {
        gsap.to(generateBtn, {
            scale: 1.02,
            y: -2,
            duration: 0.2,
            ease: "power2.out"
        });
    }
);


generateBtn.addEventListener(
    "mouseleave",
    function () {
        gsap.to(generateBtn, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
        });
    }
);