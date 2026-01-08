import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Box from '@mui/material/Box';

export default function UserMenu() {
  const { user, auth } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log({user})

  const handleLogout = () => {
    auth.signOut();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e:  React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box component="section"
        sx={{ display: 'flex', '&:hover': { cursor: 'pointer' } }}
        onClick={handleClick}
      >
        <Typography>{user?.displayName}</Typography>
        <Avatar
          alt='avatar'
          src={user?.photoURL || ''}
          sx={{ width: 24, height: 24, marginLeft: '5px' }}
        />
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
