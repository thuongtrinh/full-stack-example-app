import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateNewFolderOutlined } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addNewFolder } from '../utils/folderUtils';
import { useAuth } from '../contexts/AuthContext';

export default function NewFolder() {
  const { user } = useAuth();
  const [newFolderName, setNewFolderName] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const popupName = searchParams.get('popup');

  const handleOpenPopup = () => {
    setSearchParams({ popup: 'add-folder' });
  };

  const handleClose = () => {
    setNewFolderName('');
    navigate(-1);
  };

  const handleNewFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName || '', authorId: user?.uid || '' });
    console.log({ addFolder });
    handleClose();
  };

  useEffect(() => {
    console.log({popupName})
    if (popupName === 'add-folder') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName])

  return (
    <div>
      <Tooltip title='Add Folder' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <CreateNewFolderOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
