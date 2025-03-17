//@author hcadavid

apimock = (function () {
	var mockdata = [];

	mockdata["johnconnor"] = [
		{
			author: "johnconnor",
			points: [
				{ x: 200, y: 100 },
				{ x: 250, y: 125 },
				{ x: 275, y: 175 },
				{ x: 250, y: 225 },
				{ x: 200, y: 250 },
				{ x: 150, y: 225 },
				{ x: 125, y: 175 },
				{ x: 150, y: 125 },
			],
			name: "house",
		},
		{
			author: "johnconnor",
			points: [
				{ x: 200, y: 100 },
				{ x: 250, y: 125 },
				{ x: 275, y: 175 },
				{ x: 250, y: 225 },
				{ x: 200, y: 250 },
				{ x: 150, y: 225 },
				{ x: 125, y: 175 },
				{ x: 150, y: 125 },
			],
			name: "gear",
		},
	];

	mockdata["maryweyland"] = [
		{
			author: "maryweyland",
			points: [
				{ x: 140, y: 140 },
				{ x: 115, y: 115 },
			],
			name: "house2",
		},
		{
			author: "maryweyland",
			points: [
				{ x: 140, y: 140 },
				{ x: 115, y: 115 },
			],
			name: "gear2",
		},
	];

	mockdata["Alice"] = [
		{
			author: "Alice",
			points: [
				{ x: 200, y: 100 },
				{ x: 230, y: 115 },
			],
			name: "apartamento",
		},
		{
			author: "Alice",
			points: [
				{ x: 200, y: 100 },
				{ x: 230, y: 115 },
			],
			name: "gear3",
		},
	];

	mockdata["Pedro"] = [
		{
			author: "Pedro",
			points: [
				{ x: 215, y: 150 },
				{ x: 240, y: 140 },
			],
			name: "casaCampestre",
		},
		{
			author: "Pedro",
			points: [
				{ x: 215, y: 150 },
				{ x: 240, y: 140 },
			],
			name: "gear4",
		},
	];

	return {
		getBlueprintsByAuthor: function (authname, callback) {
			callback(mockdata[authname]);
		},

		getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
			callback(
				mockdata[authname].find(function (e) {
					return e.name === bpname;
				}),
			);
		},
		 updateBlueprint: function(blueprint, callback) {
            // Buscar el blueprint en la colección de mockdata
            for (let i = 0; i < mockdata.length; i++) {
                if (mockdata[i].author === blueprint.author && mockdata[i].name === blueprint.name) {
                    // Actualizar el blueprint en el mock data
                    mockdata[i].points = blueprint.points;
                    callback(mockdata[i]);
                    return;
                }
            }
            // Si no se encuentra el blueprint
            callback(null);
        },
	};
})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/
