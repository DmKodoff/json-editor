const fetchData = async () => {
	const response = await fetch(
		'https://api.json-generator.com/templates/CNok9GWrxcNX/data',
		{
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_GEN_JSON_API}`,
			},
		}
	);

	const data = await response.json();

	if (response.status !== 200) {
		if (data.error) {
			throw data.error;
		}
		throw new Error(
			`Some problem with loading data, status: ${response.status}`
		);
	}

	return data;
};

const dataService = {
	fetchData,
};

export default dataService;
