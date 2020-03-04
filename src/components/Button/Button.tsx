import React, { FunctionComponent, useEffect } from "react";
import styles from './styles.css';

export type Props = {
    // set prop types here
    url: string;
    text: string;
    variant: "default" | "neumorphism";
    toggleable: boolean,
};

// This looks like the best way to write a functional component (which most components will be).
// We can use React Hooks for any state management or lifecycle methods we need.
export const Button: FunctionComponent<Props> = ({...Props }) => {

    //---| Prop Defaults |---//
    const {
        url,
        text,
        variant = "default",
        toggleable = false
    } = Props;

    //---| Component Variables |---//
    let className = styles.button;

    //---| Lifecycle |---// // Need to run 'npm install' on /example directory
    useEffect(() => {
        checkVariant();
    });

    //---| Functions |---//
    function checkVariant() {
        if (variant == "neumorphism") className += styles.buttonNeumorphism;
    }

    return (
        <a href={url} className={styles.buttonWrapper}>

            {toggleable ? (
                <label>
                    <button className={className}>
                        {text}
                    </button>
                    <input type="checkbox" />
                </label>

            ) : (
                <button className={className}>
                    {text}
                </button>
            )}

        </a>
    );
}
