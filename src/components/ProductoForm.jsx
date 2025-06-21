import { useState, useEffect } from 'react';

const ProductoForm = ({ onSubmit, productoActual, onCancel }) => {
    const [producto, setProducto] = useState({
        cod_producto: '',
        nombre: '',
        detalle: '',
        precio: ''
    });

    useEffect(() => {
        if (productoActual) {
            setProducto(productoActual);
        } else {
            setProducto({ cod_producto: '', nombre: '', detalle: '', precio: '' });
        }
    }, [productoActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
            ...producto, 
            precio: parseFloat(producto.precio)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
                <label htmlFor="cod_producto">Código</label>
                <input id="cod_producto" type="text" name="cod_producto" placeholder="Código del Producto" value={producto.cod_producto} onChange={handleChange} required disabled={!!productoActual} />
            </div>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" type="text" name="nombre" placeholder="Nombre del producto" value={producto.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="detalle">Detalle</label>
                <textarea id="detalle" name="detalle" placeholder="Detalle del producto" value={producto.detalle} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input id="precio" type="number" name="precio" placeholder="Precio" step="0.01" value={producto.precio} onChange={handleChange} required />
            </div>
            <div className="modal-actions">
                <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="primary">{productoActual ? 'Actualizar' : 'Guardar'}</button>
            </div>
        </form>
    );
};

export default ProductoForm;