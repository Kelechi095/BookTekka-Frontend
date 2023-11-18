import React from "react";
import { useParams } from "react-router-dom";

export default function PublicProfile() {
  const { userId } = useParams();
  return (
    <div>
      <h2>Public Profile</h2>
      <h2>User Id: {userId}</h2>
    </div>
  );
}
