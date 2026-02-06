import { useEffect, useState } from "react";
import api from "../services/api";
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users", { headers: { Authorization: `Bearer ${token}` } });
        // eslint-disable-next-line no-console
        console.log("Users response:", res.data);
        
        // Handle both array and object responses
        const userList = Array.isArray(res.data) ? res.data : res.data?.users || [];
        setUsers(userList);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Fetch users error:", err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
  {users.map(u => (
    <tr key={u._id}>
      <td>{u.username}</td>
      <td>{u.email}</td>
      <td>
        {u.createdAt ? new Date(u.createdAt).toLocaleString() : "N/A"}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default Dashboard;
