
// ===== অ্যাপের ডাউনলোড লিংক: Google Drive-এর শেয়ার লিংক এই দুই কোটের মাঝে বসান =====
const APP_URL='https://www.mediafire.com/file/geixxfvluc7rb5j/base.apk/file';
// =====================================================================
const SB='https://kzgfugomdgrimrnobeej.supabase.co', KEY='sb_publishable_2sd0wUHy6yBNX27oN60vRw_VBn0hxtD';
const sb=supabase.createClient(SB,KEY);
let session=null, info={plans:[],settings:{}}, chosen=null, acct=null;
let lang='en'; try{lang=localStorage.getItem('ph_lang')==='bn'?'bn':'en'}catch(e){}
const L=(en,bn)=>lang==='bn'?bn:en;
const $=id=>document.getElementById(id)||document.createElement('div'); // এই পেজে না থাকা অংশে ভুল ছাড়াই চলে
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=n=>Number(n).toLocaleString(lang==='bn'?'bn-BD':'en-US');
const dt=s=>new Date(s).toLocaleDateString(lang==='bn'?'bn-BD':'en-GB',{day:'numeric',month:'long',year:'numeric'});

const DICT={
'লগইন লাগবে':'Sign in required',
'এই পেজ দেখতে Google দিয়ে লগইন করুন।':'Sign in with Google to see this page.',
'অ্যাকাউন্ট':'Account',
'চালু করবেন যেভাবে':'How to get started',
'অ্যাপ নামান।':'Download the app.',
'যে ফোনে bKash, Nagad বা Rocket-এর SIM আছে, সেই ফোনে অ্যাপটা ডাউনলোড করে ইনস্টল করুন।':'On the phone that has your bKash, Nagad or Rocket SIM, download and install the app.',
'key বসান।':'Enter your key.',
'অ্যাপ খুলে ওপরের key বসান, তারপর SMS-এর অনুমতি দিন।':'Open the app, enter the key above, then allow SMS access.',
'সাইটে যুক্ত করুন।':'Connect your site.',
'আপনার সাইট বা বট থেকে নিচের ঠিকানায় পেমেন্ট যাচাই করুন। ডেভেলপার থাকলে তাকে এই ঠিকানা আর key দিন।':'Verify payments from your site or bot at the address below. If you have a developer, give them this address and your key.',
'ডাউনলোডের লিংক শীঘ্রই এখানে যোগ হবে।':'The download link will be added here soon.',
'যাচাইয়ের ঠিকানা':'Verification address',
'ডেভেলপারের জন্য':'For developers',
'method-এ BKASH, NAGAD বা ROCKET লিখুন। amount ফাঁকা বা ০ দিলে যেকোনো অঙ্ক মিলবে। client_name হলো আপনার সাইটের ডোমেইন, key প্রথম যে ডোমেইনে ব্যবহার হয় সেটার সাথেই বাঁধা পড়ে। সফল হলে status হবে success, আর একই TrxID দ্বিতীয়বার নেবে না।':'Use BKASH, NAGAD or ROCKET as the method. An empty amount or 0 accepts any amount. client_name is your site domain; the key stays tied to the first domain it is used on. On success the status is success, and the same TrxID is never accepted twice.',
'আমার অর্ডার':'My orders',
'আমার অর্ডার দেখুন':'View my orders',
'এখানে আপনার সব অর্ডার আর তার অবস্থা দেখা যাবে।':'All your orders and their status appear here.',
'যোগাযোগ':'Contact',
'সাহায্য লাগলে যোগাযোগ করুন':'Need help? Contact us',
'অর্ডার, key বা অ্যাপ নিয়ে কোনো সমস্যা হলে সরাসরি জানান।':'Problems with an order, your key or the app? Message us directly.',
'অ্যাপ ডাউনলোড করুন':'Download the app',
'নিজের নম্বরে টাকা নিন, পেমেন্ট যাচাই হোক নিজে নিজেই।':'Accept payments on your own number. Verify them automatically.',
'PayHook অ্যাপের সাবস্ক্রিপশন নিলে bKash, Nagad আর Rocket-এর প্রতিটা পেমেন্ট নিজে জমা হয়। TrxID আর টাকার অঙ্ক মিলিয়ে কয়েক সেকেন্ডে যাচাই করা যায়, আর একই TrxID দুবার চলে না। মার্চেন্ট অ্যাকাউন্ট লাগে না।':'Subscribe to the PayHook app and every bKash, Nagad and Rocket payment is recorded automatically. Check the TrxID and amount in seconds, and the same TrxID can never be used twice. No merchant account needed.',
'কী কী পাবেন':'What you get',
'সাবস্ক্রিপশন নিয়ে নিজের পছন্দের মেয়াদে অ্যাপ চালান।':'Take a subscription and run the app for as long as you choose.',
'এক অ্যাপে তিনটা মাধ্যম':'Three services, one app',
'bKash, Nagad আর Rocket-এর পেমেন্ট মেসেজ ফোন থেকে নিজে নিজে জমা হয়। হাতে কিছু টুকতে হয় না।':'Payment messages from bKash, Nagad and Rocket are saved from your phone on their own. Nothing to type in by hand.',
'ঠিক পেমেন্ট চিনুন':'Know a payment is real',
'কেউ TrxID দিলে টাকার অঙ্কসহ মিলিয়ে দেখা যায়। ভুল বা কম টাকা সাথে সাথে ধরা পড়ে, একই TrxID দ্বিতীয়বার চলে না।':'When someone gives a TrxID, it is checked against the amount. A wrong or short payment is caught straight away, and a TrxID cannot be reused.',
'মার্চেন্ট অ্যাকাউন্ট লাগে না':'No merchant account needed',
'নিজের ব্যক্তিগত bKash, Nagad বা Rocket নম্বরেই টাকা নিন। টাকা সরাসরি আপনার কাছে আসে, মাঝে কেউ ধরে রাখে না।':'Use your own personal bKash, Nagad or Rocket number. The money comes straight to you; nobody holds it in between.',
'কীভাবে চলে':'How it works','প্ল্যান':'Plans','প্রশ্ন':'FAQ','Google দিয়ে ঢুকুন':'Sign in with Google',
'SMS আসে, পেমেন্ট মিলে যায়।':'The SMS arrives. The payment matches.',
'bKash, Nagad আর Rocket-এর পেমেন্ট মেসেজ ফোন থেকে নিজে নিজে জমা হয়। কেউ TrxID দিলে টাকার অঙ্কসহ মিলিয়ে দেখা যায়, আর একই TrxID দ্বিতীয়বার চলে না।':'Payment messages from bKash, Nagad and Rocket are uploaded from your phone automatically. When someone submits a TrxID, you can check it along with the amount, and the same TrxID cannot be used twice.',
'প্ল্যান দেখুন':'See plans','পেমেন্ট মিলেছে':'Payment matched','নমুনা, আসল তথ্য নয়':'Sample, not real data',
'পরিমাণ':'Amount','মাধ্যম':'Method','পাঠিয়েছেন':'Sent by','মিলেছে':'Matched',
'তিন ধাপে চালু':'Up and running in three steps',
'কোড লেখা বা সার্ভার বসানো লাগে না। অ্যাপ আর একটা key হলেই হয়।':'No coding and no server to set up. You only need the app and a key.',
'key নিন':'Get your key',
'এখানে Google দিয়ে ঢুকে প্ল্যান বেছে অর্ডার দিন। যাচাই হলে আপনার key এই পাতাতেই দেখা যাবে।':'Sign in with Google here, pick a plan and place an order. Once it is verified, your key appears on this page.',
'অ্যাপে ঢুকুন':'Sign in to the app',
'PayHook অ্যাপে key বসিয়ে SMS পড়ার অনুমতি দিন।':'Enter the key in the PayHook app and allow SMS access.',
'মেসেজ নিজেই জমা হয়':'Messages upload on their own',
'নতুন পেমেন্ট এলে কয়েক সেকেন্ডে ক্লাউডে জমা হয়। একই মেসেজ দুবার এলেও একবারই থাকে।':'A new payment reaches the cloud within seconds. If the same message arrives twice, it is kept once.',
'মেয়াদ শুরু হয় আপনি প্রথমবার অ্যাপে ঢোকার মুহূর্ত থেকে।':'The validity period starts the first time you sign in to the app.',
'আপনার অ্যাকাউন্ট':'Your account','আপনার অর্ডার':'Your orders','সর্বশেষ ৫০টি':'Latest 50','যা জানতে চান':'Questions',
'PayHook কি আমার টাকা ধরে রাখে?':'Does PayHook hold my money?',
'না। এটা শুধু মেসেজ মিলিয়ে দেখার টুল। ব্যাংক বা পেমেন্ট গেটওয়ে নয়। টাকা সরাসরি আপনার নিজের নম্বরে আসে।':'No. It is only a tool that matches messages. It is not a bank or a payment gateway. Money goes straight to your own number.',
'কোন ফোনে চলে?':'Which phones does it work on?',
'Android ফোনে। অ্যাপকে SMS পড়ার অনুমতি দিতে হয়, আর ব্যাটারি সেভার বন্ধ রাখলে মেসেজ দ্রুত জমা হয়।':'Android phones. The app needs permission to read SMS, and messages upload faster if battery saver is off for it.',
'অর্ডারের পর key কখন পাব?':'When do I get my key after ordering?',
'আমরা আপনার TrxID আর টাকার অঙ্ক হাতে মিলিয়ে অনুমোদন দিই। হয়ে গেলে key এই পাতার "আপনার অ্যাকাউন্ট" অংশে চলে আসে।':'We check your TrxID and amount by hand and approve the order. Your key then shows up in the "Your account" section of this page.',
'মেয়াদ কবে থেকে ধরা হয়?':'When does the validity start?',
'প্রথমবার অ্যাপে key দিয়ে ঢোকার মুহূর্ত থেকে। তার আগে পর্যন্ত দিন কমে না।':'From the moment you first sign in to the app with the key. Days do not count down before that.',
'PayHook ব্যাংক বা পেমেন্ট গেটওয়ে নয়।':'PayHook is not a bank or a payment gateway.',
'কোন মাধ্যমে টাকা পাঠিয়েছেন':'Which method did you pay with','যে নম্বর থেকে পাঠিয়েছেন':'Number you sent from',
'অর্ডার জমা দিন':'Submit order','বন্ধ করুন':'Close'};

