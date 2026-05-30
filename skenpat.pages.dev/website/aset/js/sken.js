// ================================
// ENHANCED JAVASCRIPT FOR SKENPAT WEBSITE
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollEffects();
  initFloatingButtons();
  initFunFacts();
  initModals();
  initSmoothScrolling();
  initAccessibility();
  initMusicPlayer();
  initTimeline();
  initSearch();
  initPerformanceOptimizations();
});

// ================================
// THEME MANAGEMENT
// ================================
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

// ================================
// NAVIGATION FUNCTIONALITY
// ================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  
  // Create menu overlay for mobile
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);
  
  // Mobile menu toggle
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      const isOpen = navbarMenu.classList.contains('active');
      navbarToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = navbarToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
      }
    });
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      navbarToggle.setAttribute('aria-expanded', 'false');
      const icon = navbarToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
    
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        const icon = navbarToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

// ================================
// SCROLL EFFECTS
// ================================
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    backToTopBtn?.classList.toggle('visible', window.scrollY > 300);
  });
}

// ================================
// FLOATING BUTTONS
// ================================
function initFloatingButtons() {
  const backToTopBtn = document.getElementById('backToTop');
  
  // Back to top functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ================================
// FUN FACTS FUNCTIONALITY
// ================================
function initFunFacts() {
  const fab = document.getElementById('fab');
  
  const funFacts = [
    "👾 Website ini dibuat oleh satu orang siswa RPL 1 kelas 10. beserta bantuan ai wkwk",
    "🦄 Pemilik Subdomain adalah murid dari sekolah, tanpa suruhan siapapun.",
    "✨ Tanpa framework, cuma HTML, CSS & JS. Udahh Html Statis aja Gitu",
    '🌱 Selalu update, kalo tidak hubungi saja <a href="https://flessan.pages.dev/#contact" target="_blank" style="color:#ffd966;text-decoration:underline;">klik aku!</a>',
    "💡 Powered by Orang Baik, Siapa Lagi? Github Ama Cloudflare ygy",
    "🤕 Si Atmin ngeluangin waktu gini ga berpenghasilan loo, Siapa Juga Yg Bayar Ama Ginian",
    "😄 Kamu Coba Bacain Semua Fun Fact Ini?</br> </br>(Kesempatan Mendapatkan Chat Langka Naik -1 Persen)",
    "🔥 Support SMKN 4 Banjarmasin, spread positivity!",
    "😎 Fitur baru akan hadir, pantau terus ya!",
    '😄 Donasi Atmin tempatnya</br>Disini yaa <a href=" https://flessan.pages.dev/donate " target="_blank" style="color:#ffd966;text-decoration:underline;">klik aku!</a></br> </br>Si Atmin Belum Bergaji Nich, Bantuin Ya Orang Orang Baik :3',
    "😄 DAMN! i Love Skenpat! </br>SMK Negeri 4 Banjarmasin!",
    "🦧 DAMN! i Love Banjarmasin! </br>Kayuh Baimbai Waja Sampai Kaputing",
    "😓 Dulu Webset Ini Ga Berloading Loo, Jadi Kutambahin Aja Biar Maksimol hehe",
    "🎨 Desain UI ku buat biar enak di skrol di hape."
  ];
  
  function showFunFact() {
    // Remove existing notification if any
    const existingNotif = document.getElementById('fun-fact-notif');
    if (existingNotif) {
      existingNotif.remove();
    }
    
    // Create new notification
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const notif = document.createElement('div');
    notif.id = 'fun-fact-notif';
    notif.innerHTML = `
      <div class="fun-fact-notification">
        <button class="fun-fact-close" aria-label="Tutup">&times;</button>
        <div class="fun-fact-title">Fun Fact:</div>
        <div class="fun-fact-content">${fact}</div>
      </div>
    `;
    
    document.body.appendChild(notif);
    
    // Add event listener to close button
    const closeBtn = notif.querySelector('.fun-fact-close');
    closeBtn.addEventListener('click', () => {
      notif.remove();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notif.parentNode) {
        notif.remove();
      }
    }, 10000);
  }
  
  // Add event listener to FAB
  if (fab) {
    fab.addEventListener('click', showFunFact);
  }
}

