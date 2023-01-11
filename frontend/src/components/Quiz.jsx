import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { Navigate } from 'react-router-dom';

// import: custom hooks
import { movePrevQuestion, moveNextQuestion } from "../hooks/FetchQuestion";
import { pushAnswer } from "../hooks/setResult";

// import: redux store
import { useSelector, useDispatch } from 'react-redux'

export default function Quiz() {
  const [checked, setChecked] = useState(undefined);

  const state = useSelector(state => state);

  // trace selector
  const { queue, trace } = useSelector(state => state.questions);

  // result: options selector
  const result = useSelector(state => state.result.result);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(result)
  })
  
  // decrease the trace value by one using movePrevAction
  const onPrev = () => {
    if(trace > 0){
    dispatch(movePrevQuestion());
    }
  }

  // increase the trace value by one using moveNextAction
  const onNext = () => {
    if(trace < queue.length){
      dispatch(moveNextQuestion());

      // insert a new result in the array
      if(result.length <= trace) {
        dispatch(pushAnswer(checked))
      }
    }

    // reset the value of the checked variable
    setChecked(undefined);
  }

  const onChecked = (checked) => {
    setChecked(checked);
  }

  // finished exam after the last operation
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace={true} />
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto">
          <h1 className='text-center py-3 bg-dark text-light border border-5 border-success rounded'>Quiz Application</h1>
          {/* display questions */}
          <Questions onChecked={onChecked} />
          <div className="d-flex justify-content-between">
            { trace > 0 ? <button className="btn btn-warning" onClick={onPrev}>Prev</button> : <div></div>}
            <button className="btn btn-success" onClick={onNext}>Next</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
