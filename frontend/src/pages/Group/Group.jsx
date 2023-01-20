import * as React from 'react';
import { initGroupAC } from "../../store/group/actionsCreators";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { initUserInfoAC } from '../../store/userInfo/actionsCreators';
import { Typography } from '@mui/material';
import BackButtonWhite from '../../components/backButtonWhite/BackButtonWhite';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Group() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();
    
    const group = useSelector((store) => store.group);
    const users = useSelector((store) => store.userInfo);

    useEffect(() => {
        dispatch(initGroupAC(id));
        dispatch(initUserInfoAC(id));
    }, []);

    const nameGroup = group[0] !== undefined ? group[0].name : "testName";
 
  return (
    <TableContainer component={Paper}>
      <Table>
        <tbody>
          <TableRow style={{ minHeight: "100px", maxHeight: "100px"}}>
            <TableCell style={{ display: 'flex', position: 'relative', color: "white", backgroundColor: "#44014C", alignItems: 'center'}} align="center" colSpan={4}>
              <BackButtonWhite sx={{position: 'absolute', color: 'white'}}/>
              <div style={{display: "inline-block", textAlign: "center", width: "100%"}}>
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold',}}>{nameGroup}</Typography>
              </div>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
      <Table style={{tableLayout: 'fixed', width: '100%'}} sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        </TableHead>
        <TableBody>
          {users.map((item) =>
            {return (
            <StyledTableRow key={crypto.randomUUID()}>
                <StyledTableCell style={{ display: 'table-cell', justifyContent: 'center', alignItems: 'center', cursor: "pointer", width: "100%", minHeight: "50px"}} align="center" colSpan={5} component="th" scope="row" onClick={() => {navigate(`/userinfo/${item.user_id}`)}}>
                <Typography>{item.name ? (item.name + ' ' + item.surname) : "Список студентов ещё не сформирован"}</Typography>
                </StyledTableCell>
            </StyledTableRow>
            )}
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


