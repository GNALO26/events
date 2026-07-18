export default {
  name: 'article',
  title: 'Article de blog',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
    },
    {
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'extrait',
      title: 'Extrait',
      type: 'text',
      rows: 3,
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Inspiration',
          'Conseils',
          'Tendances',
          'Organisation',
          'Destination',
          'Décoration',
        ],
      },
    },
  ],
};