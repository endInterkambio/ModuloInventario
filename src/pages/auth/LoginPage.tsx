import { FormEvent } from 'react';

export const LoginPage = () => {

  const onSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password,remember } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
      remember: { checked: boolean }
    };
    console.log(username.value, password.value, remember.checked);

    username.value = '';
    password.value = '';
    remember.checked = false;
  }


  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>

      <form onSubmit={ onSubmit }>

        <div className="mb-4">
          <label className="block text-gray-600">Usuario</label>
          <input type="text" name="username" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Contraseña</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="text-gray-600 ml-2">Recuérdame</label>
        </div>
        
        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" className="bg-[--color-primary] rounded-lg hover:bg-[--color-secondary] text-white hover:text-black">Ingresar</button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a href="#" className="hover:underline">Registrate aquí</a>
      </div>
    </>
  );
};