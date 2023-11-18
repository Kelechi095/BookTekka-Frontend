import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Library from './pages/Library'
import EditBook from "./pages/EditBook";
import Book from "./pages/Book";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import Recommendation from "./pages/Recommendation";
import { GlobalProvider } from "./context/GlobalContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecommendPage from "./pages/RecommendPage";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Recommendation />} />
            <Route path=":id" element={<RecommendPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/add-book" element={<AddBook />} />
            <Route path="/library/edit-book/:id" element={<EditBook />} />
            <Route path="/library/:id" element={<Book />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/public-profile/:userId" element={<PublicProfile/>} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
