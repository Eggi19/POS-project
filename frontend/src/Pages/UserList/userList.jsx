import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { getUser } from '../../API/user';
import { useEffect } from 'react';

export default function UserList() {
    const [dataUser, setDataUser] = useState([])

    const getUserData = async () => {
        try {
            const result = await getUser()

            setDataUser(result.data?.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getUserData()
    },[])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataUser.map((value) => (
                        <TableRow
                            key={value.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="value">
                                {value.userName}
                            </TableCell>
                            <TableCell align="right">{value.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
