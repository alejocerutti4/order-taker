import {createContext} from 'react'

const PrecioCartaContext = createContext({
    precioCarta: [],
    setPrecioCarta: () => []
});

const PrecioPromocionesContext= createContext({
    precioPromociones: [],
    setPrecioPromociones: () => []
});

export {PrecioCartaContext, PrecioPromocionesContext};