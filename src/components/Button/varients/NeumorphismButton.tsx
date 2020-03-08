import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import Color from 'color';
// 
import { ButtonProps } from '../Button';
import styles from '../styles.css';

type UniqueProps = {
    lowlight: string,
    highlight: string
} & Partial<ButtonProps>

const useStyles = createUseStyles({
    neumorphismButton: {
        backgroundColor: (props: UniqueProps) => props.backgroundColor,
        boxShadow: (props: UniqueProps) => `
            7px 7px 9px ${props.lowlight}, 
            -7px -7px 9px ${props.highlight}
        `,
        border: 'solid 1px',
        borderColor: (props: UniqueProps) => `${Color(props.highlight).alpha(.5).string()} #FFFFFF00 #FFFFFF00 ${Color(props.highlight).alpha(.5).string()}`,

        transition: 'transform .2s, box-shadow .2s',

        '&:active': {
            transform: 'perspective(1px) scale(.95)',
            boxShadow: (props: UniqueProps) => `
                3px 3px 9px ${props.lowlight}, 
                -3px -3px 9px ${props.highlight}
            `,
        }
    },
    buttonText: {
        color: (props: UniqueProps) => Color(props.backgroundColor).isDark() 
            ? Color(props.backgroundColor).lighten(.3).string()
            : Color(props.backgroundColor).darken(.3).string(),
        textShadow: (props: UniqueProps) => `
            0.5px 0.5px ${Color(props.backgroundColor).lighten(.2).string()}, 
            -0.5px -0.5px ${Color(props.backgroundColor).darken(.2).string()}
        `
    }
})

export const NeumorphismButton: FunctionComponent<UniqueProps> = (props) => {
    const classes = useStyles(props);

    return (
        <button className={classes.neumorphismButton + ' ' + styles.generalButton}
                onClick={props.onClick}>
            <p className={classes.buttonText}>{props.text}</p>
        </button>
    )
}

NeumorphismButton.defaultProps = { }
