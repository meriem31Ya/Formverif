const form = document.querySelector("form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");

// constantes
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

function showFieldError({ $element, message = "Ce champ est requis" }) {
  const span = document.createElement("span");
  span.classList.add("error");
  span.textContent = message;
  $element.style.borderColor = "red";
  $element.parentElement.appendChild(span);
}

function hideFieldError({ $element }) {
  $element.style.borderColor = "black";
  $element.parentElement.querySelector("span")?.remove();
}

function checkFields({ name, email }) {
  if (!name.trim()) {
    showFieldError({
      $element: $name,
      message: "Ce champ est vide",
    });
  } else if (name && name.length < 3) {
    showFieldError({
      $element: $name,
      message: "le nom de contenir au moins 3 caractères",
    });
  } else {
    hideFieldError({ $element: $name });
  }

  //   verifier email
  if (!email) {
    showFieldError({ $element: $email, message: "ce champ est vide" });
  } else if (email && !emailRegex.test(email)) {
    showFieldError({ $element: $email, message: "format invalid" });
  } else {
    hideFieldError({ $element: $email });
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkFields({ name: $name.value, email: $email.value });
});
