import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../src/index.css";
import { CheckUserExist } from "../helper/helper";

// import components
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";

// react router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
