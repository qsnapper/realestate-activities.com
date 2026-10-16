import { defineConfig, tinaTableTemplate } from "tinacms";
import type { TinaField } from "tinacms";
// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Home page fields, shared by the EN and NL versions. The hero and service
// cards are rendered by layouts/_partials/home-sections.html.
const homeFields: TinaField[] = [
  {
    type: "string",
    name: "title",
    label: "Page title (browser tab)",
    isTitle: true,
    required: true,
    searchable: true,
  },
  {
    type: "string",
    name: "description",
    label: "Description (shown in search engines)",
    ui: { component: "textarea" },
    searchable: true,
  },
  {
    type: "object",
    name: "hero",
    label: "Top of page",
    fields: [
      { type: "string", name: "headline", label: "Headline" },
      {
        type: "string",
        name: "subtitle",
        label: "Introduction",
        description: "Each line starts on a new line on larger screens.",
        ui: { component: "textarea" },
      },
      {
        type: "object",
        name: "button",
        label: "Button",
        fields: [
          { type: "string", name: "text", label: "Button text" },
          {
            type: "string",
            name: "link",
            label: "Button link",
            description: "For example: docs (the Services page), about, or a full https:// address.",
          },
        ],
      },
    ],
  },
  {
    type: "object",
    name: "features",
    label: "Service cards",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.title || "New card" }),
    },
    fields: [
      { type: "string", name: "title", label: "Title", required: true },
      {
        type: "string",
        name: "subtitle",
        label: "Text",
        ui: { component: "textarea" },
      },
      {
        type: "string",
        name: "link",
        label: "Link (optional)",
        description: "Makes the whole card clickable, e.g. docs/valuations",
      },
      {
        type: "string",
        name: "icon",
        label: "Icon (optional)",
        options: [
          { value: "", label: "None" },
          { value: "sparkles", label: "Sparkles" },
          { value: "home", label: "House" },
          { value: "currency-euro", label: "Euro" },
          { value: "document-text", label: "Document" },
          { value: "scale", label: "Scales" },
          { value: "key", label: "Key" },
          { value: "globe-alt", label: "Globe" },
          { value: "chat", label: "Speech bubble" },
        ],
      },
    ],
  },
  {
    type: "rich-text",
    name: "body",
    label: "Extra text below the cards (optional)",
    isBody: true,
  },
  {
    type: "string",
    name: "translationKey",
    label: "TranslationKey",
    ui: { component: "hidden" },
  },
  {
    type: "string",
    name: "layout",
    label: "Layout",
    ui: { component: "hidden" },
  },
];

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/


  schema: {
    collections: [

      // Home Page 

      {
        name: "home",
        label: "Home Page [EN]",
        path: "content/",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "**_index*en*"
        },
        fields: homeFields,
      },

      {
        name: "homenl",
        label: "Home Page [NL]",
        path: "content/",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "**_index*nl*",
        },
        fields: homeFields,
      },

      // About Page EN
      {
        name: "about",
        label: "About Page [EN]",
        path: "content/about",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          exclude: "index*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
          },
          {
            type: "boolean",
            name: "toc",
            label: "Show TOC?",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              tinaTableTemplate,
            ],
          },
        ],
      },

      // About Page NL
      {
        name: "aboutnl",
        label: "About Page [NL]",
        path: "content/about",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "index*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
          },
          {
            type: "boolean",
            name: "toc",
            label: "Show TOC?",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      // Blog pages EN

      {
        name: "blog",
        label: "Blog Page [EN]",
        path: "content/blog",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },

          filename: {
            slugify: (values) => {
              // Generate filename based on title field, converting to lowercase and replacing spaces with dashes
              const title = values.title || "untitled";
              return title.toLowerCase().replace(/\s+/g, "-");
            },
          },

          

        },
        match: {
          exclude: "*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            ui: {
              dateFormat: 'MMM DD, YYYY', // Customize the date format as needed
              format: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), // Set default value to today's date in the specified format
            },
          },

          // object

          {
            type: "object",
            name: "authors",
            label: "Authors",
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name'
              },
              {
                type: 'string',
                name: 'link',
                label: 'Link',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Image',
              },


            ],
            itemProps: (item) => ({
              label: item.name, // Use the question as the display label
            }),

          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },
          {
            type: "boolean",
            name: "excludeSearch",
            label: "Exclude from search",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // Blog pages NL 

      {
        name: "blognl",
        label: "Blog Page [NL]",
        path: "content/blog",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          filename: {
            slugify: (values) => {
              // Generate filename based on title field, converting to lowercase and replacing spaces with dashes
              const title = values.title || "untitled";
              const filenameSuffix = ".nl";
              return `${title.toLowerCase().replace(/\s+/g, "-")}${filenameSuffix}`;
            },
          },

        },
        match: {
          include: "*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            ui: {
              dateFormat: 'MMM DD, YYYY', // Customize the date format as needed
              format: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), // Set default value to today's date in the specified format
            },
          },

          // object

          {
            type: "object",
            name: "authors",
            label: "Authors",
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name'
              },
              {
                type: 'string',
                name: 'link',
                label: 'Link',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Image',
              },


            ],
            itemProps: (item) => ({
              label: item.name, // Use the question as the display label
            }),

          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },
          {
            type: "boolean",
            name: "excludeSearch",
            label: "Exclude from search",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      // Services Page EN

      {
        name: "docs",
        label: "Services Page [EN]",
        path: "content/docs",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          filename: {
            slugify: (values) => {
              // Generate filename based on title field, converting to lowercase and replacing spaces with dashes
              const title = values.title || "untitled";
              return title.toLowerCase().replace(/\s+/g, "-");
            },
          },
        },
        match: {
          exclude: "*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "string",
            name: "translationKey",
            label: "TranslationKey",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            ui: {
              dateFormat: 'MMM DD, YYYY', // Customize the date format as needed
              format: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), // Set default value to today's date in the specified format
            },
          },
          {
            type: "datetime",
            name: "lastmod",
            label: "Last Modified Date",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },
          {
            type: "boolean",
            name: "toc",
            label: "Show table of contents",

          },
          {
            type: "number",
            name: "weight",
            label: "Weight",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              tinaTableTemplate,
            ],
          },
        ],
      },

      // Services page NL

      {
        name: "docsnl",
        label: "Services Page [NL]",
        path: "content/docs",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          filename: {
            slugify: (values) => {
              // Generate filename based on title field, converting to lowercase and replacing spaces with dashes
              const title = values.title || "untitled";
              const filenameSuffix = ".nl";
              return `${title.toLowerCase().replace(/\s+/g, "-")}${filenameSuffix}`;
            },
          },
        },
        match: {
          include: "*nl*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            searchable: true,
          },
          {
            type: "string",
            name: "translationKey",
            label: "TranslationKey",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            ui: {
              dateFormat: 'MMM DD, YYYY', // Customize the date format as needed
              format: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), // Set default value to today's date in the specified format
            },
          },
          {
            type: "datetime",
            name: "lastmod",
            label: "Last Modified Date",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Deactivate Post",
          },
          {
            type: "boolean",
            name: "toc",
            label: "Show table of contents",

          },
          {
            type: "number",
            name: "weight",
            label: "Weight",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // Footer 

      // Footer data collection
      {

        format: "yaml",
        name: "footer",
        label: "Footer",
        path: "data",
        match: {
          include: "**footer*",
        },
        fields: [
          {
            type: "string",
            name: "companyName",
            label: "Company Name",
          },
          {
            type: "string",
            name: "address",
            label: "Address",
          },
          {
            type: "string",
            name: "contactInfo1",
            label: "Tel",
          },
          {
            type: "string",
            name: "contactInfo2",
            label: "Fax",
          },
          {
            type: "string",
            name: "contactInfo3",
            label: "Mobile",
          },
          {
            type: "string",
            name: "email",
            label: "Email",
          },
          {
            type: "string",
            name: "url",
            label: "URL",
          },
          {
            type: "string",
            name: "copyright",
            label: "Copyright",
          },
          {
            type: "string",
            name: "poweredBy",
            label: "Poweredby",
          },
        ],
      },

    ],
  },

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_INDEXER_TOKEN, // Add your search token here
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
