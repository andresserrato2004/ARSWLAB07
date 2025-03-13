const app = (() => {
	let authorName = "";
	let blueprints = [];

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
			// Comenzar el dibujo
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 2;

			// Mover al primer punto
			ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);

			// Dibujar líneas entre todos los puntos
			for (let i = 1; i < blueprint.points.length; i++) {
				ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
			}

			// Finalizar el trazado
			ctx.stroke();
		}
	};

	return {
		setAuthor: (author) => {
			updateBlueprints(author);
		},

		init: () => {
			// Configuración del botón para obtener los planos
			$("#getBlueprintsBtn").click(() => {
				const author = $("#author").val();
				app.setAuthor(author);
			});
		},

		// Función pública para dibujar un plano específico
		drawBlueprint: (author, blueprintName) => {
			getAndDrawBlueprint(author, blueprintName);
		},
	};
})();

$(document).ready(() => {
	$("#getBlueprintsBtn").click(() => {
		const author = $("#author").val();
		app.setAuthor(author);
	});
});
