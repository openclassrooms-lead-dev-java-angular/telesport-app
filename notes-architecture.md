# Notes d'architecture

## 1. Erreurs ou améliorations dans les fichiers

### 1.1. Observations générales du code et améliorations

#### Constats actuels

##### Centralisation des appels API

Les requêtes HTTP sont actuellement implémentées directement dans les composants
(home.component.ts et country.component.ts). Cette approche mélange la logique
de récupération des données avec la logique de présentation.

Les appels API devraient être externalisés dans des services dédiés afin de
respecter la séparation des responsabilités et de faciliter la maintenance.

##### Typage des données

Les composants `home.component.ts` et `country.component.ts` utilisent actuellement
des types any pour manipuler les données provenant des API.

Cette pratique réduit fortement les bénéfices de TypeScript en supprimant la vérification
statique des types et augmente le risque d'erreurs lors des évolutions de l'application.

La création de modèles dédiés pour chaque type de donnée permettrait d'assurer un contrat
clair entre les sources de données et l'application.

##### Respect des principes d'architecture

La logique présente dans les composants `home.component.ts` et `country.component.ts`
ne respecte pas les bonnes pratiques Angular.

Plusieurs responsabilités sont actuellement regroupées dans les mêmes fichiers :

- récupération des données via API ;
- transformation des données ;
- gestion de la navigation ;
- création et configuration des graphiques ;
- gestion de la présentation.

Cette organisation constitue un anti-pattern car elle ne respecte pas notamment
le principe SOLID - Single Responsibility Principle (SRP) : un composant devrait avoir
une responsabilité unique et rester focalisé sur la gestion de son affichage.

#### Solutions proposées

##### Externaliser les appels API dans des services singleton

La création de services Angular dédiés aux appels API permet de :

- centraliser la logique d'accès aux données ;
- éviter la duplication de code ;
- améliorer la testabilité ;
- réduire le couplage entre l'interface utilisateur et les sources de données ;
- préparer l'application à des évolutions futures (gestion d'erreurs, cache, authentification, retry...).

##### Introduire des modèles de données

La création de modèles dédiés permet de :

- garantir un typage fort ;
- supprimer l'utilisation de any ;
- sécuriser les échanges entre les différentes couches applicatives ;
- rendre la structure des données explicite ;
- faciliter les évolutions futures de l'application.

##### Extraire la logique des graphiques dans un composant dédié

La gestion des graphiques Chart.js ne devrait pas être portée par les composants métier.

La création d'un composant dédié aux charts permet de :

- découpler la couche de visualisation de la logique métier ;
- simplifier les composants parents ;
- améliorer la réutilisation ;
- faciliter les tests ;
- permettre le remplacement ou l'évolution de la librairie graphique.

##### Extraire le header dans un composant autonome

Le header devrait être isolé dans un composant dédié afin de :

- respecter le principe de séparation des responsabilités ;
- réduire le couplage avec le composant racine ;
- favoriser la réutilisation ;
- faciliter les tests et les évolutions futures.

##### Externaliser les URLs serveur dans les environnements

Les URLs des services backend ne devraient pas être écrites en dur dans les composants ou services.

Elles doivent être déplacées dans les fichiers environment afin de :

- gérer facilement les différences entre environnements (développement, recette, production) ;
- éviter les modifications de code lors des déploiements ;
- centraliser la configuration applicative.

#### Synthèse

La refactorisation proposée vise à rapprocher l'application des standards Angular actuels :

- composants plus simples et spécialisés ;
- services dédiés aux responsabilités métier ;
- typage fort grâce aux modèles TypeScript ;
- meilleure testabilité ;
- réduction du couplage ;
- architecture plus évolutive et maintenable.

## 2 Exécution des tests

## Tests et robustesse applicative

L'analyse de la suite de tests a mis en évidence plusieurs problèmes de qualité qui impactaient la fiabilité du projet. Plusieurs erreurs de typage ont été détectées, principalement dues à l'utilisation de `any` dans les composants et à l'absence de modèles TypeScript clairement définis. Cette pratique désactive une partie de la vérification statique offerte par TypeScript et peut masquer des erreurs qui ne seront découvertes qu'à l'exécution.

