import { useState } from "react";
import { format } from "sql-formatter";

const SqlPrettifier = () => {
  const [sqlInput, setSqlInput] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [copiedQuery, setCopiedQuery] = useState(null);
  const [warning, setWarning] = useState(null);

  // Function to format SQL
  const handleFormat = () => {
    if (!sqlInput.trim()) {
      setWarning("Please enter SQL before prettifying.");
      setTimeout(() => setWarning(null), 3000);
      return;
    }

    try {
      const prettySql = format(sqlInput, { language: "sql" });
      setFormattedSql(prettySql);
      setWarning(null);
    } catch (error) {
      setFormattedSql("Error formatting SQL: " + error.message);
    }
  };

  // Copy Function with Fallback
  const handleCopy = (query) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(query)
        .then(() => {
          setCopiedQuery(query);
          setTimeout(() => setCopiedQuery(null), 2000);
        })
        .catch((err) => {
          console.error("Clipboard error:", err);
          fallbackCopyText(query);
        });
    } else {
      fallbackCopyText(query);
    }
  };

  // Fallback method for copying text
  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedQuery(text);
      setTimeout(() => setCopiedQuery(null), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="container mt-4">
      <h2>SQL Prettifier</h2>
      <textarea
        className="form-control"
        rows="5"
        placeholder="Enter your SQL here..."
        value={sqlInput}
        onChange={(e) => setSqlInput(e.target.value)}
      ></textarea>

      {/* Warning Message */}
      {warning && (
        <div className="alert alert-danger mt-2" role="alert">
          {warning}
        </div>
      )}

      <button className="btn btn-primary mt-2 me-2" onClick={handleFormat}>
        Prettify SQL
      </button>

      {formattedSql && (
        <div className="mt-3 p-3 border rounded bg-light position-relative">
          <pre>{formattedSql}</pre>
          <button
            className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-2"
            onClick={() => handleCopy(formattedSql)}
          >
            {copiedQuery === formattedSql ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SqlPrettifier;
