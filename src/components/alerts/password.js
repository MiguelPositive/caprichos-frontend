import Swal from "sweetalert2";

const password = () => {
  Swal.fire({
    position: "center",
    icon: "info",
    text: "usuario: admin, contraseña: admin",
    confirmButtonColor: "#57B134",
  });
};

export default password;
