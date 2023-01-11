import React from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { setUserId } from '../redux/result_reducer';

export default function Home() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function startQuiz(){
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value));
      navigate("/quiz");
    }else{
      alert("Username required...!")
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto">
            <h1 className='text-center py-3 bg-dark text-light border border-5 border-success rounded'>Quiz Application</h1>
            <p className='fw-bold'>Instructions:</p>
            <ol>
              <li>You will be asked 10 questions one after another.</li>
              <li>10 points is awarded for the correct answer.</li>
              <li>Each question has three options. You can choose only one option.</li>
              <li>You can review and change answers before the quiz finish.</li>
              <li>The result will be declared at the end of the project.</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mx-auto">
          <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" ref={inputRef} className="form-control" id="username" placeholder='Username' />
              </div>
              <div>
                <button className="btn btn-warning fw-bold" onClick={startQuiz}>Start Quiz</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
