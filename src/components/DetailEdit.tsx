import { usePE } from "@/store/usePE";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";

export default function DetailEdit() {
  const productinfo = usePE((state) => state.productsinfo);
  const id = productinfo.id;
  const fieldname = usePE((state) => state.fieldname);
  const details = JSON.parse(productinfo.details);
  const [newdetails, setnewdetails] = useState(details);
  const [detailcheck, setdetailcheck] = useState([details[0].detailname, 0]);
  const [inputname, setinputname] = useState();
  const [inputvalue, setinputvalue] = useState();
  const [flipvalue, setflipvalue] = useState(false);
  const [flipvalue2, setflipvalue2] = useState(false);
  async function mutate() {
    try {
      const Editinput = newdetails;

      const res = await fetch("http://localhost:3000/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Editinput, id, fieldname }),
      });
      if (res.ok) {
        return res.json();
      }
    } catch (error) {}
  }
  const mutation = useMutation(mutate);
  const showdetails = details.map((item, index) => {
    return (
      <tr className=" " key={item.detailname}>
        <th className=" p-2 border-2 border-black">{item.detailname}:</th>
        <th className=" p-2 border-2 border-black ">{item.detailvalue}</th>
        <th>
          <input
            type="radio"
            value={item.detailname}
            checked={detailcheck[0] == item.detailname}
            onChange={(e) => {
              setflipvalue(false);
              setflipvalue2(false);
              setdetailcheck([e.target.value, index]);
            }}
          />
        </th>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>مشخصه</th>
            <th>توصیف</th>
          </tr>
        </thead>
        <tbody>{showdetails}</tbody>
      </table>
      {detailcheck[0]}

      <div className="mr-2">
        <Label>مشخصه</Label>
        <Input
          className="w-1/2"
          type="text"
          value={inputname}
          onChange={(e) => setinputname(e.target.value)}
        />
        <Label>توصیف</Label>
        <Input
          className="w-1/2"
          type="text"
          value={inputvalue}
          onChange={(e) => setinputvalue(e.target.value)}
        />
        {flipvalue && newdetails[detailcheck[1]].detailname}
        <div className="flex space-x-4">
          <Button
            className="m-2"
            onClick={() => {
              const thedetailspliced = details.toSpliced(detailcheck[1], 1, {
                detailname: inputname,
                detailvalue: inputvalue,
              });
              setnewdetails(thedetailspliced);
              setflipvalue(true);
            }}
          >
            تغییر
          </Button>

          <Button
            className="m-2"
            onClick={() => {
              setflipvalue(false);
              const deletedeatil = details.toSpliced(detailcheck[1], 1);
              setnewdetails(deletedeatil);
              setflipvalue2(true);
            }}
            variant={"destructive"}
          >
            حذف{flipvalue2 && <CheckIcon className="text-green-600 " />}
          </Button>
        </div>
      </div>

      <Button onClick={mutation.mutate}>
        ثبت تغییرات
        {mutation.isLoading && (
          <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />
        )}
        {mutation.isSuccess && <CheckIcon className="text-green-600 " />}
      </Button>
    </div>
  );
}
