import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react';
import Profileeditphoto from '../profileeditphoto/profileeditphoto';

export default function Profileedit() {
  let navigate = useNavigate()

    const [data, setData] = useState();
    const initialState = { city: '', phone: '', telegram: '', email: '', github: '' }
    // const [form, setForm] = useState({ city: '', phone: '', telegram: '', email: '', github: '' })
    const [datainput, setDatainput] = useState(initialState);
    const [img, setImg] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [ImgSrc, setImgSrc] = useState('');
    const [city, setCity] = useState('')

    const formHandler = (e) => {
      setDatainput((preMy) => ({ ...preMy, [e.target.name]: e.target.value }))
    }

const sendFile = async () => {
  try {
    const data = new FormData()
    data.append('avatar', img, img.name)
    setAvatar(img.name)
    await fetch('/uploadavatar', {
      method: 'POST',
      body: data,
  })
  .then(res => res.json())
  .then(res => setAvatar(`/images/${res}`))
  // setAvatar(send.json())
  } catch (error) {
  }
}


    const updateInfo = async () => {
        await fetch(
            "/updateinfo",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // user_id: 6,
                    city: datainput.city,
                    phone: datainput.phone,
                    telegram: datainput.telegram,
                    github: datainput.github,
                    email: datainput.email
                }),
            }
        )
        navigate('/profile')
    };


    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
              "/userinfo"
            )
          ).json();
          // set state when the data received
          setData(data);
          setImgSrc(`/images/${data?.photo}`)
          // setCity(data.city)
          setDatainput(data)
        };
        dataFetch();
      }, []);

      // let myCity = data?.city !== undefined ? data?.city : "загрузка..."

       function handleChange (event) {
        setImg(event.target.files[0])
      }
  return (
    <Box>
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>
    <List
    sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
    }}
  >
    <ListItem>
      <ListItemText primary="Имя" secondary={data?.name} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Фамилия" secondary={data?.surname} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Группа" secondary={data?.Group?.name} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      {/* <ListItemText primary="Город" secondary={data?.city} /> */}
      <TextField
          id="filled-helperText"
          label="Город"
          type="text"
          value={datainput.city || ''}
          variant="filled"
          onChange={formHandler}
          name="city"
        />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      {/* <ListItemText primary="Телефон" secondary={data?.phone} /> */}
      <TextField
          id="filled-helperText"
          value={datainput.phone || ''}
          label="Телефон"
          variant="filled"
          onChange={formHandler}
          name="phone"
        />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      {/* <ListItemText primary="Телеграм" secondary={data?.telegram} /> */}
      <TextField
          id="filled-helperText"
          value={datainput.telegram || ''}
          label="Телеграм"
          variant="filled"
          onChange={formHandler}
          name="telegram"
        />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      {/* <ListItemText primary="Email" secondary={data?.email} /> */}
      <TextField
          id="filled-helperText"
          value={datainput.email || ''}
          label="Email"
          variant="filled"
          onChange={formHandler}
          name="email"
        />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      {/* <ListItemText primary="Github" secondary={data?.github} /> */}
      <TextField
          id="filled-helperText"
          value={datainput.github || ''}
          label="Github"
          variant="filled"
          onChange={formHandler}
          name="github"
        />
    </ListItem>
    <Divider component="li" />
  </List>
  </Grid>
  <Grid item xs={8}>
  <ListItem>
  <Profileeditphoto avatar = {avatar} ImgSrc = {ImgSrc}/>
  </ListItem>
            {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton> */}
      <ListItem>
      <input type="file" onChange={handleChange}/>
      </ListItem>
      {/* <button onClick={sendFile}>Изменить аватар</button> */}
      <Button variant="contained" color="success" onClick={sendFile}>Изменить аватар</Button>
      <Divider />
  <br/>
      <Button variant="contained" color="success" onClick={updateInfo}>Cохранить </Button>

  </Grid>
  </Grid>
  </Box>
  )
}
