import React from "react";
import { Waveform } from "@uiball/loaders";

export default function Loader() {
  return (
    <div className="h-screen flex justify-center">
      <div className="mt-36">
        <Waveform size={25}/>
      </div>
    </div>
  );
}
