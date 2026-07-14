# 韓國花季地圖（濟州＋釜山＋月份切換）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把「首爾賞櫻地圖 2026」擴充為三區域（首爾/濟州/釜山）、全年花季、可切月份看預估花期的「韓國花季地圖」。

**Architecture:** 純靜態站不變（無框架、無 build step）。新增 `utils.js` 放可測試的純函式（花期解析、收藏 migration），`data.js` 每筆加 `id`/`region`，`app.js` 的 identity 從 `nameKr` 全面改 `id`（根治撞名 bug）。UI 加區域頁籤與月份 chips，兩者與既有花種/搜尋/收藏篩選 AND 疊加。

**Tech Stack:** Vanilla JS (ES5 風格，與現有 code 一致)、Leaflet 1.9.4、Node ≥18 內建 `node --test`（僅測試用，不進 runtime）。

## Global Constraints

- Spec 正本：`docs/superpowers/specs/2026-07-14-korea-flower-map-design.md`，衝突時以 spec 為準
- 不新增任何 runtime 依賴、不引入 build step、不加 package.json（測試用 `node --test tests/` 直跑）
- JS 風格跟現有 app.js 一致：ES5 `var`/function、IIFE、`textContent` 組 DOM（禁 innerHTML 塞資料）
- UI 文案繁體中文；commit 標題 ASCII-only（Conventional Commits）
- 花期一律寫「典型區間」不綁年份（如 `"3月末～4月初"`）；月份預估旁必附「預估花期，實際依天氣而定」
- 替換既有檔案（og-image.png）須保留原件（rename `_舊首爾版` 後綴），1 行可回滾
- 最後部署走 7 層 SOP；push main 會自動觸發 CF Pages 部署，**push 前必須取得 user 確認**

---

### Task 1: utils.js — 花期解析純函式（TDD）

**Files:**
- Create: `utils.js`
- Test: `tests/utils.test.js`

**Interfaces:**
- Produces: `FlowerUtils.parseBloomMonths(bloom: string) → number[]`（browser global `FlowerUtils`；Node 端 `require("../utils.js")`）
- Produces: `FlowerUtils.migrateFaves(oldNameKrList: string[], spots: {id,nameKr}[]) → string[]`（Task 3 使用）

- [ ] **Step 1: 寫失敗測試**

