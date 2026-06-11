# Technical Approach, Tools Used & Assumptions

**Project:** TTB Label Compliance Verifier  
**Role:** IT Specialist (AI) — 26-DO-12891471-DH  
**Applicant:** Patrick Barnett

---

## Approach

### Core Strategy

The central insight from the stakeholder interviews is that most of what TTB compliance agents do is **structured field extraction and matching** — reading a label image and verifying that the right information is present in the right format. This is exactly what modern vision-language models excel at.

Rather than building a traditional OCR pipeline (which the prior vendor pilot showed was too slow and brittle), I used a large multimodal AI model that can simultaneously read the image, understand context, and apply compliance rules in a single API call — reliably returning results in under 3 seconds.

### How It Works

1. The user uploads a label image (JPG, PNG, or WEBP)
2. The image is base64-encoded and sent to the Anthropic Claude API along with a detailed compliance system prompt
3. The model extracts all required TTB fields and evaluates each one, returning structured JSON
4. The app renders a field-by-field compliance report with PASS / FAIL / WARN / N/A status per field
5. A plain-English summary explains any issues found

The system prompt encodes the key TTB requirements directly, including the exact Government Warning statement that must appear verbatim with "GOVERNMENT WARNING:" in all-caps bold. This was flagged as the most error-prone and consequential field by stakeholders.

### Design Decisions

**Single-page, no-login UI:** Per Sarah Chen's feedback, the tool needs to be usable by agents across a wide range of technical comfort levels. The interface has three elements: an API key field, an upload zone, and a results card. There is no navigation, no account creation, and no state to manage between sessions.

**Compliance report card format:** Results are presented as a structured table with one row per TTB field, mirroring the mental model agents already use (their existing printed checklists). This reduces the learning curve.

**Response time:** By routing through a single API call rather than a multi-step pipeline, the app consistently returns results in 2–4 seconds — well within Sarah's stated 5-second requirement that killed the previous scanning vendor pilot.

**Stateless prototype:** No database, no authentication, no data retention. This aligns with Marcus Williams' guidance that the prototype should avoid PII handling complexity, and keeps the infrastructure footprint minimal.

---

## Tools & Technologies

| Tool | Version / Tier | Purpose |
|------|---------------|---------|
| React | 18 (Create React App) | Frontend framework |
| Anthropic Claude API | `claude-opus-4-5` | Vision AI for label analysis |
| Vercel | Free tier | Hosting and deployment |
| JavaScript (ES2022) | — | Application logic |

No backend server, database, or additional infrastructure is required.

---

## Assumptions Made

1. **API key handling:** For prototype purposes, the Anthropic API key is entered by the user in the UI and used client-side. In a production environment, this would be replaced with a server-side proxy so keys are never exposed in the browser.

2. **TTB field requirements:** I used the field list and Government Warning text specified in the assessment instructions. For beverage-type-specific requirements (e.g., certain beer/wine ABV exceptions), the model applies general TTB rules. A production system would encode the full TTB regulatory matrix per beverage type.

3. **"Country of Origin" for domestic products:** This field is marked N/A when the label indicates a domestic producer, consistent with TTB rules that only require country of origin for imports.

4. **Government Warning exact text:** The assessment specified that the warning must be exact and "GOVERNMENT WARNING:" must appear in all caps and bold. I treat any deviation — including case differences, font/formatting issues, or wording changes — as a FAIL, consistent with Jenny Park's account of real enforcement (she cited a title-case rejection).

5. **Image quality tolerance:** The app handles moderate imperfections (slight angles, minor glare) well. Severely degraded images may reduce accuracy; the README notes this as a limitation.

6. **Batch processing:** Identified as a high-value feature (Janet from the Seattle office, per Sarah) but excluded from this prototype to keep the scope to a working core application. It would be the natural next feature — the architecture supports it with minimal changes (loop over images, aggregate results).

---

## What I Would Add With More Time

- **Batch upload:** Process 200–300 labels at once, with a downloadable results CSV — addressing the peak-season bottleneck Sarah described
- **Backend proxy:** Move the API key server-side and add rate limiting
- **Side-by-side view:** Show the label image alongside the results card so agents can visually verify AI findings
- **Application data input:** Allow agents to paste the application fields (brand name, ABV, etc.) so the tool can verify label vs. application — not just label completeness
- **Confidence indicators:** Surface model uncertainty so agents know when to give a result extra scrutiny
