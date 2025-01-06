import puppeteer from 'puppeteer';

const DEFAULT_PAGE_TIMEOUT_MS = 60000;

export const log = (level: 'info' | 'warn' | 'error', message: string, error?: Error) => {
  const timestamp = new Date().toISOString();
  const errorDetails = error ? ` | Error: ${error.message}` : '';

  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}${errorDetails}`);
};

export const connectBrowser = async (url: string) => {
  const browser = process.env.BROWSER_WS
    ? await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSER_WS,
    })
    : await puppeteer.launch({
      headless: true,
    });

  const page = await browser.newPage();

  page.setDefaultTimeout(DEFAULT_PAGE_TIMEOUT_MS);

  if (process.env.BROWSER_WS) {
    const cdpSession = await page.createCDPSession();
    const {
      frameTree: { frame },
    } = await cdpSession.send('Page.getFrameTree');

    // @ts-expect-error
    const response: { url: string } = await cdpSession.send('Page.inspect', {
      frameId: frame.id,
    });

    log('info', `Inspect session at ${response.url}`);
  }

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: DEFAULT_PAGE_TIMEOUT_MS,
  });

  return {
    browser,
    page,
  };
};

export const gracefulTimeout = async (fn: () => Promise<any>, errorMsg: string) => {
  try {
    await fn();
  } catch (e) {
    if ((e as Error).name === 'TimeoutError') {
      log('info', `Timeout reached: ${errorMsg}`);
    } else {
      throw e;
    }
  }
};
