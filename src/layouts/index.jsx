import { Box, Button, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import TabBar from "../components/tabBar";
import { db } from "../utils/firebase.config";

const Layout = () => {
  const dispatch = useDispatch();
  let title = useRef("");
  const [completed, setCompleted] = useState(false);
  const [errorForm, setErrorForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title) {
        const data = {
          title: title.current.value,
          completed,
        };

        await addDoc(collection(db, "todos"), data);
        title.current = "";
        setErrorForm(false);
      } else {
        setErrorForm(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="h-screen  mt-8">
        <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
          <div class="bg-white rounded shadow p-6 m-4 w-2/4  ">
            <div class="mb-4">
              <h1 class="text-xl">Mes taches</h1>
              <form class="flex flex-col" onSubmit={handleSubmit}>
                <div class="flex mt-4 justify-around ">
                  <Box
                    sx={{
                      width: 650,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      ref={title}
                      fullWidth
                      label="Entrer une tache"
                      id="fullWidth"
                      size="small"
                      value={title.current.value}
                      onChange={(e) => (title.current.value = e.target.value)}
                    />
                    {errorForm && (
                      <span className="text-red-500">Ce champs est requis</span>
                    )}
                  </Box>

                  <Button type="submit" variant="contained">
                    Ajouter
                  </Button>
                </div>
              </form>
            </div>
            <TabBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
