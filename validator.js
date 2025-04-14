import * as yup from "https://esm.sh/yup";

const form = document.querySelector("form");
const $name = document.querySelector("#name");
const $email = document.querySelector("#email");

// functions
function showFieldError({ $element, message = "Ce champ est requis" }) {
  const span = document.createElement("span");
  span.classList.add("error");
  span.textContent = message;
  $element.style.borderColor = "red";
  $element.parentElement.appendChild(span);
}

// schema de YUP
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "le nom doit contenir au moins 2 caractères")
    .required("champ obligatoire"),
  //   email: yup.string().email("email invalid").required(""),
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");

  // validation
  try {
    await schema.validate({ name }, { abortEarly: false });
    console.log("formulaire valide !");
  } catch (error) {
    error.inner.forEach((err) => {
      showFieldError({
        $element: form.elements[err.path],
        message: err.message,
      });
    });
  }
});
