import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import BackButtonWhite from '../backButtonWhite/BackButtonWhite';


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

export default function ShowPairs() {

  const [groupname, setGroupname] = React.useState();

  const {id} = useParams();

  const myId = +id;

  
  const pairs = useSelector((store) => store.pair);
  const groups = useSelector((store) => store.group);
  const users = useSelector((store) => store.userInfo);
  const getUserRole = useSelector((store) => store.profile.userRole);
  const groupName = groups[0]?.name;

  function createData(week1, week2, week3, week4) {
    return { week1, week2, week3, week4 };
  }
  

const getfirstRowsArr = () => {
  const phrase = 'Расписание ещё не составлено';
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  let firstRows = [];
  for (let i = 0; i < 10; i++) {
      firstRows = [
        createData(days[0], days[0], days[0], days[0]),
        createData(phrase, phrase, phrase, phrase),
        createData(days[1], days[1], days[1], days[1]),
        createData(phrase, phrase, phrase, phrase),
        createData(days[2], days[2], days[2], days[2]),
        createData(phrase, phrase, phrase, phrase),
        createData(days[3], days[3], days[3], days[3]),
        createData(phrase, phrase, phrase, phrase),
        createData(days[4], days[4], days[4], days[4]),
        createData(phrase, phrase, phrase, phrase),
      ];
  }
return firstRows;
}

const firstArr = getfirstRowsArr();

let myArray

let a = pairs !== undefined ? pairs.filter(el => el.group_id === myId) : [];


if (pairs !== undefined && pairs.length > 0 && a.length) {

  let b = a.pop();
  
  let c = b.data;

let getArr = JSON.parse(c); 

let getRowUl = (row) => {
    let ul = <ul key={crypto.randomUUID()}>{row?.map((el) => <li key={crypto.randomUUID()}>{el?.join('-')}</li> )}</ul>;
    return ul;
  }

  function getShuffledArr(array) {
    let result = [], source = array.concat([]);
  
    while (source.length) {
      let index = Math.floor((Math.random()-0.5) * source.length);
      result.push(source.splice(index, 1)[0]);
   }
  
    if(result === array){
        result.reverse();
    }
  
    return result;
  }

let getRowsArr = () => {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const phrase = 'Solo';
  let ranRows = [];
  for (let i = 0; i < 20; i++) {
    if(i < 12){
      ranRows.push(getRowUl(getArr[i]));
    } else {
      ranRows.push(phrase);
    }
  }
  let newRanRows = getShuffledArr(ranRows)
  let myRows = [];
    myRows = [
  createData(days[0], days[0], days[0], days[0]),
  createData(newRanRows[0], newRanRows[1], newRanRows[2], newRanRows[3]),
  createData(days[1], days[1], days[1], days[1]),
  createData(newRanRows[4], newRanRows[5], newRanRows[6], newRanRows[7]),
  createData(days[2], days[2], days[2], days[2]),
  createData(newRanRows[8], newRanRows[9], newRanRows[10], newRanRows[11]),
  createData(days[3], days[3], days[3], days[3]),
  createData(newRanRows[12], newRanRows[13], newRanRows[14], newRanRows[15]),
  createData(days[4], days[4], days[4], days[4]),
  createData(newRanRows[16], newRanRows[17], newRanRows[18], newRanRows[19]),
];
return myRows;
}


// function createMyArray(){
  myArray = getRowsArr();
  // console.log("🚀 ~ file: showPairs.jsx:139 ~ createMyArray ~ myArray", myArray)
  // localStorage.setItem('myArray', JSON.stringify(myArray));
  
// }
}

// let thisArr = localStorage.getItem('myArray');
// console.log("🚀 ~ file: showPairs.jsx:145 ~ ShowPairs ~ thisArr", thisArr)

let rows = (pairs !== undefined && myArray !== undefined && pairs.length > 0) ? myArray : firstArr;

React.useEffect(() => {
  const dataFetch = async () => {
    const data = await (
      await fetch(
        "/userinfo"
      )
    ).json();
    setGroupname(data.Group.name);
    console.log('DATA', data);
  };
  dataFetch();

}, []);



  return (
    <TableContainer component={Paper}>
      <Table>
        <tbody>
          <TableRow >
            <TableCell style={{ display: 'flex', position: 'relative', color: "white", backgroundColor: "#44014C", alignItems: 'center'}} align="center" colSpan={4}>
            { (getUserRole !== 'student') ? (
              <>
              <BackButtonWhite sx={{position: 'absolute', color: 'white'}}/>
              <div style={{display: "inline-block", textAlign: "center", width: "100%"}}>
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold'}}>{groupName}</Typography>
              </div>
              </>
    ) : (<div style={{display: "inline-block", textAlign: "center", width: "100%"}}>
    <Typography variant="h6" align="center" sx={{fontWeight: 'bold'}}>{groupname}</Typography>
  </div>)}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
      <Table style={{tableLayout: 'fixed', width: '100%'}} sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ backgroundColor: "#44014C"}} align="center"> <Typography sx={{fontWeight: 'bold'}}>Неделя 1</Typography></StyledTableCell>
            <StyledTableCell style={{ backgroundColor: "#44014C"}} align="center"><Typography sx={{fontWeight: 'bold'}}>Неделя 2</Typography></StyledTableCell>
            <StyledTableCell style={{ backgroundColor: "#44014C"}} align="center"><Typography sx={{fontWeight: 'bold'}}>Неделя 3</Typography></StyledTableCell>
            <StyledTableCell style={{ backgroundColor: "#44014C"}} align="center"><Typography sx={{fontWeight: 'bold'}}>Неделя 4</Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={crypto.randomUUID()}>
              <StyledTableCell component="th" scope="row" align="center">
              <Typography>{row.week1}</Typography>
              </StyledTableCell>
              <StyledTableCell align="center"><Typography>{row.week2}</Typography></StyledTableCell>
              <StyledTableCell align="center"><Typography>{row.week3}</Typography></StyledTableCell>
              <StyledTableCell align="center"><Typography>{row.week4}</Typography></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}