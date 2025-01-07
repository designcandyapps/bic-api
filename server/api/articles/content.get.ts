import { connectBrowser } from '@/utils/config';
import { getArticleContent } from '@/utils/helpers';

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!process.env.BIC_URL) return 'Missing BIC_URL environment variable';

  const { page } = await connectBrowser(process.env.BIC_URL);

  try {
    await page.waitForSelector('#bic-main-content', { visible: true });

    const articleContent = await getArticleContent(page, String(query.link))

    return {
      data: articleContent,
    };
  } catch (error) {
    console.error('error scrapping article content:', error);
    await page.browser().close();

    return {
      success: false,
      error: 'An error has occurred.',
    };
  }
});
