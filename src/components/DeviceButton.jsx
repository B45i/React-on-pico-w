const DeviceButton = ({ button, onButtonClick }) => {
    return (
        <button
            onClick={e => onButtonClick(button)}
            className={`device-button ${button.state ? 'active' : ''}`}
        >
            <div>{button.name}</div>
            <div className="indicator"></div>
        </button>
    );
};

export default DeviceButton;
