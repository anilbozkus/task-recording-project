import React, { Key, useContext, useEffect, useState } from 'react';
import { Modal, Box, IconButton, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './modal.scss';
import { AppContext } from '../../appContext';
import { v4 as uuidv4 } from 'uuid';

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  onDateChange: (date: Date | null) => void; // Add the onDateChange prop
}

interface Task {
  id: Key | null | undefined;
  task_type: string;
  content: string;
  date: Date | null;
  column: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, onDateChange  }) => {
  const { selectedDate, setSelectedDate } = useContext(AppContext);
  const { tasks, setTasks } = useContext(AppContext);

  const [newTask, setNewTask] = useState<Task[]>([
    { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
    { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
    { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
  ]);

  useEffect(() => {
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      onDateChange(date);
      setNewTask((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          date: date,
        }))
      );
    };

    handleDateChange(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && tasks.length > 0) {
      const matchingTasks = tasks.filter((task) => {
        if (task.date && selectedDate) {
          const taskDateStr = task.date.toISOString().slice(0, -5);
          const selectedDateStr = selectedDate.toISOString().slice(0, -5);
          return taskDateStr === selectedDateStr;
        }
        return false;
      });
  
      if (matchingTasks.length > 0) {
        setNewTask((prevTasks) => {
          return prevTasks.map((task, index) => {
            if (index < matchingTasks.length) {
              const matchingTask = matchingTasks[index];
              return {
                ...task,
                task_type: matchingTask.task_type,
                content: matchingTask.content,
                column: matchingTask.column, // Keep the existing 'column' value
                date: selectedDate,
              };
            }
            return task;
          });
        });
      } else {
        setNewTask([
          { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
          { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
          { id: uuidv4(), task_type: '', content: '', date: selectedDate, column: 'backlog' },
        ]);
      }
    }
  }, [selectedDate, tasks]);

  const handleClose = () => {
    onClose();
  };

  const handleTaskTypeChange = (index: number, value: string) => {
    setNewTask((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? { ...task, task_type: value } : task))
    );
  };

  const handleContentChange = (index: number, value: string) => {
    setNewTask((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            content: value,
          };
        }
        return task;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const validTasks = newTask.filter((task) => task.task_type || task.content);
    const validTasksLength = validTasks.length;
  
    if (validTasksLength > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task, index) => {
          if (
            task.date &&
            selectedDate &&
            task.date.toISOString().slice(0, -5) === selectedDate.toISOString().slice(0, -5)
          ) {
            const validTaskIndex = index % 3;
            const matchingTask = validTasks[validTaskIndex];
            return {
              ...task,
              task_type: matchingTask?.task_type || task.task_type,
              content: matchingTask?.content || task.content,
              column: matchingTask?.column || task.column, // Keep the existing 'column' value
            };
          }
          return task;
        });
  
        const existingTasksLength = updatedTasks.filter(
          (task) =>
            task.date &&
            selectedDate &&
            task.date.toISOString().slice(0, -5) === selectedDate.toISOString().slice(0, -5)
        ).length;
  
        if (validTasksLength > existingTasksLength) {
          const missingTasks = validTasks.slice(existingTasksLength);
  
          return [...updatedTasks, ...missingTasks];
        }
  
        return updatedTasks;
      });
    }
  
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="box-container">
        <IconButton
          className="icon-container"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <p className="modal-title">
          Report Your Daily Tasks
        </p>
        <p className="modal-description">
          Please report your daily tasks below. You should enter the task type, task name, and estimated time you will spent on the
          task. You can also add a comments, but please keep them concise.
        </p>
        <Grid container spacing={2}>
          {newTask.map((task, index) => (
            <>
              <Grid item xs={12} md={3}>
                <FormControl className='type-field'>
                  <InputLabel id={`task-type-label-${index}`}>Type</InputLabel>
                  <Select
                    labelId={`task-type-label-${index}`}
                    id={`task-type-select-${index}`}
                    value={task?.task_type}
                    onChange={(e) => handleTaskTypeChange(index, e.target.value as string)}
                  >
                    <MenuItem value="Bug">
                      <Box sx={{
                        width: 14,
                        height: 14,
                        backgroundColor: '#F32E2E',
                        marginRight: '8px',
                        borderRadius: '4px'
                      }}
                      /> Bug</MenuItem>
                    <MenuItem value="Feature">
                      <Box sx={{
                        width: 14,
                        height: 14,
                        backgroundColor: '#56B969',
                        marginRight: '8px',
                        borderRadius: '4px'
                      }}
                      /> Feature</MenuItem>
                    <MenuItem value="Refactor">
                      <Box sx={{
                        width: 14,
                        height: 14,
                        backgroundColor: '#E034CF',
                        marginRight: '8px',
                        borderRadius: '4px'
                      }}
                      /> Refactor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  className='description-field'
                  label="Please write task description..."
                  value={task?.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
              </Grid>
            </>
          ))}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