// ================================
// MODAL FUNCTIONALITY
// ================================
function initModals() {
  // Privacy Policy
  window.showPrivacyPolicy = function() {
    const content = `
      <div class="modal-content">
        <h2>Kebijakan Privasi</h2>
        <p>Kami tidak mengumpulkan data pribadi apa pun dari pengunjung website ini. Website ini murni untuk informasi dan tidak memiliki fitur yang memerlukan data pribadi.</p>
        <p>Kami menggunakan cookie minimal untuk pengalaman pengguna yang lebih baik, tetapi tidak melacak aktivitas pribadi Anda.</p>
        <p class="modal-footer">Terakhir diperbarui: Januari 2025</p>
      </div>
    `;
    showModal("Kebijakan Privasi", content);
  };
  
  // Terms of Service
  window.showTermsOfService = function() {
    const content = `
      <div class="modal-content">
        <h2>Syarat & Ketentuan</h2>
        <p>Website ini adalah website tidak resmi yang dibuat untuk siswa SMKN 4 Banjarmasin. Kami tidak berafiliasi dengan pihak sekolah secara resmi.</p>
        <p>Semua informasi di website ini bersifat informatif dan kami berusaha untuk menyajikan informasi yang akurat. Namun, kami tidak bertanggung jawab atas ketidakakuratan informasi yang mungkin ada.</p>
        <p class="modal-footer">Terakhir diperbarui: Januari 2025</p>
      </div>
    `;
    showModal("Syarat & Ketentuan", content);
  };
  
  // Generic modal function
  window.showModal = function(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('custom-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close-btn" aria-label="Tutup">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary modal-close">Tutup</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close-btn, .modal-close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.remove();
      });
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function handleEscape(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    });
  };
}

// ================================
// SMOOTH SCROLLING
// ================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================
function initAccessibility() {
  // Add keyboard navigation for cards
  const cards = document.querySelectorAll('.grid .btn, .card-balance .actions a');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Add skip to content link for keyboard users
  const skipLink = document.createElement('a');
  skipLink.href = '#home';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// ================================
// MUSIC PLAYER
// ================================
function initMusicPlayer() {
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-pause-btn');
  const playIcon = playBtn?.querySelector('i');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progress = document.getElementById('progress-bar');
  const cur = document.getElementById('current-time');
  const total = document.getElementById('total-time');
  const volSlider = document.getElementById('volume-slider');
  const volBtn = document.getElementById('volume-btn');
  const volIcon = volBtn?.querySelector('i');
  const lyrics = document.getElementById('lyrics-modal');
  const showLyrics = document.getElementById('show-lyrics-modal-btn');
  const closeLyrics = document.getElementById('close-lyrics-btn');
  const downloadBtn = document.getElementById('download-btn');
  const playlistToggle = document.getElementById('playlist-toggle');
  const playlistItems = document.getElementById('playlist-items');
  const playlistItemElements = document.querySelectorAll('.playlist-item');
  
  if (!audio) return;
  
  const fmt = s => isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
  
  if (volSlider) audio.volume = volSlider.value / 100;
  
  audio.addEventListener('loadedmetadata', () => { 
    if (total) total.textContent = fmt(audio.duration); 
  });
  
  // Play/Pause functionality
  playBtn && playBtn.addEventListener('click', () => {
    if (audio.paused) { 
      audio.play(); 
      playIcon && (playIcon.classList.remove('fa-play'), playIcon.classList.add('fa-pause'));
      playBtn.classList.add('playing');
    } else { 
      audio.pause(); 
      playIcon && (playIcon.classList.remove('fa-pause'), playIcon.classList.add('fa-play'));
      playBtn.classList.remove('playing');
    }
  });
  
  // Progress bar update
  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progress) progress.value = pct || 0;
    if (cur) cur.textContent = fmt(audio.currentTime);
  });
  
  // Progress bar seek
  progress && progress.addEventListener('input', () => { 
    audio.currentTime = (progress.value / 100) * audio.duration; 
  });
  
  // Volume control
  volSlider && volSlider.addEventListener('input', () => {
    audio.volume = volSlider.value / 100;
    if (!volIcon) return;
    if (volSlider.value == 0) volIcon.className = 'fas fa-volume-mute';
    else if (volSlider.value < 50) volIcon.className = 'fas fa-volume-down';
    else volIcon.className = 'fas fa-volume-up';
  });
  
  // Mute toggle
  volBtn && volBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
      // Save current volume
      volBtn.dataset.prevVolume = audio.volume;
      audio.volume = 0;
      volSlider.value = 0;
      volIcon.className = 'fas fa-volume-mute';
    } else {
      // Restore previous volume
      const prevVolume = volBtn.dataset.prevVolume || 0.7;
      audio.volume = prevVolume;
      volSlider.value = prevVolume * 100;
      volIcon.className = prevVolume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    }
  });
  
  // Lyrics modal
  showLyrics && showLyrics.addEventListener('click', () => { 
    lyrics && lyrics.classList.add('visible'); 
  });
  
  closeLyrics && closeLyrics.addEventListener('click', () => { 
    lyrics && lyrics.classList.remove('visible'); 
  });
  
  lyrics && lyrics.addEventListener('click', (e) => { 
    if (e.target === lyrics) lyrics.classList.remove('visible'); 
  });
  
  // Download functionality
  downloadBtn && downloadBtn.addEventListener('click', () => {
    const audioSrc = audio.src;
    const a = document.createElement('a');
    a.href = audioSrc;
    a.download = 'Mars_SMKN_4_Banjarmasin.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show notification
    showModal("Unduhan Dimulai", `<p style="text-align: center; padding: 20px;">Lagu Mars SMKN 4 Banjarmasin sedang diunduh.</p>`);
  });
  
  // Playlist toggle
  playlistToggle && playlistToggle.addEventListener('click', () => {
    playlistItems.classList.toggle('active');
    
    if (playlistItems.classList.contains('active')) {
      playlistToggle.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan';
    } else {
      playlistToggle.innerHTML = '<i class="fas fa-chevron-down"></i> Tampilkan';
    }
  });
  
  // Playlist item selection
  playlistItemElements.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      playlistItemElements.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Change audio source
      const newSrc = item.dataset.src;
      audio.src = newSrc;
      
      // Update track info
      const title = item.querySelector('.playlist-item-title').textContent;
      const artist = item.querySelector('.playlist-item-artist').textContent;
      
      document.querySelector('.player-track-title').textContent = title;
      document.querySelector('.player-track-artist').textContent = artist;
      
      // Load and play the new track
      audio.load();
      audio.play();
      playIcon && (playIcon.classList.remove('fa-play'), playIcon.classList.add('fa-pause'));
      playBtn.classList.add('playing');
    });
  });
  
  // Previous/Next buttons
  prevBtn && prevBtn.addEventListener('click', () => {
    const activeItem = document.querySelector('.playlist-item.active');
    if (activeItem) {
      const prevItem = activeItem.previousElementSibling;
      if (prevItem && prevItem.classList.contains('playlist-item')) {
        prevItem.click();
      }
    }
  });
  
  nextBtn && nextBtn.addEventListener('click', () => {
    const activeItem = document.querySelector('.playlist-item.active');
    if (activeItem) {
      const nextItem = activeItem.nextElementSibling;
      if (nextItem && nextItem.classList.contains('playlist-item')) {
        nextItem.click();
      }
    }
  });
  
  // Handle song end
  audio.addEventListener('ended', () => {
    if (playIcon) { 
      playIcon.classList.remove('fa-pause'); 
      playIcon.classList.add('fa-play'); 
    }
    playBtn.classList.remove('playing');
    audio.currentTime = 0;
    
    // Auto-play next song if available
    const activeItem = document.querySelector('.playlist-item.active');
    if (activeItem) {
      const nextItem = activeItem.nextElementSibling;
      if (nextItem && nextItem.classList.contains('playlist-item')) {
        nextItem.click();
      }
    }
  });
}

