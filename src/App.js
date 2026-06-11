import { useState, useRef, useCallback } from "react";

const COLORS = {
  navy: "#1B2A4A",
  navyLight: "#2C4270",
  gold: "#C9A84C",
  goldLight: "#F5E6C0",
  bg: "#F4F6F9",
  white: "#FFFFFF",
  cardBorder: "#DDE3EC",
  pass: "#1A6B3C",
  passBg: "#EAF5EF",
  fail: "#B91C1C",
  failBg: "#FEF2F2",
  warn: "#92400E",
  warnBg: "#FFFBEB",
  text: "#1A202C",
  muted: "#6B7280",
  uploadBorder: "#9CA3AF",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: COLORS.text,
  },
  header: {
    background: COLORS.navy,
    borderBottom: `3px solid ${COLORS.gold}`,
    padding: "0",
  },
  headerInner: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  seal: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: COLORS.gold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0,
  },
  headerText: {
    color: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "0.01em",
    margin: 0,
    lineHeight: 1.2,
  },
  headerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    margin: "2px 0 0",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  main: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "32px 24px 64px",
  },
  card: {
    background: COLORS.white,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 10,
    padding: 28,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: COLORS.muted,
    marginBottom: 14,
  },
  uploadZone: (isDragging, hasFile) => ({
    border: `2px dashed ${isDragging ? COLORS.navy : hasFile ? COLORS.pass : COLORS.uploadBorder}`,
    borderRadius: 8,
    padding: "40px 24px",
    textAlign: "center",
    background: isDragging ? "#EEF2FF" : hasFile ? COLORS.passBg : COLORS.bg,
    cursor: "pointer",
    transition: "all 0.15s ease",
  }),
  uploadIcon: {
    fontSize: 40,
    marginBottom: 12,
    display: "block",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.navy,
    marginBottom: 6,
  },
  uploadSub: {
    fontSize: 13,
    color: COLORS.muted,
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: 300,
    borderRadius: 6,
    border: `1px solid ${COLORS.cardBorder}`,
    marginTop: 16,
    display: "block",
    margin: "16px auto 0",
  },
  btn: (disabled) => ({
    background: disabled ? "#CBD5E1" : COLORS.navy,
    color: COLORS.white,
    border: "none",
    borderRadius: 7,
    padding: "13px 32px",
    fontSize: 15,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    width: "100%",
    marginTop: 20,
    letterSpacing: "0.02em",
    transition: "background 0.15s",
  }),
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "2.5px solid rgba(255,255,255,0.3)",
    borderTop: "2.5px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: 8,
    verticalAlign: "middle",
  },
  reportHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  reportTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: COLORS.navy,
  },
  overallBadge: (pass) => ({
    background: pass ? COLORS.pass : COLORS.fail,
    color: COLORS.white,
    borderRadius: 6,
    padding: "5px 14px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  }),
  fieldRow: {
    borderBottom: `1px solid ${COLORS.cardBorder}`,
    padding: "14px 0",
    display: "grid",
    gridTemplateColumns: "180px 1fr auto",
    gap: 12,
    alignItems: "start",
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.muted,
    paddingTop: 1,
  },
  fieldValue: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  fieldNote: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 3,
    fontStyle: "italic",
  },
  badge: (status) => {
    const map = {
      PASS: { bg: COLORS.passBg, color: COLORS.pass, border: "#A7F3D0" },
      FAIL: { bg: COLORS.failBg, color: COLORS.fail, border: "#FECACA" },
      WARN: { bg: COLORS.warnBg, color: COLORS.warn, border: "#FDE68A" },
      "N/A": { bg: "#F3F4F6", color: COLORS.muted, border: "#E5E7EB" },
    };
    const s = map[status] || map["N/A"];
    return {
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: 4,
      padding: "3px 9px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.06em",
      whiteSpace: "nowrap",
      alignSelf: "start",
    };
  },
  summaryBox: (pass) => ({
    background: pass ? COLORS.passBg : COLORS.failBg,
    border: `1px solid ${pass ? "#A7F3D0" : "#FECACA"}`,
    borderRadius: 8,
    padding: "14px 18px",
    marginTop: 20,
    fontSize: 14,
    color: pass ? COLORS.pass : COLORS.fail,
    lineHeight: 1.6,
    fontWeight: 500,
  }),
  errorBox: {
    background: COLORS.failBg,
    border: `1px solid #FECACA`,
    borderRadius: 8,
    padding: "14px 18px",
    color: COLORS.fail,
    fontSize: 14,
    lineHeight: 1.6,
  },
  resetBtn: {
    background: "none",
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 6,
    padding: "8px 18px",
    fontSize: 13,
    color: COLORS.muted,
    cursor: "pointer",
    marginTop: 16,
    display: "block",
  },
  apiKeyRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 6,
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "monospace",
    color: COLORS.text,
    background: COLORS.white,
    outline: "none",
  },
};

const FIELD_LABELS = {
  brandName: "Brand Name",
  classType: "Class / Type",
  alcoholContent: "Alcohol Content",
  netContents: "Net Contents",
  producerInfo: "Producer / Bottler",
  countryOfOrigin: "Country of Origin",
  governmentWarning: "Government Warning",
};

function StatusBadge({ status }) {
  return <span style={styles.badge(status)}>{status}</span>;
}

function FieldRow({ fieldKey, data }) {
  if (!data) return null;
  return (
    <div style={styles.fieldRow}>
      <div style={styles.fieldLabel}>{FIELD_LABELS[fieldKey] || fieldKey}</div>
      <div>
        <div style={styles.fieldValue}>{data.extracted || <em style={{ color: COLORS.muted }}>Not found</em>}</div>
        {data.note && <div style={styles.fieldNote}>{data.note}</div>}
      </div>
      <StatusBadge status={data.status} />
    </div>
  );
}

