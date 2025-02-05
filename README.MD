# Cohesion

## Full Stack App to Start Your Local Ollama Journey

You can use this repo as a starting point to build custom AI user interfaces.

### Tech Stack

- **Backend:** Node.js, TypeScript, Express, Drizzle ORM, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS, Radix UI

### Features

- **Backend:** 
  - API built with Express & TypeScript
  - Drizzle ORM for PostgreSQL migrations and interactions
  - JWT-based login and registration authentication with Passport.js

- **Frontend:**
  - React-based UI with Radix UI components
  - Vite for fast development and bundling
  - TailwindCSS for styling
  - Axios for API calls

### Getting Started

> Ensure Ollama is already running.

1. **Clone the repo:**

```bash
git clone https://github.com/scorcism/cohesion.git
cd cohesion
```

#### Backend Setup

2. **Navigate to the backend directory:**

```bash
cd backend
```

3. **Install dependencies:**

```bash
pnpm install
```

4. **Set up the database:**

```bash
pnpm run migration:push
pnpm run migration:generate
```

5. **Run the backend in development mode:**

```bash
pnpm start:dev
```

#### Frontend Setup

6. **Navigate to the frontend directory:**

```bash
cd cohesion-web
```

7. **Install dependencies for both frontend & backend:**

```bash
pnpm install
```

8. **Run the frontend in development mode:**

```bash
pnpm dev
```

### Author

- **scor32k** - abhishek@scor32k.com

### License

- ISC License
Here is the updated version of the README with your note added:

---

### Note from 🤧 to 🧑‍💻:

If you find any issues (logic, UI, or anything), feel free to create an issue or raise a pull request. I am also learning new things, so contributions are always welcome!