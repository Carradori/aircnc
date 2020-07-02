import React, { useState, useMemo } from "react";

import api from "../../services/api";
import camera from "../../assets/camera.svg";
import "./styles.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("userid");
    data.append("thumbnail", thumbnail);
    data.append("price", price);
    data.append("techs", techs);
    data.append("company", company);

    await api.post("/spot", data, {
      headers: { user_id },
    });
    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <img src={camera} alt="Selecionar imagem" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        name="company"
        id="company"
        placeholder="Sua empresa"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        type="text"
        name="techs"
        id="techs"
        placeholder="Quais tecnologias usam?"
        onChange={(e) => setTechs(e.target.value)}
        value={techs}
      />
      <label htmlFor="price">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        name="price"
        id="price"
        placeholder="Valor cobrado por dia"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
