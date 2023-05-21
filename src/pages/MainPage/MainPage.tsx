import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import Card from '../../components/Card/card';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(query, 'qe');

    if (query.length === 0) {
      console.log(query, 'q');
      const filtered = tasks.filter((task) => {
        const taskDateStr = task?.date?.toISOString().slice(0, -5);
        const selectedDateStr = selectedDate?.toISOString().slice(0, -5);
        return taskDateStr === selectedDateStr;
      });
      setFilteredTasks(filtered);
    }
    else{
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
    <div className="main-container">
      <Paper>
        <Header onSearch={handleSearch}/>
      </Paper>
      <Grid container className="content-container" spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper>
            <p className='content-title backlog'>Backlog</p>
            <Grid container flexDirection="column" className="task-container">
              {filteredTasks && filteredTasks.length > 0 && (
                <>
                  {filteredTasks.map((task, index) => (
                    <Card key={index} user={randomUser} task={task} />
                  ))}
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <p className='content-title in-progress'>In Progress</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <p className='content-title done'>Done</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
