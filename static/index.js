document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.querySelector('.chat__messages');
    
    window.onload = () => sendMessage('', true);
    
    sendButton.addEventListener('click', () => {
        const question = messageInput.value.trim();
        if (question) {
            sendMessage(question, false);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') sendButton.click();
    });

    const createMessageElement = (author, message, authorClass, messageClass) => {
        const authorElement = document.createElement('div');
        authorElement.classList.add('chat__message', authorClass);
        authorElement.textContent = author;
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat__message', messageClass);
        messageElement.textContent = message;
        return { authorElement, messageElement };
    };

    const appendMessages = (author, message, authorClass, messageClass) => {
        const { authorElement, messageElement } = createMessageElement(author, message, authorClass, messageClass);
        chatMessages.append(authorElement, messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const sendMessage = async (question, isLoad) => {
        if (!isLoad) {
            appendMessages('You', question, 'chat__message--user-text', 'chat__message--user');
            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `question=${encodeURIComponent(question)}`
                });
                const data = await response.json();
                appendMessages('Bot', data.answer, 'chat__message--bot-text', 'chat__message--bot');
            } catch (error) {
                console.error('Ошибка отправки запроса:', error);
            }
        } else {
            appendMessages('Bot', 'Привет, я интеллектуальный бот! Вы можете задать мне любые вопросы.', 'chat__message--bot-text', 'chat__message--bot');
        }
    };
});
