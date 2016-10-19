import { MemoitUiPage } from './app.po';

describe('memoit-ui App', function() {
  let page: MemoitUiPage;

  beforeEach(() => {
    page = new MemoitUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
