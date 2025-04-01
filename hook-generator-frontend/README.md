# 🎯 Hook Generator Frontend – React + Vite + Tailwind CSS

This is the **frontend** of the Hook Generator project. It's built with **React** (via Vite), styled using **Tailwind CSS**, and uses **shadcn/ui** for modern UI components. It communicates with the FastAPI backend to generate punchy one-liners from user-provided text.

---

## ✨ Features

- ⚛️ **React + Vite**: Lightning-fast development experience
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling
- 🧩 **shadcn/ui**: Pre-built accessible components
- 🪄 **Framer Motion**: Smooth animations
- 🌐 Easily connect to the FastAPI backend
- 📱 Fully responsive design

---

## 🛠️ Project Structure

```
src/
├── components/
│   └── ui/                  # Reusable UI components (Textarea, Button, Card, etc.)
├── hooks/
│   └── useHookGenerator.ts # Custom logic for managing state + API
├── lib/
│   └── fetchHook.ts        # Function to call the backend API
├── pages/
│   └── index.tsx           # Main UI logic
├── styles/
│   └── global.scss         # Global styles (if any)
└── main.tsx                # Entry point
```

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hook-generator-frontend.git
cd hook-generator-frontend
```

### 2. Install dependencies

```bash
pnpm install
# OR
yarn install
# OR
npm install
```

### 3. Run in dev mode

```bash
pnpm dev
# OR
yarn dev
# OR
npm run dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 Connecting to Backend

Update the backend URL in `lib/fetchHook.ts`:

```ts
const API_URL = "http://localhost:8000/generate-hook";
```

To switch between local and production APIs, you can use environment variables via `.env`:

```env
VITE_API_URL=http://localhost:8000/generate-hook
```

And in your code:

```ts
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 🧠 How it Works

1. User types or pastes text into a textarea.
2. The frontend sends this text to the backend API.
3. The backend returns a short punchline.
4. The result is displayed in an animated card with a copy button.

---

## 🌍 Deployment

### Vercel (recommended)

Just push the repo to GitHub and connect it to [Vercel](https://vercel.com). No config needed, it auto-detects Vite.

---

## 📄 License

MIT – Feel free to fork, contribute and build your portfolio!

---

Made with ❤️ by Jonathan
