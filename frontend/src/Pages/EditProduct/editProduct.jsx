import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { getAllProductsWithCategory } from '../../API/productAPI';
import { useEffect } from 'react';

export default function EditProduct() {
    const [dataProducts, setDataProducts] = useState([])

    const getDataProducts = async () => {
        try {
            const result = await getAllProductsWithCategory()
            setDataProducts(result.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataProducts()
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataProducts.map((value) => (
                        <TableRow
                            key={value.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {console.log(value)}
                            <TableCell component="th" scope="row">
                                <img className='w-24' src={value.imageURL} alt="" />
                            </TableCell>
                            <TableCell align="left">{value.name}</TableCell>
                            <TableCell align="left">{value.Category?.name}</TableCell>
                            <TableCell align="left">{value.price}</TableCell>
                            {
                                value.status?
                                <TableCell align="left">Available</TableCell>
                                :
                                <TableCell align="left">Unavailable</TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
