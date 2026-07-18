export default {
  name: 'mariage',
  title: 'Mariage',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    },
    {
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'videos',
      title: 'Vidéos',
      type: 'array',
      of: [{ type: 'file' }],
    },
    {
      name: 'tags',
      title: 'Tags émotionnels',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Frissons', value: 'Frissons' },
          { title: 'Sourires', value: 'Sourires' },
          { title: 'Larmes de joie', value: 'Larmes de joie' },
          { title: 'Danse', value: 'Danse' },
        ],
      },
    },
    {
      name: 'histoire',
      title: 'Histoire du couple',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'titre',
      media: 'photos.0',
    },
  },
};