```js
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
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `node --test tests/`
Expected: FAIL（`Cannot find module '../utils.js'`）

- [ ] **Step 3: 最小實作**

```js
// utils.js — 共用純函式（browser global FlowerUtils + Node module.exports 供測試）
(function (root) {
  "use strict";

  // "4月中～6月初" → [4,5,6]；"11月末～3月初" → [11,12,1,2,3]（跨年）；解析不到 → []
  function parseBloomMonths(bloom) {
    var nums = [];
    var re = /(\d{1,2})月/g;
    var m;
    while ((m = re.exec(bloom)) !== null) nums.push(parseInt(m[1], 10));
    if (nums.length === 0) return [];
    var start = nums[0];
    var end = nums[nums.length - 1];
    var months = [start];
    var cur = start;
    while (cur !== end && months.length < 12) {
      cur = (cur % 12) + 1;
      months.push(cur);
    }
    return months;
  }

  // 舊收藏（nameKr 陣列）→ 新收藏（id 陣列）：撞名取第一筆、去重、對不到丟棄
  function migrateFaves(oldNameKrList, spots) {
    var ids = [];
    oldNameKrList.forEach(function (nameKr) {
      for (var i = 0; i < spots.length; i++) {
        if (spots[i].nameKr === nameKr) {
          if (ids.indexOf(spots[i].id) === -1) ids.push(spots[i].id);
          break;
        }
      }
    });
    return ids;
  }

  var api = { parseBloomMonths: parseBloomMonths, migrateFaves: migrateFaves };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.FlowerUtils = api;
})(typeof self !== "undefined" ? self : globalThis);
```

- [ ] **Step 4: 跑測試確認通過**

Run: `node --test tests/`
Expected: 6 pass, 0 fail

- [ ] **Step 5: Commit**

```bash
git add utils.js tests/utils.test.js
git commit -m "feat: add bloom month parser and fave migration utils with tests"
```

---

### Task 2: data.js — 全部景點加 id/region + 資料驗證測試

**Files:**
- Modify: `data.js`（72 筆 spot + 檔尾）
- Test: `tests/data.test.js`

**Interfaces:**
- Produces: 每筆 spot 多 `id`（唯一，`seoul-NN` 零填充流水號）與 `region: "seoul"`；`data.js` 檔尾輸出 Node interop
- Consumes: `FlowerUtils.parseBloomMonths`（Task 1）

- [ ] **Step 1: data.js 檔尾加 Node interop**（放在 `getTypeEmoji` 之後、檔案最末）

```js
// Node 測試用 interop（browser 端 typeof module === "undefined"，無作用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SPOTS: SPOTS, FLOWER_CATEGORIES: FLOWER_CATEGORIES, getFlowerCategory: getFlowerCategory };
}
```

- [ ] **Step 2: 寫失敗測試**

```js
// tests/data.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { SPOTS } = require("../data.js");
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
```

- [ ] **Step 3: 跑測試確認失敗**

Run: `node --test tests/`
Expected: data.test.js 的 id/region 測試 FAIL（現有 spot 沒有 id/region）

- [ ] **Step 4: 機械化補 id/region**（一次到位，之後 id 永久凍結不重排）

```bash
awk 'BEGIN{n=0} { if ($0 ~ /^  \{ name:/) { n++; sub(/^  \{ name:/, sprintf("  { id:\"seoul-%02d\", region:\"seoul\", name:", n)) } print }' data.js > data.js.tmp && mv data.js.tmp data.js
```

然後人工抽查頭尾各 2 筆格式正確（`{ id:"seoul-01", region:"seoul", name:"三清公園", ...`）。

- [ ] **Step 5: 跑測試確認通過**

Run: `node --test tests/`
Expected: 全 pass（首爾 72 筆座標本來就該落在 seoul bounds；若有異常座標，逐筆查證後修資料而非放寬 bounds）

- [ ] **Step 6: Commit**

```bash
git add data.js tests/data.test.js
git commit -m "feat: add unique id and region fields to all spots with data tests"
```

---

### Task 3: app.js — identity 全面改 id + 收藏 migration（根治撞名 bug）

**Files:**
- Modify: `app.js:6-17`（收藏區）、`app.js:125`、`app.js:137,145,163`、`app.js:205,225`
- Modify: `index.html:90-91`（script 引入 utils.js）

**Interfaces:**
- Consumes: `spot.id`（Task 2）、`FlowerUtils.migrateFaves`（Task 1）
- Produces: `toggleFave(id)` / `isFaved(id)` / `spotMarkers[spot.id]`；localStorage 新 key `korea_flower_faves`

- [ ] **Step 1: index.html 在 data.js 之前引入 utils.js**

```html
  <script src="utils.js?v=1"></script>
  <script src="data.js?v=3"></script>
  <script src="app.js?v=3"></script>
```

- [ ] **Step 2: 改寫 app.js 收藏區（含一次性 migration）**

把 `app.js:5-17` 整段換成：

```js
  // ── 收藏功能 (localStorage，key 存 spot.id) ──
  var FAVE_KEY = "korea_flower_faves";
  var OLD_FAVE_KEY = "seoul_cherry_faves"; // 舊版存 nameKr，一次性 migrate
  (function migrateOldFaves() {
    try {
      if (localStorage.getItem(FAVE_KEY) !== null) return;
      var old = JSON.parse(localStorage.getItem(OLD_FAVE_KEY));
      if (!Array.isArray(old)) return;
      localStorage.setItem(FAVE_KEY, JSON.stringify(FlowerUtils.migrateFaves(old, SPOTS)));
      localStorage.removeItem(OLD_FAVE_KEY);
    } catch (e) { /* migration 失敗不阻斷啟動，舊收藏放棄 */ }
  })();
  function getFaves() {
    try {
      var v = JSON.parse(localStorage.getItem(FAVE_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function toggleFave(id) {
    var faves = getFaves();
    var idx = faves.indexOf(id);
    if (idx === -1) faves.push(id); else faves.splice(idx, 1);
    localStorage.setItem(FAVE_KEY, JSON.stringify(faves));
    updateView();
  }
  function isFaved(id) { return getFaves().indexOf(id) !== -1; }
```

- [ ] **Step 3: identity 換成 id（5 處）**

- `app.js:125`：`spotMarkers[spot.nameKr] = marker;` → `spotMarkers[spot.id] = marker;`
- `app.js:137`：`var faved = isFaved(spot.nameKr);` → `var faved = isFaved(spot.id);`
- `app.js:145`：`var m = spotMarkers[spot.nameKr];` → `var m = spotMarkers[spot.id];`
- `app.js:163`：`toggleFave(spot.nameKr);` → `toggleFave(spot.id);`
- `app.js:205`：`matchFilter = isFaved(spot.nameKr);` → `matchFilter = isFaved(spot.id);`
- `app.js:225`：`isFaved(a.nameKr)?1:0, fb = isFaved(b.nameKr)?1:0` → `isFaved(a.id)?1:0, fb = isFaved(b.id)?1:0`

改完 `grep -n "nameKr" app.js` 只准剩顯示用途（popup/卡片的 `.textContent = spot.nameKr`、搜尋比對、navNaver）。

- [ ] **Step 4: 手動驗證（Playwright 或本機瀏覽器，`python3 -m http.server 8788`）**

1. 撞名回歸：收藏「安養川堤防」（陽川）→ 九老/永登浦兩筆紅心必須不亮；點三張卡片 popup 各落自己座標。
2. Migration：DevTools 先塞 `localStorage.setItem("seoul_cherry_faves", JSON.stringify(["삼청공원"]))` 並清掉新 key → 重整 → 三清公園有紅心、舊 key 消失。

- [ ] **Step 5: Commit**

```bash
git add app.js index.html
git commit -m "fix: switch favorite/marker identity from nameKr to unique id with migration"
```

---

### Task 4: 新花種分類 + marker 樣式

**Files:**
- Modify: `data.js`（`FLOWER_CATEGORIES`）
- Modify: `app.js:59-61`（`getMarkerClass`）
- Modify: `style.css`（marker 色票，附在現有 `.cherry-marker-*` 區塊後）
- Modify: `index.html:40-49`（filter 按鈕）

**Interfaces:**
- Produces: category keys `hydrangea` / `camellia` / `buckwheat` / `silvergrass` / `plum`（Task 5/6 的資料靠這些 keywords 歸類）

- [ ] **Step 1: FLOWER_CATEGORIES 加五類**（`other` 之前插入）

```js
  hydrangea:  { label:"繡球花", emoji:"💠", keywords:["繡球花"] },
  camellia:   { label:"山茶花", emoji:"🏵️", keywords:["山茶花","冬柏"] },
  buckwheat:  { label:"蕎麥花", emoji:"🤍", keywords:["蕎麥花"] },
  silvergrass:{ label:"芒草",   emoji:"🌾", keywords:["芒草","紫芒","粉黛亂子草"] },
  plum:       { label:"梅花",   emoji:"🌸", keywords:["梅花"] },
```

同步 `getMarkerEmoji`（data.js:147-149）加同樣五個 emoji 對映。

- [ ] **Step 2: getMarkerClass（app.js:60）與 style.css 加色票**

```js
    return { cherry:"cherry-marker-cherry", forsythia:"cherry-marker-forsythia", azalea:"cherry-marker-azalea",
      tulip:"cherry-marker-tulip", rapeseed:"cherry-marker-forsythia", hydrangea:"cherry-marker-hydrangea",
      camellia:"cherry-marker-camellia", buckwheat:"cherry-marker-other", silvergrass:"cherry-marker-silvergrass",
      plum:"cherry-marker-cherry", other:"cherry-marker-other" }[cat] || "cherry-marker-other";
```

style.css（接在現有 marker 色票後，沿用同結構：背景淡色 + 邊框）：

```css
.cherry-marker-hydrangea { background: #e3ecfa; border-color: #7c9fe0; }
.cherry-marker-camellia { background: #f6dfe2; border-color: #c2554f; }
.cherry-marker-silvergrass { background: #f2ecdc; border-color: #b09a5e; }
```

（實作時先看現有 `.cherry-marker-cherry` 的實際屬性結構，照抄同格式，只換色值。）

- [ ] **Step 3: index.html filter 按鈕列加五顆**（`other` 之前）

```html
      <button class="filter-btn" data-filter="hydrangea">繡球花</button>
      <button class="filter-btn" data-filter="camellia">山茶花</button>
      <button class="filter-btn" data-filter="buckwheat">蕎麥花</button>
      <button class="filter-btn" data-filter="silvergrass">芒草</button>
      <button class="filter-btn" data-filter="plum">梅花</button>
```

- [ ] **Step 4: 驗證**：`node --test tests/` 全 pass；本機開頁 → 新按鈕出現、count 為 0（資料還沒進）、無 console error。

- [ ] **Step 5: Commit**

```bash
git add data.js app.js style.css index.html
git commit -m "feat: add five year-round flower categories with marker styles"
```

---

### Task 5: 區域頁籤（首爾/濟州/釜山）

**Files:**
- Modify: `index.html:36-50`（toolbar）
- Modify: `app.js`（`currentRegion` 狀態、`getFilteredSpots`、`updateFilterCounts`、事件）
- Modify: `style.css`（`.region-bar` 樣式）

**Interfaces:**
- Produces: `currentRegion`（`"seoul" | "jeju" | "busan"`，預設 `"seoul"`）；`REGION_META` 常數（Task 6 月份 chips 也讀）

- [ ] **Step 1: index.html toolbar 最上方加區域列**（`search-wrap` 之前）

```html
    <div class="region-bar" id="regionBar">
      <button class="region-btn active" data-region="seoul">首爾</button>
      <button class="region-btn" data-region="jeju">濟州島</button>
      <button class="region-btn" data-region="busan">釜山</button>
    </div>
```

- [ ] **Step 2: app.js 加狀態與常數**（`currentFilter` 宣告旁，app.js:55）

```js
  var currentRegion = "seoul";
  var REGION_META = {
    seoul: { label: "首爾", center: [37.5665, 126.978], zoom: 11 },
    jeju: { label: "濟州島", center: [33.38, 126.55], zoom: 10 },
    busan: { label: "釜山", center: [35.16, 129.06], zoom: 11 },
  };
```

- [ ] **Step 3: getFilteredSpots 第一道加 region 過濾**（app.js:202 `SPOTS.filter` 回呼開頭）

```js
      if (spot.region !== currentRegion) return false;
```

- [ ] **Step 4: updateFilterCounts 改成只算當前區域**（app.js:288-292）

```js
    var regionSpots = SPOTS.filter(function (s) { return s.region === currentRegion; });
    var counts = { all: regionSpots.length };
    regionSpots.forEach(function (s) {
      var cat = getFlowerCategory(s.flowers);
      counts[cat] = (counts[cat] || 0) + 1;
    });
```

並在 region 切換時重呼叫（見 Step 5）。注意現有實作對 `counts[f] === undefined` 的按鈕不動 — 改成 undefined 時顯示 0，避免跨區殘留舊數字：`span.textContent = counts[f] || 0;`（連同拿掉 `if (counts[f] !== undefined)` 判斷）。

- [ ] **Step 5: 區域切換事件**（跟 filterBar 事件並列）

```js
  document.getElementById("regionBar").addEventListener("click", function (e) {
    var btn = e.target.closest(".region-btn");
    if (!btn) return;
    var region = btn.getAttribute("data-region");
    if (region === currentRegion) return;
    currentRegion = region;
    var btns = document.querySelectorAll(".region-btn");
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    btn.classList.add("active");
    var meta = REGION_META[region];
    map.flyTo(meta.center, meta.zoom, { duration: 1.2 });
    updateFilterCounts();
    updateView();
  });
```

- [ ] **Step 6: style.css `.region-bar`**（沿用 `.filter-bar`/`.filter-btn` 的視覺語彙，尺寸大一號、active 用主色實底 — 實作時參照現有 `.filter-btn.active` 的色值）

```css
.region-bar { display: flex; gap: 8px; margin-bottom: 10px; }
.region-btn { font-family: inherit; font-size: 15px; font-weight: 600; padding: 8px 18px; border: 1px solid var(--border, #e5ddd5); border-radius: 999px; background: #fff; cursor: pointer; }
.region-btn.active { background: var(--accent, #c2554f); border-color: var(--accent, #c2554f); color: #fff; }
```

（`--border`/`--accent` 若 style.css 已有既定變數名，改用實際變數；沒有就用現值硬編碼，跟現有檔案風格一致。）

- [ ] **Step 7: 驗證**：本機開頁 → 切濟州 → 地圖飛往濟州、列表空（資料未進）、counts 全 0 不殘留首爾數字；切回首爾一切如舊。無 console error。

- [ ] **Step 8: Commit**

```bash
git add index.html app.js style.css
git commit -m "feat: add region tabs for seoul/jeju/busan with per-region counts"
```

---

### Task 6: 月份切換列（預估花期過濾）

**Files:**
- Modify: `index.html`（filter-bar 下方）
- Modify: `app.js`（`currentMonth` 狀態、預計算 `_months`、過濾、counts、空狀態）
- Modify: `style.css`（`.month-bar` + `.empty-state`）

**Interfaces:**
- Consumes: `FlowerUtils.parseBloomMonths`、`currentRegion`
- Produces: `currentMonth`（0 = 全年，1–12）

- [ ] **Step 1: index.html filter-bar 之後加月份列**

```html
    <div class="month-bar" id="monthBar">
      <button class="month-btn active" data-month="0">全年</button>
      <button class="month-btn" data-month="1">1月</button>
      <button class="month-btn" data-month="2">2月</button>
      <button class="month-btn" data-month="3">3月</button>
      <button class="month-btn" data-month="4">4月</button>
      <button class="month-btn" data-month="5">5月</button>
      <button class="month-btn" data-month="6">6月</button>
      <button class="month-btn" data-month="7">7月</button>
      <button class="month-btn" data-month="8">8月</button>
      <button class="month-btn" data-month="9">9月</button>
      <button class="month-btn" data-month="10">10月</button>
      <button class="month-btn" data-month="11">11月</button>
      <button class="month-btn" data-month="12">12月</button>
      <span class="month-hint">預估花期，實際依天氣而定</span>
    </div>
```

- [ ] **Step 2: app.js 啟動時預計算 + 狀態**

`currentRegion` 宣告旁加 `var currentMonth = 0;`；「── 啟動 ──」區（app.js:308）前加：

```js
  // 預計算每筆 spot 的預估開花月份（避免每次 filter 重解析）
  SPOTS.forEach(function (s) { s._months = FlowerUtils.parseBloomMonths(s.bloom); });
```

- [ ] **Step 3: getFilteredSpots 加月份過濾**（region 過濾之後）

```js
      if (currentMonth !== 0 && spot._months.indexOf(currentMonth) === -1) return false;
```

- [ ] **Step 4: 月份 chips 數字 + 事件**

```js
  function updateMonthCounts() {
    var btns = document.querySelectorAll(".month-btn");
    for (var i = 0; i < btns.length; i++) {
      var m = parseInt(btns[i].getAttribute("data-month"), 10);
      if (m === 0) continue;
      var n = SPOTS.filter(function (s) {
        return s.region === currentRegion && s._months.indexOf(m) !== -1;
      }).length;
      var base = btns[i].textContent.replace(/\s*\d+$/, "");
      var span = document.createElement("span");
      span.className = "count";
      span.textContent = n;
      btns[i].textContent = base + " ";
      btns[i].appendChild(span);
    }
  }
  document.getElementById("monthBar").addEventListener("click", function (e) {
    var btn = e.target.closest(".month-btn");
    if (!btn) return;
    var btns = document.querySelectorAll(".month-btn");
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    btn.classList.add("active");
    currentMonth = parseInt(btn.getAttribute("data-month"), 10);
    updateView();
  });
```

區域切換事件（Task 5 Step 5）裡 `updateFilterCounts()` 後面補一行 `updateMonthCounts();`；啟動區 `updateFilterCounts();` 後面也補 `updateMonthCounts();`。

- [ ] **Step 5: 空狀態**（`renderSpotList` 迴圈前，app.js:132 之後）

```js
    if (spots.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      var regionLabel = REGION_META[currentRegion].label;
      empty.textContent = currentMonth === 0
        ? "沒有符合條件的景點，試試清除搜尋或篩選"
        : currentMonth + "月的" + regionLabel + "沒有預估花季，試試其他區域或月份";
      list.appendChild(empty);
    }
```

- [ ] **Step 6: style.css**

```css
.month-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 8px; }
.month-btn { font-family: inherit; font-size: 13px; padding: 5px 10px; border: 1px solid var(--border, #e5ddd5); border-radius: 999px; background: #fff; cursor: pointer; }
.month-btn.active { background: var(--accent, #c2554f); border-color: var(--accent, #c2554f); color: #fff; }
.month-btn .count { opacity: 0.65; font-size: 11px; margin-left: 2px; }
.month-hint { font-size: 12px; color: #9a8f85; margin-left: 4px; }
.empty-state { padding: 40px 16px; text-align: center; color: #9a8f85; font-size: 15px; grid-column: 1 / -1; }
```

（`.spot-list` 若是 grid，`grid-column: 1 / -1` 讓空狀態滿版；實作時確認 `.spot-list` 的 display 值。）

- [ ] **Step 7: 驗證**：本機切「4月」→ 首爾多數景點在列；切「7月」→ 首爾空狀態文案出現（不是空白）；chips 有數字；`node --test tests/` 全 pass。

- [ ] **Step 8: Commit**

```bash
git add index.html app.js style.css
git commit -m "feat: add month switcher with estimated bloom filter and empty state"
```

---

### Task 7: 濟州島景點資料（~24 筆）

**Files:**
- Modify: `data.js`（`];` 之前 append 濟州區塊）

**Interfaces:**
- Consumes: Task 4 的花種 keywords（繡球花/山茶花/冬柏/蕎麥花/芒草/粉黛亂子草/梅花）
- Produces: `id: "jeju-01" … "jeju-24"`（凍結不重排）

- [ ] **Step 1: 座標與花期逐筆查證**

下方資料的座標是初值。實作時逐筆用 WebSearch/Firecrawl 對 Visit Jeju（visitjeju.net）、韓國觀光公社（大韓民國구석구석）、近兩年遊記交叉查證：(a) 座標誤差 < ~300m；(b) 典型花期月份；(c) 韓文名正確（navNaver 靠它搜尋）。查證後直接改資料再進 Step 2。

- [ ] **Step 2: append 濟州資料**（`];` 之前；`subway` 欄放交通方式）

```js
  // === 濟州市（春） ===
  { id:"jeju-01", region:"jeju", name:"★ 典農路櫻花街", nameKr:"전농로 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.2, type:"街道", lat:33.5065, lng:126.5210, highlight:true, note:"濟州王櫻花祭主場地，晚上有夜櫻點燈", subway:"濟州市外巴士站步行 10 分", subwayKr:"제주시외버스터미널", pop:"hot" },
  { id:"jeju-02", region:"jeju", name:"濟州大學櫻花路", nameKr:"제주대학로 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.5, type:"街道", lat:33.4560, lng:126.5620, note:"王櫻花自生地，樹齡高花冠大", subway:"公車 355·356 濟州大學下車", subwayKr:"제주대학교" },
  { id:"jeju-03", region:"jeju", name:"新山公園", nameKr:"신산공원", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"公園", lat:33.5060, lng:126.5330, subway:"公車 325·326 文藝會館下車", subwayKr:"제주문예회관" },
  { id:"jeju-04", region:"jeju", name:"漢拏樹木園", nameKr:"한라수목원", district:"濟州市", districtKr:"제주시", flowers:["櫻花","迎春花"], bloom:"3月末～4月中", length:2.0, type:"公園", lat:33.4690, lng:126.4940, subway:"公車 331·332 漢拏樹木園下車", subwayKr:"한라수목원" },
  { id:"jeju-05", region:"jeju", name:"涯月長田里櫻花路", nameKr:"애월읍 장전리 벚꽃길", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:33.4570, lng:126.3560, note:"在地人賞櫻路線，遊客較少", subway:"建議自駕", subwayKr:"장전리", pop:"hidden" },
  { id:"jeju-06", region:"jeju", name:"★ 鹿山路", nameKr:"녹산로", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["櫻花","油菜花"], bloom:"3月末～4月中", length:10.0, type:"街道", lat:33.4110, lng:126.6690, highlight:true, note:"韓國最美道路之一！櫻花＋油菜花同框 10 公里", subway:"建議自駕（鄰近旌義航空館）", subwayKr:"녹산로", pop:"hot" },
  { id:"jeju-07", region:"jeju", name:"★ 山房山油菜花田", nameKr:"산방산 유채꽃밭", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["油菜花"], bloom:"2月末～4月中", length:0.5, type:"綠地", lat:33.2370, lng:126.3130, highlight:true, note:"山房山為背景的油菜花海，付費入場拍照", subway:"公車 202 山房山下車", subwayKr:"산방산", pop:"hot" },
  { id:"jeju-08", region:"jeju", name:"城山日出峰油菜花", nameKr:"성산일출봉 유채꽃", district:"西歸浦市城山邑", districtKr:"서귀포시 성산읍", flowers:["油菜花"], bloom:"3月初～4月中", length:0.8, type:"綠地", lat:33.4580, lng:126.9370, note:"世界自然遺產日出峰山腳", subway:"公車 201 城山日出峰入口", subwayKr:"성산일출봉" },
  { id:"jeju-09", region:"jeju", name:"咸德犀牛峰", nameKr:"함덕 서우봉", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["油菜花"], bloom:"3月初～4月末", length:1.0, type:"綠地", lat:33.5430, lng:126.6720, note:"翡翠色咸德海灘旁的油菜花坡", subway:"公車 201 咸德海水浴場", subwayKr:"함덕해수욕장" },
  { id:"jeju-10", region:"jeju", name:"三姓穴", nameKr:"삼성혈", district:"濟州市", districtKr:"제주시", flowers:["櫻花","梅花"], bloom:"2月末～4月初", length:0.5, type:"公園", lat:33.5040, lng:126.5290, subway:"公車 332 三姓穴下車", subwayKr:"삼성혈" },
  // === 濟州（夏：繡球花） ===
  { id:"jeju-11", region:"jeju", name:"★ 終達里繡球花路", nameKr:"종달리 수국길", district:"濟州市舊左邑", districtKr:"제주시 구좌읍", flowers:["繡球花"], bloom:"6月初～7月初", length:2.0, type:"街道", lat:33.5030, lng:126.9100, highlight:true, note:"海岸公路旁綿延繡球花牆", subway:"建議自駕", subwayKr:"종달리", pop:"hot" },
  { id:"jeju-12", region:"jeju", name:"婚姻池繡球花", nameKr:"혼인지 수국", district:"西歸浦市城山邑", districtKr:"서귀포시 성산읍", flowers:["繡球花"], bloom:"6月初～7月初", length:0.6, type:"公園", lat:33.4360, lng:126.8940, note:"傳統婚禮聖地，免費入場", subway:"公車 201 轉 722-2", subwayKr:"혼인지" },
  { id:"jeju-13", region:"jeju", name:"馬諾爾莊園", nameKr:"마노르블랑", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["繡球花","粉黛亂子草"], bloom:"6月初～10月末", length:0.3, type:"公園", lat:33.2560, lng:126.3490, note:"咖啡園庭院，夏繡球秋粉黛", subway:"建議自駕", subwayKr:"마노르블랑" },
  { id:"jeju-14", region:"jeju", name:"安德面繡球花路", nameKr:"안덕면 수국길", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["繡球花"], bloom:"6月初～7月初", length:1.5, type:"街道", lat:33.2550, lng:126.3300, note:"病院路兩側繡球花道", subway:"建議自駕", subwayKr:"안덕면 수국길", pop:"hidden" },
  // === 濟州（秋） ===
  { id:"jeju-15", region:"jeju", name:"吾羅洞蕎麥花田", nameKr:"오라동 메밀밭", district:"濟州市", districtKr:"제주시", flowers:["蕎麥花"], bloom:"9月初～10月中", length:1.0, type:"綠地", lat:33.4470, lng:126.4950, note:"漢拏山山腰白色花海（春秋兩季）", subway:"建議自駕", subwayKr:"오라동 메밀밭" },
  { id:"jeju-16", region:"jeju", name:"★ 新星岳芒草", nameKr:"새별오름 억새", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["芒草"], bloom:"10月初～11月末", length:1.5, type:"綠地", lat:33.3620, lng:126.3590, highlight:true, note:"夕陽時整座寄生火山被芒草染金", subway:"建議自駕", subwayKr:"새별오름", pop:"hot" },
  { id:"jeju-17", region:"jeju", name:"山君不離", nameKr:"산굼부리", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["芒草"], bloom:"10月初～11月末", length:1.2, type:"公園", lat:33.4340, lng:126.6850, note:"火山口環繞芒草原，付費入場", subway:"公車 212·222", subwayKr:"산굼부리" },
  { id:"jeju-18", region:"jeju", name:"休愛里自然生活公園", nameKr:"휴애리 자연생활공원", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["粉黛亂子草","梅花","繡球花"], bloom:"9月末～11月中", length:0.8, type:"公園", lat:33.2790, lng:126.6280, note:"四季花園：2-3月梅花、6月繡球、秋粉黛", subway:"公車 231", subwayKr:"휴애리" },
  // === 濟州（冬：山茶花） ===
  { id:"jeju-19", region:"jeju", name:"★ 山茶花之丘", nameKr:"카멜리아힐", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["山茶花","繡球花"], bloom:"11月末～3月初", length:1.0, type:"公園", lat:33.2890, lng:126.3690, highlight:true, note:"6 萬坪山茶花庭園，冬季必訪", subway:"公車 752-2 上倉里下車", subwayKr:"카멜리아힐", pop:"hot" },
  { id:"jeju-20", region:"jeju", name:"為美里山茶花群落", nameKr:"위미 동백나무 군락지", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["山茶花"], bloom:"12月初～2月末", length:0.5, type:"綠地", lat:33.2740, lng:126.6660, note:"百年山茶樹古群落", subway:"公車 231 為美里下車", subwayKr:"위미리", pop:"hidden" },
  { id:"jeju-21", region:"jeju", name:"山茶花森林", nameKr:"동백포레스트", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["山茶花"], bloom:"11月末～2月末", length:0.4, type:"公園", lat:33.2900, lng:126.6520, note:"圓形山茶樹網美拍照點", subway:"建議自駕", subwayKr:"동백포레스트" },
  { id:"jeju-22", region:"jeju", name:"石牆花路（吾羅洞櫻花）", nameKr:"오라동 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:33.4870, lng:126.5100, subway:"公車 240", subwayKr:"오라동", pop:"hidden" },
  { id:"jeju-23", region:"jeju", name:"廣令梅花村", nameKr:"광령리 매화", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["梅花"], bloom:"2月初～3月初", length:0.5, type:"綠地", lat:33.4650, lng:126.4340, subway:"建議自駕", subwayKr:"광령리" },
  { id:"jeju-24", region:"jeju", name:"杭波頭里海岸油菜花", nameKr:"항파두리 유채꽃", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["油菜花"], bloom:"3月初～4月中", length:0.7, type:"綠地", lat:33.4520, lng:126.4110, subway:"公車 291", subwayKr:"항파두리" },
```

- [ ] **Step 3: 跑資料測試**

Run: `node --test tests/`
Expected: 全 pass（唯一 id、jeju bounds、bloom 可解析、必填齊全）

- [ ] **Step 4: L3 視覺核對**：本機開頁切濟州 → 每顆 marker 落點與地理常識比對（山房山在西南、城山在東、市區在北）；點 3 筆 navNaver 連結確認 Naver 搜得到該韓文名。

- [ ] **Step 5: Commit**

```bash
git add data.js
git commit -m "feat: add 24 jeju year-round flower spots"
```

---

### Task 8: 釜山景點資料（~15 筆，含鎮海近郊）

**Files:**
- Modify: `data.js`（濟州區塊後 append）

**Interfaces:**
- Produces: `id: "busan-01" … "busan-15"`

- [ ] **Step 1: 座標與花期逐筆查證**（方法同 Task 7，來源換 Visit Busan / 韓國觀光公社；鎮海部分查 진해군항제 官方資訊）

- [ ] **Step 2: append 釜山資料**

```js
  // === 釜山（春） ===
  { id:"busan-01", region:"busan", name:"★ 溫泉川櫻花路", nameKr:"온천천 벚꽃길", district:"東萊區", districtKr:"동래구", flowers:["櫻花"], bloom:"3月末～4月初", length:3.0, type:"河邊", lat:35.2100, lng:129.0850, highlight:true, note:"市區最長櫻花河岸，地鐵直達", subway:"溫泉場站 1號線", subwayKr:"온천장역 1호선", pop:"hot" },
  { id:"busan-02", region:"busan", name:"南川洞櫻花街", nameKr:"남천동 벚꽃거리", district:"水營區", districtKr:"수영구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:35.1420, lng:129.1110, note:"公寓社區櫻花隧道，廣安大橋旁", subway:"金蓮山站 2號線", subwayKr:"금련산역 2호선", pop:"hot" },
  { id:"busan-03", region:"busan", name:"三樂生態公園", nameKr:"삼락생태공원", district:"沙上區", districtKr:"사상구", flowers:["櫻花","油菜花"], bloom:"3月末～4月中", length:4.0, type:"河邊", lat:35.1780, lng:128.9640, note:"洛東江畔櫻花＋油菜花同框", subway:"沙上站 2號線步行 15 分", subwayKr:"사상역 2호선" },
  { id:"busan-04", region:"busan", name:"迎月嶺", nameKr:"달맞이길", district:"海雲台區", districtKr:"해운대구", flowers:["櫻花"], bloom:"3月末～4月初", length:2.2, type:"街道", lat:35.1590, lng:129.1760, note:"海雲台看海賞櫻山路", subway:"中洞站 2號線", subwayKr:"중동역 2호선" },
  { id:"busan-05", region:"busan", name:"開琴櫻花文化路", nameKr:"개금벚꽃문화길", district:"釜山鎮區", districtKr:"부산진구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.2, type:"街道", lat:35.1520, lng:129.0230, subway:"開琴站 2號線", subwayKr:"개금역 2호선", pop:"hidden" },
  { id:"busan-06", region:"busan", name:"民主公園", nameKr:"민주공원", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.8, type:"公園", lat:35.1120, lng:129.0330, note:"可俯瞰釜山港的山上公園", subway:"公車 190 民主公園下車", subwayKr:"민주공원" },
  { id:"busan-07", region:"busan", name:"★ 大渚生態公園油菜花", nameKr:"대저생태공원 유채꽃", district:"江西區", districtKr:"강서구", flowers:["油菜花"], bloom:"3月末～4月中", length:3.0, type:"河邊", lat:35.2110, lng:128.9560, highlight:true, note:"洛東江邊 76 萬坪油菜花海（油菜花節）", subway:"江西區廳站 3號線", subwayKr:"강서구청역 3호선", pop:"hot" },
  { id:"busan-08", region:"busan", name:"荒嶺山櫻花路", nameKr:"황령산 벚꽃길", district:"釜山鎮區", districtKr:"부산진구", flowers:["櫻花"], bloom:"3月末～4月初", length:2.5, type:"街道", lat:35.1560, lng:129.0900, note:"夜景名所的環山櫻花道", subway:"建議自駕或計程車", subwayKr:"황령산" },
  // === 釜山（秋冬） ===
  { id:"busan-09", region:"busan", name:"勝鶴山芒草", nameKr:"승학산 억새", district:"沙下區", districtKr:"사하구", flowers:["芒草"], bloom:"9月末～11月中", length:1.5, type:"綠地", lat:35.1110, lng:128.9820, note:"釜山最大芒草平原", subway:"當里站 1號線後登山 1hr", subwayKr:"당리역 1호선" },
  { id:"busan-10", region:"busan", name:"冬柏島", nameKr:"동백섬", district:"海雲台區", districtKr:"해운대구", flowers:["山茶花"], bloom:"12月初～3月中", length:1.0, type:"公園", lat:35.1530, lng:129.1520, note:"海雲台旁山茶花海岸步道（APEC 世峰樓）", subway:"冬柏站 2號線", subwayKr:"동백역 2호선" },
  { id:"busan-11", region:"busan", name:"UN 雕塑公園山茶花", nameKr:"유엔조각공원 동백", district:"南區", districtKr:"남구", flowers:["山茶花"], bloom:"12月初～3月初", length:0.6, type:"公園", lat:35.1270, lng:129.0980, subway:"大淵站 2號線", subwayKr:"대연역 2호선", pop:"hidden" },
  { id:"busan-12", region:"busan", name:"梵魚寺梅花", nameKr:"범어사 매화", district:"金井區", districtKr:"금정구", flowers:["梅花"], bloom:"2月末～3月末", length:0.5, type:"公園", lat:35.2840, lng:129.0680, note:"千年古剎早春梅花", subway:"梵魚寺站 1號線轉公車 90", subwayKr:"범어사역 1호선" },
  // === 鎮海（釜山近郊，行政屬昌原市） ===
  { id:"busan-13", region:"busan", name:"★ 鎮海余佐川櫻花道", nameKr:"진해 여좌천 벚꽃길", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.5, type:"河邊", lat:35.1540, lng:128.6580, highlight:true, note:"韓國最有名櫻花祭「軍港節」主場！羅曼史橋夜櫻", subway:"釜山西部巴士站搭市外巴士約 50 分", subwayKr:"여좌천", pop:"hot" },
  { id:"busan-14", region:"busan", name:"★ 鎮海慶和站櫻花路", nameKr:"진해 경화역 벚꽃길", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.8, type:"街道", lat:35.1600, lng:128.7180, highlight:true, note:"廢棄鐵道兩側 800m 櫻花隧道，經典鐵軌照", subway:"釜山西部巴士站搭市外巴士約 50 分", subwayKr:"경화역", pop:"hot" },
  { id:"busan-15", region:"busan", name:"鎮海帝皇山公園", nameKr:"진해 제황산공원", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.6, type:"公園", lat:35.1470, lng:128.6610, note:"365 階或單軌車上山俯瞰鎮海櫻花全景", subway:"鎮海市外巴士站步行 15 分", subwayKr:"제황산공원" },
```

- [ ] **Step 3: 跑資料測試**：`node --test tests/` 全 pass。

- [ ] **Step 4: L3 視覺核對**：切釜山 → 鎮海三筆在地圖西緣可見（手機 390px 若被裁掉，把 `REGION_META.busan` 改 `center:[35.16,128.95], zoom:10` 並記回 spec）；點 navNaver 抽查 3 筆。

- [ ] **Step 5: Commit**

```bash
git add data.js
git commit -m "feat: add 15 busan flower spots incl jinhae day-trip area"
```

---

### Task 9: 品牌改版（標題/OG/SEO/分享文案/og-image）

**Files:**
- Modify: `index.html:6-12, 25-27`（meta + header）
- Modify: `app.js:266`（shareText）、`app.js:1`（檔頭註解）
- Create: `og-image-source.html`（產圖用模板）
- Replace: `og-image.png`（原件 rename 保留）

- [ ] **Step 1: index.html meta 與 header**

```html
  <title>韓國花季地圖 — 首爾・濟州・釜山 全年賞花</title>
  <meta name="description" content="韓國賞花互動地圖：首爾、濟州島、釜山 110+ 花季景點，可切月份看預估花期，繁體中文介面，專為台灣旅客設計">
  <meta property="og:title" content="韓國花季地圖 — 台灣人專用繁中版">
  <meta property="og:description" content="首爾・濟州・釜山 110+ 花季景點＋月份預估花期＋Google/Naver 導航，櫻花油菜花繡球花山茶花一站看！">
```

header：

```html
        <p class="header-eyebrow">Korea in Bloom</p>
        <h1>韓國花季地圖</h1>
        <p class="subtitle">首爾・濟州・釜山 · 全年花季 · 繁體中文</p>
```

（og:url / og:image 網域不變。110+ 依最終筆數調整：72+24+15=111。）

- [ ] **Step 2: shareText（app.js:266）**

```js
  var shareText = "🌸 韓國花季地圖 — 首爾・濟州・釜山 110+ 賞花景點，切月份看預估花期，專為台灣旅客！";
```

- [ ] **Step 3: og-image 重製**：先 `git mv og-image.png og-image_舊首爾版.png`（L7 保留原件）。建 `og-image-source.html`（1200×630，沿用站內 editorial 風格：Noto Serif TC 標題「韓國花季地圖」、副標「首爾・濟州・釜山 全年花季」、暖底色 + 🌸💠🏵️ 三花意象，色票抄 style.css 現值），用 Playwright 開本機檔案截 1200×630 存成 `og-image.png`。**必用 Read tool 視覺檢查產出圖**（文字無溢出、無破版）。

- [ ] **Step 4: 驗證**：本機開頁看 header；`curl -s localhost:8788 | grep -c "韓國花季地圖"` ≥ 2；og-image.png 視覺已看過。

- [ ] **Step 5: Commit**

```bash
git add index.html app.js og-image-source.html og-image.png og-image_舊首爾版.png
git commit -m "feat: rebrand to korea flower map with new og image"
```

---

### Task 10: cache-bust + 全站驗證 + 部署（7 層 SOP）

**Files:**
- Modify: `index.html`（`style.css?v=4`、`utils.js?v=1`、`data.js?v=4`、`app.js?v=4`）

- [ ] **Step 1: cache-bust 全部 bump**（style.css / data.js / app.js → `?v=4`）

- [ ] **Step 2: 全站驗證（spec 驗證清單逐項）**

1. `node --test tests/` 全 pass
2. counts：三區「全部」= 72 / 24 / 15；`node -e` 直算 data.js 對照 UI 顯示
3. 撞名回歸（Task 3 Step 4 再跑一次）
4. 舊收藏 migration（Task 3 Step 4 場景 2 再跑一次）
5. 月份：切 7 月 → 首爾/釜山空狀態文案、濟州顯示繡球花；切 1 月 → 濟州山茶花、釜山冬柏島
6. L3 視覺：三區域 × 桌機 1440 / 手機 390 共 6 張截圖親眼看（marker 落點、頁籤、月份列、卡片）
7. console 0 error、無破圖

- [ ] **Step 3: 部署前停下 — 向 user 確認 push**（push main = 自動上 production）

- [ ] **Step 4: user 確認後**：`git push` → `gh run watch $(gh run list -L1 --json databaseId -q '.[0].databaseId')` 等綠 → L5 線上驗證：

```bash
for f in index.html app.js data.js utils.js style.css og-image.png; do
  diff <(curl -s "https://cherry.mursfoto.com/$f") "$f" > /dev/null && echo "OK $f" || echo "DIFF $f";
done   # index.html 用根路徑 / 比對（/index.html 會 308）
```

線上再跑一輪 L3 截圖 + console 檢查。

- [ ] **Step 5: 完成報告**：L1–L7 逐層回報 + 未來 1–3 月坑（10 月芒草季內容自動有效、12 月山茶花內容自動有效 — 月份 chips 是靜態預估，無需維護）。

---

## Self-Review 紀錄

- Spec 覆蓋：id/region（T2）、identity 修復＋migration（T3）、新花種（T4）、區域頁籤（T5）、月份切換＋空狀態（T6）、濟州（T7）、釜山含鎮海（T8）、品牌＋og-image（T9）、驗證＋部署（T10）— spec 各節皆有對應。
- 型別一致：`FlowerUtils.parseBloomMonths` / `migrateFaves` 命名在 T1/T3/T6 一致；`REGION_META` 在 T5 定義、T6 消費；`s._months` 在 T6 定義並自用。
- 無 placeholder；座標標明「初值，執行時查證」屬資料查證步驟而非程式 TBD。
