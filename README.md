# Web Clean Code - CRUD Users

This project is a React application to manage users (CRUD) following clean code best practices.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/youruser/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the application in development mode:
```
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Run tests

To run the tests:
```
npm test
```

## Project structure

```
src/
  components/
  views/
  repositories/
  mappers/
  services/
  App.js
  index.js
```

## Technologies

- React
- React Router
- Jest + React Testing Library

---

Contributions and suggestions are welcome!

---

## Improvements implemented

- [x] Project always at the root.
- [x] Removed empty files.
- [x] Views organized in (Views/Pages).
- [x] Reusable components like button and similar.
- [x] Each view in its own folder (`UserList.css` and `UserList.js`).
- [x] Alerts replaced by modals.
- [x] Always use braces with if statements.
- [x] Never use inline styles.
- [x] No logic inside tests.
- [x] Tests: full flow coverage.
- [x] Tests load the entire application.
- [x] Except for rare cases, no comments in the code.
- [x] Customized README.

---

## Next steps

- [ ] Add tests for reusable components (Button, Avatar, Modal, Alert, etc.)
- [ ] Add integration tests to cover full user flows (navigation, create/edit/delete user, etc.)

---

### References and best practices

- [AAA Pattern for tests](https://medium.com/@michikatrins/unit-testing-and-the-arrange-act-and-assert-aaa-pattern-espa%C3%B1ol-54ba67d28859)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Design Patterns](https://refactoring.guru/es/design-patterns)
    - Adapter / Mapper Pattern
    - Repository Pattern (data access layer)
