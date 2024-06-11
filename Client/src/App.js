import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import TransactionList from "./transaction/transactionList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "detail/:hotelID", element: <Detail /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "transaction/:username", element: <TransactionList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/detail" element={<Detail />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
