import body from './fields/body.js'
import {VersionsIcon} from '@sanity/icons'

export default {
	name: 'playlist',
	type: 'document',
	icon: VersionsIcon,
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
			name: 'date',
			description: "When two productions have the same hierarchy, the one with the most recent date is displayed first in 'Esplora' page",
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
			name: 'visibleAuthor',
			title: "Visible in 'Author' page",
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'hierarchy',
			description: "Higher number means it will be displayed higher in 'Esplora' page",
			type: 'number',
			initialValue: 1,
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
			description: 'Aspect ratio 16:9',
			type: 'image',
		},
		{
			name: 'highlightCover',
			description: "Aspect ratio 21:9. To be used if the playlist is selected in 'Esplora' page",
			type: 'image',
		},
		body(),
		{
			name: 'videos',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'video' }],
				},
			],
			validation: (Rule) => Rule.required(),
		},
	],
};