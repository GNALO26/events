export default {
  name: 'simulateurParams',
  title: 'Paramètres du simulateur',
  type: 'document',
  fields: [
    {
      name: 'coefficients',
      title: 'Coefficients',
      type: 'object',
      fields: [
        {
          name: 'invites',
          title: 'Invités',
          type: 'object',
          fields: [
            { name: 'seuil', title: 'Seuil', type: 'number' },
            { name: 'supplement_par_invite', title: 'Supplément par invité supplémentaire (€)', type: 'number' },
          ],
        },
        {
          name: 'saison_haute',
          title: 'Coefficient saison haute',
          type: 'number',
          initialValue: 1.2,
        },
      ],
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
  ],
};