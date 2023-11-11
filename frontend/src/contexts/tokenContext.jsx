import { createContext } from 'react';

const TokenContext = createContext({
    token: null,
    updateToken: () => {},
});

export default TokenContext;
 