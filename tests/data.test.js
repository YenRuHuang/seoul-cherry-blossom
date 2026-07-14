// tests/data.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { SPOTS, spotInCategory } = require("../data.js");
const { parseBloomMonths } = require("../utils.js");

const REGION_BOUNDS = {
  seoul: { latMin: 37.3, latMax: 37.7, lngMin: 126.7, lngMax: 127.3 },
  jeju: { latMin: 33.1, latMax: 33.6, lngMin: 126.1, lngMax: 127.0 },
  busan: { latMin: 35.0, latMax: 35.4, lngMin: 128.5, lngMax: 129.3 },
};

test("每筆 spot 有唯一 id", () => {
  const ids = SPOTS.map((s) => s.id);
  assert.ok(ids.every((id) => typeof id === "string" && id.length > 0), "有 spot 缺 id");
  assert.strictEqual(new Set(ids).size, ids.length, "id 重複");
});
test("region 合法且座標落在該區域範圍內", () => {
  SPOTS.forEach((s) => {
    const b = REGION_BOUNDS[s.region];
    assert.ok(b, s.id + " region 不合法: " + s.region);
    assert.ok(s.lat >= b.latMin && s.lat <= b.latMax, s.id + " lat 超出 " + s.region + " 範圍: " + s.lat);
    assert.ok(s.lng >= b.lngMin && s.lng <= b.lngMax, s.id + " lng 超出 " + s.region + " 範圍: " + s.lng);
  });
});
test("每筆 bloom 都能解析出至少一個月份", () => {
  SPOTS.forEach((s) => {
    assert.ok(parseBloomMonths(s.bloom).length > 0, s.id + " bloom 無法解析: " + s.bloom);
  });
});
test("必填欄位齊全", () => {
  SPOTS.forEach((s) => {
    ["name", "nameKr", "district", "flowers", "bloom", "type", "subway"].forEach((k) => {
      assert.ok(s[k] !== undefined && s[k] !== "", s.id + " 缺 " + k);
    });
    assert.ok(Array.isArray(s.flowers) && s.flowers.length > 0, s.id + " flowers 空");
  });
});
test("spotInCategory: multi-flower spot matches every category its flowers cover", () => {
  const roksan = SPOTS.find(s => s.id === "jeju-06"); // 鹿山路 櫻花+油菜花
  assert.ok(roksan, "jeju-06 exists");
  assert.ok(spotInCategory(roksan, "cherry"), "matches cherry");
  assert.ok(spotInCategory(roksan, "rapeseed"), "matches rapeseed");
  assert.ok(!spotInCategory(roksan, "camellia"), "does not match camellia");
});
test("spotInCategory: single-cherry spot matches only cherry", () => {
  const cherryOnly = SPOTS.find(s => s.region === "seoul" && s.flowers.length === 1 && s.flowers[0] === "櫻花");
  assert.ok(cherryOnly, "a cherry-only seoul spot exists");
  assert.ok(spotInCategory(cherryOnly, "cherry"));
  assert.ok(!spotInCategory(cherryOnly, "rapeseed"));
});
