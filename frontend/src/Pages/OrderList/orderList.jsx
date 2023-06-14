import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { getOrderList } from '../../API/reportAPI';
import { useEffect } from 'react';
import CartOrderList from '../../Components/Cart/cartOrderList';

export default function OrderList() {
    const [orderList, setOrderList] = useState([])
    const getList = async () => {
        try {
            const result = await getOrderList()
            setOrderList(result.data?.data)
        } catch (error) {

        }
    }

    const [open, setOpen] = React.useState(false);
    const [sales, setSales] = useState([])
    const handleClickOpen = (data) => {
        setSales(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getList()
    }, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice Id</TableCell>
                            <TableCell align="right">Payment Type</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((value) => (
                            <TableRow
                                key={value.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {value.id}
                                </TableCell>
                                <TableCell align="right">{value.paymentType}</TableCell>
                                <TableCell align="right">Rp {value.total.toLocaleString()}</TableCell>
                                <TableCell align="right">{value.createdAt.split('T')[0]}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={() => handleClickOpen(value)}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "500px",  // Set your width here
                    },
                },
            }}>
                <DialogTitle>Order Summary</DialogTitle>
                <DialogContent>
                    <CartOrderList data={sales} func={setSales} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
