package edu.eci.arsw.blueprints.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.filters.BlueprintFilter;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {

    @Autowired
    @Qualifier("inMemoryBlueprintPersistence")
    BlueprintsPersistence bpp;

    @Autowired
    @Qualifier("redundancyFilter") 
    BlueprintFilter blueprintFilter;

    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }

    public Set<Blueprint> getAllBlueprints() {
        Set<Blueprint> blueprints = bpp.getAllBlueprints();
        return blueprints.stream()
                .map(bp -> blueprintFilter.filter(bp))
                .collect(Collectors.toSet());
    }

    /**
     *
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author, String name) throws BlueprintNotFoundException {
        Blueprint blueprint = bpp.getBlueprint(author, name);
        return blueprintFilter.filter(blueprint);
    }

    /**
     *
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprints = bpp.getBlueprintsByAuthor(author);
        return blueprints.stream()
                .map(bp -> blueprintFilter.filter(bp))
                .collect(Collectors.toSet());
    }

    /**
     * Updates an existing blueprint
     *
     * @param bp the blueprint with the updated information
     * @throws BlueprintNotFoundException if the blueprint with the given author
     * and name does not exist
     */
    public void updateBlueprint(Blueprint bp) throws BlueprintNotFoundException {
        bpp.updateBlueprint(bp);
    }

    /**
     * Delete an existing blueprint
     * @param author the author of the blueprint
     * @param name the name of the blueprint
     * @throws BlueprintNotFoundException
     */

    public void deleteBlueprint(String author, String name) throws BlueprintNotFoundException {
        bpp.deleteBlueprint(author, name);
    }

}
