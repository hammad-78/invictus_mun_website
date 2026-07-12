/* ============================================
   INVICTUS MUN 2026 — Main JavaScript
   ============================================ */

(function() {
  'use strict';

  /* ---------- Loading Screen ---------- */
  function hideLoader() {
    var loader = document.querySelector('.loader');
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
    }
  }

  // Hide loader as soon as DOM is ready (fast path)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(hideLoader, 1200);
    });
  } else {
    setTimeout(hideLoader, 1200);
  }

  // Also hide on full load (images etc.)
  window.addEventListener('load', function() {
    setTimeout(hideLoader, 400);
  });

  // Absolute fallback — CSS animation handles it at 4s regardless

  /* ---------- Scroll Progress ---------- */
  var scrollProgress = document.querySelector('.scroll-progress');
  function onScroll() {
    if (scrollProgress) {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    // Sticky nav
    var nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

    // Back to top
    var backTop = document.querySelector('.back-top');
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  function closeMobileNav() {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    var mobileLinks = mobileNav.querySelectorAll('a');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', closeMobileNav);
    }
  }

  /* ---------- Theme Toggle ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('ivmun-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  function updateThemeIcon() {
    if (!themeBtn) return;
    var t = document.documentElement.getAttribute('data-theme');
    themeBtn.innerHTML = t === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }
  updateThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ivmun-theme', next);
      updateThemeIcon();
    });
  }

  /* ---------- Back to Top ---------- */
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Search Modal ---------- */
  var searchBtn = document.getElementById('searchBtn');
  var searchModal = document.querySelector('.search-modal');
  var searchInput = searchModal ? searchModal.querySelector('.search-input-wrap input') : null;
  var searchResults = searchModal ? searchModal.querySelector('.search-results') : null;

  var searchIndex = [
    { title: 'Home', type: 'page', icon: 'fa-home', url: 'index.html' },
    { title: 'About Invictus MUN', type: 'page', icon: 'fa-info-circle', url: 'about.html' },
    { title: 'Committees', type: 'page', icon: 'fa-landmark', url: 'committees.html' },
    { title: 'PNA — Pakistan National Assembly', type: 'committee', icon: 'fa-university', url: 'committees.html#pna' },
    { title: 'OIC — Organization of Islamic Cooperation', type: 'committee', icon: 'fa-globe', url: 'committees.html#oic' },
    { title: 'UNSC — United Nations Security Council', type: 'committee', icon: 'fa-shield-halved', url: 'committees.html#unsc' },
    { title: 'UNHRC — United Nations Human Rights Council', type: 'committee', icon: 'fa-hand-holding-heart', url: 'committees.html#unhrc' },
    { title: 'UNW — United Nations Women', type: 'committee', icon: 'fa-venus', url: 'committees.html#unw' },
    { title: 'Registration', type: 'page', icon: 'fa-pen-to-square', url: 'registration.html' },
    { title: 'Event Schedule', type: 'page', icon: 'fa-calendar', url: 'schedule.html' },
    { title: 'Gallery', type: 'page', icon: 'fa-images', url: 'gallery.html' },
    { title: 'News & Announcements', type: 'page', icon: 'fa-newspaper', url: 'news.html' },
    { title: 'Certificate Verification', type: 'page', icon: 'fa-certificate', url: 'certificate.html' },
    { title: 'Contact Us', type: 'page', icon: 'fa-envelope', url: 'contact.html' },
    { title: 'What is Model United Nations?', type: 'faq', icon: 'fa-question-circle', url: 'index.html#faq' },
    { title: 'Who can participate in IV MUN?', type: 'faq', icon: 'fa-question-circle', url: 'index.html#faq' },
    { title: 'What should I wear?', type: 'faq', icon: 'fa-question-circle', url: 'index.html#faq' },
    { title: 'Is there a delegate fee?', type: 'faq', icon: 'fa-question-circle', url: 'index.html#faq' },
    { title: 'Day 1 — Opening Ceremony', type: 'schedule', icon: 'fa-calendar-day', url: 'schedule.html' },
    { title: 'Day 2 — Committee Sessions', type: 'schedule', icon: 'fa-calendar-day', url: 'schedule.html' },
  ];

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() { if (searchInput) searchInput.focus(); }, 300);
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '<div class="search-hint">Type at least 2 characters to search...</div>';
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchModal) {
    searchModal.addEventListener('click', function(e) {
      if (e.target === searchModal) closeSearch();
    });
  }
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
      var q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) { searchResults.innerHTML = '<div class="search-hint">Type at least 2 characters to search...</div>'; return; }
      var matches = searchIndex.filter(function(item) { return item.title.toLowerCase().indexOf(q) !== -1; });
      if (matches.length === 0) { searchResults.innerHTML = '<div class="search-hint">No results found.</div>'; return; }
      searchResults.innerHTML = matches.map(function(m) {
        return '<a href="' + m.url + '" class="search-result-item"><i class="fas ' + m.icon + '"></i><span>' + m.title + ' <small style="color:var(--text-muted);margin-left:8px;">' + m.type + '</small></span></a>';
      }).join('');
    });
  }

  /* ---------- Countdown Timer ---------- */
  var eventDate = new Date('2026-07-24T09:00:00').getTime();
  function updateCountdown() {
    var now = Date.now();
    var diff = eventDate - now;
    if (diff <= 0) return;
    var days = Math.floor(diff / (1000*60*60*24));
    var hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    var mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    var secs = Math.floor((diff % (1000*60)) / 1000);
    var dEls = document.querySelectorAll('[data-countdown="days"]');
    var hEls = document.querySelectorAll('[data-countdown="hours"]');
    var mEls = document.querySelectorAll('[data-countdown="minutes"]');
    var sEls = document.querySelectorAll('[data-countdown="seconds"]');
    for (var i = 0; i < dEls.length; i++) dEls[i].textContent = String(days).padStart(2,'0');
    for (var i = 0; i < hEls.length; i++) hEls[i].textContent = String(hours).padStart(2,'0');
    for (var i = 0; i < mEls.length; i++) mEls[i].textContent = String(mins).padStart(2,'0');
    for (var i = 0; i < sEls.length; i++) sEls[i].textContent = String(secs).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Scroll Animations ---------- */
  var animElements = document.querySelectorAll('.anim, .anim-left, .anim-right, .anim-scale');
  if (animElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    for (var i = 0; i < animElements.length; i++) observer.observe(animElements[i]);
  } else {
    for (var i = 0; i < animElements.length; i++) animElements[i].classList.add('visible');
  }

  /* ---------- Number Counter ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          animateCounter(entries[i].target);
          counterObs.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.5 });
    for (var i = 0; i < counters.length; i++) counterObs.observe(counters[i]);
  }

  /* ---------- FAQ Accordion ---------- */
  var faqQs = document.querySelectorAll('.faq-q');
  for (var i = 0; i < faqQs.length; i++) {
    faqQs[i].addEventListener('click', function() {
      var item = this.parentElement;
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      var allOpen = document.querySelectorAll('.faq-item.open');
      for (var j = 0; j < allOpen.length; j++) {
        allOpen[j].classList.remove('open');
        allOpen[j].querySelector('.faq-a').style.maxHeight = null;
      }
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }

  /* ---------- Gallery Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var galleryImages = [];
  var currentGalleryIndex = 0;

  var galleryItems = document.querySelectorAll('.gallery-item');
  for (var i = 0; i < galleryItems.length; i++) {
    (function(idx) {
      var img = galleryItems[idx].querySelector('img');
      if (img) galleryImages.push(img.src);
      galleryItems[idx].addEventListener('click', function() {
        currentGalleryIndex = idx;
        if (lightbox && lightboxImg && galleryImages[idx]) {
          lightboxImg.src = galleryImages[idx];
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    })(i);
  }

  function closeLightbox() {
    if (lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  }
  function lightboxNav(dir) {
    if (galleryImages.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + dir + galleryImages.length) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentGalleryIndex];
  }
  if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function() { lightboxNav(-1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function() { lightboxNav(1); });
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  /* ---------- News Filters ---------- */
  var filterBtns = document.querySelectorAll('.news-filter-btn');
  var newsCards = document.querySelectorAll('[data-category]');
  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function() {
      for (var j = 0; j < filterBtns.length; j++) filterBtns[j].classList.remove('active');
      this.classList.add('active');
      var cat = this.getAttribute('data-filter');
      for (var j = 0; j < newsCards.length; j++) {
        newsCards[j].style.display = (cat === 'all' || newsCards[j].getAttribute('data-category') === cat) ? '' : 'none';
      }
    });
  }

  /* ---------- Certificate Verification ---------- */
  var verifyForm = document.getElementById('verifyForm');
  var verifyResult = document.getElementById('verifyResult');
  if (verifyForm && verifyResult) {
    verifyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var certId = document.getElementById('certId');
      var id = certId ? certId.value.trim() : '';
      if (!id) { if (certId) certId.focus(); return; }
      verifyResult.style.display = 'none';
      verifyResult.className = 'verify-result';
      var btn = verifyForm.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
      btn.disabled = true;
      setTimeout(function() {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (id.length >= 3) {
          verifyResult.className = 'verify-result success';
          verifyResult.innerHTML = '<h4><i class="fas fa-check-circle"></i> Certificate Verified</h4><p><strong>Name:</strong> Delegate Name Placeholder<br><strong>Committee:</strong> UNSC<br><strong>Award:</strong> Best Delegate<br><strong>Event:</strong> Invictus MUN 2026</p>';
        } else {
          verifyResult.className = 'verify-result error';
          verifyResult.innerHTML = '<h4><i class="fas fa-times-circle"></i> Certificate Not Found</h4><p>No certificate found with the provided ID. Please check and try again.</p>';
        }
        verifyResult.style.display = 'block';
      }, 1500);
    });
  }

  /* ---------- Button Ripple ---------- */
  var allBtns = document.querySelectorAll('.btn');
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('click', function(e) {
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function() { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
    });
  }

  /* ---------- Hero Canvas Particles ---------- */
  var canvas = document.getElementById('hero-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var w, h;
    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function Particle() { this.reset(); }
    Particle.prototype.reset = function() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.pulse = Math.random() * Math.PI * 2;
    };
    Particle.prototype.update = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    };
    Particle.prototype.draw = function() {
      var o = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212,175,55,' + o + ')';
      ctx.fill();
    };
    for (var i = 0; i < 80; i++) particles.push(new Particle());
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(212,175,55,' + (0.06 * (1 - dist/120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---------- Contact Form ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      var originalBg = btn.style.background;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      btn.disabled = true;
      setTimeout(function() {
        btn.innerHTML = originalText;
        btn.style.background = originalBg || '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---------- Lazy Load Images ---------- */
  var lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          var img = entries[i].target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      }
    }, { rootMargin: '100px' });
    for (var i = 0; i < lazyImages.length; i++) imgObserver.observe(lazyImages[i]);
  }

})();