// ================================
// TIMELINE FUNCTIONALITY
// ================================
function initTimeline() {
  const timelineToggles = document.querySelectorAll('.timeline-toggle');
  
  timelineToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.dataset.target;
      const detailsElement = document.getElementById(targetId);
      
      detailsElement.classList.toggle('active');
      
      if (detailsElement.classList.contains('active')) {
        toggle.innerHTML = 'Sembunyikan <i class="fas fa-chevron-up"></i>';
      } else {
        toggle.innerHTML = 'Selengkapnya <i class="fas fa-chevron-down"></i>';
      }
    });
  });
}

// ================================
// SEARCH FUNCTIONALITY
// ================================
function initSearch() {
  // Create search container if it doesn't exist
  if (!document.querySelector('.search-container')) {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <input type="text" class="search-input" placeholder="Cari informasi..." aria-label="Cari">
      <button class="search-button" aria-label="Cari">
        <i class="fas fa-search"></i>
      </button>
    `;
    
    // Insert search container after header
    const header = document.querySelector('.header');
    if (header) {
      header.after(searchContainer);
    }
  }
  
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  
  // Search functionality
  const performSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;
    
    // Find all searchable elements
    const searchableElements = document.querySelectorAll('.section h3, .visi-misi h3, .visi-misi h2, .visi-misi p, .visi-misi li');
    
    // Reset previous highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
    
    // Count matches
    let matchCount = 0;
    
    // Highlight matches
    searchableElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(query)) {
        element.classList.add('search-highlight');
        matchCount++;
      }
    });
    
    // Show notification
    if (matchCount > 0) {
      showModal("Hasil Pencarian", `<p>Ditemukan ${matchCount} hasil untuk "${query}".</p>`);
      
      // Scroll to first match
      const firstMatch = document.querySelector('.search-highlight');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      showModal("Hasil Pencarian", `<p>Tidak ada hasil untuk "${query}".</p>`);
    }
  };
  
  // Add event listeners
  searchButton?.addEventListener('click', performSearch);
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================
function initPerformanceOptimizations() {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
  
  // Add animation classes when elements come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .visi-misi');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    } else {
      // Fallback
      elements.forEach(element => {
        element.classList.add('animate-in');
      });
    }
  };
  
  animateOnScroll();
}

// ================================
// SERVICE WORKER REGISTRATION
// ================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/aset/js/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.message);
  // You could send this error to a logging service
  // For production, you might want to show a user-friendly message
});

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add CSS dynamically for animations
function addDynamicStyles() {
  if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
      @keyframes floaty {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-80px) scale(1.3); }
      }
      @keyframes fadeInNotif {
        from { opacity: 0; transform: translateY(40px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fun-fact-notification {
        background: var(--card-dark);
        color: var(--text-light);
        border-radius: 20px;
        box-shadow: var(--shadow-lg);
        position: fixed;
        bottom: 100px;
        right: 32px;
        max-width: 350px;
        z-index: 9999;
        padding: 1.5rem 2.2rem 1.25rem 1.25rem;
        font-size: 1.05rem;
        line-height: 1.6;
        animation: fadeInNotif 0.5s;
        border: 1px solid var(--primary-color);
        font-family: 'Poppins', sans-serif;
      }
      [data-theme="light"] .fun-fact-notification {
        background: var(--light-card);
        color: var(--light-text);
        box-shadow: var(--light-shadow-lg);
      }
      .fun-fact-close {
        position: absolute;
        top: 0.5rem;
        right: 0.8rem;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 1.6rem;
        cursor: pointer;
        opacity: 0.7;
      }
      .fun-fact-title {
        color: var(--primary-color);
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .fun-fact-content {
        margin-top: 0.5rem;
      }
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        backdrop-filter: blur(5px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }
      .modal-overlay.visible {
        opacity: 1;
        visibility: visible;
      }
      .modal-container {
        background: var(--card-dark);
        border-radius: 20px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        position: relative;
        width: 100%;
        max-width: 600px;
        transform: translateY(20px);
        transition: transform 0.3s;
      }
      .modal-overlay.visible .modal-container {
        transform: translateY(0);
      }
      [data-theme="light"] .modal-container {
        background: var(--light-card);
        border: 1px solid var(--light-border);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      [data-theme="light"] .modal-header {
        border-bottom: 1px solid var(--light-border);
      }
      .modal-header h2 {
        color: var(--primary-color);
        margin: 0;
      }
      .modal-close-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
      }
      .modal-close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-light);
      }
      [data-theme="light"] .modal-close-btn:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .modal-body {
        padding: 2rem;
      }
      .modal-actions {
        padding: 1rem 2rem 2rem;
        display: flex;
        justify-content: flex-end;
      }
      .modal-content h2 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
      }
      .modal-content p {
        margin-bottom: 1rem;
      }
      .modal-footer {
        margin-top: 1.5rem;
        font-style: italic;
        color: var(--text-muted);
      }
      [data-theme="light"] .modal-footer {
        color: var(--light-text-muted);
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 4px 0;
        z-index: 100;
      }
      .skip-link:focus {
        top: 0;
      }
      .animate-in {
        animation: fadeInUp 0.7s forwards;
      }
      .search-highlight {
        background-color: rgba(244, 105, 0, 0.2);
        padding: 2px 4px;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      [data-theme="light"] .search-highlight {
        background-color: rgba(244, 105, 0, 0.3);
      }
      .search-container {
        position: relative;
        margin: 2rem 0;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .search-input {
        width: 100%;
        padding: 1rem 3rem 1rem 1.5rem;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: var(--card-dark);
        color: var(--text-light);
        font-size: 1rem;
        transition: var(--transition);
      }
      [data-theme="light"] .search-input {
        background: var(--light-card);
        color: var(--light-text);
        border: 1px solid var(--light-border);
      }
      .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(244, 105, 0, 0.2);
      }
      .search-button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        background: var(--primary-color);
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: var(--transition);
      }
      .search-button:hover {
        background: var(--primary-light);
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize dynamic styles
addDynamicStyles();
