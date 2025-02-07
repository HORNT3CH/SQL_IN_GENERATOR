import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

const App1 = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertToSQLIn = () => {
    const items = input
      .split("\n")
      .map(item => item.trim().replace(/^"(.+?)"$/g, "$1")) // Ensure leading/trailing double quotes are removed properly
      .filter(item => item.length > 0); // Remove empty lines

    if (items.length > 0) {
      setOutput(`IN (\n'${items.join("',\n'")}'\n)`);
    } else {
      setOutput(""); // Prevent outputting empty SQL IN clause
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
      <h2>Remove Double Quotes</h2>
      <Form.Control as="textarea" rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter list here..." />
      <Button className="mt-2" onClick={convertToSQLIn}>Convert</Button>
      <Form.Control as="textarea" rows={6} className="mt-3" readOnly value={output} />
      <Button className="mt-2" variant="secondary" onClick={copyToClipboard}>Copy</Button>
    </Container>
  );
};

export default App1;
