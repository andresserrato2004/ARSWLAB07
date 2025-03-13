package edu.eci.arsw.blueprints.filters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

/**
 * Implementation of BlueprintFilter that performs subsampling on blueprint
 * points. This filter keeps every other point (even-indexed points) from the
 * original blueprint, effectively reducing the number of points by
 * approximately half.
 */
@Component("subsamplingFilter")
public class SubsamplingFilter implements BlueprintFilter {

    /**
     * Filters a blueprint by keeping only even-indexed points.
     *
     * @param blueprint The blueprint to be filtered
     * @return A new Blueprint instance with approximately half the original
     * points
     * @throws IllegalArgumentException if the blueprint is null
     */
    @Override
    public Blueprint filter(Blueprint blueprint) {
        List<Point> points = new ArrayList<>();
        List<Point> originalPoints = blueprint.getPoints();

        for (int i = 0; i < originalPoints.size(); i++) {
            if (i % 2 == 0) {
                points.add(originalPoints.get(i));
            }
        }

        return new Blueprint(blueprint.getAuthor(),
                blueprint.getName(),
                points.toArray(new Point[0]));
    }
}
