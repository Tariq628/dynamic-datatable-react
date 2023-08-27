import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const DataTable = ({ apiBaseUrl, tableName }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    // Fetch data from the API
    fetch(`${apiBaseUrl}/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Use the keys of the first entry as columns
          const entryKeys = Object.keys(data[0]);
          setColumns(entryKeys);
          setData(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiBaseUrl, tableName]);


  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedValues(data[index]);
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editedValues;
    setData(updatedData);
    setEditIndex(-1);
    setEditedValues({});
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditedValues({});
  };

  const handleChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {editIndex === index ? (
                    <TextField
                      value={editedValues[column] || ""}
                      onChange={(e) => handleChange(column, e.target.value)}
                    />
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editIndex === index ? (
                  <>
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <EditIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
