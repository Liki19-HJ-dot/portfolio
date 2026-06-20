# Likhith H J — Portfolio Website

A GitHub-inspired personal portfolio built with **React**. Features live profile editing, project management (add/edit/delete), social links, skills grid, and contact page. All changes are saved to `localStorage` so they persist across visits.

---

## 🗂 Project Structure

```
portfolio/
├── public/
│   └── index.html          ← HTML shell
├── src/
│   ├── App.jsx             ← All components & logic
│   ├── App.css             ← All styles
│   └── index.js            ← React entry point
├── package.json
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Go into the project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

The site opens at **http://localhost:3000** automatically.

---

## 🏗 Building for Production

```bash
npm run build
```

This creates an optimised `build/` folder ready to deploy anywhere.

---

## ☁️ Deployment Options

### Option 1 — Netlify (recommended, free)

1. Go to [netlify.com](https://netlify.com) → sign up free
2. Click **"Add new site" → "Deploy manually"**
3. Run `npm run build` locally
4. Drag & drop the `build/` folder onto the Netlify dashboard
5. Your site is live instantly with a free `.netlify.app` URL
6. (Optional) Connect a custom domain in Site settings → Domain management

### Option 2 — Vercel (free)

```bash
npm install -g vercel
vercel
```

Follow the prompts — it auto-detects Create React App and deploys in ~30 seconds.

### Option 3 — GitHub Pages (free)

1. Push this project to a GitHub repo
2. In `package.json`, set `"homepage": "https://<your-username>.github.io/<repo-name>"`
3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
5. Run:
   ```bash
   npm run deploy
   ```

---

## ✏️ Customising Your Data

All your personal data is at the top of `src/App.jsx`:

```js
const DEFAULT_PROFILE = {
  name: "Likhith H J",
  email: "likhith627@gmail.com",
  location: "Bengaluru, India",
  // ...
};

const DEFAULT_PROJECTS = [
  { name: "Netflix Clone", ... },
  // add more here
];
```

You can also edit everything live in the browser using the **Edit profile** button and **Add project** button — changes are saved to localStorage automatically.

---

## 🔗 Resume Link

Once deployed, add the URL to your resume under:

> **Portfolio:** https://your-site.netlify.app

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| CSS (vanilla) | Styling — no external CSS library needed |
| localStorage | Persist profile & project edits across sessions |
| GitHub API avatar | Profile photo from GitHub |

---

## 📬 Contact

- Email: likhith627@gmail.com
- GitHub: [Liki19-HJ-dot](https://github.com/Liki19-HJ-dot)
- LinkedIn: [likhith-h-j-22aa74249](https://www.linkedin.com/in/likhith-h-j-22aa74249)
