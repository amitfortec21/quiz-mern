import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

// redux actions
import * as Action from "../redux/question_reducer";

// fetchQuestion hook to fetch api data and set value to store
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    //   async function fetch backend data
    (async () => {
      try {
        // let question = await data;
        const [{questions, answers }] = await getServerData(`http://localhost:7000/api/questions`, (data) => data)
        // console.log({questions, answers })
        
        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: {questions, answers} }));

          // dispatch an action
          dispatch(Action.startExamAction({question: questions, answers}));
        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

// moveNextAction dispatch function
export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction())
  } catch (error) {
    console.log(error)
  }
}

// movePrevAction dispatch function
export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction())
  } catch (error) {
    console.log(error)
  }
}
