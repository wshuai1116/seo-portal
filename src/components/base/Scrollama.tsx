// @ts-ignore
import { Scrollama as RawScrollama, Step as RawStep } from "react-scrollama";
import { isBrowser } from "@/utils/ssr";
import { FC } from "react";

const Noop: FC = ({ children }) => <>{children}</>;

export const Scrollama = isBrowser() ? RawScrollama : Noop;
export const Step = isBrowser() ? RawStep : Noop;
