import { useState, useEffect } from 'react';
import DeviceButton from './components/DeviceButton';
import { getButtonsAsync, updateButtonAsync } from './api';

import './App.css';

function App() {
    useEffect(() => {
        fetchButtons();
    }, []);

    const [buttons, setButtons] = useState([]);

    const handleButtonClick = async (id, value) => {
        try {
            const data = await updateButtonAsync(id, value);
            setButtons(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchButtons = async () => {
        try {
            const data = await getButtonsAsync();
            setButtons(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="App">
            {Object.keys(buttons).map(id => (
                <DeviceButton
                    button={buttons[id]}
                    onButtonClick={handleButtonClick}
                    key={id}
                    id={id}
                />
            ))}
        </div>
    );
}

export default App;
