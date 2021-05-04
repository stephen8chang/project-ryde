import React from 'react'
import NavBar from '../../frontend/src/components/NavBar'
import renderer from 'react-test-renderer'

it('NavBar Snapshot test', () => {
    const tree = renderer
    .create(<NavBar />)
    .toJSON()
    
    expect(tree).toMatchSnapshot()
})
