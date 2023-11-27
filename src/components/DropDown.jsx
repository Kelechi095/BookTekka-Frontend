import { AiOutlineMenu } from "react-icons/ai";
import ProfileAvatar from "./ProfileAvatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import useGetUser from "../hooks/user/useGetUser";
import useGetUserProfile from "../hooks/user/useGetUserProfile";
import useLogoutUser from "../hooks/user/useLogoutUser";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutMutation } = useLogoutUser()
  const {user} = useGetUserProfile()
  
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleProfile = () => {
    navigate("/profile")
    setIsOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logoutMutation()
  }

  const handleAddBook = () => {
    navigate("/add-book")
  }
  
  const navigate = useNavigate()
  


  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button className="text-sm border rounded-full p-1 px-2 hover:bg-neutral-100" onClick={handleAddBook}>Add book</button>
        <div className="toggle_dropdown" onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <ProfileAvatar profilePicture={user?.profilePicture}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Profile" handleClick={handleProfile}/>
              <MenuItem
                label="Logout"
                handleClick={handleLogout}
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
