package edu.eci.arsw.blueprints.filters;

import edu.eci.arsw.blueprints.model.Blueprint;

/**
 * Interface defining the filtering strategy for Blueprints.
 * Implementations of this interface will provide different ways to filter
 * or process Blueprint points before they are returned to the client.
 */
public interface BlueprintFilter {
    
    /**
     * Filters a blueprint according to a specific strategy.
     * 
     * @param blueprint The blueprint to be filtered
     * @return A new Blueprint instance with the filtered points
     * @throws IllegalArgumentException if the blueprint is null
     */
    Blueprint filter(Blueprint blueprint);
}