Les tests ont également révélé un manque d'alignement entre les fichiers de tests et l'évolution de l'architecture applicative. Lors des refactorings, les tests unitaires doivent être maintenus afin de refléter la nouvelle organisation des composants, services et modèles.

La présence de nombreux `console.log` dans le code montre également un manque de nettoyage avant validation. Ces traces doivent être supprimées pour éviter du bruit lors des phases de debug et garantir une meilleure qualité du code livré.

La correction de ces points passe par un typage strict des données manipulées, la suppression des éléments temporaires de développement et la maintenance régulière des tests afin d'accompagner l'évolution de l'application.

### 3. UI

Adaptation responsive des graphiques

Sur les formats tablette et mobile, le graphique présent sur la page d'accueil occupe une place trop réduite par rapport aux éléments environnants (badges, indicateurs et boutons).

Le ratio actuel entre les composants ne permet pas une lecture optimale des données.

Plusieurs améliorations peuvent être envisagées :

revoir la gestion de la hauteur et largeur du container du graphique ;
utiliser une grille responsive (CSS Grid ou Flexbox) adaptée aux différentes résolutions ;
permettre au graphique d'occuper davantage d'espace vertical sur mobile ;
adapter les options Chart.js selon la taille de l'écran ;
réduire certains éléments secondaires lorsque l'espace est limité.

Le graphique étant le support principal de visualisation des données, il doit conserver une taille suffisante pour rester exploitable sur les petits écrans.

---

## 2. Git

### 2.1. Constatations du epo Github

Une seule branche est visible sur le repo, je préconnise pour le travail en équipe de fonctionner comme suit :

## 2.2 Mise en place de conventions git

Proposition de workflow git

```mermaid
flowchart LR

    A[main<br/>Branche stable]

    B1[feature/auth]
    B2[feature/country-detail]
    B3[feature/medal-dashboard]

    C[develop<br/>Intégration]
    D[preprod<br/>Recette]
    E[production<br/>Déploiement]

    B1 --> A
    B2 --> A
    B3 --> A

    A --> C
    C --> D
    D --> E
```

Cette organisation permet de séparer les différentes phases du cycle de développement :

- feature/ : développement des nouvelles fonctionnalités isolées ;
- main : branche contenant une version stable du code validé ;
- develop : branche d'intégration permettant de regrouper les développements avant validation (usage : run);
- preprod : environnement de recette destiné aux tests fonctionnels (usage build & run) ;
- production : branche correspondant aux versions déployées.

#### Convention de nommage des branches et des commits

La mise en place de conventions Git permet d'améliorer la lisibilité du repository et d'assurer une meilleure traçabilité entre les besoins métier et les modifications techniques.

##### Création des branches

Chaque branche dédiée à une fonctionnalité doit être créée à partir de la branche de référence définie par l'équipe.

Le nom de la branche doit reprendre l'identifiant de la User Story (US) associée ainsi qu'une description explicite de la fonctionnalité développée.

Format recommandé :

```
feature/US-XXX-description-fonctionnalite
```

Exemple :

```
feature/US-123-add-country-page
```

Cette convention permet de retrouver rapidement :

- le besoin métier associé ;
- l'objectif de la branche ;
- l'ensemble des modifications réalisées pour une fonctionnalité donnée.

##### Convention des messages de commit

Les messages de commit doivent suivre une convention commune afin de rendre l'historique Git plus lisible et exploitable.

Format recommandé :

nom-de-la-branche: description concise du changement

Exemple :

US-123-add-country-page: add country participation component

Un commit doit décrire une modification précise et cohérente, en évitant les messages trop génériques tels que :

```
fix
update
modification
changes
```

##### Bénéfices attendus

Cette convention permet de :

