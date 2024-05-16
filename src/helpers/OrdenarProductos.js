const ordenarSandwichs = (sandwichs) => {
    const lomos = sandwichs.filter(sandwich => sandwich.includes('Lomo'));
    const hamburguesa = sandwichs.filter(sandwich => sandwich.includes('Hambur'));
    const sandwich = sandwichs.filter(sandwich => sandwich.includes('Sandwich'));
    const mila = sandwichs.filter(sandwich => sandwich.includes('Mila') && !sandwich.includes('Sandwich'));
    const rest = sandwichs.filter(sandwich => !sandwich.includes('Lomo') && !sandwich.includes('Hambur') && !sandwich.includes('Sandwich') && !sandwich.includes('Mila'));
    const orden = [...lomos, ...hamburguesa, ...sandwich, ...mila, ...rest];
    return orden;
} 

const ordenarPizzas = (pizzas) => {
    const media = pizzas.filter(pizza => pizza.includes('Media')).sort();
    const sinMedia = pizzas.filter(pizza => !pizza.includes('Media')).sort();
    const orden = intercalar(sinMedia, media);
    return orden;
    
}

const ordenarEmpanadas = (empanadas) => {
    const orden = empanadas.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
    return orden;
}

const ordenarBebidas = (bebidas) => {
    const vino = bebidas.filter(bebida => bebida.includes('Vino')).sort();
    const sinVino = bebidas.filter(bebida => !bebida.includes('Vino')).sort();
    const orden = [...sinVino, ...vino];
    return orden;
}

const ordenarProductos = (productos) => {
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
export { ordenarSandwichs, ordenarPizzas, ordenarBebidas, ordenarProductos, ordenarEmpanadas };