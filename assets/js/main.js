/**
 * Stackly Personal Training - Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initVideoModal();
    initBMICalculator();
    initPricingToggle();
    initFAQAccordion();
    initConsultationForm();
    initBackToTop();
    initNumberCounters();
    initContentRedirects();
    initAOS();
});

/* ----------------------------------------------------
   1. NAVIGATION & MOBILE DRAWER
---------------------------------------------------- */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const navBar = document.getElementById('main-nav');

    function openMobileMenu() {
        if (!mobileMenuDrawer) return;
        mobileMenuDrawer.classList.remove('translate-x-full');
        mobileMenuBackdrop.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        if (!mobileMenuDrawer) return;
        mobileMenuDrawer.classList.add('translate-x-full');
        mobileMenuBackdrop.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

    // Close mobile drawer when clicking nav links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Sticky Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (!navBar) return;
        if (window.scrollY > 40) {
            navBar.classList.add('bg-[#07111a]/95', 'backdrop-blur-md', 'border-b', 'border-white/5');
            navBar.classList.remove('bg-transparent', 'py-5', 'shadow-lg');
            navBar.classList.add('py-3.5');
        } else {
            navBar.classList.remove('bg-[#07111a]/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'shadow-lg');
            navBar.classList.add('bg-transparent', 'py-5');
            navBar.classList.remove('py-3.5');
        }
    });
}

/* ----------------------------------------------------
   2. VIDEO MODAL
---------------------------------------------------- */
let videoModal, videoIframe;

function initVideoModal() {
    videoModal = document.getElementById('video-modal');
    videoIframe = document.getElementById('video-modal-iframe');
    const closeBtn = document.getElementById('video-modal-close');
    const backdrop = document.getElementById('video-modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
    if (backdrop) backdrop.addEventListener('click', closeVideoModal);

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
}

window.openVideoModal = function() {
    if (!videoModal) return;
    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    if (videoIframe) {
        // High quality workout teaser video
        videoIframe.src = "https://www.youtube-nocookie.com/embed/gC_L9qAHVJ8?autoplay=1&mute=0&rel=0";
    }
};

window.closeVideoModal = function() {
    if (!videoModal) return;
    videoModal.classList.add('hidden');
    videoModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    if (videoIframe) {
        videoIframe.src = "";
    }
};

/* ----------------------------------------------------
   3. INTERACTIVE BMI & FITNESS CALCULATOR
---------------------------------------------------- */
function initBMICalculator() {
    const calcBtn = document.getElementById('bmi-calc-btn');
    const heightInput = document.getElementById('bmi-height');
    const weightInput = document.getElementById('bmi-weight');
    const unitMetric = document.getElementById('unit-metric');
    const unitImperial = document.getElementById('unit-imperial');
    const resultBox = document.getElementById('bmi-result-box');
    const bmiValueEl = document.getElementById('bmi-value');
    const bmiStatusEl = document.getElementById('bmi-status');
    const bmiAdviceEl = document.getElementById('bmi-advice');

    let currentUnit = 'metric';

    if (unitMetric && unitImperial) {
        unitMetric.addEventListener('click', () => {
            currentUnit = 'metric';
            unitMetric.classList.add('bg-[#00e5c9]', 'text-gray-950');
            unitMetric.classList.remove('text-gray-300', 'bg-white/5');
            unitImperial.classList.remove('bg-[#00e5c9]', 'text-gray-950');
            unitImperial.classList.add('text-gray-300', 'bg-white/5');
            document.getElementById('bmi-height-unit').innerText = 'cm';
            document.getElementById('bmi-weight-unit').innerText = 'kg';
            heightInput.placeholder = '175';
            weightInput.placeholder = '70';
        });

        unitImperial.addEventListener('click', () => {
            currentUnit = 'imperial';
            unitImperial.classList.add('bg-[#00e5c9]', 'text-gray-950');
            unitImperial.classList.remove('text-gray-300', 'bg-white/5');
            unitMetric.classList.remove('bg-[#00e5c9]', 'text-gray-950');
            unitMetric.classList.add('text-gray-300', 'bg-white/5');
            document.getElementById('bmi-height-unit').innerText = 'in';
            document.getElementById('bmi-weight-unit').innerText = 'lbs';
            heightInput.placeholder = '69';
            weightInput.placeholder = '160';
        });
    }

    if (calcBtn) {
        calcBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);

            if (!height || !weight || height <= 0 || weight <= 0) {
                if (!height || height <= 0) {
                    heightInput.reportValidity();
                    heightInput.focus();
                } else if (!weight || weight <= 0) {
                    weightInput.reportValidity();
                    weightInput.focus();
                }
                showToast('Please enter valid height and weight values', 'error');
                return;
            }

            // Validated -> Redirect to 404 page
            window.location.href = '404.html';
        });
    }
}

