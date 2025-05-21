import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // <-- aqui está o ajuste
import styles from './Swiper.module.css';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Slide() {
  const slides = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1733744579649-4993adfb5dc7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Banner 1',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1733744578226-a85ec9830e87?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Banner 2',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1733744578328-8df519991dc0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Banner 3',
    },
  ];

  return (
    <section className={styles.swiper}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: `.${styles.swiperPagination}` }}
        autoplay={{ delay: 4000 }}
        loop
        className={styles.swiperWrapper}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <img src={slide.img} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.swiperPagination}>
        <div className={styles.carouselContent}>
          <span className={styles.highlightText}>Melhores ofertas personalizadas</span>
          <h1>Queima de estoque Nike 🔥</h1>
          <p>Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.</p>
          <button className={styles.btnPrimary}>Ver Ofertas</button>
        </div>
      </div>
    </section>
  );
}
