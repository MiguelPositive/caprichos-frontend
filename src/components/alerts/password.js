import Swal from "sweetalert2";

const exito = () => {
  Swal.fire({
    position: "center",
    icon: "info",
    text: "usuario: admin, contraseña: admin",
    confirmButtonColor: "#57B134",
  });
};

export default password;
