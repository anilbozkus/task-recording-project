import './mainPage.scss';
import Paper from '../../components/Paper/paper';
import Header from '../../components/Header/header';
import Grid from '@mui/material/Grid';
import { AppContext } from '../../appContext';
import { useContext } from 'react';

function MainPage() {
  const { tasks } = useContext(AppContext);
  console.log(tasks, 'task');

  return (
      <div className="main-container">
        <Paper>
          <Header />
        </Paper>
        <Grid container className="content-container" spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper>
              <p className='content-title backlog'>Backlog</p>
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
