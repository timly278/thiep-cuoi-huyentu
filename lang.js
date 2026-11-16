/* Bản tiếng Anh của thiệp (cho khách nước ngoài).
   Dùng: thêm &lang=en vào link, ví dụ  .../?venue=nha-gai&lang=en
   - Không có tham số lang => giữ nguyên tiếng Việt, file này không đổi gì.
   - Từ điển D: khóa là câu tiếng Việt đúng như trong index.html, giá trị là bản tiếng Anh.
   - Sửa câu chữ tiếng Anh ở đây; thêm câu mới trong index.html thì thêm một dòng vào D. */
(function () {
  'use strict';
  var m = location.search.match(/[?&]lang=(en|vi)/);
  var EN = !!m && m[1] === 'en';
  var I = window.I18N = { en: EN, lang: EN ? 'en' : 'vi' };
  I.T = function (s) { return s; };
  I.thanks = null;
  I.fallback = null;

  /* Nút chuyển ngôn ngữ (có cả ở bản tiếng Việt, để khách tự đổi) */
  function addSwitch() {
    var b = document.createElement('a');
    b.id = 'langBtn';
    b.setAttribute('aria-label', EN ? 'Language' : 'Ngôn ngữ');
    b.innerHTML = '<span' + (EN ? '' : ' class="on"') + '>VI</span><i></i><span' + (EN ? ' class="on"' : '') + '>EN</span>';
    var q = location.search.replace(/([?&])lang=(en|vi)(&|$)/, function (_, a, __, c) { return c ? a : ''; }).replace(/[?&]$/, '');
    var next = EN ? 'vi' : 'en';
    b.href = location.pathname + (q ? q + '&' : '?') + 'lang=' + next + location.hash;
    b.addEventListener('click', function (e) { e.stopPropagation(); });
    var st = document.createElement('style');
    st.textContent = '#langBtn{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:10px;z-index:120;display:flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;border:1px solid rgba(184,146,74,.8);background:rgba(255,250,240,.92);color:#8A7060;font:600 12px/1 "Noto Serif",Georgia,serif;letter-spacing:.12em;text-decoration:none;box-shadow:0 4px 12px rgba(110,80,50,.14);-webkit-tap-highlight-color:transparent}' +
      '.tl-time{white-space:nowrap}' +
      '#langBtn i{width:1px;height:11px;background:rgba(184,146,74,.7)}#langBtn .on{color:#A63A50}';
    document.head.appendChild(st);
    document.body.appendChild(b);
  }
  if (document.body) addSwitch(); else document.addEventListener('DOMContentLoaded', addSwitch);

  if (!EN) return;
  document.documentElement.lang = 'en';

  var D = {
    /* --- phong bì / bìa --- */
    'Bấm vào để xem thiệp': 'Tap to open our invitation',
    'Mở thiệp': 'Open the invitation',
    'Phong bì thiệp cưới': 'Wedding invitation envelope',
    'Thiệp mời': 'Wedding Invitation',
    '24 . 12 . 2026': '24 December 2026',
    'Năm Trại • Quốc Oai • Hà Nội': 'Năm Trại • Quốc Oai • Hanoi',
    'Thái Khê • Kiều Phú • Hà Nội': 'Thái Khê • Kiều Phú • Hanoi',

    /* --- cô dâu, chú rể --- */
    'Chú rể': 'Groom',
    'Cô dâu': 'Bride',
    'Trân trọng kính mời': 'You Are Warmly Invited',
    'Tư gia hai họ': 'Our Two Families',
    'Tư gia nhà gái': 'The Bride’s Family Home',
    'Nhà gái': 'The Bride’s Family',
    'Nhà trai': 'The Groom’s Family',
    'Năm Trại, xã Quốc Oai,<br>TP Hà Nội': 'Năm Trại, Quốc Oai Commune,<br>Hanoi',
    'Thái Khê, xã Kiều Phú,<br>TP Hà Nội': 'Thái Khê, Kiều Phú Commune,<br>Hanoi',
    'Thời gian lễ': 'Celebration Details',
    '17:00': '5:00 PM',
    'Tiệc mừng tại tư gia nhà gái': 'Wedding celebration at the bride’s family home',
    'Tiệc mừng tại tư gia nhà trai': 'Wedding celebration at the groom’s family home',
    'Thứ Tư, 23.12.2026': 'Wednesday, 23 December 2026',
    'Thứ Năm, 24.12.2026': 'Thursday, 24 December 2026',
    '15 tháng 11 âm lịch': '15th day of the 11th lunar month',
    '16 tháng 11 âm lịch': '16th day of the 11th lunar month',
    'Cùng chúng mình làm lễ thành hôn': 'Join us in celebrating our wedding',

    /* --- thời gian & địa điểm --- */
    'Thời gian & địa điểm': 'Date & Venue',
    'Ngày vui của chúng mình': 'Our Special Day',
    '23.12.2026': '23 Dec 2026',
    '24.12.2026': '24 Dec 2026',
    'Tháng 12 · 2026': 'December 2026',
    'T2': 'Mo', 'T3': 'Tu', 'T4': 'We', 'T5': 'Th', 'T6': 'Fr', 'T7': 'Sa', 'CN': 'Su',
    'Ngày': 'Days', 'Giờ': 'Hours', 'Phút': 'Minutes', 'Giây': 'Seconds',
    'Thời gian': 'Time',
    'Địa điểm': 'Venue',
    'Chỉ đường': 'Get directions',
    'Thứ Tư, ngày 23.12.2026': 'Wednesday, 23 December 2026',
    'Thứ Năm, ngày 24.12.2026': 'Thursday, 24 December 2026',
    'Âm lịch: 15 tháng 11 năm Bính Ngọ': 'Lunar calendar: 15th day of the 11th month, Year of the Horse (Bính Ngọ)',
    'Âm lịch: 16 tháng 11 năm Bính Ngọ': 'Lunar calendar: 16th day of the 11th month, Year of the Horse (Bính Ngọ)',
    'Tư gia nhà trai': 'The Groom’s Family Home',
    'Trại Thụy, thôn Năm Trại, xã Quốc Oai, TP Hà Nội': 'Trại Thụy, Năm Trại Hamlet, Quốc Oai Commune, Hanoi',
    'Thái Khê, xã Kiều Phú, TP Hà Nội': 'Thái Khê, Kiều Phú Commune, Hanoi',
    'Ngày được tô đậm: ': 'Highlighted: ',
    'Tiệc nhà gái · 23.12': 'Bride’s family celebration · 23 Dec',
    'Tiệc nhà trai · 24.12': 'Groom’s family celebration · 24 Dec',
    'Hôm nay là ngày vui của chúng mình!': 'Today is our special day!',

    /* --- chuyện của chúng mình --- */
    'Chuyện của chúng mình': 'Our Story',
    'Mỗi câu chuyện đẹp đều bắt đầu từ một khoảnh khắc nhỏ.': 'Every beautiful story begins with a small moment.',
    'Quen biết': 'First Acquaintance',
    'Xuất phát từ hai người bạn học chung trường cấp 3, tuy biết mặt nhưng chúng mình chưa nói chuyện bao giờ ^^':
      'We were schoolmates at the same high school. We knew each other by sight, yet never once exchanged a word ^^',
    'Gặp gỡ': 'Crossing Paths',
    'Có duyên học chung trường đại học, thi thoảng có bắt gặp nhau ở trường. Nhưng thời gian ấy, ai cũng mải lo lắng với thế giới riêng và các mối quan hệ của mình.':
      'By happy chance, we later attended the same university and would occasionally pass each other on campus. Back then, though, each of us was absorbed in our own world and our own circle of friends.',
    'Yêu thương': 'Falling in Love',
    'Trời xui thế nào chúng mình lại đi niềng răng chung một chỗ, đằng trai thì hứa là khi nào tháo niềng sẽ mời đằng gái đi ăn. Và rồi bén duyên với nhau kể từ đây…':
      'As fate would have it, we both ended up getting braces at the same clinic. He promised to treat her to a meal once his braces came off. And from that day on, our story quietly began…',
    'Chung đôi': 'Together',
    'ALBUM ẢNH CƯỚI': 'WEDDING ALBUM',
    'Ảnh cưới cập nhật sau': 'Wedding photos coming soon',
    'Và rồi, chúng mình quyết định nắm tay nhau đi tiếp quãng đường phía trước.': 'And so we decided to hold hands and walk the road ahead together.',
    'Khoảnh khắc của chúng mình': 'Our Moments',
    'Khoảnh khắc': 'Moments',
    'Ảnh trước': 'Previous photo',
    'Ảnh sau': 'Next photo',
    'Xem ảnh': 'View photo',
    'Đóng': 'Close',

    /* --- lời chúc --- */
    'Lời chúc từ mọi người': 'Wishes from Our Loved Ones',
    'Lời chúc trước': 'Previous wish',
    'Lời chúc sau': 'Next wish',
    'Khách mời': 'Guest',

    /* --- xác nhận tham dự --- */
    'Xác nhận tham dự & lời chúc': 'RSVP & Well Wishes',
    'Bạn sẽ đến chứ?': 'Will you join us?',
    'Xin bạn cho gia đình biết sớm để chúng mình chuẩn bị chu đáo hơn, và gửi cho chúng mình đôi lời chúc nhé.':
      'Kindly let us know as soon as you can so that we may prepare with care, and do leave us a few words of blessing.',
    'Họ và tên': 'Full name',
    'Nhập họ và tên': 'Enter your full name',
    'Bạn có tham dự không?': 'Will you be attending?',
    'Có, mình sẽ đến': 'Yes, I will be there',
    'Rất tiếc, mình bận': 'Regretfully, I am unable to attend',
    'Bạn dự buổi tiệc nào?': 'Which celebration will you attend?',
    'Nhà gái · 23.12': 'Bride’s side · 23 Dec',
    'Nhà trai · 24.12': 'Groom’s side · 24 Dec',
    'Cả hai': 'Both',
    'Số người đi cùng': 'Number of guests accompanying you',
    '6 trở lên': '6 or more',
    'Lời chúc': 'Your message',
    'Gửi đôi lời chúc đến cô dâu và chú rể...': 'Leave a few kind words for the bride and groom...',
    'Gửi xác nhận & lời chúc': 'Send RSVP & wishes',
    'Đang gửi…': 'Sending…',
    'Bạn vui lòng nhập họ và tên nhé.': 'Please enter your name.',
    'Cảm ơn bạn!': 'Thank you!',
    'Gia đình đã nhận được xác nhận của bạn.': 'We have received your reply.',
    'Mở trang gửi': 'Open the form page',

    /* --- hộp quà --- */
    'Hộp quà mừng': 'Wedding Gifts',
    'Gửi quà mừng cưới': 'Send a Wedding Gift',
    'Sự hiện diện của bạn là món quà quý nhất. Nếu bạn muốn gửi thêm lời chúc phúc, hãy bấm vào hộp quà.':
      'Your presence is the most precious gift of all. Should you wish to send your blessings, please tap the gift box.',
    'Mở hộp quà nhà gái': 'Open the bride’s family gift box',
    'Mở hộp quà nhà trai': 'Open the groom’s family gift box',
    'Mã QR chuyển khoản Techcombank nhà gái': 'QR code for bank transfer to the bride’s family (Techcombank)',
    'Mã QR chuyển khoản Techcombank nhà trai': 'QR code for bank transfer to the groom’s family (Techcombank)',
    'Quét bằng ứng dụng ngân hàng': 'Scan with your banking app',
    'SỐ TÀI KHOẢN': 'ACCOUNT NUMBER',
    'CHỦ TÀI KHOẢN': 'ACCOUNT HOLDER',
    'Sao chép số tài khoản': 'Copy account number',
    'Chưa có số tài khoản': 'Account number not available yet',
    'Hãy chạm giữ số tài khoản để sao chép': 'Press and hold the account number to copy it',
    'Đã sao chép': 'Copied',

    /* --- cuối thiệp, nhạc --- */
    'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi.': 'Your presence is a great honour to our families.',
    'Bật/tắt nhạc': 'Toggle music'
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  var ROLE = { 'Cô dâu': 'Bride', 'Chú rể': 'Groom' };

  I.T = function (s) {
    if (typeof s !== 'string') return s;
    if (Object.prototype.hasOwnProperty.call(D, s)) return D[s];
    var k = norm(s), r, mm;
    if (Object.prototype.hasOwnProperty.call(D, k)) return D[k];
    if ((mm = k.match(/^(Ông|Bà) (.+)$/))) return (mm[1] === 'Ông' ? 'Mr. ' : 'Mrs. ') + mm[2];
    if ((mm = k.match(/^(.+) · ảnh (\d+)$/))) return I.T(mm[1]) + ' · photo ' + mm[2];
    if ((mm = k.match(/^(Cô dâu|Chú rể) (.+)$/))) return ROLE[mm[1]] + ' ' + mm[2];
    if ((mm = k.match(/^(Cô dâu|Chú rể)$/))) return ROLE[mm[1]];
    return s;
  };

  I.thanks = function (d) {
    var side = d.side === 'Cả hai' ? 'both of our families’ celebrations'
      : d.side === 'Nhà gái' ? 'the celebration hosted by the bride’s family'
      : d.side === 'Nhà trai' ? 'the celebration hosted by the groom’s family' : 'our celebration';
    return d.att === 'Có'
      ? 'Thank you, ' + d.name + '! We look forward to welcoming you at ' + side + '.'
      : 'Thank you, ' + d.name + ', for letting us know. We wish you peace and happiness always.';
  };
  I.fallback = function (d) {
    return 'Thank you, ' + d.name + '! Please tap the button below and press “Submit” on the Google page to complete your reply. ';
  };
  I.countNote = function (time, day) { return 'until the celebration begins at ' + I.T(time) + ' on ' + day + ' December 2026'; };

  /* Dịch phần chữ có sẵn trong HTML */
  function apply() {
    /* các ô "Số người đi cùng": giữ nguyên giá trị gửi đi (tiếng Việt) cho Google Form, làm trước khi dịch chữ */
    Array.prototype.forEach.call(document.querySelectorAll('option'), function (o) {
      if (!o.hasAttribute('value')) o.setAttribute('value', o.textContent);
    });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) {
      var p = n.parentNode && n.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE' || p === 'TEXTAREA' || (n.parentNode && n.parentNode.id === 'langBtn')) continue;
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest('#langBtn')) continue;
      list.push(n);
    }
    list.forEach(function (t) {
      var k = norm(t.nodeValue);
      if (!k) return;
      var r = I.T(k);
      if (r !== k) t.nodeValue = t.nodeValue.replace(k, r);
    });
    /* tab chọn nhà: dùng chữ ngắn */
    Array.prototype.forEach.call(document.querySelectorAll('.tab[data-v]'), function (b) {
      var t = b.firstChild; if (t && t.nodeType === 3) t.nodeValue = b.dataset.v === 'gai' ? 'Bride’s side' : 'Groom’s side';
    });
    ['placeholder', 'aria-label', 'alt', 'title', 'data-name'].forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll('[' + a + ']'), function (e) {
        var v = e.getAttribute(a), r = I.T(v);
        if (r !== v) e.setAttribute(a, r);
      });
    });
  }
  apply();
})();
