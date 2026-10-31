/**
 * The patterns a click can place on the Game of Life background. Shared by
 * LifeBrushes.astro, which draws their thumbnails at build time, and the script
 * in LifeBackground.astro, which places them.
 */
export interface Brush {
  /** Kills the cells under the brush instead of bringing them to life. */
  erase?: boolean;
  label: string;
  name: string;
  /** The pattern, one string per row: `O` is a live cell, `.` a dead one. */
  rows: string[];
}

export const BRUSHES: Brush[] = [
  { label: "Cell", name: "cell", rows: ["O"] },
  { label: "Blinker", name: "blinker", rows: ["OOO"] },
  { label: "Block", name: "block", rows: ["OO", "OO"] },
  { label: "Glider", name: "glider", rows: [".O.", "..O", "OOO"] },
  {
    label: "Lightweight spaceship",
    name: "lwss",
    rows: [".O..O", "O....", "O...O", "OOOO."],
  },
  { label: "R-pentomino", name: "r-pentomino", rows: [".OO", "OO.", ".O."] },
  { label: "Acorn", name: "acorn", rows: [".O.....", "...O...", "OO..OOO"] },
  {
    erase: true,
    label: "Eraser",
    name: "eraser",
    rows: ["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"],
  },
  {
    label: "Gosper glider gun",
    name: "gun",
    rows: [
      "........................O...........",
      "......................O.O...........",
      "............OO......OO............OO",
      "...........O...O....OO............OO",
      "OO........O.....O...OO..............",
      "OO........O...O.OO....O.O...........",
      "..........O.....O.......O...........",
      "...........O...O....................",
      "............OO......................",
    ],
  },
];

/** The brush used until the visitor picks another: a blinker keeps going. */
export const DEFAULT_BRUSH = "blinker";

/**
 * The live cells of a brush as offsets from the cell under the pointer, so
 * that the pattern is centred on it.
 * @param brush The brush to place.
 * @param turns Quarter turns clockwise, 0 to 3.
 * @returns `[x, y]` offsets of the cells the brush sets.
 */
export const brushCells = (brush: Brush, turns = 0): [number, number][] => {
  let cells: [number, number][] = [];
  brush.rows.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === "O") {
        cells.push([x, y]);
      }
    });
  });
  let height = brush.rows.length;
  let width = Math.max(...brush.rows.map((row) => row.length));
  for (let turn = 0; turn < turns % 4; turn++) {
    cells = cells.map(([x, y]) => [height - 1 - y, x]);
    [width, height] = [height, width];
  }
  const centreX = Math.floor(width / 2);
  const centreY = Math.floor(height / 2);
  return cells.map(([x, y]) => [x - centreX, y - centreY]);
};
