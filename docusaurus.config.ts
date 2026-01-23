import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: 'BlitzBrowser',
  tagline: 'BlitzBrowser helps you to manage and deploy headful browsers in the cloud and self hosted.',
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
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
          editUrl: 'https://github.com/blitzbrowser/docs/tree/main',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/blitzbrowser/docs/tree/main',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
        {
          to: '/blog', label: 'Blog', position: 'left'
        },
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
          title: 'Cloud Product',
          items: [
            {
              label: 'Use Cases',
              to: 'https://blitzbrowser.com/#use-cases',
            },
            {
              label: 'How To Use',
              to: 'https://blitzbrowser.com/#how-to-use',
            },
            {
              label: 'Pricing',
              to: 'https://blitzbrowser.com/#pricing',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Developer Docs',
              to: 'https://docs.blitzbrowser.com',
            },
            {
              label: 'Github',
              to: 'https://github.com/blitzbrowser/blitzbrowser',
            },
            {
              label: 'Status',
              to: 'https://status.blitzbrowser.com',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of Service',
              to: 'https://blitzbrowser.com/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              to: 'https://blitzbrowser.com/privacy-policy',
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
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          cloud: {
            specPath: "openapi/cloud.yaml",
            outputDir: "docs/cloud/api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
