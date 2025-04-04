import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";
const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState();
  const colors = [
    "#884A39",
    "#C38154",
    "#FFc26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "##FF0060",
    "#22A699",
  ];

  //get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API("/analytics/bloodgroupdata");
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //lifecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getRecentBlood = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecentBlood();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h5 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h5>
              <p className="card-text">
                Total In: <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out: <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Available Blood: <b>{record.availableBlood}</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-2">
        <h1>Recent Blood Group Used</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time and Date </th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
