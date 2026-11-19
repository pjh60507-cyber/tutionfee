/* =========================================================
   디퍼2_등록금 — 인터랙션
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- 라운드 데이터 (Figma R1~R5) ---------- */
const ROUNDS = [
  { q: '비용이 얼마나 들어갈까?',               a: '환경이 주는<br>기회비용 생각하기',      b: '지방에서<br>생활비 아끼기' },
  { q: '대학 밖의 경험은 얼마나 중요할까?',      a: '문화생활의<br>중심지에서<br>살아보는 경험', b: '필요한 경우에<br>골라가기' },
  { q: '대학을 선택할 때 어떤 정책이 기준이 될까?', a: '이미 갖춰진<br>교육·연구 인프라',      b: '앞으로 확대될<br>산학협력' },
  { q: '어디에서 졸업해야 취업자리가 더 유리하지?', a: '서울에서 취업기회<br>미리 잡기',       b: '졸업 후<br>원하는 곳으로<br>이동하기' },
  { q: '어디서 일하든 소득은 같을까?',            a: '수도권에서 더 높은<br>소득 기대하기',     b: '원하는 지역에서<br>안정적인 소득 얻기' }
];

/* 1920×1080 프레임 좌표 → 컨테이너 단위 */
const K = n => `calc(${n} * var(--k))`;
const box = (x, y, w, h) => `left:${K(x)};top:${K(y)};width:${K(w)};height:${K(h)}`;

