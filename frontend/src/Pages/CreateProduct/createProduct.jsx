import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { NumericFormat } from 'react-number-format';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useState } from 'react';
import { getAllCategory } from '../../API/categoryAPI';
import { useEffect } from 'react';
import { createProduct } from '../../API/productAPI';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="Rp "
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function CreateProduct() {
    const [productCategories, setProductCategories] = useState([])

    const productName = useRef()
    const [categoryId, setCategoryId] = useState('')
    const imageURL = useRef()
    const price = useRef()
    const [status, setStatus] = useState('')

    const handleSubmit = (data) => {
        setCategoryId(String(data))
    }

    const onCreateProduct = async () => {
        try {
            let _price = Number(price.current.value.split(' ')[1].replace(',', ''))
            const response = await createProduct({
                name: productName.current.value,
                categoryId: categoryId,
                imageURL: imageURL.current.value,
                price: _price,
                status: status
            })
            console.log(response);
        } catch (error) {

        }
    }

    const getCategories = async () => {
        try {
            const getData = await getAllCategory()
            setProductCategories(getData.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create New Product
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="product name"
                                    label="Product Name"
                                    name="product name"
                                    autoComplete="product name"
                                    inputRef={productName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="Category"
                                    select
                                    name="Category"
                                    label="Category"
                                    defaultValue=""
                                    helperText="Please select product category"
                                >
                                    {productCategories.map((value) => (
                                        <MenuItem key={value.id} value={value.name} onClick={() => handleSubmit(value.id)}>
                                            {value.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image URL"
                                    label="Image URL"
                                    id="image"
                                    type='url'
                                    inputRef={imageURL}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Price"
                                    name="numberformat"
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }}
                                    inputRef={price}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="Stock Status"
                                    select
                                    name="Stock Status"
                                    label="Stock Status"
                                    helperText="Please select product status"
                                >
                                    <MenuItem value='Available' onClick={() => setStatus(true)}>
                                        Available
                                    </MenuItem>
                                    <MenuItem value='Unavailable' onClick={() => setStatus(false)}>
                                        Unavailable
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onCreateProduct}
                >
                    Create Product
                </Button>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
