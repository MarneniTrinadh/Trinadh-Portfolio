const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
function updateThemeIcon(){ if(themeIcon) themeIcon.textContent = root.dataset.theme === 'dark' ? '☼' : '☾'; }
updateThemeIcon();
themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('trinadh-theme', root.dataset.theme);
  updateThemeIcon();
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const filters = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.toggle('selected', item === button));
  const filter = button.dataset.filter;
  cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
}));
const sectionLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
const whatsappButton = document.getElementById('sendWhatsApp');
const contactPopup = document.getElementById('contactPopup');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const popupIcon = document.getElementById('popupIcon');

// Add the IDs from your EmailJS dashboard here before publishing.
const EMAILJS_PUBLIC_KEY = 'nytx4Yid3dl-3NhIQ';
const EMAILJS_SERVICE_ID = 'service_9gta7vn';
const EMAILJS_TEMPLATE_ID = 'template_ccz15zj';

if (window.emailjs && !EMAILJS_PUBLIC_KEY.includes('YOUR_')) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function contactMessage(){
 const sender=document.getElementById('senderEmail')?.value.trim()||'';
 const subject=document.getElementById('messageSubject')?.value.trim()||'Portfolio enquiry';
 const message=document.getElementById('messageBody')?.value.trim()||'';
 return {sender,subject,message};
}

function showContactPopup(title, message, success = true) {
  if (!contactPopup) return;
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popupIcon.textContent = success ? '✓' : '!';
  popupIcon.classList.toggle('popup-icon-error', !success);
  contactPopup.classList.add('show');
  contactPopup.setAttribute('aria-hidden', 'false');
  document.getElementById('closePopup')?.focus();
}

function closeContactPopup() {
  contactPopup?.classList.remove('show');
  contactPopup?.setAttribute('aria-hidden', 'true');
}

document.getElementById('closePopup')?.addEventListener('click', closeContactPopup);
contactPopup?.addEventListener('click', event => {
  if (event.target === contactPopup) closeContactPopup();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeContactPopup();
});

contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!window.emailjs || EMAILJS_PUBLIC_KEY.includes('YOUR_') ||
      EMAILJS_SERVICE_ID.includes('YOUR_') || EMAILJS_TEMPLATE_ID.includes('YOUR_')) {
    showContactPopup('Email setup required', 'The email service has not been configured yet. Please try WhatsApp or configure the EmailJS IDs.', false);
    return;
  }

  const {sender,subject,message} = contactMessage();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name: sender,
      email: sender,
      title: subject,
      message,
      time: new Date().toLocaleString()
    });
    contactForm.reset();
    showContactPopup('Message sent successfully!', 'Thank you for contacting me. Your message was submitted successfully. I will get back to you soon.');
  } catch (error) {
    console.error('EmailJS send failed:', error);
    showContactPopup('Message not sent', 'Sorry, your message could not be sent. Please try again or use WhatsApp.', false);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send by email ↗';
    }
  }
});

whatsappButton?.addEventListener('click', () => {
  if (!contactForm?.reportValidity()) return;
  const {sender,subject,message} = contactMessage();
  const text = ['Portfolio enquiry', `From: ${sender}`, `Subject: ${subject}`, '', message].join('\n');
  const url = `https://wa.me/919849251577?text=${encodeURIComponent(text)}`;
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    showContactPopup('WhatsApp opened', 'Your message is ready in WhatsApp. Please press Send in WhatsApp to deliver it.');
  } else {
    showContactPopup('Allow pop-ups', 'Your browser blocked WhatsApp from opening. Allow pop-ups for this site and try again.', false);
  }
});
