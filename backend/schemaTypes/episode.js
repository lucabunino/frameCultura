import body from './fields/body.js'
import {SquareIcon} from '@sanity/icons';

export default {
	name: 'episode',
	type: 'document',
	icon: SquareIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'subtitle',
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
			name: 'date',
			type: 'date',
		},
		{
			name: 'link',
			type: 'url',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'topics',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'topic'},],
				}
			],
		},
		{
			name: 'authors',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'person'},],
					options: {
						filter: 'isAuthor == true'
					}
				}
			],
		},
		// {
		// 	name: 'cover',
		// 	description: 'Aspect ratio 1:1',
		// 	type: 'image',
		// },
		body(),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'cover',
		},
	},
}