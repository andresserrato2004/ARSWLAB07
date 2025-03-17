const app = (() => {
    let authorName = "";
    let blueprints = [];
    let currentBlueprint = null; // Add this variable to track the current blueprint
	let isDrawing = false; // Add this variable to track if the user is drawing or not

    //cambiar esta linea bien sea por apimock o apiclient
    const api = apiclient;

    //función para la lista de planos
    const updateBlueprints = (author) => {
        authorName = author;
        $("#author-title").text(`Blueprints by ${author}:`);
        api.getBlueprintsByAuthor(author, (data) => {
            blueprints = data.map((bp) => ({
                name: bp.name,
                points: bp.points.length,
            }));
            renderBlueprints();
        });
    };

    //función para mostrar la lista de datos en la tabla
    const renderBlueprints = () => {
        const tableBody = $("#blueprintTable tbody");
        tableBody.empty();

        // biome-ignore lint/complexity/noForEach: <explanation>
        blueprints.forEach((bp) => {
            tableBody.append(
                `<tr>
                    <td>${bp.name}</td>
                    <td>${bp.points}</td>
                    <td><button class="btn btn-primary open-btn" data-name="${bp.name}">Open</button></td>
                </tr>`,
            );
        });

        const totalPoints = blueprints.reduce((sum, bp) => sum + bp.points, 0);
        $("#totalPoints").text(`Total user points: ${totalPoints}`);

        // Agregar event listeners a los botones "Open"
        $(".open-btn").click(function () {
            const blueprintName = $(this).data("name");
            getAndDrawBlueprint(authorName, blueprintName);
        });
    };

    // Función para dibujar un plano específico
    const getAndDrawBlueprint = (author, blueprintName) => {
        api.getBlueprintsByNameAndAuthor(author, blueprintName, (blueprint) => {
            if (blueprint) {
                currentBlueprint = blueprint; // Store the current blueprint
                drawBlueprint(blueprint);
                $("#currentBlueprintName").text(blueprintName);
            } else {
                console.error("Blueprint not found");
            }
        });
    };

    // Función para dibujar el plano en el canvas
    const drawBlueprint = (blueprint) => {
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (blueprint.points && blueprint.points.length > 0) {
            ctx.beginPath();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;

            ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);

            for (let i = 1; i < blueprint.points.length; i++) {
                ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
            }

            ctx.stroke();
            
            blueprint.points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
                ctx.fillStyle = "#000000";
                ctx.fill();
            });
        }
    };

    
    const initCanvasEvents = () => {
        const canvas = document.getElementById("blueprintCanvas");
        console.log("Initializing canvas events");
        
        canvas.addEventListener('mousedown', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            isDrawing = true;
            handleCanvasClick(x, y);
        });
        
        canvas.addEventListener('mousemove', function(event) {
            if (!isDrawing) return; // Skip if not drawing
            
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            handleCanvasClick(x, y);
        });
        
        canvas.addEventListener('mouseup', function() {
            isDrawing = false;
        });
        
        canvas.addEventListener('mouseleave', function() {
            isDrawing = false;
        });
        
        canvas.addEventListener('touchstart', function(event) {
            event.preventDefault();
            
            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            isDrawing = true;
            handleCanvasClick(x, y);
        }, { passive: false });
        
        canvas.addEventListener('touchmove', function(event) {
            if (!isDrawing) return;
            event.preventDefault();
            
            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            handleCanvasClick(x, y);
        }, { passive: false });
        
        canvas.addEventListener('touchend', function() {
            isDrawing = false;
        });
    };

    const handleCanvasClick = (x, y) => {
        
        if (currentBlueprint) {
            if (!currentBlueprint.points) {
                currentBlueprint.points = [];
            }
            
            currentBlueprint.points.push({ x, y });
            
            drawBlueprint(currentBlueprint);
            
            const updatedBlueprints = blueprints.map(bp => {
                if (bp.name === currentBlueprint.name) {
                    return { ...bp, points: currentBlueprint.points.length };
                }
                return bp;
            });
            
            blueprints = updatedBlueprints;
            renderBlueprints();
        } else {
            alert("Please select a blueprint first before adding points");
        }
    };

	const saveAndUpdateBlueprint = () => {
		try {
			if (!currentBlueprint) {
				alert("No blueprint selected. Select a blueprint first.");
				return;
			}
			api.updateBlueprint(currentBlueprint, function(updatedBlueprint) {
				try {
					if (!updatedBlueprint) {
						api.getBlueprintsByAuthor(authorName, function(updatedBlueprints) {
							if (updatedBlueprints) {
								blueprints = updatedBlueprints.map((bp) => ({
									name: bp.name,
									points: bp.points.length,
								}));
								renderBlueprints();
								alert("Blueprint saved and updated successfully!");
							} else {
								const error = new Error("No blueprints data returned from server");
								alert("Error refreshing blueprints data: " + error.message);
							}
						});
					} else {
						const error = new Error("Server returned null or undefined");
						alert("Error saving the blueprint: " + error.message);
					}
				} catch (e) {
					alert("Error processing update response: " + e.message);
				}
			});
		} catch (e) {
			alert("Critical error saving blueprint: " + e.message);
		}
	};
		

    return {
        setAuthor: (author) => {
            updateBlueprints(author);
        },

        init: () => {
            $("#getBlueprintsBtn").click(() => {
                const author = $("#author").val();
                app.setAuthor(author);
            });

			$("#saveUpdateBtn").click(() => {
        		saveAndUpdateBlueprint();
    		});

            initCanvasEvents();
        },

        drawBlueprint: (author, blueprintName) => {
            getAndDrawBlueprint(author, blueprintName);
        },
    };

})();

$(document).ready(() => {
    app.init();
    
});