import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BlitzBrowser',
  tagline: 'BlitzBrowser helps you to manage, deploy and run headful browsers in the cloud and self hosted.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.blitzbrowser.com',
  baseUrl: '/',

  organizationName: 'blitzbrowser',
  projectName: 'blitzbrowser',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
          editUrl: 'https://github.com/blitzbrowser/docs/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social.webp',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BlitzBrowser',
      logo: {
        alt: 'BlitzBrowser Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/blitzbrowser/blitzbrowser',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'BlitzBrowser GitHub repository',
        },
        {
          href: 'https://discord.gg/qZ3tCZJ2Ze',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'BlitzBrowser Discord server',
        },
        {
          href: 'https://www.reddit.com/r/BlitzBrowser/',
          position: 'right',
          className: 'header-reddit-link',
          'aria-label': 'BlitzBrowser Reddit',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Developer Docs',
              to: '/',
            },
            {
              label: 'Github',
              to: 'https://github.com/blitzbrowser/blitzbrowser',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Status',
              to: 'https://status.blitzbrowser.com',
            },
          ],
        },
        {
          title: 'Contact Us',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.gg/qZ3tCZJ2Ze',
            },
            {
              label: 'Reddit',
              to: 'https://www.reddit.com/r/BlitzBrowser/',
            },
            {
              label: 'support@blitzbrowser.com',
              to: 'mailto:support@blitzbrowser.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BlitzBrowser. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['yaml', 'java'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [],
  themes: ["docusaurus-theme-openapi-docs"],
  scripts: [
    {
      src: 'https://umami.blitzbrowser.com/script.js',
      defer: true,
      'data-website-id': '2f1ec37a-7703-4996-9fe3-e6435bb155f5'
    }
  ]
};

export default config;
