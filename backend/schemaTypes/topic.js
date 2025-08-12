import { TagIcon } from '@sanity/icons'
import RelatedContentInput from './components/RelatedContentInput' // we'll make this


export default {
	name: 'topic',
	type: 'document',
	icon: TagIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
      name: 'relatedContent',
      title: 'Referenced In',
      type: 'array',
      of: [{ type: 'reference', to: [
        { type: 'video' },
        { type: 'playlist' },
        { type: 'episode' },
        { type: 'podcast' }
      ]}],
      components: {
        input: RelatedContentInput
      },
      readOnly: true
    }
	],
};