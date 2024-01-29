import React from "react";

const UploadForm = ({ onFileUpload, onUpload }) => {
  return (
    <div>
      <label htmlFor="fileInput" className="form-label">
        Selecciona un archivo CSV:
      </label>
      <input type="file" id="fileInput" accept=".csv" onChange={(e) => onFileUpload(e.target.files[0])} />
      <button type="button" onClick={onUpload}>
        Mostrar datos
      </button>
    </div>
  );
};

export default UploadForm;
