# BeInCrypto News/Analyse API

<h4 align="center">A web scraper and API built with Puppeteer and Nuxt 3 (powered by Nitro) to fetch news and crypto analysis from <a href="https://beincrypto.com/" target="_blank">BeInCrypto</a>. Deployed on Vercel.</h4>

![image](https://github.com/user-attachments/assets/ec8112df-57b9-4045-8cd0-7d74f5c4ba80)

(Simple sketch of the app flow)

## How To Run

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/cn-2k/bic-api

# Go into the repository
$ cd bic-api

# Install dependencies
$ npm install

# Run the dev server
$ npm run dev
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

Finally, change the ``.env.example`` filename to  ``.env`` and fulfill the ``BIC_URL`` with a valid BeInCrypto URL that contain a list of articles, similar to: https://beincrypto.com/analysis/.

## How to use

This project is basically an API so you can run locally or use the demo URL that I've provided on Vercel, see the endpoints avaiable to use:


### API Endpoints:

``/api/articles`` - List the recent articles or news provided by the env. variable ``BIC_URL``, make sure to provide a correct URL, in my case I've used https://br.beincrypto.com/analise-bitcoin/.

![image](https://github.com/user-attachments/assets/ce10712a-ee0c-4dfc-8854-aff62c2914cf)


``/api/articles/content`` - Extracts the content of a specific article by passing the article link as a query parameter.

![image](https://github.com/user-attachments/assets/fbcf84d9-2b15-4da2-ba5b-9a02db908d62)


## Credits

This software uses the following open source packages:

- [Nuxt](https://www.nuxt.com)
- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)

## License

MIT
