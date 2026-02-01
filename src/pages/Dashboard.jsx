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
        setUsers(res.data);
      } catch (err) {
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
