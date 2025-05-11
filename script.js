document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "If you say it, we do it.",
    "The only limit is your imagination.",
    "Create something extraordinary today.",
    "Dream big, work small.",
    "Possibilities are endless.",
    "Turn ideas into reality.",
  ];

  let currentQuoteIndex = 0;
  let isTyping = false;

  function typeWriter(text, i, element, callback) {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1);
      element.style.borderRight = "0.1em solid white";
      setTimeout(() => typeWriter(text, i + 1, element, callback), 20);
    } else {
      element.style.borderRight = "none";
      isTyping = false;
      if (callback) callback();
    }
  }

  function displayQuote() {
    if (isTyping) {
      return;
    }
    isTyping = true;
    const quoteElement = document.getElementById("typewriter-quote");
    if (!quoteElement) {
      console.error("Quote element not found!");
      isTyping = false;
      return;
    }
    quoteElement.style.opacity = "0";
    quoteElement.innerHTML = "";
    setTimeout(() => {
      quoteElement.style.opacity = "1";
      typeWriter(quotes[currentQuoteIndex], 0, quoteElement, () => {
        quoteElement.style.opacity = "1";
        console.log("Quote displayed:", quotes[currentQuoteIndex]);
      });
    }, 300);
  }

  const quoteCycleBtn = document.getElementById("quote-cycle");
  if (quoteCycleBtn) {
    quoteCycleBtn.addEventListener("click", () => {
      console.log("Quote cycle button clicked");
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      displayQuote();
    });
  } else {
    console.error("Quote cycle button not found!");
  }

  const logo = document.getElementById("logo");
  const logoImg = logo ? logo.querySelector(".logo") : null;
  if (logo && logoImg) {
    let isSpinning = false;
    logo.addEventListener("click", () => {
      if (isSpinning) return;
      isSpinning = true;
      logoImg.classList.add("spin");
      setTimeout(() => {
        logoImg.classList.remove("spin");
        isSpinning = false;
      }, 1000);
    });
  }

  const spans = document.querySelectorAll(".fade-in-text span");
  if (spans.length > 0) {
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.animation = "fadeIn 1s ease forwards";
      }, index * 300);
    });
    setTimeout(() => {
      displayQuote();
    }, 1000);
  } else {
    displayQuote();
  }
});

function initMoneyParticles() {
    const container = document.getElementById('moneyParticles');
    const particleCount = 70;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    setInterval(() => {
        createParticle(container);
    }, 200);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'money-particle';
    
    const posX = Math.random() * window.innerWidth;
    particle.style.left = `${posX}px`;
    particle.style.bottom = '0';
    
    const randomX = (Math.random() - 0.5) * 200;
    particle.style.setProperty('--random-x', `${randomX}px`);
    
    const size = 1 + Math.random() * 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.backgroundColor = '#ffffff';
    
    const duration = 8 + Math.random() * 12;
    particle.style.animation = `float-up ${duration}s linear forwards`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
        }
    }, duration * 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    initMoneyParticles();
    
    const spans = document.querySelectorAll('.fade-in-text span');
    spans.forEach((span, index) => {
        span.style.animation = `fadeIn 1s ease-out ${index * 0.5}s forwards`;
    });
    
    document.getElementById('quote-cycle').addEventListener('click', () => {
        for (let i = 0; i < 20; i++) {
            createParticle(document.getElementById('moneyParticles'));
        }
    });
});