function applyStatic(){
  document.documentElement.lang=lang;
  document.title=L('PayHook: payment verification for bKash, Nagad and Rocket','PayHook: bKash, Nagad, Rocket পেমেন্ট যাচাইয়ের অ্যাপ');
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,[data-dyn]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  let n; while((n=w.nextNode())){
    const t=n.nodeValue.trim(); if(!t) continue;
    if(n.__o===undefined){ if(!DICT[t]) continue; n.__o=n.nodeValue; }
    const key=n.__o.trim();
    n.nodeValue= lang==='en' ? n.__o.replace(key,DICT[key]) : n.__o;
  }
  $('langBtn').textContent=lang==='en'?'বাংলা':'English';
  $('langBtn').setAttribute('aria-label',L('Switch to Bengali','ইংরেজিতে দেখুন'));
  document.querySelector('.slip[aria-label]').setAttribute('aria-label',L('Sample receipt','নমুনা রসিদ'));
  $('logoutBtn').textContent=L('Sign out','বের হোন');
  document.querySelectorAll('.gn').forEach((e,i)=>e.textContent=lang==='bn'?'১২৩'[i%3]:String(i%3+1));
  $('loginBtn2').textContent=L('Sign in with Google','Google দিয়ে ঢুকুন');
  [['tHome','Home','হোম'],['tHow','How','কীভাবে'],['tPlans','Plans','প্ল্যান'],['tFaq','FAQ','প্রশ্ন'],['tHelp','Help','যোগাযোগ'],['tAcc','Account','অ্যাকাউন্ট']].forEach(([i,e,b])=>{const el=$(i);if(el)el.textContent=L(e,b)});
  if($('copyApi')) $('copyApi').textContent=L('Copy','কপি'); if($('copyCode')) $('copyCode').textContent=L('Copy code','কোড কপি করুন');
  document.querySelectorAll('.step .n').forEach((e,i)=>e.textContent=lang==='bn'?'১২৩'[i]:String(i+1));
}
$('langBtn').onclick=()=>{lang=lang==='en'?'bn':'en';try{localStorage.setItem('ph_lang',lang)}catch(e){}
  applyStatic();renderPlans();renderAccount();if($('orderDlg').open){fillDlg()}};

