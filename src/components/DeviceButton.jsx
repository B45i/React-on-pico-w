const DeviceButton = ({ button, onButtonClick, id }) => {
    return (
        <button
            onClick={e => onButtonClick(id, !button.state)}
            className={`device-button ${button.state ? 'active' : ''}`}
        >
            <div>{button.name}</div>
            <div className="indicator"></div>
        </button>
    );
};

export default DeviceButton;
