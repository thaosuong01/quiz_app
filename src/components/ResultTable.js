import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

function ResultTable() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
      (res) => {
        setData(res);
      }
    );
  });

  return (
    <div>
      <table className="w-full my-4 border p-8">
        <thead className="bg-[#000] text-center">
          <tr>
            <td className="border border-[#212121]">Name</td>
            <td className="border border-[#212121]">Attemps</td>
            <td className="border border-[#212121]">Earn Points</td>
            <td className="border border-[#212121]">Result</td>
          </tr>
        </thead>
        <tbody className="bg-[#d8d8d8] text-center text-black">
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr key={i}>
              <td className="border border-[#212121]">{v?.username || ""}</td>
              <td className="border border-[#212121]">{v?.attempts || 0}</td>
              <td className="border border-[#212121]">{v?.points || 0}</td>
              <td className="border border-[#212121]">{v?.achived || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
