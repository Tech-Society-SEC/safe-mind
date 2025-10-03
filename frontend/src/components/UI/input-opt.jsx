// SafeMindOTP.jsx
import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

export default function SafeMindOTP({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (onChange) onChange(newOtp.join(""));
  };

  return (
    <InputOTPGroup className="justify-center gap-2">
      {otp.map((char, index) => (
        <React.Fragment key={index}>
          {index > 0 && <InputOTPSeparator />}
          <InputOTPSlot
            index={index}
            value={char}
            onChange={(e) => handleChange(index, e.target.value)}
            className="bg-background text-foreground rounded-md border border-border focus:ring-2 focus:ring-primary"
          />
        </React.Fragment>
      ))}
    </InputOTPGroup>
  );
}

// Usage Example
/*
<SafeMindOTP
  length={6}
  onChange={(otp) => console.log("Entered OTP:", otp)}
/>
*/
