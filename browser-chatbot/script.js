const chatInput = document.querySelector(".chat-input textarea");
const sendButton = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?
     `<p>${message}</p>` : 
     `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}



const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "incoming"))
    }, 600)
}

sendButton.addEventListener("click", handleChat);