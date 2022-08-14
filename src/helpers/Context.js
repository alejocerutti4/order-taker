import {createContext} from 'react'

const PrecioCartaContext = createContext({
    precioCarta: [],
    setPrecioCarta: () => []
});

const PrecioPromocionesContext= createContext({
    precioPromociones: [],
    setPrecioPromociones: () => []
});

const LogueadoContext = createContext({
    isLogged: false,
    setIsLogged: () => false  
});

export {PrecioCartaContext, PrecioPromocionesContext, LogueadoContext};