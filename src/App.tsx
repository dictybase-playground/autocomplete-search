import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { SearchBox } from "./SearchBox";
import "./App.css";

const fields = ["Descriptor", "Summary", "Phenotype"];

function App() {
  return (
    <BrowserRouter>
      <Container>
        <SearchBox fields={fields} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
