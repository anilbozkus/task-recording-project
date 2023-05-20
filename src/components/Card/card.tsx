import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import './card.scss'

interface User {
    id: number;
    name: string;
    bio: string;
}

interface Task {
    task_type: string;
    content: string;
    date: Date | null;
    column: string;
}

interface UserCardProps {
    user: User;
    task: Task;
}

const TaskCard: React.FC<UserCardProps> = ({ user, task }) => {
    return (
        <Card className='card-container'>
            <CardContent>
                <div className="card-header">
                    <Avatar sx={{ width: 36, height: 36 }} />
                    <div className="user-details">
                        <p className='user-title'>
                            {user.name}
                        </p>
                        <p className='user-bio'>
                            {user.bio}
                        </p>
                    </div>
                </div>
                <p className='task-content'>
                    {task?.content}
                </p>
                {task?.task_type && 
                <Grid container className='tasktype-container'>
                    {task?.task_type === "Bug" &&
                    <p className='task-type'>
                        <Box sx={{
                            width: 14,
                            height: 14,
                            backgroundColor: '#F32E2E',
                            marginRight: '8px',
                            borderRadius: '4px'
                        }}
                        /> Bug</p>
                    }
                    {task?.task_type === "Feature" &&
                    <p className='task-type'>
                        <Box sx={{
                            width: 14,
                            height: 14,
                            backgroundColor: '#56B969',
                            marginRight: '8px',
                            borderRadius: '4px'
                        }}
                        /> Feature</p>
                    }
                    {task?.task_type === "Refactor" &&
                    <p className='task-type'>
                        <Box sx={{
                            width: 14,
                            height: 14,
                            backgroundColor: '#E034CF',
                            marginRight: '8px',
                            borderRadius: '4px'
                        }}
                        /> Refactor</p>
                    }
                </Grid>
                }
            </CardContent>
        </Card>
    );
};

export default TaskCard;