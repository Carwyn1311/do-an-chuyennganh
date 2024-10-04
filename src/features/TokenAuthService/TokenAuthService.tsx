// src/services/TokenAuthService.tsx

export const TokenAuthService = {
  getToken (): string | null {
    return localStorage.getItem('token');
  },

  setToken (token: string): void {
    localStorage.setItem('token', token);
  },

  removeToken (): void {
    localStorage.removeItem('token');
  },

  clearStorage (): void {
    localStorage.clear();
  },

  setSessionData (key: string, value: string): void {
    sessionStorage.setItem(key, value);
  },

  getSessionData (key: string): string | null {
    return sessionStorage.getItem(key);
  },

  removeSessionData (key: string): void {
    sessionStorage.removeItem(key);
  },

  clearSessionStorage (): void {
    sessionStorage.clear();
  },

  setCookie (name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  },

  getCookie (name: string): string | null {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },

  removeCookie (name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  clearCookies (): void {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
};
