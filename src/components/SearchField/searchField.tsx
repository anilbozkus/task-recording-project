import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField: React.FC<{ onSearch: (searchQuery: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  
    if (searchQuery.length === 0) {
      onSearch('');
    } else {
      onSearch(searchQuery); 
    }
  };

  const handleBlur = () => {
    onSearch('');
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search Task"
      value={searchQuery}
      onBlur={handleBlur}
      onChange={handleSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onSearch(searchQuery)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;