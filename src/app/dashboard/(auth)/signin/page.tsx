import React, { FC } from "react";
import { Metadata } from "next";
import FormSignIn from "./form";

interface SignInPageProps {

}

export const metadata: Metadata = {
    title: "Dashboard | Sign in",
}

const SignInPage: FC<SignInPageProps> = ({}) => {
    return (
        <FormSignIn />
    );
};

export default SignInPage;