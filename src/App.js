import FormComponent from "./components/formComponent";
import Footer from "./components/Footer";
import Navbar from "./components/AppBar";
import { Box } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <Box>
      <Navbar />
      <FormComponent />
      <Footer />
    </Box>
  );
}

export default App;
