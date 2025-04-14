# 🧠 Exercices JavaScript - Validation de Formulaire

---

## ✨ Exercice 1 : Validation manuelle avec Regex

### 🎯 Objectif

Compléter le script de validation d’un formulaire HTML côté client. Vous devez :

- Vérifier que le **nom** contient au moins 3 caractères.
- Vérifier que l’**email** est valide grâce à une **expression régulière** et qu’il **n’est pas vide**.
- Vérifier que le **mot de passe** contient :
  - Au moins 8 caractères,
  - Une majuscule,
  - Une minuscule,
  - Un chiffre,
  - Et qu’il **n’est pas vide**.
- Vérifier que la case **RGPD** est cochée.
- Afficher les messages d'erreur appropriés sous les champs concernés.

---

### 🧩 Consignes

1. Ouvrez le fichier JavaScript associé au formulaire.
2. Repérez la fonction `checkFields`.
3. Ajoutez la logique de vérification suivante :
   - ✅ **Nom** : vérifier que le champ contient **au moins 3 caractères**.
   - ✉️ **Email** :
     - Le champ **ne doit pas être vide**,
     - Utilisez une **expression régulière** pour valider le **format**.
   - 🔐 **Mot de passe** :
     - Le champ **ne doit pas être vide**,
     - Vérifiez qu’il contient :
       - Au moins **8 caractères**,
       - Une **majuscule**,
       - Une **minuscule**,
       - Un **chiffre**.
   - ☑️ **RGPD** : vérifiez que la **case est bien cochée**.
4. Affichez les **messages d'erreur appropriés** sous les champs concernés.

---

### 🔍 Exemple de regex

```js
// Regex pour un email simple
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

// Regex pour un mot de passe fort
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
```

---

## 📦 Exercice 2 : Validation avec la librairie Yup

### 🎯 Objectif

Découvrir comment simplifier la validation d’un formulaire HTML avec une librairie externe.  
Ici, nous allons utiliser **Yup**, une des bibliothèques les plus populaires pour la validation de schéma en JavaScript.

---

### 🧠 À savoir

Il existe plusieurs librairies de validation côté client, notamment :

- **Yup**
- **Zod**
- **Joi**
- **Vest**

👉 Dans cet exercice, nous allons utiliser **Yup** pour valider les champs du formulaire facilement et proprement.

---

### 🧩 Consignes

1. Intégrez la librairie **Yup** avec l'import suivant :

```js
import * as yup from "https://esm.sh/yup";
```

2. Créez un schéma de validation `yup.object().shape({...})` :

   - **name** : requis, minimum 2 caractères.
   - **email** : requis, au format email.

3. Interceptez la soumission du formulaire et validez les champs avec `schema.validate(...)`.

4. En cas d’erreur :
   - Affichez un message d’erreur personnalisé sous le champ concerné.

---

### 🧪 Code de départ

```js
import * as yup from "https://esm.sh/yup";

const form = document.querySelector("form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");

function removeErrors() {
  const spans = document.querySelectorAll("span.error");
  spans.forEach((span) => span.remove());
}

function showFieldError({ element, message }) {
  element.style.borderColor = "red";
  const span = document.createElement("span");
  span.classList.add("error");
  span.textContent = message;
  span.style.color = "red";
  element.parentElement.appendChild(span);
}

// Définir le schéma Yup
const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  name: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Ce champ est obligatoire"),
});

const callSubmit = (e) => {
  form.requestSubmit();
};

$name.addEventListener("keyup", callSubmit);
$email.addEventListener("keyup", callSubmit);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  removeErrors();
  const formData = new FormData(form);
  const values = {
    email: formData.get("email"),
    name: formData.get("name"),
  };

  try {
    await schema.validate(values, { abortEarly: false }); // pour voir toutes les erreurs
    console.log("✅ Formulaire valide !");
  } catch (err) {
    err.inner.forEach((el) => {
      showFieldError({
        element: form.elements[el.path],
        message: el.message,
      });
    });
  }
});
```

---

### 💡 Exemple de structure HTML à utiliser

```html
<form>
  <label>Nom : <input type="text" id="name" name="name" /></label>
  <br />
  <label>Email : <input type="email" id="email" name="email" /></label>
  <br />
  <button type="submit">Envoyer</button>
</form>
```

---

## 🧩 Bonus : Améliorer l'expérience utilisateur avec `onkeyup`

Pour faciliter la validation et améliorer l'expérience utilisateur, vous pouvez déclencher la validation de chaque champ **dès que l'utilisateur commence à taper**, grâce à l'événement `onkeyup`.

Cela permet d'afficher les erreurs en temps réel sans attendre la soumission du formulaire.
