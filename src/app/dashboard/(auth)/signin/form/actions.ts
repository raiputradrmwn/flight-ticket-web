"use server";
import { lucia } from "../../../../../lib/auth";
import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import prisma from "../../../../../../lib/prisma";

export interface ActionResult {
  errorTitle: string | null;
  errorDesc: string[] | null;
}

export async function handelSignIn(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const values = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);
    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const exitingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });
  if (!exitingUser) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email not found"],
    };
  }

  const validPassword = await bcrypt.compare(
    values.data.password,
    exitingUser.password
  );
  if (!validPassword) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email / Password is incorrect"],
    };
  }

  const session = await lucia.createSession(exitingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard");
}
