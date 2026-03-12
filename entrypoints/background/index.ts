
type AnalyticsMessage =
  | {
    type: 'analytics/reportActive';
  };


export default defineBackground(() => {
  console.log('background');



  // const analyticsVersion =
  //   (typeof browser !== 'undefined' &&
  //     browser.runtime &&
  //     typeof browser.runtime.getManifest === 'function' &&
  //     browser.runtime.getManifest()?.version) ||
  //   '0.0.0-dev';

  // const analyticsClient = createAnalyticsClient({
  //   endpoint: 'https://hupu-bbs-ex-analytics.vercel.app/api/active',
  //   appId: 'hupu-bbs-ex',
  //   apiKey: 'dev_key_1',
  //   version: analyticsVersion,
  // });

 



});