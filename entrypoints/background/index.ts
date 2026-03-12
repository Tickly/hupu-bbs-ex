import { createAnalyticsClient } from '@/analytics/sdk';
import { browser } from 'wxt/browser';

function useAnalytics () {

  const analyticsVersion =
    (typeof browser !== 'undefined' &&
      browser.runtime &&
      typeof browser.runtime.getManifest === 'function' &&
      browser.runtime.getManifest()?.version) ||
    '0.0.0-dev';

  const analyticsClient = createAnalyticsClient({
    endpoint: 'https://hupu-bbs-ex-analytics.vercel.app/api/active',
    appId: 'hupu-bbs-ex',
    apiKey: 'dev_key_1',
    version: analyticsVersion,
  });
  browser.runtime.onMessage.addListener((message: any) => {
    if (message.type === 'analytics/reportActive') {
      console.log('reportActive');
      void analyticsClient.reportActive();
      return true;
    }


    return false;
  });
}




export default defineBackground(() => {
  console.log('background');



  useAnalytics();
});