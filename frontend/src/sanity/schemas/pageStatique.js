export default {
  name: 'pageStatique',
  title: 'Page statique',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de la page',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent', // Vous devrez définir un type "blockContent" pour le rich text
    },
  ],
};