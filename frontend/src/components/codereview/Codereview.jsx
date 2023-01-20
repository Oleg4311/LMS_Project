import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function Codereview() {
    const [groups, setGroups] = useState();
    const [groupsinput, setGroupsinput] = useState('');
    const [students, setStudents] = useState([
        {label: 'Выберите группу', id: 14}])
    const [studentsinput, setStudentsinput] = useState()
    const [open, setOpen] = React.useState(false);



    const createEvent = async () => {
      setOpen(true)
        await fetch(
            "/createevent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Код-ревью",
                    // user_id: userId,
                    description: theme,
                    member_id: studentsinput.id,
                    start: `${valuedate.toISOString().substring(0, 10)}${valuetimestart.toISOString().substring(10)}`,
                    finish: `${valuedate.toISOString().substring(0, 10)}${valuetimeend.toISOString().substring(10)}`,
                }),
            }
        )
    };

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
              "/groups"
            )
          ).json();
          // set state when the data received
          setGroups(data.map(({ id, name }) => ({
            label: name,
            id:id
            }))
            );
        };
        dataFetch();
      }, []);

      useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (
            await fetch(
              `/groupsnames/${groupsinput}`
            )
          ).json();
          // set state when the data received
          setStudents(data[0].UserInfos.map(({ user_id, name, surname }) => ({
            label: `${name} ${surname}`,
            id:user_id
            }))
            );
        };
        dataFetch();
      }, [groupsinput]);


    const formHandlerGroup = (e,v) => {
        setGroupsinput(v.id)
        // setDatainput((preMy) => ({ ...preMy, [e.target.name]: e.target.value }))
    }
    const formHandlerStudent = (e,v) => {
        setStudentsinput(v)
        // setDatainput((preMy) => ({ ...preMy, [e.target.name]: e.target.value }))
    }
    const [valuedate, setValuedate] = React.useState(dayjs('2023-01-01T21:11:54'));
    const [valuetimestart, setValuetimestart] = React.useState(dayjs('2023-01-01T21:11:54'));
    const [valuetimeend, setValuetimeend] = React.useState(dayjs('2023-01-01T21:11:54'));
    const [theme, setTheme] = React.useState();

    const handleChangeDate = (newValue) => {
        setValuedate(newValue);
    };

    const handleChangeTheme = (e) => {
        setTheme(e.target.value);
      };



  return (<>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Встреча успешно запланирована!
        </Alert>
      </Collapse>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={groups}
      onChange={formHandlerGroup}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Группа" />}
    />
    <br/>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      disabled = {!groupsinput}
      options={students}
      onChange={formHandlerStudent}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Студент" />}
    />
             <div>
             <br/>
             <DesktopDatePicker
          label="Дата"
          inputFormat="MM/DD/YYYY"
          value={valuedate}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
        </div>
        <br/>
              <TimePicker
        label="Время начала"
        value={valuetimestart}
        onChange={(newValue) => {
            setValuetimestart(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
                    <TimePicker
        label="Время окончания"
        value={valuetimeend}
        onChange={(newValue) => {
            setValuetimeend(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <br/>
      <br/>
              <TextField
              onChange={handleChangeTheme}
          id="outlined-multiline-flexible"
          label="Тема код-ревью"
          multiline
          maxRows={4}
        />
        <br/>
      
      <br/>
              <Button variant="contained" color="success" onClick={createEvent}>
        Назначить встречу
      </Button>
    </LocalizationProvider>
    </>
  )
}
