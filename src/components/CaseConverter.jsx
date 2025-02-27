import { useState } from "react";

const toLowerCase = (str) => str.toLowerCase();
const toUpperCase = (str) => str.toUpperCase();
const toCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
const toCapitalCase = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());
const toConstantCase = (str) => str.toUpperCase().replace(/\s+/g, "_");
const toHeaderCase = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\s+/g, "-");
const toParamCase = (str) => str.toLowerCase().replace(/\s+/g, "-");
const toPascalCase = (str) =>
  str.replace(/\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const toSnakeCase = (str) => str.toLowerCase().replace(/\s+/g, "_");

const caseFunctions = {
  lowercase: toLowerCase,
  uppercase: toUpperCase,
  camelcase: toCamelCase,
  capitalcase: toCapitalCase,
  constantcase: toConstantCase,
  headercase: toHeaderCase,
  paramcase: toParamCase,
  pascalcase: toPascalCase,
  snakecase: toSnakeCase,
};

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [caseType, setCaseType] = useState("lowercase");
  const [convertedText, setConvertedText] = useState("");
  const [warning, setWarning] = useState("");

  const handleConvert = () => {
    if (text.trim() === "") {
      setWarning("Please enter text before converting!");
      setTimeout(() => setWarning(""), 3000); // Clear warning after 3 seconds
      return;
    }
    setConvertedText(caseFunctions[caseType](text));
  };

  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = convertedText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mt-4">
      <h3>Case Converter</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      {warning && (
        <div className="alert alert-danger mt-2" role="alert">
        {warning}
      </div>
      )}
      <select
        value={caseType}
        onChange={(e) => setCaseType(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        {Object.keys(caseFunctions).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
      <button onClick={handleConvert} style={{ width: "100%", padding: "10px", marginBottom: "10px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>
        Convert
      </button>
      {convertedText && (
        <>
          <p style={{ padding: "10px", background: "#fff", borderRadius: "5px", wordWrap: "break-word" }}>{convertedText}</p>
          <button onClick={handleCopy} style={{ width: "100%", padding: "10px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>
            Copy
          </button>
        </>
      )}
    </div>
  );
};

export default CaseConverter;
