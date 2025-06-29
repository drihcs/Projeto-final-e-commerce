import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import styles from "./InfoPedidos.module.css";

const InfoPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select(`
          numero_pedido,
          status,
          data_pedido,
          preco_total,
          quantidade,
          produtosList (
            nome,
            imagem_url
          )
        `)
        .order("data_pedido", { ascending: false });

      if (error) {
        console.error("Erro ao buscar pedidos:", error);
      } else {
        console.log("Pedidos recebidos:", data); // para debugar
        setPedidos(data);
      }
    };

    fetchPedidos();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "em trânsito":
        return styles.statusOrange;
      case "finalizado":
        return styles.statusGreen;
      case "cancelado":
        return styles.statusRed;
      default:
        return styles.statusGray;
    }
  };

  return (
    <div className={styles.ordersSection}>
      <header className={styles.ordersHeader}>
        <h1>Meus Pedidos</h1>
        <span className={styles.statusLabel}>STATUS</span>
      </header>

      <div className={styles.ordersList}>
        {pedidos.length === 0 ? (
          <p>Você ainda não realizou pedidos.</p>
        ) : (
          pedidos.map((pedido) => {
            // Pega o primeiro produto do array produtosList
            const produto = pedido.produtosList?.[0];

            return (
              <div key={pedido.numero_pedido} className={styles.orderItem}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderImage}>
                    <img
                      src={produto?.imagem_url || "/fallback.jpg"}
                      alt={produto?.nome || "Produto"}
                      className={styles.productImage}
                    />
                  </div>
                  <div>
                    <p className={styles.orderId}>Pedido nº {pedido.numero_pedido}</p>
                    <h3 className={styles.productName}>{produto?.nome || "Produto"}</h3>
                    <p className={styles.orderDate}>
                      Data: {new Date(pedido.data_pedido).toLocaleDateString("pt-BR")}
                    </p>
                    <p className={styles.orderPrice}>
                      Total: R$ {pedido.preco_total?.toFixed(2)}
                    </p>
                    <p>Quantidade: {pedido.quantidade}</p>
                  </div>
                </div>
                <div className={`${styles.orderStatus} ${getStatusColor(pedido.status)}`}>
                  {pedido.status}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default InfoPedidos;