import { connectBrowser } from '@/utils/config';
import { getAllArticlesContent, parseBeInCryptoArticles } from '@/utils/helpers';

export default defineEventHandler(async (event) => {
  if (!process.env.BIC_URL) return 'Missing BIC_URL environment variable';

  const { page } = await connectBrowser(process.env.BIC_URL);

  try {
    await page.waitForSelector('#bic-main-content', { visible: true });
    console.log('Conteúdo da página carregado');

    // const articlesContent = await getAllArticlesContent(page);
    const articles = await parseBeInCryptoArticles(page)

    await page.browser().close();

    return {
      data: articles,
    };
  } catch (error) {
    console.error('Erro ao extrair os artigos:', error);
    await page.browser().close();

    return {
      success: false,
      error: 'Ocorreu um erro ao processar os artigos.',
    };
  }
});
