const ordenarSandwichs = (sandwichs) => {
    // lomos goes first, then hamburguesa, then sandwich then mila. to do this we need to sort the sandwichs by looking the word into the name of the sandwich.
    const lomos = sandwichs.filter(sandwich => sandwich.includes('Lomo'));
    const hamburguesa = sandwichs.filter(sandwich => sandwich.includes('Hambur'));
    const sandwich = sandwichs.filter(sandwich => sandwich.includes('Sandwich'));
    const mila = sandwichs.filter(sandwich => sandwich.includes('Mila') && !sandwich.includes('Sandwich'));
    const orden = [...lomos, ...hamburguesa, ...sandwich, ...mila];


    return orden;
} 

const ordenarPizzas = (pizzas) => {
    // we have to separate the pizzas by the pizzas that have the word 'Media' and the pizzas that don't have the word 'Media'
    const media = pizzas.filter(pizza => pizza.includes('Media')).sort();
    const sinMedia = pizzas.filter(pizza => !pizza.includes('Media')).sort();
    const orden = intercalar(sinMedia, media);
    return orden;
    
}

const ordenarBebidas = (bebidas) => {
    // we have to separate the bebidas that have the word 'Vino' from the bebidas that don't have the word 'Vino'
    const vino = bebidas.filter(bebida => bebida.includes('Vino')).sort();
    const sinVino = bebidas.filter(bebida => !bebida.includes('Vino')).sort();
    const orden = [...sinVino, ...vino];
    return orden;
}

const ordenarProductos = (productos) => {
    // we have to sort the products by type
    const empanadas = productos.filter(producto => producto.tipo === 'empanada');
    const sandwichs = productos.filter(producto => producto.tipo === 'sandwich');
    console.log(sandwichs)
    const pizzas = productos.filter(producto => producto.tipo === 'pizza');
    const bebidas = productos.filter(producto => producto.tipo === 'bebida');
    const orden = [...empanadas, ...sandwichs, ...pizzas, ...bebidas];
    return orden;
}

const intercalar = (array1, array2) => {
    const array3 = [];
    for (let i = 0; i < array1.length; i++) {
        array3.push(array1[i]);
        array3.push(array2[i]);
    }
    return array3;
}
export { ordenarSandwichs, ordenarPizzas, ordenarBebidas, ordenarProductos };