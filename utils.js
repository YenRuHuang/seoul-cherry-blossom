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
