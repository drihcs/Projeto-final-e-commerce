import React from 'react';
import styles from './InfoPedidos.module.css';

const InfoPedidos = () => {
  const orders = [
    {
      id: '224491032',
      product: 'Tênis Nike Revolution 6 Next Nature Masculino',
      status: 'Produto em trânsito',
      statusColor: styles.statusOrange,
    },
    {
      id: '4485810482',
      product: 'Tênis Nike Revolution 6 Next Nature Masculino',
      status: 'Finalizado',
      statusColor: styles.statusGreen,
    },
    {
      id: '4485810483',
      product: 'Tênis Nike Revolution 6 Next Nature Masculino',
      status: 'Cancelado',
      statusColor: styles.statusRed,
    },
    {
      id: '4485810484',
      product: 'Tênis Nike Revolution 6 Next Nature Masculino',
      status: 'Finalizado',
      statusColor: styles.statusGreen,
    },
  ];

  return (
      
      <div className={styles.ordersSection}>
        <header className={styles.ordersHeader}>
          <h1>Meus Pedidos</h1>
          <span className={styles.statusLabel}>STATUS</span>
        </header>

        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderItem}>
              <div className={styles.orderInfo}>
                <div className={styles.orderImage}>
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath fill='%23ff6b6b' d='M10 40 Q 20 30 30 40 Q 40 50 50 40 Q 60 30 70 40 Q 80 50 90 40 L 90 50 Q 80 40 70 50 Q 60 60 50 50 Q 40 40 30 50 Q 20 60 10 50 Z'/%3E%3Cpath fill='%23ff8e8e' d='M15 35 Q 25 25 35 35 Q 45 45 55 35 Q 65 25 75 35 Q 85 45 95 35 L 95 45 Q 85 35 75 45 Q 65 55 55 45 Q 45 35 35 45 Q 25 55 15 45 Z'/%3E%3C/svg%3E"
                    alt="Sneaker"
                    className={styles.productImage}
                  />
                </div>
                <div>
                  <p className={styles.orderId}>Pedido nº {order.id}</p>
                  <h3 className={styles.productName}>{order.product}</h3>
                </div>
              </div>
              <div className={`${styles.orderStatus} ${order.statusColor}`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default InfoPedidos;