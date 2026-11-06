import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Anchor, ArrowDown, ArrowRight, ArrowUpRight, Box, Check, ChevronDown, Compass, FileText, Globe2, Menu, Package, Ship, Sparkles, Truck, Waves, X } from 'lucide-react';

const stages = [
  { n:'01', tag:'THE BEGINNING', title:'It starts at the factory.', copy:'A buyer has ordered goods. The seller gets them ready, checks the quantity and quality, and packs everything for its journey.', detail:'Think of this as the “ready to ship” moment. The cargo exists, the order is confirmed, and someone now needs to move it across borders.', icon:Package, color:'#f4bd58', scene:'factory' },
  { n:'02', tag:'GETTING THE PAPERWORK RIGHT', title:'Paperwork gives cargo a passport.', copy:'Before cargo moves, the people involved prepare documents that explain what is being shipped, who is sending it, and who should receive it.', detail:'Common documents include the Commercial Invoice, Packing List and Shipping Instructions. The exact set depends on the shipment, route and regulations.', icon:FileText, color:'#a7c9b7', scene:'paper' },
  { n:'03', tag:'THE PORT CHECK-IN', title:'Welcome to the port.', copy:'The cargo is moved to the port or container freight station. The container is received, weighed where required, and checked against the booking details.', detail:'A port is a busy handover point. Gate-in, terminal cut-offs and documentation deadlines all matter. Miss a cut-off and the shipment may roll to another vessel.', icon:Anchor, color:'#eaa28d', scene:'port' },
  { n:'04', tag:'CUSTOMS & CLEARANCE', title:'A quick check before the big trip.', copy:'Customs authorities review the declaration and supporting documents. Depending on the cargo, route and risk checks, an examination may also happen.', detail:'Customs clearance is not the same as port handling. Customs is a government control process; the terminal manages the physical movement of cargo.', icon:Check, color:'#b6b1e7', scene:'customs' },
  { n:'05', tag:'STUFFING & LOADING', title:'All packed. Time to board.', copy:'Cargo is loaded into a container (stuffing), secured, sealed and moved to the terminal. The container is then loaded onto the vessel.', detail:'The container number and seal number become important references. Good packing and lashing help protect cargo during road, terminal and sea movements.', icon:Box, color:'#e8b4cf', scene:'loading' },
  { n:'06', tag:'THE OCEAN LEG', title:'A little blue-road adventure.', copy:'The vessel sails from the Port of Loading (POL) towards the Port of Discharge (POD). The carrier shares schedule updates as the ship travels.', detail:'ETD means Estimated Time of Departure. ETA means Estimated Time of Arrival. Transit time is the planned duration between the relevant ports.', icon:Ship, color:'#83b8d2', scene:'voyage' },
  { n:'07', tag:'ARRIVAL & DELIVERY', title:'The cargo reaches its new home.', copy:'At destination, the container is discharged, import formalities are completed, and the cargo is released for delivery to the consignee.', detail:'The consignee is the party receiving the goods. After release, the container is delivered, unloaded (devanned) and returned within the allowed free time.', icon:Truck, color:'#f1c77c', scene:'delivery' },
];

function ShipIllustration({ stage }) {
  return <div className={`scene scene-${stage}`}>
    <div className="sun" />
    <div className="cloud cloud-one" /><div className="cloud cloud-two" />
    {stage === 'factory' && <div className="factory"><div className="factory-roof"/><div className="chimney"/><div className="factory-window"/><div className="factory-door"/></div>}
    {stage === 'paper' && <div className="paper-stack"><div/><div/><div/></div>}
    {stage === 'port' && <><div className="crane"><i/><b/><span/></div><div className="container-blocks"><i/><i/><i/><i/></div></>}
    {stage === 'customs' && <div className="customs-card"><div className="stamp">OK</div><span/><span/><span/></div>}
    {stage === 'loading' && <div className="container-stack"><i/><i/><i/><i/><i/><i/></div>}
    {(stage === 'voyage' || stage === 'delivery') && <div className="ship-art"><div className="ship-top"><i/><i/><i/></div><div className="ship-hull"/></div>}
    {stage === 'delivery' && <div className="warehouse"><span/><span/><span/></div>}
    <div className="horizon"/>
    <div className="wave wave-a"/><div className="wave wave-b"/><div className="wave wave-c"/>
    <div className="scene-label">{stage === 'voyage' ? 'AT SEA · DAY 08' : stage === 'delivery' ? 'DELIVERED · DAY 16' : 'CARGO JOURNEY'}</div>
  </div>
}

function Stage({ item, index, active, onActive }) {
  const Icon = item.icon;
  return <motion.section className={`stage-row ${index % 2 ? 'reverse' : ''}`} id={`stage-${index}`} onMouseEnter={() => onActive(index)} onViewportEnter={() => onActive(index)} viewport={{ amount: 0.35 }}>
    <motion.div className="stage-copy" initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.35 }} transition={{ duration:.65 }}>
      <div className="stage-meta"><span className="stage-number">{item.n}</span><span>{item.tag}</span></div>
      <h2>{item.title}</h2>
      <p className="stage-intro">{item.copy}</p>
      <div className="learn-note"><span className="note-icon"><Icon size={17}/></span><p>{item.detail}</p></div>
      <a className="text-link" href="#glossary">Learn the lingo <ArrowUpRight size={16}/></a>
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
  return <div className="app-shell">
    <motion.div
  className="top-progress"
  style={{ width: progress }}
