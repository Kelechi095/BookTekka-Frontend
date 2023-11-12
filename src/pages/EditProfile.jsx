import Header from "../components/Header";
import React, { useState, useRef } from "react";
import { customFetch } from "../utils/customFetch";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { BiCamera } from "react-icons/bi";
import {toast} from "react-toastify"

export default function EditProfile() {
  const [newUsername, setNewUsername] = useState("");

  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const [bio, setBio] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(newFile);
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
  };

  const getUserProfileFn = async () => {
    const res = await customFetch.get("/auth/profile");
    console.log(res.data);
    return res.data;
  };

  const { data } = useQuery("user", getUserProfileFn, {
    onSuccess: (data) => {
      setNewUsername(data.username);
    },
  });

  const updateProfileFn = async () => {
    const res = await customFetch.patch("/auth/update", { newUsername, file });
    return res.data;
  };

  const { mutate: updateProfileMutation, isLoading } = useMutation(
    () => updateProfileFn(),
    {
      onSuccess: (data) => {
        localStorage.setItem("user", data.username);
        navigate("/profile");
        toast.success("Profile updated", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs"
        });
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? toast.error("Already used", {
              position: toast.POSITION.TOP_CENTER,
              className: "text-xs",
            })
          : toast.error(error?.response?.data?.msg, {
              position: toast.POSITION.TOP_CENTER,
              className: "text-xs",
            });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation();
  };

  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8">
      <h1 className="font-bold text-xl font-mono">Edit Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mt-8">
          <div
            className="rounded-full w-32 h-32 bg-black self-center relative bg-opacity-30 cursor-pointer flex justify-center items-center"
            onClick={() => fileRef.current.click()}
          >
            <BiCamera className="" size={60} color="white" />
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              src={previewFile ? previewFile : data?.profilePicture}
              className="h-32 w-32 self-center rounded-full object-cover cursor-pointer -z-10 absolute"
              alt=""
            />
          </div>
          <label className="text-xs text-gray-600">Username</label>
          <input
            type="text"
            className="bg-white border-b border-purple-300 outline-none "
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <label className="text-xs mt-4 text-gray-600">Bio</label>
          <textarea
            type="text"
            className="bg-white border border-purple-300 outline-none p-2 py-8 text-sm "
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          className="bg-cyan-800 rounded text-white py-2 hover:opacity-95 disabled:opacity-80 w-24 text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>

      <div className="flex flex-col"></div>
    </div>
  );
}