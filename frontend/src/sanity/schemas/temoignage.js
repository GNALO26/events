export default {
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    {
      name: 'auteur',
      title: 'Auteur',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'citation',
      title: 'Citation',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Photo du couple',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'video',
      title: 'Vidéo témoignage (optionnelle)',
      type: 'file',
    },
  ],
};