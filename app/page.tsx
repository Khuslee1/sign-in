"use client";

import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import { First } from "./_component/First";
import { Second } from "./_component/Second";
import { Last } from "./_component/Last";
import { Third } from "./_component/Third";
import { motion, AnimatePresence } from "framer-motion";
export type StepContextType = {
  data: dataType;
  setData: Dispatch<SetStateAction<dataType>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType
);
export type dataType = {
  Firstname: string;
  Lastname: string;
  Username: string;
  Email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateBirth: Date;
  profile: string;
};

export default function ProfileForm() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<dataType>({
    Firstname: "",
    Lastname: "",
    Username: "",
    Email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dateBirth: new Date(""),
    profile: "",
  });
  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    if (localStorage.getItem("step") !== "4")
      return setStep(Number(localStorage.getItem("step")));
  }, []);
  useEffect(() => {
    localStorage.setItem("step", String(step));
  }, [step]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">
      <StepContext.Provider value={{ data, setData }}>
        <AnimatePresence mode="wait">
          {step == 1 ? (
            <motion.div
              key="1"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <First setStep={setStep} />
            </motion.div>
          ) : step == 2 ? (
            <motion.div
              key="2"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Second setStep={setStep} />
            </motion.div>
          ) : step == 3 ? (
            <motion.div
              key="3"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Third setStep={setStep} />
            </motion.div>
          ) : (
            <motion.div
              key="4"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Last />
            </motion.div>
          )}
        </AnimatePresence>
      </StepContext.Provider>
    </div>
  );
}
