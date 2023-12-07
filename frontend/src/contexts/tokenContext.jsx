import { createContext } from 'react';

const TokenContext = createContext({
    token: "",
    updateToken: () => {},
});

export default TokenContext;
 