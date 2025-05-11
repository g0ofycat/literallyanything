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
    if (i === 0) {
      element.innerText = "";
    }
    if (i < text.length) {
      element.innerText = text.substring(0, i + 1);
      setTimeout(() => typeWriter(text, i + 1, element, callback), 20);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  function deleteQuote(element, callback) {
    const currentText = element.innerText;
    if (currentText.length > 0) {
      element.innerText = currentText.substring(0, currentText.length - 1);
      setTimeout(() => deleteQuote(element, callback), 20);
    } else {
      element.innerHTML = " ";
      setTimeout(callback, 300);
    }
  }

  function displayQuote() {
    if (isTyping || quotes.length === 0) {
      if (quotes.length === 0) {
        console.warn("No quotes available to display.");
        const quoteElement = document.getElementById("typewriter-quote");
        if (quoteElement) {
          quoteElement.innerHTML = "&nbsp;";
        }
      }
      return;
    }
    isTyping = true;

    const quoteElement = document.getElementById("typewriter-quote");
    if (!quoteElement) {
      console.error("Quote element not found!");
      isTyping = false;
      return;
    }

    quoteElement.style.opacity = "1";
    deleteQuote(quoteElement, () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      const newQuote = quotes[currentQuoteIndex];
      typeWriter(newQuote, 0, quoteElement, () => {
        isTyping = false;
      });
    });
  }

  if (quotes.length > 0) {
    setInterval(() => {
      if (!isTyping) {
        displayQuote();
      }
    }, 5000);
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

  function initMoneyParticles() {
    const container = document.getElementById("moneyParticles");
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      createParticle(container);
    }

    setInterval(() => {
      createParticle(container);
    }, 100);
  }

  function createParticle(container) {
    const particle = document.createElement("div");
    particle.className = "money-particle";

    const posX = Math.random() * window.innerWidth;
    particle.style.left = `${posX}px`;
    particle.style.bottom = "0";

    const randomX = (Math.random() - 0.5) * 200;
    particle.style.setProperty("--random-x", `${randomX}px`);

    const size = 1 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.backgroundColor = "#ffffff";

    const duration = 20 + Math.random() * 30;
    particle.style.animation = `float-up ${duration}s linear forwards`;

    container.appendChild(particle);

    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, duration * 1000);
  }

  initMoneyParticles();

  document.getElementById("quote-cycle")?.addEventListener("click", () => {
    for (let i = 0; i < 20; i++) {
      createParticle(document.getElementById("moneyParticles"));
    }
    if (!isTyping) {
      displayQuote();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeText = document.querySelector(".fade-in-text");
  const quote = document.getElementById("typewriter-quote");
  const whoWeAre = document.querySelector(".who-we-are");
  const teams = document.querySelector(".team-section");

  fadeText.addEventListener("animationend", () => {
    setTimeout(() => {
      quote.classList.add("fade-in");
      whoWeAre.classList.add("fade-in");
      teams.classList.add("fade-in");
    }, 200);
  });
});
