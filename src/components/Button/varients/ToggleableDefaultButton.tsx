import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import uuidv4 from 'uuid/v4';
// 
import { ButtonProps } from '../Button';
import styles from '../styles.css';

type UniqueProps = {
    className?: any,
    determineTextColor: Function
} & Partial<ButtonProps>

const useStyles = createUseStyles({
    toggleableDefaultButton: {
        backgroundColor: (props: UniqueProps) => props.backgroundColor,
        boxShadow: (props: UniqueProps) => props.disabled ? 'none' : '0 2px 5px #00000026, inset 0 0 0 #00000026',    
        transition: 'box-shadow .2s, transform .2s, backgroundColor .3s',

        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 4px 5px #00000026',
            transform: 'perspective(1px) scale(1.01)',
        },

        '&:active': {
            boxShadow: '0 0 0 #00000026, inset 0 3px 2px #00000026',
            transform: 'perspective(1px) scale(.99)',
        },

        '&:hover::after': {
            // backgroundColor: '#FFFFFF6B'
        },

        '&:active::after': {
            backgroundColor: '#00000030'
        },

        '& , &::after': {
            borderRadius: '10px',
            border: 'none'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0, right: 0,
            top: 0, bottom: 0,
            transition: 'background-color .2s'
        },

        '& p': {
            display: 'inline',
            userSelect: 'none'
        }
    },
    hiddenCheckbox: {
        display: 'none',

        '&:checked ~ label': {
            boxShadow: '0 0 0 #00000026, inset 0 1px 2px #00000026',
            transform: 'perspective(1px) scale(.99)',

            '&:hover': {
                transform: 'perspective(1px) scale(.99)'
            },

            '&:active': {
                boxShadow: 'inset 0 3px 2px #00000026'
            },

            '&::after': {
                backgroundColor: '#0000001A'
            },

            '&:active::after': {
                backgroundColor: '#00000030'
            }

        },
    },
    buttonText: {
        color: (props: UniqueProps) => props.textColor || props.determineTextColor(props.backgroundColor)
    },
    disabled: {
        pointerEvents: 'none',

        '&::after': {
            background: '#FFFFFF40'
        }
    }
})

export const ToggleableDefaultButton: FunctionComponent<UniqueProps> = (props) => {
    const classes = useStyles(props);
    const uniqueID = uuidv4();

    return (
        <div>
            <input  className={classes.hiddenCheckbox} 
                    type="checkbox" 
                    id={uniqueID} />
            <label  className={styles.generalButton + ' ' + classes.toggleableDefaultButton  + (props.disabled ? ' ' + classes.disabled : '')}
                    htmlFor={uniqueID}
                    onClick={props.onClick}>
                <p className={classes.buttonText}>{props.text}</p>
            </label>
        </div>
    )
}

ToggleableDefaultButton.defaultProps = { }