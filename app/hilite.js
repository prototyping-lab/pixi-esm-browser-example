
import { AdvancedBloomFilter } from "./filters/filter-advanced-bloom.js";

let bloom = new AdvancedBloomFilter ({ brightness: 0, blur:4 });

// add glow when hovering ...
export default function hilite(g) {
  g.filters = g.filters || [];
  g.interactive = true;
  g.buttonMode = true;
  g.on("mouseover", () => {
    g.filters.push(bloom);
  });
  g.on("mouseout", () => {
    g.filters = g.filters.filter((x) => x != bloom);
  });
}