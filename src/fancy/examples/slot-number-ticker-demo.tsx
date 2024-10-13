import React from "react";
import { SlotNumberTicker } from "@/fancy/components/text/slot-number-ticker";

const NumberTickerSlotDemo = () => {
  return (
    <div className="p-10">
      <SlotNumberTicker
        from={0}
        target={100}
        duration={3000}
        direction="alternate"
        className="text-4xl font-bold"
      />
    </div>
  );
};

export default NumberTickerSlotDemo;