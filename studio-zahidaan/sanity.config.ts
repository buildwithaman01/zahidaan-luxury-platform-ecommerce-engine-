import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'zahidaan-studio',
  title: 'ZAHIDAAN Studio',

  projectId: 'paf2xup3',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('ZAHIDAAN Dashboard')
          .items([
            // Store Management Group
            S.listItem()
              .title('Store Management')
              .child(
                S.list()
                  .title('Store')
                  .items([
                    S.documentTypeListItem('order').title('Orders'),
                    S.documentTypeListItem('product').title('Products'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),
            
            S.divider(),

            // Content Management Group
            S.listItem()
              .title('Content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.documentTypeListItem('blogPost').title('Blog Posts'),
                    S.documentTypeListItem('siteSettings').title('Site Settings'),
                  ])
              ),
            
            S.divider(),
            
            // Filter all other document types if any
            ...S.documentTypeListItems().filter(
              (listItem) => !['order', 'product', 'category', 'blogPost', 'siteSettings'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
