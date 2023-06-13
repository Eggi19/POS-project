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
import { deleteProduct, getAllProducts, getAllProductsWithCategory } from '../../API/productAPI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../../Components/FilterBar/FilterBar';
import PaginationControlled from '../../Components/Pagination/Pagination';

export default function EditProduct() {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const [category, setCategoryValue] = useState(0)
    const [search, setSearchValue] = useState("")
    const [sort, setSortValue] = useState(null)
    const [nameSort, setNameSort] = useState(0)
    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)
    const [currentDataProduct, setCurrentDataProduct] = useState([])
    const [open, setOpen] = React.useState(false);
    const [dataProducts, setDataProducts] = useState([])
    const pageLimit = 10

    // CHECK ROLE
    if (role !== 'admin') { navigate('/products') }

    const handleClickOpen = (data) => {
        setCurrentDataProduct(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getDataProducts = async () => {
        try {
            // const result = await getAllProductsWithCategory()
            const result = await getAllProducts(page, category, search, sort, nameSort, pageLimit)
            console.log('result', result.data)
            setDataProducts(result?.data)
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
    const setPagination = (event, value) => {
        setPage(value)
        // console.log('page1', value)
    }
    const setSort = (data, nameSort) => {
        setSortValue(data)
        setNameSort(nameSort)
    }
    const setCategory = (data) => {
        if (typeof (data) === "number") {
            setCategoryValue(data)
            console.log(typeof (data))
        }
    }
    const setSearch = (data) => {
        setSearchValue(data)
        console.log(data)
    }

    useEffect(() => {
        getDataProducts()
    }, [page, category, search, sort, nameSort])
    return (
        <>
            <FilterBar setCategory={setCategory} setSearch={setSearch} setSort={setSort} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Stock</TableCell>
                            <TableCell align="left">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataProducts?.data?.map((value) => (
                            <TableRow
                                key={value.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img className='w-24' src={value.imageURL} alt="" />
                                </TableCell>
                                <TableCell align="left">{value.name}</TableCell>
                                <TableCell align="left">{value.Category?.name}</TableCell>
                                {/* <TableCell align="left">{value.category}</TableCell> */}
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
            <div className="p-5">
                {console.log(dataProducts.page, 'page prod')}
                <PaginationControlled totalPage={dataProducts?.page} handlePagination={setPagination} />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <EditComponent data={currentDataProduct} getData={getDataProducts} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
