"use server"

import { redirect } from "next/navigation"
import { formSchema } from "./validation"

export interface ActionResult {
    errorTitle: string | null
    errorDesc: string[] | null
}
export async function handelSignIn(prevState: any, formData : FormData): Promise<ActionResult> {
    console.log(formData.get("email"))
    const values = formSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!values.success) {
        const errorDesc = values.error.issues.map((issue) => issue.message)
        return {
            errorTitle: "Error Validation",
            errorDesc
        }
    }
    return redirect ("/dashboard/signin")
}