/* 호버 화면 위에 덧씌우는 애니메이션 그래프 */
function pieChart(cx, cy, c1, c2) {
  const r = 193;
  return `
    <div class="pie-cover" style="${box(cx - 205, cy - 205, 410, 410)}"></div>
    <div class="pie" style="${box(cx - r, cy - r, r * 2, r * 2)};--c1:${c1};--c2:${c2}"></div>
    <div class="pie-l" style="left:${K(cx - 205)};top:${K(cy - 66)};width:${K(210)}"><small>비수도권</small><b>44.1<i>%</i></b><em>(321건)</em></div>
    <div class="pie-l" style="left:${K(cx - 8)};top:${K(cy - 66)};width:${K(210)}"><small>수도권</small><b>55.9<i>%</i></b><em>(407건)</em></div>`;
}
function barChart() {
  const base = 632, k = 0.0967;
  const d = [[405, 2073, '#DCDCDC', '#8A8A8A'], [560, 2229, 'var(--green)', 'var(--green)'], [675, 1939, 'var(--yellow)', 'var(--yellow-t)'],
             [829, 1887, 'var(--green)', 'var(--green)'], [944, 2669, 'var(--yellow)', 'var(--yellow-t)']];
  return `<div class="bars-cover" style="${box(300, 340, 760, base - 340)}">` +
    d.map(([x, v, c, tc], i) =>
      `<div class="bar" style="left:${K(x - 46 - 300)};--h:${K(Math.round(v * k))};background:${c};animation-delay:${0.15 + i * 0.12}s"><b style="color:${tc}">${v.toLocaleString('ko-KR')}</b></div>`
    ).join('') + `</div>`;
}
function receipt(side, mobile = false) {
  const A = side === 'a';
  const rows = A
    ? [['등록금', 3293], ['월세 및 관리비(월 55만)', 2640], ['식비(월 40만)', 1920], ['교통비(월 5만)', 240], ['생활비(월 15만)', 720], ['재료비 및 학습비', 400]]
    : [['등록금', 0], ['주거비', 0], ['식비(월 30만)', 1440], ['교통비(월 10만)', 480], ['생활비(월 10만)', 480], ['재료비 및 학습비', 400]];
  const total = A ? 9213 : 2800;
  return `<div class="rc ${side}${mobile ? ' m' : ''}" ${mobile ? '' : `style="${box(428, 296, 464, 604)}"`}>
    <h4>${A ? 'A' : 'B'}대학 예상 지출금액</h4>
    <p class="sub">재학기간: 4년 / 보증금 및 공과금, 장학금 제외</p>
    ${rows.map(([t, v], i) => `<div class="row" style="top:${K(140 + i * 52)};--i:${i}"><span>${t}</span><span><b>${v.toLocaleString('ko-KR')}</b><small>만원</small></span></div>`).join('')}
    <i class="div"></i>
    <div class="tot"><span>총액</span><span>약 <b data-count="${total}">${total.toLocaleString('ko-KR')}</b> 만원</span></div>
  </div>`;
}
/* 모바일 시트용: 카드 전체를 HTML로 그린 그래프 */
function pieCard(side) {
  const A = side === 'a';
  const c1 = A ? 'var(--green)' : '#DEDEDE', c2 = A ? '#DEDEDE' : 'var(--yellow)';
  return `<div class="card-pie">
    <h4>지역별 전시회 개최 비중</h4><p class="sub">(수도권 · 비수도권 비교 2024년 기준)</p>
    <div class="pie" style="${box(77, 150, 386, 386)};--c1:${c1};--c2:${c2}"></div>
    <div class="pie-l" style="left:${K(62)};top:${K(277)};width:${K(210)}"><small>비수도권</small><b>44.1<i>%</i></b><em>(321건)</em></div>
    <div class="pie-l" style="left:${K(262)};top:${K(277)};width:${K(210)}"><small>수도권</small><b>55.9<i>%</i></b><em>(407건)</em></div>
    <p class="src">출처: 한국전시산업진흥회, 2024년 전시산업통계조사, 전시컨벤션센터 위주의 시설<br>※ 지역 미분류 기타 시설 8건 제외 · 비교 대상 728건</p>
  </div>`;
}
function barCard() {
  const base = 373, k = 0.0967;
  const d = [[139, 2073, '#DCDCDC', '#8A8A8A', '전체'], [294, 2229, 'var(--green)', 'var(--green)', '수도권'], [409, 1939, 'var(--yellow)', 'var(--yellow-t)', '비수도권'],
             [563, 1887, 'var(--green)', 'var(--green)', '사립'], [678, 2669, 'var(--yellow)', 'var(--yellow-t)', '국공립']];
  return `<div class="card-bar"><h4>2025년 학생 1인당 교육비 현황<span>(만 원)</span></h4>
    <i class="axis"></i>` +
    d.map(([x, v, c, tc, l], i) =>
      `<div class="bar" style="left:${K(x - 46)};bottom:${K(488 - base)};--h:${K(Math.round(v * k))};background:${c};animation-delay:${0.15 + i * 0.12}s"><b style="color:${tc}">${v.toLocaleString('ko-KR')}</b></div>
       <span class="xl" style="left:${K(x - 70)}">${l}</span>`).join('') +
    `<span class="grp" style="left:${K(294)};width:${K(115)}"></span><span class="gl" style="left:${K(251)}">지역별</span>
     <span class="grp" style="left:${K(563)};width:${K(115)}"></span><span class="gl" style="left:${K(520)}">설립 유형별</span></div>`;
}
const SHEET = {   // 모바일에서 세로로 쌓이는 의견 화면 구성
  '1a': [['html', () => receipt('a', true)], ['img', '1a-0'], ['img', '1a-1']],
  '1b': [['html', () => receipt('b', true)], ['img', '1b-0'], ['img', '1b-1']],
  '2a': [['img', '2a-0'], ['html', () => pieCard('a')], ['img', '2a-1']],
  '2b': [['img', '2b-0'], ['img', '2b-1'], ['html', () => pieCard('b')]],
  '3a': [['html', barCard], ['img', '3a-0'], ['img', '3a-1']],
  '3b': [['img', 'h1'], ['img', '3b-0'], ['img', 'h2'], ['img', 'h3'], ['img', '3b-1']],
  '4a': [['img', '4a-0'], ['img', '4a-1'], ['img', '4a-2']],
  '4b': [['img', '4b-0'], ['img', '4b-1'], ['img', '4b-2']],
  '5a': [['img', '5a-0'], ['img', '5a-1'], ['img', '5a-2']],
  '5b': [['img', '5b-0'], ['img', '5b-1'], ['img', '5b-2']]
};

