import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Bookings from "../pages/admin/Bookings";
import Rooms from "../pages/admin/Rooms";
import Guests from "../pages/admin/Guests";
import StaffManager from "../pages/admin/Staff";
import Settings from "../pages/admin/Setting";
import Vouchers from "../pages/admin/Voucher";
import GuestLayout from "../layouts/GuestLayout";
import HomeGuest from "../pages/user/HomeGuest";
import RoomGuest from "../pages/user/RoomGuest";
import BookingGuest from "../pages/user/BookingGuest";
import { PrivateRouter } from "./PrivateRouter";
import BookingDetailss from "../components/form/BookingDetails";
import Contact from "../pages/user/Contact";
import BookingDetails from "../components/admin/details/BookingDetails";
import VoucherDetails from './../components/admin/details/VoucherDetails';
import ErrorPage from "../pages/user/ErrorPage";
import RoomDetails from './../components/admin/details/RoomDetails';

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <PrivateRouter allowedRoles={["ADMIN"]}/>,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "bookings/:bookingId",
            element: <BookingDetails />,
          },
          {
            path: "rooms",
            element: <Rooms />,
          },
          {
            path: "rooms/:roomId",
            element: <RoomDetails />
          },
          {
            path: "guests",
            element: <Guests />,
          },
          {
            path: "staff",
            element: <StaffManager />,
          },
          {
            path: "vouchers",
            element: <Vouchers />,
          },
          {
            path: "vouchers/:id",
            element: <VoucherDetails />
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <HomeGuest />,
      },
      {
        path: "rooms",
        element: <RoomGuest />,
      },
      {
        path: "booking",
        element: <BookingGuest />,
      },
      {
        path: "booking/:bookingId",
        element: <BookingDetailss />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
  path: "*",
  element: <ErrorPage status="404" title="404 - Không tìm thấy" subtitle="Trang bạn tìm không tồn tại hoặc đã bị xóa." />
}
]);
