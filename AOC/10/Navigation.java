import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

class Navigation {
    // position=< 9,  1> velocity=< 0,  2>
    List<Integer> parsePosition(String s) {
        return Pattern
            .compile("-?\\d+")
            .matcher(s)
            .results()
            .map(MatchResult::group)
            .mapToInt(Integer::parseInt)
            .boxed()
            .collect(Collectors.toList());
    }

    void visualise(List<List<Integer>> l) {
        int minX = l.stream().map(x -> x.get(0)).min(Integer::compare).get();
        int maxX = l.stream().map(x -> x.get(0)).max(Integer::compare).get();
        int minY = l.stream().map(x -> x.get(1)).min(Integer::compare).get();
        int maxY = l.stream().map(x -> x.get(1)).max(Integer::compare).get();
        String matrix = "";

        for (int y = minY; y <= maxY; y++) {
            for (int x = minX; x <= maxX; x++) {
                int finalX = x;
                int finalY = y;
                boolean isFound = l
                    .stream()
                    .anyMatch(z -> z.get(0) == finalX && z.get(1) == finalY);

                if (isFound) {
                    matrix += "# ";
                } else {
                    matrix += ". ";
                }
            }
            matrix += "\n";
        }

        System.out.println(matrix);
    }

    List<List<Integer>> move(List<List<Integer>> l) {
        return l
            .stream()
            .map(x -> Arrays.asList(
                x.get(0) + x.get(2),
                x.get(1) + x.get(3),
                x.get(2),
                x.get(3)
            ))
            .collect(Collectors.toList());
    }

    void moveTo(List<List<Integer>> s, int n) {
        for (int i = 0; i < n; i++) {
            visualise(s);
            s = move(s);
        }
    }
    

    public static void main(String args[]) {
        Navigation n = new Navigation();

        try {
            List<List<Integer>> s = Files
                .lines(Paths.get("input"))
                .map(n::parsePosition)
                .collect(Collectors.toList());
            n.moveTo(s, 2);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
