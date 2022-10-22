export const getButtonsAsync = async () => {
    const response = await fetch(`api/get_buttons`);
    const value = await response.json();
    return value;
};

export const updateButtonAsync = async (id, state) => {
    const response = await fetch(`api/update_button/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ state }),
    });
    const value = await response.json();
    return value;
};
