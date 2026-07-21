# Télésport Olympic Game architecture

## Table of Contents

- [Overview](#overview)
- [src Folder Structure](#src-folder-structure)
- [App Folder](#app-folder)
    - [Core](#core)
    - [Features](#features)
    - [Shared](#shared)
    - [Assets](#assets)
    - [Environments](#environments)
    - [Styles](#styles)
- [Main Angular Files](#main-angular-files)
- [Conclusion](#conclusion)

---

## Overview

The application is structured using a modular Angular architecture based on three main concepts:

- **Core**: global application elements used throughout the project.
- **Features**: business features and application pages.
- **Shared**: reusable UI components.

This organization provides a clear separation between:

- business logic;
- reusable components;
- application services;
- global configuration.

---

## src Folder Structure

```text
src
│
├── app
│   ├── core
│   ├── features
│   └── shared
│
├── assets
│
├── environments
│
├── styles
│
├── index.html
│
├── main.ts
│
└── styles.scss
```

---

## App Folder

The `app` folder contains the main Angular application logic.

It is divided into three main sections:

```text
app
│
├── core
│
├── features
│
└── shared
```

---

### Core

The `core` folder contains the central elements of the application.

These elements are generally unique and shared across multiple features.

```text
core
│
├── enums
├── models
└── services
```

---

#### Enums

The `enums` folder contains strongly typed constant values used throughout the application.

Example:

```text
core/enums
```

Contains:

- medal types;
- categories;
- application constants;
- business-related values.

Enums help avoid hard-coded values and improve code maintainability.

---

#### Models

The `models` folder defines the application's data structures.

Example:

```text
core/models
```

Contains TypeScript interfaces and types:

- Olympic;
- Country;
- Medal;
- Statistics.

Models provide strong typing and improve code reliability.

---

#### Services

The `services` folder contains reusable application services.

Example:

```text
core/services
```

Responsibilities:

- HTTP API calls;
- data retrieval;
- shared business logic.

Components do not directly handle API communication.
They use services as an abstraction layer.

---

### Features

The `features` folder contains the main business features of the application.

Each feature has its own isolated folder.

```text
features
│
├── country
├── home
└── not-found
```

---

#### Country

Handles country-related information.

```text
country
```

Responsibilities:

- display medals by country;
- show country statistics;
- display related charts;
- manage country navigation.

---

#### Home

The application's home page.

```text
home
```

Responsibilities:

- application introduction;
- main navigation entry point;
- initial user experience.

---

#### Not Found

Handles unknown routes and missing pages.

```text
not-found
```

Responsibilities:

- display a 404 page;
- handle invalid URLs;
- redirect users when necessary.

---

### Shared

The `shared` folder contains reusable UI components.

These components can be used throughout the application.

```text
shared
│
├── button
├── chart
├── header
├── page-title
├── spinner
└── statistic-card
```

---

#### Button

Generic button component.

Responsibilities:

- provide consistent button styling;
- handle user actions;
- avoid duplicated button implementations.

---

#### Chart

Reusable chart component.

Responsibilities:

- display data visualizations;
- provide reusable graphical representation.

---

## Header

Global application header.

Responsibilities:

- main navigation;
- application branding;
- access to main sections.

---

#### Page Title

Reusable page title component.

Responsibilities:

- standardize page headings;
- provide consistent styling.

---

#### Spinner

Loading indicator component.

Responsibilities:

- inform users when data is being loaded;
- improve user experience during asynchronous operations.

---

#### Statistic Card

Reusable statistic display component.

Responsibilities:

- display individual statistics;
- provide a consistent visual representation.

Examples:

- number of countries;
- number of Olympic Games;
- number of medals.

---

## Assets

The `assets` folder contains static resources.

```text
assets
```

Contains:

- images;
- logos;
- icons;
- static JSON files;
- graphical resources.

These files are directly accessible by the application.

---

## Environments

The `environments` folder contains configuration files depending on the execution environment.

```text
environments
│
├── environment.ts
└── environment.prod.ts
```

Used to manage:

- API URLs;
- development configuration;
- production configuration.

---

## Styles

The `styles` folder contains global SCSS files.

```text
styles
```

Contains:

- SCSS variables;
- mixins;
- themes;
- shared styling rules.

Example:

```text
styles/_variables.scss
```

Centralizes:

- colors;
- breakpoints;
- spacing values;
- global design constants.

---

## Angular Files

For files related to the Angular framework, please refer to the documentation:

- [Angular Framework home](https://v21.angular.dev/overview)
- [Angular file structure](https://v21.angular.dev/reference/configs/file-structure)

# Conclusion

This architecture provides:

- better code organization;
- clear separation of responsibilities;
- improved maintainability;
- easier application scalability.

The business logic remains isolated inside `features`,
technical and global elements are handled by `core`, and reusable UI components are maintained inside `shared`.
