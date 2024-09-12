document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("successMessage").style.display = "block";

    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData.entries()));

    localStorage.setItem("username", formData.get("username"));
    localStorage.setItem("firstname", formData.get("firstname"));
    localStorage.setItem("lastname", formData.get("lastname"));
    localStorage.setItem("email", formData.get("email"));

    setTimeout(function () {
      window.location.href = "movies.html";
    }, 1000);
  });

document.addEventListener('DOMContentLoaded', function() {
    showSlide(1);
});

let GlobalSlideNo = 1;

function showSlide(slideNo) {
    const slides = document.querySelectorAll('.input-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    document.getElementById(`slide${slideNo}`).classList.add('active');
}

function NextSlide(SlideNo) {
    event.preventDefault();
    if (!validateSlide(SlideNo)) {
        return;
    }
    GlobalSlideNo = SlideNo + 1;
    showSlide(GlobalSlideNo);
}

function validateSlide(slideNo) {
    let isValid = true;
    clearErrors();

    switch (slideNo) {
        case 1:
            const username = document.querySelector('[name="username"]').value.trim();
            const firstname = document.querySelector('[name="firstname"]').value.trim();
            const lastname = document.querySelector('[name="lastname"]').value.trim();

            if (username === "") {
                document.getElementById("usernameError").innerText = "Username is required";
                isValid = false;
            }
            if (firstname === "") {
                document.getElementById("firstnameError").innerText = "First name is required";
                isValid = false;
            }
            if (lastname === "") {
                document.getElementById("lastnameError").innerText = "Last name is required";
                isValid = false;
            }
            break;

        case 2:
            const email = document.querySelector('[name="email"]').value.trim();

            if (email === "") {
                document.getElementById("emailError").innerText = "Email is required";
                isValid = false;
            } else if (!email.includes(".com")) {
                document.getElementById("emailError").innerText = "Email format is not correct";
                isValid = false;
            }
            break;

        case 3:
            const password = document.querySelector('[name="password"]').value.trim();
            const confirmPassword = document.querySelector('[name="confirm-password"]').value.trim();

            if (password === "") {
                document.getElementById("passwordError").innerText = "Password is required";
                isValid = false;
            }
            if (confirmPassword === "") {
                document.getElementById("confirmPasswordError").innerText = "Confirm Password is required";
                isValid = false;
            }
            if (password !== confirmPassword) {
                document.getElementById("passwordError").innerText = "Passwords do not match";
                document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
                isValid = false;
            }
            break;
    }

    return isValid;
}

function goBack(slideNo) {
    showSlide(slideNo);
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(error => error.innerText = "");
}