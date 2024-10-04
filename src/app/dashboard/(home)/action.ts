"use server";

import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<void> { // Change return type to void
    const { session } = await getUser();

    if (!session) {
        // Throw an error or handle the unauthorized case appropriately
        throw new Error("Unauthorized");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    redirect("/dashboard/signin"); // Perform the redirect
}
