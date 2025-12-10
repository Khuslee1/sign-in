import { Dispatch, SetStateAction } from "react";

export type ChildProps = {
  setStep: Dispatch<SetStateAction<number>>;
};