import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response = await fetch(
    "https://0jqh6egbsi.execute-api.us-east-1.amazonaws.com/dev/v1/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
  const { data } = await response.json();
  console.log('DATA RESPONSE =>', data);
  if (!data.authorization) {
    return NextResponse.json({ message: "Usuario o Contraseña incorrecta" }, { status: 401 });
  }
  // Deberiamos validar el token o algo @Ruben?

  const res = NextResponse.json({ message: "Ok" }); // Esto no es necesario

  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 día

  cookieStore.set("authToken", data.authorization, {
    httpOnly: true,
    secure: false, //process.env.NODE_ENV === "prod",
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });

  return res;
}
