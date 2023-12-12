import { useContext } from "react";
import TokenContext from "../contexts/tokenContext";

export const currentUser = () => {
    const api = useContext(TokenContext.token);
    return api;
  };
