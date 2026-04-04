// 首爾市官方春花景點（繁中翻譯版）— 含地鐵站、人氣標籤
// pop: "hot"=熱門景點  "hidden"=秘境  undefined=一般
var SPOTS = [
  // === 鐘路區 ===
  { name:"三清公園", nameKr:"삼청공원", district:"鐘路區", districtKr:"종로구", flowers:["櫻花"], bloom:"4月中～6月初", length:1.0, type:"公園", lat:37.5900, lng:126.9810, subway:"安國站 3號線", subwayKr:"안국역 3호선" },
  { name:"仁王山路", nameKr:"인왕산길", district:"鐘路區", districtKr:"종로구", flowers:["杜鵑花","迎春花","櫻花"], bloom:"4月初～5月初", length:2.4, type:"街道", lat:37.5850, lng:126.9650, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선" },
  { name:"通仁市場～弼雲大路", nameKr:"통인시장~필운대로", district:"鐘路區", districtKr:"종로구", flowers:["櫻花"], bloom:"4月初～4月末", length:1.0, type:"街道", lat:37.5790, lng:126.9700, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선", pop:"hidden" },
  { name:"清溪川路", nameKr:"청계천로", district:"鐘路區", districtKr:"종로구", flowers:["流蘇樹"], bloom:"5月初～6月初", length:1.2, type:"河邊", lat:37.5700, lng:126.9820, subway:"鐘閣站 1號線", subwayKr:"종각역 1호선" },
  { name:"水聲洞溪谷", nameKr:"수성동계곡", district:"鐘路區", districtKr:"종로구", flowers:["桃花","野花"], bloom:"4月中～6月初", length:0.5, type:"綠地", lat:37.5820, lng:126.9680, subway:"景福宮站 3號線", subwayKr:"경복궁역 3호선", pop:"hidden" },

  // === 中區 ===
  { name:"筆洞路", nameKr:"필동로", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.0, type:"街道", lat:37.5590, lng:126.9940, subway:"忠武路站 3·4號線", subwayKr:"충무로역 3,4호선" },
  { name:"南山公園環山路", nameKr:"남산공원 순환로", district:"中區", districtKr:"중구", flowers:["櫻花"], bloom:"4月中～4月末", length:5.0, type:"公園", lat:37.5512, lng:126.9882, subway:"明洞站 4號線", subwayKr:"명동역 4호선", pop:"hot" },
  { name:"首爾路7017", nameKr:"서울로7017", district:"中區", districtKr:"중구", flowers:["櫻花","木蓮","杜鵑","玫瑰"], bloom:"3月初～5月中", length:1.0, type:"街道", lat:37.5565, lng:126.9720, subway:"首爾站 1·4號線", subwayKr:"서울역 1,4호선" },
  { name:"清溪川邊", nameKr:"청계천변", district:"中區", districtKr:"중구", flowers:["迎春花","山茱萸","梅花"], bloom:"4月初～6月末", length:5.5, type:"河邊", lat:37.5690, lng:126.9780, subway:"乙支路入口站 2號線", subwayKr:"을지로입구역 2호선" },
  { name:"西小門歷史公園", nameKr:"서소문역사공원", district:"中區", districtKr:"중구", flowers:["鬱金香"], bloom:"4月～5月", length:0.2, type:"公園", lat:37.5590, lng:126.9690, subway:"忠正路站 2·5號線", subwayKr:"충정로역 2,5호선" },

  // === 龍山區 ===
  { name:"南山野外植物園", nameKr:"남산공원 야외식물원", district:"龍山區", districtKr:"용산구", flowers:["杜鵑","野花"], bloom:"4月中～6月初", length:1.0, type:"公園", lat:37.5510, lng:126.9870, subway:"梨泰院站 6號線", subwayKr:"이태원역 6호선" },

  // === 城東區 ===
  { name:"鷹峰公園（迎春花山）", nameKr:"응봉근린공원(응봉산)", district:"城東區", districtKr:"성동구", flowers:["迎春花"], bloom:"3月末～4月末", length:1.5, type:"公園", lat:37.5580, lng:127.0250, subway:"鷹峰站 京義中央線", subwayKr:"응봉역 경의중앙선" },
  { name:"鷹峰公園（櫻花）", nameKr:"응봉근린공원(금호산)", district:"城東區", districtKr:"성동구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.5, type:"公園", lat:37.5540, lng:127.0180, subway:"金湖站 3號線", subwayKr:"금호역 3호선" },
  { name:"首爾林", nameKr:"서울숲", district:"城東區", districtKr:"성동구", flowers:["櫻花","鬱金香"], bloom:"4月初～5月中", length:0.7, type:"公園", lat:37.5445, lng:127.0375, highlight:true, note:"Windhill 是 SNS 超人氣打卡點", subway:"首爾林站 盆唐線", subwayKr:"서울숲역 분당선", pop:"hot" },
  { name:"中浪川鷹峰（鬱金香）", nameKr:"중랑천 응봉지구", district:"城東區", districtKr:"성동구", flowers:["鬱金香","水仙花"], bloom:"4月中～5月末", length:1.2, type:"河邊", lat:37.5600, lng:127.0380, subway:"鷹峰站 京義中央線", subwayKr:"응봉역 경의중앙선" },
  { name:"松亭堤防", nameKr:"송정제방 수림대", district:"城東區", districtKr:"성동구", flowers:["櫻花","玫瑰"], bloom:"4月中～5月末", length:3.2, type:"河邊", lat:37.5650, lng:127.0480, subway:"龍踏站 2號線", subwayKr:"용답역 2호선" },

  // === 廣津區 ===
  { name:"華克山莊路", nameKr:"워커힐길", district:"廣津區", districtKr:"광진구", flowers:["櫻花"], bloom:"4月初～4月中", length:1.5, type:"街道", lat:37.5550, lng:127.1060, subway:"廣渡口站 5號線", subwayKr:"광나루역 5호선" },
  { name:"峨嵯山步道", nameKr:"아차산둘레길", district:"廣津區", districtKr:"광진구", flowers:["杜鵑花"], bloom:"3月末～5月中", length:4.0, type:"公園", lat:37.5620, lng:127.1040, subway:"峨嵯山站 5號線", subwayKr:"아차산역 5호선" },
  { name:"兒童大公園", nameKr:"어린이대공원", district:"廣津區", districtKr:"광진구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.5, type:"公園", lat:37.5480, lng:127.0790, subway:"兒童大公園站 7號線", subwayKr:"어린이대공원역 7호선", pop:"hot" },

  // === 東大門區 ===
  { name:"慶熙大學", nameKr:"경희대학교", district:"東大門區", districtKr:"동대문구", flowers:["櫻花","迎春花"], bloom:"4月初～6月中", length:2.0, type:"公園", lat:37.5960, lng:127.0520, subway:"回基站 1號線·京義中央線", subwayKr:"회기역 1호선, 경의중앙선", pop:"hot" },
  { name:"中浪川堤防", nameKr:"중랑천제방", district:"東大門區", districtKr:"동대문구", flowers:["櫻花","迎春花"], bloom:"4月初～4月中", length:3.0, type:"河邊", lat:37.5720, lng:127.0570, subway:"長漢坪站 5號線", subwayKr:"장한평역 5호선" },

  // === 中浪區 ===
  { name:"中浪川步道", nameKr:"묵등교~장평교", district:"中浪區", districtKr:"중랑구", flowers:["櫻花","玫瑰"], bloom:"4月中～6月中", length:5.15, type:"河邊", lat:37.5810, lng:127.0720, subway:"墨谷站 7號線", subwayKr:"먹골역 7호선" },
  { name:"忘憂里公園", nameKr:"망우리공원", district:"中浪區", districtKr:"중랑구", flowers:["櫻花"], bloom:"4月初～4月中", length:2.4, type:"公園", lat:37.5980, lng:127.0930, subway:"忘憂站 京義中央線", subwayKr:"망우역 경의중앙선", pop:"hidden" },

  // === 城北區 ===
  { name:"開運山公園", nameKr:"개운산근린공원", district:"城北區", districtKr:"성북구", flowers:["櫻花","杜鵑"], bloom:"4月初～5月中", length:3.0, type:"公園", lat:37.5870, lng:127.0280, subway:"安岩站 6號線", subwayKr:"안암역 6호선" },
  { name:"城北川", nameKr:"성북천", district:"城北區", districtKr:"성북구", flowers:["櫻花"], bloom:"4月～6月", length:2.5, type:"河邊", lat:37.5860, lng:127.0140, subway:"普門站 6號線", subwayKr:"보문역 6호선", pop:"hidden" },

  // === 江北區 ===
  { name:"牛耳川櫻花路", nameKr:"우이천 벚꽃길산책로", district:"江北區", districtKr:"강북구", flowers:["櫻花"], bloom:"3月～4月", length:1.3, type:"河邊", lat:37.6390, lng:127.0200, subway:"水踰站 4號線", subwayKr:"수유역 4호선", pop:"hidden" },
  { name:"北首爾夢之森", nameKr:"북서울 꿈의 숲", district:"江北區", districtKr:"강북구", flowers:["櫻花"], bloom:"4月中～4月末", length:4.0, type:"公園", lat:37.6200, lng:127.0340, subway:"彌阿站 4號線", subwayKr:"미아역 4호선" },
  { name:"五東公園", nameKr:"오동근린공원", district:"江北區", districtKr:"강북구", flowers:["杜鵑花"], bloom:"4月初～4月末", length:0.6, type:"公園", lat:37.6180, lng:127.0270, subway:"彌阿十字路口站 4號線", subwayKr:"미아사거리역 4호선" },

  // === 道峰區 ===
  { name:"牛耳川邊（道峰）", nameKr:"우이천변", district:"道峰區", districtKr:"도봉구", flowers:["櫻花","迎春花"], bloom:"4月初～4月末", length:1.2, type:"河邊", lat:37.6510, lng:127.0360, subway:"倉洞站 1·4號線", subwayKr:"창동역 1,4호선" },

  // === 蘆原區 ===
  { name:"牛耳川綠地帶", nameKr:"우이천변녹지대", district:"蘆原區", districtKr:"노원구", flowers:["櫻花","迎春花"], bloom:"3月末～5月初", length:1.5, type:"河邊", lat:37.6260, lng:127.0200, subway:"月桂站 1號線", subwayKr:"월계역 1호선" },
  { name:"堂峴川邊", nameKr:"당현천변", district:"蘆原區", districtKr:"노원구", flowers:["櫻花"], bloom:"4月中～6月初", length:3.0, type:"河邊", lat:37.6450, lng:127.0700, subway:"下溪站 7號線", subwayKr:"하계역 7호선" },
  { name:"慶春線林道", nameKr:"경춘선 숲길", district:"蘆原區", districtKr:"노원구", flowers:["櫻花"], bloom:"3月末～4月中", length:0.4, type:"街道", lat:37.6220, lng:127.0760, subway:"花郎臺站 6號線", subwayKr:"화랑대역 6호선", pop:"hidden" },

  // === 西大門區 ===
  { name:"安山自然公園", nameKr:"안산도시자연공원", district:"西大門區", districtKr:"서대문구", flowers:["櫻花","杜鵑","迎春花"], bloom:"4月初～4月末", length:2.0, type:"公園", lat:37.5670, lng:126.9430, subway:"獨立門站 3號線", subwayKr:"독립문역 3호선" },
  { name:"弘濟川邊", nameKr:"홍제천변", district:"西大門區", districtKr:"서대문구", flowers:["櫻花","迎春花"], bloom:"4月初～4月末", length:0.5, type:"河邊", lat:37.5720, lng:126.9360, subway:"弘濟站 3號線", subwayKr:"홍제역 3호선", pop:"hidden" },
  { name:"佛光川邊", nameKr:"불광천변", district:"西大門區", districtKr:"서대문구", flowers:["櫻花"], bloom:"4月中～6月初", length:2.9, type:"河邊", lat:37.5780, lng:126.9150, subway:"鷹岩站 6號線", subwayKr:"응암역 6호선", pop:"hidden" },
  { name:"延世路名物街", nameKr:"연세로 명물거리", district:"西大門區", districtKr:"서대문구", flowers:["櫻花"], bloom:"4月～5月", length:0.8, type:"街道", lat:37.5575, lng:126.9370, subway:"新村站 2號線", subwayKr:"신촌역 2호선" },

  // === 恩平區 ===
  { name:"恩平韓屋村", nameKr:"은평한옥마을", district:"恩平區", districtKr:"은평구", flowers:["櫻花"], bloom:"3月中～5月初", length:1.2, type:"街道", lat:37.6370, lng:126.9220, subway:"延新內站 3·6號線 轉公車", subwayKr:"연신내역 3,6호선", pop:"hidden" },
  { name:"昌陵川邊", nameKr:"창릉천변", district:"恩平區", districtKr:"은평구", flowers:["櫻花"], bloom:"3月中～7月初", length:2.0, type:"河邊", lat:37.6400, lng:126.9250, subway:"舊把撥站 3號線", subwayKr:"구파발역 3호선" },

  // === 麻浦區 ===
  { name:"土亭路櫻花街", nameKr:"토정로 37길", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"4月初～4月中", length:0.4, type:"街道", lat:37.5470, lng:126.9460, subway:"麻浦站 5號線", subwayKr:"마포역 5호선", pop:"hidden" },
  { name:"臥牛公園", nameKr:"와우근린공원", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"4月初～4月中", length:1.1, type:"公園", lat:37.5530, lng:126.9320, subway:"新村站 2號線", subwayKr:"신촌역 2호선" },
  { name:"京義線林道", nameKr:"경의선숲길", district:"麻浦區", districtKr:"마포구", flowers:["櫻花"], bloom:"3月末～4月末", length:0.8, type:"街道", lat:37.5480, lng:126.9500, subway:"孔德站 5·6號線·京義中央線", subwayKr:"공덕역 5,6호선,경의중앙선", pop:"hidden" },
  { name:"天空公園", nameKr:"하늘공원", district:"麻浦區", districtKr:"마포구", flowers:["迎春花"], bloom:"4月初～4月末", length:2.0, type:"公園", lat:37.5680, lng:126.8850, subway:"世界盃體育場站 6號線", subwayKr:"월드컵경기장역 6호선" },

  // === 陽川區 ===
  { name:"安養川堤防", nameKr:"안양천 제방", district:"陽川區", districtKr:"양천구", flowers:["櫻花"], bloom:"4月中～4月末", length:2.0, type:"河邊", lat:37.5260, lng:126.8720, subway:"楊坪站 5號線", subwayKr:"양평역 5호선" },
  { name:"西首爾湖水公園", nameKr:"서서울 호수공원", district:"陽川區", districtKr:"양천구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.6, type:"公園", lat:37.5280, lng:126.8430, subway:"喜鵲山站 2·5號線 步行15分", subwayKr:"까치산역 2,5호선" },

  // === 江西區 ===
  { name:"放花公園", nameKr:"방화공원", district:"江西區", districtKr:"강서구", flowers:["櫻花"], bloom:"4月中～4月末", length:2.0, type:"公園", lat:37.5770, lng:126.8200, subway:"傍花站 5號線", subwayKr:"방화역 5호선" },
  { name:"首爾植物園", nameKr:"서울식물원", district:"江西區", districtKr:"강서구", flowers:["鬱金香","水仙花"], bloom:"4月中旬", length:0.8, type:"公園", lat:37.5680, lng:126.8350, highlight:true, note:"園內鬱金香花海超壯觀", subway:"麻谷渡口站 9號線", subwayKr:"마곡나루역 9호선", pop:"hot" },
  { name:"牛裝山公園", nameKr:"우장산공원", district:"江西區", districtKr:"강서구", flowers:["迎春花","杜鵑"], bloom:"4月初～4月末", length:4.0, type:"公園", lat:37.5430, lng:126.8360, subway:"花谷站 5號線", subwayKr:"화곡역 5호선" },

  // === 九老區 ===
  { name:"道林川堤防", nameKr:"도림천 제방", district:"九老區", districtKr:"구로구", flowers:["櫻花","杜鵑","迎春花"], bloom:"4月初～6月初", length:1.0, type:"河邊", lat:37.5090, lng:126.8890, subway:"新道林站 1·2號線", subwayKr:"신도림역 1,2호선" },
  { name:"安養川堤防（九老）", nameKr:"안양천 제방", district:"九老區", districtKr:"구로구", flowers:["櫻花","迎春花"], bloom:"4月初～6月初", length:2.0, type:"河邊", lat:37.5020, lng:126.8680, subway:"九一站 1號線", subwayKr:"구일역 1호선" },

  // === 衿川區 ===
  { name:"櫻花路（獨山站～加山站）", nameKr:"벚꽃로", district:"衿川區", districtKr:"금천구", flowers:["櫻花"], bloom:"4月中～4月末", length:3.4, type:"街道", lat:37.4750, lng:126.8930, subway:"獨山站 1號線", subwayKr:"독산역 1호선" },

  // === 永登浦區 ===
  { name:"★ 汝矣島輪中路", nameKr:"여의도 윤중로", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花"], bloom:"4月中～4月末", length:6.9, type:"街道", lat:37.5260, lng:126.9220, highlight:true, note:"首爾最著名的櫻花大道！每年春花祭吸引百萬人潮", subway:"汝矣渡口站 5號線", subwayKr:"여의나루역 5호선", pop:"hot" },
  { name:"安養川堤防（永登浦）", nameKr:"안양천 제방", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花","迎春花","杜鵑"], bloom:"3月末～4月中", length:3.0, type:"河邊", lat:37.5300, lng:126.8800, subway:"楊坪站 5號線", subwayKr:"양평역 5호선" },
  { name:"大林路", nameKr:"대림로", district:"永登浦區", districtKr:"영등포구", flowers:["櫻花"], bloom:"3月末～6月初", length:2.0, type:"街道", lat:37.4930, lng:126.9010, subway:"大林站 2·7號線", subwayKr:"대림역 2,7호선" },

  // === 銅雀區 ===
  { name:"顯忠院", nameKr:"현충원", district:"銅雀區", districtKr:"동작구", flowers:["櫻花","迎春花"], bloom:"4月初～5月", length:2.5, type:"公園", lat:37.5010, lng:126.9780, note:"垂枝櫻花特別美", subway:"銅雀站 4號線", subwayKr:"동작역 4호선" },
  { name:"寶拉美公園", nameKr:"보라매공원", district:"銅雀區", districtKr:"동작구", flowers:["櫻花"], bloom:"4月", length:0.2, type:"公園", lat:37.4930, lng:126.9220, subway:"寶拉美站 7號線", subwayKr:"보라매역 7호선" },

  // === 冠岳區 ===
  { name:"道林川（冠岳）", nameKr:"도림천", district:"冠岳區", districtKr:"관악구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.0, type:"河邊", lat:37.4870, lng:126.9130, subway:"新大方站 7號線", subwayKr:"신대방역 7호선" },
  { name:"冠岳山", nameKr:"관악산", district:"冠岳區", districtKr:"관악구", flowers:["杜鵑"], bloom:"4月中～5月中", length:1.5, type:"公園", lat:37.4430, lng:126.9640, subway:"冠岳站 1號線 步行20分", subwayKr:"관악역 1호선" },
  { name:"南谷路", nameKr:"난곡로", district:"冠岳區", districtKr:"관악구", flowers:["櫻花"], bloom:"4月中～4月末", length:3.0, type:"街道", lat:37.4810, lng:126.9180, subway:"新大方站 7號線", subwayKr:"신대방역 7호선" },

  // === 瑞草區 ===
  { name:"牛眠山步道", nameKr:"우면산 둘레길", district:"瑞草區", districtKr:"서초구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.5, type:"公園", lat:37.4720, lng:126.9870, subway:"舍堂站 2·4號線", subwayKr:"사당역 2,4호선" },
  { name:"良才川邊", nameKr:"양재천변", district:"瑞草區", districtKr:"서초구", flowers:["迎春花","櫻花"], bloom:"4月初～4月末", length:2.5, type:"河邊", lat:37.4710, lng:127.0380, subway:"良才站 3號線·新盆唐線", subwayKr:"양재역 3호선, 신분당선" },
  { name:"盤浦川邊", nameKr:"반포천변", district:"瑞草區", districtKr:"서초구", flowers:["櫻花","杜鵑"], bloom:"4月中～5月中", length:1.2, type:"河邊", lat:37.5060, lng:127.0060, subway:"高速巴士客運站 3·7·9號線", subwayKr:"고속터미널역 3,7,9호선" },
  { name:"蒙馬特公園", nameKr:"몽마르뜨공원", district:"瑞草區", districtKr:"서초구", flowers:["迎春花","櫻花"], bloom:"4月初～4月末", length:0.5, type:"公園", lat:37.4860, lng:126.9960, subway:"方背站 2號線", subwayKr:"방배역 2호선" },
  { name:"盤浦瑞來島", nameKr:"반포서래섬", district:"瑞草區", districtKr:"서초구", flowers:["油菜花"], bloom:"4月末～5月末", length:2.0, type:"公園", lat:37.5110, lng:127.0100, note:"漢江邊最美油菜花田", subway:"高速巴士客運站 3·7·9號線", subwayKr:"고속터미널역 3,7,9호선" },
  { name:"清溪山杜鵑稜線", nameKr:"청계산 진달래능선", district:"瑞草區", districtKr:"서초구", flowers:["杜鵑花"], bloom:"4月中～4月末", length:0.9, type:"公園", lat:37.4400, lng:127.0540, subway:"清溪山入口站 新盆唐線", subwayKr:"청계산입구역 신분당선" },

  // === 江南區 ===
  { name:"良才川堤防（江南）", nameKr:"양재천 제방", district:"江南區", districtKr:"강남구", flowers:["櫻花","迎春花"], bloom:"3月末～4月末", length:2.5, type:"河邊", lat:37.4820, lng:127.0450, subway:"道谷站 3號線·盆唐線", subwayKr:"도곡역 3호선, 분당선" },
  { name:"開浦路", nameKr:"개포로", district:"江南區", districtKr:"강남구", flowers:["櫻花"], bloom:"4月中～5月初", length:1.5, type:"街道", lat:37.4880, lng:127.0710, subway:"大廳站 3號線", subwayKr:"대청역 3호선" },

  // === 松坡區 ===
  { name:"★ 石村湖水", nameKr:"석촌호수(송파나루공원)", district:"松坡區", districtKr:"송파구", flowers:["櫻花","杜鵑"], bloom:"4月中～6月初", length:2.5, type:"公園", lat:37.5100, lng:127.1025, highlight:true, note:"樂天世界旁！2026 櫻花祭 4/3～4/11", subway:"蠶室站 2·8號線", subwayKr:"잠실역 2,8호선", pop:"hot" },
  { name:"城內川", nameKr:"성내천 둔치", district:"松坡區", districtKr:"송파구", flowers:["櫻花"], bloom:"4月中～4月末", length:1.8, type:"河邊", lat:37.5170, lng:127.1250, subway:"奧林匹克公園站 5·9號線", subwayKr:"올림픽공원역 5,9호선" },
  { name:"炭川堤防", nameKr:"탄천제방", district:"松坡區", districtKr:"송파구", flowers:["迎春花"], bloom:"4月初～4月末", length:5.7, type:"河邊", lat:37.5050, lng:127.1020, subway:"蠶室站 2·8號線", subwayKr:"잠실역 2,8호선" },

  // === 江東區 ===
  { name:"奧林匹克路", nameKr:"올림픽로", district:"江東區", districtKr:"강동구", flowers:["櫻花"], bloom:"4月中～4月末", length:0.7, type:"街道", lat:37.5380, lng:127.1230, subway:"千戶站 5·8號線", subwayKr:"천호역 5,8호선" },
  { name:"香草天文公園", nameKr:"허브천문공원", district:"江東區", districtKr:"강동구", flowers:["薰衣草"], bloom:"4月初～6月初", length:0.3, type:"公園", lat:37.5330, lng:127.1410, subway:"明逸站 5號線", subwayKr:"명일역 5호선" },

  // === 果川市 ===
  { name:"★ 首爾大公園", nameKr:"서울대공원", district:"果川市", districtKr:"경기도 과천시", flowers:["櫻花","鬱金香"], bloom:"4月中～5月末", length:7.0, type:"公園", lat:37.4270, lng:127.0130, highlight:true, note:"首爾近郊最大！7公里櫻花步道＋鬱金香花海", subway:"大公園站 4號線", subwayKr:"대공원역 4호선", pop:"hot" }
];

// 花種分類
var FLOWER_CATEGORIES = {
  cherry:    { label:"櫻花",   emoji:"🌸", keywords:["櫻花","王櫻花","垂櫻"] },
  forsythia: { label:"迎春花", emoji:"💛", keywords:["迎春花"] },
  azalea:    { label:"杜鵑花", emoji:"🌺", keywords:["杜鵑花","杜鵑","金達萊","映山紅"] },
  tulip:     { label:"鬱金香", emoji:"🌷", keywords:["鬱金香"] },
  rapeseed:  { label:"油菜花", emoji:"🟡", keywords:["油菜花"] },
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
function getMarkerEmoji(cat) {
  return {cherry:"🌸",forsythia:"💛",azalea:"🌺",tulip:"🌷",rapeseed:"🟡",other:"🌿"}[cat]||"🌸";
}
function getTypeEmoji(type) {
  return {"公園":"🌳","街道":"🛣️","河邊":"🌊","綠地":"🌿"}[type]||"📍";
}
