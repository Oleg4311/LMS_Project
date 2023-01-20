import React from 'react'
import Avatar from '@mui/material/Avatar';



export default function Profileeditphoto({avatar, ImgSrc}) {
  return (
    <Avatar
    alt="Remy Sharp"
    src={avatar ? avatar : ImgSrc}
    sx={{ width: 250, height: 250 }}
  />
  )
}
