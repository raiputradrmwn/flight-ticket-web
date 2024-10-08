"use client";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FC } from "react";
import { saveAirplane } from "../lib/action";
import { useFormState, useFormStatus } from "react-dom";

// interface FormAirplaneProps {

// }
const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
}
const SubmitButton = () => {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending} className="w-full">
      Submit
    </Button>
  );
}
const FormAirplane: FC = () => {
  const [state, formAction] = useFormState(saveAirplane, initialFormState);
  return (
    <form className="w-[40%] space-y-4" action={formAction}>
      {state.errorTitle !== null && (
          <div className="my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((values, index) => (
              <li key={index + values}>{values}</li>   
            ))}
          </ul>
        </div>
        )}
      <div className="space-y-2">
        <Label htmlFor="code">Kode Pesawat</Label>
        <Input placeholder="kode pesawat..." name="code" id="code" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nama Pesawat</Label>
        <Input placeholder="nama pesawat..." name="name" id="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Foto</Label>
        <Input
          type="file"
          placeholder="Upload foto..."
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg, image/jpeg"
          required
        />
      </div>
      <SubmitButton/>
    </form>
  );
};

export default FormAirplane;


