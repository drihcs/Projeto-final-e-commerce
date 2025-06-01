import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { supabase } from "../../utils/supabase";
import styles from "./Carrinho.module.css";

const Carrinho = () => {
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [shippingCode, setShippingCode] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const navigate = useNavigate()

  const productPrice = 219.00;
  const discount = 30.00;

  const subtotal = productPrice * quantity;
  const total = subtotal - discount;

  useEffect(() => {
    async function carregarProdutosRelacionados() {
      const { data, error } = await supabase
        .from('produtosList')
        .select('*')
        .limit(4);

      if (error) {
        console.error("Erro ao carregar produtos relacionados:", error);
      } else {
        setRelatedProducts(data);
      }
    }

    carregarProdutosRelacionados();
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={styles.container}>
      {/* Carrinho */}
      <section className={styles.cartSection}>
        <h2 className={styles.sectionTitle}>MEU CARRINHO</h2>

        <div className={styles.cartItem}>
          <div className={styles.productImage}>
            <div className={styles.productIcon}>👟</div>
          </div>

          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>
              Tênis Nike Revolution 6 Next Nature Masculino
            </h3>
            <p className={styles.productDetail}>Cor: Vermelho / Branco</p>
            <p className={styles.productDetail}>Tamanho: 42</p>
          </div>

          <div className={styles.quantityControl}>
            <button
              onClick={() => handleQuantityChange(-1)}
              className={styles.quantityButton}
            >
              -
            </button>
            <span className={styles.quantityDisplay}>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>

          <div className={styles.priceColumn}>
            <p className={styles.oldPrice}>R$ 219,00</p>
            <p className={styles.currentPrice}>
              R$ {productPrice.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className={styles.priceColumn}>
            <p className={styles.oldPrice}>
              R$ {(219 * quantity).toFixed(2).replace('.', ',')}
            </p>
            <p className={styles.currentPrice}>
              R$ {(productPrice * quantity).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>

        <div className={styles.removeItem}>Remover item</div>

        <div className={styles.discountShipping}>
          <div>
            <h3 className={styles.footerTitle}>Cupom de desconto</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Insira seu código"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className={styles.input}
              />
              <button className={styles.button}>OK</button>
            </div>
          </div>

          <div>
            <h3 className={styles.footerTitle}>Calcular frete</h3>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Insira seu CEP"
                value={shippingCode}
                onChange={(e) => setShippingCode(e.target.value)}
                className={styles.input}
              />
              <button className={styles.button}>OK</button>
            </div>
          </div>
        </div>
      </section>

      {/* Resumo */}
      <section className={styles.summary}>
        <h2 className={styles.sectionTitle}>RESUMO</h2>

        <div className={styles.summaryContent}>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Frete:</span>
            <span>R$ 0,00</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Desconto:</span>
            <span>R$ {discount.toFixed(2).replace('.', ',')}</span>
          </div>

          <hr className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalPrice}>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>

          <p className={styles.installments}>
            ou 10x de R$ {(total / 10).toFixed(2).replace('.', ',')} sem juros
          </p>
        </div>

        <button className={styles.continueButton}
          onClick={() => navigate('/finalizar-compra')}
        >
          Continuar
        </button>
      </section>

      {/* Produtos Relacionados */}
      <section className={styles.relatedSection}>
        <h2 className={styles.sectionTitle}>Produtos Relacionados</h2>

        <div className={styles.productsGrid}>
          {relatedProducts.length === 0 ? (
            <p>Carregando produtos...</p>
          ) : (
            relatedProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {product.discount && (
                  <span className={styles.discountBadge}>{product.discount}</span>
                )}

                <div className={styles.productCardImage}>
                  <div className={styles.productIconLarge}>👟</div>
                </div>

                <p className={styles.productCategory}>Tênis</p>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.priceRow}>
                  <span className={styles.oldPrice}>
                    R$ {Number(product.original_price).toFixed(2).replace('.', ',')}
                  </span>
                  <span className={styles.currentPrice}>
                    R$ {Number(product.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Carrinho;