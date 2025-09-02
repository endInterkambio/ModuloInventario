import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const { loginUser, loading, error, token } = useAuthStore();
  const navigate = useNavigate();

  // Redirigir si ya hay token
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, remember } =
      event.target as typeof event.target & {
        username: { value: string };
        password: { value: string };
        remember: { checked: boolean };
      };

    // Validaciones personalizadas
    if (!username.value.trim()) {
      toast.error("El campo Usuario es obligatorio");
      return;
    }

    if (!password.value.trim()) {
      toast.error("El campo Contraseña es obligatorio");
      return;
    }

    try {
      await loginUser(username.value, password.value);
      username.value = "";
      password.value = "";
      remember.checked = false;

      toast.success("Login exitoso!");
      navigate("/dashboard");
    } catch {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>

      <div className="mb-4">
        <label className="block text-gray-600">
          Usuario <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input type="checkbox" name="remember" className="text-blue-500" />
        <label className="text-gray-600 ml-2">Recuérdame</label>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-[--color-primary] rounded-lg hover:bg-[--color-secondary] text-white hover:text-black w-full py-2"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};
