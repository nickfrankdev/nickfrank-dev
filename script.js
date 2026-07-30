// ---------------------------------------------------------
// Proof Sheet: scroll arrows
// ---------------------------------------------------------
const strip = document.getElementById('oworksheetStrip');
const prevBtn = document.getElementById('oworkPrev');
const nextBtn = document.getElementById('oworkNext');

function scrollStrip(dir) {
  if (!strip) return;
  const amount = strip.clientWidth * 0.8 * dir;
  strip.scrollBy({ left: amount, behavior: 'smooth' });
}
prevBtn && prevBtn.addEventListener('click', () => scrollStrip(-1));
nextBtn && nextBtn.addEventListener('click', () => scrollStrip(1));

// ---------------------------------------------------------
// Proof Sheet: popup modal
// ---------------------------------------------------------
const frames = Array.from(document.querySelectorAll('.frame'));
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentIndex = 0;
let lastFocused = null;

function openModal(index) {
  currentIndex = index;
  const frame = frames[currentIndex];
  modalImg.src = frame.dataset.img;
  modalImg.alt = frame.dataset.caption || '';
  modalCaption.textContent = frame.dataset.caption || '';
  lastFocused = document.activeElement;
  modal.hidden = false;
  modalClose.focus();
  document.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  modal.hidden = true;
  document.removeEventListener('keydown', handleKeydown);
  if (lastFocused) lastFocused.focus();
}

function showRelative(delta) {
  currentIndex = (currentIndex + delta + frames.length) % frames.length;
  const frame = frames[currentIndex];
  modalImg.src = frame.dataset.img;
  modalImg.alt = frame.dataset.caption || '';
  modalCaption.textContent = frame.dataset.caption || '';
}

function handleKeydown(e) {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') showRelative(-1);
  if (e.key === 'ArrowRight') showRelative(1);
}

frames.forEach((frame, i) => {
  frame.addEventListener('click', () => openModal(i));
});

modalClose && modalClose.addEventListener('click', closeModal);
modalPrev && modalPrev.addEventListener('click', () => showRelative(-1));
modalNext && modalNext.addEventListener('click', () => showRelative(1));

// Click outside image (on the dark backdrop) closes the modal
modal && modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
