import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { NumericFormat } from 'react-number-format';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useState } from 'react';
import { getAllCategory } from '../../../API/categoryAPI';
import { useEffect } from 'react';
import { editProduct } from '../../../API/productAPI';
import toast, { Toaster } from 'react-hot-toast';

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

export default function EditComponent(props) {
    const [productCategories, setProductCategories] = useState([])

    const productName = useRef()
    const [categoryId, setCategoryId] = useState('')
    const imageURL = useRef()
    const price = useRef()
    const [status, setStatus] = useState('')

    const handleSubmit = (data) => {
        setCategoryId(Number(data))
    }

    const onEditProduct = async () => {
        try {
            let _price = Number(price.current.value.split(' ')[1].replace(',', ''))
            const response = await editProduct({
                name: productName.current.value,
                categoryId: categoryId,
                imageURL: imageURL.current.value,
                price: _price,
                status: status,
                id: props.data.id
            })

            if (response.data.success) {
                toast.success('Successfully Edit!')
                props.getData()
            } else {
                throw {message: 'Edit Product is failed!'}
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCategories = async () => {
        try {
            const getData = await getAllCategory()
            setProductCategories(getData.data.data)
        } catch (error) {

        }
    }

    const currentCategoryId = () => {
        try {
            const currCategoryId = props.data?.Category?.id
            setCategoryId(currCategoryId)
        } catch (error) {
            
        }
    }

    const currentStatus = () => {
        try {
            const currStatus = props.data?.status
            setStatus(currStatus)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCategories()
        currentCategoryId()
        currentStatus()
    }, [])
    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
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
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Product
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
                                    defaultValue={props.data?.name}
                                    inputRef={productName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="Category"
                                    select
                                    name="Category"
                                    label="Category"
                                    defaultValue={props.data?.Category?.name}
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
                                    defaultValue={props.data?.imageURL}
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
                                    defaultValue={props.data.price}
                                    inputRef={price}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="Stock Status"
                                    select
                                    name="Stock Status"
                                    label="Stock Status"
                                    defaultValue={props.data?.status? "Available" : "Unavailable"}
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
                    onClick={onEditProduct}
                >
                    Save Changes
                </Button>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
