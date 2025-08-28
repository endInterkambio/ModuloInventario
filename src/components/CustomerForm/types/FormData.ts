export interface FormData {
  tipoCliente: "empresarial" | "individuo";
  contactoPrincipal: {
    nombre: string;
    apellido: string;
  };
  ruc?: string;
  dni?: string;
  ce?: string;
  nombreEmpresa: string;
  email: string;
  telefono: {
    laboral: string;
    movil: string;
  };
}
