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
})