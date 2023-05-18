import React, { useEffect } from "react";
import axios from "axios";
import Profile from "../components/profile";
import Projects from "../components/projects";

//Section Main Function
const CVINDEX = () => {
  const [userData, setUserData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    axios
      .request({
        url: "https://joba-network-staging.herokuapp.com/api/auth/user/0xb75A08E82A1Bf0FccEb89bbdAf9AAE00BE8CA29a",
        method: "get",
        withCredentials: false,
      })
      .then((res) => {
        console.log("data", res.data);
        setUserData(res.data);
        setShow(true);
      })
      .catch(function (err) {
        console.log("err", err.message);
        setShow(false);
      });
  }, []);

  return (
    <>
      {show === true ? <Profile userData={userData} /> : ""}
      <Projects userData={userData} />
    </>
  );
};

export default CVINDEX;
