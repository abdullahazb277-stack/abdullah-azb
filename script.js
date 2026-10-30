/**
 * ABDULLAH AZB — PORTFOLIO 2026
 * Interactive Logic: Navigation, Theme Switching, PLC Logic Simulator,
 * Project Filtering, Accessible Modal System & Contact Composer.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. THEME SWITCHER (Dark Default with LocalStorage & OS Preference)
  // ==========================================================================
  const THEME_STORAGE_KEY = 'azb_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default is dark as per prompt requirements
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn && themeIcon) {
      if (theme === 'light') {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        themeToggleBtn.setAttribute('title', 'Switch to dark theme');
        // Moon icon for light mode (to switch back to dark)
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      } else {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
        themeToggleBtn.setAttribute('title', 'Switch to light theme');
        // Sun icon for dark mode (to switch to light)
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
    }
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    navMenu.classList.add('is-open');
    navToggleBtn.classList.add('is-active');
    navToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('is-open');
    navToggleBtn.classList.remove('is-active');
    navToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav item
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggleBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Reset on window resize past mobile breakpoint
    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth > 1080 && navMenu.classList.contains('is-open')) {
          closeMobileMenu();
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // 3. SCROLL SPY & ACTIVE NAV LINK TRACKING
  // ==========================================================================
  const trackedSections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const navOffset = 120;

    let currentSectionId = '';
    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop - navOffset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ==========================================================================
  // 4. BACK-TO-TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.pageYOffset > 400) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ==========================================================================
  // 5. INTERACTIVE HERO PLC LADDER SIMULATOR
  // ==========================================================================
  // Simulates standard Seal-In Latching Logic: %Q0.0 = (%I0.0 OR %Q0.0) AND %I0.1 AND %I0.2
  const plcStartBtn = document.getElementById('plcStartBtn');
  const plcStopBtn = document.getElementById('plcStopBtn');
  const plcTripBtn = document.getElementById('plcTripBtn');
  const plcStateBulb = document.getElementById('plcStateBulb');
  const plcStateText = document.getElementById('plcStateText');
  const plcRungWire = document.getElementById('plcRungWire');
  const plcCoilSymbol = document.getElementById('plcCoilSymbol');
  const plcLatchContact = document.getElementById('plcLatchContact');

  let isCoilEnergized = false;
  let isOverloadTripped = false;

  function renderPlcState() {
    if (isOverloadTripped) {
      isCoilEnergized = false;
      plcStateBulb.classList.remove('is-energized');
      plcStateBulb.style.backgroundColor = '#FF7B72';
      plcStateText.textContent = '%Q0.0: TRIPPED (OVERLOAD %I0.2 OPEN)';
      plcStateText.style.color = '#FF7B72';
      if (plcRungWire) plcRungWire.setAttribute('stroke', '#3A4A5E');
      if (plcCoilSymbol) plcCoilSymbol.setAttribute('stroke', '#FF7B72');
      if (plcLatchContact) plcLatchContact.setAttribute('stroke', '#3A4A5E');
    } else if (isCoilEnergized) {
      plcStateBulb.classList.add('is-energized');
      plcStateBulb.style.backgroundColor = 'var(--accent-primary)';
      plcStateText.textContent = '%Q0.0: MOTOR ENERGIZED (LATCHED ON)';
      plcStateText.style.color = 'var(--accent-primary)';
      if (plcRungWire) plcRungWire.setAttribute('stroke', 'var(--accent-primary)');
      if (plcCoilSymbol) plcCoilSymbol.setAttribute('stroke', 'var(--accent-primary)');
      if (plcLatchContact) plcLatchContact.setAttribute('stroke', 'var(--accent-primary)');
    } else {
      plcStateBulb.classList.remove('is-energized');
      plcStateBulb.style.backgroundColor = '#3A4A5E';
      plcStateText.textContent = '%Q0.0: MOTOR DE-ENERGIZED (IDLE)';
      plcStateText.style.color = 'var(--text-muted)';
      if (plcRungWire) plcRungWire.setAttribute('stroke', '#3A4A5E');
      if (plcCoilSymbol) plcCoilSymbol.setAttribute('stroke', '#3A4A5E');
      if (plcLatchContact) plcLatchContact.setAttribute('stroke', '#3A4A5E');
    }
  }

  if (plcStartBtn) {
    plcStartBtn.addEventListener('click', () => {
      if (isOverloadTripped) {
        // Reset overload on retry
        isOverloadTripped = false;
      }
      isCoilEnergized = true;
      renderPlcState();
    });
  }

  if (plcStopBtn) {
    plcStopBtn.addEventListener('click', () => {
      isCoilEnergized = false;
      isOverloadTripped = false;
      renderPlcState();
    });
  }

  if (plcTripBtn) {
    plcTripBtn.addEventListener('click', () => {
      isOverloadTripped = true;
      renderPlcState();
    });
  }

  // ==========================================================================
  // 6. PROJECT CATEGORY FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 7. PROJECT DETAILS MODAL SYSTEM
  // ==========================================================================
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDomain = document.getElementById('modalDomain');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  let previousActiveElement = null;

  // Complete data repository matching all specifications
  const projectsData = {
    wheelchair: {
      domain: 'Mechatronics | Embedded Systems | Assistive Technology',
      title: 'Smart Tilt-Controlled Wheelchair',
      overview:
        'A smart wheelchair control concept that explores translating head movements into directional motion commands through a wearable helmet. The objective is to investigate an intuitive, hands-free alternative to conventional joystick-based control for individuals with limited upper-limb mobility.',
      illustration: 'assets/images/smart-wheelchair.svg',
      technologies: [
        'ESP32 Microcontrollers (Dual RF Link)',
        'MPU6050 Accelerometer & Gyroscope',
        'Bluetooth 2.4 GHz Wireless Communication',
        'IBT-2 High-Current Motor Drivers (PWM)',
        '24V DC Differential Drive Motors',
        'Embedded C / C++ Firmware',
        'Complementary Filter (Sensor Fusion)',
      ],
      technicalFocus: [
        'Head-Tilt Detection: 3-axis pitch and roll angle extraction from IMU telemetry.',
        'Sensor Data Processing: Complementary filter integration to eliminate gyroscope drift and acceleration jitter.',
        'Direction Mapping: Coordinate transformation translating neck orientation to differential motor speeds.',
        'Wireless Communication: Low-latency RF packet transmission between helmet and wheelchair chassis.',
        'Motor-Control Logic: PWM acceleration ramps and dynamic differential steering.',
        'Neutral-Position Detection: Defined angular deadzone around the rest posture preventing accidental creep.',
        'Fail-Safe Stopping Concepts: Communication watchdog timer triggering automatic braking on signal loss.',
      ],
      status: 'Academic Exploration & Concept Prototype Design',
      contribution: 'Concept formulation, embedded logic architecture, sensor-to-motor control mapping study.',
      documentationSupport:
        'The architecture supports future integration of test telemetry, circuit schematics, chassis CAD models, and fail-safe field validation data.',
      safetyNotice:
        'Safety & Compliance Note: Explored strictly as an academic engineering concept. Does not claim validated medical-grade safety or clinical certification.',
    },
    radar: {
      domain: 'Embedded Systems | Electronics | Sensors',
      title: 'Arduino Radar System',
      overview:
        'An Arduino-based spatial radar scanning concept utilizing an ultrasonic transducer and a micro-servo motor to sweep a 180-degree sector, calculating distance, heading, and object presence.',
      illustration: 'assets/images/arduino-radar.svg',
      technologies: [
        'Arduino Uno Microcontroller (ATmega328P)',
        'HC-SR04 Ultrasonic Distance Sensor',
        'SG90 9g Mini Servo Motor',
        'C++ Arduino IDE Firmware',
        'Serial Data Telemetry Protocol',
      ],
      technicalFocus: [
        'Ultrasonic Distance Measurement: Precise pulse-timing calculation using sound velocity (343 m/s).',
        'Servo-Based Scanning: Smooth angular stepped sweep from 0° to 180° with settling delay.',
        'Sensor Integration: Fast digital triggering (10μs trigger pulse) and echo capture.',
        'Microcontroller Programming: Non-blocking interrupt-friendly timer routines.',
        'Object Detection and Visualization: Streaming structured angle/distance pairs for polar map rendering.',
      ],
      status: 'Academic Concept & Embedded Sensing Prototype',
      contribution: 'Firmware development, sensor calibration, geometric distance calculation, and serial visualization logic.',
      documentationSupport:
        'Project structure supports future addition of polar coordinate software scripts, breadboard wiring schematics, and angular accuracy test logs.',
      safetyNotice: 'Designed as a laboratory sensing and spatial mapping learning platform.',
    },
    parking: {
      domain: 'Automation | Embedded Systems | Smart Infrastructure',
      title: 'Smart Parking Barrier',
      overview:
        'An automated parking barrier concept designed to manage vehicular ingress and egress through presence sensing, microcontroller logic, and servo-actuated physical access gating.',
      illustration: 'assets/images/parking-barrier.svg',
      technologies: [
        'Microcontroller Processing Unit',
        'Ultrasonic / Proximity Optical Sensors',
        'Servo Motor Gate Actuator',
        'LED Access Status Indicators',
        'Embedded Control State Logic',
      ],
      technicalFocus: [
        'Vehicle Detection: Ultrasonic proximity thresholding for vehicle presence verification.',
        'Automated Barrier Control: State machine managing closed, opening, opened, and closing transitions.',
        'Servo Motor Operation: Controlled angular positioning with anti-slam motion profiles.',
        'Embedded Programming: Debounced digital input filtering and auto-close timer loops.',
        'Control Logic & Interlocks: Anti-tailgating delays and clearance safety confirmations.',
        'Access-Control Concepts: Architectural readiness for RFID, ticket, or ANPR badge integration.',
      ],
      status: 'Academic Concept Exploration',
      contribution: 'State machine architecture design, proximity sensing threshold analysis, and actuation logic.',
      documentationSupport:
        'Supports future additions of mechanical arm sizing calculations, physical enclosure designs, and access control interface code.',
      safetyNotice: 'Conceptual system exploring municipal and residential parking automation mechanisms.',
    },
    attendance: {
      domain: 'Embedded Systems | Identification | Automation',
      title: 'Smart Attendance Management System',
      overview:
        'A smart attendance recording concept combining contactless radio-frequency identification (RFID), battery-backed real-time clock timestamping, visual feedback, and wireless data synchronization.',
      illustration: 'assets/images/attendance-system.svg',
      technologies: [
        'Arduino Processing Core',
        'MFRC522 RFID 13.56 MHz Reader & Passive Tags',
        'DS3231 High-Precision I2C Real-Time Clock',
        '16x2 Liquid Crystal Display (I2C Bus)',
        'HC-05 Bluetooth Serial Transceiver',
      ],
      technicalFocus: [
        'User Identification: Unique Identifier (UID) reading and checksum validation via SPI bus.',
        'Attendance Recording: Local registration and timestamp pairing without network reliance.',
        'Date and Time Integration: DS3231 battery-backed timekeeping with leap-year compensation.',
        'Information Display: Immediate user feedback ("Access Granted", "ID Recognized", "Timestamp").',
        'Wireless Communication: UART serial stream over Bluetooth to PC or mobile administrative host.',
      ],
      status: 'Academic Concept & System Architecture',
      contribution: 'System architecture, peripheral bus integration (SPI + I2C + UART), and timing verification flow.',
      documentationSupport:
        'Prepared for future database integration scripts, circuit diagrams, and hardware PCB layout files.',
      safetyNotice: 'Explored as an embedded identification concept for academic and enterprise environments.',
    },
    cnc: {
      domain: 'Mechanical Design | Manufacturing | Automation',
      title: 'CNC Router Machine',
      overview:
        'A CNC router machine explored in the multidisciplinary context of mechatronics, focusing on structural rigidity, Cartesian coordinate positioning, multi-axis actuation, and computerized toolhead control.',
      illustration: 'assets/images/cnc-router.svg',
      technologies: [
        '3-Axis Cartesian Gantry Mechanics (X, Y, Z)',
        'NEMA Stepper Motors & Microstepping Drivers',
        'Lead Screws & Supported Linear Rails',
        'High-Speed Rotary Spindle & Collet',
        'SolidWorks CAD & CAM Simulation',
        'CNC G-Code Motion Controller',
      ],
      technicalFocus: [
        'Mechanical System Design: Rigid gantry frame analysis to withstand cutting loads and minimize deflection.',
        'Motion and Positioning: Pitch resolution, backlash elimination, and lead screw step-per-mm calculation.',
        'Motors and Actuation: Torque curve matching, current limiting, and driver heat dissipation.',
        'Machine Structure: Aluminum profile extrusion and gantry upright alignment.',
        'CNC Control Fundamentals: G-code coordinate translation and multi-axis trajectory interpolation.',
        'Mechanical and Electronic Integration: Limit switch homing, emergency stop interlocks, and spindle relays.',
      ],
      status: 'Academic Mechanical Design & Mechatronics Study',
      contribution: 'CAD modeling, kinematic analysis, motion component sizing, and controller interfacing review.',
      documentationSupport:
        'Designed to accommodate future assembly drawings, toolpath CAM simulations, BOM cost sheets, and cut test specimens.',
      safetyNotice: 'Exploratory engineering analysis of automated subtractive manufacturing systems.',
    },
  };

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !modalOverlay) return;

    previousActiveElement = document.activeElement;

    modalDomain.textContent = data.domain;
    modalTitle.textContent = data.title;

    let techPillsHtml = data.technologies
      .map((tech) => `<div class="modal-list-item"><strong>${tech}</strong></div>`)
      .join('');

    let focusPointsHtml = data.technicalFocus
      .map((item) => `<li class="modal-focus-item" style="margin-bottom:0.6rem; color:var(--text-muted); font-size:0.9375rem;">• ${item}</li>`)
      .join('');

    modalContent.innerHTML = `
      <div class="modal-illustration-wrap">
        <img src="${data.illustration}" alt="${data.title} Architecture Schematic" loading="lazy" style="width:100%; height:auto;">
      </div>

      <h4 class="modal-section-h4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Project Overview
      </h4>
      <p style="color:var(--text-muted); margin-bottom:1.5rem; line-height:1.75;">${data.overview}</p>

      <h4 class="modal-section-h4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        Technologies &amp; Components Explored
      </h4>
      <div class="modal-list">
        ${techPillsHtml}
      </div>

      <h4 class="modal-section-h4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        Core Technical Focus
      </h4>
      <ul style="padding-left:0.5rem; margin-bottom:1.5rem;">
        ${focusPointsHtml}
      </ul>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-top:1.5rem;">
        <div style="background:var(--bg-primary); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-primary); font-weight:700; text-transform:uppercase;">Implementation Status</div>
          <div style="font-size:0.9375rem; color:var(--text-main); font-weight:600; margin-top:0.25rem;">${data.status}</div>
        </div>
        <div style="background:var(--bg-primary); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-secondary); font-weight:700; text-transform:uppercase;">Contribution Focus</div>
          <div style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">${data.contribution}</div>
        </div>
      </div>

      <div class="modal-notice">
        <strong>Documentation Pipeline:</strong> ${data.documentationSupport}
      </div>

      <div style="margin-top:1rem; font-size:0.8125rem; color:var(--text-dim); font-style:italic;">
        ${data.safetyNotice}
      </div>
    `;

    modalOverlay.classList.add('is-active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  // Attach triggers to detail buttons
  const detailBtns = document.querySelectorAll('[data-project-target]');
  detailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-project-target');
      openProjectModal(target);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }

  // ==========================================================================
  // 8. CONTACT FORM / MESSAGE COMPOSER
  // ==========================================================================
  // Since email and phone are not provided in the source prompt, we provide
  // a legitimate client-side composer that prepares an email via mailto: or
  // formats the text to copy directly to clipboard for LinkedIn/Facebook DMs.
  const contactForm = document.getElementById('contactComposerForm');
  const copyBtn = document.getElementById('copyMessageBtn');
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  const feedbackMsg = document.getElementById('formFeedbackMsg');

  function getComposerData() {
    const name = document.getElementById('senderName')?.value.trim() || 'Colleague / Professional';
    const org = document.getElementById('senderOrg')?.value.trim() || 'Professional Network';
    const subject = document.getElementById('messageSubject')?.value.trim() || 'Professional Inquiry / Collaboration';
    const message = document.getElementById('messageBody')?.value.trim() || '';

    const formattedMessage =
      `Hello Abdullah,\n\n` +
      `My name is ${name} (${org}).\n\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n\n` +
      `Looking forward to connecting with you!\n` +
      `— Sent via Abdullah Azb Portfolio 2026`;

    return { name, org, subject, message, formattedMessage };
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getComposerData();
      if (!data.message) {
        alert('Please enter a message before copying.');
        return;
      }

      navigator.clipboard
        .writeText(data.formattedMessage)
        .then(() => {
          if (feedbackMsg) {
            feedbackMsg.className = 'form-feedback-msg is-success';
            feedbackMsg.textContent =
              '✓ Message copied to clipboard! You can now paste it directly into LinkedIn, Facebook, or Instagram to connect with Abdullah.';
            feedbackMsg.style.display = 'block';
            setTimeout(() => {
              feedbackMsg.style.display = 'none';
            }, 7000);
          }
        })
        .catch(() => {
          alert('Could not copy to clipboard automatically. Please select and copy manually.');
        });
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getComposerData();
      if (!data.message) {
        alert('Please enter a message before launching email client.');
        return;
      }

      const encodedSubject = encodeURIComponent(`[Portfolio 2026] ${data.subject} - ${data.name}`);
      const encodedBody = encodeURIComponent(data.formattedMessage);

      // Open user's default email composer
      window.location.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

      if (feedbackMsg) {
        feedbackMsg.className = 'form-feedback-msg is-success';
        feedbackMsg.textContent =
          '✓ Email client opened! If your email client does not launch automatically, click "Copy Formatted Message" and connect with Abdullah via LinkedIn or social channels.';
        feedbackMsg.style.display = 'block';
      }
    });
  }

  // ==========================================================================
  // 9. CONSOLE GREETING (ENGINEERING TELEMETRY)
  // ==========================================================================
  console.log(
    '%c ABDULLAH AZB — PORTFOLIO 2026 %c\n' +
      'Delta Technological University | Mechatronics Technology\n' +
      '"Engineering Mindset. Business Thinking. Continuous Innovation."',
    'background: #00D1B2; color: #0B0F14; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #4DA3FF; font-weight: normal; padding-left: 4px;'
  );
})();
