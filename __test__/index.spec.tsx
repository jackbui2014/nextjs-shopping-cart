
import { screen } from '@testing-library/react';
import { mount } from '../test/mount';
import Home from '../src/pages/index';

describe('<Home />', () => {
  it('renders home page h1', () => {
    mount(<Home />);
    expect(screen.getByText('Shopping cart test')).toBeInTheDocument();
  });
})