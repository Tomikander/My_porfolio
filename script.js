document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profilePic");
    const chat = document.getElementById("chat");
    const userInput = document.getElementById("userInput");
    const askButton = document.getElementById("askButton");
    const clearButton = document.getElementById("clearButton");
    const notifySound = document.getElementById("notifySound");
  
    if (!chat || !userInput || !askButton || !clearButton) {
      console.error("Не найдены необходимые DOM-элементы");
      return;
    }
  
    function addMessage(text, isUser = false) {
      const message = document.createElement("p");
      message.classList.add("message");
      message.classList.add(isUser ? "user" : "bot");
      message.textContent = "";
  
      const typingInterval = setInterval(() => {
        if (message.textContent.length < text.length) {
          message.textContent += text.charAt(message.textContent.length);
          chat.scrollTop = chat.scrollHeight;
        } else {
          clearInterval(typingInterval);
        }
      }, 15);
  
      chat.appendChild(message);
      chat.scrollTop = chat.scrollHeight;
    }
  
    function clearChat() {
      chat.innerHTML = "";
      addMessage("Привет! Я — Александр, фронтенд-разработчик. Спрашивай обо мне!");
    }
  
    function askAI() {
      const question = userInput.value.trim();
      if (!question) return;
  
      addMessage("Вы: " + question, true);
      userInput.value = "";
  
      const q = question.toLowerCase();
      let answer = "Задай, пожалуйста, вопрос по теме: сайт, цена, опыт, семья.";
  
      if (q.includes("занимаешься") || q.includes("работа")) {
        answer = "Я фронтенд-разработчик. Уже 2 года учусь и делаю реальные проекты с ИИ. Могу сделать сайт под ключ за 3–5 дней.";
      } else if (q.includes("сайт") || q.includes("лендинг") || q.includes("визитка")) {
        answer = "Да, могу сделать сайт-визитку, лендинг или одностраничный сайт. Срок — 3–5 дней, цена от 20 000 руб.";
      } else if (q.includes("цена") || q.includes("стоит") || q.includes("сколько")) {
        answer = "Сайт-визитка — от 20 000 руб. Лендинг с формой и анимацией — от 35 000 руб. Все зависит от сложности.";
      } else if (q.includes("семья") || q.includes("цель") || q.includes("мотивация")) {
        answer = "Я учу программирование, чтобы зарабатывать и обеспечивать семью. Моя мечта — купить новую машину для них.";
      } else if (q.includes("опыт") || q.includes("делал") || q.includes("проекты")) {
        answer = "Я 2 года делаю фронтенд-проекты, интегрирую ИИ, верстаю, подключаю API. Уже могу брать заказы.";
      } else if (q.includes("контакт") || q.includes("связаться") || q.includes("написать")) {
        answer = "Пиши мне в Telegram: @tvoenickname или на почту: mail@example.com — обсудим ваш проект!";
      } else {
        const fallbacks = [
          "Хороший вопрос! Я как раз учусь отвечать на такие.",
          "Интересно! Думаю, я могу помочь — напиши подробнее.",
          "Пока учусь, но уже могу сделать сайт под вашу задачу."
        ];
        answer = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
  
      setTimeout(() => {
        addMessage("Александр: " + answer);
      }, 800);
    }
  
    askButton.addEventListener("click", askAI);
    clearButton.addEventListener("click", clearChat);
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        askAI();
      }
    });
  
    clearChat();
  });