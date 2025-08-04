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
			name: 'number',
			type: 'number',
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
			name: 'visible',
			title: "Visible in 'Esplora' page",
			type: 'boolean',
			initialValue: false,
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'hierarchy',
			description: "Higher number means it will be displayed higher in 'Esplora' page",
			type: 'number',
			initialValue: 1,
			validation: (Rule) => Rule.required(),
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
		{
			name: 'cover',
			description: 'Aspect ratio 1:1',
			type: 'image',
		},
		{
			name: 'highlightCover',
			description: "Aspect ratio 21:9. To be used if the podcast is selected in 'Esplora' page",
			type: 'image',
		},
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