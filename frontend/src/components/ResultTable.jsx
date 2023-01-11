import { useState, useEffect } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData("http://localhost:7000/api/result", (res) => {
      setData(res);
    });
  });

  return (
    <>
      <table className="table table-light table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No data Found</div>}
          {data.map((item, id) => {
            return (
              <tr key={id}>
                <td>{item?.username || ""}</td>
                <td>{item?.attempts || 0}</td>
                <td>{item?.points || 0}</td>
                <td>{item?.achieved || ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
