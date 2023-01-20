import React from 'react'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { initMaterialsAC } from '../../store/materials/actionsCreators';
import { initGroupsAC } from '../../store/groups/actionsCreators';
import { initUserInfoAC } from '../../store/userInfo/actionsCreators';
import { useNavigate } from 'react-router-dom';

export default function Materials() {

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const initialState = { name: '', url: '', groups: [] }
  const [datainput, setDatainput] = useState(initialState);
  const [groupid, setGroupid] = useState();
  // const getUserRole = useSelector((store) => store.profile.userRole);
  const getUserRole = useSelector((store) => store);
  const getUserId = useSelector((store) => store.profile.userId);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "/userinfo"
        )
      ).json();
      // set state when the data received
      setGroupid(data.Group.id);

    };
    dataFetch();
  }, []);

//   const sendMaterial = async () => {
//     try {
//       const data = new FormData()
//       data.append('file', file, file.name)
//       await fetch(
//         "/uploadfile",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 data: data,
//                 name: datainput.name,
//                 group_id: datainput.groups[0].id,
//                 url: datainput.url
//             }),
//         }
//     )
        

      
//     } catch (error) {
      
//     } 
// };


const sendFile = async () => {
  try {
    const data = new FormData()
    // data.append('file', file, file.name)
    data.append('file', file[0])
    data.append('file', file[1])
    data.append('url', datainput.url)
    data.append('name', datainput.name)
    data.append('group_id', datainput.groups)
    // setAvatar(img.name)
    await fetch('/uploadfile', {
      method: 'POST',
      body: data
  })
  // .then(res => res.json())
  // .then(res => setAvatar(`/images/${res}`))
  // setAvatar(send.json())
  } catch (error) {
  }
}




  const formHandler = (e) => {
    setDatainput((preMy) => ({ ...preMy, [e.target.name]: e.target.value }))
  }

  
    const dispatch = useDispatch();
    const {id} = useParams();
    const group = useSelector((store) => store.materials);
    const preventDefault = (event) => event.preventDefault();



    const edited = group.map(({ id, name }) => ({
        label: name,
        id:id
        }))

    // const top100Films = [
    //     { title: 'The Shawshank Redemption', year: 1994 },
    //     { title: 'The Godfather', year: 1972 }]

        useEffect(() => {
            dispatch(initMaterialsAC());
            dispatch(initGroupsAC());
            dispatch(initUserInfoAC(getUserId));
        }, []);


        function handleChangeFile (event) {
          // setFile(file.push(event.target.files))
          let fholoList = [];
          const files = event.target.files;
          const filesList = Array.from(files).filter((el) => fholoList.every(e => e.name !== el.name));
          fholoList.push(...filesList);
          setFile(fholoList)
        }

  return (
    <>
    { (getUserRole !== 'teacher') ? (
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>
    <h2>Архив лекций</h2>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
    {group.map((item,id) => 
    {return (      <Link onClick={() => {navigate(`/lectures/${item.id}`)}} underline="hover">
        {item.name}
      </Link>)}
    )}
    </Box>
    </Grid>
    <Grid item xs={8}>
    <h2>Добавить материал</h2>
    
    <TextField
          onChange={formHandler}
          id="outlined-multiline-flexible"
          label="Название"
          name="name"
          multiline
          maxRows={4}
        />
            <TextField
          onChange={formHandler}
          id="outlined-multiline-flexible"
          label="Ссылка на видео"
          name="url"
          multiline
          maxRows={4}

        />
              <Button variant="contained" component="label">
        Дополнительные материалы
        <input 
        // hidden accept="image/*" multiple type="file" 
        multiple type="file" hidden accept="application/pdf, application/zip, application/vnd.rar" onChange={handleChangeFile}/>
      </Button>
      <br/>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={edited}
      onChange={(event,value) => {
              setDatainput((preMy) => ({ ...preMy, groups: value.id }))
        }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Группа" />}
    />
      <Button variant="contained" color="success" onClick={sendFile}
    //   onClick={updateInfo}
      >Опубликовать
      </Button>
    </Grid>
    </Grid>
    ) : (<div>123</div>)}
    </>
  )
}
