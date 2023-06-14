import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import { postInvoice, postSale } from '../../API/transactionAPI';

export default function CartOrderList(props) {
    const [totalTransaction, setTotalTransaction] = useState(0)
    const [paymentType, setPaymentType] = useState('')
    const [transactionData, setTransactionData] = useState(props.data.Sales)

    const totalPrice = () => {
        try {
            let result = 0
            transactionData.map((value) => {
                result += value.product?.price * value.quantity
            })
            setTotalTransaction(result)
        } catch (error) {

        }
    }

    const createTransaction = async () => {
        try {
            const userId = Number(localStorage.getItem('id'))
            const invoiceData = {
                userId: userId,
                total: totalTransaction,
                paymentType: paymentType
            }
            const invoiceResult = await postInvoice(invoiceData)

            if (invoiceResult.data?.success) {
                const getInvoiceId = invoiceResult.data?.data?.id
                const saleData = transactionData.map(({ id, qty, price }) => ({
                    invoiceId: getInvoiceId,
                    productId: id,
                    quantity: qty,
                    subTotal: qty * price
                }))
                var saleResult = await postSale(saleData)
            }

            if (invoiceResult.data?.success && saleResult.data?.success) {
                toast.success('Transaction Success!')
                setTransactionData([])
                setTotalTransaction(0)
                props.func([])
            } else {
                throw { message: "Transaction Failed!" }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const resetTransaction = () => {
        toast.success('Reset Cart Success!')
        setTransactionData([])
        setTotalTransaction(0)
        props.func([])
    }

    useEffect(() => {
        totalPrice()
        console.log(props.data);
    }, [totalTransaction])
    return (
        <>
            <React.Fragment>
                <List disablePadding>
                    {transactionData.map((value) => (
                        <ListItem key={value.id} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={value.product?.name} secondary={`Rp ${value.product?.price.toLocaleString()} x ${value.quantity}`} />
                            <Typography variant="body2">Rp {(value.product?.price * value.quantity).toLocaleString()}</Typography>
                        </ListItem>
                    ))}

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Rp {totalTransaction.toLocaleString()}
                        </Typography>
                    </ListItem>
                </List>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Payment details
                </Typography>
                <Grid container spacing={8}>
                    <Grid item xs={6} fullWidth>
                        Payment Type:
                    </Grid>
                    <Grid item xs={6} fullWidth>
                        {props.data?.paymentType.toUpperCase()}
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    )
}
