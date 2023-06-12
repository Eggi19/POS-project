import * as React from 'react';
import { useEffect, useState, createContext } from "react"
import { getAllProducts } from "../../API/productAPI"
import FilterBar from "../../Components/FilterBar/FilterBar"
import ProductCard from "../../Components/ProductCard/ProductCard"
import PaginationControlled from "../../Components/Pagination/Pagination"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../../Components/Cart/cart';

export default function ProductList() {
    const [sales, setSales] = useState([])

    //Dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //transaction
    const onTransaction = (data) => {
        try {
            let validation = false
            let idx

            if (sales.length !== 0) {
                sales.map((value, index) => {
                    if (value.id === data.id) {
                        validation = true
                        idx = index
                    }
                })

                if (!validation) {
                    const newData = [...sales]
                    console.log(newData);
                    newData.push(data)
                    setSales(newData)
                } else if(validation){
                    const newData = [...sales]
                    const curQty = newData[idx].qty
                    newData[idx].qty = curQty + 1
                    setSales(newData)
                }
            } else if (sales.length === 0) {
                const newData = []
                newData.push(data)
                setSales(newData)
            }
        } catch (error) {

        }
    }

    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)
    const [category, setCategoryValue] = useState(0)
    const [search, setSearchValue] = useState("")
    const [sort, setSortValue] = useState(null)
    const [nameSort, setNameSort] = useState(0)


    const data = async () => {
        try {
            console.log('page', page)
            const response = await getAllProducts(page, category, search, sort, nameSort)
            // const catResponse = await getAllCategory()
            console.log("Respnse", response)
            setProducts(response)
            // setProdCategories(catResponse)
            // console.log(response?.data?.data?.page);
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
        data()

    }, [page, category, search, sort, nameSort])

    return (
        <>
            <div className=" relative h-full justify-items-center ">
                <FilterBar setCategory={setCategory} setSearch={setSearch} setSort={setSort} />
                <div className='absolute top-3.5 left-2'>
                    <Fab size="small" color="secondary" aria-label="edit" onClick={() => handleClickOpen()} >
                        <ShoppingCartIcon />
                    </Fab>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 landscape:md:grid-cols-5 p-2 justify-items-center">
                    {products?.data?.data?.map((value, index) => {
                        return (
                            <div className="p-3" key={`p${index}`}>
                                <ProductCard data={value} func={onTransaction} />
                            </div>
                        )
                    })}
                </div>
                <div className="p-5">
                    <PaginationControlled totalPage={products?.data?.page} handlePagination={setPagination} />
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Order Summary</DialogTitle>
                <DialogContent>
                    <Cart data={sales} func={setSales}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
