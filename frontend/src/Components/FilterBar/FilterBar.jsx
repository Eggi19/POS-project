import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function FilterBar() {
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const openCat = Boolean(anchorElCat);
    const handleClickCat = (event) => {
        setAnchorElCat(event.currentTarget);
    };
    const handleCloseCat = () => {
        setAnchorElCat(null);
    };

    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);
    const handleClick1 = (event) => {
        setAnchorElSort(event.currentTarget);
    };
    const handleCloseSort = () => {
        setAnchorElSort(null);
    };
    return (
        <>
            <div className='flex px-3 py-1  bg-gray-200'>

                <div className='text-xs'>
                    <Button
                        id="category-button"
                        aria-controls={openCat ? 'category-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openCat ? 'true' : undefined}
                        onClick={handleClickCat}
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
                        <MenuItem onClick={handleCloseCat}>FOOD</MenuItem>
                        <MenuItem onClick={handleCloseCat}>DRINK</MenuItem>
                        <MenuItem onClick={handleCloseCat}>SIDE DISH</MenuItem>
                    </Menu>
                </div>

                <div>
                    <Button
                        id="sort-button"
                        aria-controls={openSort ? 'sort-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSort ? 'true' : undefined}
                        onClick={handleClick1}
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
                        <MenuItem onClick={handleCloseSort}>{"NAME A TO Z"} </MenuItem>
                        <MenuItem onClick={handleCloseSort}>{"NAME Z TO A"}</MenuItem>
                    </Menu>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>

            </div >
        </>
    )
}