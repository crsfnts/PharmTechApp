# RxMate - Professional Pharmacy Tools

A comprehensive React + TypeScript application providing professional tools and learning resources for pharmacy technicians.

## Features

- **Calculations**: Days Supply Calculator, Hospital Calculations (IV Flow Rate, Alligation)
- **Learning**: SIG Code Trainer, PTCB Flashcards, Injection Guide
- **Tools**: Drug Lookup, Pill Identifier, Billing & Insurance Resources
- **AI-Powered**: Uses Google Gemini AI for pill identification

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `VITE_GEMINI_API_KEY` in `.env.local`:
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (usually http://localhost:5005/)

## Deploy to Netlify

### Quick Deploy

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Add the environment variable in Netlify:
   - Go to **Site settings** → **Environment variables**
   - Add `VITE_GEMINI_API_KEY` with your Gemini API key
5. Trigger a new deploy

### Manual Deploy

```bash
# Build the production bundle
npm run build

# The dist/ folder is ready to deploy
# You can drag and drop it to Netlify's deploy page
```

For detailed deployment instructions, see [NETLIFY_SETUP.md](NETLIFY_SETUP.md)

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Tech Stack

- React 19.1.0
- TypeScript
- Vite 6.2.0
- Tailwind CSS
- Google Gemini AI