- identifier rapidement l'origine d'une modification ;
- faciliter le lien entre les User Stories, les branches et les commits associés ;
- améliorer la compréhension de l'historique Git ;
- simplifier les revues de code ;
- faciliter les recherches lors d'une correction ou d'une régression ;
- améliorer la collaboration entre les membres de l'équipe.

##### Recommandation complémentaire

Pour renforcer ce workflow, il est également conseillé d'ajouter :

- des Pull Requests obligatoires avant fusion dans main ;
- une validation par revue de code ;
- une protection des branches critiques (main, production) ;
- une exécution automatique des tests et du linting via une CI/CD avant merge.

Cette organisation permettra d'obtenir un cycle de développement plus fiable, plus traçable et plus adapté à un fonctionnement d'équipe.

## 3. Qualité du code : ESLint et Prettier

### 3.1. Mise en place d'ESLint

ESLint est un outil d'analyse statique permettant d'identifier les problèmes potentiels dans le code avant son exécution.

Son intégration dans le projet permet de :

- détecter les erreurs et incohérences lors du développement ;
- appliquer des règles communes et des standards de qualité ;
- encourager l'utilisation des bonnes pratiques TypeScript et Angular ;
- réduire les risques de régression liés à des erreurs de code ;
- améliorer la maintenabilité et la lisibilité du projet ;
- faciliter la collaboration entre développeurs grâce à des règles partagées.

L'utilisation d'ESLint permet également d'automatiser certains contrôles lors des revues de code et de garantir une homogénéité du code produit par l'équipe.

Exemples de contrôles apportés :

- détection des variables inutilisées ;
- contrôle du typage TypeScript ;
- identification des mauvaises pratiques Angular ;
- prévention de l'utilisation abusive de any ;
- respect des conventions de nommage.

### 3.2. Mise en place de Prettier

Prettier est un outil de formatage automatique du code permettant d'appliquer un style uniforme à l'ensemble du projet.

Son utilisation permet de :

- formater automatiquement le code selon une configuration commune ;
- supprimer les débats liés au style lors des revues de code ;
- garantir une présentation homogène entre les fichiers ;
- réduire les différences inutiles dans les commits ;
- limiter les conflits Git liés uniquement au formatage.

Prettier agit en complément d'ESLint :

- ESLint contrôle la qualité et les règles techniques du code ;
- Prettier garantit la cohérence de sa présentation.

### 3.3. Bénéfices pour l'équipe

L'association d'ESLint et Prettier permet de mettre en place une base de développement plus fiable :

- un code plus homogène et plus facile à maintenir ;
- des erreurs détectées plus tôt dans le cycle de développement ;
- des revues de code plus efficaces, centrées sur la logique métier plutôt que sur le style ;
- une meilleure collaboration entre développeurs ;
- une réduction de la dette technique sur le long terme.

---

---

## 3 Architecture

Il serait juditieux de passer l'application à un découpage modulaires, le but etant de maintenir plus aisaiment une application grandissante.
Selon la taille de l'application voulue ou future, il serait bien de mettre en place une artchitecture en "feature modules"

Architecture existante :

```text
src
├── app
│   ├── pages
│   │   ├── country
│   │   ├── home
│   │   └── not-found
│   │
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets
│   ├── images
│   └── mock
│
├── environments
│   ├── environment.ts
│   └── environment.prod.ts
│
├── favicon.ico
├── app.html (renaming of index.html)
├── app.ts (renaming of main.ts)
├── polyfills.ts
├── styles.scss
└── test.ts
```

Architecture suggérée
Idéal pour l'évolution future (coller a l'architecture naturelle modulaire d'Angular) :

