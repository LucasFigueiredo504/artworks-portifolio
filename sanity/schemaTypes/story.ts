import {defineType, defineField} from 'sanity'

// Simple safe type for parent (fixes TS error)
type SectionParent = {
  type?: string
}

export default defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    // ✅ BANNER (reference to imageFile)
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'reference',
      to: [{type: 'imageFile'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'last_updated_at',
      title: 'Last Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ✅ SECTIONS
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Text + Image', value: 'text-image'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),

            // ✅ IMAGE REFERENCE (fixed TS)
            defineField({
              name: 'image',
              title: 'Image File',
              type: 'reference',
              to: [{type: 'imageFile'}],
              hidden: ({parent}) => (parent as SectionParent)?.type === 'text',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if ((context.parent as SectionParent)?.type === 'text-image' && !value) {
                    return 'Image is required for text-image sections'
                  }
                  return true
                }),
            }),

            // ✅ ALIGNMENT (fixed TS)
            defineField({
              name: 'alignment',
              title: 'Image Alignment',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
              },
              hidden: ({parent}) => (parent as SectionParent)?.type === 'text',
            }),
          ],
        },
      ],
    }),
  ],
})