/* ----------------------------------------------------
   4. PRICING MONTHLY / ANNUAL TOGGLE
---------------------------------------------------- */
function initPricingToggle() {
    const toggleBtn = document.getElementById('pricing-toggle');
    if (!toggleBtn) return;

    let isAnnual = false;
    const starterPrice = document.getElementById('price-starter');
    const proPrice = document.getElementById('price-pro');
    const elitePrice = document.getElementById('price-elite');
    const billingPeriods = document.querySelectorAll('.price-period');
    const togglePill = document.getElementById('pricing-toggle-pill');

    toggleBtn.addEventListener('click', () => {
        isAnnual = !isAnnual;
        if (isAnnual) {
            togglePill.classList.add('translate-x-7');
            starterPrice.innerText = '$39';
            proPrice.innerText = '$79';
            elitePrice.innerText = '$149';
            billingPeriods.forEach(el => el.innerText = '/ month, billed annually');
            showToast('Annual discount (Save 20%) applied!', 'success');
        } else {
            togglePill.classList.remove('translate-x-7');
            starterPrice.innerText = '$49';
            proPrice.innerText = '$99';
            elitePrice.innerText = '$189';
            billingPeriods.forEach(el => el.innerText = '/ month');
        }
    });
}

/* ----------------------------------------------------
   5. FAQ ACCORDION
---------------------------------------------------- */
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-trigger');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const container = btn.closest('div.border, div.bg-\\[\\#0b1724\\], div.bg-\\[\\#0d1924\\]') || btn.parentElement;
            const answer = container ? container.querySelector('.faq-content') : btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');

            if (!answer) return;

            const isOpen = !answer.classList.contains('hidden');

            // Close all within the accordion container
            const accordionRoot = btn.closest('.space-y-4, .space-y-3') || document;
            accordionRoot.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            accordionRoot.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180', 'text-[#00e5c9]'));
            accordionRoot.querySelectorAll('.faq-trigger').forEach(b => b.setAttribute('aria-expanded', 'false'));

            if (!isOpen) {
                answer.classList.remove('hidden');
                btn.setAttribute('aria-expanded', 'true');
                if (icon) {
                    icon.classList.add('rotate-180', 'text-[#00e5c9]');
                }
            }
        });
    });
}

/* ----------------------------------------------------
   6. CONSULTATION & BOOKING FORMS WITH VALIDATION & 404 REDIRECTION
---------------------------------------------------- */
function initConsultationForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Skip nav and footer forms if any
        if (form.closest('#main-nav, #mobile-menu-drawer, header, footer')) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Native HTML5 validity check
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // 2. Custom validation for required inputs, email, and phone
            const inputs = form.querySelectorAll('input, select, textarea');
            let firstInvalid = null;
            let errorMsg = '';

            for (let input of inputs) {
                const val = input.value.trim();
                if (input.hasAttribute('required') && !val) {
                    firstInvalid = input;
                    errorMsg = 'Please fill out this required field.';
                    break;
                }
                if (input.type === 'email' && val) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        firstInvalid = input;
                        errorMsg = 'Please enter a valid email address.';
                        break;
                    }
                }
                if (input.type === 'tel' && val) {
                    const cleanPhone = val.replace(/\D/g, '');
                    if (cleanPhone.length < 7) {
                        firstInvalid = input;
                        errorMsg = 'Please enter a valid phone number with at least 7 digits.';
                        break;
                    }
                }
            }

            if (firstInvalid) {
                firstInvalid.setCustomValidity(errorMsg);
                firstInvalid.reportValidity();
                firstInvalid.focus();
                firstInvalid.addEventListener('input', () => firstInvalid.setCustomValidity(''), { once: true });
                return;
            }

            // 3. Validation passed -> Navigate to 404 page
            window.location.href = '404.html';
        });
    });
}

