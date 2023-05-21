import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import { Key, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';
import { DragDropContext } from 'react-beautiful-dnd';
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

  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd = (result: { source: any; destination: any }) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(filteredTasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      updatedTasks.splice(destination.index, 0, movedTask);
    } else {
      movedTask.column = destination.droppableId;
      updatedTasks.splice(destination.index, 0, movedTask);
    }

    setFilteredTasks(updatedTasks);
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
