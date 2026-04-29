import Adminsidebar from "../Adminsidebar";
import axios from "../../utility/axiosinstance";
import { useEffect, useState } from "react";
import "./manageUser.css";

function Manageuser() {

  let [user, setUser] = useState([]);

  async function getAlluser() {
    try {
      let data = await axios.get("/user/alluser");
      setUser(data.data);
    } catch (e) { console.log(e) }
  }

  useEffect(() => { getAlluser() }, []);

  console.log(user)

  return (
    <div className="admin-page">
      <Adminsidebar />

      <main className="admin-main">
        <div className="manage-header">
          <h2>Manage Users</h2>
          <div className="manage-actions">
            {/* Additional actions can be added here */}
          </div>
        </div>

        <div className="table-wrap">
          {user.length === 0 ? (
            <div className="no-data">No users found</div>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {user.map((userData) => (
                  <tr key={userData._id}>
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                    <td>{userData.number || "N/A"}</td>
                    <td>
                      <span className={`badge ${userData.role || "user"}`}>
                        {userData.role || "user"}
                      </span>
                    </td>
                    <td>{userData._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

export default Manageuser;