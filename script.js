// ==================== Navigation Toggle and Portfolio Carousel ====================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    // Scroll behavior for navbar
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (if present)
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navMenu) navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection observer for subtle entrance animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.research-card, .portfolio-item, .theme-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Cursor effect
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = (e.clientX - 3) + 'px';
        cursorDot.style.top = (e.clientY - 3) + 'px';
    });
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('glow'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('glow'));
    });

    // ---------------- Carousel & Popup ----------------
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    const carouselModal = document.getElementById('carouselModal');
    const carouselInner = document.getElementById('carouselInner');
    const carouselClose = document.getElementById('carouselClose');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const projectPopup = document.getElementById('projectPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const closePopup = document.getElementById('closePopup');

    if (portfolioItems.length && carouselModal && carouselInner) {
        const slides = portfolioItems.map(item => {
            const img = item.querySelector('img');
            return {
                src: img ? img.src : '',
                title: item.dataset.title || '',
                description: item.dataset.description || ''
            };
        });

        // Render slides
        function renderSlides() {
            carouselInner.innerHTML = '';
            slides.forEach(s => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                const image = document.createElement('img');
                image.src = s.src;
                image.alt = s.title || '';
                slide.appendChild(image);
                carouselInner.appendChild(slide);
            });
        }

        let currentIndex = 0;

        function openCarousel(index) {
            currentIndex = index || 0;
            renderSlides();
            carouselModal.style.display = 'flex';
            updateCarouselPosition();
            carouselModal.setAttribute('aria-hidden', 'false');
        }

        function closeCarousel() {
            carouselModal.style.display = 'none';
            carouselModal.setAttribute('aria-hidden', 'true');
            projectPopup.style.display = 'none';
        }

        function updateCarouselPosition() {
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }

        function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarouselPosition(); }
        function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; updateCarouselPosition(); }

        const setPopupDescription = (text) => {
            if (!popupDescription) return;
            popupDescription.innerHTML = '';
            const parts = String(text || '').split('||').map(part => part.trim()).filter(Boolean);
            if (!parts.length) return;
            parts.forEach(part => {
                const p = document.createElement('p');
                p.textContent = part;
                popupDescription.appendChild(p);
            });
        };

        let activePopupIndex = null;

        const positionPopupForItem = (item) => {
            const rect = item.getBoundingClientRect();
            const top = window.scrollY + rect.top + (rect.height / 2);
            projectPopup.style.top = `${top}px`;
        };

        // Attach click handlers
        portfolioItems.forEach((item, index) => {
            const infoBtn = item.querySelector('.project-info');
            const clickSurface = item.querySelector('.slide-click-surface');
            if (!infoBtn || !clickSurface) return;

            infoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                popupTitle.textContent = item.dataset.title || '';
                setPopupDescription(item.dataset.description || '');
                positionPopupForItem(item);
                projectPopup.style.display = 'block';
                activePopupIndex = index;
                infoBtn.classList.add('is-hidden');
                clickSurface.classList.remove('is-active');
            });

            clickSurface.addEventListener('click', () => {
                infoBtn.classList.remove('is-hidden');
                clickSurface.classList.remove('is-active');
            });
        });

        // Controls
        carouselClose.addEventListener('click', closeCarousel);
        carouselPrev.addEventListener('click', prevSlide);
        carouselNext.addEventListener('click', nextSlide);

        // Popup close
        closePopup.addEventListener('click', () => {
            projectPopup.style.display = 'none';
            if (activePopupIndex !== null) {
                const item = portfolioItems[activePopupIndex];
                if (item) {
                    const clickSurface = item.querySelector('.slide-click-surface');
                    if (clickSurface) clickSurface.classList.add('is-active');
                }
            }
            activePopupIndex = null;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (carouselModal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'Escape') closeCarousel();
            }
        });

        // Click outside modal to close
        carouselModal.addEventListener('click', (e) => {
            if (e.target === carouselModal) closeCarousel();
        });
    }

    // Per-item slider controls
    const sliders = Array.from(document.querySelectorAll('.project-slider'));

    const postToVimeo = (iframe, method, value) => {
        if (!iframe || !iframe.contentWindow) return;
        const message = { method };
        if (typeof value !== 'undefined') message.value = value;
        iframe.contentWindow.postMessage(message, '*');
    };

    // Ensure videos stay muted until users click the volume toggle
    const muteAllVimeo = () => {
        document.querySelectorAll('.vimeo-embed, .hover-vimeo, .mosaic-vimeo, .split-vimeo').forEach((iframe) => {
            postToVimeo(iframe, 'setVolume', 0);
        });
    };

    const pauseAllVimeo = () => {
        document.querySelectorAll('.vimeo-embed').forEach((iframe) => postToVimeo(iframe, 'pause'));
    };

    const playVisibleVimeo = () => {
        const items = Array.from(document.querySelectorAll('.portfolio-item'));
        if (!items.length) return;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        let bestItem = null;
        let bestVisible = 0;

        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
            if (visible > bestVisible) {
                bestVisible = visible;
                bestItem = item;
            }
        });

        pauseAllVimeo();

        if (bestItem) {
            const slider = bestItem.querySelector('.project-slider');
            if (!slider) return;
            const index = Number(slider.dataset.index || 0);
            const slides = slider.querySelectorAll('.project-slide');
            const current = slides[index];
            if (!current) return;
            const iframe = current.querySelector('.vimeo-embed');
            if (iframe) postToVimeo(iframe, 'play');
        }
    };

    sliders.forEach((slider) => {
        const track = slider.querySelector('.project-track');
        const slides = slider.querySelectorAll('.project-slide');
        const prevBtn = slider.querySelector('.project-prev');
        const nextBtn = slider.querySelector('.project-next');
        let index = 0;

        if (!track || slides.length === 0) return;

        const update = () => {
            slider.dataset.index = String(index);
            track.style.transform = `translateX(${-index * 100}%)`;
            playVisibleVimeo();
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                index = (index - 1 + slides.length) % slides.length;
                update();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                index = (index + 1) % slides.length;
                update();
            });
        }
    });

    // Audio controls for Vimeo embeds
    document.querySelectorAll('.video-audio').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slide = btn.closest('.project-slide');
            const container = btn.parentElement;
            const iframe = (container && container.querySelector('iframe')) || (slide && slide.querySelector('iframe'));
            if (!iframe) return;
            const icon = btn.querySelector('i');

            const isMuted = btn.dataset.muted === '1';
            if (isMuted) {
                postToVimeo(iframe, 'setVolume', 1);
                btn.dataset.muted = '0';
                if (icon) {
                    icon.classList.remove('fa-volume-xmark');
                    icon.classList.add('fa-volume-high');
                }
                btn.setAttribute('aria-label', 'Sound on');
            } else {
                postToVimeo(iframe, 'setVolume', 0);
                btn.dataset.muted = '1';
                if (icon) {
                    icon.classList.remove('fa-volume-high');
                    icon.classList.add('fa-volume-xmark');
                }
                btn.setAttribute('aria-label', 'Sound off');
            }
        });
    });

    // Hover-play for triptych Vimeo video
    document.querySelectorAll('.hover-vimeo').forEach((iframe) => {
        iframe.addEventListener('mouseenter', () => {
            postToVimeo(iframe, 'play');
        });

        iframe.addEventListener('mouseleave', () => {
            postToVimeo(iframe, 'pause');
        });
    });

    window.addEventListener('scroll', () => {
        playVisibleVimeo();
    });

    window.addEventListener('load', () => {
        playVisibleVimeo();
        muteAllVimeo();
    });

    // Keep navbar transparent on scroll
});
