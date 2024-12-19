/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-07-18 10:00:23
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-09-15 00:56:35
 * @FilePath: /project1/src/header.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// /*
//  * @Author: Deng nelsondeng0701@gmail.com
//  * @Date: 2024-07-18 10:00:23
//  * @LastEditors: Deng nelsondeng0701@gmail.com
//  * @LastEditTime: 2024-09-08 23:43:18
//  * @FilePath: /project1/src/header.js
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */

import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Search, SearchIconWrapper, StyledInputBase } from './headerStyles';

export default function SearchAppBar({ onSignOut, handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); 
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="sign out"
            onClick={onSignOut}
          >
            <ExitToAppIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange} 
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



