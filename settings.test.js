import test from "node:test";
import assert from "node:assert/strict";
import { submitSettings, validateSettings } from "./settings.js";

const validValues = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  workspaceName: "Analytical Engine",
};

test("required fields and name length limits are validated", () => {
  const errors = validateSettings({ fullName: "", email: "", workspaceName: "A" });
  assert.equal(errors.fullName, "This field is required.");
  assert.equal(errors.email, "This field is required.");
  assert.match(errors.workspaceName, /2 and 80 characters/);
  assert.match(validateSettings({ ...validValues, fullName: "A" }).fullName, /2 and 80/);
  assert.match(validateSettings({ ...validValues, workspaceName: "x".repeat(81) }).workspaceName, /2 and 80/);
});

test("invalid email is reported", () => {
  assert.equal(validateSettings({ ...validValues, email: "abc" }).email, "Enter a valid email address.");
});

test("valid input has no validation errors", () => {
  assert.deepEqual(validateSettings(validValues), {});
});

test("successful submission calls save callback and returns success", () => {
  let savedValues;
  const result = submitSettings(validValues, (values) => { savedValues = values; });
  assert.equal(result.saved, true);
  assert.deepEqual(savedValues, validValues);
});

test("invalid submission does not save", () => {
  let wasSaved = false;
  const result = submitSettings({ ...validValues, email: "abc" }, () => { wasSaved = true; });
  assert.equal(result.saved, false);
  assert.equal(wasSaved, false);
});
