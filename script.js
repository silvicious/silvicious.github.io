// ==================== Navigation Toggle and Portfolio Carousel ====================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');
    const portfolioSection = document.querySelector('#portfolio');


    // Scroll behavior for navbar
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navbar && portfolioSection && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navbar.classList.add('is-visible');
                } else {
                    navbar.classList.remove('is-visible');
                }
            });
        }, { rootMargin: '0px 0px -60% 0px', threshold: 0 });

        navObserver.observe(portfolioSection);
    }

    document.querySelectorAll('.video-poster').forEach((poster) => {
        const slide = poster.closest('.project-slide');
        const iframe = slide ? slide.querySelector('iframe') : null;
        if (!iframe) return;
        const hidePoster = () => poster.classList.add('is-hidden');
        iframe.addEventListener('load', () => setTimeout(hidePoster, 300));
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
    const animatedItems = document.querySelectorAll('.research-card, .theme-card');
    if ('IntersectionObserver' in window) {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animatedItems.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        animatedItems.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

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
    const popupDate = document.querySelector('.popup-date');
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

        let activePopupSurface = null;
        let activePopupItem = null;

        const positionPopupForItem = (element) => {
            const rect = element.getBoundingClientRect();
            const top = window.scrollY + rect.top + (rect.height / 2);
            projectPopup.style.top = `${top}px`;
        };

        // Attach click handlers
        portfolioItems.forEach((item) => {
            const infoButtons = Array.from(item.querySelectorAll('.project-info'));
            if (!infoButtons.length) return;

            infoButtons.forEach((infoBtn) => {
                const scope = infoBtn.closest('.quad-item') || infoBtn.closest('.split-item') || item;
                const clickSurface = scope.querySelector('.slide-click-surface');

                infoBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    popupTitle.textContent = infoBtn.dataset.title || item.dataset.title || '';
                    setPopupDescription(infoBtn.dataset.description || item.dataset.description || '');
                    if (popupDate) {
                        popupDate.textContent = infoBtn.dataset.year || item.dataset.year || '2023';
                    }
                    positionPopupForItem(scope);
                    projectPopup.style.display = 'block';
                    activePopupSurface = clickSurface || null;
                    activePopupItem = item;
                    infoBtn.classList.add('is-hidden');
                    if (clickSurface) clickSurface.classList.remove('is-active');
                });

                if (clickSurface) {
                    clickSurface.addEventListener('click', () => {
                        infoBtn.classList.remove('is-hidden');
                        clickSurface.classList.remove('is-active');
                    });
                }
            });
        });

        // Split slide info buttons
        document.querySelectorAll('.split-info').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                popupTitle.textContent = btn.dataset.title || '';
                setPopupDescription(btn.dataset.description || '');
                if (popupDate) {
                    popupDate.textContent = btn.dataset.year || '2023';
                }
                positionPopupForItem(btn);
                projectPopup.style.display = 'block';
            });
        });

        // Controls
        carouselClose.addEventListener('click', closeCarousel);
        carouselPrev.addEventListener('click', prevSlide);
        carouselNext.addEventListener('click', nextSlide);

        // Popup close
        closePopup.addEventListener('click', () => {
            projectPopup.style.display = 'none';
            if (activePopupSurface) {
                activePopupSurface.classList.add('is-active');
            }
            activePopupSurface = null;
            activePopupItem = null;
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
            if (slider) {
                const index = Number(slider.dataset.index || 0);
                const slides = slider.querySelectorAll('.project-slide');
                const current = slides[index];
                if (!current) return;
                const iframes = current.querySelectorAll('.vimeo-embed');
                iframes.forEach((iframe) => postToVimeo(iframe, 'play'));
            } else {
                bestItem.querySelectorAll('.vimeo-embed').forEach((iframe) => postToVimeo(iframe, 'play'));
            }
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

    document.querySelectorAll('.portfolio-item[data-index="3"] .portfolio-quad-item').forEach((tile) => {
        tile.addEventListener('click', (e) => {
            if (e.target && e.target.closest('.project-info')) return;
            if (projectPopup && projectPopup.style.display === 'block') return;
            const infoBtn = tile.querySelector('.project-info');
            if (infoBtn && infoBtn.classList.contains('is-hidden')) {
                infoBtn.classList.remove('is-hidden');
            }
        });
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
        const startAtIframes = document.querySelectorAll('iframe[data-start]');
        startAtIframes.forEach((iframe) => {
            const startAt = Number(iframe.dataset.start || 0);
            if (!Number.isFinite(startAt) || startAt <= 0) return;
            setTimeout(() => {
                postToVimeo(iframe, 'setCurrentTime', startAt);
                postToVimeo(iframe, 'play');
            }, 800);
        });
    });

    // Keep navbar transparent on scroll
});
