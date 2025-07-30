import { ReactElement } from "react";

export default function FloatingOrbs(): ReactElement {
  return (
    <>
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500/30 rounded-full animate-bounce delay-300" />
      <div className="absolute -top-8 right-8 w-6 h-6 bg-yellow-500/40 rounded-full animate-bounce delay-700" />
      <div className="absolute -bottom-4 left-12 w-10 h-10 bg-purple-500/25 rounded-full animate-bounce delay-1000" />
      <div className="absolute -bottom-8 -right-4 w-7 h-7 bg-blue-500/35 rounded-full animate-bounce delay-500" />
    </>
  );
}
