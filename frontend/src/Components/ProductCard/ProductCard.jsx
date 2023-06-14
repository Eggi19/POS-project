import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { ResponsiveContainer } from 'recharts';

export default function ProductCard(props) {
    // console.log(props)

    return (
        <>
            {/* <Card sx={{ minWidth: 200 }}>
                <CardMedia

                    sx={{  width: 150 }}
                    image={props.data.imageURL}
                    title={props.data?.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                        {props.data?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Rp. ${props.data?.price.toLocaleString()}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() =>
                        props.func({ id: props.data?.id, name: props.data?.name, price: props.data?.price, qty: 1 })}
                        aria-label="delete" size="small">Learn More
                    </Button>
                </CardActions>
            </Card> */}
            <ResponsiveContainer>
                <Card>

                    <div className="relative  w-32 h-60 md:w-36 md:h-60 p-2 ">
                        <img src={props.data?.imageURL} alt={"not found"} />
                        <div className="pt-2"> {props.data?.name}</div>
                        <div className="pt-2 absolute bottom-2"> {`Rp. ${props.data?.price.toLocaleString()}`}</div>
                        <div className='absolute bottom-1 right-1'>
                            <IconButton onClick={() => props.func({ id: props.data?.id, name: props.data?.name, price: props.data?.price, qty: 1 })} aria-label="delete" size="small">
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </ResponsiveContainer>
        </>
    )
}
