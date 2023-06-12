import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Cart(props) {
    const [totalTransaction, setTotalTransaction] = useState(0)
    const totalPrice = () => {
        try {
            let result = 0
            props.data.map((value) => {
                result += value.price * value.qty
            })
            setTotalTransaction(result)
        } catch (error) {
            
        }
    }

    return (
        <>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {props.data.map((value) => (
                        <ListItem key={value.name} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={value.name} secondary={`Rp ${value.price.toLocaleString()} x ${value.qty}`} />
                            <Typography variant="body2">Rp {(value.price*value.qty).toLocaleString()}</Typography>
                        </ListItem>
                    ))}

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Rp {totalTransaction}
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Payment details
                        </Typography>
                        <Grid container>
                            {payments.map((payment) => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    )
}
