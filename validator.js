// Importation de la bibliothèque Yup depuis un CDN (pour la validation de formulaire)
import * as yup from "https://esm.sh/yup";

// Sélection des éléments du DOM du formulaire
const form = document.querySelector("form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $rgpd = document.querySelector("#rgpd");

// Fonction pour supprimer tous les messages d'erreur affichés précédemment
function removeErrors() {
  const spans = document.querySelectorAll("span.error");
  spans.forEach((span) => span.remove());
}

// Fonction pour afficher un message d'erreur sous un champ spécifique
function showFieldError({ element, message }) {
  element.style.borderColor = "red"; // Bordure rouge pour signaler l'erreur
  const span = document.createElement("span"); // Création d’un élément <span>
  span.classList.add("error"); // Ajout de la classe "error"
  span.textContent = message; // Texte du message d’erreur
  span.style.color = "red"; // Couleur rouge du message
  element.parentElement.appendChild(span); // Ajout du <span> juste après le champ
}

// Définition d'une expression régulière pour valider le mot de passe
// Le mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Définition du schéma de validation avec Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Ce champ est obligatoire"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .matches(
      passwordRegex,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre"
    ),
  rgpd: yup.boolean().oneOf([true], "Vous devez accepter les conditions RGPD"), // Case à cocher obligatoire
});

// Fonction qui déclenche la soumission du formulaire à chaque modification
const callSubmit = (e) => {
  form.requestSubmit(); // Déclenche l’événement submit manuellement
};

// Écouteurs d’événements sur les champs du formulaire pour une validation en temps réel
$name.addEventListener("keyup", callSubmit);
$email.addEventListener("keyup", callSubmit);
$password.addEventListener("keyup", callSubmit);
$rgpd.addEventListener("change", callSubmit);

// Événement de soumission du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêche la soumission classique du formulaire
  removeErrors(); // Supprime les erreurs précédentes

  // Récupération des données du formulaire
  const formData = new FormData(form);
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rgpd: formData.get("rgpd") === "on", // Convertit la valeur en booléen
  };

  try {
    // Validation du formulaire selon le schéma Yup
    await schema.validate(values, { abortEarly: false }); // `abortEarly: false` permet de récupérer toutes les erreurs
    console.log("✅ Formulaire valide !");
  } catch (err) {
    // En cas d'erreur(s), affichage de chacune sous les champs correspondants
    err.inner.forEach((el) => {
      showFieldError({
        element: form.elements[el.path], // Champ à valider
        message: el.message, // Message d’erreur associé
      });
    });
  }
});
