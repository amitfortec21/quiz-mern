import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Custom Hook
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions( {onChecked} ) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  // useSelector(state => console.log(state))

  const questions = useSelector(state => state.questions.queue[state.questions.trace]);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(updateResult({ trace, checked }))
    // console.log({trace, checked});
  }, [checked]);

  const onSelect = (id) => {
    onChecked(id);
    setChecked(id);
  }

  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  return (
    <div className="container">
      <div className="row">
        <h2>{questions?.question}</h2>
        <ul key={questions?.id}>
          {questions?.options.map((item, id) => {
            return (
              <div key={id}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`item${id}-option`}
                  onChange={() => onSelect(id)}
                />
                <label htmlFor={`item${id}-option`}>&nbsp;{item}</label>
                <div className={`${result[trace] == id ? 'bg-success text-light' : 'bg-none text-light'}`}>You selected the above option</div>
                {/* {console.log(`Result of Question No. ${trace} is ${result[trace]}`)} */}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
