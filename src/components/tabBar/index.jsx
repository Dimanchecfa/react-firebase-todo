import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actif from "../../pages/Actif";
import Termine from "../../pages/Termine";
import Tout from "../../pages/Tout";
import { getTodos } from "../../redux/slices/todoSlice";
import { db } from "../../utils/firebase.config";
import a11yProps from "./a11yProps";
import TabPanel from "./tab";

const TabBar = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const todoActive = useSelector((state) =>
    state?.todos?.todos?.filter((todo) => todo.completed === false)
  );
  const todoFinished = useSelector((state) =>
    state?.todos?.todos?.filter((todo) => todo.completed === true)
  );
  const todoData = useSelector((state) => state?.todos?.todos);

  const handleChange = (SyntheticEvent, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // getDocs(collection(db, "todos")).then((res) => {
    //   dispatch(
    //     getTodos(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //   );
    // });
    let localTodos = [];

    onSnapshot(collection(db, "todos"), (res) => {
      localTodos = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getTodos(localTodos));
    });
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          <Tout todoData={todoData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {Actif(todoActive)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {Termine(todoFinished)}
        </TabPanel>
      </Box>
    </>
  );
};

export default TabBar;
