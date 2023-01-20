import React from 'react'
import {useParams} from "react-router-dom";
import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styles from './Materialslist.module.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BackButton from '../backButton/BackButton'
import { useDispatch, useSelector } from 'react-redux';

export default function Materialslist() {

  const getUserRole = useSelector((store) => store.profile.userRole);

  const [data, setData] = useState();
  // const [studentid, setStudentid] = useState();
    const {id} = useParams();

    useEffect(() => {
      // fetch data
      const dataFetch = async () => {
        const dataReq = await (
          await fetch(
            `/lecturesall/${id}`
          )
        ).json();
        // set state when the data received
        setData(dataReq);
      };
      dataFetch();
    }, []);
    
    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );

  return (
    <>
    {(getUserRole === 'teacher') ? (<BackButton/>) : (<></>)}
    {/* <iframe
      width="290"
      height="190"
      src="https://www.youtube.com/embed/LHFRwvnrgIU"
      title="Youtube Player"
      frameborder="0"
      allowFullScreen
    />
    <div>materialslist{id}</div> */}
    {data?.map((item) => {
      return (
        <> 
        { item.Files[0].url.includes('youtube') ? (
          <>
          <Accordion key={crypto.randomUUID()}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: 25 }} color="text.secondary">{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Card className={styles.card} sx={{ minWidth: 275 }}>
      <CardContent>
        <div>
        <iframe
      width="290"
      height="190"
      src={`https://www.youtube.com/embed/${item.Files[0].url.split("=")[1]}`}
      title="Youtube Player"
      frameBorder="0"
      allowFullScreen
    />
    </div>
        <Link href={`${item.Files[0].url}`} underline="hover">
        {'Перейти к видео лекции'}
      </Link>
        {item?.Files.map((i) => {
          return (
            <>
        <div key={crypto.randomUUID()}>
            
        <Link href={`http://localhost:3100/downloadfile/${i.name}`} underline="hover">
        {i.name}<FileDownloadIcon/>
      </Link>
      
      </div>
      </>
          )
        })}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    </AccordionDetails>
    </Accordion>
    </>) : (
<>
<Accordion>
<AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: 25 }} color="text.secondary">{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Card className={styles.card} sx={{ minWidth: 275 }}>
      <CardContent>
        <Link sx={{ fontSize: 25 }} href={`${item.Files[0].url}`} underline="hover">
        {'Перейти к видео лекции'}
      </Link>
        {item?.Files.map((i) => {
          return (
            <>
        <div key={crypto.randomUUID()}>
        <Link href={`http://localhost:3100/downloadfile/${i.name}`} underline="hover">
        {i.name}<FileDownloadIcon/>
      </Link>
      </div>
      </>
          )
        })}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    </AccordionDetails>
</Accordion>
    </>)
        }
    </>
    
    )
    })
    
    
    }
    </>
  
)
}
