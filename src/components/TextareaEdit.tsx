import { usePE } from "@/store/usePE";
import { useState } from "react";
import { Label } from "./ui/label";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";

export default function TextareaEdit() {
  const fieldname = usePE((state) => state.fieldname);
  const productinfo = usePE((state) => state.productsinfo);
  const [Editinput, setEditinput] = useState("");
  const id = productinfo.id;

  const thefieldvalue =
    fieldname == "توضیح کوتاه" ? productinfo.synopsis : productinfo.description;
  async function mutate() {
    try {
      const res = await fetch("http://localhost:3000/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Editinput, fieldname, id }),
      });
      if (res.ok) {
        return res.json();
      }
    } catch (error) {}
  }
  const mutation = useMutation(mutate);
  return (
    <div className="flex flex-col space-x-4 items-center ">
      <div className="flex space-x-4 items-center ">
        <Label className="m-4  ">{fieldname}</Label>
        <Textarea
          className="w-[40vw] my-1 shadow-lg"
          name={fieldname}
          value={Editinput}
          onChange={(e) => setEditinput(e.target.value)}
        />
      </div>
      <Button type="button" className=" my-auto" onClick={mutation.mutate}>
        ثبت تغیر
        {mutation.isLoading && (
          <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />
        )}
        {mutation.isSuccess && <CheckIcon className="text-green-600 " />}
      </Button>

      <p className=" w-[50vw]">{thefieldvalue}</p>
    </div>
  );
}
