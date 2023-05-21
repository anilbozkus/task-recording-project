import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string;
}

interface LoginFlowProps {
  onLogin: (user: User) => void;
}

function LoginFlow({ onLogin }: LoginFlowProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const users = [
    {
      id: 0,
      name: "Bill Gates",
      email: "bill@microsoft.com",
      password: "bill123",
      bio: "Chairman of Microsoft",
    },
    {
      id: 1,
      name: "Elon Musk",
      email: "elon@tesla.com",
      password: "elon456",
      bio: "CTO at Tesla",
    },
    {
      id: 2,
      name: "Jeff Bezos",
      email: "jeff@amazon.com",
      password: "jeff789",
      bio: "CEO at Amazon",
    },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform credential validation
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" textAlign="left" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        {error && (
          <Typography variant="body1" color="error" style={{ marginBottom: '1rem' }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginFlow;
