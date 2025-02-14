import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

const App1 = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sqlType, setSqlType] = useState("IN"); // Default to IN

  const convertToSQLClause = () => {
    const items = input
      .split("\n")
      .map(item => item.trim().replace(/^"(.+?)"$/g, "$1")) // Remove leading/trailing double quotes
      .filter(item => item.length > 0); // Remove empty lines

    if (items.length > 0) {
      setOutput(`${sqlType} (\n'${items.join("',\n'")}'\n)`);
    } else {
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(output).then(() => {
        alert("Copied to clipboard!");
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
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Container className="mt-4">
      <h2>SQL IN/NOT IN Generator (Removes Double Quotes)</h2>
      <Form.Control as="textarea" rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter list here..." />
      <h3>Select IN/NOT IN</h3>
      <Form.Select className="mt-2" value={sqlType} onChange={(e) => setSqlType(e.target.value)}>
        <option value="IN">IN</option>
        <option value="NOT IN">NOT IN</option>
      </Form.Select>
      
      <Button className="mt-2" onClick={convertToSQLClause}>Convert</Button>
      <Form.Control as="textarea" rows={6} className="mt-3" readOnly value={output} />
      <Button className="mt-2" variant="secondary" onClick={copyToClipboard}>Copy</Button>
    </Container>
  );
};

export default App1;
