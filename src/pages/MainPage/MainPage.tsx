import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import Card from '../../components/Card/card';
import { Key, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const users = [
  {
    id: 0,
    name: "Bill Gates",
    bio: "Chairman of Microsoft",
  },
  {
    id: 1,
    name: "Elon Musk",
    bio: "CTO at Tesla",
  },
  {
    id: 2,
    name: "Jeff Bezos",
    bio: "CEO at Amazon",
  },
];

interface Task {
  id: Key | null | undefined;
  task_type: string;
  content: string;
  date: Date | null;
  column: string;
}

function selectRandomUser() {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

function MainPage() {
  const [randomUser] = useState(() => selectRandomUser());
  const { tasks, selectedDate } = useContext(AppContext);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragEnd = (result: { source: any; destination: any; }) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const columnTasks = filteredTasks.filter(
        (task) => task.column === source.droppableId
      );
      const reorderedTasks = Array.from(columnTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.column === source.droppableId ? reorderedTasks.shift() || task : task
        )
      );
    } else {
      const updatedTasks = Array.from(filteredTasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);

      movedTask.column = destination.droppableId;
      updatedTasks.splice(destination.index, 0, movedTask);

      setFilteredTasks(updatedTasks);
    }
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
    } else {
      const filtered = tasks.filter((task) =>
        task.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const taskDateStr = task?.date?.toISOString().slice(0, -5);
      const selectedDateStr = selectedDate?.toISOString().slice(0, -5);
      return taskDateStr === selectedDateStr;
    });
    setFilteredTasks(filtered);
  }, [tasks, selectedDate]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="main-container">
        <Paper>
          <Header onSearch={handleSearch} />
        </Paper>
        <Grid container className="content-container" spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper>
              <p className='content-title backlog'>Backlog</p>
              <Grid container flexDirection="column" className="task-container">
                {filteredTasks && filteredTasks.length > 0 ? (
                  <Droppable droppableId="backlog">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredTasks
                          .filter((task) => task.column === 'backlog')
                          .map((task, index) => (
                            task && task.id && (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card user={randomUser} task={task} />
                                  </div>
                                )}
                              </Draggable>
                            )
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <p>No tasks found.</p>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <p className='content-title in-progress'>In Progress</p>
              <Grid container flexDirection="column" className="task-container">
                {filteredTasks && filteredTasks.length > 0 ? (
                  <Droppable droppableId="in-progress">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredTasks
                          .filter((task) => task.column === 'in-progress')
                          .map((task, index) => (
                            task && task.id && (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card user={randomUser} task={task} />
                                  </div>
                                )}
                              </Draggable>
                            )
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <p>No tasks found.</p>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Grid container flexDirection="column" className="task-container">
                <p className='content-title done'>Done</p>
                {filteredTasks && filteredTasks.length > 0 ? (
                  <Droppable droppableId="done">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredTasks
                          .filter((task) => task.column === 'done')
                          .map((task, index) => (
                            task && task.id && (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card user={randomUser} task={task} />
                                  </div>
                                )}
                              </Draggable>
                            )
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <p>No tasks found.</p>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </DragDropContext>
  );
}

export default MainPage;
