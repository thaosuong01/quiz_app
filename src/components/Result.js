import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import ResultTable from "./ResultTable";

function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue },
    result: { newAnswer },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="my-10 mx-auto p-5 w-[600px] text-white">
      <h1 className="text-3xl font-bold border-4 border-[#0DFF92] px-4 py-2 text-center">
        Quiz Application
      </h1>

      <div className="flex justify-center flex-col my-4 border p-8">
        <div className="flex justify-between w-full text-xl">
          <span>Username</span>
          <span className="font-bold">{newAnswer.username}</span>
        </div>
        <div className="flex justify-between w-full text-xl">
          <span>Total Quiz Points: </span>
          <span className="font-bold">{totalPoints || 0}</span>
        </div>
        <div className="flex justify-between w-full text-xl">
          <span>Total Questions: </span>
          <span className="font-bold">{queue.length || 0}</span>
        </div>
        <div className="flex justify-between w-full text-xl">
          <span>Total Attempts: </span>
          <span className="font-bold">{newAnswer.attempts || 0}</span>
        </div>
        <div className="flex justify-between w-full text-xl">
          <span>Total Earn Points: </span>
          <span className="font-bold">{newAnswer.points || 0}</span>
        </div>
        <div className="flex justify-between w-full text-xl">
          <span>Quiz Result: </span>
          <span
            className={`${
              newAnswer.achived === "Passed" ? "text-green-600 font-bold" : "text-red-600 font-bold"
            }`}
          >
            {newAnswer.achived}
          </span>
        </div>
      </div>

      <div className="bg-green-400 flex justify-center w-32 mx-auto my-8 hover:bg-slate-300 transition-all ease-linear duration-200 rounded">
        <Link
          className="w-full px-2 py-1 text-2xl text-center"
          to={"/"}
          onClick={onRestart}
        >
          Restart
        </Link>
      </div>

      <div>
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}

export default Result;
