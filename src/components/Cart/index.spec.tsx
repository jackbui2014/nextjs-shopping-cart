import { mount } from '../../../test/mount';
import { Cart }  from "./index";

describe("Cart component testing with jest", ()=>{
  const component = mount(<Cart />);
  it("renders without crashing", ()=>{
    expect(component).toBeTruthy();
  });

});