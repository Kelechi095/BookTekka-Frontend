import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Book from "./pages/Book";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import Recommendation from "./pages/Recommendation";
import { GlobalProvider } from "./context/GlobalContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/recommendations" element={<Recommendation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
