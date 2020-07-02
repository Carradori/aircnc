import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [req, setReq] = useState([]);

  const user_id = localStorage.getItem("userid");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", (data) => {
      setReq([...req, data]);
    });
  }, [req, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("userid");
      const response = await api.get("/profile", {
        headers: { user_id },
      });
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setReq(req.filter((request) => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setReq(req.filter((request) => request._id !== id));
  }
  return (
    <>
      <ul className="notifications">
        {req.map((reqs) => (
          <li key={reqs._id}>
            <p>
              <strong>{reqs.user.email}</strong> está solicitando uma reserva em{" "}
              <strong>{reqs.spot.company}</strong> para a data:{" "}
              <strong>{reqs.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(reqs._id)}>
              ACEITAR
            </button>
            <button className="reject" onClick={() => handleReject(reqs._id)}>
              REJEITAR
            </button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
