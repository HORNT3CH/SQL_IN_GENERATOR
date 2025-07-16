import { useState } from 'react';

const XmlViewer = () => {
  const [rows, setRows] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(e.target.result, 'text/xml');

        const allElements = xmlDoc.getElementsByTagName('*');
        const parsedRows = [];

        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i];
          if (el.children.length === 0 && el.textContent.trim()) {
            parsedRows.push({
              tag: el.tagName,
              value: el.textContent.trim()
            });
          }
        }

        setRows(parsedRows);
      } catch {
        alert('Invalid XML file.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">XML Viewer</h1>

      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        className="form-control w-50 mx-auto mb-4"
      />

      {rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ELEMENT</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={row.tag === 'host_group_id' ? 'table-danger' : ''}
                >
                  <td>
                    <strong>{row.tag}</strong>
                  </td>
                  <td>
                    <strong>{row.value}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default XmlViewer;