async function api(action,body={}){
  const h={'Content-Type':'application/json',apikey:KEY};
  if(session) h.Authorization='Bearer '+session.access_token;
  const r=await fetch(SB+'/functions/v1/ph-user',{method:'POST',headers:h,body:JSON.stringify({action,...body})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(j.detail||L('Something went wrong. Please try again.','সমস্যা হয়েছে, আবার চেষ্টা করুন'));
  return j;
}
const here=()=>location.pathname.split('/').pop()||'index.html';
const login=()=>{try{localStorage.setItem('ph_return',here())}catch(e){}
  return sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname.replace(/[^/]*$/,'')}})};
$('loginBtn').onclick=login; $('loginBtn2').onclick=login;
$('logoutBtn').onclick=async()=>{await sb.auth.signOut();location.hash='';location.reload()};

function renderPlans(){
  const el=$('planList'), s=info.settings;
  setHint();
  if(s.notice) $('notice').textContent=s.notice;
  $('contact').textContent=s.support_contact?(L('Contact: ','যোগাযোগ: ')+s.support_contact+(lang==='bn'?'।':'.')):'';
  if(!info.plans.length){el.innerHTML=customCard()+'<div class="empty">'+L('No plans have been added yet. Please check back soon.','প্ল্যান এখনো যোগ করা হয়নি। একটু পরে আবার দেখুন।')+'</div>';bindCustom();return}
  el.innerHTML=info.plans.map(p=>`<div class="slip plan"><h3>${esc(p.name)}</h3>
    <div class="price">৳ ${num(p.price)}</div><div class="dur">${p.lifetime?L('Lifetime','লাইফটাইম'):num(p.days)+L(' days',' দিন')}</div>
    <button class="btn dark" data-id="${esc(p.id)}">${L('Order now','অর্ডার করুন')}</button></div>`).join('')+customCard();
  el.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>openOrder(b.dataset.id));
  bindCustom();
}
const TIERS=()=>info.custom_pricing||[[30,1.2],[90,1],[365,0.9],[3650,0.8]];
function cPrice(n){const t=TIERS();let tot=0,prev=0;for(const [u,r] of t){if(n<=prev)break;tot+=(Math.min(n,u)-prev)*r;prev=u}if(n>prev)tot+=(n-prev)*t[t.length-1][1];return Math.round(tot*100)/100}
function customCard(){return `<div class="slip plan"><h3>${L('Custom days','নিজের পছন্দের দিন')}</h3>
  <input id="cDays" type="number" inputmode="numeric" min="1" max="3650" value="45" style="text-align:center">
  <div class="price" id="cPrice">৳ ${num(cPrice(45))}</div><div class="dur" id="cDur">${num(45)}${L(' days',' দিন')}</div>
  <button class="btn dark" id="cOrder">${L('Order now','অর্ডার করুন')}</button></div>`}
