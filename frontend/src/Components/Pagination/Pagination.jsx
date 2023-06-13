import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled(props) {
    // const [page, setPage] = React.useState(1);
    // const handleChange = (event, value) => {
    //     console.log(value)
    //     setPage(value);
    //     props.page(value)
    // };
    

    return (
        <>
            <div className='flex justify-center'>
                <div>
                    <Stack spacing={1}>
                        {console.log('totalpage', props?.totalpage)}
                        <Pagination count={props.totalPage} variant='outlined' color='primary' onChange={props.handlePagination} />
                    </Stack>
                </div>
            </div>
        </>
    );
}