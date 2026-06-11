# TTB Label Compliance Verifier

An AI-powered web application that automates alcohol beverage label review for TTB (Alcohol and Tobacco Tax and Trade Bureau) compliance agents.

## What It Does

Upload a photo of an alcohol beverage label and get an instant compliance report. The app uses Claude's vision AI to:

- Extract all required TTB label fields from the image
- Verify each field against TTB requirements
- Flag issues with a PASS / FAIL / WARN status per field
- Provide a plain-English summary of any problems found

**Fields checked:**
- Brand Name
- Class / Type designation
- Alcohol Content (ABV)
- Net Contents
- Producer / Bottler name and address
- Country of Origin
- Government Health Warning Statement (exact wording verified)

---

## Live Demo

> https://ttb-label-verifier-eight.vercel.app

---

## Setup & Run Locally

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/ttb-label-verifier.git
cd ttb-label-verifier

# 2. Create a React app and replace the default App
npx create-react-app .

# 3. Replace src/App.js with the contents of ttb-label-verifier.jsx

# 4. Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using the App

1. Enter your Anthropic API key in the field at the top
2. Upload or drag-and-drop a label image (JPG, PNG, or WEBP)
3. Click **Verify Label Compliance**
4. Review the compliance report â€” each field shows PASS, FAIL, WARN, or N/A

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys on push.

> **Note:** The free Vercel tier is sufficient for this prototype. No database or server infrastructure is required.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React (Create React App) |
| AI / Vision | Anthropic Claude (`claude-opus-4-5`) |
| Styling | Inline CSS with design tokens (no dependencies) |
| Deployment | Vercel (free tier) |

No backend server is required. The app calls the Anthropic API directly from the browser using the user-supplied API key.

---

## Project Structure

```
src/
  App.js          # Full application (single file)
public/
  index.html      # Standard CRA entry point
README.md
APPROACH.md       # Technical approach and assumptions
```

---

## Known Limitations & Trade-offs

- **API key in browser:** For this prototype, the Anthropic API key is entered client-side. A production deployment would use a backend proxy to keep the key server-side.
- **Single image upload:** Batch processing (multiple labels at once) is noted as a high-value future feature but is out of scope for this prototype.
- **No persistence:** Results are not saved between sessions. Each review is stateless.
- **Image quality:** Heavily blurred, extremely low-resolution, or severely angled images may reduce extraction accuracy. The AI handles moderate imperfections well.
- **Government Warning verification:** The app checks for exact wording and formatting of the mandatory warning statement. Minor OCR artifacts in degraded images could produce false negatives â€” agents should manually confirm any FAIL on this field for low-quality images.

