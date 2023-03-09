import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** custom hook */
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

function Question({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, serverError }] = useFetchQuestion();
  const { trace } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3>isLoading</h3>;
  if (isLoading) return <h3>{serverError || "Unknow Error"}</h3>;

  return (
    <div className="my-10 mx-auto w-full text-white">
      <h2 className="text-xl font-bold">{questions?.question}</h2>

      <ul className="mt-4" key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li
            className="block border-b border-slate-700 cursor-pointer hover:bg-emerald-500 transition-all ease-linear duration-150 p-2"
            key={i}
          >
            <div className="flex gap-4 items-center p-2 ">
              <input
                type="radio"
                className="cursor-pointer checked:bg-emerald-400 checked:hover:bg-emerald-400 checked:active:bg-emerald-400 checked:focus:bg-emerald-400 focus:bg-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                name="options"
                id={`q${i}-option`}
                value={true}
                checked={result[trace] === i}
                onChange={() => onSelect(i)}
              />
              <label htmlFor={`q${i}-option`} className="cursor-pointer">
                {q}
              </label>
              <div className=""></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
