const checkValidEmailMirror = mail => {
    if (mail === '') {
      return false;
    }
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail.toLowerCase()
      )
    ) {
      return true;
    }
    return false;
  };

describe('Check if email validtor works', () => {
  it('correctly validates email', () => {
    const correctEmail = 'harishrajanala@utexas.edu';
    const wrongEmail = 'xyz@,.co';
    
    expect(checkValidEmailMirror(correctEmail)).toBe(true);
    expect(checkValidEmailMirror(wrongEmail)).toBe(false);
  });
});

