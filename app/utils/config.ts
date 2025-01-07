import puppeteer from "puppeteer-core";
// import chromium from "@sparticuz/chromium-min"
import chromium from "@sparticuz/chromium";

const DEFAULT_PAGE_TIMEOUT_MS = 60000;

export const log = (level: 'info' | 'warn' | 'error', message: string, error?: Error) => {
  const timestamp = new Date().toISOString();
  const errorDetails = error ? ` | Error: ${error.message}` : '';

  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}${errorDetails}`);
};

export const connectBrowser = async (url: string) => {
  const executablePath = await chromium.executablePath();
  chromium.setHeadlessMode = true
  chromium.setGraphicsMode = false

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
    acceptInsecureCerts: true
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(DEFAULT_PAGE_TIMEOUT_MS);

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
