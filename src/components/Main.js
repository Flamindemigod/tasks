import { Box, Button, ButtonGroup } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListIcon from '@mui/icons-material/List';
import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';
import CalenderView from './views/calenderView/CalenderView';
import ListView from './views/listView/ListView';
import { useState } from 'react';
const Main = () => {
    const [view, setView] = useState(false);
    return (
        <>
            <Header />
            <div className='relative'>
                <div className="ml-auto mr-40 w-min">
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group view-selector">
                        <Button variant={!view ? "contained" : "outlined"} onClick={()=>{setView(false)}}><ListIcon /></Button>
                        <Button variant={view ? "contained" : "outlined"} onClick={()=>{setView(true)}}><CalendarTodayIcon /></Button>
                    </ButtonGroup>
                </div>
                <Box sx={{ minHeight: "80vh" }}>
                    {view ? <CalenderView /> : <ListView />}
                </Box>
                <AddTask />

            </div>
            <Footer />
        </>
    )
}

export default Main