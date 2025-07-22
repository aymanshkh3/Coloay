// Smooth scroll already supported by CSS (scroll-behavior: smooth)

// Scroll animation trigger
function revealOnScroll() {
  const elements = document.querySelectorAll('.scroll-animate');
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Contact Form Submit Handler (Simulated)
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  if (!name || !email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  alert('Thanks for reaching out! We will contact you soon.');
  form.reset();
});
