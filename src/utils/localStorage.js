// Method to write data to local storage
export const writeToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));

};

// Method to read data from local storage
export const readFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value && value !== 'undefined' ? JSON.parse(value) : null;
};

// Method to remove data from local storage
export const removeFromLocalStorage = (key) => {

    localStorage.removeItem(key);

};
