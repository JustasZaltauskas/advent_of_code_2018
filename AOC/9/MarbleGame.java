
import java.util.Deque;  
import java.util.LinkedList;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
import java.lang.Math;

class MarbleGame {
  long play(int players, long maxMarble) {
    Deque<Long> marbles = new LinkedList<Long>();
    Map<Long, Long> scores = new HashMap<Long, Long>();

    marbles.add(new Long(0));
    
    for (long marble = 1; marble < maxMarble + 1; marble++) {
      long player = marble % players;

      if (marble % 23 == 0) {
        this.rotate(marbles, 7);

        long previousScore = scores.get(player) != null ?
          scores.get(player) : 0;
        
        scores.put(player, previousScore + marbles.removeLast() + marble);
        this.rotate(marbles, -1);
      } else {
        marbles = this.rotate(marbles, -1);
        marbles.add(marble);
      }
    }


    return Collections.max(scores.values());
  }

  Deque<Long> rotate(Deque<Long> l, int n) {
    for (long i = 0; i < Math.abs(n); i++) {
      if (n < 0) {
          l.add(l.removeFirst());
      } else if (n > 0) {
          l.addFirst(l.removeLast());
      }
    }

    return l;
  }

  public static void main(String[] args) {
    MarbleGame game = new MarbleGame();
    long score = game.play(410, 72059);
    System.out.println(score);
  }
}
