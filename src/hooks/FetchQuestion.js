import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

/** redux actions */

import * as Action from "../redux/question_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        // let question = await data;
        const questions = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (data) => data
        );

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { questions } }));

          /** dispatch an action */
          dispatch(Action.startExamAction({ question: questions }));
        } else {
          throw new Error("No Question Avaliable!");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

/** move dispatch function */

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
