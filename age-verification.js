// Age Verification Script
(function() {
  'use strict';
  
  // Check if user has already verified their age
  const isVerified = sessionStorage.getItem('ageVerified');
  
  // Get modal and buttons
  const modal = document.getElementById('age-verification-modal');
  const yesBtn = document.getElementById('age-yes');
  const noBtn = document.getElementById('age-no');
  
  // If already verified, hide modal immediately
  if (isVerified === 'true') {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  } else {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Handle "Yes" button click
  yesBtn.addEventListener('click', function() {
    // Store verification in session storage
    sessionStorage.setItem('ageVerified', 'true');
    
    // Hide modal with smooth transition
    modal.classList.add('hidden');
    
    // Re-enable scrolling
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 500);
  });
  
  // Handle "No" button click
  noBtn.addEventListener('click', function() {
    // Show a message
    const modalText = document.querySelector('.age-modal-text');
    modalText.innerHTML = `
      <h2 style="margin-bottom: 20px;">Sorry!</h2>
      <p style="font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6;">
        You must be of legal drinking age to access this website.
      </p>
      <p style="font-size: 0.9rem; opacity: 0.8;">
        This page will close automatically.
      </p>
    `;
    
    // Close the window/tab after 3 seconds
    setTimeout(() => {
      // Try to close the window
      window.close();
      
      // If window.close() doesn't work (most modern browsers prevent this),
      // redirect to a blank page or external site
      if (!window.closed) {
        window.location.href = 'about:blank';
      }
    }, 3000);
  });
  
  // Prevent escape key from closing modal
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      event.preventDefault();
    }
  });
  
  // Prevent clicking outside modal to close it
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      event.stopPropagation();
    }
  });
  
})();