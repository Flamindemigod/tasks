import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
    return (
      <div className='w-full bg-primary-300 flex p-8 flex-col sm:flex-row'>
          <div className='flex flex-col gap-4' >
            <div>Espresso, cappucino, latte macchiato, adoption papers and even more awaits you at Café Néapolitan!</div>
            <div>Get one free slice of cheesecake and cappucino with the code <div className="font-semibold inline"> BECOMENEASSON2022</div>!</div>
          </div>
          <div className='ml-auto'>
          <div>Made for you with <FavoriteIcon sx={{color: '#ff1000'}} /> by <strong>Flamindemigod</strong> </div>
          <a href={"https://ko-fi.com/flamindemigod"}><img className='w-40' src='https://storage.ko-fi.com/cdn/brandasset/kofi_button_blue.png' alt='Kofi donation link' /></a>
          <a href={"https://github.com/andradesavio9073/tasks"}>Submit Bug Reports or Help contribute on Github <GitHubIcon  /> </a>
          </div>
      </div>
    )
  }
  
  export default Footer