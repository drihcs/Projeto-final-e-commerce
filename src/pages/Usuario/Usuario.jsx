import React, { useState } from "react";
import styles from "./Usuario.module.css";
import InfoUsuario from "../../components/InfoUsuario/InfoUsuario";
import InfoPedidos from "../../components/InfoPedidos/InfoPedidos";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("pedidos");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Meu Perfil</h2>
        <nav className={styles.sidebarNav}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("pedidos");
            }}
            className={`${styles.sidebarLink} ${
              activeTab === "pedidos" ? styles.sidebarLinkActive : ""
            }`}
          >
            Meus Pedidos
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("info");
            }}
            className={`${styles.sidebarLink} ${
              activeTab === "info" ? styles.sidebarLinkActive : ""
            }`}
          >
            Minhas Informações
          </a>
          <a href="#" className={styles.sidebarLink}>
            Métodos de Pagamento
          </a>
        </nav>
      </div>

      <main className={styles.mainContent}>
        {activeTab === "pedidos" && <InfoPedidos />}
        {activeTab === "info" && <InfoUsuario />}        
      </main>
    </div>
  );
}