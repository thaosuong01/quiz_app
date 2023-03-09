import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";

function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }
  return (
    <>
      <div className="my-10 mx-auto p-5 w-[600px] text-white">
        <h1 className="text-3xl font-bold border-4 border-[#0DFF92] px-4 py-2 text-center">
          Quiz Application
        </h1>
        <div>
          <ol style={{ listStyle: "decimal" }} className="my-4 px-8">
            <li>You will be asked 10 question one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>
              Each question has three options. You can choose only one options.
            </li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
          </ol>

          <form id="form" className="mx-auto flex justify-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Username"
              className="w-[50%] px-4 py-2 border-none focus:outline-none text-black"
            />
          </form>

          <div className="bg-green-400 flex justify-center w-32 mx-auto my-8 hover:bg-slate-300 transition-all ease-linear duration-200 rounded">
            <Link
              className="w-full px-2 py-1 text-2xl text-center"
              to={"quiz"}
              onClick={startQuiz}
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