const EXTRA = {
  '1a': receipt('a'),
  '1b': receipt('b'),
  '2a': pieChart(1312, 605, 'var(--green)', '#DEDEDE'),
  '2b': pieChart(1312, 591, '#DEDEDE', 'var(--yellow)'),
  '3a': barChart()
};

/* ---------- 라운드 화면 생성 ---------- */
const track = $('#track'), overlays = $('#overlays'), steps = $('#steps');
ROUNDS.forEach((r, i) => {
  const n = i + 1, cls = n === 1 ? 'r1' : 'rn';
  const momImg = n === 1 ? 'mom-r1.png' : 'mom.png';
  const dadImg = n === 1 ? 'dad-r1.png' : 'dad.png';
  track.insertAdjacentHTML('beforeend', `
    <div class="round ${cls}" style="top:${i * 100}%" data-r="${i}" aria-hidden="${i ? 'true' : 'false'}">
      <div class="rbox"><small>ROUND ${n}</small><strong>${r.q}</strong></div>
      <button class="zone a" data-side="a" aria-label="엄마 의견: ${r.a.replace(/<br>/g, ' ')}" ${i ? 'tabindex="-1"' : ''}></button>
      <button class="zone b" data-side="b" aria-label="아빠 의견: ${r.b.replace(/<br>/g, ' ')}" ${i ? 'tabindex="-1"' : ''}></button>
      <div class="circle a"><span>${r.a}</span></div>
      <div class="circle b"><span>${r.b}</span></div>
      <img class="char a" src="images/${momImg}" alt="엄마">
      <img class="char b" src="images/${dadImg}" alt="아빠">
    </div>`);
  ['a', 'b'].forEach(s => {
    const key = `${n}${s}`;
    overlays.insertAdjacentHTML('beforeend',
      `<div class="ov" data-k="${key}"><img class="bg" src="images/ov-${key}.jpg" alt="">${EXTRA[key] || ''}</div>`);
  });
  steps.insertAdjacentHTML('beforeend', `<li${i === 0 ? ' class="now"' : ''}></li>`);
});

/* ---------- 선택 진행 ---------- */
let cur = 0, picks = [], busy = false, shown = null, lastPointer = 'mouse';
const tip = $('#tip'), frame = $('#frame'), help = $('#help'), touchBar = $('#touchBar');

const mq = matchMedia('(max-width: 760px)');
const sheet = $('#msheet'), sheetBody = $('#msBody');
let sheetSide = null;
function openSheet(side) {
  const key = `${cur + 1}${side}`, r = ROUNDS[cur];
  sheet.className = `msheet ${side}`;
  $('#msSide').textContent = side.toUpperCase();
  $('#msTitle').innerHTML = r[side].replace(/<br>/g, ' ');
  $('#msWho').textContent = side === 'a' ? '엄마의 의견' : '아빠의 의견';
  sheetBody.innerHTML = SHEET[key].map(([t, v], i) =>
    `<div class="mi ${i % 2 ? 'r' : 'l'}" style="--d:${0.08 + i * 0.1}s">${t === 'img' ? `<img src="images/m/${v}.jpg" alt="">` : v()}</div>`).join('');
  $("#msScroll").scrollTop = 0;
  sheetSide = side;
  requestAnimationFrame(() => { sheet.classList.add('show', 'play'); });
  const tot = $('[data-count]', sheet);
  if (tot) countUp(tot, +tot.dataset.count, 900, 520);
  document.body.style.overflow = 'hidden';
  $('#msPick').focus({ preventScroll: true });
}
function closeSheet() {
  sheet.classList.remove('show', 'play');
  document.body.style.overflow = '';
  sheetSide = null;
}
$('#msPick').addEventListener('click', () => { const s = sheetSide; closeSheet(); if (s) setTimeout(() => pick(s), 180); });
$('#msClose').addEventListener('click', closeSheet);
$('#msBack').addEventListener('click', closeSheet);
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });   // 바깥(배경) 탭하면 닫기
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('show')) closeSheet(); });

