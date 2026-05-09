export default {
  name: 'reel',
  title: 'Instagram Reel',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A short title for the reel (e.g. "Signature Oud Experience")',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The thumbnail image for the reel (Vertical 9:16 recommended)',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram Reel URL',
      type: 'url',
      description: 'The direct link to the Instagram Reel (e.g. https://www.instagram.com/reels/...)',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order of appearance on the homepage (ascending)',
    },
  ],
};
