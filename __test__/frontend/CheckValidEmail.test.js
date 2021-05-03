const RegisterScreen = require('../../frontend/src/screens/RegisterScreen')
const checkValidEmail = RegisterScreen.checkValidEmailMirror

describe('Check if email validtor works', () => {
  it('correctly validates email', () => {
    const correctEmail = 'harishrajanala@utexas.edu';
    const wrongEmail = 'xyz@,.co';
    
    expect(checkValidEmail(correctEmail)).toBe(true);
    expect(checkValidEmail(wrongEmail)).toBe(false);
  });
});