const D=t=>String(t??'').replace(/[০-৯]/g,c=>'০১২৩৪৫৬৭৮৯'.indexOf(c));
const PEND='ph_pending', NM={bkash:'bKash',nagad:'Nagad',rocket:'Rocket'};
const methods=()=>['bkash','nagad','rocket'].filter(m=>info.settings[m+'_number']);
function setHint(){$('loginHint').textContent=session?'':L('You need to sign in with Google to order. It takes one tap.','অর্ডার করতে Google দিয়ে লগইন করতে হবে, এক ট্যাপেই হয়ে যায়।')}
function startOrder(o){
  if(!session){try{sessionStorage.setItem(PEND,JSON.stringify(o))}catch(e){} login();return}
  if(o.custom_days) chosen={id:null,price:cPrice(o.custom_days),custom_days:o.custom_days};
  else{chosen=info.plans.find(p=>p.id===o.plan_id); if(!chosen) return}
  $('dlgMsg').textContent='';$('dlgMsg').className='msg';$('sendOrder').disabled=false;
  fillDlg(); if($('orderDlg').showModal)$('orderDlg').showModal();
}
const openOrder=id=>startOrder({plan_id:id});
function bindCustom(){
  const i=$('cDays'); if(!i) return;
  const val=()=>{const n=parseInt(D(i.value),10);return Number.isInteger(n)&&n>=1&&n<=3650?n:null};
  i.oninput=()=>{const n=val();$('cPrice').textContent=n?'৳ '+num(cPrice(n)):'—';$('cDur').textContent=n?num(n)+L(' days',' দিন'):L('Enter 1 to 3650 days','১ থেকে ৩৬৫০ দিন দিন')};
  $('cOrder').onclick=()=>{const n=val(); if(!n){i.focus();return} startOrder({custom_days:n})};
}
function fillDlg(){
  const ms=methods(), cur=()=>$('method').value;
  $('dlgTitle').textContent=chosen.custom_days?L('Custom '+chosen.custom_days+' days','কাস্টম '+num(chosen.custom_days)+' দিন'):chosen.name;
  $('dlgPrice').textContent=L('Total to send: ৳ '+num(chosen.price),'মোট পাঠাতে হবে: ৳ '+num(chosen.price));
  $('l1').textContent=L('Step 1: Choose how you will pay','ধাপ ১: কোন মাধ্যমে টাকা পাঠাবেন?');
  if(ms.length&&!ms.includes(cur())) $('method').value=ms[0];
  $('mBtns').innerHTML=ms.map(m=>`<button type="button" class="btn${cur()===m?' dark':''}" data-m="${m}" style="${cur()===m?'':'background:transparent;box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink)'}">${NM[m]}</button>`).join('')
    ||`<small>${L('Payment numbers are not set yet. Please contact support.','পেমেন্টের নম্বর এখনো বসানো হয়নি। সাপোর্টে যোগাযোগ করুন।')}</small>`;
  $('mBtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('method').value=b.dataset.m;fillDlg()});
  $('l3').textContent=L('Step 3: The number you sent from','ধাপ ৩: যে নম্বর থেকে টাকা পাঠিয়েছেন');
  $('hSender').textContent=L('Your own 11-digit number, e.g. 01XXXXXXXXX','আপনার নিজের ১১ সংখ্যার নম্বর, যেমন 01XXXXXXXXX');
  $('l4').textContent=L('Step 4: TrxID (transaction ID)','ধাপ ৪: TrxID (ট্রানজ্যাকশন আইডি)');
  $('hTrx').textContent=L('You get it in the confirmation SMS after paying, e.g. CK7M2X91QA','টাকা পাঠানোর পর কনফার্মেশন SMS-এ পাবেন, যেমন CK7M2X91QA');
  $('sendOrder').textContent=L('Submit order','অর্ডার জমা দিন'); $('closeDlg').textContent=L('Close','বন্ধ করুন');
  showPayTo();
}
function showPayTo(){
  const m=$('method').value, n=info.settings[m+'_number'], nm=NM[m], el=$('payTo');
  if(!n){el.innerHTML='';return}
  el.innerHTML=`<div style="border:1.5px dashed var(--ink);padding:12px 14px;border-radius:3px;background:#10231d0f">
    <small style="display:block;margin:0 0 6px;font-weight:600">${L('Step 2: Open '+nm+', choose Send Money and send exactly ৳ '+num(chosen.price)+' to this number','ধাপ ২: '+nm+' অ্যাপে Send Money দিয়ে এই নম্বরে ঠিক ৳ '+num(chosen.price)+' পাঠান')}</small>
    <div style="display:flex;gap:10px;align-items:center;justify-content:space-between"><b class="mono" style="font-size:22px">${esc(n)}</b>
    <button type="button" class="btn dark" id="copyPay" style="padding:8px 14px">${L('Copy','কপি')}</button></div></div>`;
  $('copyPay').onclick=async e=>{const b=e.currentTarget, ok=await copyText(n); b.textContent=ok?L('Copied','কপি হয়েছে'):L('Failed','হয়নি'); setTimeout(()=>b.textContent=L('Copy','কপি'),2000)};
}
$('closeDlg').onclick=()=>$('orderDlg').close();
$('sendOrder').onclick=async()=>{
  const b=$('sendOrder'), m=$('dlgMsg'); m.className='msg'; m.textContent='';
  const bad=t=>{m.className='msg err';m.textContent=t};
  if(!methods().length) return bad(L('Payment numbers are not set yet.','পেমেন্টের নম্বর এখনো বসানো হয়নি।'));
  const sender=D($('sender').value).replace(/[\s-]/g,''), trx=D($('trx').value).trim();
  if(!/^(\+?880|0)1[3-9]\d{8}$/.test(sender)) return bad(L('Enter the 11-digit number you paid from (01XXXXXXXXX).','যে নম্বর থেকে টাকা পাঠিয়েছেন সেটা ১১ সংখ্যায় লিখুন (01XXXXXXXXX)।'));
  if(!/^[A-Za-z0-9]{6,20}$/.test(trx)) return bad(L('Enter the TrxID from the confirmation SMS (6 to 20 letters or numbers).','কনফার্মেশন SMS-এর TrxID লিখুন (৬ থেকে ২০টি অক্ষর বা সংখ্যা)।'));
  b.disabled=true;
  try{
    await api('create_order',{...(chosen.custom_days?{custom_days:chosen.custom_days}:{plan_id:chosen.id}),pay_method:$('method').value,sender_number:sender,trx_id:trx});
    m.className='msg ok'; m.textContent=L('Order submitted! We will check your payment, then your key will appear in your account.','অর্ডার জমা হয়েছে! আমরা পেমেন্ট যাচাই করব, তারপর key আপনার অ্যাকাউন্টে দেখা যাবে।');
    $('trx').value=''; loadAccount();
    setTimeout(()=>{if($('orderDlg').open){$('orderDlg').close();location.href='orders.html'}},3000);
  }catch(e){bad(e.message);b.disabled=false}
};

function appHref(u){const m=u.match(/drive\.google\.com\/file\/d\/([\w-]+)/)||u.match(/[?&]id=([\w-]+)/);return u.includes('drive.google.com')&&m?'https://drive.google.com/uc?export=download&id='+m[1]:u}
async function copyText(v){
  try{await navigator.clipboard.writeText(v);return true}catch(e){
    const t=document.createElement('textarea');t.value=v;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();
    let ok=false;try{ok=document.execCommand('copy')}catch(e){} t.remove();return ok}
}
function keyStatus(k){
  if(!k.active) return L('Disabled','বন্ধ করা আছে');
  if(k.lifetime) return L('Lifetime','লাইফটাইম');
  if(!k.activated_at) return L('Runs for '+num(k.days)+' days from your first sign-in','প্রথম লগইন থেকে '+num(k.days)+' দিন চলবে');
  const left=Math.ceil((new Date(k.expires_at)-Date.now())/864e5);
  return left>0?L(num(left)+' days left, ends '+dt(k.expires_at),num(left)+' দিন বাকি, শেষ হবে '+dt(k.expires_at)):L('Expired','মেয়াদ শেষ');
}
function renderAccount(){
  if(!acct) return;
  const ST={pending:[L('Pending','অপেক্ষায়'),'pending'],approved:[L('Approved','অনুমোদিত'),''],rejected:[L('Rejected','বাতিল'),'bad']};
  const hint=L('Tap the key to copy it','key-তে চাপ দিলেই কপি হবে');
  $('keys').innerHTML=acct.keys.map(x=>`<div class="slip"><h3>${L('Your key','আপনার key')}</h3><small>${esc(keyStatus(x))}</small>
    <button type="button" class="keybox" data-copy="${esc(x.key)}">${esc(x.key)}</button><small class="hint" style="margin:8px 0 0">${hint}</small></div>`).join('');
  $('keys').querySelectorAll('.keybox').forEach(b=>b.onclick=async()=>{
    const h=b.nextElementSibling, ok=await copyText(b.dataset.copy);
    h.textContent=ok?L('Copied','কপি হয়েছে'):L('Could not copy. Press and hold the key to select it.','কপি করা যায়নি। key-তে চেপে ধরে সিলেক্ট করুন');
    setTimeout(()=>h.textContent=hint,2200)});
  $('orders').innerHTML=acct.orders.length?acct.orders.map(x=>{const s=ST[x.status]||ST.pending;
    return `<div class="line"><span><b>${esc(x.plan_name)}</b><br><span class="mono">${esc(x.trx_id)}</span>${x.admin_note?'<br><small style="margin:0">'+esc(x.admin_note)+'</small>':''}</span>
    <span class="stamp ${s[1]}" style="position:static;font-size:16px;padding:5px 9px;transform:rotate(-4deg)">${s[0]}</span></div>`}).join('')
    :'<p>'+L('No orders yet. Pick a plan above to get started.','এখনো কোনো অর্ডার নেই। উপরের প্ল্যান থেকে শুরু করুন।')+'</p>';
}
async function loadAccount(){
  const [k,o]=await Promise.all([api('my_keys'),api('my_orders')]);
  acct={keys:k.keys,orders:o.orders}; renderAccount();
}
async function init(){
  applyStatic();
  const apiBase=SB+'/functions/v1/ph-verify';
  $('apiUrl').value=apiBase;
  const CODE={
php:`<?php
$KEY    = 'PH-XXXXXX-XXXXXX';   // আপনার key
$SITE   = 'myshop.com';         // আপনার সাইটের ডোমেইন
$trx    = $_POST['trx_id'];     // ক্রেতার দেওয়া TrxID
$method = $_POST['method'];     // BKASH, NAGAD বা ROCKET
$amount = 500;                  // এই অর্ডারের দাম

$ch = curl_init('__URL__');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 15,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode([
    'license_key' => $KEY,
    'client_name' => $SITE,
    'trx_id'      => $trx,
    'method'      => $method,
    'amount'      => $amount,
  ]),
]);
$res = json_decode(curl_exec($ch), true);

if (($res['status'] ?? '') === 'success') {
  // পেমেন্ট ঠিক আছে: এখানে ক্রেতাকে পণ্য বা সার্ভিস দিন
} else {
  echo $res['reason'] ?? 'যাচাই করা যায়নি';
}`,
python:`import requests

KEY = "PH-XXXXXX-XXXXXX"   # আপনার key
SITE = "myshop.com"        # আপনার সাইট বা বটের নাম

def verify(trx_id, method, amount):
    r = requests.post("__URL__", json={
        "license_key": KEY,
        "client_name": SITE,
        "trx_id": trx_id,    # ক্রেতার দেওয়া TrxID
        "method": method,    # BKASH, NAGAD বা ROCKET
        "amount": amount,    # এই অর্ডারের দাম
    }, timeout=15)
    return r.json()

res = verify("CK7M2X91QA", "BKASH", 500)
if res.get("status") == "success":
    pass  # পেমেন্ট ঠিক আছে: এখানে পণ্য বা সার্ভিস দিন
else:
    print(res.get("reason"))`,
node:`const KEY = "PH-XXXXXX-XXXXXX";  // আপনার key
const SITE = "myshop.com";       // আপনার সাইটের ডোমেইন

async function verify(trxId, method, amount) {
  const r = await fetch("__URL__", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      license_key: KEY,
      client_name: SITE,
      trx_id: trxId,     // ক্রেতার দেওয়া TrxID
      method: method,    // BKASH, NAGAD বা ROCKET
      amount: amount     // এই অর্ডারের দাম
    })
  });
  return r.json();
}

const res = await verify("CK7M2X91QA", "BKASH", 500);
if (res.status === "success") {
  // পেমেন্ট ঠিক আছে: এখানে পণ্য বা সার্ভিস দিন
} else {
  console.log(res.reason);
}`};
  let curTab='php';
  const showCode=()=>{
    $('codeBox').textContent=CODE[curTab].split('__URL__').join(apiBase);
    document.querySelectorAll('#codeTabs button').forEach(b=>{const on=b.dataset.k===curTab;b.className='btn'+(on?' dark':'');b.style.cssText=on?'padding:6px 16px':'padding:6px 16px;background:transparent;box-shadow:inset 0 0 0 1.5px var(--ink);color:var(--ink)'});
  };
  document.querySelectorAll('#codeTabs button').forEach(b=>b.onclick=()=>{curTab=b.dataset.k;showCode()});
  showCode();
  $('copyCode').onclick=async e=>{const b=e.currentTarget, ok=await copyText($('codeBox').textContent); b.textContent=ok?L('Copied','কপি হয়েছে'):L('Failed','হয়নি'); setTimeout(()=>b.textContent=L('Copy code','কোড কপি করুন'),2000)};
  $('copyApi').onclick=async e=>{const b=e.currentTarget, ok=await copyText(apiBase); b.textContent=ok?L('Copied','কপি হয়েছে'):L('Failed','হয়নি'); setTimeout(()=>b.textContent=L('Copy','কপি'),2000)};
  if(APP_URL){const h=appHref(APP_URL);$('appLink').href=h;$('appRow').classList.remove('hide');$('guideApp').href=h;$('guideApp').classList.remove('hide');$('guideNoApp').classList.add('hide')}
  try{info=await api('public_info')}catch(e){console.error('public_info failed',e)}
  renderPlans();
  const {data}=await sb.auth.getSession(); session=data.session;
  $('pageSkel').classList.add('hide');
  if(!session) $('needLogin').classList.remove('hide');
  if(session){
    try{const r=localStorage.getItem('ph_return'); if(r){localStorage.removeItem('ph_return'); if(r!==here()){location.replace(r);return}}}catch(e){}
    $('loginBtn').classList.add('hide'); $('logoutBtn').classList.remove('hide');
    $('account').classList.remove('hide'); $('myorders').classList.remove('hide'); $('ordersNav').classList.remove('hide'); $('accNav').classList.remove('hide'); $('whoami').textContent=session.user.email;
    if(['account','myorders'].includes(document.body.dataset.page)){try{await loadAccount()}catch(e){$('whoami').textContent=e.message}}
    setHint();
    try{const p=sessionStorage.getItem(PEND);if(p){sessionStorage.removeItem(PEND);startOrder(JSON.parse(p))}}catch(e){}
  }
}
$('tAcc').addEventListener('click',e=>{if(!session){e.preventDefault();login()}});
sb.auth.onAuthStateChange((ev)=>{if(ev==='SIGNED_IN'&&!session) init()});
(function(){const pg=document.body.dataset.page;document.querySelectorAll('[data-pg]').forEach(a=>a.classList.toggle('on',a.dataset.pg===pg||(pg==='myorders'&&a.dataset.pg==='account')))})();
init();
