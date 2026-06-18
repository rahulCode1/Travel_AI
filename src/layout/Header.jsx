import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isNavigationOpen, setNavigation] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logout successfully.");
    return navigate("/login");
  };

  const toggleNavigation = () => {
    setNavigation((pretStat) => !pretStat);
  };

  const handleLogout = () => {
    logout();
    toggleNavigation();
  };

  return (
    <nav className="navbar navbar-expand-lg d-md-none navbar-dark bg-dark ">
      <div className="container-fluid ">
        <NavLink className="navbar-brand fw-bold" to="/">
          🌍 Travel AI
        </NavLink>

        <button onClick={toggleNavigation} className="btn text-light">
          {isNavigationOpen ? "X" : <span className="navbar-toggler-icon" />}
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto gap-1 py-2">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                }
              >
                Trip Planner
              </NavLink>
            </li>

            {!token && (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <NavLink
                  to="/myTrips"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  My Trips
                </NavLink>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-outline-secondary text-light px-3"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {isNavigationOpen && (
        <div className="w-100 border-top border-secondary">
          <ul className="navbar-nav ms-auto gap-1 p-2">
            <li onClick={toggleNavigation} className="nav-item text-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                }
              >
                Trip Planner
              </NavLink>
            </li>

            {!token && (
              <li onClick={toggleNavigation} className="nav-item text-center ">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {token && (
              <li onClick={toggleNavigation} className="nav-item text-center">
                <NavLink
                  to="/myTrips"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  My Trips
                </NavLink>
              </li>
            )}
            {token && email === "pbrkumawat@gmail.com" && (
              <li onClick={toggleNavigation} className="nav-item text-center">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded ${isActive ? "bg-primary text-white" : "text-light"}`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}

            {token && (
              <li className="nav-item text-center">
                <button
                  onClick={handleLogout}
                  className="btn w-100 btn-outline-secondary text-light px-3"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
