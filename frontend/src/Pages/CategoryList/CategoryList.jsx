import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { addCategory, getAllCategory, modifyCategory } from '../../API/categoryAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

export default function BasicTable() {
  const [editStatus, setEditStatus] = useState([])
  const [open, setOpen] = React.useState(false);
  const _addCategory = useRef()

  const _name = useRef()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (add, name) => {
    if (add) {
      await addCategory(name)
    }
    setOpen(false);
    addCategoryStatus()
  };


  const addCategoryStatus = async () => {
    const result = await getAllCategory()

    result.data.data.map((value) => {
      return value['status'] = false
    })

    setEditStatus(result.data.data)
  }

  const onChangeStatus = async (id, categoryId, name) => {
    const newCategory = [...editStatus]
    const currentCategoryIndex = newCategory.findIndex((value) => value.id === id) + 1
    if (!newCategory[currentCategoryIndex].status) {
      const currentValue = { ...newCategory[currentCategoryIndex], status: true }
      newCategory.splice(currentCategoryIndex, 1, currentValue)

      setEditStatus(newCategory)
    } else if (newCategory[currentCategoryIndex].status) {
      const currentValue = { ...newCategory[currentCategoryIndex], status: false }
      newCategory.splice(currentCategoryIndex, 1, currentValue)

      await modifyCategory({
        categoryId,
        name
      })

      setEditStatus(newCategory)
      addCategoryStatus()
    }

  }

  useEffect(() => {
    addCategoryStatus()
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categories</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editStatus.map((value, index) => (
              <TableRow
                key={value.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {
                  value.status ?
                    <>
                      <TableCell component="th" scope="row">
                        <TextField
                          required
                          id="outlined-required"
                          label="Required"
                          defaultValue={value.name}
                          inputRef={_name}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Button onClick={() => { onChangeStatus(index, value.id, _name.current.value) }} color="success" size="small" variant="contained" startIcon={<CheckCircleOutlineIcon />}>
                            Save
                          </Button>
                        </Stack>
                      </TableCell>
                    </>
                    :
                    <>
                      <TableCell component="th" scope="row">
                        {value.name}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Button onClick={() => onChangeStatus(index)} size="small" variant="contained" startIcon={<EditSharpIcon />}>
                            Edit
                          </Button>
                        </Stack>
                      </TableCell>
                    </>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <div className='flex justify-end m-3'>
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add your new category
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category's Name"
              type="email"
              fullWidth
              variant="standard"
              inputRef={_addCategory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={() => handleClose(true, _addCategory.current.value)}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
