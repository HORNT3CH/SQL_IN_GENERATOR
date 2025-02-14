import { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";

const App3 = () => {
  const LOCAL_STORAGE_KEY = "savedQueries";

  // Load queries from local storage (default: empty array)
  const [queries, setQueries] = useState(() => {
    const savedQueries = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedQueries ? JSON.parse(savedQueries) : [];
  });

  const [queryName, setQueryName] = useState("");
  const [queryText, setQueryText] = useState("");
  const [copiedQuery, setCopiedQuery] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track expanded queries

  // Save queries to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queries));
  }, [queries]);

  // Copy Function
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

  // Fallback Copy Function
  const fallbackCopyText = (query) => {
    const textArea = document.createElement("textarea");
    textArea.value = query;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedQuery(query);
      setTimeout(() => setCopiedQuery(null), 2000);
    } catch (err) {
      console.error("Fallback clipboard error:", err);
      alert("Failed to copy. Please copy manually.");
    }
    document.body.removeChild(textArea);
  };

  // Add Query Function
  const handleAddQuery = () => {
    if (queryName.trim() === "" || queryText.trim() === "") {
      alert("Please enter both a query name and a SQL query.");
      return;
    }

    const newQueries = [...queries, { name: queryName, query: queryText }];
    setQueries(newQueries);
    setQueryName("");
    setQueryText("");
  };

  // Delete Query Function
  const handleDeleteQuery = (index) => {
    const updatedQueries = queries.filter((_, i) => i !== index);
    setQueries(updatedQueries);
  };

  // Toggle Query Expansion (Makes Query Scrollable)
  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">SQL Query Manager</h1>

      {/* Input Form for Adding Queries */}
      <div className="card p-3 mb-4 shadow">
        <div className="mb-3">
          <Form.Label>Query Name:</Form.Label>
          <input
            type="text"
            className="form-control"
            value={queryName}
            onChange={(e) => setQueryName(e.target.value)}
            placeholder="Enter query name..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">SQL Query:</label>
          <textarea
            className="form-control"
            rows="3"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Enter SQL query..."
          ></textarea>
        </div>

        <Button className="btn btn-primary w-100" onClick={handleAddQuery}>
          Add Query
        </Button>
      </div>

      {/* Display Queries in Cards using Bootstrap Grid */}
      {queries.length > 0 ? (
        <div className="row">
          {queries.map((item, index) => {
            const lines = item.query.split("\n");
            const isLong = lines.length > 5;
            const displayedQuery = isLong
              ? lines.slice(0, 8).join("\n") + (expanded[index] ? "" : "\n...")
              : item.query;

            return (
              <div key={index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{item.name}</h5>
                    <pre
                      className="card-text text-muted small p-2 bg-light rounded"
                      style={{
                        whiteSpace: "pre-wrap",
                        maxHeight: expanded[index] ? "300px" : "215px",
                        overflowY: expanded[index] ? "auto" : "hidden",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      {displayedQuery}
                    </pre>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="btn btn-link p-0"
                      >
                        {expanded[index] ? "Show Less ▲" : "Show More ▼"}
                      </button>
                    )}
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      onClick={() => handleCopy(item.query)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i
                        className={`bi ${
                          copiedQuery === item.query
                            ? "bi-check-circle text-success"
                            : "bi-clipboard"
                        }`}
                      ></i>{" "}
                      {copiedQuery === item.query ? "Copied" : "Copy"}
                    </button>
                    <button
                      onClick={() => handleDeleteQuery(index)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-x-circle"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted">No saved queries. Add one to get started!</p>
      )}
    </Container>
  );
};

export default App3;
