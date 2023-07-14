const chatInput = document.querySelector(".chat-input textarea");
const sendButton = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeButton = document.querySelector(".close-btn");

const API_KEY = "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";

let userMessage;
const inputInitHeight = chatInput.scrollHeight;


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingLi) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const messageElement = incomingLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userMessage,
            max_tokens: 4000,
            temperature: 0
        })
    };
    fetch(API_URL, requestOptions).then((res) => res.json()).then((data) => {
        console.log(data);
        messageElement.textContent = data.choices[0].text.slice(2); 
    }).catch((error) => {
        messageElement.classList.add("error");
        console.log(error);
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};



const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;


    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        const incomingLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingLi);
        generateResponse(incomingLi);    
    }, 600)
}


chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
})

sendButton.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
closeButton.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
