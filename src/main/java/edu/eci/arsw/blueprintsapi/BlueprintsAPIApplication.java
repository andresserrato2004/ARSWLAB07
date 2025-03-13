package edu.eci.arsw.blueprintsapi;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.blueprints"})
public class BlueprintsAPIApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlueprintsAPIApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(BlueprintsServices blueprintsServices) {
		return args -> {

			Blueprint bp1 = new Blueprint("Alice", "Plan1", new Point[]{new Point(10, 10), new Point(10, 10), new Point(20, 20), new Point(20, 20), new Point(30, 30)});
			Blueprint bp2 = new Blueprint("Bob", "Plan2", new Point[]{new Point(30, 30), new Point(40, 40)});

			blueprintsServices.addNewBlueprint(bp1);
			blueprintsServices.addNewBlueprint(bp2);

			System.out.println("Después de agregar: " + blueprintsServices.getAllBlueprints());

			// Consultar planos
			System.out.println("Todos los planos: " + blueprintsServices.getAllBlueprints());
			System.out.println("Planos de Alice: " + blueprintsServices.getBlueprintsByAuthor("Alice"));
			System.out.println("Plano específico: " + blueprintsServices.getBlueprint("Alice", "Plan1"));
		};
	}
}
