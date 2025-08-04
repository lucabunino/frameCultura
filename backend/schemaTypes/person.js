import body from './fields/body.js'
import { UserIcon } from '@sanity/icons'

export default {
	name: 'person',
	type: 'document',
	icon: UserIcon,
	fieldsets: [
		{name: 'author'},
		{name: 'team'},
	],
	groups: [
		{name: 'basics'},
		{name: 'author'},
		{name: 'team'},
	],
	fields: [
		{
			name: 'name',
			type: 'string',
			group: 'basics',
		},
		{
			name: 'surname',
			type: 'string',
			group: 'basics',
		},
		{
			name: 'alias',
			type: 'string',
			group: 'basics',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: (doc) => `${doc.name}-${doc.surname}`,
				maxLength: 96,
			},
			group: 'basics',
		},
		{
			name: 'portrait',
			type: 'image',
			group: 'basics',
		},
		body({ group: 'basics' }),
		{
			name: 'isAuthor',
			type: 'boolean',
			initialValue: true,
			validation: (Rule) => Rule.required(),
			fieldset: 'author',
			group: 'author',
		},
		{
			name: 'occupation',
			type: 'string',
			hidden: ({ parent }) => parent?.isAuthor !== true,
			fieldset: 'author',
			group: 'author',
		},
		{
			name: 'bio',
			type: 'text',
			fieldset: 'author',
			group: 'author',
		},
		{
			name: 'highlight',
			description: 'In homepage, if author is selected',
			type: 'text',
			rows: 4,
			hidden: ({ parent }) => parent?.isAuthor !== true,
			fieldset: 'author',
			group: 'author',
		},
		{
			name: 'highlightedContents',
			description: 'In homepage, if author is selected',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{type: 'video'},
						{type: 'playlist'},
						{type: 'episode'},
						{type: 'podcast'},
					],
				}
			],
			hidden: ({ parent }) => parent?.isAuthor !== true,
			fieldset: 'author',
			group: 'author',
		},
		{
			name: 'isTeam',
			type: 'boolean',
			initialValue: false,
			validation: (Rule) => Rule.required(),
			fieldset: 'team',
			group: 'team',
		},
		{
			name: 'role',
			type: 'string',
			hidden: ({ parent }) => parent?.isTeam !== true,
			fieldset: 'team',
			group: 'team',
		},
	],
	orderings: [
		{
			title: 'Surname',
			name: 'surnameAsc',
			by: [
				{ field: 'surname', direction: 'asc' },
			],
		},
		{
			title: 'Name',
			name: 'nameAsc',
			by: [
				{ field: 'name', direction: 'asc' },
			],
		},
	],
	preview: {
		select: {
			name: 'name',
			surname: 'surname',
			alias: 'alias',
			media: 'portrait',
		},
		prepare(selection) {
			const {name, surname, alias, media} = selection;
			return {
				title: `${name ? name : ``} ${surname ? surname : ``} ${alias ? `(${alias})` : ``}`,
				media: media
			};
		}
	}
};