//react
import React, { useState } from "react";
import { createContext } from "react";

//archivos externos
import Cookies from "universal-cookie";
import axios from "axios";
import exito from "../alerts/exito.js";

export const store = createContext();
const ContextApp = (props) => {
  const cookies = new Cookies();

  const [confirmacion, setConfirmacion] = useState(false);

  //abrir menu lateral
  const [abrirMenu, setAbrirMenu] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);

  const [raws, setRaws] = useState([]);
  const [rawsCopy, setRawsCopy] = useState([]);

  const [processed, setprocessed] = useState([]);
  const [processedCopy, setprocessedCopy] = useState([]);

  const [pizzas, setPizzas] = useState([]);
  const [pizzasCopy, setPizzasCopy] = useState([]);

  const [sales, setSales] = useState([]);
  const [salesCopy, setSalesCopy] = useState([]);

  //abrir menu lateral
  const handleOpenMenu = () => {
    setAbrirMenu(!abrirMenu);
  };

  const CrearCookie = (valor1, valor2, valor3) => {
    cookies.set("logeado", valor1, { path: "/" });
    cookies.set("usuario", valor2, { path: "/" });
    cookies.set("cargo", valor3, { path: "/" });
    setConfirmacion(!confirmacion);
  };

  const EliminarCookie = () => {
    cookies.remove("logeado");
    cookies.remove("usuario");
    cookies.remove("cargo");

    setConfirmacion(!confirmacion);
  };

  //funciones de usuarios

  const getUsers = async () => {
    try {
      const {
        data: { users },
      } = await axios.get("https://caprichos-backend.onrender.com/get/users");
      setUsers(users);
      setUsersCopy(users);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar  consultar los usuarios: ${error}`
      );
    }
  };

  const createUser = async ({ user, password, position }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/create/user", {
        user,
        password,
        position,
      });

      exito();
      getUsers();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar el usuario: ${error}`
      );
    }
  };

  const updateUser = async ({ _id, user, password, position }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/update/user", {
        _id,
        user,
        password,
        position,
      });

      exito();
      getUsers();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el usuario: ${u}`
      );
    }
  };

  const deleteUser = async (_id) => {
    await axios.post("https://caprichos-backend.onrender.com/delete/user", {
      _id,
    });

    exito();
    getUsers();
  };

  const searchUsers = (user) => {
    let filteredUsers = users.filter((user) => {
      return user.user.toLowerCase().includes(user);
    });

    if (user == "") {
      setUsersCopy(users);
    } else {
      setUsersCopy(filteredUsers);
    }
  };

  const validateUser = async (user, password) => {
    try {
      const {
        data: { isUser },
      } = await axios.post("https://caprichos-backend.onrender.com/validate/user", {
        user,
        password,
      });

      return isUser;
    } catch (error) {
      console.log(
        `ocurrio un error  en le frontend al intentar enviar los datos del usuario para ser validado: ${error} `
      );
    }
  };

  const validatePosition = async (user) => {
    try {
      const {
        data: { position },
      } = await axios.post("https://caprichos-backend.onrender.com/validate/position", {
        user,
      });

      return position;
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar validar el cargo: ${error} `
      );
    }
  };

  const createRaw = async ({ name, totalCost, totalWeight, portionWeight }) => {
    try {
      await axios.post(
        "https://caprichos-backend.onrender.com/create/raw",

        {
          name,
          totalCost,
          totalWeight,
          portionWeight,
          portionsQuantity: totalWeight / portionWeight,
          portionCost: totalCost / (totalWeight / portionWeight),
        }
      );
      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo hacia el backend: ${error}`
      );
    }
  };

  const getRaws = async () => {
    try {
      const {
        data: { raws },
      } = await axios.get("https://caprichos-backend.onrender.com/get/raws");

      setRaws(raws);
      setRawsCopy(raws);
    } catch (error) {
      console.log(
        `ocurrio un error al intentar consultar los datos de los productos crudos en el frontend: ${error}`
      );
    }
  };

  const updateRaw = async ({
    _id,
    totalCost,
    name,
    totalWeight,
    portionWeight,
  }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/update/raw", {
        _id,
        name,
        totalCost,
        totalWeight,
        portionWeight,
        portionsQuantity: totalWeight / portionWeight,
        portionCost: totalCost / (totalWeight / portionWeight),
      });

      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar enviar los datos del producto crudo para ser editado: ${error}`
      );
    }
  };

  const deleteRaw = async (_id) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/delete/raw", {
        _id,
      });

      exito();
      getRaws();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar el crudo. ${error}`
      );
    }
  };

  const searchRaws = (element) => {
    let filteredRaws = raws.filter((raw) => {
      return raw.name.toLowerCase().includes(element.toLowerCase());
    });

    if (element == "") {
      setRawsCopy(raws);
    } else {
      setRawsCopy(filteredRaws);
    }
  };

  const createProcessed = async ({
    name,
    quantity,
    ingredients,
    portionCost,
  }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/create/processed", {
        name,
        quantity,
        ingredients,
        portionCost,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al agregar un producto procesado: ${error} `
      );
    }
  };

  const getProcessed = async () => {
    try {
      const {
        data: { processed },
      } = await axios.get("https://caprichos-backend.onrender.com/get/processed");

      setprocessed(processed);
      setprocessedCopy(processed);
    } catch (error) {
      console.log(
        `ocurrio un error en el frotend al intentar consultar los productos procesados: ${error}`
      );
    }
  };

  const updateProcessed = async ({
    _id,
    name,
    quantity,
    ingredients,
    portionCost,
  }) => {
    try {
      axios.post("https://caprichos-backend.onrender.com/update/processed", {
        _id,
        name,
        quantity,
        ingredients,
        portionCost,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar el producto procesado`
      );
    }
  };

  const deleteProcessed = async (_id) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/delete/processed", {
        _id,
      });

      exito();
      getProcessed();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar un producto procesado: ${eliminar}`
      );
    }
  };

  const searchProcessed = (name) => {
    const filteredProcessed = processed.filter((processedd) => {
      return processedd.name.toLowerCase().includes(name.toLowerCase());
    });

    if (name == "") {
      setprocessedCopy(processed);
    } else {
      setprocessedCopy(filteredProcessed);
    }
  };

  const createPizza = async ({ name, cost, ingredients }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/create/pizza", {
        name,
        cost,
        ingredients,
      });

      exito();
      getPizzas();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar una pizza: ${error} `
      );
    }
  };

  const getPizzas = async () => {
    try {
      const {
        data: { pizzas },
      } = await axios.get("https://caprichos-backend.onrender.com/get/pizzas");

      setPizzas(pizzas);
      setPizzasCopy(pizzas);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las  pizzas: ${error}`
      );
    }
  };

  const updatePizza = async ({ _id, name, cost, ingredients }) => {
    await axios.post("https://caprichos-backend.onrender.com/update/pizza", {
      _id,
      name,
      cost,
      ingredients,
    });

    exito();
    getPizzas();

    try {
    } catch (error) {
      console.log(
        `ocurrrio un error en el frontend al intentar editar la pizza: ${error} `
      );
    }
  };

  const deletePizza = async (_id) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/delete/pizza", {
        _id,
      });

      exito();
      getPizzas();
    } catch (error) {
      console.log(
        `ocurriro un error en el frontend al intentar eliminar la pizza: ${error}`
      );
    }
  };

  const searchPizzas = (name) => {
    const filteredPizzas = pizzas.filter((iterador) => {
      return iterador.name.toLowerCase().includes(name.toLowerCase());
    });

    if (name == "") {
      setPizzasCopy(pizzas);
    } else {
      setPizzasCopy(filteredPizzas);
    }
  };

  const getSales = async () => {
    try {
      const {
        data: { sales },
      } = await axios.get("https://caprichos-backend.onrender.com/get/sales");

      setSales(sales);
      setSalesCopy(sales);
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar consultar las ventas`
      );
    }
  };

  const createSale = async (
    date,
    customerData,
    transactionData,
    hour,
    isSale
  ) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/create/sale", {
        date,
        customerData,
        transactionData,
        hour,
        isSale,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar agregar la preventa o venta: ${error}`
      );
    }
  };

  const updateSale = async (_id, customerData, transactionData) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/update/sale", {
        _id,
        customerData,
        transactionData,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar editar la venta: ${error}`
      );
    }
  };

  const deleteSale = async ({ _id }) => {
    try {
      await axios.post("https://caprichos-backend.onrender.com/delete/sale", {
        _id,
      });

      exito();
      getSales();
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar eliminar la preventa: ${error}`
      );
    }
  };

  const confirmSale = async (_id, customerPay, returned) => {
    await axios.post("https://caprichos-backend.onrender.com/confirm/sale", {
      _id,
      customerPay,
      returned,
    });

    exito();
    getSales();

    try {
    } catch (error) {
      console.log(
        `ocurrio un error en el frontend al intentar confirmar la preventa: ${error}`
      );
    }
  };

  const searchSales = (dato) => {
    let filteredSales;

    if (dato == "") {
      setSalesCopy(sales);
    } else {
      filteredSales = sales.filter((sale) => {
        if (sale.date.includes(dato)) {
          return sale;
        } else if (sale.hour.toLowerCase().includes(dato.toLowerCase())) {
          return sale;
        } else if (
          sale.customerData.name.toLowerCase().includes(dato.toLowerCase())
        ) {
          return sale;
        } else if (
          sale.customerData.cedula
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return sale;
        } else if (
          sale.transactionData.total
            .toString()
            .toLowerCase()
            .includes(dato.toString().toLowerCase())
        ) {
          return sale;
        }
      });

      setSalesCopy(filteredSales);
    }
  };

  //funciones de caja

  return (
    <store.Provider
      value={{
        abrirMenu,
        handleOpenMenu: handleOpenMenu,

        cookies,
        CrearCookie: CrearCookie,
        EliminarCookie: EliminarCookie,

        createUser,
        getUsers,
        updateUser,
        deleteUser,
        searchUsers,
        users,
        usersCopy,
        validateUser,
        validatePosition,

        createRaw,
        getRaws,
        updateRaw,
        deleteRaw,
        searchRaws,
        raws,
        rawsCopy,

        createProcessed,
        getProcessed,
        updateProcessed,
        deleteProcessed,
        searchProcessed,
        processed,
        processedCopy,

        createPizza,
        getPizzas,
        updatePizza,
        deletePizza,
        searchPizzas,
        pizzas,
        pizzasCopy,

        createSale,
        getSales,
        updateSale,
        deleteSale,
        confirmSale,
        searchSales,
        sales,
        salesCopy,
      }}
    >
      {props.children}
    </store.Provider>
  );
};

export default ContextApp;
