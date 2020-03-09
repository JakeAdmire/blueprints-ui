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
            7px 7px 9px ${props.lowlight}, -7px -7px 9px ${props.highlight}, inset 0 0 0 #0000004d
        `,
        border: 'solid 1px',
        borderColor: (props: UniqueProps) => `
            ${Color(props.highlight).alpha(.5).string()} #FFFFFF00 #FFFFFF00 ${Color(props.highlight).alpha(.5).string()}
        `,

        transition: 'transform .2s, box-shadow .2s, border-color .2s',

        '&:active': {
            transform: 'perspective(1px) scale(.95)',
            borderColor: (props: UniqueProps) => `
                #FFFFFF00 ${Color(props.highlight).alpha(.5).string()} ${Color(props.highlight).alpha(.5).string()} #FFFFFF00
            `,
            boxShadow: (props: UniqueProps) => `
                0 0 0 ${props.lowlight}, 0 0 0 ${props.highlight}, inset 2px 2px 9px #0000004d
            `,
        }
    },
    hiddenCheckbox: {
        display: 'none',

        '&:checked ~ label': {
            borderColor: (props: UniqueProps) => `
                #FFFFFF00 ${Color(props.highlight).alpha(.5).string()} ${Color(props.highlight).alpha(.5).string()} #FFFFFF00
            `,
            boxShadow: (props: UniqueProps) => `
                0 0 0 ${props.lowlight}, 0 0 0 ${props.highlight}, inset 2px 2px 4px #0000004d
            `,
            transform: 'perspective(1px) scale(.99)',

            '&:hover': {
                transform: 'perspective(1px) scale(.99)'
            },

            '&:active': {
                transform: 'perspective(1px) scale(.95)',
                borderColor: (props: UniqueProps) => `
                    #FFFFFF00 ${Color(props.highlight).alpha(.5).string()} ${Color(props.highlight).alpha(.5).string()} #FFFFFF00
                `,
                boxShadow: (props: UniqueProps) => `
                    0 0 0 ${props.lowlight}, 0 0 0 ${props.highlight}, inset 2px 2px 9px #0000004d
                `
            }
        },
    },
    buttonText: {
        color: (props: UniqueProps) => props.textColor || (Color(props.backgroundColor).isDark() 
            ? Color(props.backgroundColor).lighten(.3).string()
            : Color(props.backgroundColor).darken(.3).string()),
        textShadow: (props: UniqueProps) => `
            0.5px 0.5px ${Color(props.backgroundColor).lighten(.2).string()}, 
            -0.5px -0.5px ${Color(props.backgroundColor).darken(.2).string()}
        `,
        display: 'inline',
        userSelect: 'none'
    }
})

export const ToggleableNeumorphismButton: FunctionComponent<UniqueProps> = (props) => {
    const classes = useStyles(props);

    return (
        <div>
            <input  className={classes.hiddenCheckbox} 
                    type="checkbox" 
                    id="toggleableDefaultButtonCheckbox" />
            <label  className={styles.generalButton + ' ' + classes.neumorphismButton}
                    htmlFor="toggleableDefaultButtonCheckbox"
                    onClick={props.onClick}>
                <p className={classes.buttonText}>{props.text}</p>
            </label>
        </div>
    )
}

ToggleableNeumorphismButton.defaultProps = { }