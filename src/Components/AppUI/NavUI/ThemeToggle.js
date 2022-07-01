import React from 'react';
import './ThemeToggle.css'
const ThemeToggle = (props) => {

    const toggle = () => {
        const cb = document.getElementById('theme');
        cb.checked = !cb.checked;
        props.onThemeChange(cb.checked ? 'light' : 'dark')
    }
    return (
        <div className="container">
            <div className="toggle-switch"  onClick={toggle}>
                <input type="checkbox" className="checkbox" name='theme' id='theme'  />
                <label className="label" >
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
}
export default ThemeToggle;