import React from "react";

const VehicleTable = ({ data, editedData, onEdit, onUploadToFirestore }) => {
  return (
    <div>
      <h4>Datos del Archivo CSV</h4>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data[0]).map(
              (key) => !["__parsed_extra", "IMAGEN"].includes(key) && <th key={key}>{key}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(
                ([key, value], colIndex) =>
                  !["__parsed_extra", "IMAGEN"].includes(key) && (
                    <td key={colIndex}>
                      {typeof value === "object" ? (
                        <div>
                          {Object.entries(value).map(([imgKey, imgValue], imgIndex) => (
                            <div key={imgIndex}>
                              <strong>{imgKey}:</strong> {imgValue}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={editedData[index][key]}
                          onChange={(e) => onEdit(index, key, e.target.value)}
                        />
                      )}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={onUploadToFirestore}>
        Subir a BD principal
      </button>
    </div>
  );
};

export default VehicleTable;
