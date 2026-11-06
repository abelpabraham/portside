import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Anchor, ArrowDown, ArrowRight, ArrowUpRight, Box, Check, ChevronDown, Compass, FileText, Globe2, Menu, Package, Ship, Sparkles, Truck, Waves, X } from 'lucide-react';

const stages = [
  { n:'01', tag:'THE BEGINNING', title:'It starts at the factory.', copy:'A buyer has ordered goods. The seller gets them ready, checks the quantity and quality, and packs everything for its journey.', detail:'Think of this as the “ready to ship” moment. The cargo exists, the order is confirmed, and someone now needs to move it across borders.', icon:Package, color:'#f4bd58', scene:'factory', quiz:{ question:'Who normally prepares the goods for shipment?', options:['The exporter / seller','The destination port','The shipping line'], answer:0, why:'The exporter or seller gets the cargo ready, packs it and provides shipment information.' } },
  { n:'02', tag:'GETTING THE PAPERWORK RIGHT', title:'Paperwork gives cargo a passport.', copy:'Before cargo moves, the people involved prepare documents that explain what is being shipped, who is sending it, and who should receive it.', detail:'Common documents include the Commercial Invoice, Packing List and Shipping Instructions. The exact set depends on the shipment, route and regulations.', icon:FileText, color:'#a7c9b7', scene:'paper', quiz:{ question:'Which document mainly lists the goods, quantities and package details?', options:['Packing List','Arrival Notice','Delivery Order'], answer:0, why:'The Packing List describes the cargo contents, package count, weights and dimensions.' } },
  { n:'03', tag:'THE PORT CHECK-IN', title:'Welcome to the port.', copy:'The cargo is moved to the port or container freight station. The container is received, weighed where required, and checked against the booking details.', detail:'A port is a busy handover point. Gate-in, terminal cut-offs and documentation deadlines all matter. Miss a cut-off and the shipment may roll to another vessel.', icon:Anchor, color:'#eaa28d', scene:'port', quiz:{ question:'What does POL mean?', options:['Place of Logistics','Port of Loading','Port of Landing'], answer:1, why:'POL is the Port of Loading — the port where the cargo is loaded onto the vessel.' } },
  { n:'04', tag:'CUSTOMS & CLEARANCE', title:'A quick check before the big trip.', copy:'Customs authorities review the declaration and supporting documents. Depending on the cargo, route and risk checks, an examination may also happen.', detail:'Customs clearance is not the same as port handling. Customs is a government control process; the terminal manages the physical movement of cargo.', icon:Check, color:'#b6b1e7', scene:'customs', quiz:{ question:'Who is responsible for customs control?', options:['The truck driver','The customs authority','The warehouse receptionist'], answer:1, why:'Customs is a government authority that checks declarations, duties and compliance.' } },
  { n:'05', tag:'STUFFING & LOADING', title:'All packed. Time to board.', copy:'Cargo is loaded into a container (stuffing), secured, sealed and moved to the terminal. The container is then loaded onto the vessel.', detail:'The container number and seal number become important references. Good packing and lashing help protect cargo during road, terminal and sea movements.', icon:Box, color:'#e8b4cf', scene:'loading', quiz:{ question:'Why is a container seal number recorded?', options:['To identify the vessel captain','To show the container colour','To help verify container security'], answer:2, why:'The seal helps identify whether the container remained secured between handovers.' } },
  { n:'06', tag:'THE OCEAN LEG', title:'A little blue-road adventure.', copy:'The vessel sails from the Port of Loading (POL) towards the Port of Discharge (POD). The carrier shares schedule updates as the ship travels.', detail:'ETD means Estimated Time of Departure. ETA means Estimated Time of Arrival. Transit time is the planned duration between the relevant ports.', icon:Ship, color:'#83b8d2', scene:'voyage', quiz:{ question:'The vessel is expected to reach the destination port. Which term is this?', options:['ETA','ETD','POL'], answer:0, why:'ETA means Estimated Time of Arrival. ETD is the Estimated Time of Departure.' } },
  { n:'07', tag:'ARRIVAL & DELIVERY', title:'The cargo reaches its new home.', copy:'At destination, the container is discharged, import formalities are completed, and the cargo is released for delivery to the consignee.', detail:'The consignee is the party receiving the goods. After release, the container is delivered, unloaded (devanned) and returned within the allowed free time.', icon:Truck, color:'#f1c77c', scene:'delivery', quiz:{ question:'Who is the consignee?', options:['The party receiving the goods','The vessel operator','The port authority'], answer:0, why:'The consignee is the named party to whom the shipment is consigned — usually the receiver.' } },
];

