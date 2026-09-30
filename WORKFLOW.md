# AI Development Workflow Comparison

## Overview

I built the same small settings-form feature twice using two different AI-assisted workflows. Round 1 used a single vague prompt, while Round 2 used a detailed specification with project-file references, constraints, examples, tests, and verification steps.

## Round 1: Vague Prompt

The prompt was: “Build a settings form for this project.”

The AI produced a 259-line `index.html` containing the UI, CSS, and JavaScript in one file. It also added many features beyond the requested small form, including notifications, privacy settings, appearance options, language selection, and other settings.

The form used browser-native validation through `reportValidity()` and local storage, but there were no automated tests covering the validation behavior. During review, I also noticed encoding problems in visible text such as `Fran├ºais` and `ΓÇö`. The broader scope made the result require more manual review.

## Round 2: Precise Prompt

The second prompt required the AI to inspect `README.md` and `CLAUDE.md`, make a plan, implement only three fields, define specific validation rules, include accessible error messages, avoid unnecessary dependencies, write tests, run them, and fix failures.

The result was split into `index.html`, `styles.css`, `settings.js`, `settings.test.js`, and `package.json`. The validation rules explicitly covered required fields, name/workspace length limits, and email format. The form also used labels, `aria-describedby`, `aria-invalid`, and a live status message.

Five automated tests were written and run successfully: 5 passed and 0 failed. I also manually tested empty fields, invalid email input, and successful submission in the browser, and all worked as expected.

## Comparison

Round 2 required more effort in the prompt and planning stage, but it reduced review effort by defining expected behavior before implementation and requiring automated verification. It also produced a smaller and more focused feature.

The branch diff showed changes across five files, with 233 insertions and 254 deletions. The Round 2 `index.html` was reduced to 45 lines because styling and validation logic were separated from the HTML.

The main lesson is that specific requirements, examples, project context, and explicit testing instructions make AI-generated code easier to verify and review. A vague prompt can produce a visually complete result, but it may also introduce unnecessary scope and issues that are harder to detect without structured verification.
