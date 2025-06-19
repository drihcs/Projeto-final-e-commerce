import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartModal.module.css';

const CartModal = ({ cartItems, onClose, onClear }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price ?? 0), 0);

  return (
    <div className={styles['cart-modal']}>
      <h3>Meu Carrinho</h3>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar carrinho">
        ×
      </button>
      <hr />
      <ul className={styles['cart-items']}>
        {cartItems.length === 0 ? (
          <li className={styles.empty}>Seu carrinho está vazio.</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} className={styles['cart-item']}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p className={styles.price}>
                  R$ {(item.price ?? 0).toFixed(2).replace('.', ',')}
                </p>
                {item.original_price !== undefined && item.original_price > 0 && (
                  <p className={styles['old-price']}>
                    R$ {(item.original_price ?? 0).toFixed(2).replace('.', ',')}
                  </p>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {cartItems.length > 0 && (
        <>
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
            <button
              className={styles['checkout-btn']}
              onClick={() => {
                onClose();
                navigate('/carrinho');
              }}
            >
              Ver Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
