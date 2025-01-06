import type { Page } from 'puppeteer';
import { log } from './config';

export const parseBeInCryptoArticles = async (
  page: Page
): Promise<{ title: string; link: string; daysAgo: string; date: string }[]> => {
  const articles = await page.$$eval(
    'div[data-el="bic-c-news-big"]',
    (storyElements) =>
      storyElements.map((storyElement) => {
        const titleElement = storyElement.querySelector('h5 > a');
        const title = titleElement?.textContent?.trim() || '';
        const link = titleElement?.getAttribute('href') || '';

        const timeElements = storyElement.querySelectorAll(
          'div.flex.items-center.text-grey-700 time'
        );
        const daysAgo = timeElements[0]?.textContent?.trim() || '';
        const date = timeElements[1]?.textContent?.trim() || '';

        return { title, link, daysAgo, date };
      })
  );

  console.log(`Total articles parsed: ${articles.length}`);

  articles.forEach((article, index) => {
    console.log(`Article ${index + 1}:`, article);
  });

  return articles;
};

export const goToFirstArticle = async (page: Page) => {
  const articles = await parseBeInCryptoArticles(page);

  if (articles.length === 0) {
    throw new Error('No articles found to navigate to.');
  }

  const firstArticleLink = articles[0]!.link;

  if (!firstArticleLink) {
    throw new Error('The first article does not contain a valid link.');
  }

  console.log(`Navigating to the first article: ${firstArticleLink}`);

  await page.goto(firstArticleLink, { waitUntil: 'networkidle2' });

  console.log(`Successfully navigated to: ${firstArticleLink}`);

  const data = await getArticleContent(page, firstArticleLink);

  return { data }
};

export const extractArticleContent = async (page: Page): Promise<string> => {
  await page.waitForSelector('.entry-content-inner', { visible: true });

  const articleContent = await page.$$eval('.entry-content-inner p, .entry-content-inner h1, .entry-content-inner h2, .entry-content-inner blockquote', (elements) =>
    elements.map(el => el.textContent?.trim()).filter(Boolean).join('\n\n')
  );

  log('info', `Conteúdo do artigo extraído: ${articleContent}`);

  return articleContent;
};

export const getArticleContent = async (page: Page, articleLink: string): Promise<{ title: string; link: string; content: string }> => {
  log('info', `Acessando o artigo no link: ${articleLink}`);
  await page.goto(articleLink, { waitUntil: 'networkidle2' });

  const title = await page.title();

  let content = await extractArticleContent(page);

  content = content.replace(/\n/g, ' ');

  return { title, link: articleLink, content };
};

export const getAllArticlesContent = async (page: Page): Promise<string> => {
  const articles = await parseBeInCryptoArticles(page);

  if (articles.length === 0) {
    throw new Error('No articles found.');
  }

  const firstFourArticles = articles.slice(0, 4);

  const allArticlesContent: string[] = [];

  for (const article of firstFourArticles) {
    const articleLink = article.link;

    if (!articleLink) {
      console.log('Skipping article with invalid link:', article.title);
      continue;
    }

    console.log(`Acessando o artigo: ${article.title}`);

    const { content } = await getArticleContent(page, articleLink);

    allArticlesContent.push(content);
  }

  const concatenatedContent = allArticlesContent.join(' ').replace(/\n/g, '');

  return concatenatedContent;
};
