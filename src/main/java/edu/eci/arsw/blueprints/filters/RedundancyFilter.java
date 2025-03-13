package edu.eci.arsw.blueprints.filters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

@Component("redundancyFilter")
public class RedundancyFilter implements BlueprintFilter {
    /**
     * Filters out consecutive redundant points from a blueprint.
     *
     * @param blueprint The blueprint to be filtered
     * @return A new Blueprint instance with redundant points removed
     * @throws IllegalArgumentException if the blueprint is null
     */
    @Override
    public Blueprint filter(Blueprint blueprint) {
        List<Point> points = new ArrayList<>();
        List<Point> originalPoints = blueprint.getPoints();
        
        if (!originalPoints.isEmpty()) {
            points.add(originalPoints.get(0));
            
            for (int i = 1; i < originalPoints.size(); i++) {
                Point current = originalPoints.get(i);
                Point previous = originalPoints.get(i-1);
                
                if (current.getX() != previous.getX() || current.getY() != previous.getY()) {
                    points.add(current);
                }
            }
        }
        
        return new Blueprint(blueprint.getAuthor(), 
                           blueprint.getName(), 
                           points.toArray(new Point[0]));
    }
}