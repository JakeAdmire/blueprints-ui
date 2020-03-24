import React, { Component, createRef, FunctionComponent, useRef } from "react";
import { createUseStyles } from 'react-jss';
// 
import styles from './styles.css';

//---------------------| Tooltip.jsx |---------------------//
export type TooltipProps = {
    text: string | HTMLElement
} & Partial<DefaultProps>;

type DefaultProps = {
    pointed: boolean,
    position: "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end"
}

type TooltipState = {
    isChildDisabled: boolean,
    tooltipConfig: {
        spacing: 10 | 6,
        positionClasses: string[],
        pointPosition: "Top" | "Right" | "Bottom" | "Left"
    },
    wrapperHover: boolean
}

export class Tooltip extends Component<TooltipProps, TooltipState> {
    wrapperRef: React.RefObject<HTMLSpanElement>;
    constructor(props: TooltipProps) {
        super(props);
        this.wrapperRef = createRef();
        this.state = {
            isChildDisabled: false,
            tooltipConfig: {
                spacing: 10,
                positionClasses: ["bottom", "horizontalCenter"],
                pointPosition: "Top"
            },
            wrapperHover: false
        }
    }
    static defaultProps: DefaultProps = {
        pointed: true,
        position: "bottom"
    }

    componentDidMount() {
        this.isChildDisabled();
        this.placeTooltip();
    }

    isChildDisabled() {
        const { current } = this.wrapperRef;
        if (current) {
            const elementStyle = getComputedStyle(current.children[0].children[1]);
            
            elementStyle.pointerEvents === 'none' && this.setState({ isChildDisabled: true });
        }
    }

    placeTooltip(): void {
        const   { position, pointed }   = this.props,
                tooltipRef              = this.wrapperRef.current;

        const pointPosition = {
            "top": "Bottom",
            "right": "Left",
            "bottom": "Top",
            "left": "Right"
        };

        const positionClasses = {
            "top-start": ["top", "horizontalStart"],
            "top": ["top", "horizontalCenter"],
            "top-end": ["top", "horizontalEnd"],
            "right-start": ["right", "verticalStart"],
            "right": ["right", "verticalCenter"],
            "right-end": ["right", "verticalEnd"],
            "bottom-start": ["bottom", "horizontalStart"],
            "bottom": ["bottom", "horizontalCenter"],
            "bottom-end": ["bottom", "horizontalEnd"],
            "left-start": ["left", "verticalStart"],
            "left": ["left", "verticalCenter"],
            "left-end": ["left", "verticalEnd"]
        };
        
        this.setState({
            tooltipConfig: {
                spacing: pointed ? 10 : 6,
                positionClasses: positionClasses[position],
                pointPosition: pointPosition[position.split('-')[0]]
            }
        })
    }

    handleHover = () => {
        this.setState({ wrapperHover: !this.state.wrapperHover });
    }

    render() {
        return this.state.isChildDisabled
            ? (
                this.props.children
            )
            : (
            <span   className={styles.tooltipWrapper} 
                    ref={this.wrapperRef} 
                    onMouseEnter={this.handleHover} 
                    onMouseLeave={this.handleHover}>
                <TooltipBase    text={this.props.text} 
                                pointed={this.props.pointed}
                                wrapperHovered={this.state.wrapperHover}
                                {...this.state.tooltipConfig}>
                    { this.props.children }
                </TooltipBase>
            </span>
        )
    }
}



//---------------------| TooltipBase.jsx |---------------------//
export type TooltipBaseProps = {
    text: string | HTMLElement,
    wrapperHovered: boolean,
    spacing: number,
    pointed: boolean,
    pointPosition: "Top" | "Right" | "Bottom" | "Left",
    positionClasses: string[]
};

const useStyles = createUseStyles({
    tooltip: {
        transform: 'scale(0)',
        transformOrigin: (props: any) => props.pointPosition.toLowerCase(),
        transition: 'transform .2s',

        '&.bui_tooltip-verticalStart': { top: 0 },
        '&.bui_tooltip-verticalEnd': { bottom: 0 },
        '&.bui_tooltip-horizontalStart': { left: 0 },
        '&.bui_tooltip-horizontalEnd': { right: 0 },
        '&.bui_tooltip-verticalCenter': {
            top: '50%',
            marginTop: (props: any) => `calc(${
                    props.tooltipRef.current 
                        ? props.tooltipRef.current.offsetHeight 
                        : 0
            } / 2 * -1px)`
        },
        '&.bui_tooltip-horizontalCenter': {
            left: '50%',
            marginLeft: (props: any) => `calc(${
                    props.tooltipRef.current 
                    ? props.tooltipRef.current.offsetWidth 
                    : 0
            } / 2 * -1px)`
        },   
        '&::before': {
            content: (props: any) => props.pointed ? '""' : 'none'
        } 
    },
    top: {
        bottom: (props: any) => `calc(100% + ${props.spacing}px)`
    },
    right: {
        left: (props: any) => `calc(100% + ${props.spacing}px)`
    },
    bottom: {
        top: (props: any) => `calc(100% + ${props.spacing}px)`
    },
    left: {
        right: (props: any) => `calc(100% + ${props.spacing}px)`
    },
    pointTop: {
        '&::before': {
            top: '-4px',
            left: '50%',
            marginLeft: '-6px',
            borderRight: '6px solid transparent',
            borderBottom: '6px solid dimgrey',
            borderLeft: '6px solid transparent'
        }
    },
    pointRight: {
        '&::before': {
            right: '-4px',
            top: '50%',
            marginTop: '-6px',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '6px solid dimgrey'
        }
    },
    pointBottom: {
        '&::before': {
            bottom: '-4px',
            left: '50%',
            marginLeft: '-6px',
            borderTop: '6px solid dimgrey',
            borderRight: '6px solid transparent',
            borderLeft: '6px solid transparent'
        }
    },
    pointLeft: {
        '&::before': {
            left: '-4px',
            top: '50%',
            marginTop: '-6px',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '6px solid dimgrey'
        }
    },
    wrapperHovered: {
        transform: 'scale(1)'
    }
})

export const TooltipBase: FunctionComponent<TooltipBaseProps> = (props) => {
    const tooltipRef = useRef(null);
    const classes = useStyles({...props, tooltipRef});

    return (
        <span>
            <span ref={tooltipRef} id="test" className={`
                ${styles.tooltip}
                ${classes.tooltip}
                ${classes[props.positionClasses[0]]}
                ${'bui_tooltip-' + props.positionClasses[1]}
                ${classes['point' + props.pointPosition]}
                ${props.wrapperHovered ? classes.wrapperHovered : ''}
                `}>{props.text}</span>
            { props.children }
        </span>
    )
}

TooltipBase.defaultProps = {
    spacing: 10,
    pointed: true,
    pointPosition: "Top",
    positionClasses: ["bottom", "horizontalCenter"],
    wrapperHovered: false
}
