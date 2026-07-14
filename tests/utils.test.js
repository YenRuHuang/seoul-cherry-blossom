// tests/utils.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { parseBloomMonths, migrateFaves } = require("../utils.js");

test("一般區間：4月中～6月初 → [4,5,6]", () => {
  assert.deepStrictEqual(parseBloomMonths("4月中～6月初"), [4, 5, 6]);
});
test("同月頭尾：4月初～4月末 → [4]", () => {
  assert.deepStrictEqual(parseBloomMonths("4月初～4月末"), [4]);
});
test("跨年：11月末～3月初 → [11,12,1,2,3]", () => {
  assert.deepStrictEqual(parseBloomMonths("11月末～3月初"), [11, 12, 1, 2, 3]);
});
test("單月：7月 → [7]", () => {
  assert.deepStrictEqual(parseBloomMonths("7月"), [7]);
});
test("無法解析 → []", () => {
  assert.deepStrictEqual(parseBloomMonths("全年"), []);
});
test("migrateFaves：nameKr 對回第一筆命中的 id、去重、對不到的丟棄", () => {
  const spots = [
    { id: "seoul-01", nameKr: "안양천 제방" },
    { id: "seoul-02", nameKr: "안양천 제방" },
    { id: "seoul-03", nameKr: "삼청공원" },
  ];
  assert.deepStrictEqual(
    migrateFaves(["안양천 제방", "삼청공원", "不存在", "안양천 제방"], spots),
    ["seoul-01", "seoul-03"]
  );
});
