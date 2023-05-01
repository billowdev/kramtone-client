export function setLocalStorage(key: string, value: string): void {
	if (typeof window !== 'undefined' && window.localStorage) {
	  window.localStorage.setItem(key, value);
	}
  }
  
  export function getLocalStorage(key: string): string | null {
	if (typeof window !== 'undefined' && window.localStorage) {
	  return window.localStorage.getItem(key);
	}
	return null;
  }
  