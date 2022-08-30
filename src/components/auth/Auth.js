import { useState } from 'react';
import Login from './Login'
import SignInGoogle from './SignInGoogle'
import { Tabs, Tab, Box } from '@mui/material'
import SignUp from './SignUp';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className="w-full"
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Auth = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box className='flex flex-col justify-center items-center h-screen w-screen' >
            <div className='text-xl'>Welcome to Flamin's Task Manager</div>

            <Box className='p-8 w-full flex flex-col gap-2' sx={{maxWidth:"52rem"}}>
            <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignUp />
            </TabPanel>
            <SignInGoogle />
            </Box>
        </Box >
    )
}

export default Auth