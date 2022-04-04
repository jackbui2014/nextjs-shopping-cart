import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store  from '../src/app/store'; 

export const mount: any = ( Component: ReactNode) =>{
  return render(
      <Provider store={store}>
        {Component}
      </Provider>
    );
}