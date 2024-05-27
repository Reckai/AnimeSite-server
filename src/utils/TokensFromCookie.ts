export function extractAccessToken(cookieString: string) {
    if(!cookieString) return '';
    const match = cookieString.match(/access-token=([^;]+)/);
    return match ? match[1] : '';
}

// Функция для извлечения refresh-token
export function extractRefreshToken(cookieString: string) {
    if(!cookieString) return '';
    const match = cookieString.match(/refresh-token=([^;]+)/);
    return match ? match[1] : '';
}