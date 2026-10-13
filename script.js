/**
 * RAJ SINGH - PERSONAL PORTFOLIO JAVASCRIPT
 * Modern, clean, vanilla JavaScript (zero dependencies)
 * Supports file:// protocol directly out of the box.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('raj_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('raj_portfolio_theme', theme);
  }


  /* ==========================================================================
     2. DYNAMIC TYPING EFFECT (HERO SECTION)
     ========================================================================== */
  const typingElement = document.getElementById('typingText');
  const roles = [
    'B.Tech 1st Year CSE Student',
    'C / C++ Programmer',
    'Robotics Club Member @ JECRC',
    'JU Makerspace Core Member',
    'Smart India Hackathon 2026 Participant'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  /* ==========================================================================
     3. STICKY NAVBAR & ACTIVE SCROLL SPY
     ========================================================================== */
  const navbarHeader = document.getElementById('navbarHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 20) {
      navbarHeader.classList.add('scrolled');
    } else {
      navbarHeader.classList.remove('scrolled');
    }

    // Scroll spy for active link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });


  /* ==========================================================================
     4. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileNavToggle && mobileDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });

    // Close mobile menu when clicking any link inside drawer
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close when clicking outside
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (open) {
      mobileDrawer.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }


  /* ==========================================================================
     5. PROJECT FILTERING SYSTEM
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ==========================================================================
     6. PROJECT DETAIL MODAL DATA & HANDLERS
     ========================================================================== */
  const projectData = {
    1: {
      title: 'Student Record Management System (C / C++)',
      category: 'C / C++ Console Software',
      tags: ['C++', 'File Streams', 'Binary Search', 'OOPs', 'CLI'],
      description: `
        <p>A comprehensive system engineered in C++ designed to streamline student registration, grade calculation, record searching, and modification via high-speed binary and text file handling.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--color-cyan);">Key Architecture & Features:</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted); line-height: 1.8;">
          <li><strong>Object-Oriented Design:</strong> Structured classes encapsulating student metadata, GPA calculators, and attendance tracking.</li>
          <li><strong>Persistent Storage:</strong> Uses file streams (<code>fstream</code>) to serialize records safely to disk, preventing data loss across restarts.</li>
          <li><strong>Search & Sort:</strong> Efficient binary search and quick-sorting algorithms implemented for instantaneous roll number querying.</li>
          <li><strong>Menu-driven Interface:</strong> Robust CLI with input validation to prevent invalid data or buffer overflows.</li>
        </ul>
        <div style="background: var(--bg-pill); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <strong>Future Roadmap:</strong> Transitioning data storage to linked lists and SQLite C bindings.
        </div>
      `
    },
    2: {
      title: 'Robotics Telemetry & Sensor Controller',
      category: 'Robotics Club & JU Makerspace',
      tags: ['C/C++', 'Robotics', 'Ultrasonic Sensors', 'PWM Motor Control', 'Microcontroller'],
      description: `
        <p>Developed during hands-on sessions at the Robotics Club and JU Makerspace, this project implements firmware algorithms for real-time robotic obstacle detection and motor telemetry.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--color-cyan);">Key Engineering Highlights:</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted); line-height: 1.8;">
          <li><strong>Real-time Sensor Processing:</strong> Reads analog/digital sensor streams (ultrasonic & IR arrays) to calculate distance vectors in milliseconds.</li>
          <li><strong>Pulse Width Modulation (PWM):</strong> Dynamically adjusts H-Bridge motor driver speeds for smooth navigational cornering.</li>
          <li><strong>Fail-safe State Machine:</strong> Embedded state-transition logic ensuring robot safety when obstacles are within critical proximity (&lt; 15cm).</li>
          <li><strong>Collaborative Prototyping:</strong> Built and calibrated with fellow student makers in the JU Makerspace lab.</li>
        </ul>
      `
    },
    3: {
      title: 'Modern Responsive Developer Portfolio',
      category: 'Frontend Engineering',
      tags: ['HTML5', 'CSS3', 'Modern JavaScript', 'UI/UX Design', 'Performance'],
      description: `
        <p>An aesthetic, colorful, and lightning-fast developer portfolio website crafted from scratch without third-party frameworks to maintain optimal performance and accessibility.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: var(--color-cyan);">Key Features & UX:</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted); line-height: 1.8;">
          <li><strong>Zero Build Tools Required:</strong> Fully functional via <code>file://</code> protocol simply by double-clicking <code>index.html</code>.</li>
          <li><strong>Theme Engine:</strong> Seamless Dark / Light mode toggle with persistent state saved in <code>localStorage</code>.</li>
          <li><strong>Interactive Elements:</strong> Dynamic typewriter effect, printable resume modal, project filtering, and client-side contact verification.</li>
          <li><strong>Mobile First Design:</strong> Highly responsive layout with slide-in navigation drawer for mobile and tablet devices.</li>
        </ul>
      `
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const closeProjectModalFooter = document.getElementById('closeProjectModalFooter');

  document.querySelectorAll('.view-project-details').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-id');
      const data = projectData[projectId];

      if (data && projectModal) {
        projectModalTitle.textContent = data.title;
        projectModalBody.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <span class="tag tag-cyan" style="margin-bottom: 0.5rem;">${data.category}</span>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">
              ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          ${data.description}
        `;
        openModal(projectModal);
      }
    });
  });

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', () => closeModal(projectModal));
  }
  if (closeProjectModalFooter) {
    closeProjectModalFooter.addEventListener('click', () => closeModal(projectModal));
  }


  /* ==========================================================================
     7. RESUME MODAL & ACTIONS
     ========================================================================== */
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const openResumeModalNav = document.getElementById('openResumeModalNav');
  const openResumeModalMobile = document.getElementById('openResumeModalMobile');
  const downloadResumeHero = document.getElementById('downloadResumeHero');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const directDownloadBtn = document.getElementById('directDownloadBtn');

  const resumeTriggers = [openResumeModalNav, openResumeModalMobile, downloadResumeHero];

  resumeTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        toggleMobileMenu(false);
        openModal(resumeModal);
      });
    }
  });

  if (closeResumeModal) {
    closeResumeModal.addEventListener('click', () => closeModal(resumeModal));
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (directDownloadBtn) {
    directDownloadBtn.addEventListener('click', () => {
      window.print();
      showToast('Opening print dialog. Select "Save as PDF" to save!', 'info');
    });
  }


  /* ==========================================================================
     8. GENERIC MODAL CONTROLLER & KEYBOARD SUPPORT
     ========================================================================== */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modals on clicking backdrop
  [resumeModal, projectModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Escape key closes open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal && resumeModal.classList.contains('active')) closeModal(resumeModal);
      if (projectModal && projectModal.classList.contains('active')) closeModal(projectModal);
      if (mobileDrawer && mobileDrawer.classList.contains('open')) toggleMobileMenu(false);
    }
  });


  /* ==========================================================================
     9. CONTACT FORM VALIDATION & SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const submitContactBtn = document.getElementById('submitContactBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('messageSubject');
      const messageInput = document.getElementById('messageContent');

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput.value.trim();
      const messageVal = messageInput.value.trim();

      // Reset errors
      clearFormErrors();

      let isValid = true;

      if (!nameVal) {
        showFieldError('nameError', 'Please enter your name.', nameInput);
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showFieldError('emailError', 'Please enter your email address.', emailInput);
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showFieldError('emailError', 'Please provide a valid email address.', emailInput);
        isValid = false;
      }

      if (!subjectVal) {
        showFieldError('subjectError', 'Please enter a subject.', subjectInput);
        isValid = false;
      }

      if (!messageVal || messageVal.length < 5) {
        showFieldError('messageError', 'Please enter a message (at least 5 characters).', messageInput);
        isValid = false;
      }

      if (!isValid) return;

      // Loading state on button
      const originalBtnHTML = submitContactBtn.innerHTML;
      submitContactBtn.disabled = true;
      submitContactBtn.innerHTML = `
        <span>Preparing email...</span>
      `;

      setTimeout(() => {
        submitContactBtn.disabled = false;
        submitContactBtn.innerHTML = originalBtnHTML;

        // Open user's default email client pre-filled to Raj Singh
        const mailtoUri = `mailto:rajsinghup8299@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subjectVal}`)}&body=${encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`)}`;
        
        window.location.href = mailtoUri;

        showToast(`Thank you ${nameVal}! Your email client was opened to message Raj.`, 'success');
        contactForm.reset();
      }, 700);
    });
  }

  function showFieldError(errorElementId, message, inputElement) {
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) errorEl.textContent = message;
    if (inputElement) inputElement.classList.add('input-error');
  }

  function clearFormErrors() {
    ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.classList.remove('input-error');
    });
  }


  /* ==========================================================================
     10. COPY TO CLIPBOARD BUTTONS
     ========================================================================== */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
          
          // Temporary icon change for visual feedback
          const originalIcon = btn.innerHTML;
          btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          `;
          setTimeout(() => {
            btn.innerHTML = originalIcon;
          }, 1500);
        }).catch(() => {
          // Fallback if clipboard API is restricted on local file
          showToast(`Direct copy: ${textToCopy}`, 'info');
        });
      }
    });
  });


  /* ==========================================================================
     11. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Animate out & remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3800);
  }


  /* ==========================================================================
     12. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: Show elements immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* ==========================================================================
     13. BACK TO TOP BUTTON & FOOTER YEAR
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