function ShipIllustration({ stage }) {
  const labels = {
    factory: 'Goods prepared at the factory',
    paper: 'Shipping documents and booking paperwork',
    port: 'Container terminal with cranes and truck',
    customs: 'Customs clearance facility',
    loading: 'Containers being loaded aboard a vessel',
    voyage: 'Container ship crossing the ocean',
    delivery: 'Cargo arriving at its final destination',
  };
  return <div className={`scene scene-${stage}`}>
    <img
      className="journey-artwork"
      src={`/journey/${stage}.webp`}
      alt={labels[stage] || 'Shipping journey illustration'}
      loading="lazy"
      decoding="async"
    />
    <div className="scene-label">{stage === 'voyage' ? 'AT SEA · DAY 08' : stage === 'delivery' ? 'DELIVERED · DAY 16' : 'CARGO JOURNEY'}</div>
  </div>
}

const glossaryTerms = [
['Arrival Notice','AN','Documents','Common','A','A carrier or agent notice that a shipment is arriving or has arrived.'],
['Air Waybill','AWB','Documents','Common','A','The transport document used for an air-freight shipment.'],
['Bill of Lading','B/L','Documents','Common','B','An ocean transport document serving as a cargo receipt and evidence of the carriage contract.'],
['Booking','','Operations','Common','B','A reservation of cargo space with a carrier for a planned shipment.'],
['Breakbulk Cargo','','Cargo','Intermediate','B','Cargo shipped as individual pieces rather than in a standard container or as dry bulk.'],
['CAF','CAF','Charges','Rare','C','A surcharge used by some carriers to account for currency fluctuations.'],
['Cargo Manifest','','Documents','Intermediate','C','A record listing cargo carried on a vessel, aircraft or other transport.'],
['Carrier','','People & Parties','Common','C','The company responsible for transporting the cargo.'],
['CBM (Cubic Metre)','CBM','Cargo','Common','C','A volume measurement equal to one metre cubed.'],
['CFS (Container Freight Station)','CFS','Places','Common','C','A facility where LCL cargo is consolidated or separated after arrival.'],
['CIF (Cost, Insurance and Freight)','CIF','Trade Terms','Intermediate','C','An Incoterm where the seller arranges and pays cost, insurance and freight to the named destination port.'],
['Consignee','','People & Parties','Common','C','The party named to receive the shipment at destination.'],
['Consignor','','People & Parties','Intermediate','C','The party sending or dispatching the goods.'],
['Cut-off','','Operations','Common','C','The deadline for cargo, documents or instructions for a planned vessel.'],
['Customs Clearance','','Customs','Common','C','The process of satisfying customs requirements so goods can be imported or exported.'],
['Delivery Order','D/O','Documents','Common','D','A release instruction authorising delivery of cargo to the entitled receiver.'],
['Demurrage','','Charges','Common','D','A charge that may apply when a container stays in the terminal beyond allowed free time.'],
['Detention','','Charges','Common','D','A charge that may apply when carrier equipment is kept outside the terminal beyond allowed free time.'],
['Devanning','','Operations','Intermediate','D','Unloading cargo from a shipping container.'],
['Dangerous Goods','DG','Cargo','Common','D','Cargo classified as hazardous and subject to special transport rules.'],
['Draft','','Documents','Intermediate','D','A preliminary document version sent for checking before final issue.'],
['ETA (Estimated Time of Arrival)','ETA','Schedules','Common','E','The expected date and time a vessel or shipment will arrive.'],
['ETD (Estimated Time of Departure)','ETD','Schedules','Common','E','The expected date and time a vessel or shipment will depart.'],
['EXW (Ex Works)','EXW','Trade Terms','Intermediate','E','An Incoterm where the seller makes goods available at a named place, often its premises.'],
['FCL (Full Container Load)','FCL','Cargo','Common','F','A shipment booked as a full container.'],
['Feeder Vessel','','Vessels','Intermediate','F','A smaller vessel carrying containers between regional ports and a larger hub.'],
['Free Time','','Charges','Common','F','The agreed period before certain demurrage or detention charges may begin.'],
['Freight','','Charges','Common','F','The charge for transporting cargo.'],
['Freight Forwarder','','People & Parties','Common','F','A logistics provider arranging transportation and related services for a shipper.'],
['Gate-in','','Operations','Common','G','The recorded entry of a truck or container into a port or terminal.'],
['Gross Weight','','Cargo','Common','G','The total weight of goods and packaging.'],
['HS Code (Harmonized System)','HS','Customs','Common','H','A product classification code used by customs to identify goods and apply duties or controls.'],
['Incoterms','','Trade Terms','Common','I','ICC rules defining key buyer and seller responsibilities, costs and risks.'],
['LCL (Less than Container Load)','LCL','Cargo','Common','L','A shipment sharing container space with other cargo.'],
['Lashing','','Operations','Intermediate','L','Securing cargo or containers to prevent movement.'],
['MAWB (Master Air Waybill)','MAWB','Documents','Rare','M','The master air transport document issued by an airline or its agent.'],
['MLO (Main Line Operator)','MLO','People & Parties','Intermediate','M','The main ocean carrier operating the long-haul vessel service.'],
['Notify Party','','People & Parties','Common','N','The party listed in transport documents to be notified about arrival.'],
['NVOCC','NVOCC','People & Parties','Rare','N','A Non-Vessel Operating Common Carrier selling ocean transport without operating the vessel.'],
['Out of Gauge','OOG','Cargo','Intermediate','O','Cargo exceeding standard container dimensions.'],
['POD (Port of Discharge)','POD','Places','Common','P','The port where cargo is unloaded from the vessel.'],
['POL (Port of Loading)','POL','Places','Common','P','The port where cargo is loaded onto the vessel.'],
['Peak Season Surcharge','PSS','Charges','Intermediate','P','A surcharge carriers may apply during high-demand periods.'],
['Reefer','','Cargo','Common','R','A refrigerated container for temperature-sensitive cargo.'],
['Roll-over','','Operations','Intermediate','R','When booked cargo is moved from the intended vessel to a later sailing.'],
['Shipper','','People & Parties','Common','S','The party sending the goods, often the exporter or seller.'],
['Shipping Instructions','SI','Documents','Common','S','Details supplied to a carrier to prepare the bill of lading.'],
['Stuffing','','Operations','Common','S','Loading cargo into a shipping container.'],
['THC (Terminal Handling Charges)','THC','Charges','Common','T','Charges for handling containers at a port or terminal.'],
['Transshipment','','Operations','Intermediate','T','Moving cargo from one vessel to another at an intermediate port.'],
['TEU (Twenty-foot Equivalent Unit)','TEU','Cargo','Intermediate','T','A standard capacity unit based on one 20-foot container.'],
['VGM (Verified Gross Mass)','VGM','Documents','Intermediate','V','The verified total gross mass of a packed export container.'],
['Voyage Number','','Schedules','Intermediate','V','The identifier assigned to a vessel sailing.'],
['Waybill','','Documents','Intermediate','W','A transport document recording carriage details, generally not a negotiable title document.']
].map(([term,abbr,category,level,letter,definition])=>({term,abbr,category,level,letter,definition}));

