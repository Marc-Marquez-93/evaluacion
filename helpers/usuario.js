export const parseRol = (rol) => {
  switch (Number(rol)) {
    case 0:
      return "comprador";
    case 1:
      return "vendedor";
    case 2:
      return "admin";
    default:
      break;
  }
};

export const parseEstado = (estado) => {
  switch (Number(estado)) {
    case 0:
      return "pendiente";
    case 1:
      return "pagada";
    case 2:
      return "enviada";
    case 3:
      return "entregada";
    case 4:
      return "cancelada";
    default:
      break;
  }
};