window.openConsultModal = function() {
    window.location.href = '404.html';
};

window.openVideoModal = function() {
    window.location.href = '404.html';
};

/* ----------------------------------------------------
   7. TOAST NOTIFICATION SYSTEM
---------------------------------------------------- */
window.showToast = function(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3 pointer-events-none';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const bgClass = isSuccess ? 'bg-[#0d1f2d] border-[#00e5c9]' : 'bg-[#291317] border-red-500';
    const textClass = isSuccess ? 'text-[#00e5c9]' : 'text-red-400';
    const iconClass = isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.className = `pointer-events-auto flex items-center space-x-3 px-5 py-4 rounded-xl border ${bgClass} shadow-2xl transition-all duration-300 transform translate-y-8 opacity-0 max-w-sm text-sm text-white`;
    toast.innerHTML = `
        <i class="fa-solid ${iconClass} ${textClass} text-lg flex-shrink-0"></i>
        <div class="leading-snug">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-8', 'opacity-0');
    });

    // Animate out
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

/* ----------------------------------------------------
   8. BACK TO TOP
---------------------------------------------------- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('opacity-0', 'invisible');
            btn.classList.add('opacity-100', 'visible');
        } else {
            btn.classList.add('opacity-0', 'invisible');
            btn.classList.remove('opacity-100', 'visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ----------------------------------------------------
   9. ANIMATED NUMBER COUNTERS
---------------------------------------------------- */
function initNumberCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-counter-target'));
                const prefix = el.getAttribute('data-counter-prefix') || '';
                const suffix = el.getAttribute('data-counter-suffix') || '';
                const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
                const duration = 2000;
                let startTime = null;

                function step(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutCubic
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const currentVal = ease * target;

                    if (decimals > 0) {
                        el.textContent = prefix + currentVal.toFixed(decimals) + suffix;
                    } else {
                        el.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        if (decimals > 0) {
                            el.textContent = prefix + target.toFixed(decimals) + suffix;
                        } else {
                            el.textContent = prefix + target.toLocaleString() + suffix;
                        }
                    }
                }

                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    counterElements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
   10. 404 REDIRECTION FOR CONTENT LINKS & BUTTONS
---------------------------------------------------- */
function initContentRedirects() {
    document.addEventListener('click', (e) => {
        // 1. Exclude navbar (desktop header & mobile drawer)
        if (e.target.closest('#main-nav, #mobile-menu-drawer, header, .nav-container')) return;

        // 2. Exclude footer
        if (e.target.closest('footer')) return;

        // 3. Allow interacting with form fields
        if (e.target.closest('input, textarea, select, label')) return;

        // 4. Form submit buttons trigger form submit validation
        const submitBtn = e.target.closest('button[type="submit"], input[type="submit"]');
        if (submitBtn) return;

        // 5. Exclude interactive FAQ accordion triggers & contents
        if (e.target.closest('.faq-trigger, .faq-content, .faq-icon')) return;

        // 6. Exclude interactive widgets & modals
        if (e.target.closest('#back-to-top, #pricing-toggle, #bmi-calc-btn, #video-modal, .modal-close')) return;

        // 7. Any other link or button in the webpage content -> 404 page
        const clickable = e.target.closest('a, button');
        if (clickable) {
            e.preventDefault();
            window.location.href = '404.html';
        }
    });
}

/* ----------------------------------------------------
   11. AOS (ANIMATE ON SCROLL) INITIALIZATION
---------------------------------------------------- */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 750,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40,
            disableMutationObserver: false,
        });
    }
}
