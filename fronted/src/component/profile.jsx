import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();
  let [user, setUser] = useState([]);
  let id = localStorage.getItem("userid");

  async function getprofile() {
    try {
      let { data } = await axios.post(`http://localhost:3000/user/profile/${id}`);
      setUser(data.user);
    } catch (e) {
      console.log(e)
    }
  }

  function handlelogout() {
    localStorage.clear();
    navigate("/login")
    window.location.reload();
  }

  useEffect(() => {
    getprofile();
  }, [])

  console.log(user);


  return (
    <>
      <h1>profile page:</h1>
      {[user].map((user) => (
        <h2>email : {user.email}</h2>
      ))}
      <button onClick={handlelogout}>Logout</button>
    </>
  )
}

export default Profile;