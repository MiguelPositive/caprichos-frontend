//react
import React from "react";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

const BotonEliminarPreventa = styled(Paper)({
  borderRadius: "3rem",
  height: "2.5rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontWeight: "bold",
  cursor: "pointer",
});

const EliminarPreventa_boton = ({ accion }) => {
  return (
    <BotonEliminarPreventa onClick={accion}>
      Eliminar Preventa
    </BotonEliminarPreventa>
  );
};

export default EliminarPreventa_boton;
