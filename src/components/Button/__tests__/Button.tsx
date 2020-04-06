import React from "react";
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Button } from '../Button';


configure({ adapter: new Adapter() });
describe('Button', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Button />);
    })

    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should have default props', () => {
        const wrapperProps = wrapper.props();
        const defaultProps = {
            backgroundColor: "#7d7d7d",
            disabled: false,
            text: "default",
            toggleable: false,
            variant: "default",
        };

        expect(wrapperProps['backgroundColor']).toEqual(defaultProps.backgroundColor);
        expect(wrapperProps['disabled']).toEqual(defaultProps.disabled);
        expect(wrapperProps['text']).toEqual(defaultProps.text);
        expect(wrapperProps['toggleable']).toEqual(defaultProps.toggleable);
        expect(wrapperProps['variant']).toEqual(defaultProps.variant);
    })

    it('should have default state', () => {
        const wrapperState = wrapper.state();

        type ButtonState = {
            child: string,
            highlight: string,
            lowlight: string,
            textColor: string,
        };
        const defaultState: ButtonState = {
            child: 'DefaultButton',
            textColor: undefined,
            lowlight: null,
            highlight: null
        };

        expect(wrapperState['child']).toEqual(defaultState.child);
        expect(wrapperState['textColor']).toEqual(defaultState.textColor);
        expect(wrapperState['lowlight']).toEqual(defaultState.lowlight);
        expect(wrapperState['highlight']).toEqual(defaultState.highlight);
    })

    describe.skip('On Mount...', () => {

        it('should invoke checkForErrors', () => {
    
        })

        describe('checkForErrors()', () => {

            it('should throw an error if non-compatible props are used', () => {
    
            })

        })

        it('should invoke determineChild', () => {

        })

        describe('determineChild()', () => {

            it('should return a string', () => {

            })

        })

        it('should invoke buildAdditionalProps', () => {

        })

        describe('buildAdditionalProps()', () => {

            it('should invoke calculateLighting if the component is a neumorphic variant', () => {

            })

        })

    })

    describe.skip('On Render...', () => {

        it('should render DefaultButton by default', () => {

        })

        it('should render the appropriate element depending on the given props', () => {
            
        })

        it('should invoke gatherProps', () => {

        })

        describe('gatherProps()', () => {

            it('should return a prop object', () => {

            })

            it('should invoke determineTextColor', () => {

            })

            describe('determineTextColor()', () => {

            })

        })

    })

})