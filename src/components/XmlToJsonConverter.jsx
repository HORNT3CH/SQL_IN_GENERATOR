import { useState } from "react";
import { xml2json } from "xml-js";

const XmlToJsonConverter = () => {
  const [xmlInput, setXmlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [warning, setWarning] = useState("");

  const handleConvert = () => {
    if (!xmlInput.trim()) {
      setWarning("Please enter valid XML before converting.");
      setJsonOutput(""); // Clear any previous output
      setTimeout(() => setWarning(""), 3000); // Hide warning after 3 seconds
      return;
    }

    try {
      const jsonResult = xml2json(xmlInput, { compact: true, spaces: 2 });
      setJsonOutput(jsonResult);
      setWarning(""); // Clear any warnings when conversion is successful
    } catch (error) {
      setJsonOutput("Invalid XML format");
      setWarning("");
    }
  };

  // Fallback copy function
  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  // Copy Function
  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(jsonOutput)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Clipboard error:", err);
          fallbackCopyText(jsonOutput);
        });
    } else {
      fallbackCopyText(jsonOutput);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>XML to JSON Converter</h2>
      <textarea
        style={{ width: "100%", height: "150px", padding: "10px" }}
        placeholder="Enter XML here..."
        value={xmlInput}
        onChange={(e) => setXmlInput(e.target.value)}
      />
      {warning && (
        <div className="alert alert-danger mt-2" role="alert">
        {warning}
      </div>
      )}
      <button
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleConvert}
      >
        Convert to JSON
      </button>
      {jsonOutput && (
        <>
          <h4 style={{ marginTop: "20px" }}>JSON Output</h4>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {jsonOutput}
          </pre>
          <button
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              background: copied ? "#28a745" : "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </>
      )}
    </div>
  );
};

export default XmlToJsonConverter;
