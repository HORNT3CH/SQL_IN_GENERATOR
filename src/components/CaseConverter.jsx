import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

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
  const [copiedToClipboard, setCopiedToClipboard] = useState("");

  const handleConvert = () => {
    if (text.trim() === "") {
      setWarning("Please enter text before converting!");
      setTimeout(() => setWarning(""), 3000); // Clear warning after 3 seconds
      return;
    }
    setWarning(""); // Clear warning when text is valid
    setConvertedText(caseFunctions[caseType](text));
  };

  const handleCopy = () => {
    if (convertedText) {
      const textarea = document.createElement("textarea");
      textarea.value = convertedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedToClipboard("Copied to clipboard!");
      setTimeout(() => setCopiedToClipboard(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center">Case Converter</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here"
          />
        </Form.Group>

        {warning && <Alert variant="danger">{warning}</Alert>}

        <Form.Group className="mb-3">
          <Form.Select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
            {Object.keys(caseFunctions).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" className="w-100 mb-3" onClick={handleConvert}>
          Convert
        </Button>

        {convertedText && (
          <>
            <div className="p-3 bg-light text-dark border rounded text-center">{convertedText}</div>
            <Button variant="success" className="w-100 mt-3" onClick={handleCopy}>
              Copy
            </Button>
            {copiedToClipboard && <Alert variant="success" className="mt-3">{copiedToClipboard}</Alert>}
          </>
        )}
      </Form>
    </Container>
  );
};

export default CaseConverter;
