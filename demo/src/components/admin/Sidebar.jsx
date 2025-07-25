import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaBed, FaUserFriends, FaUsersCog, FaTicketAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/AuthSlice"
const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FaClipboardList /> },
  { name: "Rooms", path: "/admin/rooms", icon: <FaBed /> },
  { name: "Guests", path: "/admin/guests", icon: <FaUserFriends /> },
  { name: "Staff", path: "/admin/staff", icon: <FaUsersCog /> },
  { name: "Voucher", path: "/admin/vouchers", icon: <FaTicketAlt /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-warning vh-100 d-flex flex-column p-3" style={{ width: "250px" }}>
      <h4 className="fw-bold mb-4 text-dark">🏨 HOTEL ADMIN</h4>
      <nav className="nav flex-column">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center mb-2 px-2 py-2 rounded ${
                isActive ? "bg-dark text-white" : "text-dark"
              }`
            }
            end
          >
            <span className="me-2">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="nav-link d-flex align-items-center mb-2 px-2 py-2 rounded text-dark bg-transparent border-0"
          style={{ textAlign: "left" }}
        >
          <span className="me-2">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
