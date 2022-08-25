
import { Box } from '@mui/system';
import TabPanel from './tab';
import Actif from '../../pages/Actif';
import a11yProps from './a11yProps';
import Tout from '../../pages/Tout';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';



  
  const TabBar = () => {
    const [value, setValue] = useState(0);

   
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
                                {Tout()}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            {Actif()}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>
        </>
    );
};

export default TabBar;