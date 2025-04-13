import "./App.css";
import HomePage from "./Components/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PdfDisplay from "./Components/PdfDisplay";
import DownloadPdf from "./Components/DownloadPdf";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Homepage" replace />,
  },
  {
    path: "/Homepage",
    element: <HomePage></HomePage>,
  },
  {
    path: "/pdfFile",
    element: <PdfDisplay />,
  },
  {
    path: "/downloadPdf",
    element:<DownloadPdf />,
  },
  
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
