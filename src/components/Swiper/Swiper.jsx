import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import styles from "./Swiper.module.css"
import "swiper/css"
import "swiper/css/pagination"
import { useNavigate } from 'react-router-dom';

export default function Slide() {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1733744579649-4993adfb5dc7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Banner 1",
      positionClass: "position1",
      title: "Amor está no ar",
      description: "Surpreenda com o cupom exclusivo!",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1733744578226-a85ec9830e87?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Banner 2",
      positionClass: "position2",
      title: "Especial Namorados",
      description: "Descontos válidos até 10/06.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1733744578328-8df519991dc0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Banner 3",
      positionClass: "position3",
      title: "Ofertas Imperdíveis",
      description: "Use o cupom NAMORADOS12 agora!",
    },
  ]

  const navigate = useNavigate();
  
  return (
    <section className={styles.swiperSection}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.paginationBullet}`,
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.paginationBulletActive}`,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={styles.mySwiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <img src={slide.img || "/placeholder.svg"} alt={slide.alt} />

            <div className={`${styles.carouselContent} ${styles[slide.positionClass]}`}>
              <span className={styles.highlightText}>12% OFF com o cupom *NAMORADOS12</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <button className={styles.btnPrimary} onClick={() => navigate('/produtos')}>
                Ver Ofertas
              </button>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}