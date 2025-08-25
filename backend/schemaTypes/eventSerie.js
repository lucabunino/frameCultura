import body from './fields/body.js'
import seoFields from './fields/seoFields.js'
import { TimelineIcon } from '@sanity/icons'

export default {
	name: 'eventSerie',
	type: 'document',
	icon: TimelineIcon,
	groups: [{name: 'SEO'}],
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
			name: 'visible',
			title: "Visible in 'Live' page",
			type: 'boolean',
			initialValue: false,
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'hierarchy',
			description: 'Higher number means it will be displayed higher in Esplora',
			type: 'number',
			initialValue: 1,
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'start',
			description: "Set time to '00:00' to only display date",
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'end',
			description: "Leave this field empty if you just want 'start'. Set time to '00:00' to only display date",
			type: 'datetime',
		},
		{
			name: 'location',
			type: 'string',
		},
		{
			name: 'city',
			type: 'reference',
			to: [{type: 'city'},],
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
			name: 'cover',
			description: 'Aspect ratio 5:7',
			type: 'image',
		},
		{
			name: 'highlightCover',
			description: "Aspect ratio 16:9. To be used if the event serie is selected in 'Live' page",
			type: 'image',
		},
		{
			name: 'horizontalCover',
			description: 'Aspect ratio 21:9. To be used in single page',
			type: 'image',
		},
		body(),
		{
			name: 'events',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'event' }],
				},
			],
			validation: (Rule) => Rule.required(),
		},
		...seoFields(),
	],
};