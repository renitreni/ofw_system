import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ContractDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const contract = location.state;

  if (!contract) {
    return <h5>No contract data</h5>;
  }

  return (
    <div className="container mt-4">
      <h3>Contract Details</h3>

      <div className="card p-4 mt-3">
        <h5>{contract.name}</h5>
        <p><b>Company:</b> {contract.company}</p>
        <p><b>Position:</b> {contract.position}</p>
        <p><b>Salary:</b> {contract.salary}</p>
        <p><b>Status:</b> {contract.status}</p>

        {contract.status === "pending" && (
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success">Approve</button>
            <button className="btn btn-danger">Reject</button>
          </div>
        )}

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
