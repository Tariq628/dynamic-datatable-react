import React, { useState } from "react";
import TableSelector from "./components/TableSelector";
import DataTable from "./components/DataTable";

const App = () => {
  const [selectedTable, setSelectedTable] = useState("");

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div>
      <h1>Data Table Example</h1>
      <TableSelector onTableSelect={handleTableSelect} />
      {selectedTable && (
        <DataTable apiBaseUrl="YOUR_API_BASE_URL" tableName={selectedTable} />
      )}
    </div>
  );
};

export default App;
