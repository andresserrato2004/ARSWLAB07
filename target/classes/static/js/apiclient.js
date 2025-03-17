/**
 * API Client Module for Blueprints REST Service
 * Provides methods to interact with the backend REST API
 */
const apiclient = (() => {
	// Base URL for all API requests
	const apiBaseURL = "/blueprints";

	return {
		/**
		 * Get all blueprints by author
		 * @param {string} authorName - The author's name
		 * @param {function} callback - Callback function to process the blueprints
		 */
		getBlueprintsByAuthor: (authorName, callback) => {
			$.ajax({
				url: `${apiBaseURL}/${authorName}`,
				type: "GET",
				contentType: "application/json",
				success: (response) => {

					if (response && typeof response === "object" && response.blueprints) {
						callback(response.blueprints);
					}
						else if (Array.isArray(response)) {
						callback(response);
					}
					else {
						callback([]); 
					}
				},
				error: (xhr, status, error) => {
					console.error("Error getting blueprints:", error);
					alert(`Error loading blueprints: ${xhr.responseText}`);
				},
			});
		},

		/**
		 * Get a specific blueprint by author and name
		 * @param {string} authorName - The author's name
		 * @param {string} bpname - The blueprint's name
		 * @param {function} callback - Callback function to process the blueprint
		 */
		getBlueprintsByNameAndAuthor: (authorName, bpname, callback) => {
			$.ajax({
				url: `${apiBaseURL}/${authorName}/${bpname}`,
				type: "GET",
				contentType: "application/json",
				success: (data) => {
					callback(data);
				},
				error: (xhr, status, error) => {
					console.error("Error getting blueprint:", error);
					alert(`Error loading blueprint: ${xhr.responseText}`);
				},
			});
		},

		/**
		 * Create a new blueprint
		 * @param {Object} blueprint - The blueprint object to create
		 * @param {function} callback - Optional callback function to handle result
		 */
		createBlueprint: (blueprint, callback) => {
			$.ajax({
				url: apiBaseURL,
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(blueprint),
				success: () => {
					console.log("Blueprint created successfully");
					if (callback) callback(true);
				},
				error: (xhr, status, error) => {
					console.error("Error creating blueprint:", error);
					if (callback) callback(false, xhr.responseText);
				},
			});
		},

		/**
		 * Update an existing blueprint
		 * @param {Object} blueprint - The blueprint object with updated data
		 * @param {function} callback - Optional callback function to handle result
		 */
		updateBlueprint: function(blueprint, callback) {
            // PUT request para actualizar el blueprint
            const url = `/blueprints/${blueprint.author}/${blueprint.name}`;
            
            $.ajax({
                url: url,
                type: 'PUT',
                data: JSON.stringify(blueprint),
                contentType: "application/json",
                success: function(response) {
                    callback(response);
                },
                error: function(error) {
                    console.error("Error updating blueprint:", error);
					console.log("aqui esta el error", error);
                    callback(null);
                }
            });
        },

		/**
		 * Get all blueprints
		 * @param {function} callback - Callback function to process all blueprints
		 */
		getAllBlueprints: (callback) => {
			$.ajax({
				url: apiBaseURL,
				type: "GET",
				contentType: "application/json",
				success: (data) => {
					callback(data);
				},
				error: (xhr, status, error) => {
					console.error("Error getting all blueprints:", error);
					alert(`Error loading blueprints: ${xhr.responseText}`);
				},
			});
		},
	};
})();