function showOv(side) {
  if (busy || cur >= ROUNDS.length) return;
  if (mq.matches) { openSheet(side); return; }
  hideOv();
  const el = $(`.ov[data-k="${cur + 1}${side}"]`);
  if (!el) return;
  void el.offsetWidth;                // 그래프 애니메이션 재시작
  el.classList.add('show');
  shown = side;
  const tot = $('[data-count]', el);
  if (tot) countUp(tot, +tot.dataset.count, 860, 520);
  if (lastPointer === 'mouse') tip.classList.add('show');
  else touchBar.classList.add('show');
}
function countUp(node, to, delay, dur) {
  cancelAnimationFrame(node._raf); clearTimeout(node._t);
  node.textContent = '0';
  node._t = setTimeout(() => {
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(to * e).toLocaleString('ko-KR');
      if (p < 1) node._raf = requestAnimationFrame(step);
    };
    node._raf = requestAnimationFrame(step);
  }, delay);
}
function hideOv() {
  $$('.ov.show').forEach(o => o.classList.remove('show'));
  tip.classList.remove('show');
  touchBar.classList.remove('show');
  shown = null;
}
function moveTo(n) {
  cur = n;
  track.style.transform = `translateY(-${Math.min(n, ROUNDS.length - 1) * 100}%)`;
  $$('.round').forEach((r, i) => {
    r.setAttribute('aria-hidden', i === cur ? 'false' : 'true');
    $$('.zone', r).forEach(z => z.tabIndex = i === cur ? 0 : -1);
  });
  updateSteps();
}
function goBack() { goTo(Math.min(cur, ROUNDS.length) - 1); }
function goTo(n) {                                  // n번째 라운드로 돌아가서 다시 고르기
  if (busy || n < 0 || n >= Math.min(cur, ROUNDS.length + 1)) return;
  hideOv();
  if (cur >= ROUNDS.length) {                       // 결과가 열린 뒤 되돌아가기 → 결과 다시 잠금
    $$('#result, #ending, #footer').forEach(s => s.classList.add('locked'));
    help.textContent = HELP; help.classList.remove('done');
  }
  picks.length = n;                                 // 그 라운드의 선택을 지우고 다시 고르기
  busy = true;
  moveTo(n);
  setTimeout(() => { busy = false; }, 900);
}
function updateSteps() {
  frame.classList.toggle('has-back', cur > 0);
  $$('li', steps).forEach((li, i) => {
    li.className = picks[i] ? picks[i] : (i === cur ? 'now' : '');
    const can = i < cur;
    li.classList.toggle('go', can);
    li.tabIndex = can ? 0 : -1;
    li.setAttribute('aria-label', can ? `ROUND ${i + 1}로 돌아가기` : `ROUND ${i + 1}`);
  });
}
function pick(side) {
  if (busy || cur >= ROUNDS.length) return;
  picks[cur] = side;
  hideOv();
  busy = true;
  const done = cur === ROUNDS.length - 1;
  if (!done) {
    cur++;
    moveTo(cur);
    setTimeout(() => { busy = false; const z = $(`.round[data-r="${cur}"] .zone.a`); if (document.activeElement?.classList.contains('zone')) z.focus({ preventScroll: true }); }, 900);
  } else {
    cur = ROUNDS.length;
    finish();
  }
  updateSteps();
}

