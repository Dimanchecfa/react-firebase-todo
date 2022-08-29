import {Box, Button, Tab, Tabs, TextField} from "@mui/material";
import {addDoc, collection, onSnapshot} from "firebase/firestore";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import Active from "../../components/Active";
import All from "../../components/All";
import Finished from "../../components/Finished";
import a11yProps from "../../components/Tab/a11yProps";
import TabPanel from "../../components/Tab/tab";
import {getTodos} from "../../redux/slices/todoSlice";
import {db} from "../../utils/firebase.config";

const Layout = () => {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const [completed, setCompleted] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title) {
                const data = {
                    title,
                    completed,
                };
                setTitle("");
                await addDoc(collection(db, "todos"), data);

                setErrorForm(false);
            } else {
                setErrorForm(true);

            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (SyntheticEvent, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let localTodos = [];

        onSnapshot(collection(db, "todos"), (res) => {
            localTodos = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
            dispatch(getTodos(localTodos));
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div className="h-screen  mt-8">
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
                    <div className="bg-white rounded shadow p-6 m-4 w-2/4  ">
                        <div className="mb-4">
                            <h1 className="text-xl">Mes tâches</h1>
                            <form className="flex flex-col" onSubmit={handleSubmit} id="form">
                                <div className="flex mt-4 justify-evenly ">
                                    <Box
                                        sx={{
                                            width: 650,
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <TextField

                                            fullWidth
                                            label="Entrer une tache"
                                            id="fullWidth"
                                            size="small"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}

                                        />
                                        {errorForm && (
                                            <span classNameName="text-red-500">
                        Ce champs est requis
                      </span>
                                        )}
                                    </Box>

                                    <Button type="submit" variant="contained">
                                        Ajouter
                                    </Button>
                                </div>
                            </form>
                        </div>
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
                                {loading ? (
                                    <div class="flex justify-center items-center">
                                        <div
                                            class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full m-12"
                                            role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    </div>) : (
                                    <All/>)}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* {Actif(todoActive)} */}
                                <Active/>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Finished/>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
