export const getButtonsAsync = async () => {
    const response = await fetch(`api/buttonState`);
    const value = await response.json();
    return value;
};
