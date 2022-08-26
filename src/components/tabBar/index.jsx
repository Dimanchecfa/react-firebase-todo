
import { Box } from '@mui/system';
import TabPanel from './tab';
import Actif from '../../pages/Actif';
import a11yProps from './a11yProps';
import Tout from '../../pages/Tout';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



  
  const TabBar = () => {
    const [value, setValue] = useState(0);
const todoActive = useSelector(state => state?.todos?.todos?.filter(todo => todo.completed === false));
    const todoFinished = useSelector(state => state?.todos?.todos?.filter(todo => todo.completed === true));
    const todoData = useSelector(state => state?.todos?.todos);
   
    const handleChange = (SyntheticEvent, newValue) => {
        setValue(newValue);
    };

    


    return (
        <>
            <Box sx={{width: "100%"}}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Tout" {...a11yProps(0)} />
                                    <Tab label="Actif" {...a11yProps(1)} />
                                    <Tab label="Termine" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                {Tout (todoData)}

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {Actif(todoActive)}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {Actif(todoFinished)}
                            </TabPanel>
                        </Box>
        </>
    );
};

export default TabBar;