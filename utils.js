(function (root) {
  "use strict";

  // "4월중~6월초" -> [4,5,6]; "11월말~3월초" -> [11,12,1,2,3](횡연); 파싱 불가 -> []
  function parseBloomMonths(bloom) {
    var nums = [];
    var re = /(\d{1,2})월/g;
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

  // 구 수집(nameKr 배열) -> 신 수집(id 배열): 이름 충돌 시 첫 건 취득, 중복 제거, 대응 불가 버림
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
