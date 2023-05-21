import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import { Key, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DndComponent from '../../components/dndComponent/dndComponent';
import LoginFlow from '../../components/LoginFlow/loginFlow';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
}

interface Task {
  id: Key | null | undefined;
  task_type: string;
  content: string;
  date: Date | null;
  column: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Columns {
  [key: string]: Column;
}


function MainPage() {
  const { tasks, selectedDate } = useContext(AppContext);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setSelectedUser(user);
  };

  const initialColumns = {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      tasks: filteredTasks
    },
    progress: {
      id: 'progress',
      title: 'In Progress',
      tasks: filteredTasks
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: filteredTasks
    }
  };

  const [columns, setColumns] = useState<Columns>(initialColumns);
  
  const handleDragEnd = (result: DropResult) => {
    // Make sure we have a valid destination
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];
  
    const startTasks = Array.from(startColumn.tasks);
    const endTasks = Array.from(endColumn.tasks);
  
    const [removed] = startTasks.splice(source.index, 1);
  
    const updatedTask = {
      ...removed,
      column: endColumn.id === 'backlog' ? 'backlog' : endColumn.id,
    };
  
    // Move the task to the destination position
    endTasks.splice(destination.index, 0, updatedTask);
  
    const newColumns = {
      ...columns,
      [startColumn.id]: {
        ...startColumn,
        tasks: startTasks,
      },
      [endColumn.id]: {
        ...endColumn,
        tasks: endTasks,
      },
    };
  
    if (source.droppableId !== destination.droppableId) {
      // If the task is moved to a different column, update the column field of the task
      const updatedStartTasks = newColumns[startColumn.id].tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...task,
            column: endColumn.id === 'backlog' ? 'backlog' : endColumn.id,
          };
        }
        return task;
      });
  
      newColumns[startColumn.id].tasks = updatedStartTasks;
  
      if (destination.droppableId === 'backlog') {
        // When moving a task to the "Backlog" column from a different column,
        // ensure that the column field of the moved task is updated
        const updatedBacklogTasks = newColumns['backlog'].tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return {
              ...task,
              column: 'backlog',
            };
          }
          return task;
        });
  
        newColumns['backlog'].tasks = updatedBacklogTasks;
      } else if (source.droppableId === 'backlog' && newColumns['backlog'].tasks.length === 0) {
        // When moving a task from the "Backlog" column to a different column,
        // remove the task from the "Backlog" column
        newColumns['backlog'].tasks = newColumns['backlog'].tasks.filter((task) => task.id !== updatedTask.id);
      }
    }
  
    setColumns(newColumns);

  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  
    if (query.length === 0) {
      const filtered = tasks.filter((task) => {
        const taskDateStr = task?.date?.toISOString().slice(0, -5);
        const selectedDateStr = selectedDate?.toISOString().slice(0, -5);
        return taskDateStr === selectedDateStr;
      });
  
      setFilteredTasks(filtered);
      setColumns((prevColumns) => ({
        ...prevColumns,
        backlog: {
          ...prevColumns.backlog,
          tasks: filtered.filter((task) => task.column === 'backlog')
        },
        progress: {
          ...prevColumns.progress,
          tasks: filtered.filter((task) => task.column === 'progress')
        },
        done: {
          ...prevColumns.done,
          tasks: filtered.filter((task) => task.column === 'done')
        }
      }));
    } else {
      const filtered = tasks.filter((task) => {
        const taskDateStr = task?.date?.toISOString().slice(0, -5);
        const selectedDateStr = selectedDate?.toISOString().slice(0, -5);
        return (
          taskDateStr === selectedDateStr &&
          task.content.toLowerCase().includes(query.toLowerCase())
        );
      });
  
      setFilteredTasks(filtered);
      setColumns((prevColumns) => ({
        ...prevColumns,
        backlog: {
          ...prevColumns.backlog,
          tasks: filtered.filter((task) => task.column === 'backlog')
        },
        progress: {
          ...prevColumns.progress,
          tasks: filtered.filter((task) => task.column === 'progress')
        },
        done: {
          ...prevColumns.done,
          tasks: filtered.filter((task) => task.column === 'done')
        }
      }));
    }
  };

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const taskDateStr = task?.date?.toISOString().slice(0, -5);
      const selectedDateStr = selectedDate?.toISOString().slice(0, -5);
      return taskDateStr === selectedDateStr;
    });
    setFilteredTasks(filtered);
    setColumns((prevColumns) => ({
      ...prevColumns,
      backlog: {
        ...prevColumns.backlog,
        tasks: filtered
      },
      progress: {
        ...prevColumns.progress,
        tasks: filtered
      },
      done: {
        ...prevColumns.done,
        tasks: filtered
      }
    }));
  }, [tasks, selectedDate]);
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="main-container">
      {selectedUser ? (
        <>
        <Paper>
          <Header onSearch={handleSearch} />
        </Paper>
        <Grid container className="content-container" spacing={2}>
            <DndComponent columns={columns} randomUser={selectedUser} />
        </Grid>
        </> ): (<LoginFlow onLogin={handleLogin} />)}
      </div>
    </DragDropContext>
  );
}

export default MainPage;

function setTasks(updatedTasks: Column | { tasks: Task[]; id: string; title: string; }) {
  throw new Error('Function not implemented.');
}

