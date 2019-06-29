module.exports = [
	{
		'$sort': {
			'updatedAt': -1
		}
	},
	{
		'$project': {
			'minute': {
				'$minute': '$updatedAt'
			},
			'hour': {
				'$hour': '$updatedAt'
			},
			'dayOfWeek': {
				'$dayOfWeek': '$updatedAt'
			},
			'day': {
				'$dayOfMonth': '$updatedAt'
			},
			'month': {
				'$month': '$updatedAt'
			},
			'year': {
				'$year': '$updatedAt'
			},
			'followerCount': 1
		}
	}
];
