export const resolvers = {
	Query: {
		weatherQuery: async (
			_: any,
			args: {
				latitude: number;
				longitude: number;
				current: boolean;
				daily: string;
				hourly: string;
				timezone: string;
			}
		) => {
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${args.latitude}&longitude=${args.longitude}&current=${args.current}&daily=${args.daily}&hourly=${args.hourly}&timezone=${args.timezone}`
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
		},

		aqiQuery: async (
			_: any,
			{
				current,
				latitude,
				longitude,
				timezone,
			}: {
				latitude: number;
				longitude: number;
				current: string;
				timezone: string;
			}
		) => {
			const response = await fetch(
				`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=${current}&timezone=${timezone}`,
				{
					method: "GET",
				}
			);

			const data = await response.json();
			return data; // Adjust this based on the actual structure of the responsesed on the actual structure of the response
		},

		newsQuery: async (
			_: any,
			{
				access_key,
				categories,
				countries,
				limit,
				offset,
				languages,
			}: {
				access_key: string;
				categories: string;
				limit: string;
				countries: string;
				offset: string;
				languages: string;
			}
		) => {
			const url = new URL(
				`http://api.mediastack.com/v1/news?access_key=${access_key}&categories=${categories}&limit=${limit}&countries=${countries}&offset=${offset}&languages=${languages}`
			);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data; // Adjust this based on the actual structure of the response
		},
	},
};
