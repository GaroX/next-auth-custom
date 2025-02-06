"use client"

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function Login() {
  const router = useRouter()
  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: { email: 'admin@dprimero.com', password: 'oxc45qGa3dsN9pg' },
    validationSchema: signInSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const response = await fetch(
          "https://0jqh6egbsi.execute-api.us-east-1.amazonaws.com/dev/v1/login",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        );
        const { data } = await response.json()

        console.log('Response =>', data);
        router.push("/");
      } catch (error) {
        console.log('Error =>', JSON.stringify(error));
      }
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>LOGIN</h1>
      <form onSubmit={formik.handleSubmit}>
        <h3 className="mb-6 is-size-3 has-text-weight-semibold">Inicia sesión</h3>
        <div className="field">
          <input
            className="input is-medium"
            type="email"
            placeholder="nombre@correo.com"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className="help is-danger">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""}
          </p>
        </div>
        <div className="field">
          <input
            className="input is-medium"
            type="password"
            placeholder="******"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <p className="help is-danger">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""}
          </p>
        </div>
        <button className="button is-primary is-medium is-fullwidth mb-4"
          type="submit"
          disabled={!formik.isValid}>
          Ingresa
        </button>
      </form>
    </div>
  );
}