/>
    <header className="nav">
      <a href="#" className="brand"><span className="brand-mark"><Ship size={19}/></span><span>portside<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#journey" onClick={()=>setMenuOpen(false)}>The journey</a>
        <a href="#glossary" onClick={()=>setMenuOpen(false)}>Shipping lingo</a>
        <a href="#start" onClick={()=>setMenuOpen(false)}>Start learning</a>
      </nav>
      <a className="nav-cta" href="#journey">Explore the journey <ArrowUpRight size={15}/></a>
      <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero" id="start">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> YOUR FIRST DAY IN SHIPPING? START HERE.</div>
            <h1>The world moves.<br/><em>Now you know</em><br/>how it works.</h1>
            <p className="hero-sub">Shipping can sound like a different language. Let's turn containers, ports and paperwork into a journey that actually makes sense.</p>
            <div className="hero-actions"><a className="primary-btn" href="#journey">Take the cargo tour <ArrowDown size={17}/></a><span className="read-time"><span/> 7 STOPS · 5 MIN READ</span></div>
            <div className="hero-footnote"><Sparkles size={15}/> Made for the curious, not the experts.</div>
          </div>
          <div className="hero-art">
            <div className="art-sticker sticker-one">FROM FACTORY <ArrowRight size={13}/></div>
            <div className="art-sticker sticker-two">TO THE WORLD ✳</div>
            <div className="hero-sun"/>
            <div className="hero-cloud cloud-a"/><div className="hero-cloud cloud-b"/>
            <div className="hero-sea sea-one"/><div className="hero-sea sea-two"/>
            <div className="hero-ship">
              <div className="hero-containers"><i/><i/><i/><i/><i/><i/><i/><i/></div>
              <div className="hero-cabin"><b/><b/></div><div className="hero-hull"/>
            </div>
            <div className="route-dash">〰 〰 〰 〰 〰</div>
            <div className="hero-coordinate">08° 34' N<br/>76° 56' E</div>
            <div className="hero-stamp">CARGO<br/>IN MOTION</div>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO FOLLOW ONE SHIPMENT</span><div className="scroll-line"><i/></div><span>01 — 07</span></div>
      </section>

      <section className="intro-strip">
        <div><span className="strip-kicker">A QUICK NOTE</span><p>Imagine one shipment of goods travelling from a factory to a buyer on the other side of the ocean. <strong>We'll follow it, one step at a time.</strong></p></div>
        <div className="route-pills"><span>🏭 Factory</span><ArrowRight size={14}/><span>🚢 Port</span><ArrowRight size={14}/><span>🌍 Buyer</span></div>
      </section>

      <section className="journey-heading" id="journey">
        <div className="eyebrow"><span className="eyebrow-dot"/> THE BIG PICTURE</div>
        <h2>One shipment.<br/><em>Seven little milestones.</em></h2>
        <p>Keep scrolling. The cargo moves, and the shipping world starts to click.</p>
        <div className="journey-progress"><span>YOUR PROGRESS</span><div className="progress-track"><motion.div animate={{width:`${((active+1)/7)*100}%`}}/></div><span>0{active+1} / 07</span></div>
      </section>

      <div className="stages">
        {stages.map((item, i) => <Stage key={item.n} item={item} index={i} active={active===i} onActive={setActive}/>)}
      </div>

      <section className="glossary" id="glossary">
        <div className="glossary-top"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR FIRST SHIPPING WORDS</div><h2>Decode the <em>lingo.</em></h2></div><p>You'll hear these words a lot. Here's your pocket-sized cheat sheet.</p></div>
        <div className="terms-grid">
          {[['POL','Port of Loading','The port where the cargo is loaded onto the vessel.'],['POD','Port of Discharge','The port where the cargo is unloaded from the vessel.'],['ETD','Estimated Time of Departure','The expected date and time a vessel leaves.'],['ETA','Estimated Time of Arrival','The expected date and time a vessel arrives.'],['B/L','Bill of Lading','A key transport document issued by or for the carrier.'],['FCL','Full Container Load','A shipment booked as a full container.']].map(([short,name,desc])=><article className="term-card" key={short}><span>{short}</span><h3>{name}</h3><p>{desc}</p></article>)}
        </div>
        <button className="glossary-more" onClick={()=>setShowGlossary(!showGlossary)}>{showGlossary ? 'Show less' : 'Show more shipping terms'} <ChevronDown size={16} className={showGlossary?'rotate':''}/></button>
        {showGlossary && <div className="terms-grid extra-terms">{[['LCL','Less than Container Load','Cargo that shares container space with other shipments.'],['CFS','Container Freight Station','A facility where LCL cargo is consolidated or deconsolidated.'],['THC','Terminal Handling Charges','Charges for handling cargo at the terminal.'],['Free time','Allowed time','The period cargo or a container can stay without certain extra charges.']].map(([s,n,d])=><article className="term-card" key={s}><span>{s}</span><h3>{n}</h3><p>{d}</p></article>)}</div>}
      </section>

      <section className="outro">
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