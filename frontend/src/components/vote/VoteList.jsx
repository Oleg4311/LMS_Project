import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useTheme} from '@mui/material/styles';
import {useEffect} from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Chip from '@mui/material/Chip';

function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

function VoteList() {

    const profile = useSelector((store) => store.profile);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [votes, setVotes] = React.useState([]);


    useEffect(() => {
        fetch('/api/votes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setVotes(data);
            })
    }, []);


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - votes.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const navigate = useNavigate();

    const handleDelete = (id) => {
        fetch(`/api/votes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => {
                setVotes(data => data.filter(vote => vote.id !== id));
            })
    }


    return (
        <div>
            {profile.userRole === "teacher" &&
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button sx={{marginBottom: "20px"}} onClick={() => navigate("/votes/create")} variant="contained"
                            startIcon={<AddIcon/>}>
                        Добавить
                    </Button>
                </div>
            }
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                                ? votes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : votes
                        ).map((vote) => (
                            <TableRow key={vote.id}>
                                <TableCell style={{cursor: "pointer"}} component="th" scope="row"
                                           onClick={() => navigate(`/votes/${vote.id}`)}>
                                    {vote.name}
                                    {vote?.Answers?.filter(el => `${el.user_id}` === `${profile.userId}`)?.length < 1 && profile.userRole === "student" &&
                                        <Chip sx={{marginLeft: 2}} label="NEW" color="success"/>}
                                </TableCell>
                                {profile.userRole === "teacher" &&
                                    <>
                                        <TableCell style={{width: 160}} align="right">
                                            {vote?.Group?.name}
                                        </TableCell>
                                        <TableCell style={{width: 160}} align="right">
                                            <Button variant="contained"
                                                    onClick={() => handleDelete(vote.id)}>Удалить</Button>
                                        </TableCell>
                                    </>
                                }
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={votes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default VoteList;
