// 首爾賞櫻地圖 — 主應用程式 v2
(function() {
  "use strict";

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

  // ── 地圖初始化 ──
  var map = L.map("map", { zoomControl: true }).setView([37.5665, 126.9780], 11);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  var markerCluster = L.markerClusterGroup({ maxClusterRadius: 40, spiderfyOnMaxZoom: true, showCoverageOnHover: false });
  map.addLayer(markerCluster);

  // GPS 定位按鈕
  var locateBtn = L.control({ position: "topleft" });
  locateBtn.onAdd = function() {
    var div = document.createElement("div");
    div.className = "leaflet-bar";
    var a = document.createElement("a");
    a.href = "#";
    a.title = "我的位置";
    a.textContent = "📍";
    a.style.cssText = "font-size:18px;line-height:30px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;";
    a.addEventListener("click", function(e) {
      e.preventDefault();
      if (!navigator.geolocation) return;
      a.textContent = "⏳";
      navigator.geolocation.getCurrentPosition(function(pos) {
        var latlng = [pos.coords.latitude, pos.coords.longitude];
        L.marker(latlng, { icon: L.divIcon({ className:"", html:'<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 8px rgba(59,130,246,.5)"></div>', iconSize:[16,16], iconAnchor:[8,8] }) }).addTo(map).bindPopup("📍 你在這裡").openPopup();
        map.flyTo(latlng, 14);
        a.textContent = "📍";
      }, function() { a.textContent = "📍"; a.title = "定位失敗，請允許位置權限"; });
    });
    div.appendChild(a);
    return div;
  };
  locateBtn.addTo(map);

  var currentFilter = "all";
  var currentSearch = "";

  // ── 工具 ──
  function getMarkerClass(cat) {
    return { cherry:"cherry-marker-cherry", forsythia:"cherry-marker-forsythia", azalea:"cherry-marker-azalea", tulip:"cherry-marker-tulip", rapeseed:"cherry-marker-forsythia", other:"cherry-marker-other" }[cat] || "cherry-marker-other";
  }
  function navGoogle(s) { return "https://www.google.com/maps/dir/?api=1&destination="+s.lat+","+s.lng+"&travelmode=transit"; }
  function navNaver(s) { return "https://map.naver.com/p/search/"+encodeURIComponent(s.nameKr)+"?c="+s.lng+","+s.lat+",15,0,0,0,dh"; }
  function popLabel(pop) {
    if (pop === "hot") return '<span class="tag tag-hot">🔥 熱門</span>';
    if (pop === "hidden") return '<span class="tag tag-hidden">💎 秘境</span>';
    return "";
  }

  // ── Popup DOM ──
  function createPopupContent(spot) {
    var cat = getFlowerCategory(spot.flowers);
    var emoji = getMarkerEmoji(cat);
    var c = document.createElement("div");
    c.className = "popup-content";

    var h = document.createElement("div");
    h.className = "popup-name";
    h.textContent = (spot.highlight ? "⭐ " : "") + spot.name;
    c.appendChild(h);

    var hk = document.createElement("div");
    hk.className = "popup-name-kr";
    hk.textContent = spot.nameKr;
    c.appendChild(hk);

    var tags = document.createElement("div");
    tags.className = "popup-tags";
    spot.flowers.forEach(function(f) {
      var t = document.createElement("span"); t.className = "tag tag-flower"; t.textContent = emoji+" "+f; tags.appendChild(t);
    });
    var dt = document.createElement("span"); dt.className = "tag tag-district"; dt.textContent = "📍 "+spot.district; tags.appendChild(dt);
    if (spot.pop) { var pt = document.createElement("span"); pt.className = spot.pop==="hot"?"tag tag-hot":"tag tag-hidden"; pt.textContent = spot.pop==="hot"?"🔥 熱門":"💎 秘境"; tags.appendChild(pt); }
    c.appendChild(tags);

    var det = document.createElement("div");
    det.className = "popup-detail";
    det.style.whiteSpace = "pre-line";
    var txt = "🗓️ "+spot.bloom+"\n"+getTypeEmoji(spot.type)+" "+spot.type+" · "+spot.length+"km\n🚇 "+spot.subway;
    if (spot.note) txt += "\n💡 "+spot.note;
    det.textContent = txt;
    c.appendChild(det);

    var nav = document.createElement("div");
    nav.className = "popup-nav";
    var gl = document.createElement("a"); gl.href = navGoogle(spot); gl.target = "_blank"; gl.rel = "noopener"; gl.className = "popup-nav-google"; gl.textContent = "📍 Google 導航"; nav.appendChild(gl);
    var nl = document.createElement("a"); nl.href = navNaver(spot); nl.target = "_blank"; nl.rel = "noopener"; nl.className = "popup-nav-naver"; nl.textContent = "🗺️ Naver 地圖"; nav.appendChild(nl);
    c.appendChild(nav);
    return c;
  }

  // ── 建立標記 ──
  var spotMarkers = {};
  function createMarkers(spots) {
    markerCluster.clearLayers();
    spotMarkers = {};
    spots.forEach(function(spot) {
      var cat = getFlowerCategory(spot.flowers);
      var emoji = getMarkerEmoji(cat);
      var cls = getMarkerClass(cat);
      var icon = L.divIcon({ className:"", html:'<div class="cherry-marker '+cls+'">'+emoji+'</div>', iconSize:[32,32], iconAnchor:[16,16] });
      var marker = L.marker([spot.lat, spot.lng], { icon:icon });
      marker.bindPopup(createPopupContent(spot), { maxWidth:280 });
      markerCluster.addLayer(marker);
      spotMarkers[spot.id] = marker;
    });
  }

  // ── 景點卡片 ──
  function renderSpotList(spots) {
    var list = document.getElementById("spotList");
    while (list.firstChild) list.removeChild(list.firstChild);

    spots.forEach(function(spot) {
      var cat = getFlowerCategory(spot.flowers);
      var emoji = getMarkerEmoji(cat);
      var faved = isFaved(spot.id);

      var card = document.createElement("div");
      card.className = "spot-card" + (faved ? " spot-faved" : "");
      card.addEventListener("click", function() {
        map.flyTo([spot.lat, spot.lng], 15, { duration:1 });
        window.scrollTo({ top:0, behavior:"smooth" });
        setTimeout(function() {
          var m = spotMarkers[spot.id];
          if (m) { markerCluster.zoomToShowLayer(m, function() { m.openPopup(); }); }
        }, 1200);
      });

      // 名稱列（含收藏按鈕）
      var nameRow = document.createElement("div");
      nameRow.style.cssText = "display:flex;justify-content:space-between;align-items:flex-start;";

      var nameDiv = document.createElement("div");
      var nd = document.createElement("div"); nd.className = "spot-name"; nd.textContent = (spot.highlight?"⭐ ":"")+spot.name; nameDiv.appendChild(nd);
      var nk = document.createElement("div"); nk.className = "spot-name-kr"; nk.textContent = spot.nameKr; nameDiv.appendChild(nk);
      nameRow.appendChild(nameDiv);

      var faveBtn = document.createElement("button");
      faveBtn.className = "fave-btn" + (faved ? " faved" : "");
      faveBtn.textContent = faved ? "❤️" : "🤍";
      faveBtn.title = faved ? "取消收藏" : "收藏";
      faveBtn.addEventListener("click", function(e) { e.stopPropagation(); toggleFave(spot.id); });
      nameRow.appendChild(faveBtn);
      card.appendChild(nameRow);

      // 標籤
      var meta = document.createElement("div"); meta.className = "spot-meta";
      spot.flowers.forEach(function(f) {
        var t = document.createElement("span"); t.className = "tag tag-flower"; t.textContent = emoji+" "+f; meta.appendChild(t);
      });
      var dTag = document.createElement("span"); dTag.className = "tag tag-district"; dTag.textContent = "📍 "+spot.district; meta.appendChild(dTag);
      var tTag = document.createElement("span"); tTag.className = "tag tag-type"; tTag.textContent = getTypeEmoji(spot.type)+" "+spot.type; meta.appendChild(tTag);
      var bTag = document.createElement("span"); bTag.className = "tag tag-bloom"; bTag.textContent = "🗓️ "+spot.bloom; meta.appendChild(bTag);
      if (spot.pop) {
        var pTag = document.createElement("span");
        pTag.className = spot.pop==="hot" ? "tag tag-hot" : "tag tag-hidden";
        pTag.textContent = spot.pop==="hot" ? "🔥 熱門" : "💎 秘境";
        meta.appendChild(pTag);
      }
      card.appendChild(meta);

      // 地鐵 + 資訊
      var info = document.createElement("div"); info.className = "spot-info";
      info.textContent = "🚇 "+spot.subway+" · 📏 "+spot.length+"km" + (spot.note ? " · 💡 "+spot.note : "");
      card.appendChild(info);

      // 導航按鈕
      var actions = document.createElement("div"); actions.className = "spot-actions";
      var gLink = document.createElement("a"); gLink.className = "btn-nav btn-nav-primary"; gLink.href = navGoogle(spot); gLink.target = "_blank"; gLink.rel = "noopener"; gLink.textContent = "📍 Google 導航"; gLink.addEventListener("click", function(e){e.stopPropagation();}); actions.appendChild(gLink);
      var nLink = document.createElement("a"); nLink.className = "btn-nav btn-nav-naver"; nLink.href = navNaver(spot); nLink.target = "_blank"; nLink.rel = "noopener"; nLink.textContent = "🗺️ Naver 地圖"; nLink.addEventListener("click", function(e){e.stopPropagation();}); actions.appendChild(nLink);
      card.appendChild(actions);

      list.appendChild(card);
    });

    document.getElementById("resultCount").textContent = spots.length;
  }

  // ── 篩選 ──
  function getFilteredSpots() {
    return SPOTS.filter(function(spot) {
      var cat = getFlowerCategory(spot.flowers);
      var matchFilter = currentFilter === "all" || currentFilter === "fave" || cat === currentFilter;
      if (currentFilter === "fave") matchFilter = isFaved(spot.id);
      if (!matchFilter) return false;
      if (!currentSearch) return true;
      var q = currentSearch.toLowerCase();
      return (
        spot.name.toLowerCase().indexOf(q) !== -1 ||
        spot.nameKr.toLowerCase().indexOf(q) !== -1 ||
        spot.district.indexOf(q) !== -1 ||
        spot.districtKr.indexOf(q) !== -1 ||
        spot.flowers.some(function(f){return f.indexOf(q)!==-1;}) ||
        (spot.subway && spot.subway.indexOf(q) !== -1) ||
        (spot.note && spot.note.indexOf(q) !== -1)
      );
    });
  }

  function updateView() {
    var filtered = getFilteredSpots();
    filtered.sort(function(a, b) {
      // 收藏優先 → 推薦 → 長度
      var fa = isFaved(a.id)?1:0, fb = isFaved(b.id)?1:0;
      if (fa !== fb) return fb - fa;
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return b.length - a.length;
    });
    createMarkers(filtered);
    renderSpotList(filtered);
    // 更新收藏計數
    var faveCountEl = document.getElementById("faveCount");
    if (faveCountEl) faveCountEl.textContent = getFaves().length;
  }

  // ── 事件 ──
  document.getElementById("filterBar").addEventListener("click", function(e) {
    var btn = e.target.closest(".filter-btn");
    if (!btn) return;
    var btns = document.querySelectorAll(".filter-btn");
    for (var i=0; i<btns.length; i++) btns[i].classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    updateView();
  });

  document.getElementById("searchInput").addEventListener("input", function(e) {
    currentSearch = e.target.value.trim();
    updateView();
  });

  document.getElementById("scrollTop").addEventListener("click", function() {
    window.scrollTo({ top:0, behavior:"smooth" });
  });

  window.addEventListener("scroll", function() {
    document.getElementById("scrollTop").style.display = window.scrollY > 400 ? "flex" : "none";
  });

  // 分享按鈕
  var shareLineBtn = document.getElementById("shareLine");
  var shareCopyBtn = document.getElementById("shareCopy");
  var pageUrl = window.location.href;
  var shareText = "🌸 首爾賞櫻地圖 2026 — 75+ 個春花景點，繁中介面，專為台灣旅客！";

  if (shareLineBtn) {
    shareLineBtn.addEventListener("click", function() {
      window.open("https://line.me/R/share?text="+encodeURIComponent(shareText + "\n" + pageUrl), "_blank");
    });
  }
  if (shareCopyBtn) {
    shareCopyBtn.addEventListener("click", function() {
      var copyStr = shareText + "\n" + pageUrl;
      (navigator.clipboard ? navigator.clipboard.writeText(copyStr) : Promise.reject()).then(function() {
        shareCopyBtn.textContent = "✅ 已複製！";
        setTimeout(function(){ shareCopyBtn.textContent = "📋 複製連結"; }, 2000);
      }).catch(function() {
        // fallback: prompt
        window.prompt("複製以下連結：", copyStr);
      });
    });
  }

  // 篩選計數
  function updateFilterCounts() {
    var counts = { all: SPOTS.length };
    SPOTS.forEach(function(s) {
      var cat = getFlowerCategory(s.flowers);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    var btns = document.querySelectorAll(".filter-btn");
    for (var i=0; i<btns.length; i++) {
      var f = btns[i].getAttribute("data-filter");
      if (f === "fave") continue;
      if (counts[f] !== undefined) {
        var text = btns[i].textContent.replace(/\s*\d+$/, "");
        var span = document.createElement("span");
        span.className = "count";
        span.textContent = counts[f];
        btns[i].textContent = text + " ";
        btns[i].appendChild(span);
      }
    }
  }

  // ── 啟動 ──
  updateFilterCounts();
  updateView();
})();
