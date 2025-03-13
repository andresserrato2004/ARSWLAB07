package edu.eci.arsw.blueprints.test.filters;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.Test;

import edu.eci.arsw.blueprints.filters.RedundancyFilter;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class RedundancyFilterTest {

    private RedundancyFilter redundancyFilter = new RedundancyFilter();

    @Test
    public void shouldRemoveConsecutiveRedundantPoints() {
        Point[] points = new Point[]{
            new Point(1, 1),
            new Point(1, 1),
            new Point(2, 2),
            new Point(2, 2),
            new Point(3, 3)
        };
        Blueprint bp = new Blueprint("john", "bp1", points);

        Blueprint filtered = redundancyFilter.filter(bp);

        assertNotNull("Filtered blueprint shouldn't be null", filtered);
        assertEquals("Should have removed redundant points", 3, filtered.getPoints().size());
        assertEquals("First point should be (1,1)", 1, filtered.getPoints().get(0).getX());
        assertEquals("Second point should be (2,2)", 2, filtered.getPoints().get(1).getX());
        assertEquals("Third point should be (3,3)", 3, filtered.getPoints().get(2).getX());
    }

    @Test
    public void shouldHandleEmptyBlueprint() {
        Blueprint bp = new Blueprint("john", "bp1", new Point[]{});

        Blueprint filtered = redundancyFilter.filter(bp);

        assertNotNull("Filtered blueprint shouldn't be null", filtered);
        assertEquals("Should handle empty points array", 0, filtered.getPoints().size());
    }
}
