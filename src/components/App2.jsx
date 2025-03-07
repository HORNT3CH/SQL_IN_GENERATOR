import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

const App2 = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sqlType, setSqlType] = useState("IN"); // State for IN or NOT IN selection
  const [warning, setWarning] = useState("");
  const [copiedQuery, setCopiedQuery] = useState("");

  const convertToSQL = () => {
    const items = input
      .split("\n")
      .map(item => item.trim()) // Trim whitespace
      .filter(item => item.length > 0); // Remove empty lines

    if (items.length === 0) {
      setWarning("Please enter a list before converting.");
      setTimeout(() => setWarning(""), 3000);      
    } else {
      setOutput(`${sqlType} (\n'${items.join("',\n'")}'\n)`);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(output).then(() => {
        setCopiedQuery("Copied to clipboard!");
        setTimeout(() => setCopiedQuery(null), 2000);
      }).catch(err => {
        console.error("Clipboard copy failed:", err);
        fallbackCopyText(output);
      });
    } else {
      fallbackCopyText(output);
    }
  };

  // Fallback method for older browsers
  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedQuery("Copied to clipboard!");
      setTimeout(() => setCopiedQuery(null), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Container className="mt-4">
      <h2>SQL IN/NOT IN Generator (From Unquoted List)</h2>
      <Form.Control as="textarea" rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter list here..." />
      <h3>Select IN/NOT IN</h3>
      <Form.Select className="mt-2" value={sqlType} onChange={(e) => setSqlType(e.target.value)}>
        <option value="IN">IN</option>
        <option value="NOT IN">NOT IN</option>
      </Form.Select>
      {warning && (
        <div className="alert alert-danger mt-2" role="alert">
        {warning}
      </div>
      )}

      <Button className="mt-2" onClick={convertToSQL}>Convert</Button>

      <Form.Control as="textarea" rows={6} className="mt-3" readOnly value={output} />
      <Button className="mt-2" variant="secondary" onClick={copyToClipboard}>Copy</Button>
      {copiedQuery && (
        <div className="alert alert-success mt-2" role="alert">
        {copiedQuery}
      </div>
      )}
    </Container>
  );
};

export default App2;
