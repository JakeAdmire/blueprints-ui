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
    pointed: boolean,
    pointPosition: "Top" | "Right" | "Bottom" | "Left",
    positionClasses: string[]
};

const useStyles = createUseStyles({
    tooltip: {
        boxSizing: 'border-box',
        width: 'max-content',
        maxWidth: '300px',
        textAlign: 'center',
        transform: 'scale(0)',
        transformOrigin: (props: any) => props.pointPosition.toLowerCase(),
        transition: 'transform .2s',

        '&::before': {
            content: (props: any) => props.pointed ? '""' : 'none'
        } 
    },
    verticalStart: { top: 0 },
    verticalEnd: { bottom: 0 },
    horizontalStart: { left: 0 },
    horizontalEnd: { right: 0 },
    verticalCenter: (props: any) => {
        const { current }   = props.tooltipRef,
              parentHeight  = current ? current.parentElement.offsetParent.offsetHeight : 0,
              tooltipHeight = current ? current.offsetHeight : 0;

        return {
            top: `calc((${tooltipHeight} / 2 * -1px) - (${parentHeight} / 2 * -1px))`,
        }
    },
    horizontalCenter: (props: any) => {
        const { current }   = props.tooltipRef,
              tooltipWidth  = current ? current.parentElement.offsetParent.offsetWidth : 0,
              parentWidth   = current ? current.offsetWidth : 0;

        return {
            left: `calc((${parentWidth} / 2 * -1px) - (${tooltipWidth} / 2 * -1px))`
        }
    },
    tooltipPosition: (props: any) => {
        return {
            '&.bui_tooltip-top': { bottom: `calc(100% + 6px)`},
            '&.bui_tooltip-bottom': { top: `calc(100% + 6px)`},
            '&.bui_tooltip-left': { right: `calc(100% + 6px)`},
            '&.bui_tooltip-right': { left: `calc(100% + 6px)`}
        }
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
            <span ref={tooltipRef} className={`
                ${styles.tooltip}
                ${classes.tooltip}
                ${classes.tooltipPosition} ${'bui_tooltip-' + props.positionClasses[0]}
                ${classes[props.positionClasses[1]]}
                ${classes['point' + props.pointPosition]}
                ${props.wrapperHovered ? classes.wrapperHovered : ''}
            `}>{props.text}</span>
            { props.children }
        </span>
    )
}

TooltipBase.defaultProps = {
    pointed: true,
    pointPosition: "Top",
    positionClasses: ["bottom", "horizontalCenter"],
    wrapperHovered: false
}
