import React from 'react'
import Carousel from '../../frontend/src/components/Carousel'
import { render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('Carousel Snapshot test', () => {
    const tree = render(<Carousel />)

    expect(tree).toMatchSnapshot()
})
