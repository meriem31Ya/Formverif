// Sélection des éléments du formulaire
const form = document.querySelector("form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");
const $pass = document.querySelector("#password");

/**
 * Supprime tous les messages d'erreur précédents (éléments <span> avec la classe "error")
 */
function removeErrors() {
  const spans = document.querySelectorAll("span.error");
  spans.forEach((span) => span.remove());
}

// Regex pour valider un email simple (lettres, chiffres, points, tirets)
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

// Regex pour un mot de passe fort : au moins 8 caractères, une majuscule, une minuscule et un chiffre
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Affiche un message d'erreur sous le champ concerné
 * @param {HTMLElement} $element - Le champ de formulaire concerné
 * @param {string} message - Le message d'erreur à afficher
 */
function showFieldError({ $element, message = "Ce champ est requis" }) {
  const span = document.createElement("span");
  span.classList.add("error"); // Ajoute une classe CSS pour le style
  $element.style.borderColor = "red"; // Met une bordure rouge pour signaler l'erreur
  $element.parentElement.appendChild(span).textContent = message;
}

/**
 * Supprime l'erreur affichée et remet la bordure du champ en noir
 */
function hideFeildError({ $element }) {
  $element.style.borderColor = "#ccc";
  $element.parentElement.querySelector("span")?.remove();
}

/**
 * Vérifie les champs du formulaire un à un et affiche des messages d'erreur si nécessaire
 * @param {string} name - Le nom saisi
 * @param {string} email - L'email saisi
 * @param {string} password - Le mot de passe saisi
 * @param {boolean} check - Statut de la case à cocher (ex: acceptation RGPD)
 */
function checkFields({ name, email, password, check }) {
  // Vérification du champ nom
  if (!name) {
    showFieldError({
      $element: $name,
      message: "Veuillez introduire un nom valide",
    });
  } else if (name.length < 3) {
    showFieldError({
      $element: $name,
      message: "Le nom doit contenir au moins 3 caractères",
    });
  } else {
    hideFeildError({ $element: $name });
  }

  // Vérification du champ email
  if (!email) {
    showFieldError({
      $element: $email,
      message: "Veuillez insérer un email",
    });
  } else if (!emailRegex.test(email)) {
    showFieldError({ $element: $email, message: "Format d'email invalide" });
  } else {
    hideFeildError({ $element: $email });
  }

  // Vérification du mot de passe
  const t = passwordRegex.test(password); // Pour debug
  console.log({ t });

  if (!password) {
    showFieldError({
      $element: $pass,
      message: "Veuillez insérer un mot de passe",
    });
  } else if (!passwordRegex.test(password)) {
    console.log("test"); // Debug
    showFieldError({
      $element: $pass,
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
    });
  } else {
    hideFeildError({ $element: $pass });
  }
}

// Événement lors de la soumission du formulaire
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi classique du formulaire
  console.log("envoyer");

  removeErrors(); // Supprime tous les anciens messages d'erreur

  // Récupération des données du formulaire via FormData
  let formdata = new FormData(form);
  let name = formdata.get("name");
  let email = formdata.get("email");
  let password = formdata.get("password");
  let check = formdata.get("rgpd"); // Optionnel : peut être utilisé pour valider l'acceptation RGPD

  // Vérification des champs
  checkFields({ name, email, password, check });
});
