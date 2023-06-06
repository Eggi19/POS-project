import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FilterBar(props) {
    const [category, setCategory] = React.useState(null)
    const [search, setSearch] = React.useState(null)
    const [sort, setSort] = React.useState(null)
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const openCat = Boolean(anchorElCat);
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
    const handleCloseSort = () => {
        setAnchorElSort(null);
    };
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
                            <MenuItem onClick={() => handleCloseCat(null)}>NONE</MenuItem>
                            <MenuItem onClick={() => handleCloseCat(1)}>FOOD</MenuItem>
                            <MenuItem onClick={() => handleCloseCat(2)}>DRINK</MenuItem>
                            <MenuItem onClick={() => handleCloseCat(3)}>SIDE DISH</MenuItem>
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
                            <MenuItem onClick={() => handleCloseSort(null)}>NONE</MenuItem>
                            <MenuItem onClick={() => handleCloseSort("ASC")}>NAME A TO Z </MenuItem>
                            <MenuItem onClick={() => handleCloseSort("DESC")}>NAME Z TO A</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Search" variant="outlined" className=' bg-white' />
                </div>
            </div >
        </>
    )
}
