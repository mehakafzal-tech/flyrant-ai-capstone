const fieldNames = ["fullName", "email", "workspaceName"];

export function validateSettings(values) {
  const errors = {};

  for (const name of fieldNames) {
    const value = String(values[name] ?? "").trim();
    if (!value) {
      errors[name] = "This field is required.";
    } else if (name !== "email" && (value.length < 2 || value.length > 80)) {
      errors[name] = name === "fullName"
        ? "Full name must be between 2 and 80 characters."
        : "Workspace name must be between 2 and 80 characters.";
    }
  }

  const email = String(values.email ?? "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function submitSettings(values, onSaved) {
  const errors = validateSettings(values);
  if (Object.keys(errors).length > 0) return { saved: false, errors };

  onSaved?.(values);
  return { saved: true, errors: {} };
}

const form = typeof document === "undefined" ? null : document.querySelector("#settings-form");
if (form) {
  const fields = Object.fromEntries(fieldNames.map((name) => [name, form.elements.namedItem(name)]));
  const status = document.querySelector("#form-status");
  let attemptedSubmit = false;

  function renderErrors(errors) {
    for (const name of fieldNames) {
      const input = fields[name];
      const message = document.querySelector(`#${input.id}-error`);
      message.textContent = errors[name] ?? "";
      if (errors[name]) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    attemptedSubmit = true;
    status.textContent = "";
    const values = Object.fromEntries(new FormData(form));
    const result = submitSettings(values, () => {
      status.textContent = "Settings saved";
    });
    renderErrors(result.errors);
    if (!result.saved) fields[Object.keys(result.errors)[0]]?.focus();
  });

  form.addEventListener("input", () => {
    if (!attemptedSubmit) return;
    renderErrors(validateSettings(Object.fromEntries(new FormData(form))));
    status.textContent = "";
  });
}
