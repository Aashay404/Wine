// Subtle scroll animations
document.addEventListener('DOMContentLoaded', function() {
  
  // Founders data
  const foundersData = [
    {
      image: 'images/img.jpeg',
      name: 'Karl Watson',
      role: 'Owner',
      bio: 'A third-generation vintner with over 30 years of experience, Karl combines traditional winemaking techniques with modern sustainable practices. His vision has transformed our family Orchards into one of the region\'s most respected wineries.',
      bottomName: 'Robert Chen',
      bottomRole: 'Orchards Director',
      bottomBio: 'A pioneer in sustainable farming practices, Robert oversees our 150-acre Orchards with meticulous attention to detail. His commitment to organic methods ensures the purest expression of our terroir.'
    },
    {
      image: 'images/strawberry vertical (2).png',
      name: 'Elena Martinez',
      role: 'Head Winemaker',
      bio: 'With a master\'s degree in viticulture and 20 years of international experience, Elena brings innovation and precision to every vintage. Her expertise in terroir expression has earned numerous awards for our wines.',
      bottomName: 'Sarah Johnson',
      bottomRole: 'Cellar Master',
      bottomBio: 'With 15 years of experience in wine production, Sarah oversees every aspect of our fermentation and aging processes. Her meticulous attention to detail ensures each vintage meets our exacting standards.'
    },
    {
      image: 'images/pome3.png',
      name: 'Robert Chen',
      role: 'Orchards Director',
      bio: 'A pioneer in sustainable farming practices, Robert oversees our 150-acre Orchards with meticulous attention to detail. His commitment to organic methods ensures the purest expression of our terroir.',
      bottomName: 'Michael Torres',
      bottomRole: 'Operations Manager',
      bottomBio: 'Leading our day-to-day operations with precision and care, Michael ensures that every aspect of our winery runs smoothly. His dedication to excellence is reflected in every bottle we produce.'
    }
  ];
  
  let currentFounderIndex = 0;
  
  // Founder navigation
  const founderNavBtn = document.querySelector('.founder-nav-btn');
  const founderImage = document.querySelector('.founder-image');
  const founderOverlayName = document.querySelector('.founder-overlay-name');
  const founderOverlayRole = document.querySelector('.founder-overlay-role');
  const founderBottomName = document.querySelector('.founder-bottom-name');
  const founderBottomRole = document.querySelector('.founder-bottom-role');
  const founderBottomBio = document.querySelector('.founder-bottom-bio');
  
  function updateFounder(index) {
    const founder = foundersData[index];
    if (founderImage && founderOverlayName && founderOverlayRole && founderBottomName && founderBottomRole && founderBottomBio) {
      founderImage.style.opacity = '0';
      
      setTimeout(() => {
        founderImage.src = founder.image;
        founderOverlayName.textContent = founder.name;
        founderOverlayRole.textContent = founder.role;
        founderBottomName.textContent = founder.bottomName;
        founderBottomRole.textContent = founder.bottomRole;
        founderBottomBio.textContent = founder.bottomBio;
        founderImage.style.opacity = '1';
      }, 300);
    }
  }
  
  if (founderNavBtn) {
    founderNavBtn.addEventListener('click', () => {
      currentFounderIndex = (currentFounderIndex + 1) % foundersData.length;
      updateFounder(currentFounderIndex);
    });
  }
  
  // Scroll reveal animation
  const scrollElements = document.querySelectorAll('.text-content, .craft-text, .family-card, .philosophy-item');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('scroll-element', 'visible');
  };
  
  const hideScrollElement = (element) => {
    element.classList.remove('visible');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial check
  handleScrollAnimation();
  
  // Subtle parallax for hero, Orchards, and founders sections
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    const OrchardsImage = document.querySelector('.Orchards-image img');
    const founderImageCard = document.querySelector('.founder-image-card');
    const founderStoryPanel = document.querySelector('.founder-story-panel');
    
    if (heroImage) {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      heroImage.style.transform = `translateY(${yPos}px)`;
    }
    
    if (OrchardsImage) {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      OrchardsImage.style.transform = `translateY(${yPos}px)`;
    }
    
    // Founders scroll motion
    if (founderImageCard && founderStoryPanel) {
      const foundersSection = document.querySelector('.founders');
      if (foundersSection) {
        const rect = foundersSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
          
          const imageMove = scrollProgress * -20;
          const panelMove = scrollProgress * 15;
          
          founderImageCard.style.transform = `translateY(${imageMove}px)`;
          founderStoryPanel.style.transform = `translateY(${panelMove}px)`;
        }
      }
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
});