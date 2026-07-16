// 首爾市官方春花景點（繁中翻譯版）— 含地鐵站、人氣標籤
// pop: "hot"=熱門景點  "hidden"=秘境  undefined=一般
var SPOTS = [
  // === 鐘路區 ===
  { id:"seoul-01", region:"seoul", name:"三清公園", nameKr:"삼청공원", district:"鐘路區", districtKr:"종로구", flowers:["櫻花"], bloom:"4月中～6月初", length:1.0, type:"公園", lat:37.5900, lng:126.9810, subway:"安國站 3號線", subwayKr:"안국역 3호선" },
  { id:"seoul-02", region:"seoul", name:"仁王山路", nameKr:"인왕산길", district:"鐘路區", districtKr:"종로구", flowers:["杜鵑花","迎春花","櫻花"], bloom:"4月初～5月初", length:2.4, type:"街道", lat:37.5850, lng:126.9650, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선" },
  { id:"seoul-03", region:"seoul", name:"通仁市場～弼雲大路", nameKr:"통인시장~필운대로", district:"鐘路區", districtKr:"종로구", flowers:["櫻花"], bloom:"4月初～4月末", length:1.0, type:"街道", lat:37.5790, lng:126.9700, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선", pop:"hidden" },
  { id:"seoul-04", region:"seoul", name:"清溪川路", nameKr:"청계천로", district:"鐘路區", districtKr:"종로구", flowers:["流蘇樹"], bloom:"5月初～6月初", length:1.2, type:"河邊", lat:37.5700, lng:126.9820, subway:"鐘閣站 1號線", subwayKr:"종각역 1호선" },
  { id:"seoul-05", region:"seoul", name:"水聲洞溪谷", nameKr:"수성동계곡", district:"鐘路區", districtKr:"종로구", flowers:["桃花","野花"], bloom:"4月中～6月初", length:0.5, type:"綠地", lat:37.5820, lng:126.9680, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선", pop:"hidden" },

  // === 中區 ===
  { id:"seoul-06", region:"seoul", name:"筆洞路", nameKr:"필동로", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.0, type:"街道", lat:37.5590, lng:126.9940, subway:"忠武路站 3·4號線", subwayKr:"충무로역 3,4호선" },
  { id:"seoul-07", region:"seoul", name:"南山公園環山路", nameKr:"남산공원 순환로", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"4月中～4月末", length:5.0, type:"公園", lat:37.5512, lng:126.9882, subway:"明洞站 4號線", subwayKr:"명동역 4호선", pop:"hot" },
  { id:"seoul-08", region:"seoul", name:"首爾路7017", nameKr:"서울로7017", district:"中區", districtKr:"중구", flowers:["櫻花","木蓮","杜鵑","玫瑰"], bloom:"3月初～5月中", length:1.0, type:"街道", lat:37.5565, lng:126.9720, subway:"首爾站 1·4號線", subwayKr:"서울역 1,4호선" },
  { id:"seoul-09", region:"seoul", name:"清溪川邊", nameKr:"청계천변", district:"中區", districtKr:"중구", flowers:["迎春花","山茱萸","梅花"], bloom:"4月初～6月末", length:5.5, type:"河邊", lat:37.5690, lng:126.9780, subway:"乙支路入口站 2號線", subwayKr:"을지로입구역 2호선" },
  { id:"seoul-10", region:"seoul", name:"西小門歷史公園", nameKr:"서소문역사공원", district:"中區", districtKr:"중구", flowers:["鬱金香"], bloom:"4月～5月", length:0.2, type:"公園", lat:37.5590, lng:126.9690, subway:"忠正路站 2·5號線", subwayKr:"충정로역 2,5호선" },

  // === 龍山區 ===
  { id:"seoul-11", region:"seoul", name:"南山野外植物園", nameKr:"남산공원 야외식물원", district:"龍山區", districtKr:"용산구", flowers:["杜鵑","野花"], bloom:"4月中～6月初", length:1.0, type:"公園", lat:37.5510, lng:126.9870, subway:"梨泰院站 6號線", subwayKr:"이태원역 6호선" },

  // === 城東區 ===
  { id:"seoul-12", region:"seoul", name:"鷹峰公園（迎春花山）", nameKr:"응봉근린공원(응봉산)", district:"城東區", districtKr:"성동구", flowers:["迎春花"], bloom:"3月末～4月末", length:1.5, type:"公園", lat:37.5580, lng:127.0250, subway:"鷹峰站 京義中央線", subwayKr:"응봉역 경의중앙선" },
  { id:"seoul-13", region:"seoul", name:"鷹峰公園（櫻花）", nameKr:"응봉근린공원(금호산)", district:"城東區", districtKr:"성동구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.5, type:"公園", lat:37.5540, lng:127.0180, subway:"金湖站 3號線", subwayKr:"금호역 3호선" },
  { id:"seoul-14", region:"seoul", name:"首爾林", nameKr:"서울숲", district:"城東區", districtKr:"성동구", flowers:["櫻花","鬱金香"], bloom:"4月初～5月中", length:0.7, type:"公園", lat:37.5445, lng:127.0375, highlight:true, note:"Windhill 是 SNS 超人氣打卡點", subway:"首爾林站 盆唐線", subwayKr:"서울숲역 분당선", pop:"hot" },
  { id:"seoul-15", region:"seoul", name:"中浪川鷹峰（鬱金香）", nameKr:"중랑천 응봉지구", district:"城東區", districtKr:"성동구", flowers:["鬱金香","水仙花"], bloom:"4月中～5月末", length:1.2, type:"河邊", lat:37.5600, lng:127.0380, subway:"鷹峰站 京義中央線", subwayKr:"응봉역 경의중앙선" },
  { id:"seoul-16", region:"seoul", name:"松亭堤防", nameKr:"송정제방 수림대", district:"城東區", districtKr:"성동구", flowers:["櫻花","玫瑰"], bloom:"4月中～5月末", length:3.2, type:"河邊", lat:37.5650, lng:127.0480, subway:"龍踏站 2號線", subwayKr:"용답역 2호선" },

  // === 廣津區 ===
  { id:"seoul-17", region:"seoul", name:"華克山莊路", nameKr:"워커힐길", district:"廣津區", districtKr:"광진구", flowers:["櫻花"], bloom:"4月初～4月中", length:1.5, type:"街道", lat:37.5550, lng:127.1060, subway:"廣渡口站 5號線", subwayKr:"광나루역 5호선" },
  { id:"seoul-18", region:"seoul", name:"峨嵯山步道", nameKr:"아차산둘레길", district:"廣津區", districtKr:"광진구", flowers:["杜鵑花"], bloom:"3月末～5月中", length:4.0, type:"公園", lat:37.5620, lng:127.1040, subway:"峨嵯山站 5號線", subwayKr:"아차산역 5호선" },
  { id:"seoul-19", region:"seoul", name:"兒童大公園", nameKr:"어린이대공원", district:"廣津區", districtKr:"광진구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.5, type:"公園", lat:37.5480, lng:127.0790, subway:"兒童大公園站 7號線", subwayKr:"어린이대공원역 7호선", pop:"hot" },

  // === 東大門區 ===
  { id:"seoul-20", region:"seoul", name:"慶熙大學", nameKr:"경희대학교", district:"東大門區", districtKr:"동대문구", flowers:["櫻花","迎春花"], bloom:"4月初～6月中", length:2.0, type:"公園", lat:37.5960, lng:127.0520, subway:"回基站 1號線·京義中央線", subwayKr:"회기역 1호선, 경의중앙선", pop:"hot" },
  { id:"seoul-21", region:"seoul", name:"中浪川堤防", nameKr:"중랑천제방", district:"東大門區", districtKr:"동대문구", flowers:["櫻花","迎春花"], bloom:"4月初～4月中", length:3.0, type:"河邊", lat:37.5720, lng:127.0570, subway:"長漢坪站 5號線", subwayKr:"장한평역 5호선" },

  // === 中浪區 ===
  { id:"seoul-22", region:"seoul", name:"中浪川步道", nameKr:"묵등교~장평교", district:"中浪區", districtKr:"중랑구", flowers:["櫻花","玫瑰"], bloom:"4月中～6月中", length:5.15, type:"河邊", lat:37.5810, lng:127.0720, subway:"墨谷站 7號線", subwayKr:"먹골역 7호선" },
  { id:"seoul-23", region:"seoul", name:"忘憂里公園", nameKr:"망우리공원", district:"中浪區", districtKr:"중랑구", flowers:["櫻花"], bloom:"4月初～4月中", length:2.4, type:"公園", lat:37.5980, lng:127.0930, subway:"忘憂站 京義中央線", subwayKr:"망우역 경의중앙선", pop:"hidden" },

  // === 城北區 ===
  { id:"seoul-24", region:"seoul", name:"開運山公園", nameKr:"개운산근린공원", district:"城北區", districtKr:"성북구", flowers:["櫻花","杜鵑"], bloom:"4月初～5月中", length:3.0, type:"公園", lat:37.5870, lng:127.0280, subway:"安岩站 6號線", subwayKr:"안암역 6호선" },
  { id:"seoul-25", region:"seoul", name:"城北川", nameKr:"성북천", district:"城北區", districtKr:"성북구", flowers:["櫻花"], bloom:"4月～6月", length:2.5, type:"河邊", lat:37.5860, lng:127.0140, subway:"普門站 6號線", subwayKr:"보문역 6호선", pop:"hidden" },

  // === 江北區 ===
  { id:"seoul-26", region:"seoul", name:"牛耳川櫻花路", nameKr:"우이천 벚꽃길산책로", district:"江北區", districtKr:"강북구", flowers:["櫻花"], bloom:"3月～4月", length:1.3, type:"河邊", lat:37.6390, lng:127.0200, subway:"水踰站 4號線", subwayKr:"수유역 4호선", pop:"hidden" },
  { id:"seoul-27", region:"seoul", name:"北首爾夢之森", nameKr:"북서울 꿈의 숲", district:"江北區", districtKr:"강북구", flowers:["櫻花"], bloom:"4月中～4月末", length:4.0, type:"公園", lat:37.6200, lng:127.0340, subway:"彌阿站 4號線", subwayKr:"미아역 4호선" },
  { id:"seoul-28", region:"seoul", name:"五東公園", nameKr:"오동근린공원", district:"江北區", districtKr:"강북구", flowers:["杜鵑花"], bloom:"4月初～4月末", length:0.6, type:"公園", lat:37.6180, lng:127.0270, subway:"彌阿十字路口站 4號線", subwayKr:"미아사거리역 4호선" },

  // === 道峰區 ===
  { id:"seoul-29", region:"seoul", name:"牛耳川邊（道峰）", nameKr:"우이천변", district:"道峰區", districtKr:"도봉구", flowers:["櫻花","迎春花"], bloom:"4月初～4月末", length:1.2, type:"河邊", lat:37.6510, lng:127.0360, subway:"倉洞站 1·4號線", subwayKr:"창동역 1,4호선" },

  // === 蘆原區 ===
  { id:"seoul-30", region:"seoul", name:"牛耳川綠地帶", nameKr:"우이천변녹지대", district:"蘆原區", districtKr:"노원구", flowers:["櫻花","迎春花"], bloom:"3月末～5月初", length:1.5, type:"河邊", lat:37.6260, lng:127.0200, subway:"月桂站 1號線", subwayKr:"월계역 1호선" },
  { id:"seoul-31", region:"seoul", name:"堂峴川邊", nameKr:"당현천변", district:"蘆原區", districtKr:"노원구", flowers:["櫻花"], bloom:"4月中～6月初", length:3.0, type:"河邊", lat:37.6450, lng:127.0700, subway:"下溪站 7號線", subwayKr:"하계역 7호선" },
  { id:"seoul-32", region:"seoul", name:"慶春線林道", nameKr:"경춘선 숲길", district:"蘆原區", districtKr:"노원구", flowers:["櫻花"], bloom:"3月末～4月中", length:0.4, type:"街道", lat:37.6220, lng:127.0760, subway:"花郎臺站 6號線", subwayKr:"화랑대역 6호선", pop:"hidden" },

  // === 西大門區 ===
  { id:"seoul-33", region:"seoul", name:"安山自然公園", nameKr:"안산도시자연공원", district:"西大門區", districtKr:"서대문구", flowers:["櫻花","杜鵑","迎春花"], bloom:"4月初～4月末", length:2.0, type:"公園", lat:37.5670, lng:126.9430, subway:"獨立門站 3號線", subwayKr:"독립문역 3호선" },
  { id:"seoul-34", region:"seoul", name:"弘濟川邊", nameKr:"홍제천변", district:"西大門區", districtKr:"서대문구", flowers:["櫻花","迎春花"], bloom:"4月初～4月末", length:0.5, type:"河邊", lat:37.5720, lng:126.9360, subway:"弘濟站 3號線", subwayKr:"홍제역 3호선", pop:"hidden" },
  { id:"seoul-35", region:"seoul", name:"佛光川邊", nameKr:"불광천변", district:"西大門區", districtKr:"서대문구", flowers:["櫻花"], bloom:"4月中～6月初", length:2.9, type:"河邊", lat:37.5780, lng:126.9150, subway:"鷹岩站 6號線", subwayKr:"응암역 6호선", pop:"hidden" },
  { id:"seoul-36", region:"seoul", name:"延世路名物街", nameKr:"연세로 명물거리", district:"西大門區", districtKr:"서대문구", flowers:["櫻花"], bloom:"4月～5月", length:0.8, type:"街道", lat:37.5575, lng:126.9370, subway:"新村站 2號線", subwayKr:"신촌역 2호선" },

  // === 恩平區 ===
  { id:"seoul-37", region:"seoul", name:"恩平韓屋村", nameKr:"은평한옥마을", district:"恩平區", districtKr:"은평구", flowers:["櫻花"], bloom:"3月中～5月初", length:1.2, type:"街道", lat:37.6370, lng:126.9220, subway:"延新內站 3·6號線 轉公車", subwayKr:"연신내역 3,6호선", pop:"hidden" },
  { id:"seoul-38", region:"seoul", name:"昌陵川邊", nameKr:"창릉천변", district:"恩平區", districtKr:"은평구", flowers:["櫻花"], bloom:"3月中～7月初", length:2.0, type:"河邊", lat:37.6400, lng:126.9250, subway:"舊把撥站 3號線", subwayKr:"구파발역 3호선" },

  // === 麻浦區 ===
  { id:"seoul-39", region:"seoul", name:"土亭路櫻花街", nameKr:"토정로 37길", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"4月初～4月中", length:0.4, type:"街道", lat:37.5470, lng:126.9460, subway:"麻浦站 5號線", subwayKr:"마포역 5호선", pop:"hidden" },
  { id:"seoul-40", region:"seoul", name:"臥牛公園", nameKr:"와우근린공원", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"4月初～4月中", length:1.1, type:"公園", lat:37.5530, lng:126.9320, subway:"新村站 2號線", subwayKr:"신촌역 2호선" },
  { id:"seoul-41", region:"seoul", name:"京義線林道", nameKr:"경의선숲길", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"3月末～4月末", length:0.8, type:"街道", lat:37.5480, lng:126.9500, subway:"孔德站 5·6號線·京義中央線", subwayKr:"공덕역 5,6호선,경의중앙선", pop:"hidden" },
  { id:"seoul-42", region:"seoul", name:"天空公園", nameKr:"하늘공원", district:"麻浦區", districtKr:"마포구", flowers:["迎春花"], bloom:"4月初～4月末", length:2.0, type:"公園", lat:37.5680, lng:126.8850, subway:"世界盃體育場站 6號線", subwayKr:"월드컵경기장역 6호선" },

  // === 陽川區 ===
  { id:"seoul-43", region:"seoul", name:"安養川堤防", nameKr:"안양천 제방", district:"陽川區", districtKr:"양천구", flowers:["櫻花"], bloom:"4月中～4月末", length:2.0, type:"河邊", lat:37.5260, lng:126.8720, subway:"楊坪站 5號線", subwayKr:"양평역 5호선" },
  { id:"seoul-44", region:"seoul", name:"西首爾湖水公園", nameKr:"서서울 호수공원", district:"陽川區", districtKr:"양천구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.6, type:"公園", lat:37.5280, lng:126.8430, subway:"喜鵲山站 2·5號線 步行15分", subwayKr:"까치산역 2,5호선" },

  // === 江西區 ===
  { id:"seoul-45", region:"seoul", name:"放花公園", nameKr:"방화공원", district:"江西區", districtKr:"강서구", flowers:["櫻花"], bloom:"4月中～4月末", length:2.0, type:"公園", lat:37.5770, lng:126.8200, subway:"傍花站 5號線", subwayKr:"방화역 5호선" },
  { id:"seoul-46", region:"seoul", name:"首爾植物園", nameKr:"서울식물원", district:"江西區", districtKr:"강서구", flowers:["鬱金香","水仙花"], bloom:"4月中旬", length:0.8, type:"公園", lat:37.5680, lng:126.8350, highlight:true, note:"園內鬱金香花海超壯觀", subway:"麻谷渡口站 9號線", subwayKr:"마곡나루역 9호선", pop:"hot" },
  { id:"seoul-47", region:"seoul", name:"牛裝山公園", nameKr:"우장산공원", district:"江西區", districtKr:"강서구", flowers:["迎春花","杜鵑"], bloom:"4月初～4月末", length:4.0, type:"公園", lat:37.5430, lng:126.8360, subway:"花谷站 5號線", subwayKr:"화곡역 5호선" },

  // === 九老區 ===
  { id:"seoul-48", region:"seoul", name:"道林川堤防", nameKr:"도림천 제방", district:"九老區", districtKr:"구로구", flowers:["櫻花","杜鵑","迎春花"], bloom:"4月初～6月初", length:1.0, type:"河邊", lat:37.5090, lng:126.8890, subway:"新道林站 1·2號線", subwayKr:"신도림역 1,2호선" },
  { id:"seoul-49", region:"seoul", name:"安養川堤防（九老）", nameKr:"안양천 제방", district:"九老區", districtKr:"구로구", flowers:["櫻花","迎春花"], bloom:"4月初～6月初", length:2.0, type:"河邊", lat:37.5020, lng:126.8680, subway:"九一站 1號線", subwayKr:"구일역 1호선" },

  // === 衿川區 ===
  { id:"seoul-50", region:"seoul", name:"櫻花路（獨山站～加山站）", nameKr:"벚꽃로", district:"衿川區", districtKr:"금천구", flowers:["櫻花"], bloom:"4月中～4月末", length:3.4, type:"街道", lat:37.4750, lng:126.8930, subway:"獨山站 1號線", subwayKr:"독산역 1호선" },

  // === 永登浦區 ===
  { id:"seoul-51", region:"seoul", name:"★ 汝矣島輪中路", nameKr:"여의도 윤중로", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花"], bloom:"4月中～4月末", length:6.9, type:"街道", lat:37.5260, lng:126.9220, highlight:true, note:"首爾最著名的櫻花大道！每年春花祭吸引百萬人潮", subway:"汝矣渡口站 5號線", subwayKr:"여의나루역 5호선", pop:"hot" },
  { id:"seoul-52", region:"seoul", name:"安養川堤防（永登浦）", nameKr:"안양천 제방", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花","迎春花","杜鵑"], bloom:"3月末～4月中", length:3.0, type:"河邊", lat:37.5300, lng:126.8800, subway:"楊坪站 5號線", subwayKr:"양평역 5호선" },
  { id:"seoul-53", region:"seoul", name:"大林路", nameKr:"대림로", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花"], bloom:"3月末～6月初", length:2.0, type:"街道", lat:37.4930, lng:126.9010, subway:"大林站 2·7號線", subwayKr:"대림역 2,7호선" },

  // === 銅雀區 ===
  { id:"seoul-54", region:"seoul", name:"顯忠院", nameKr:"현충원", district:"銅雀區", districtKr:"동작구", flowers:["櫻花","迎春花"], bloom:"4月初～5月", length:2.5, type:"公園", lat:37.5010, lng:126.9780, note:"垂枝櫻花特別美", subway:"銅雀站 4號線", subwayKr:"동작역 4호선" },
  { id:"seoul-55", region:"seoul", name:"寶拉美公園", nameKr:"보라매공원", district:"銅雀區", districtKr:"동작구", flowers:["櫻花"], bloom:"4月", length:0.2, type:"公園", lat:37.4930, lng:126.9220, subway:"寶拉美站 7號線", subwayKr:"보라매역 7호선" },

  // === 冠岳區 ===
  { id:"seoul-56", region:"seoul", name:"道林川（冠岳）", nameKr:"도림천", district:"冠岳區", districtKr:"관악구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.0, type:"河邊", lat:37.4870, lng:126.9130, subway:"新大方站 7號線", subwayKr:"신대방역 7호선" },
  { id:"seoul-57", region:"seoul", name:"冠岳山", nameKr:"관악산", district:"冠岳區", districtKr:"관악구", flowers:["杜鵑"], bloom:"4月中～5月中", length:1.5, type:"公園", lat:37.4430, lng:126.9640, subway:"冠岳站 1號線 步行20分", subwayKr:"관악역 1호선" },
  { id:"seoul-58", region:"seoul", name:"南谷路", nameKr:"난곡로", district:"冠岳區", districtKr:"관악구", flowers:["櫻花"], bloom:"4月中～4月末", length:3.0, type:"街道", lat:37.4810, lng:126.9180, subway:"新大方站 7號線", subwayKr:"신대방역 7호선" },

  // === 瑞草區 ===
  { id:"seoul-59", region:"seoul", name:"牛眠山步道", nameKr:"우면산 둘레길", district:"瑞草區", districtKr:"서초구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.5, type:"公園", lat:37.4720, lng:126.9870, subway:"舍堂站 2·4號線", subwayKr:"사당역 2,4호선" },
  { id:"seoul-60", region:"seoul", name:"良才川邊", nameKr:"양재천변", district:"瑞草區", districtKr:"서초구", flowers:["迎春花","櫻花"], bloom:"4月初～4月末", length:2.5, type:"河邊", lat:37.4710, lng:127.0380, subway:"良才站 3號線·新盆唐線", subwayKr:"양재역 3호선, 신분당선" },
  { id:"seoul-61", region:"seoul", name:"盤浦川邊", nameKr:"반포천변", district:"瑞草區", districtKr:"서초구", flowers:["櫻花","杜鵑"], bloom:"4月中～5月中", length:1.2, type:"河邊", lat:37.5060, lng:127.0060, subway:"高速巴士客運站 3·7·9號線", subwayKr:"고속터미널역 3,7,9호선" },
  { id:"seoul-62", region:"seoul", name:"蒙馬特公園", nameKr:"몽마르뜨공원", district:"瑞草區", districtKr:"서초구", flowers:["迎春花","櫻花"], bloom:"4月初～4月末", length:0.5, type:"公園", lat:37.4860, lng:126.9960, subway:"方背站 2號線", subwayKr:"방배역 2호선" },
  { id:"seoul-63", region:"seoul", name:"盤浦瑞來島", nameKr:"반포서래섬", district:"瑞草區", districtKr:"서초구", flowers:["油菜花"], bloom:"4月末～5月末", length:2.0, type:"公園", lat:37.5110, lng:127.0100, note:"漢江邊最美油菜花田", subway:"高速巴士客運站 3·7·9號線", subwayKr:"고속터미널역 3,7,9호선" },
  { id:"seoul-64", region:"seoul", name:"清溪山杜鵑稜線", nameKr:"청계산 진달래능선", district:"瑞草區", districtKr:"서초구", flowers:["杜鵑花"], bloom:"4月中～4月末", length:0.9, type:"公園", lat:37.4400, lng:127.0540, subway:"清溪山入口站 新盆唐線", subwayKr:"청계산입구역 신분당선" },

  // === 江南區 ===
  { id:"seoul-65", region:"seoul", name:"良才川堤防（江南）", nameKr:"양재천 제방", district:"江南區", districtKr:"강남구", flowers:["櫻花","迎春花"], bloom:"3月末～4月末", length:2.5, type:"河邊", lat:37.4820, lng:127.0450, subway:"道谷站 3號線·盆唐線", subwayKr:"도곡역 3호선, 분당선" },
  { id:"seoul-66", region:"seoul", name:"開浦路", nameKr:"개포로", district:"江南區", districtKr:"강남구", flowers:["櫻花"], bloom:"4月中～5月初", length:1.5, type:"街道", lat:37.4880, lng:127.0710, subway:"大廳站 3號線", subwayKr:"대청역 3호선" },

  // === 松坡區 ===
  { id:"seoul-67", region:"seoul", name:"★ 石村湖水", nameKr:"석촌호수(송파나루공원)", district:"松坡區", districtKr:"송파구", flowers:["櫻花","杜鵑"], bloom:"4月中～6月初", length:2.5, type:"公園", lat:37.5100, lng:127.1025, highlight:true, note:"樂天世界旁！2026 櫻花祭 4/3～4/11", subway:"蠶室站 2·8號線", subwayKr:"잠실역 2,8호선", pop:"hot" },
  { id:"seoul-68", region:"seoul", name:"城內川", nameKr:"성내천 둔치", district:"松坡區", districtKr:"송파구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.8, type:"河邊", lat:37.5170, lng:127.1250, subway:"奧林匹克公園站 5·9號線", subwayKr:"올림픽공원역 5,9호선" },
  { id:"seoul-69", region:"seoul", name:"炭川堤防", nameKr:"탄천제방", district:"松坡區", districtKr:"송파구", flowers:["迎春花"], bloom:"4月初～4月末", length:5.7, type:"河邊", lat:37.5050, lng:127.1020, subway:"蠶室站 2·8號線", subwayKr:"잠실역 2,8호선" },

  // === 江東區 ===
  { id:"seoul-70", region:"seoul", name:"奧林匹克路", nameKr:"올림픽로", district:"江東區", districtKr:"강동구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.7, type:"街道", lat:37.5380, lng:127.1230, subway:"千戶站 5·8號線", subwayKr:"천호역 5,8호선" },
  { id:"seoul-71", region:"seoul", name:"香草天文公園", nameKr:"허브천문공원", district:"江東區", districtKr:"강동구", flowers:["薰衣草"], bloom:"4月初～6月初", length:0.3, type:"公園", lat:37.5330, lng:127.1410, subway:"明逸站 5號線", subwayKr:"명일역 5호선" },

  // === 果川市 ===
  { id:"seoul-72", region:"seoul", name:"★ 首爾大公園", nameKr:"서울대공원", district:"果川市", districtKr:"경기도 과천시", flowers:["櫻花","鬱金香"], bloom:"4月中～5月末", length:7.0, type:"公園", lat:37.4270, lng:127.0130, highlight:true, note:"首爾近郊最大！7公里櫻花步道＋鬱金香花海", subway:"大公園站 4號線", subwayKr:"대공원역 4호선", pop:"hot" },

  // === 濟州市（春） ===
  { id:"jeju-01", region:"jeju", name:"★ 典農路櫻花街", nameKr:"전농로 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.2, type:"街道", lat:33.5066, lng:126.5224, highlight:true, note:"濟州王櫻花祭主場地，晚上有夜櫻點燈", subway:"濟州市外巴士站步行 10 分", subwayKr:"제주시외버스터미널", pop:"hot" },
  { id:"jeju-02", region:"jeju", name:"濟州大學櫻花路", nameKr:"제주대학로 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.5, type:"街道", lat:33.4560, lng:126.5620, note:"王櫻花自生地，樹齡高花冠大", subway:"公車 355·356 濟州大學下車", subwayKr:"제주대학교" },
  { id:"jeju-03", region:"jeju", name:"新山公園", nameKr:"신산공원", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"公園", lat:33.5060, lng:126.5330, subway:"公車 325·326 文藝會館下車", subwayKr:"제주문예회관" },
  { id:"jeju-04", region:"jeju", name:"漢拏樹木園", nameKr:"한라수목원", district:"濟州市", districtKr:"제주시", flowers:["櫻花","迎春花"], bloom:"3月末～4月中", length:2.0, type:"公園", lat:33.4690, lng:126.4940, subway:"公車 331·332 漢拏樹木園下車", subwayKr:"한라수목원" },
  { id:"jeju-05", region:"jeju", name:"涯月長田里櫻花路", nameKr:"애월읍 장전리 벚꽃길", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:33.4570, lng:126.3560, note:"在地人賞櫻路線，遊客較少", subway:"建議自駕", subwayKr:"장전리", pop:"hidden" },
  { id:"jeju-06", region:"jeju", name:"★ 鹿山路", nameKr:"녹산로", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["櫻花","油菜花"], bloom:"3月末～4月中", length:10.0, type:"街道", lat:33.4330, lng:126.7248, highlight:true, note:"韓國最美道路之一！櫻花＋油菜花同框 10 公里", subway:"建議自駕（鄰近旌義航空館）", subwayKr:"녹산로", pop:"hot" },
  { id:"jeju-07", region:"jeju", name:"★ 山房山油菜花田", nameKr:"산방산 유채꽃밭", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["油菜花"], bloom:"2月末～4月中", length:0.5, type:"綠地", lat:33.2370, lng:126.3130, highlight:true, note:"山房山為背景的油菜花海，付費入場拍照", subway:"公車 202 山房山下車", subwayKr:"산방산", pop:"hot" },
  { id:"jeju-08", region:"jeju", name:"城山日出峰油菜花", nameKr:"성산일출봉 유채꽃", district:"西歸浦市城山邑", districtKr:"서귀포시 성산읍", flowers:["油菜花"], bloom:"3月初～4月中", length:0.8, type:"綠地", lat:33.4580, lng:126.9370, note:"世界自然遺產日出峰山腳", subway:"公車 201 城山日出峰入口", subwayKr:"성산일출봉" },
  { id:"jeju-09", region:"jeju", name:"咸德犀牛峰", nameKr:"함덕 서우봉", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["油菜花"], bloom:"3月初～4月末", length:1.0, type:"綠地", lat:33.5430, lng:126.6720, note:"翡翠色咸德海灘旁的油菜花坡", subway:"公車 201 咸德海水浴場", subwayKr:"함덕해수욕장" },
  { id:"jeju-10", region:"jeju", name:"三姓穴", nameKr:"삼성혈", district:"濟州市", districtKr:"제주시", flowers:["櫻花","梅花"], bloom:"2月末～4月初", length:0.5, type:"公園", lat:33.5040, lng:126.5290, subway:"公車 332 三姓穴下車", subwayKr:"삼성혈" },
  // === 濟州（夏：繡球花） ===
  { id:"jeju-11", region:"jeju", name:"★ 終達里繡球花路", nameKr:"종달리 수국길", district:"濟州市舊左邑", districtKr:"제주시 구좌읍", flowers:["繡球花"], bloom:"6月初～7月初", length:2.0, type:"街道", lat:33.5090, lng:126.9093, highlight:true, note:"海岸公路旁綿延繡球花牆", subway:"建議自駕", subwayKr:"종달리", pop:"hot" },
  { id:"jeju-12", region:"jeju", name:"婚姻池繡球花", nameKr:"혼인지 수국", district:"西歸浦市城山邑", districtKr:"서귀포시 성산읍", flowers:["繡球花"], bloom:"6月初～7月初", length:0.6, type:"公園", lat:33.4360, lng:126.8940, note:"傳統婚禮聖地，免費入場", subway:"公車 201 轉 722-2", subwayKr:"혼인지" },
  { id:"jeju-13", region:"jeju", name:"馬諾爾莊園", nameKr:"마노르블랑", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["繡球花","粉黛亂子草"], bloom:"6月初～10月末", length:0.3, type:"公園", lat:33.2560, lng:126.3490, note:"咖啡園庭院，夏繡球秋粉黛", subway:"建議自駕", subwayKr:"마노르블랑" },
  { id:"jeju-14", region:"jeju", name:"安德面繡球花路", nameKr:"안덕면 수국길", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["繡球花"], bloom:"6月初～7月初", length:1.5, type:"街道", lat:33.2550, lng:126.3300, note:"病院路兩側繡球花道", subway:"建議自駕", subwayKr:"안덕면 수국길", pop:"hidden" },
  // === 濟州（秋） ===
  { id:"jeju-15", region:"jeju", name:"吾羅洞蕎麥花田", nameKr:"오라동 메밀밭", district:"濟州市", districtKr:"제주시", flowers:["蕎麥花"], bloom:"9月初～10月中", length:1.0, type:"綠地", lat:33.4470, lng:126.4950, note:"漢拏山山腰白色花海（春秋兩季）", subway:"建議自駕", subwayKr:"오라동 메밀밭" },
  { id:"jeju-16", region:"jeju", name:"★ 新星岳芒草", nameKr:"새별오름 억새", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["芒草"], bloom:"10月初～11月末", length:1.5, type:"綠地", lat:33.3650, lng:126.3560, highlight:true, note:"夕陽時整座寄生火山被芒草染金", subway:"建議自駕", subwayKr:"새별오름", pop:"hot" },
  { id:"jeju-17", region:"jeju", name:"山君不離", nameKr:"산굼부리", district:"濟州市朝天邑", districtKr:"제주시 조천읍", flowers:["芒草"], bloom:"10月初～11月末", length:1.2, type:"公園", lat:33.4340, lng:126.6850, note:"火山口環繞芒草原，付費入場", subway:"公車 212·222", subwayKr:"산굼부리" },
  { id:"jeju-18", region:"jeju", name:"休愛里自然生活公園", nameKr:"휴애리 자연생활공원", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["粉黛亂子草","梅花","繡球花"], bloom:"9月末～11月中", length:0.8, type:"公園", lat:33.2790, lng:126.6280, note:"四季花園：2-3月梅花、6月繡球、秋粉黛", subway:"公車 231", subwayKr:"휴애리" },
  // === 濟州（冬：山茶花） ===
  { id:"jeju-19", region:"jeju", name:"★ 山茶花之丘", nameKr:"카멜리아힐", district:"西歸浦市安德面", districtKr:"서귀포시 안덕면", flowers:["山茶花","繡球花"], bloom:"11月末～3月初", length:1.0, type:"公園", lat:33.2891, lng:126.3701, highlight:true, note:"6 萬坪山茶花庭園，冬季必訪", subway:"公車 752-2 上倉里下車", subwayKr:"카멜리아힐", pop:"hot" },
  { id:"jeju-20", region:"jeju", name:"為美里山茶花群落", nameKr:"위미 동백나무 군락지", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["山茶花"], bloom:"12月初～2月末", length:0.5, type:"綠地", lat:33.2740, lng:126.6660, note:"百年山茶樹古群落", subway:"公車 231 為美里下車", subwayKr:"위미리", pop:"hidden" },
  { id:"jeju-21", region:"jeju", name:"山茶花森林", nameKr:"동백포레스트", district:"西歸浦市南元邑", districtKr:"서귀포시 남원읍", flowers:["山茶花"], bloom:"11月末～2月末", length:0.4, type:"公園", lat:33.2900, lng:126.6520, note:"圓形山茶樹網美拍照點", subway:"建議自駕", subwayKr:"동백포레스트" },
  { id:"jeju-22", region:"jeju", name:"石牆花路（吾羅洞櫻花）", nameKr:"오라동 벚꽃길", district:"濟州市", districtKr:"제주시", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:33.4870, lng:126.5100, subway:"公車 240", subwayKr:"오라동", pop:"hidden" },
  { id:"jeju-23", region:"jeju", name:"廣令梅花村", nameKr:"광령리 매화", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["梅花"], bloom:"2月初～3月初", length:0.5, type:"綠地", lat:33.4650, lng:126.4340, subway:"建議自駕", subwayKr:"광령리" },
  { id:"jeju-24", region:"jeju", name:"杭波頭里海岸油菜花", nameKr:"항파두리 유채꽃", district:"濟州市涯月邑", districtKr:"제주시 애월읍", flowers:["油菜花"], bloom:"3月初～4月中", length:0.7, type:"綠地", lat:33.4520, lng:126.4110, subway:"公車 291", subwayKr:"항파두리" },
  // === 釜山（春） ===
  { id:"busan-01", region:"busan", name:"★ 溫泉川櫻花路", nameKr:"온천천 벚꽃길", district:"東萊區", districtKr:"동래구", flowers:["櫻花"], bloom:"3月末～4月初", length:3.0, type:"河邊", lat:35.2140, lng:129.0855, highlight:true, note:"市區最長櫻花河岸，地鐵直達", subway:"溫泉場站 1號線", subwayKr:"온천장역 1호선", pop:"hot" },
  { id:"busan-02", region:"busan", name:"南川洞櫻花街", nameKr:"남천동 벚꽃거리", district:"水營區", districtKr:"수영구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.0, type:"街道", lat:35.1420, lng:129.1110, note:"公寓社區櫻花隧道，廣安大橋旁", subway:"金蓮山站 2號線", subwayKr:"금련산역 2호선", pop:"hot" },
  { id:"busan-03", region:"busan", name:"三樂生態公園", nameKr:"삼락생태공원", district:"沙上區", districtKr:"사상구", flowers:["櫻花","油菜花"], bloom:"3月末～4月中", length:4.0, type:"河邊", lat:35.1780, lng:128.9640, note:"洛東江畔櫻花＋油菜花同框", subway:"沙上站 2號線步行 15 分", subwayKr:"사상역 2호선" },
  { id:"busan-04", region:"busan", name:"迎月嶺", nameKr:"달맞이길", district:"海雲台區", districtKr:"해운대구", flowers:["櫻花"], bloom:"3月末～4月初", length:2.2, type:"街道", lat:35.1590, lng:129.1760, note:"海雲台看海賞櫻山路", subway:"中洞站 2號線", subwayKr:"중동역 2호선" },
  { id:"busan-05", region:"busan", name:"開琴櫻花文化路", nameKr:"개금벚꽃문화길", district:"釜山鎮區", districtKr:"부산진구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.2, type:"街道", lat:35.1520, lng:129.0230, subway:"開琴站 2號線", subwayKr:"개금역 2호선", pop:"hidden" },
  { id:"busan-06", region:"busan", name:"民主公園", nameKr:"민주공원", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.8, type:"公園", lat:35.1120, lng:129.0330, note:"可俯瞰釜山港的山上公園", subway:"公車 190 民主公園下車", subwayKr:"민주공원" },
  { id:"busan-07", region:"busan", name:"★ 大渚生態公園油菜花", nameKr:"대저생태공원 유채꽃", district:"江西區", districtKr:"강서구", flowers:["油菜花"], bloom:"3月末～4月中", length:3.0, type:"河邊", lat:35.2107, lng:128.9889, highlight:true, note:"洛東江邊 76 萬坪油菜花海（油菜花節）", subway:"江西區廳站 3號線", subwayKr:"강서구청역 3호선", pop:"hot" },
  { id:"busan-08", region:"busan", name:"荒嶺山櫻花路", nameKr:"황령산 벚꽃길", district:"釜山鎮區", districtKr:"부산진구", flowers:["櫻花"], bloom:"3月末～4月初", length:2.5, type:"街道", lat:35.1560, lng:129.0900, note:"夜景名所的環山櫻花道", subway:"建議自駕或計程車", subwayKr:"황령산" },
  // === 釜山（秋冬） ===
  { id:"busan-09", region:"busan", name:"勝鶴山芒草", nameKr:"승학산 억새", district:"沙下區", districtKr:"사하구", flowers:["芒草"], bloom:"9月末～11月中", length:1.5, type:"綠地", lat:35.1110, lng:128.9820, note:"釜山最大芒草平原", subway:"當里站 1號線後登山 1hr", subwayKr:"당리역 1호선" },
  { id:"busan-10", region:"busan", name:"冬柏島", nameKr:"동백섬", district:"海雲台區", districtKr:"해운대구", flowers:["山茶花"], bloom:"12月初～3月中", length:1.0, type:"公園", lat:35.1530, lng:129.1520, note:"海雲台旁山茶花海岸步道（APEC 世峰樓）", subway:"冬柏站 2號線", subwayKr:"동백역 2호선" },
  { id:"busan-11", region:"busan", name:"UN 雕塑公園山茶花", nameKr:"유엔조각공원 동백", district:"南區", districtKr:"남구", flowers:["山茶花"], bloom:"12月初～3月初", length:0.6, type:"公園", lat:35.1270, lng:129.0980, subway:"大淵站 2號線", subwayKr:"대연역 2호선", pop:"hidden" },
  { id:"busan-12", region:"busan", name:"梵魚寺梅花", nameKr:"범어사 매화", district:"金井區", districtKr:"금정구", flowers:["梅花"], bloom:"2月末～3月末", length:0.5, type:"公園", lat:35.2840, lng:129.0680, note:"千年古剎早春梅花", subway:"梵魚寺站 1號線轉公車 90", subwayKr:"범어사역 1호선" },
  // === 鎮海（釜山近郊，行政屬昌原市） ===
  { id:"busan-13", region:"busan", name:"★ 鎮海余佐川櫻花道", nameKr:"진해 여좌천 벚꽃길", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:1.5, type:"河邊", lat:35.1570, lng:128.6597, highlight:true, note:"韓國最有名櫻花祭「軍港節」主場！羅曼史橋夜櫻", subway:"釜山西部巴士站搭市外巴士約 50 分", subwayKr:"여좌천", pop:"hot" },
  { id:"busan-14", region:"busan", name:"★ 鎮海慶和站櫻花路", nameKr:"진해 경화역 벚꽃길", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.8, type:"街道", lat:35.1592, lng:128.6860, highlight:true, note:"廢棄鐵道兩側 800m 櫻花隧道，經典鐵軌照", subway:"釜山西部巴士站搭市外巴士約 50 分", subwayKr:"경화역", pop:"hot" },
  { id:"busan-15", region:"busan", name:"鎮海帝皇山公園", nameKr:"진해 제황산공원", district:"鎮海（近郊）", districtKr:"창원시 진해구", flowers:["櫻花"], bloom:"3月末～4月初", length:0.6, type:"公園", lat:35.1487, lng:128.6647, note:"365 階或單軌車上山俯瞰鎮海櫻花全景", subway:"鎮海市外巴士站步行 15 分", subwayKr:"제황산공원" },
  // === 首爾（夏秋冬） ===
  { id:"seoul-73", region:"seoul", name:"天空公園芒草原", nameKr:"하늘공원 억새밭", district:"麻浦區", districtKr:"마포구", flowers:["芒草"], bloom:"9月末～11月初", length:1.5, type:"公園", lat:37.5714, lng:126.8886, highlight:true, note:"首爾唯一大規模芒草秘境，10月「首爾芒草祭」主場，日落時金黃搖曳", subway:"世界盃體育場站 6號線", subwayKr:"월드컵경기장역 6호선", pop:"hot" },
  { id:"seoul-74", region:"seoul", name:"北首爾夢之森芒草園", nameKr:"북서울꿈의숲 억새원", district:"江北區", districtKr:"강북구", flowers:["芒草"], bloom:"9月中～11月中", length:0.8, type:"公園", lat:37.6215, lng:127.0360, subway:"彌阿站 4號線", subwayKr:"미아역 4호선" },
  { id:"seoul-75", region:"seoul", name:"首爾林繡球花園", nameKr:"서울숲 수국정원", district:"城東區", districtKr:"성동구", flowers:["繡球花"], bloom:"6月初～7月中", length:0.3, type:"公園", lat:37.5460, lng:127.0405, note:"首爾林八大主題園之一，梅雨季前後盛開", subway:"首爾林站 盆唐線", subwayKr:"서울숲역 분당선" },
  { id:"seoul-76", region:"seoul", name:"奧林匹克公園野花之丘", nameKr:"올림픽공원 들꽃마루", district:"松坡區", districtKr:"송파구", flowers:["粉黛亂子草","波斯菊"], bloom:"9月中～10月末", length:0.6, type:"綠地", lat:37.5182, lng:127.1242, note:"上坡黃波斯菊、下坡粉黛亂子草＋粉紅波斯菊同框", subway:"奧林匹克公園站 5·9號線", subwayKr:"올림픽공원역 5,9호선" },
  { id:"seoul-77", region:"seoul", name:"蠶院漢江公園草園", nameKr:"잠원한강공원 그라스정원", district:"瑞草區", districtKr:"서초구", flowers:["粉黛亂子草"], bloom:"9月中～10月中", length:0.5, type:"河邊", lat:37.5232, lng:127.0158, note:"13.6萬株多年生草花，粉黛亂子草花期人潮爆棚", subway:"新沙站 3號線", subwayKr:"신사역 3호선" },
  { id:"seoul-78", region:"seoul", name:"盤浦瑞來島蕎麥花田", nameKr:"반포서래섬 메밀밭", district:"瑞草區", districtKr:"서초구", flowers:["蕎麥花"], bloom:"9月初～9月末", length:0.4, type:"公園", lat:37.5110, lng:127.0100, note:"漢江人工島秋季雪白蕎麥花海，「서래섬 메밀꽃 축제」現場", subway:"高速巴士客運站 3·7·9號線", subwayKr:"고속터미널역 3,7,9호선" },
  { id:"seoul-79", region:"seoul", name:"奉恩寺紅梅", nameKr:"봉은사 홍매화", district:"江南區", districtKr:"강남구", flowers:["梅花"], bloom:"2月末～3月末", length:0.3, type:"公園", lat:37.5150, lng:127.0577, note:"COEX 旁千年古剎，江南都心早春紅梅名所", subway:"奉恩寺站 9號線", subwayKr:"봉은사역 9호선" },
  { id:"seoul-80", region:"seoul", name:"首爾植物園湖水園蓮花", nameKr:"서울식물원 호수원 연꽃", district:"江西區", districtKr:"강서구", flowers:["蓮花"], bloom:"7月初～8月中", length:0.8, type:"公園", lat:37.5665, lng:126.8358, note:"24 小時開放湖水園，盛夏蓮花滿池", subway:"麻谷渡口站 9號線", subwayKr:"마곡나루역 9호선" },
  { id:"seoul-81", region:"seoul", name:"首爾廣場菊花節", nameKr:"서울광장 국화축제", district:"中區", districtKr:"중구", flowers:["菊花"], bloom:"10月中～11月初", length:0.2, type:"綠地", lat:37.5658, lng:126.9784, note:"市政廳前年度菊花裝置藝術，芒草＋楓紅同場", subway:"市廳站 1·2號線", subwayKr:"시청역 1,2호선" },
  { id:"seoul-82", region:"seoul", name:"曹溪寺菊花節", nameKr:"조계사 국화축제", district:"鐘路區", districtKr:"종로구", flowers:["菊花"], bloom:"10月末～11月中", length:0.2, type:"綠地", lat:37.5739, lng:126.9832, note:"市中心古剎秋季菊花裝飾", subway:"安國站 3號線", subwayKr:"안국역 3호선" },
  { id:"seoul-83", region:"seoul", name:"昌慶宮大溫室山茶花", nameKr:"창경궁 대온실 동백", district:"鐘路區", districtKr:"종로구", flowers:["山茶花"], bloom:"12月初～2月末", length:0.2, type:"公園", lat:37.5786, lng:126.9946, note:"百年韓國最早西式溫室，冬季室內山茶花常開", subway:"惠化站 4號線", subwayKr:"혜화역 4호선" },
  { id:"seoul-84", region:"seoul", name:"景福宮香遠亭蓮花", nameKr:"경복궁 향원정 연꽃", district:"鐘路區", districtKr:"종로구", flowers:["蓮花"], bloom:"6月末～8月中", length:0.2, type:"公園", lat:37.5800, lng:126.9772, note:"朝鮮王朝古蓮池，香遠亭倒影經典畫面", subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선" }
];

// 花種分類
var FLOWER_CATEGORIES = {
  cherry:    { label:"櫻花",   emoji:"🌸", keywords:["櫻花","王櫻花","垂櫻"] },
  forsythia: { label:"迎春花", emoji:"💛", keywords:["迎春花"] },
  azalea:    { label:"杜鵑花", emoji:"🌺", keywords:["杜鵑花","杜鵑","金達萊","映山紅"] },
  tulip:     { label:"鬱金香", emoji:"🌷", keywords:["鬱金香"] },
  rapeseed:  { label:"油菜花", emoji:"🟡", keywords:["油菜花"] },
  hydrangea:  { label:"繡球花", emoji:"💠", keywords:["繡球花"] },
  camellia:   { label:"山茶花", emoji:"🏵️", keywords:["山茶花","冬柏"] },
  buckwheat:  { label:"蕎麥花", emoji:"🤍", keywords:["蕎麥花"] },
  silvergrass:{ label:"芒草",   emoji:"🌾", keywords:["芒草","紫芒","粉黛亂子草"] },
  plum:       { label:"梅花",   emoji:"🌸", keywords:["梅花"] },
  other:     { label:"其他",   emoji:"🌿", keywords:[] }
};

function getFlowerCategory(flowers) {
  for (var key in FLOWER_CATEGORIES) {
    if (key === "other") continue;
    var cat = FLOWER_CATEGORIES[key];
    if (flowers.some(function(f) { return cat.keywords.indexOf(f) !== -1; })) return key;
  }
  return "other";
}
function spotInCategory(spot, catKey) {
  return spot.flowers.some(function (f) { return getFlowerCategory([f]) === catKey; });
}
function getMarkerEmoji(cat) {
  return {cherry:"🌸",forsythia:"💛",azalea:"🌺",tulip:"🌷",rapeseed:"🟡",hydrangea:"💠",camellia:"🏵️",buckwheat:"🤍",silvergrass:"🌾",plum:"🌸",other:"🌿"}[cat]||"🌸";
}
function getTypeEmoji(type) {
  return {"公園":"🌳","街道":"🛣️","河邊":"🌊","綠地":"🌿"}[type]||"📍";
}

// Node 測試用 interop（browser 端 typeof module === "undefined"，無作用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SPOTS: SPOTS, FLOWER_CATEGORIES: FLOWER_CATEGORIES, getFlowerCategory: getFlowerCategory, spotInCategory: spotInCategory };
}
