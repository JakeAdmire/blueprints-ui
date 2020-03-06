import React, { FunctionComponent } from 'react';

type ButtonProps = { }

export const ToggleableNeumorphismButton: FunctionComponent<ButtonProps> = () => (
    <label>
        <input type="checkbox" style={{display: 'none'}}/>
        <button className="ToggleableNeumorphismButton"></button>
    </label>
)

ToggleableNeumorphismButton.defaultProps = { }