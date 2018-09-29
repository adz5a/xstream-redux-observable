import { fold } from "./extra";
import xs from "xstream";

test("fold", async () => {
  expect.assertions(1);
  const stream$ = xs.of(1, 2, 3);  
  const add = (x, y) => x + y;
  const res = await fold(stream$, add, 0);
  expect(res).toBe(6);
});
