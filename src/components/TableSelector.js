import React, { useState, useEffect } from "react";

const TableSelector = ({ onTableSelect }) => {
  const [tableNames, setTableNames] = useState(['test1', 'test2']);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    fetch("YOUR_TABLE_NAMES_API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => setTableNames(data))
      .catch((error) => console.error("Error fetching table names:", error));
  }, []);

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
    onTableSelect(event.target.value);
  };

  return (
    <select value={selectedTable} onChange={handleTableSelect}>
      <option value="">Select a table</option>
      {tableNames.map((tableName) => (
        <option key={tableName} value={tableName}>
          {tableName}
        </option>
      ))}
    </select>
  );
};

export default TableSelector;
