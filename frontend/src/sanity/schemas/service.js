export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom du service',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'prix_base',
      title: 'Prix de base (€)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'options',
      title: 'Options supplémentaires',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nom', type: 'string', title: 'Nom de l\'option' },
            { name: 'prix', type: 'number', title: 'Prix (€)' },
          ],
          preview: {
            select: { title: 'nom', subtitle: 'prix' },
          },
        },
      ],
    },
    {
      name: 'video',
      title: 'Vidéo associée',
      type: 'file',
    },
    {
      name: 'icone',
      title: 'Icône (code SVG ou nom)',
      type: 'string',
      description: 'Nom de l\'icône Lucide ou code SVG inline',
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          'Coordination',
          'Décoration florale',
          'Traiteur',
          'Photo/Vidéo',
          'Animation musicale',
          'Papeterie',
          'Look & bien-être',
        ],
      },
    },
  ],
};