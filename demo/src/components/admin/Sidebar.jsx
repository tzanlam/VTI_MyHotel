import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaBed, FaUserFriends, FaUsersCog, FaCog, FaTicketAlt } from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FaClipboardList /> },
  { name: "Rooms", path: "/admin/rooms", icon: <FaBed /> },
  { name: "Guests", path: "/admin/guests", icon: <FaUserFriends /> },
  { name: "Staff", path: "/admin/staff", icon: <FaUsersCog /> },
  { name: 'Voucher', path: "/admin/vouchers", icon: <FaTicketAlt />},
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

export default function Sidebar() {
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
      </nav>
    </div>
  );
}
