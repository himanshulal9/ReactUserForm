import Footer from "./components/Footer";
import Navbar from "./components/AppBar";
import { Box } from "@material-ui/core";
import FormComponent1 from "./components/formComponent1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Box>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <FormComponent1 />
      <Footer />
    </Box>
  );
}

export default App;
