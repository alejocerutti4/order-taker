import jsPDF from 'jspdf';

const hayTipoProducto = (productos, tipoProducto) => {
    return productos.filter(producto => producto.tipoProducto === tipoProducto).length > 0;
}

const getHora = () => {
    const now = new Date();
    const date = parseDate(now.getHours()) + ":" + parseDate(now.getMinutes())
    return date
};

const parseDate = (value) => {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
};

const ordenarProductosAlfabeticamente = (productos) => {
    return productos.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    
}

export const imprimirPedido = (notas, productos, datosCliente, cantidadEmpanadas, total) => {
    
    // flags para saber el largo del ticket
    const flagEmpanadas = hayTipoProducto(productos, 'empanada');
    const flagSandwichs = hayTipoProducto(productos, 'sandwich');
    const flagPizzas = hayTipoProducto(productos, 'pizza');
    const flagBebidas = hayTipoProducto(productos, 'bebida');
    const flagNotas = notas.length > 0;
    const flagDireccion = datosCliente.calle.length > 0;

    const largoEmpanadas = flagEmpanadas ? 8 : 0;
    const largoSandwichs = flagSandwichs ? 8 : 0;
    const largoPizzas = flagPizzas ? 8 : 0;
    const largoBebidas = flagBebidas ? 8 : 0;
    const largoNotas = flagNotas ? 8 : 0;
    const largoDireccion = flagDireccion ? 4 : 0;

    const cantidadKeys = productos.length
    const alturaTicket = 56 + largoEmpanadas + largoDireccion + largoSandwichs + largoPizzas + largoBebidas + largoNotas + (cantidadKeys * 4.5)
    
    const productosOrdenados = ordenarProductosAlfabeticamente(productos);

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [55.28, alturaTicket],

    });
    const left = 7;
    const center = 16
    const right = 18;
    // Create a template for a receipt
    // An image first
    doc.addImage('./logo_abuela2.jpg', 'JPG', 8, 5, 38, 10);
    doc.setFontSize(10);
    doc.setFont('helvetica');

    doc.setFontSize(6);
    doc.text(left, 20, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(center, 23, 'Datos Cliente');
    doc.setFontSize(6);
    doc.text(left, 24, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(left, 27, `Nombre: ${datosCliente.nombre}`);
    doc.setFont(undefined, 'normal');

    let calle = "";
    let ciudad = "";
    try{
        const array = datosCliente.calle.split('-')
        calle = array[0]
        ciudad = array[1] ? array[1] : ""
    }catch(e){
        calle = datosCliente.calle.label
    }
    let acum = 31;
    if(flagDireccion){
        doc.setFont(undefined, 'bold');
        doc.text(left, 31, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}`, {
            maxWidth: 44
        });
        acum = 39
        doc.setFont(undefined, 'normal');

    }
    
    if (datosCliente.dpto !== '') {
        doc.text(left, acum, `Dpto: ${datosCliente.dpto}`);
        if(datosCliente.telefono !== ''){
            doc.text(left, acum + 4, `Telefono: ${datosCliente.telefono}`);
            doc.text(left, acum + 8, `Hora: ${getHora()}`);
            acum += 10;
        }else{
            doc.text(left, acum + 4, `Hora: ${getHora()}`);
            acum += 6;
        }

    } else {
        if(datosCliente.telefono !== ''){
            doc.text(left, acum, `Telefono: ${datosCliente.telefono}`);
            doc.text(left, acum + 4, `Hora: ${getHora()}`);
            acum += 6;
        }else{
            doc.text(left, acum, `Hora: ${getHora()}`);
            acum += 4;
        }
    }
    
    if (flagEmpanadas) {
        doc.setFontSize(6);
        doc.text(left, acum, '----------------------------------------------------------');
        doc.setFontSize(10);
        doc.text(center + 2, acum + 3, 'Empanadas');
        doc.setFontSize(6);
        doc.text(left, acum + 5, '----------------------------------------------------------');
        doc.setFontSize(10);
        acum += 8
        productosOrdenados.forEach(producto => {
            if (producto.tipoProducto === 'empanada') {
                const text = `- ${producto.name}: ${producto.cantidad}`
                doc.text(left, acum, text)
                acum += 4;
            }
        })
        doc.setFontSize(10);
        doc.text(left, acum, `Total: ${cantidadEmpanadas}`);
        acum += 2;
    }
    if (flagSandwichs) {
        doc.setFontSize(6);
        doc.text(left, acum, '----------------------------------------------------------');
        doc.setFontSize(10);
        doc.text(center + 2, acum + 3, 'Sandwichs');
        doc.setFontSize(6);
        doc.text(left, acum + 5, '----------------------------------------------------------');
        acum += 8
        doc.setFontSize(10);
        productosOrdenados.forEach(producto => {
            if (producto.tipoProducto === 'sandwich') {
                const text = `- ${producto.name}: ${producto.cantidad}`
                doc.text(left, acum, text)
                acum += 3;
            }
        })
    }
    if (flagPizzas) {
        doc.setFontSize(6);
        doc.text(left, acum, '----------------------------------------------------------');
        doc.setFontSize(10);
        doc.text(center + 6, acum + 3, 'Pizzas');
        doc.setFontSize(6);
        doc.text(left, acum + 5, '----------------------------------------------------------');
        acum += 8
        doc.setFontSize(10);
        productosOrdenados.forEach(producto => {
            if (producto.tipoProducto === 'pizza') {
                const text = `- ${producto.name}: ${producto.cantidad}`
                doc.text(left, acum, text, {
                    maxWidth: 43
                });
                if (producto.name.length > 20) {
                    acum += 7;
                } else {
                    acum += 4;
                }
            }
        })
    }

    if (flagBebidas) {
        doc.setFontSize(6);
        doc.text(left, acum, '----------------------------------------------------------');
        doc.setFontSize(10);
        doc.text(center + 6, acum + 3, 'Bebidas');
        doc.setFontSize(6);
        doc.text(left, acum + 5, '----------------------------------------------------------');
        acum += 8
        doc.setFontSize(10);
        productosOrdenados.forEach(producto => {
            if (producto.tipoProducto === 'bebida') {
                const text = `- ${producto.name}: ${producto.cantidad}`
                doc.text(left, acum, text, {
                    maxWidth: 43
                });
                if (producto.name.length > 22) {
                    acum += 7;
                } else {
                    acum += 4;
                }
            }
        })
    }

    if (flagNotas) {
        doc.setFontSize(6);
        doc.text(left, acum, '----------------------------------------------------------');
        doc.setFontSize(8);
        doc.text(left, acum + 3, 'Notas: ');
        const cant = notas.length / 30;
        doc.text(left, acum + 6, "- " + notas, {
            maxWidth: 46
        })
        acum += 8 + (2.5) * cant
    }
    // Recorrer producots y por cada uno pintar una línea

    doc.setFontSize(6);
    doc.text(left, acum, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(right, acum + 3, `Precio final: $${total}`);
    doc.autoPrint();
    doc.output('dataurlnewwindow');





};

export default imprimirPedido;