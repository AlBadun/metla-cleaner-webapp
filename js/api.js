// Fetch-запросы к API
const BASE_API = 'http://localhost:5000/api';

/**
 * Универсальная функция для запросов к API с поддержкой аутентификации Telegram
 */
async function apiFetch(endpoint, options = {}) {
    const headers = options.headers || {};

    // Добавляем initData для аутентификации в Telegram
    if (window.Telegram?.WebApp?.initData) {
        headers['X-Telegram-Init-Data'] = window.Telegram.WebApp.initData;
    }

    const response = await fetch(`${BASE_API}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            console.error('Unauthorized: Telegram authentication failed');
        }
        try {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API Error');
        } catch (e) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    }

    return await response.json();
}

// Экспорт (если используется модульная система)
// export { apiFetch };
