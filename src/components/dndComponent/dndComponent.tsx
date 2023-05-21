import React, { Key } from 'react';
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import Card from '../../components/Card/card';
import Grid from '@mui/material/Grid';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: Key | null | undefined;
  task_type: string;
  content: string;
  date: Date | null;
  column: string;
}

interface DndComponentProps {
  columns: { [key: string]: Column };
  randomUser: {
    id: number;
    name: string;
    bio: string;
  };
}

const DndComponent: React.FC<DndComponentProps> = ({ columns, randomUser }) => {
    const getColumnBackgroundColor = (columnId: string): string => {
        const columnTasks = columns[columnId]?.tasks;
        if (columnTasks && columnTasks.length > 0) {
          const columnTasksInSameColumn = columnTasks.filter((task) => task.column === columnId);
          if (columnTasksInSameColumn.length > 0) {

            if (columnId === 'backlog') {
              return 'rgba(172, 173, 249, 0.03)';
            } else if (columnId === 'progress') {
              return 'rgba(226, 110, 70, 0.04)';
            } else if (columnId === 'done') {
              return 'rgba(86, 185, 105, 0.05)';
            }
          }
        }
        return '';
      };
      

  return (
    <>
      {Object.values(columns).map((column) => (
        <Grid item xs={12} md={4} key={column.id}>
          <div
            className='paper'
            style={{ backgroundColor: getColumnBackgroundColor(column.id) }}
          >
            <p className={`content-title ${column.id}`}>{column.title}</p>
            <Grid container flexDirection='column' className='task-container'>
              {column.tasks && column.tasks.length > 0 && (
                <Droppable droppableId={column.id}>
                  {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {column.tasks
                        .filter((task) => task.column === column.id) // Filter tasks by column id
                        .map((task, index) => (
                          task &&
                          task.id && (
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
              )}
            </Grid>
          </div>
        </Grid>
      ))}
    </>
  );
};

export default DndComponent;
