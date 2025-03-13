/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */


@Service("inMemoryBlueprintPersistence")
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_ ",pts);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);

        Point[] pts1=new Point[]{new Point(140, 140),new Point(100, 30)};
        Blueprint bp1=new Blueprint("Pedrito", "casita ",pts1);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);

        Point[] pts2=new Point[]{new Point(140, 140),new Point(200, 100)};
        Blueprint bp2=new Blueprint("juan", "apt 1",pts2);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);

        Point[] pts3=new Point[]{new Point(140, 140),new Point(130, 130)};
        Blueprint bp3=new Blueprint("juan", "apt 2",pts3);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
        
    }    

    /**
     * Save a new blueprint.
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }


    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    /**
     * Get a blueprint by its author and name.
     * @param author blueprint's author
     * ¿@param bprintname blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     **/
    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprintsByAuthor = new HashSet<>();

        for (Map.Entry<Tuple<String, String>, Blueprint> entry : blueprints.entrySet()) {
            Blueprint blueprint = entry.getValue();
            if (blueprint != null && blueprint.getAuthor().equals(author)) {
                blueprintsByAuthor.add(blueprint);
            }
        }

        if (blueprintsByAuthor.isEmpty()) {
            throw new BlueprintNotFoundException("There are no blueprints with the author: " + author);
        }

        return blueprintsByAuthor;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() {
        Set<Blueprint> allBlueprints = new HashSet<>();
        for (Map.Entry<Tuple<String, String>, Blueprint> entry : blueprints.entrySet()) {
            Blueprint blueprint = entry.getValue();
            if (blueprint != null) {
                allBlueprints.add(blueprint);
            }
        }
        return allBlueprints;
    }

    @Override
    public void updateBlueprint(Blueprint bp) throws BlueprintNotFoundException {
        Blueprint old = blueprints.replace(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        if (old == null) {
            throw new BlueprintNotFoundException("The given blueprint does not exist: " + bp);
        }
        
    }


}
