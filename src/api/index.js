export const getButtonsAsync = async () => {
    const response = await fetch(
        `https://esc-relay-controller.herokuapp.com/buttons`
    );
    const value = await response.json();
    return value;
};
