import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
// 
import { ButtonProps } from '../Button';
import styles from '../styles.css';

type UniqueProps = {
    className?: any
} & Partial<ButtonProps>

const useStyles = createUseStyles({
    defaultButton: {
        boxShadow: '0 2px 5px #00000026',    
        transition: 'box-shadow .2s, transform .2s',

        '&:hover': {
            boxShadow: '0 2px 5px 2px #00000026',
            transform: 'perspective(1px) scale(1.01)',
        },

        '&:active': {
            boxShadow: '0 2px 2px #00000026',
            transform: 'perspective(1px) scale(.99)',
        },

        '&:hover::after': {
            backgroundColor: '#FFFFFF6B'
        },

        '&:active::after': {
            backgroundColor: '#0000001A'
        },

        '& , &::after': {
            borderRadius: '50px',
            border: 'none'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0, right: 0,
            top: 0, bottom: 0,
            transition: 'background-color .2s'
        }
    }
})

export const DefaultButton: FunctionComponent<UniqueProps> = (props) => {
    const classes = useStyles();

    return (
        <button className={styles.generalButton + ' ' + classes.defaultButton}>
            <p>{props.text}</p>
        </button>
    )
}

DefaultButton.defaultProps = {

}
