import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./home/Home";
import Hotels from "./ad_pages/Hotels";
import Rooms from "./ad_pages/Rooms";
import AddHotels from "./ad_pages/AddHotels";
import AddRooms from "./ad_pages/AddRooms";
import TransactionList from "./ad_pages/ListTrans";
import EditHotel from "./ad_pages/EditHotel";
import EditRoom from "./ad_pages/EditRoom";
import Login from "./auth_AD/AD_Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  {
    path: "hotels",
    element: (
      <ProtectedRoute>
        <Hotels />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "all-rooms",
    element: (
      <ProtectedRoute>
        <Rooms />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-hotels",
    element: (
      <ProtectedRoute>
        <AddHotels />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-rooms",
    element: (
      <ProtectedRoute>
        <AddRooms />
      </ProtectedRoute>
    ),
  },
  {
    path: "transaction",
    element: (
      <ProtectedRoute>
        <TransactionList />
      </ProtectedRoute>
    ),
  },
  { path: "edit/:hotelID", element: <EditHotel /> },
  { path: "edit-room/:roomID", element: <EditRoom /> },
  { path: "login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
