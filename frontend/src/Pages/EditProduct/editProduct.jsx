import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditComponent from './EditComponent/editComponent';
import { useState } from 'react';
import { deleteProduct, getAllProductsWithCategory } from '../../API/productAPI';
import { useEffect } from 'react';

export default function EditProduct() {
    const [currentDataProduct, setCurrentDataProduct] = useState([])
    //Dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (data) => {
        setCurrentDataProduct(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [dataProducts, setDataProducts] = useState([])

    const getDataProducts = async () => {
        try {
            const result = await getAllProductsWithCategory()
            setDataProducts(result.data.data)
        } catch (error) {

        }
    }

    const onDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId)
            getDataProducts()
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataProducts()
    }, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Stock</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataProducts.map((value) => (
                            <TableRow
                                key={value.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img className='w-24' src={value.imageURL} alt="" />
                                </TableCell>
                                <TableCell align="left">{value.name}</TableCell>
                                <TableCell align="left">{value.Category?.name}</TableCell>
                                <TableCell align="left">{value.price}</TableCell>
                                {
                                    value.status ?
                                        <TableCell align="left">Available</TableCell>
                                        :
                                        <TableCell align="left">Unavailable</TableCell>
                                }
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Fab size="small" color="secondary" aria-label="edit" onClick={() => handleClickOpen(value)} >
                                            <EditIcon />
                                        </Fab>
                                        <IconButton aria-label="delete" size="small" onClick={() => onDeleteProduct(value.id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <EditComponent data={currentDataProduct}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
