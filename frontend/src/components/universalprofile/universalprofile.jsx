import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid, TableCell } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import BackButton from '../backButton/BackButton';


export default function Universalprofile() {

    const { id } = useParams();

    const [data, setData] = useState();
    const [ImgSrc, setImgSrc] = useState('');

    useEffect(() => {

        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
              `/userinfo/${id}`
            )
          ).json();
          // set state when the data received
          setData(data);
          setImgSrc(`/images/${data.photo}`)
        };
        dataFetch();
      }, []);

      // const imgSrc = `/images/${ImgSrc}.jpg`
  return (
  <>
    <TableCell style={{ display: 'table-cell', alignItems: 'center', width: "10%", minHeight: "50px"}} align="left" colSpan={0}>
      <BackButton/>
    </TableCell>
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
      <ListItemText primary="Город" secondary={data?.city} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Телефон" secondary={data?.phone} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Телеграм" secondary={data?.telegram} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Email" secondary={data?.email} />
    </ListItem>
    <Divider component="li" />
    <ListItem>
      <ListItemText primary="Github" secondary={data?.github} />
      {/* <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        /> */}
    </ListItem>
    <Divider component="li" />
  </List>
  </Grid>
  <Grid item xs={8}>
  <Avatar
        alt="Remy Sharp"
        src={ImgSrc}
        sx={{ width: 250, height: 250 }}
      />
  </Grid>
  </Grid>
  </>
  )
}
