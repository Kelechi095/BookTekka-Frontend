
import Header from "../components/Header"
import React, { useEffect, useState, useRef } from "react";
import { customFetch } from "../utils/customFetch";
import { useQuery, useMutation, useQueryClient  } from "react-query";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const [newUsername, setNewUsername] = useState("");
  
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const [isUploaded, setIsUploaded] = useState("");
  const [isDone, setIsDone] = useState(true)
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(newFile);
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
    setIsDone(false)
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
  };

  const getUserProfileFn = async () => {
    const res = await customFetch.get("/auth/profile");
    console.log(res.data)
    return res.data;
  };

  const {data} = useQuery("user", getUserProfileFn, {
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
        localStorage.setItem("user", data.username)
        navigate("/");
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? setError("Email already used")
          : setError(error.response.data.error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation();
  };

  console.log(data)
  
    
  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8">
    <Header title={'Profile'}/>

    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="bg-slate-200 p-3 rounded-lg"
        />
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      <img
        src={previewFile ? previewFile : data?.profilePicture}
        className="h-32 w-32 self-center rounded-full object-cover my-8 cursor-pointer"
        alt=""
        onClick={() => fileRef.current.click()}
      />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {isLoading ? "Updating..." : "Update profile"}
        </button>
      </form>
      <div className="flex flex-col">
      
    </div>
    </div>
  )
}
