import React, { useEffect, useState } from "react";
import Question from "./Question";

/** redux store import */
import { useSelector, useDispatch } from "react-redux";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setNewAnswer } from "../redux/result_reducer";

function Quiz() {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  const {
    result: { userId },
  } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    /** finish exam after the last question */
    const res = async () => {
      if (result.length && result.length >= queue.length) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, {
          result: result,
          username: userId,
        });
        dispatch(setNewAnswer(response.data));
        navigate("/result");
      }
    };
    res();
  });

  /** Prev button event handler */
  function onPrev() {
    /** update trace value by one using movePrevAction */
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  /** Next button event handler */
  function onNext() {
    /** update trace value by one using moveNextAction */
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    /** reset the value of the checked variable */
    setChecked(undefined);
  }

  function onChecked(check) {
    setChecked(check);
  }

  return (
    <>
      <div className="my-10 mx-auto p-5 w-[600px] text-white">
        <h1 className="text-3xl font-bold border-4 border-[#0DFF92] px-4 py-2 text-center">
          Quiz Application
        </h1>

        {/* display question */}
        <Question onChecked={onChecked} />

        <div className="flex justify-between">
          {trace > 0 ? (
            <button
              className="bg-green-400 w-32 my-8 hover:bg-slate-300 transition-all ease-linear duration-200 px-2 py-2 rounded"
              onClick={onPrev}
            >
              Prev
            </button>
          ) : (
            <div></div>
          )}

          <button
            className="bg-green-400 w-32 my-8 hover:bg-slate-300 transition-all ease-linear duration-200 px-2 py-2 rounded"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Quiz;