function GlossaryPage(){
 const [query,setQuery]=useState(''),[level,setLevel]=useState('All levels'),[category,setCategory]=useState('All categories'),[letter,setLetter]=useState('All'),[sort,setSort]=useState('A–Z'),[expanded,setExpanded]=useState(null);
 const categories=['All categories',...Array.from(new Set(glossaryTerms.map(t=>t.category))).sort()];
 const filtered=glossaryTerms.filter(t=>{const q=query.trim().toLowerCase();return(!q||`${t.term} ${t.abbr} ${t.definition} ${t.category}`.toLowerCase().includes(q))&&(level==='All levels'||t.level===level)&&(category==='All categories'||t.category===category)&&(letter==='All'||t.letter===letter)}).sort((a,b)=>sort==='A–Z'?a.term.localeCompare(b.term):b.term.localeCompare(a.term));
 return <div className="app-shell glossary-page">
  <header className="nav"><a href="/" className="brand"><span className="brand-mark"><Ship size={19}/></span><span>portside<span className="brand-dot">.</span></span></a><nav className="nav-links"><a href="/#journey">The journey</a><a className="active" href="/glossary">Glossary</a><a href="/#start">Start learning</a></nav><a className="nav-cta" href="/#journey"><ArrowRight size={15}/> Back to journey</a></header>
  <main>
   <section className="glossary-hero"><div className="glossary-hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> THE PORTSIDE FIELD GUIDE</div><h1>Shipping has a<br/><em>language of its own.</em></h1><p>From everyday port terms to the jargon seasoned operators use. Find a word, understand it, and get on with the shipment.</p><div className="glossary-count"><strong>{glossaryTerms.length}</strong><span>TERMS TO GET YOU MOVING</span><span className="count-separator"/> <span>COMMON → RARE</span></div></div>
    <div className="glossary-hero-art-wrap" aria-hidden="true"><img className="glossary-hero-art" src="/journey/portside-harbor.webp" alt="" /></div>
   </section>
   <section className="glossary-browser"><div className="glossary-controls"><label className="glossary-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a term, abbreviation or meaning..."/></label><select value={level} onChange={e=>setLevel(e.target.value)}>{['All levels','Common','Intermediate','Rare'].map(x=><option key={x}>{x}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)}><option>A–Z</option><option>Z–A</option></select></div>
    <div className="alphabet-filter">{['All',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l=><button key={l} className={letter===l?'selected':''} onClick={()=>setLetter(l)}>{l}</button>)}</div>
    <div className="glossary-results-head"><span>{filtered.length} {filtered.length===1?'TERM':'TERMS'} FOUND</span><span>SELECT A TERM TO EXPLORE</span></div>
    <div className="glossary-list">{filtered.map(t=><article className={`glossary-entry ${expanded===t.term?'expanded':''}`} key={t.term}><button className="glossary-entry-button" onClick={()=>setExpanded(expanded===t.term?null:t.term)}><span className="entry-letter">{t.letter}</span><span className="entry-name"><strong>{t.term}</strong>{t.abbr&&<small>{t.abbr}</small>}</span><span className={`level-pill ${t.level.toLowerCase()}`}>{t.level}</span><span className="entry-category">{t.category}</span><span className="entry-chevron">{expanded===t.term?'−':'+'}</span></button>{expanded===t.term&&<div className="glossary-definition"><p>{t.definition}</p><span>{t.category} · {t.level} term</span></div>}</article>)}{!filtered.length&&<div className="glossary-empty"><strong>No terms found.</strong><p>Try another word or clear one of your filters.</p><button onClick={()=>{setQuery('');setLevel('All levels');setCategory('All categories');setLetter('All')}}>Clear filters</button></div>}</div>
    <div className="glossary-footnote">A practical learning glossary. Definitions are simplified for learning; confirm shipment-specific requirements with the relevant carrier, customs authority or service provider.</div>
   </section>
  </main><footer><a href="/" className="brand"><span className="brand-mark"><Ship size={17}/></span><span>portside<span className="brand-dot">.</span></span></a><span>MADE TO MAKE SHIPPING MAKE SENSE.</span><span>© 2026 PORTSIDE LEARNING</span></footer>
 </div>;
}

