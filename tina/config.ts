import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
        label: "Home Page",
        path: "content/",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "**_index*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "translationKey",
            label: "TranslationKey",
          },
          {
            type: "string",
            name: "layout",
            label: "layout",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // About Page
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
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
            label: "Default value is false - Making True will not show the post in UI",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // Blog pages

      {
        name: "blog",
        label: "Blog Page",
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
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

      // Services Page

      {
        name: "docs",
        label: "Services Page",
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
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
            label: "Deactivate toc",
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
      
    ],
  },
});
