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
            label: "Enter a description",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
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
            label: "Enter a description",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
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
    ],
  },
});
