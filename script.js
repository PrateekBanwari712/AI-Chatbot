const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY';
const OPENROUTER_MODEL = 'nvidia/nemotron-3-super-120b-a12b:free';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatWindow = document.getElementById('chatWindow');
const emptyState = document.getElementById('emptyState');

function addMessage(content, sender) {
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    const message = document.createElement('div');
    message.className = `message ${sender}`;

    const text = document.createElement('div');
    text.textContent = content;
    message.appendChild(text);

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = sender === 'user' ? 'You' : 'AI';
    message.appendChild(meta);

    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function setInputState(isDisabled) {
    userInput.disabled = isDisabled;
    chatForm.querySelector('button').disabled = isDisabled;
}

async function fetchOpenRouterReply(userText) {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY') {
        throw new Error('OpenRouter API key not configured. Replace OPENROUTER_API_KEY in script.js.');
    }

    const payload = {
        model: OPENROUTER_MODEL,
        messages: [
            { role: 'system', content: 'You are a helpful AI assistant.' },
            { role: 'user', content: userText },
        ],
        max_tokens: 512,
        temperature: 0.7,
    };

    const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const choice = data?.choices?.[0]?.message?.content;
    return choice || 'Sorry, I did not receive a reply from the AI.';
}

chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = userInput.value.trim();
    if (!message) {
        return;
    }

    addMessage(message, 'user');
    userInput.value = '';
    userInput.focus();

    addMessage('Typing...', 'bot');
    setInputState(true);

    // await fetchOpenRouterReply(message);
    try {
        const reply = await fetchOpenRouterReply(message);
        const typingBubble = chatWindow.querySelector('.message.bot:last-child');
        if (typingBubble) {
            typingBubble.querySelector('div').textContent = reply;
        }
    } catch (error) {
        console.error(error);
        const typingBubble = chatWindow.querySelector('.message.bot:last-child');
        if (typingBubble) {
            typingBubble.querySelector('div').textContent = 'Sorry, there was an error contacting OpenRouter.';
        }
    } finally {
        setInputState(false);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});

