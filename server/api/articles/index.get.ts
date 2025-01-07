import { connectBrowser } from '@/utils/config';
import { getAllArticlesContent, parseBeInCryptoArticles } from '@/utils/helpers';

export default defineEventHandler(async (event) => {
  if (!process.env.BIC_URL) return 'Missing BIC_URL environment variable';

  const { page } = await connectBrowser(process.env.BIC_URL);

  try {
    await page.waitForSelector('#bic-main-content', { visible: true });

    // const articlesContent = await getAllArticlesContent(page);
    const articles = await parseBeInCryptoArticles(page)

    return {
      data: articles,
    };
  } catch (error) {
    console.error('error scrapping articles:', error);
    await page.browser().close();

    return {
      success: false,
      error: 'An error has occurred.',
    };
  }
});
