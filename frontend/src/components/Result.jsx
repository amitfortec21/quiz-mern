import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import ResultTable from './ResultTable'

// import actions
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'


export default function Result() {
  const dispatch = useDispatch()
  const {questions: {queue, answers}, result: {result, userId}} = useSelector(state => state)
  
  const totalPoints = queue.length * 10;  
  const attempts = attempts_Number(result)
  const earnPoints = earnPoints_Number(result, answers, 10)
  const flag = flagResult(totalPoints, earnPoints)

  // store user result
  usePublishResult({ result, username: userId, attempts, points: earnPoints, achieved: flag ? "Passed" : "Failed" });

  const onRestart = () => {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }
  return (
    <>
    <div className="container">
      <div className="row">
      <div className="col-md-7 mx-auto">
        <h1 className='text-center py-3 bg-dark text-light border border-5 border-success rounded'>Result</h1>
        
        {/* result box start */}
        <div className='border border-5 border-secondary rounded'>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Username : </span>
            <span>{userId}</span>
          </div>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Total Quiz Points : </span>
            <span>{ totalPoints || 0 }</span>
          </div>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Total Questions : </span>
            <span>{ queue.length || 0 }</span>
          </div>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Total Attempts : </span>
            <span>{ attempts || 0 }</span>
          </div>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Total Earn Points : </span>
            <span>{ earnPoints || 0 }</span>
          </div>
          <div className="d-flex justify-content-between px-5 py-1">
            <span>Quiz Result : </span>
            <span className={flag ? "text-success fw-bold" : "text-danger fw-bold"}>{flag ? "Passed" : "Failed"}</span>
          </div>
        </div>
        {/* result box end */}

        <div className='d-flex justify-content-center my-2'>
          <Link to="/home" className='btn btn-warning' onClick={onRestart}>Restart</Link>
        </div>

        <ResultTable />

      </div>
      </div>
    </div>
    </>
  )
}
