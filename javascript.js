import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';


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

document.addEventListener('DOMContentLoaded', () => {
  if (window.__servicesBookInitialized) return;

  const pages = document.querySelectorAll('.page');
  const prevBtn = document.querySelector('#prevPageBtn');
  const nextBtn = document.querySelector('#nextPageBtn');
  const indicator = document.querySelector('#pageIndicator');
  const announcer = document.querySelector('#book-announcer');
  const bookContainer = document.querySelector('.book-container');

  if (!pages.length || !prevBtn || !nextBtn || !indicator || !bookContainer) return;

  window.__servicesBookInitialized = true;

  let currentPage = 0;
  const totalPages = pages.length;

  function updateBook(isInitial = false) {
    pages.forEach((page, index) => {
      const isCurrent = index === currentPage;

      page.classList.remove('active', 'turned');

      if (isCurrent) {
        page.classList.add('active');
        page.setAttribute('aria-hidden', 'false');
      } else {
        if (index < currentPage) page.classList.add('turned');
        page.setAttribute('aria-hidden', 'true');
      }
    });

    indicator.textContent = `${currentPage + 1} / ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;

    if (!isInitial && announcer) {
      const activeTitle = pages[currentPage].querySelector('h3');
      announcer.textContent = `Mostrando servicio ${currentPage + 1} de ${totalPages}: ${activeTitle ? activeTitle.textContent : ''}.`;
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateBook();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateBook();
    }
  });

  bookContainer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && currentPage < totalPages - 1) {
      currentPage++;
      updateBook();
    } else if (event.key === 'ArrowLeft' && currentPage > 0) {
      currentPage--;
      updateBook();
    }
  });

  updateBook(true);
});