```text
src
├── app
│   ├── core
│   │   ├── models
│   │   │   ├── olympic.model.ts
│   │   │   └── participation.model.ts
│   │   │
│   │   └── services
│   │       └── olympic.service.ts
│   │
│   ├── shared
│   │   └── components
│   │       ├── header
│   │       │   ├── header.component.ts
│   │       │   ├── header.component.html
│   │       │   └── header.component.scss
│   │       │
│   │       ├── page-title
│   │       │   ├── page-title.component.ts
│   │       │   ├── page-title.component.html
│   │       │   └── page-title.component.scss
│   │       │
│   │       ├── statistic-card
│   │       │   ├── statistic-card.component.ts
│   │       │   ├── statistic-card.component.html
│   │       │   └── statistic-card.component.scss
│   │       │
│   │       ├── pie-chart
│   │       │   ├── pie-chart.component.ts
│   │       │   ├── pie-chart.component.html
│   │       │   └── pie-chart.component.scss
│   │       │
│   │       └── line-chart
│   │           ├── line-chart.component.ts
│   │           ├── line-chart.component.html
│   │           └── line-chart.component.scss
│   │
│   ├── feature
│   │   ├── medal-dashboard
│   │   │   └── page
│   │   │       ├── medal-dashboard.component.ts
│   │   │       ├── medal-dashboard.component.html
│   │   │       ├── medal-dashboard.component.scss
│   │   │       └── medal-dashboard.routes.ts
│   │   │
│   │   ├── country-detail
│   │   │   └── page
│   │   │       ├── country-detail.component.ts
│   │   │       ├── country-detail.component.html
│   │   │       ├── country-detail.component.html
│   │   │       ├── country-detail.component.scss
│   │   │       └── country-detail.routes.ts
│   │   │
│   │   └── not-found
│   │       └── page
│   │           ├── not-found.component.ts
│   │           ├── not-found.component.html
│   │           ├── not-found.component.scss
│   │           └── not-found.routes.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets
│   ├── images
│   └── mock
│
├── environments
│   ├── environment.ts
│   └── environment.prod.ts
│
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── styles.scss
└── test.ts
```

Pourquoi cette architecture ?

`core/`

Contient tout ce qui est singleton dans l'application :

- services métier ;
- modèles communs ;
- interceptors (futur)
- guards (futur)
- configuration.

Il n'y a généralement qu'une seule instance de ces éléments.

`shared/`

Contient les composants réutilisables.

`features/`

Chaque dossier représente un domaine fonctionnel.

Chaque feature possède :

- ses routes ;
- ses pages ;
- éventuellement ses composants spécifiques ;
- ses services spécifiques si nécessaire.

C'est ce qui facilite le lazy loading.

## 4 Upgrade socle applicatif

Profiter du refactor pour upgrader Angular de la version 18.0.6 à la dernière version lts 21.
Cela n'est pas necessaire mais ces raisons sont à prendre en considération tant que l'application n'est pas très fournie :

- Sécurité et maintien du support

Maintenir une version Angular supportée permet de garantir l'application des correctifs de sécurité et de réduire l'exposition aux vulnérabilités connues.

- Réduction de la dette technique

Migrer régulièrement réduit le coût global de maintenance et évite une migration majeure difficile à planifier.

- Amélioration des performances

Les optimisations du framework permettent d'améliorer les performances perçues par les utilisateurs sans modification fonctionnelle majeure.

- Évolution du système de réactivité

L'évolution vers les Signals prépare l'application aux architectures Angular modernes et améliore la maintenabilité.

- Meilleure expérience développeur

Une version récente du framework améliore la productivité des équipes de développement.

- Compatibilité avec l'écosystème

Maintenir Angular à jour garantit la compatibilité avec les composants tiers et réduit les blocages lors des évolutions fonctionnelles.

- Amélioration de la qualité du code

Les nouvelles pratiques Angular permettent d'avoir un code plus lisible, testable et maintenable.

- Préparation future

Maintenir l'application proche de la roadmap officielle réduit le risque technologique à long terme.

> Conclusion :
>
> La migration Angular 18 vers Angular 21 permet de maintenir l'application dans un environnement supporté, sécurisé et compatible avec l'écosystème actuel, tout en réduisant la dette technique et en préparant l'évolution future de l'architecture frontend.

## 5. Evolution

### 5.1 Translations

Si le site est voué a être multilangue mettre en place `i18n` maintenant serait une bonne idée pour les traductions et éviter la dette technique
