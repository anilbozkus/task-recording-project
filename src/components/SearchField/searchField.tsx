import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField: React.FC = () => {
  const handleSearch = () => {
    // Perform search logic here
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search Task"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;