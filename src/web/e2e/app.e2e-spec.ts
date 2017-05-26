import { MagicWebPage } from './app.po';

describe('magic-web App', function() {
  let page: MagicWebPage;

  beforeEach(() => {
    page = new MagicWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
