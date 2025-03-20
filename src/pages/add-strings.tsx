import { useState } from "react";

function sumStrings(a: string | null | undefined, b: string | null | undefined) {
  a ??= "0";
  b ??= "0";

  a = a.split("").reverse().join("");
  b = b.split("").reverse().join("");

  const len = Math.max(a.length, b.length);

  let carry = 0;
  let out = "";

  for (let i = 0; i < len || carry; i++) {
    const aDigit = Number(a[i] || "0");
    const bDigit = Number(b[i] || "0");

    const localSum = aDigit + bDigit + carry;

    out += localSum % 10;
    carry = localSum / 10 >= 1 ? 1 : 0;
  }

  return out;
}

function StringAdder() {
  const [a, setA] = useState<string>();
  const [b, setB] = useState<string>();

  return (
    <div>
      <h2>String Adder</h2>
      <h4>Sum: {sumStrings(a, b)}</h4>
      <h5>Expected: {BigInt(a || 0) + BigInt(b || 0)}</h5>
      <div>
        <input
          type={"number"}
          onChange={(event) => {
            setA(event.target.value);
          }}
          value={a}
        />
      </div>
      <div>
        <input
          type={"number"}
          onChange={(event) => {
            setB(event.target.value);
          }}
          value={b}
        />
      </div>
    </div>
  );
}

export default function AddStrings() {
  return (
    <div id={"add-strings"}>
      <StringAdder />
    </div>
  );
}
