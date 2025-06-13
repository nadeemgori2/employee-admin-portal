# Employee Admin Portal

## Overview

This project is an Employee Admin Portal built in Angular 17.  
It provides secure user authentication, a feature-rich employee management table (CRUD, pagination, bulk actions), and detailed employee dashboards—all designed with clean code, modular architecture, and a focus on maintainability, testability, and responsive UI.

---

## Features

- **Login** with role-based access (SOP1/SOP2)
- **Employee List** with:
  - Pagination (custom + Material)
  - Bulk selection and deletion
  - Responsive table with Bootstrap and Angular Material
  - Edit and Delete actions with confirmation dialogs
- **Employee Details** view:
  - Dashboard-style charts for performance, attendance, and leave
  - Team & expense breakdown (sample/mock data)
- **Add/Edit Employee** via modal/drawer, fully validated
- **Mocked REST API** (json-server) for all CRUD/data
- **Modern Angular Best Practices:**
  - Standalone components (no NgModules)
  - Strong separation of concerns (container/presenter/services)
  - State managed with NgRx, selectors, and effects
  - RxJS for async and UI state
- **Responsive UI:** Clean desktop and mobile support
- **Reusable Components:** Table, pagination, dialogs, etc.
- **Unit Tests** for core business logic and NgRx selectors/effects

---

## Tech Stack

- [Angular 17](https://angular.io/) (Standalone Components, Signals-ready)
- [Angular Material](https://material.angular.io/) + [Bootstrap 5](https://getbootstrap.com/)
- [NgRx](https://ngrx.io/) (store, effects)
- [RxJS](https://rxjs.dev/)
- [json-server](https://github.com/typicode/json-server) (mock API)
- [Chart.js](https://www.chartjs.org/) ([ng2-charts](https://valor-software.com/ng2-charts/)) for dashboard
- [SCSS](https://sass-lang.com/) for custom theming

---

## Getting Started

### 1. Clone the repo
```bash
git clone <YOUR_REPO_URL>
cd employee-admin-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start mock API
```bash
npx json-server --watch db.json --port 3000
```

### 4. Start the dev server
```bash
npm start
# or if using Vite:
npm run dev
```

### 5. Open in browser
Visit: [http://localhost:4200](http://localhost:4200)

---

## Usage

- **Login as SOP1:**  
  username: `sop1`  
  password: `password1`
- **Login as SOP2:**  
  username: `sop2`  
  password: `password2`

- SOP2 can delete employees; SOP1 cannot.

---

## Project Structure

```
src/
  ├── app/
  │   ├── core/                # Services (API, auth, business logic)
  │   ├── features/
  │   │   ├── employee-list/
  │   │   ├── employee-detail/
  │   │   └── dialogs/
  │   ├── shared/
  │   │   ├── components/      # Table, pagination, etc.
  │   │   ├── constants/
  │   │   ├── models/
  │   │   └── services/
  │   ├── state/               # NgRx store
  │   └── app.component.ts
  └── db.json                  # Mock API data
```

---

## Development Notes

- **Refactoring:**  
  Business logic, selection, and pagination are extracted into services for maintainability and testability.
- **Responsiveness:**  
  The UI leverages Bootstrap utilities and custom SCSS to ensure mobile support.
- **Code Quality:**  
  Code was cleaned of unused/legacy files and unnecessary comments. Only useful documentation remains for reviewers.
- **GitHub Copilot:**  
  Used for some refactoring, with all changes reviewed and tested.
- **Unit Testing:**  
  Provided for state logic and utility services.
- **Theming:**  
  Uses Material prebuilt theme with custom overrides; easy to switch/extend.

---

## Future Scope & Improvements

- **UI/UX Enhancements:**  
  More polishing can be done to align pixel-perfectly with advanced design systems. Button, input, and card styles can be further unified for a cohesive look and feel.
- **Centralized Theming:**  
  Move all style variables (colors, typography, spacing) into a global SCSS file or Angular Material theme for easier maintenance and better reusability.
- **Reusable Style Utilities:**  
  Refactor common styles (card, table, dialog, spacing) into mixins and utility classes to reduce duplication and speed up future features.
- **Angular Signals Adoption:**  
  Leverage Angular Signals for even more reactive, high-performance UI—future-ready as the ecosystem evolves.
- **Accessibility (a11y):**  
  WAI-ARIA roles, keyboard navigation, and screen reader optimizations are partially in place; future improvements can add live region support, better tab order, and more.
- **Advanced Responsiveness:**  
  Further enhancements for tablet, landscape, and split-screen views can be added.
- **i18n/Localization:**  
  Easy to extend for multiple languages and locales.
- **API Integration:**  
  Ready for real backend—just replace mock services.
- **Testing:**  
  Add end-to-end (Cypress) and additional unit tests for components.
- **Other:**  
  - User profile and role management
  - Notification system
  - Activity logging/auditing

---

## Assignment Notes

- The solution closely follows the assignment mockups, acceptance criteria, and technical requirements.
- If any reviewer needs further clarification or walkthrough, please contact me at [your-email@example.com].

---

**Thank you for reviewing!**
