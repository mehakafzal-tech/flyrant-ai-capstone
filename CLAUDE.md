# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Capston is a capstone project. Describe its purpose here.

## Commands

- Install: `<install command>`
- Run: `<run command>`
- Test: `<test command>`

## Conventions

- Keep changes small and focused
- Write clear commit messages
- Add tests for new functionality

## AI Development Guidelines

- Review existing files before making changes.
- Keep changes focused and avoid unnecessary dependencies.
- Explain significant changes before applying them.
- Follow the project's existing coding conventions.

## Project Rules

* Keep features focused on the requirements provided. Do not add unrelated pages, settings, or functionality.
* Keep validation logic testable and separate from presentation code when practical. Avoid putting large amounts of JavaScript directly inside `index.html`.
* Every form validation rule must have automated tests covering invalid input, valid input, and submission behavior.
* Run `npm test` before committing changes and only report tests as passing when they have actually been run successfully.
* Preserve UTF-8 text and check the browser output for encoding problems or mojibake.
* For forms, associate every label with its input and provide accessible validation feedback using appropriate ARIA attributes.
