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

export default function Cart(props) {
    const [totalTransaction, setTotalTransaction] = useState(0)
    const [paymentType, setPaymentType] = useState('')
    const [transactionData, setTransactionData] = useState(props.data)

    const totalPrice = () => {
        try {
            let result = 0
            transactionData.map((value) => {
                result += value.price * value.qty
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
    }, [totalTransaction])
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                transactionData.length > 0 ?
                    <React.Fragment>
                        <List disablePadding>
                            {transactionData.map((value) => (
                                <ListItem key={value.name} sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={value.name} secondary={`Rp ${value.price.toLocaleString()} x ${value.qty}`} />
                                    <Typography variant="body2">Rp {(value.price * value.qty).toLocaleString()}</Typography>
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
                            <Grid item xs={6}>
                                Payment Type:
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="Payment Type"
                                    select
                                    name="Payment Type"
                                    label="Payment Type"
                                    helperText="Please select payment type"
                                >
                                    <MenuItem value='Debit' onClick={() => setPaymentType('debit')}>
                                        Debit
                                    </MenuItem>
                                    <MenuItem value='Credit' onClick={() => setPaymentType('credit')}>
                                        Credit
                                    </MenuItem>
                                    <MenuItem value='Cash' onClick={() => setPaymentType('cash')}>
                                        Cash
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} fullWidth>
                                <Button variant="contained" onClick={resetTransaction}>Reset Cart</Button>
                            </Grid>
                            <Grid item xs={6} fullWidth>
                                <Button variant="contained" onClick={createTransaction}>Create Transaction</Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    :
                    <h1>CREATE NEW ORDER</h1>
            }
        </>
    )
}
