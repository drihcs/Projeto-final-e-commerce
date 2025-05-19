import React from 'react';
import styles from './CartModal.module.css';

const CartModal = ({ cartItems, onClose, onClear }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles['cart-modal']}>
      <h3>Meu Carrinho</h3>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar carrinho">
        ×
      </button>
      <hr />
      <ul className={styles['cart-items']}>
        {cartItems.map((item, index) => (
          <li key={index} className={styles['cart-item']}>
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p className={styles.price}>
                R$ {item.price.toFixed(2).replace('.', ',')}
              </p>
              {item.oldPrice !== undefined && (
                <p className={styles['old-price']}>
                  R$ {item.oldPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles['cart-total']}>
        <strong>Valor total:</strong>{' '}
        <span className={styles['total-price']}>
          R$ {total.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <div className={styles['cart-actions']}>
        <button className={styles['clear-btn']} onClick={onClear}>
          Esvaziar
        </button>
        <button className={styles['checkout-btn']}>Ver Carrinho</button>
      </div>
    </div>
  );
};

export default CartModal;