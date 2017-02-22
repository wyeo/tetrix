import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import HelloWorld from '../../src/components/HelloWorld'

describe('Test on <HelloWorld />', () => {
  it('contain \'HELLO WORLD\'', () => {
    const wrapper = shallow(<HelloWorld />)
    expect(wrapper.equals(<div>HELLO WORLD</div>)).to.equals(true)
  })
})
