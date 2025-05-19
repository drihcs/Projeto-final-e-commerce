import React from 'react';
import './CartModal.module.css';

const CartModal = ({ cartItems, onClose, onClear }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-modal">
      <h3>Meu Carrinho</h3>
      <hr />
      <ul className="cart-items">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p className="price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              <p className="old-price">R$ {item.oldPrice.toFixed(2).replace('.', ',')}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Valor total:</strong>
        <span className="total-price">R$ {total.toFixed(2).replace('.', ',')}</span>
      </div>
      <div className="cart-actions">
        <button className="clear-btn" onClick={onClear}>Esvaziar</button>
        <button className="checkout-btn">Ver Carrinho</button>
      </div>
    </div>
  );
};

export default CartModal;
