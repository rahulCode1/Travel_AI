import { Navigate } from "react-router-dom";
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  console.log(email)

  if (!token || email !== "pbrkumawat@gmail.com") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
