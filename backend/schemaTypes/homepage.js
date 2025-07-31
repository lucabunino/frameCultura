import colorOptions from './fields/colorOptions.js'
import { HomeIcon } from '@sanity/icons';

console.log(colorOptions);


export default {
	name: 'homepage',
	type: 'document',
	icon: HomeIcon,
	fieldsets: [
		{name: 'hero'},
		{name: 'live'},
		{name: 'productions'},
		{name: 'authors'},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			hidden: true,
		},
		{
			name: 'intro1',
			type: 'text',
			rows: 2,
			fieldset: 'hero',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'intro2',
			rows: 3,
			type: 'text',
			fieldset: 'hero',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'highlights',
			type: 'array',
			of: [
				{
					name: 'highlight',
					type: 'object',
					fields: [
						{
							name: 'subtitle',
							type: 'string',
						},
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'abstract',
							type: 'text',
							rows: 4,
						},
						{
							name: 'ctaLabel',
							type: 'string',
						},
						{
							name: 'ctaReference',
							description: 'Link to a content inside framecultura.it',
							type: 'reference',
							to: [{ type: 'podcast' }, { type: 'video' }, { type: 'playlist' }, { type: 'event' }, { type: 'eventSerie' }],
						},
						{
							name: 'ctaLink',
							description: 'Link to an external website',
							type: 'url',
						},
						{
							name: 'backgroundColor',
							type: 'color',
							options: colorOptions
						},
						{
							name: 'backgroundImage',
							type: 'image',

						},
					]
				}
			]
		},
		{
			name: 'liveIntro',
			title: 'Intro',
			type: 'text',
			rows: 2,
			fieldset: 'live',
		},
		{
			name: 'liveSelection',
			title: 'Selection',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'event'},{type: 'eventSerie'},],
				}
			],
			fieldset: 'live',
		},
		{
			name: 'productionsIntro',
			title: 'Intro',
			type: 'text',
			rows: 2,
			fieldset: 'productions',
		},
		{
			name: 'productionsSelection',
			title: 'Selection',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'podcast'}, {type: 'video'}, {type: 'playlist'},],
				}
			],
			fieldset: 'productions',
		},
		{
			name: 'authorsIntro',
			title: 'Intro',
			type: 'text',
			rows: 2,
			fieldset: 'authors',
		},
		{
			name: 'authorsSelection',
			title: 'Selection',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'person'}],
					options: {
						filter: 'isAuthor == true'
					}
				}
			],
			fieldset: 'authors',
		},

	],
};