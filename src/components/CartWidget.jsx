import carrito from "../assets/carritoCompras.png";

export const CartWidget = () => {
    return (
        <>
            <img src={carrito} alt="carrito de compras" width={30} />
            <span>3</span>
        </>
    );
};
