import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

// ¡IMPORTANTE! Importar el CSS de Splide para que tome el diseño correcto
import '@splidejs/splide/css'; 

const splide = new Splide('#testimonials-carousel', {
  type: 'loop',
  drag: 'free',
  focus: 'center',
  perPage: 3,
  gap: '1.5rem',
  autoWidth: false,
  pagination: true,
  arrows: true,
  autoScroll: {
    speed: 1,
    pauseOnHover: true,
    pauseOnFocus: true,
  },
  breakpoints: {
    1024: { perPage: 2 },
    640:  { perPage: 1 }
  }
});

// Registrar la extensión AutoScroll antes o al montar
splide.mount({ AutoScroll });