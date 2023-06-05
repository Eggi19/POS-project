import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={1}>
      <Typography>Page: {page}</Typography>
      <Pagination count={3} page={page} variant='outlined' color='primary' onChange={handleChange} />
    </Stack>
  );
}