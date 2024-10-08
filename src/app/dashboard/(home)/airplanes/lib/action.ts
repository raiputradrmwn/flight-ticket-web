"use server";

import { uploadFile } from "./../../../../../lib/supabase";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { log } from "console";

export async function saveAirplane(
  orevState: any,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);
    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }
  const uploadedFile = await uploadFile(values.data.image);
  console.log(uploadedFile);
  

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Error",
      errorDesc: ["Terjadi masalah saat upload gambar"],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to insert data",
      errorDesc: ["Terjadi masalah saat upload gambar"],
    };
  }
  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}