function ReportCard({ result, onReset }) {
  const fields = result.fields || {};
  const allStatuses = Object.values(fields).map((f) => f?.status);
  const overallPass = !allStatuses.includes("FAIL") && result.overallPass !== false;

  return (
    <div style={styles.card}>
      <div style={styles.reportHeader}>
        <div style={styles.reportTitle}>ðŸ“‹ Compliance Review Report</div>
        <span style={styles.overallBadge(overallPass)}>
          {overallPass ? "âœ“ Label Compliant" : "âœ— Issues Found"}
        </span>
      </div>

      <div style={styles.sectionLabel}>Extracted Label Fields</div>
      <div>
        {Object.keys(FIELD_LABELS).map((key) => (
          <FieldRow key={key} fieldKey={key} data={fields[key]} />
        ))}
      </div>

      {result.summary && (
        <div style={styles.summaryBox(overallPass)}>
          <strong>{overallPass ? "Summary:" : "Issues to resolve:"}</strong>
          <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{result.summary}</div>
        </div>
      )}

      <button style={styles.resetBtn} onClick={onReset}>
        â† Review another label
      </button>
    </div>
  );
}

const SYSTEM_PROMPT = `You are a TTB (Alcohol and Tobacco Tax and Trade Bureau) label compliance specialist AI. Your job is to analyze alcohol beverage label images and extract key fields, then verify compliance.

Extract and verify these fields from the label image:
1. brandName - The brand name on the label
2. classType - The class/type designation (e.g. "Kentucky Straight Bourbon Whiskey")
3. alcoholContent - Alcohol by volume percentage and proof if present
4. netContents - Volume (e.g. "750 mL")
5. producerInfo - Name and address of bottler/producer
6. countryOfOrigin - Country of origin (required for imports, may be omitted for domestic)
7. governmentWarning - The government health warning statement

For governmentWarning: It MUST read exactly "GOVERNMENT WARNING: (1) According to the Surgeon General, women should not drink alcoholic beverages during pregnancy because of the risk of birth defects. (2) Consumption of alcoholic beverages impairs your ability to drive a car or operate machinery, and may cause health problems." The "GOVERNMENT WARNING:" portion must appear in all caps and bold. Flag ANY deviation as FAIL.

Return ONLY valid JSON in this exact structure, no other text:
{
  "fields": {
    "brandName": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "classType": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "alcoholContent": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "netContents": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "producerInfo": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "countryOfOrigin": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" },
    "governmentWarning": { "extracted": "string or null", "status": "PASS|FAIL|WARN|N/A", "note": "optional explanation" }
  },
  "overallPass": true|false,
  "summary": "1-3 sentence plain English summary of findings. If issues, clearly list what needs to be corrected."
}

Status guide:
- PASS: Field present and compliant
- FAIL: Field missing, incorrect, or non-compliant (must be corrected)
- WARN: Field present but has minor issues worth noting
- N/A: Field not applicable (e.g. country of origin for domestic product)`;

async function analyzeLabel(imageBase64, mimeType, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: "Please analyze this alcohol beverage label for TTB compliance. Extract all required fields and verify them.",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.find((b) => b.type === "text")?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP, etc.)");
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const onAnalyze = async () => {
    if (!file || !apiKey.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const mimeType = file.type || "image/jpeg";
      const data = await analyzeLabel(base64, mimeType, apiKey.trim());
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.seal}>ðŸ ›ï¸ </div>
          <div style={styles.headerText}>
            <p style={styles.headerTitle}>TTB Label Compliance Verifier</p>
            <p style={styles.headerSub}>Alcohol and Tobacco Tax and Trade Bureau Â· Prototype</p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* API Key */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Anthropic API Key</div>
          <div style={styles.apiKeyRow}>
            <input
              style={styles.input}
              type={showKey ? "text" : "password"}
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              onClick={() => setShowKey((v) => !v)}
              style={{
                ...styles.resetBtn,
                margin: 0,
                padding: "9px 14px",
                fontSize: 13,
                border: `1px solid ${COLORS.cardBorder}`,
              }}
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: COLORS.muted, margin: 0 }}>
            Your key is never stored or sent anywhere except the Anthropic API.
          </p>
        </div>

        {/* Upload */}
        {!result && (
          <div style={styles.card}>
            <div style={styles.sectionLabel}>Label Image</div>
            <div
              style={styles.uploadZone(isDragging, !!file)}
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
            >
              <span style={styles.uploadIcon}>{file ? "ðŸ–¼ï¸ " : "ðŸ“¤"}</span>
              {file ? (
                <>
                  <div style={styles.uploadText}>{file.name}</div>
                  <div style={styles.uploadSub}>Click to change image</div>
                  <img src={preview} alt="Label preview" style={styles.previewImg} />
                </>
              ) : (
                <>
                  <div style={styles.uploadText}>Drop a label image here</div>
                  <div style={styles.uploadSub}>or click to browse Â· JPG, PNG, WEBP supported</div>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {error && (
              <div style={{ ...styles.errorBox, marginTop: 14 }}>
                âš ï¸ {error}
              </div>
            )}

            <button
              style={styles.btn(!file || !apiKey.trim() || loading)}
              disabled={!file || !apiKey.trim() || loading}
              onClick={onAnalyze}
            >
              {loading ? (
                <>
                  <span style={styles.spinner} />
                  Analyzing label...
                </>
              ) : (
                "Verify Label Compliance"
              )}
            </button>
          </div>
        )}

        {/* Result */}
        {result && <ReportCard result={result} onReset={onReset} />}
        {result && error && (
          <div style={{ ...styles.errorBox, marginTop: 0 }}>âš ï¸ {error}</div>
        )}
      </main>
    </div>
  );
}



