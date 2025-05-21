import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // <-- aqui está o ajuste
import styles from './Swiper.module.css';

export default function MySwiper() {
  return (
    <section className={styles.swiperSection}>
      <Swiper
        className={styles.mySwiper}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1733744579649-4993adfb5dc7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner 1"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1733744578226-a85ec9830e87?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner 2"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1733744578328-8df519991dc0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner 3"
          />
        </SwiperSlide>
      </Swiper>

      <div className={styles.carouselContent}>
        <span className={styles.highlightText}>Melhores ofertas personalizadas</span>
        <h1>Queima de estoque Nike 🔥</h1>
        <p>
          Consequat culpa exercitation mollit nisi excepteur do do tempor laboris
          eiusmod irure consectetur.
        </p>
        <button className={styles.btnPrimary}>Ver Ofertas</button>
      </div>
    </section>
  );
}
