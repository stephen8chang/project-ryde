import * as RegisterScreen from '../../frontend/src/screens/RegisterScreen'

describe('Check if email validtor works', () => {
  it('correctly validates email', () => {
    const correctEmail = 'harishrajanala@utexas.edu';
    const wrongEmail = 'xyz@,.co';
    const checkValidEmail = RegisterScreen.checkValidEmail;
    
    expect(checkValidEmail(correctEmail)).toBe(true);
    expect(checkValidEmail(wrongEmail)).toBe(false);
  });
});