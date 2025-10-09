import {CaseIcon} from '@sanity/icons'

export default {
name: 'organization',
type: 'document',
icon: CaseIcon,
fields: [
	{
		name: 'title',
		type: 'string',
	},
	{
		name: 'displayTitle',
		type: 'boolean',
		initialValue: 'true',
	},
	{
		name: 'link',
		type: 'url',
	},
	{
		name: 'logo',
		type: 'image',
	},
],
};