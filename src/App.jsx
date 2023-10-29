import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-todo" element={<AddBook />} />
        <Route path="/edit-todo/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
