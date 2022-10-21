import { useState, useEffect } from 'react';
import DeviceButton from './components/DeviceButton';
import { getButtonsAsync } from './api';

import './App.css';

function App() {
    useEffect(() => {
        fetchButtons();
    }, []);

    const [buttons, setButtons] = useState([]);

    const handleButtonClick = button => {
        setButtons(oldState => {
            return oldState.map(btn => {
                if (btn === button) {
                    btn.state = !btn.state;
                }
                return btn;
            });
        });
    };

    const fetchButtons = async () => {
        try {
            const data = await getButtonsAsync();
            data.forEach(btn => {
                btn.state = Math.random() < 0.5;
            });
            setButtons(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="App">
            {buttons.map(button => (
                <DeviceButton
                    button={button}
                    onButtonClick={handleButtonClick}
                    key={button.id}
                />
            ))}
        </div>
    );
}

export default App;
