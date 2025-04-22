import React, { useState } from 'react';
import './SettingsMenu.css';

const SettingsMenu = ({ onThemeChange, onFontChange }) => {
    const [theme, setTheme] = useState('light');
    const [font, setFont] = useState('Roboto');

    const themes = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'glassmorphism', label: 'Glassmorphism' },
        { value: 'forest-green', label: 'Forest Green' },
        { value: 'ocean-blue', label: 'Ocean Blue' },
        { value: 'monochrome', label: 'Monochrome' },
        { value: 'sunset-orange', label: 'Sunset Orange' },
        { value: 'midnight-purple', label: 'Midnight Purple' },
        { value: 'sky-blue', label: 'Sky Blue' },
        { value: 'sand-yellow', label: 'Sand Yellow' },
    ];

    const fonts = [
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Lato', label: 'Lato' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Raleway', label: 'Raleway' },
    ];

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        onThemeChange(selectedTheme);
    };

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        setFont(selectedFont);
        onFontChange(selectedFont);
    };

    return (
        <div className="settings-menu">
            <h2>Settings</h2>
            <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select id="theme" value={theme} onChange={handleThemeChange}>
                    {themes.map((theme) => (
                        <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="font">Font</label>
                <select id="font" value={font} onChange={handleFontChange}>
                    {fonts.map((font) => (
                        <option key={font.value} value={font.value}>{font.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SettingsMenu;