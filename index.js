// ===== WINE SLIDER DATA =====
const wineData = [
  { image: 'images/jamun1.jpeg',      name: 'Jamun Wine',        type: 'Reserve Collection', orchardImage: 'images/jamun5.png' },
  { image: 'images/strawberry1.png',  name: 'Strawberry Wine',   type: 'Premium Selection',  orchardImage: 'images/strawberry3.png' },
  { image: 'images/pome1.png',        name: 'Pomegranate Wine',  type: 'Signature Blend',    orchardImage: 'images/pome (2).png' },
  { image: 'images/mahua2.png',       name: 'Mahua Wine',        type: 'Limited Edition',    orchardImage: 'images/mahua2.png' },
];

let currentWineIndex = 0;

function updateWineDisplay(animate) {
  const wine = wineData[currentWineIndex];
  const bottle = document.querySelector('.wine-bottle');
  const name   = document.querySelector('.wine-name');
  const type   = document.querySelector('.wine-type');
  const lifestyleImg = document.querySelector('.lifestyle-image img');

  if (!bottle || !name) return;

  if (animate) {
    bottle.style.opacity = '0';
    bottle.style.transform = 'translateY(12px)';
    if (lifestyleImg) {
      lifestyleImg.style.opacity = '0';
      lifestyleImg.style.transform = 'scale(0.98)';
    }
    setTimeout(() => {
      bottle.src = wine.image;
      name.textContent = wine.name;
      if (type) type.textContent = wine.type;
      if (lifestyleImg && wine.orchardImage) {
        lifestyleImg.src = wine.orchardImage;
      }
      bottle.style.opacity = '1';
      bottle.style.transform = 'translateY(0)';
      if (lifestyleImg) {
        lifestyleImg.style.opacity = '1';
        lifestyleImg.style.transform = 'scale(1)';
      }
    }, 280);
  } else {
    bottle.src = wine.image;
    name.textContent = wine.name;
    if (type) type.textContent = wine.type;
    if (lifestyleImg && wine.orchardImage) {
      lifestyleImg.src = wine.orchardImage;
    }
  }

  // Update dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentWineIndex);
  });
}

function nextWine() {
  currentWineIndex = (currentWineIndex + 1) % wineData.length;
  updateWineDisplay(true);
}

function prevWine() {
  currentWineIndex = (currentWineIndex - 1 + wineData.length) % wineData.length;
  updateWineDisplay(true);
}

// ===== VISIT SECTION =====
function initVisitSection() {
  const menuItems = document.querySelectorAll('.visit-menu-item');
  const visitImage = document.querySelector('.visit-image');
  const visitDescription = document.querySelector('.visit-description');

  const visitData = {
    private: {
      image: 'images/rectanglesize4.png',
      description: "Experience the essence of our terroir through intimate tastings where each glass tells the story of our Orchards's heritage."
    },
    room: {
      image: 'images/rectanglesize5.png',
      description: 'Join us in our elegant tasting room where tradition meets sophistication in every carefully curated wine experience.'
    },
    food: {
      image: 'images/pome8.png',
      description: 'Discover perfect pairings where our culinary artistry complements the complexity and character of our finest wines.'
    }
  };

  function updateVisitContent(type) {
    const data = visitData[type];
    if (visitImage && visitDescription && data) {
      visitImage.src = data.image;
      visitDescription.textContent = data.description;
    }
  }

  menuItems.forEach(item => {
    const visitType = item.getAttribute('data-visit');

    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateVisitContent(visitType);
    });

    item.addEventListener('mouseenter', () => updateVisitContent(visitType));

    item.addEventListener('mouseleave', () => {
      const active = document.querySelector('.visit-menu-item.active');
      if (active) updateVisitContent(active.getAttribute('data-visit'));
    });
  });
}

// ===== INSTAGRAM SCROLL ANIMATION =====
function initInstagramAnimation() {
  const items = document.querySelectorAll('.instagram-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

// ===== STORIES PARALLAX =====
function initStoriesAnimation() {
  const storyLeft  = document.querySelector('.story-left');
  const storyRight = document.querySelector('.story-right');
  let ticking = false;

  function update() {
    if (!storyLeft || !storyRight) return;
    const rect = storyLeft.getBoundingClientRect();
    const wh   = window.innerHeight;
    if (rect.top < wh && rect.bottom > 0) {
      const p = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      storyLeft.style.transform  = `translateY(${p * -15}px)`;
      storyRight.style.transform = `translateY(${p * 15}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

// ===== FAMILY PARALLAX =====
function initFamilyAnimation() {
  const familySection = document.querySelector('.family');
  const mainImage     = document.querySelector('.main-image');
  const contentCard   = document.querySelector('.family-content-card');
  const overlayImage  = document.querySelector('.overlay-image');
  let ticking = false;

  function update() {
    if (!familySection || !mainImage || !contentCard || !overlayImage) return;
    const rect = familySection.getBoundingClientRect();
    const wh   = window.innerHeight;
    if (rect.top < wh && rect.bottom > 0) {
      const p = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      mainImage.style.transform    = `translateY(${p * -25}px)`;
      contentCard.style.transform  = `translateY(${p * 15}px)`;
      overlayImage.style.transform = `translateY(${p * -12}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Wine slider
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const dots    = document.querySelectorAll('.dot');

  if (nextBtn) nextBtn.addEventListener('click', nextWine);
  if (prevBtn) prevBtn.addEventListener('click', prevWine);
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    currentWineIndex = i;
    updateWineDisplay(true);
  }));

  updateWineDisplay(false);

  // Sections
  initInstagramAnimation();
  initStoriesAnimation();
  initFamilyAnimation();
  initVisitSection();
});