$$('.zone').forEach(z => {
  z.addEventListener('pointerdown', e => { lastPointer = e.pointerType || 'mouse'; });
  z.addEventListener('pointerenter', e => { if (mq.matches || e.pointerType !== 'mouse') return; lastPointer = 'mouse'; moveTip(e); showOv(z.dataset.side); });
  z.addEventListener('pointerleave', e => { if (!mq.matches && e.pointerType === 'mouse') hideOv(); });
  z.addEventListener('focus', () => { if (!mq.matches && !z.matches(':hover')) showOv(z.dataset.side); });
  z.addEventListener('blur', () => { if (!mq.matches && lastPointer !== 'touch' && lastPointer !== 'pen') hideOv(); });
  z.addEventListener('click', () => {
    const side = z.dataset.side;
    if (mq.matches) { showOv(side); return; }                                   // 모바일: 의견 시트 열기
    if (lastPointer !== 'mouse' && shown !== side) { showOv(side); return; }   // 태블릿 터치: 첫 탭은 의견 보기
    pick(side);
  });
});
$('#backBtn').addEventListener('click', goBack);
steps.addEventListener('click', e => { const li = e.target.closest('li.go'); if (li) goTo([...steps.children].indexOf(li)); });
steps.addEventListener('keydown', e => { const li = e.target.closest('li.go'); if (li && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); goTo([...steps.children].indexOf(li)); } });
$('#tbPick').addEventListener('click', () => shown && pick(shown));
$('#tbClose').addEventListener('click', hideOv);
function moveTip(e) {
  const r = frame.getBoundingClientRect();
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
}
frame.addEventListener('mousemove', moveTip);

/* ---------- 결과 & 엔딩 ---------- */
const ENDINGS = {
  A: { reg: 'reg-a.png', t: '나는 A대학으로 간다.',
       l: '나는 A대학으로 갈래.<br>비용 부담은 있지만,',
       r: '대학 안밖의<br>경험과 진로를 탐색할 환경에<br>더 무게를 두기로 했어.',
       m: 'A대학을 선택했다고 기회가 보장되는 건 아니다.<br>비슷한 기회가 우리 지역에도 있었다면, 내 선택은 달라졌을까?' },
  B: { reg: 'reg-b.png', t: '나는 B대학으로 간다.',
       l: '나는 B대학으로 갈래<br>학비와 생활의 부담을 줄이고',
       r: '이곳에서 공부와<br>진로 준비를 차근차근 하고싶어.',
       m: 'B대학을 선택했다고 가능성이 작아지는 건 아니다.<br>여기에서 시작한 대학생활이, 여기에서의 미래로도 이어질 수 있을까?' }
};
const LINKS = {
  brief: 'https://www.korea.kr/news/policyFocusView.do?newsId=148970980&pWise=main&pWiseMain=F3&pkgId=49500845',
  card: 'https://www.korea.kr/multi/visualNewsView.do?newsId=148971392'
};

function finish() {
  const aCount = picks.filter(p => p === 'a').length;
  const k = aCount >= 3 ? 'A' : 'B', e = ENDINGS[k];
  $('#resList').innerHTML = picks.map((p, i) =>
    `<li class="${p}"><b>${i + 1}R: ${p.toUpperCase()}</b><i class="dash"> - </i><span>${ROUNDS[i][p].replace(/<br>/g, ' ')}</span></li>`).join('');
  const end = $('#ending');
  end.className = `art ending ${k}`;
  end.innerHTML = `
    <h2 class="rv">${e.t}</h2>
    <div class="reg-dots rv"></div>
    <div class="reg rv float"><img src="images/${e.reg}" alt="${k}대학교 등록증"></div>
    <div class="bub bl rv">${e.l}</div>
    <div class="bub br rv">${e.r}</div>
    <p class="msg rv">${e.m}</p>
    <a class="btn l rv" href="${LINKS.brief}" target="_blank" rel="noopener">관련 정책 브리핑</a>
    <a class="btn r rv" href="${LINKS.card}" target="_blank" rel="noopener">교육부 예산안 카드뉴스</a>
    <div class="again"><button id="again">처음부터 다시 선택하기</button></div>`;
  $$('#result, #ending, #footer').forEach(s => s.classList.remove('locked'));
  $$('#ending .rv').forEach(el => io.observe(el));
  $('#again').addEventListener('click', restart);
  help.textContent = '선택 완료! 아래로 스크롤해 결과를 확인하세요 ↓';
  help.classList.add('done');
  setTimeout(() => { busy = false; $('#result').scrollIntoView({ behavior: 'smooth' }); }, 700);
}

