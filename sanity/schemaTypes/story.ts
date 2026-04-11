// schemaTypes/story.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'last_updated_at',
      title: 'Last Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ✅ INLINE SECTIONS ARRAY
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
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type === 'text',
            }),
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
              hidden: ({parent}) => parent?.type === 'text',
            }),
          ],
        },
      ],
    }),
  ],
})