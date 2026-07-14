"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { parseBloomMonths, migrateFaves } = require("../utils.js");

test("일반 구간: 4월중~6월초 -> [4,5,6]", () => {
  assert.deepStrictEqual(parseBloomMonths("4월중~6월초"), [4, 5, 6]);
});
test("동월 두말: 4월초~4월말 -> [4]", () => {
  assert.deepStrictEqual(parseBloomMonths("4월초~4월말"), [4]);
});
test("횡연: 11월말~3월초 -> [11,12,1,2,3]", () => {
  assert.deepStrictEqual(parseBloomMonths("11월말~3월초"), [11, 12, 1, 2, 3]);
});
test("단월: 7월 -> [7]", () => {
  assert.deepStrictEqual(parseBloomMonths("7월"), [7]);
});
test("파싱 불가 -> []", () => {
  assert.deepStrictEqual(parseBloomMonths("전년"), []);
});
test("migrateFaves: nameKr 첫 hit으로 돌려보냄, 중복 제거, 대응 불가 버림", () => {
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
