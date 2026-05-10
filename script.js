// ════════════════════════════════════════════════════════════════
// NUBIAN WEDDING - JavaScript Interactive Features
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// 1. COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════════

const WEDDING_DATE = new Date('2026-08-20T18:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = WEDDING_DATE - now;

  if (timeLeft < 0) {
    displayWeddingOccurred();
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update countdown display
  const countdownGrid = document.querySelector('.cd-grid');
  if (countdownGrid) {
    countdownGrid.innerHTML = `
      <div class="cd-box">
        <span class="cd-num">${String(days).padStart(2, '0')}</span>
        <span class="cd-lbl">أيام</span>
      </div>
      <div class="cd-box">
        <span class="cd-num">${String(hours).padStart(2, '0')}</span>
        <span class="cd-lbl">ساعات</span>
      </div>
      <div class="cd-box">
        <span class="cd-num">${String(minutes).padStart(2, '0')}</span>
        <span class="cd-lbl">دقائق</span>
      </div>
      <div class="cd-box">
        <span class="cd-num">${String(seconds).padStart(2, '0')}</span>
        <span class="cd-lbl">ثواني</span>
      </div>
    `;
  }
}

function displayWeddingOccurred() {
  const countdownGrid = document.querySelector('.cd-grid');
  if (countdownGrid) {
    countdownGrid.innerHTML = '<div class="cd-done">🎉 يوم الزفاف! 🎉</div>';
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ═══════════════════════════════════════════════════════════════
// 2. SCROLL TO TOP BUTTON
// ═══════════════════════════════════════════════════════════════

const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 3. SMOOTH SCROLL FOR NAVIGATION LINKS
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. RSVP FORM HANDLING
// ═══════════════════════════════════════════════════════════════

const rsvpForm = document.querySelector('form[id*="rsvp"]') || 
                 document.querySelector('form.rsvp-form');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: document.querySelector('input[name="name"]')?.value,
      email: document.querySelector('input[name="email"]')?.value,
      phone: document.querySelector('input[name="phone"]')?.value,
      attending: document.querySelector('input[name="attending"]:checked')?.value,
      dietaryRequirements: document.querySelector('textarea[name="dietary"]')?.value,
      timestamp: new Date().toISOString()
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.attending) {
      alert('من فضلك، ملء جميع الحقول المطلوبة');
      return;
    }

    // Log the data (replace with actual backend call)
    console.log('RSVP Submission:', formData);

    // Show success message
    showSuccessMessage(formData.name);

    // Optional: Send to backend
    // sendRSVPToBackend(formData);

    // Reset form
    this.reset();
  });
}

function showSuccessMessage(guestName) {
  const message = `شكراً ${guestName}! تم استقبال طلب تأكيدك بنجاح. نتطلع لرؤيتك في يوم الزفاف! 🎉`;
  
  // Create and show alert
  const alertDiv = document.createElement('div');
  alertDiv.className = 'rsvp-success-alert';
  alertDiv.innerHTML = `
    <div class="alert-content">
      <h3>✓ تم التأكيد</h3>
      <p>${message}</p>
      <button onclick="this.parentElement.parentElement.remove()">إغلاق</button>
    </div>
  `;
  alertDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,.3);
    z-index: 1000;
    text-align: center;
    direction: rtl;
  `;
  document.body.appendChild(alertDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    alertDiv.style.transition = 'opacity 0.3s';
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// Optional: Backend RSVP submission
async function sendRSVPToBackend(formData) {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit RSVP');
    }

    const result = await response.json();
    console.log('RSVP submitted successfully:', result);
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    alert('حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.');
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. ANIMATION ON SCROLL (Optional Enhancement)
// ═══════════════════════════════════════════════════════════════

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Call after DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeElements);
} else {
  observeElements();
}

// ═══════════════════════════════════════════════════════════════
// 6. MOBILE MENU TOGGLE (If needed)
// ═══════════════════════════════════════════════════════════════

function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

initMobileMenu();

// ═══════════════════════════════════════════════════════════════
// 7. PRINT OPTIMIZATION
// ═══════════════════════════════════════════════════════════════

function setupPrint() {
  window.addEventListener('beforeprint', () => {
    // Hide interactive elements during print
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // Add print stylesheet
  const printStyle = document.createElement('style');
  printStyle.textContent = `
    @media print {
      .scroll-top,
      .navbar,
      button,
      form {
        display: none !important;
      }
      body {
        background: white;
      }
    }
  `;
  document.head.appendChild(printStyle);
}

setupPrint();

// ═══════════════════════════════════════════════════════════════
// 8. LOCAL STORAGE - REMEMBER GUEST PREFERENCES
// ═══════════════════════════════════════════════════════════════

function saveGuestPreferences() {
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');

  if (nameInput && emailInput) {
    // Load saved preferences
    const savedName = localStorage.getItem('guest_name');
    const savedEmail = localStorage.getItem('guest_email');

    if (savedName) nameInput.value = savedName;
    if (savedEmail) emailInput.value = savedEmail;

    // Save preferences on input
    nameInput.addEventListener('change', () => {
      localStorage.setItem('guest_name', nameInput.value);
    });

    emailInput.addEventListener('change', () => {
      localStorage.setItem('guest_email', emailInput.value);
    });
  }
}

saveGuestPreferences();

// ═══════════════════════════════════════════════════════════════
// 9. ACCESSIBILITY - KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  // Escape key closes any open modals
  if (e.key === 'Escape') {
    document.querySelector('.rsvp-success-alert')?.remove();
  }

  // Keyboard shortcuts
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 't') {
      e.preventDefault();
      scrollTopBtn?.click();
    }
  }
});

// ════════════════════════════════════════════════════════════════
// 10. UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════

function getCurrentDate() {
  return new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getDaysSinceWedding() {
  const now = new Date().getTime();
  const timeDiff = now - WEDDING_DATE;
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

// Console greeting
console.log('%cمرحباً بك في موقع دعوة الزفاف النوبية! 🎉', 'color: #C8860A; font-size: 18px; font-weight: bold;');
console.log('%cهل تحتاج إلى مساعدة؟ تواصل معنا عبر البريد الإلكتروني', 'color: #1E4A6E; font-size: 14px;');

// ════════════════════════════════════════════════════════════════
