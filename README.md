# 🚗 AutoElite — Premium Car Catalog

![AutoElite Banner](https://via.placeholder.com/1200x400.png?text=AutoElite+Car+Catalog)

[![AngularJS](https://img.shields.io/badge/AngularJS-1.8.3-red.svg?logo=angular)](https://angularjs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A premium car catalog web application built with **HTML**, **CSS**, and **AngularJS 1.x**. This project demonstrates comprehensive use of AngularJS features including custom directives, filters, services, and routing.

---

## ✨ Features

- **Dynamic Routing:** Utilizes `ngRoute` for seamless SPA navigation (`#!/`, `#!/catalog`, `#!/wishlist`).
- **Advanced Filtering & Search:**
  - Live `ng-model` search by make, model, or year.
  - Category pills and fuel type dropdowns.
- **Sorting Mechanisms:** Sort vehicles dynamically (e.g., price low to high, newest first).
- **Flexible Layouts:** Toggle seamlessly between **Grid** and **List** views.
- **Detailed Modals:** View full vehicle specifications in a modal window supporting keyboard (`Esc`) and overlay-click exits.
- **Persistent Wishlist:** Backed by `localStorage`, saved vehicles persist across browser sessions.
- **Custom Angular Artifacts:**
  - **Filters:** `currency2`, `mileage`, `stars`, `badgeClass`, `shortEngine`.
  - **Directives:** `scrollTop`, `closeOnEsc`, `ratingStars`.
  - **Services:** API simulation with `$http`, Wishlist state management.
- **UX Enhancements:** Animated toast notifications for wishlist actions.
- **Fully Responsive:** Mobile-first design that looks great on any screen size.

---

## 📁 Project Architecture

```text
car-catalog/
│
├── index.html                  ← Main entry point (ng-app, navbar, ng-view, footer)
│
├── css/
│   └── styles.css              ← Stylesheets (variables, navbar, hero, cards, modal, responsive)
│
├── js/
│   ├── app.js                  ← AngularJS module + ngRoute config
│   ├── controllers/
│   │   └── controllers.js      ← NavCtrl, HomeCtrl, CatalogCtrl, CarDetailCtrl, WishlistCtrl
│   ├── services/
│   │   └── carService.js       ← Data loading ($http), wishlist (localStorage)
│   ├── directives/
│   │   └── directives.js       ← Custom directives (carCard, ratingStars, etc.)
│   └── filters/
│       └── filters.js          ← Custom filters for data formatting
│
├── data/
│   └── cars.json               ← Mock database containing car entries
│
└── views/
    ├── home.html               ← Hero section + featured cars
    ├── catalog.html            ← Full catalog with search/filter/sort + detailed modal
    └── wishlist.html           ← Saved vehicles view
```

---

## 🚀 Getting Started

Since the application loads data asynchronously via `$http` (`cars.json`), it needs to be served through a local HTTP server to avoid CORS issues.

### Prerequisites

You can use any local web server. Here are a few quick options:

### 1. Using Python (Recommended)
If you have Python installed, simply run:
```bash
# Python 3
python -m http.server 8080
```

### 2. Using Node.js
If you have Node.js installed, you can use `serve`:
```bash
npx serve .
```

### 3. Using VS Code
- Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
- Right-click `index.html` and select **"Open with Live Server"**.

### View the App
Open your browser and navigate to: **[http://localhost:8080](http://localhost:8080)** (or the port provided by your server).

---

## 🛠️ Tech Stack

### Core
- **HTML5** & **CSS3** (Custom properties, grid, flexbox, CSS animations)
- **JavaScript (ES5)**
- **AngularJS 1.8.3** (including `angular-route 1.8.3` via CDN)

### Typography
- Google Fonts: **[Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)** & **[Outfit](https://fonts.google.com/specimen/Outfit)**