function Stage({ item, index, active, onActive }) {
  const Icon = item.icon;
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === item.quiz.answer;
  return <motion.section className={`stage-row ${index % 2 ? 'reverse' : ''}`} id={`stage-${index}`} onMouseEnter={() => onActive(index)} onViewportEnter={() => onActive(index)} viewport={{ amount: 0.35 }}>
    <motion.div className="stage-copy" initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.35 }} transition={{ duration:.65 }}>
      <div className="stage-meta"><span className="stage-number">{item.n}</span><span>{item.tag}</span></div>
      <h2>{item.title}</h2>
      <p className="stage-intro">{item.copy}</p>
      <div className="learn-note"><span className="note-icon"><Icon size={17}/></span><p>{item.detail}</p></div>
      <a className="text-link" href="/glossary">Learn the lingo <ArrowUpRight size={16}/></a>
    </motion.div>
    <motion.div className="stage-visual" initial={{ opacity:0, scale:.94 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, amount:.3 }} transition={{ duration:.7 }}>
      <ShipIllustration stage={item.scene}/>
      <div className="visual-caption"><span>THE CARGO JOURNEY</span><span>{item.n} / 07</span></div>
    </motion.div>
  </motion.section>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [showGlossary, setShowGlossary] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  if (window.location.pathname.replace(/\/$/, '') === '/glossary') return <GlossaryPage/>;
  return <div className="app-shell">
    <motion.div className="top-progress" style={{ width: progress }} />
    <header className="nav">
      <a href="#" className="brand"><span className="brand-mark"><Ship size={19}/></span><span>portside<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#journey" onClick={()=>setMenuOpen(false)}>The journey</a>
        <a href="/glossary" onClick={()=>setMenuOpen(false)}>Shipping lingo</a>
        <a href="#start" onClick={()=>setMenuOpen(false)}>Start learning</a>
      </nav>
      <a className="nav-cta" href="#journey">Explore the journey <ArrowUpRight size={15}/></a>
      <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero hero-video-landing" id="start">
        <video className="hero-background-video" autoPlay muted loop playsInline preload="metadata" poster="/portside-hero-poster.jpg" aria-hidden="true">
          <source src="/portside-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-shade"/>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> YOUR FIRST DAY IN SHIPPING? START HERE.</div>
            <h1>The world moves.<br/><em>Now you know</em><br/>how it works.</h1>
            <p className="hero-sub">Shipping can sound like a different language. Let's turn containers, ports and paperwork into a journey that actually makes sense.</p>
            <div className="hero-actions"><a className="primary-btn" href="#journey">Take the cargo tour <ArrowDown size={17}/></a><span className="read-time"><span/> 7 STOPS · 5 MIN READ</span></div>
            <div className="hero-footnote"><Sparkles size={15}/> Made for the curious, not the experts.</div>
          </div>
        </div>
        <div className="hero-video-tag"><span className="video-live-dot"/> A WORLD IN MOTION <span>PORTSIDE TERMINAL</span></div>
        <div className="hero-bottom"><span>SCROLL TO FOLLOW ONE SHIPMENT</span><div className="scroll-line"><i/></div><span>01 — 07</span></div>
      </section>

      <section className="intro-strip"><div className="mini-port-decor" aria-hidden="true"><span className="mini-box blue"/><span className="mini-box orange"/><span className="mini-crane"/><span className="mini-truck"/></div>
        <div><span className="strip-kicker">A QUICK NOTE</span><p>Imagine one shipment of goods travelling from a factory to a buyer on the other side of the ocean. <strong>We'll follow it, one step at a time.</strong></p></div>
        <div className="route-pills"><span>🏭 Factory</span><ArrowRight size={14}/><span>🚢 Port</span><ArrowRight size={14}/><span>🌍 Buyer</span></div>
      </section>

      <section className="journey-heading" id="journey">
        <div className="eyebrow"><span className="eyebrow-dot"/> THE BIG PICTURE</div>
        <h2>One shipment.<br/><em>Seven little milestones.</em></h2>
        <p>Keep scrolling. The cargo moves, and the shipping world starts to click.</p>
        <div className="journey-progress"><span>YOUR PROGRESS</span><div className="progress-track"><motion.div animate={{width:`${((active+1)/7)*100}%`}}/></div><span>0{active+1} / 07</span></div>
      </section>

      <div className="stages journey-stages">
        <div className="route-rail" aria-label={`Cargo journey progress: stop ${active + 1} of 7`}>
          <div className="rail-line"><motion.div className="rail-fill" animate={{ height: `${((active + 1) / 7) * 100}%` }} transition={{ duration: .45 }}/></div>
          <motion.div className="rail-ship" animate={{ top: `${(active / 6) * 100}%` }} transition={{ type: 'spring', stiffness: 95, damping: 18 }}><Ship size={17}/></motion.div>
          <div className="rail-dots">{stages.map((item, i) => <button key={item.n} className={active === i ? 'rail-dot active' : 'rail-dot'} onClick={() => document.getElementById(`stage-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })} aria-label={`Go to ${item.tag}`} />)}</div>
        </div>
        {stages.map((item, i) => <Stage key={item.n} item={item} index={i} active={active===i} onActive={setActive}/>)}
      </div>

      <section className="glossary" id="glossary">
        <div className="glossary-top"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR FIRST SHIPPING WORDS</div><h2>Decode the <em>lingo.</em></h2></div><p>You'll hear these words a lot. Here's your pocket-sized cheat sheet.</p></div>
        <div className="terms-grid">
          {[['POL','Port of Loading','The port where the cargo is loaded onto the vessel.'],['POD','Port of Discharge','The port where the cargo is unloaded from the vessel.'],['ETD','Estimated Time of Departure','The expected date and time a vessel leaves.'],['ETA','Estimated Time of Arrival','The expected date and time a vessel arrives.'],['B/L','Bill of Lading','A key transport document issued by or for the carrier.'],['FCL','Full Container Load','A shipment booked as a full container.']].map(([short,name,desc])=><article className="term-card" key={short}><span>{short}</span><h3>{name}</h3><p>{desc}</p></article>)}
        </div>
        <a className="glossary-more" href="/glossary">Show more shipping terms <ArrowUpRight size={16}/></a>
      </section>

      <section className="outro"><div className="outro-port-toys" aria-hidden="true"><span className="mini-box blue"/><span className="mini-box orange"/><span className="mini-ship"/></div>
        <div className="outro-doodle">✳</div>
        <div className="eyebrow"><span className="eyebrow-dot"/> AND THAT'S THE JOURNEY</div>
        <h2>You're not new to<br/><em>shipping anymore.</em></h2>
        <p>Well, you've got the map. There's a whole ocean of things to learn next.</p>
        <a href="#start" className="primary-btn">Take the tour again <ArrowUpRight size={17}/></a>
        <div className="outro-wave"/>
      </section>
    </main>
    <footer><a href="#" className="brand"><span className="brand-mark"><Ship size={17}/></span><span>portside<span className="brand-dot">.</span></span></a><span>MADE TO MAKE SHIPPING MAKE SENSE.</span><span>© 2026 PORTSIDE LEARNING</span></footer>
  </div>
}
export default App;