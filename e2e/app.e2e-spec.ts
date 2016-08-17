import { TwitchTvPage } from './app.po';

describe('twitch-tv App', function() {
  let page: TwitchTvPage;

  beforeEach(() => {
    page = new TwitchTvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