function restart() {
  picks = []; cur = 0; busy = false;
  track.style.transform = 'translateY(0)';
  $$('.round').forEach((r, i) => {
    r.setAttribute('aria-hidden', i ? 'true' : 'false');
    $$('.zone', r).forEach(z => z.tabIndex = i ? -1 : 0);
  });
  updateSteps();
  help.textContent = HELP;
  help.classList.remove('done');
  $('#choice').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => $$('#result, #ending, #footer').forEach(s => s.classList.add('locked')), 700);
}

/* ---------- 결과 줄이 차례로 등장 ---------- */
const resObs = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  $$('#resList li').forEach((li, i) => setTimeout(() => li.classList.add('in'), 250 + i * 380));
}), { threshold: 0.45 });
resObs.observe($('#result'));

/* ---------- 스크롤 등장 ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.2 });
$$('.rv').forEach(el => io.observe(el));

/* ---------- 합격증 뒤집기 ---------- */
$$('.pass').forEach(p => p.addEventListener('click', () => p.classList.toggle('on')));

/* ---------- 모바일 햄버거 메뉴 ---------- */
const hd = $('.hd'), hb = $('#hb');
function menu(open) {
  hd.classList.toggle('open', open);
  hb.setAttribute('aria-expanded', open);
  hb.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}
hb.addEventListener('click', () => menu(!hd.classList.contains('open')));
document.addEventListener('click', e => { if (hd.classList.contains('open') && !hd.contains(e.target)) menu(false); });

/* ---------- 헤더 이동 ---------- */
const toast = $('#toast');
function say(msg) {
  toast.textContent = msg; toast.classList.add('show');
  clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('show'), 2200);
}
$$('[data-go]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  menu(false);
  const go = a.dataset.go;
  if (go === 'intro') window.scrollTo({ top: 0, behavior: 'smooth' });
  else if (go === 'choice') $('#choice').scrollIntoView({ behavior: 'smooth' });
  else {
    if ($('#result').classList.contains('locked')) {
      say('CHOICE에서 다섯 번의 선택을 마치면 ENDING이 열려요');
      $('#choice').scrollIntoView({ behavior: 'smooth' });
    } else $('#result').scrollIntoView({ behavior: 'smooth' });
  }
}));
const navObs = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const id = en.target.id === 'intro' ? 'intro' : en.target.id === 'choice' ? 'choice' : 'ending';
  $$('[data-go]').forEach(a => a.classList.toggle('on', a.dataset.go === id));
}), { rootMargin: '-45% 0px -50% 0px' });
['intro', 'choice', 'result', 'ending'].forEach(id => navObs.observe(document.getElementById(id)));

/* 터치 기기 안내 문구 */
const HELP = mq.matches
  ? '엄마·아빠를 탭해 의견을 보고 선택하세요 · 지난 라운드는 점을 눌러 돌아가요'
  : matchMedia('(hover: none)').matches
  ? '엄마·아빠를 탭해 의견을 보고, 더 동의하는 쪽을 선택하세요'
  : '엄마·아빠 쪽에 마우스를 올려 의견을 듣고, 더 동의하는 쪽을 클릭하세요';
help.textContent = HELP;

/* 호버 화면 이미지 미리 불러오기 */
window.addEventListener('load', () => $$('.ov img.bg').forEach(img => { img.decoding = 'async'; }));
