import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getAllCategory } from '../../API/categoryAPI';
import { useEffect } from 'react';


export default function FilterBar(props) {
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const openCat = Boolean(anchorElCat);
    const [prodCategories, setProdCategories] = React.useState("")
    const handleClickCat = (event) => {
        setAnchorElCat(event.currentTarget);
    };
    const handleCloseCat = (data) => {
        setAnchorElCat(null);
        // console.log(data)
        props.setCategory(data)
    };

    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);
    const handleClickSort = (event) => {
        setAnchorElSort(event.currentTarget);
    };
    const handleCloseSort = (data, nameSort) => {
        setAnchorElSort(null);
        props.setSort(data, nameSort)
    };

    const getCategoryList = async () => {
        const result = await getAllCategory()
        setProdCategories(result)
        console.log("category", result.data?.data)

    }
    useEffect(() => {
        getCategoryList()
        console.log("prdocat",prodCategories)
    }, [])
    return (
        <>
            <div className='md:flex relative px-3 place-items-center gap-5 justify-end bg-gray-200'>
                <div className='flex gap-5 py-3'>
                    <div>
                        <Button
                            id="category-button"
                            aria-controls={openCat ? 'category-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openCat ? 'true' : undefined}
                            onClick={handleClickCat}
                            variant='contained'
                            endIcon={<KeyboardArrowDownIcon />}
                            className='h-12'
                        >
                            CATEGORY
                        </Button>
                        <Menu
                            className='text-xs'
                            id="category-menu"
                            anchorEl={anchorElCat}
                            open={openCat}
                            onClose={handleCloseCat}
                            MenuListProps={{
                                'aria-labelledby': 'category-button',
                            }}
                        >

                            <MenuItem onClick={() => handleCloseCat(0)}>none</MenuItem>                       
                            {
                                prodCategories.data?.data?.map((value, index) => (
                                    <MenuItem key={index} onClick={() => handleCloseCat(value.id)}>{value.name}</MenuItem>
                                ))
                            }
                        </Menu>
                    </div>
                    <div>
                        <Button
                            id="sort-button"
                            aria-controls={openSort ? 'sort-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openSort ? 'true' : undefined}
                            onClick={handleClickSort}
                            variant='contained'
                            endIcon={<KeyboardArrowDownIcon />}
                            className='h-12'
                        >
                            SORT BY
                        </Button>
                        <Menu
                            id="sort-menu"
                            anchorEl={anchorElSort}
                            open={openSort}
                            onClose={handleCloseSort}
                            MenuListProps={{
                                'aria-labelledby': 'sort-button',
                            }}
                        >

                            <MenuItem onClick={() => handleCloseSort(null, 0)}>none</MenuItem>
                            <MenuItem onClick={() => handleCloseSort("ASC", 1)}>name a to z </MenuItem>
                            <MenuItem onClick={() => handleCloseSort("DESC", 1)}>name z to a</MenuItem>
                            <MenuItem onClick={() => handleCloseSort("ASC", 2)}>price low to high</MenuItem>
                            <MenuItem onClick={() => handleCloseSort("DESC", 2)}>price high to low</MenuItem>

                        </Menu>
                    </div>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        className=' bg-white'

                        onChange={(event) => {
                            props.setSearch(event.target.value);
                        }} />
                </div>
            </div >
        </>
    )
}
