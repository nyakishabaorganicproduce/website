
// Mobile nav
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('#menuBtn');
if(menuBtn){
  menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// Active link helper
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
})();

// Simple hero slider (home page only)
(function(){
  const slider = document.querySelector('[data-slider]');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dots = Array.from(slider.querySelectorAll('.dot'));
  let i = 0;
  const show = (n)=>{
    slides.forEach((s,idx)=> s.classList.toggle('active', idx===n));
    dots.forEach((d,idx)=> d.classList.toggle('active', idx===n));
    i = n;
  };
  const next = ()=> show((i+1) % slides.length);
  const prev = ()=> show((i-1 + slides.length) % slides.length);

  slider.querySelector('[data-next]')?.addEventListener('click', next);
  slider.querySelector('[data-prev]')?.addEventListener('click', prev);
  dots.forEach((d,idx)=> d.addEventListener('click', ()=> show(idx)));

  let t = setInterval(next, 5500);
  slider.addEventListener('mouseenter', ()=> clearInterval(t));
  slider.addEventListener('mouseleave', ()=> t = setInterval(next, 5500));

  show(0);
})();

// Contact form helper (no backend): opens user's email client with prefilled message
(function(){
  const form = document.querySelector('#quoteForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Nyakishaba Export Inquiry - ${data.get('company') || 'New Buyer'}`);
    const body = encodeURIComponent(
`Name: ${data.get('name')}
Company: ${data.get('company')}
Email: ${data.get('email')}
Phone/WhatsApp: ${data.get('phone')}

Product/Grade: ${data.get('product')}
Volume (MT): ${data.get('volume')}
Destination Country/Port: ${data.get('destination')}

Message:
${data.get('message')}`
    );
    const to = form.getAttribute('data-to') || 'info@nyakishabaorganicproduce.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
})();
