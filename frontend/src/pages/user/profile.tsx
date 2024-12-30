import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../../../components/Profile";
export default function profile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    axios
      .get("http://localhost:8000/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <Profile name={name} />
    </>
  );
}
