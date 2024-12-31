/* This component fetches todo items from an API, manages their state and displays them in a list with checkboxes 
and action buttons for editing and deleting. It ensures the component is only rendered on the client side.
*/

"use client";
import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = () => {
  // State for checked tasks (using an array of checked IDs)
  const [checked, setChecked] = useState([]);

  // State for task data retrieved from the API
  const [taskData, setTaskData] = useState([]);

  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Fetch the task data from the API when the component is rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/route", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Log response status and headers
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);

        // Get the response text
        const text = await res.text();
        console.log("Response text:", text); // Log the response text

        // Check if the response is JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = JSON.parse(text); // Parse the response text as JSON
          setTaskData(data); // Set the task data state with the API response
        } else {
          throw new Error("Response is not JSON");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setIsMounted(true); // Set the component as mounted
  }, []);

  // Function to handle task checkbox toggle
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value); // Add task ID to checked array
    } else {
      newChecked.splice(currentIndex, 1); // Remove task ID from checked array
    }

    setChecked(newChecked); // Update the checked state
  };

  // Render the component only if it is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <List sx={{ width: 400, bgcolor: "background.paper" }}>
        {/* Map through the task data and render each task */}
        {taskData.map((data) => {
          const labelId = `checkbox-list-label-${data.id}`;

          return (
            <ListItem
              key={data.id}
              secondaryAction={
                <>
                  <IconButton
                    aria-label="edit"
                    sx={{ color: "edit.main" }}
                    onClick={() => {}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: "error.light" }}
                    onClick={() => {}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(data.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(data.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    sx={{ color: "primary.light" }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={data.task}
                  sx={{ ml: -2 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TodoList;