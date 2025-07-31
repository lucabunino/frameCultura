export default function body({ group = undefined } = {}) {
	return {
		name: 'body',
		title: 'Body',
		type: 'array',
		group,
		of: [
			{
				type: 'block',
				styles: [
					{ value: 'normal', title: 'Normal' },
					{ value: 'h3', title: 'Title' },
				],
				lists: [
					{title: 'Bullet', value: 'bullet'}
				],
				marks: {
					decorators: [
						{title: 'Bold', value: 'strong'},
						{title: 'Italic', value: 'em'},
					],
					annotations: [
					{
						name: 'link',
						type: 'object',
						fields: [
						{
							name: 'url',
							type: 'string',
							validation: Rule =>
							Rule.custom(href => {
								if (!href) return true;
								return /^(https?:\/\/|mailto:|tel:)/.test(href)
								? true
								: 'Must be a valid URL, mailto:, or tel: link';
							}),
						},
						{
							title: 'Open in new tab',
							name: 'blank',
							type: 'boolean',
						},
						],
					},
					],
				},
			},
		]
	}
}