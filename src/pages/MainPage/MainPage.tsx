import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import Card from '../../components/Card/card';
import { useContext, useState } from 'react';
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

function selectRandomUser() {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

function MainPage() {
  const [randomUser] = useState(() => selectRandomUser());
  const { tasks } = useContext(AppContext);

  return (
    <div className="main-container">
      <Paper>
        <Header />
      </Paper>
      <Grid container className="content-container" spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper>
            <p className='content-title backlog'>Backlog</p>
            <Grid container flexDirection="column" className="task-container">
              {tasks && tasks.length > 0 && (
                <>
                  {tasks.map((task, index) => (
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
