'use strict';

const { createElement: h, useState, useEffect, useRef, useCallback } = React;

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const MODELS = [
  { id:'x', name:'Model X', subtitle:'Obsidian — the silent predator', badge:'Model X · Obsidian', price:'₹89L',
    range:'450km', sprint:'3.1s', power:'540hp', torque:'820Nm', top:'250km/h', charge:'22min', flagship:false,
    colors:['#1a1a1a','#c0c0c0','#1a3a5c','#8b1a1a'],
    desc:'The Model X is FORMA\'s entry into silent dominance. Forged from aerospace-grade aluminium and wrapped in smart aerodynamics, the Obsidian edition is engineered for those who prefer their power understated. Every system, from the adaptive air suspension to the predictive torque vectoring, answers before you ask.',
    img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85&auto=format&fit=crop',
    bg :'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=90&auto=format&fit=crop' },
  { id:'y', name:'Model Y', subtitle:'Solaris — born from sunlight', badge:'Model Y · Solaris', price:'₹79L',
    range:'400km', sprint:'3.6s', power:'480hp', torque:'720Nm', top:'235km/h', charge:'26min', flagship:false,
    colors:['#d4a843','#f5f5dc','#2d4a1e','#4a2d1e'],
    desc:'Where warmth meets velocity. The Model Y Solaris draws its identity from light — amber glass roof, solar-assisted charging, and a cabin that floods with natural illumination. It\'s the most liveable FORMA ever made, without surrendering a single percentage of performance.',
    img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop',
    bg :'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=90&auto=format&fit=crop' },
  { id:'z', name:'Model Z', subtitle:'Apex — the pinnacle redefined', badge:'★ Flagship · Model Z', price:'₹1.2Cr',
    range:'500km', sprint:'2.8s', power:'680hp', torque:'1050Nm', top:'280km/h', charge:'18min', flagship:true,
    colors:['#080808','#e8e8e8','#1a1a3a','#1a3a1a'],
    desc:'The Model Z Apex is the answer to a question nobody dared ask: what if a supercar had a conscience? With 680hp delivered instantly to all four wheels, active aerodynamics that reshape the body at speed, and a hand-built interior requiring 240 hours of craftsmanship — this is FORMA\'s absolute statement.',
    img:'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=900&q=85&auto=format&fit=crop',
    bg :'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&q=90&auto=format&fit=crop' },
];

const FEATURES = [
  { icon:'⚡', title:'Zero Emission',     desc:'Every FORMA runs entirely on electric power. Full performance, zero guilt.' },
  { icon:'🛡️', title:'Autonomous Safety', desc:'11-sensor array with 360° radar gives you a protective cocoon at all speeds.' },
  { icon:'🔋', title:'Rapid Charge',      desc:'20-minute charge delivers 300km. Works at 5,000+ stations worldwide.' },
  { icon:'🎨', title:'Bespoke Studio',    desc:'Configure every surface and colour from 2,400+ combinations online or in-showroom.' },
];

const GALLERY = [
  { src:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop', label:'Detail'   },
  { src:'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&q=80&auto=format&fit=crop', label:'Interior'  },
  { src:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&auto=format&fit=crop', label:'Exterior'  },
  { src:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80&auto=format&fit=crop', label:'Night'     },
  { src:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&auto=format&fit=crop', label:'Track'     },
];

const TESTIMONIALS = [
  { quote:'FORMA didn\'t just give me a car. It gave me a new relationship with the <em>road</em>.', author:'Arjun Mehta — Model Z Owner, Mumbai'   },
  { quote:'The range anxiety is gone. The joy of driving has <em>never</em> been more alive.',        author:'Priya Nair — Model X Owner, Bangalore' },
  { quote:'Every detail whispers precision. This is what <em>engineering poetry</em> feels like.',    author:'Rohan Das — Model Y Owner, Delhi'       },
];

const STATS = [
  { value:'450+', label:'km Max Range'   },
  { value:'2.8s', label:'0–100 km/h'    },
  { value:'680hp',label:'Peak Power'    },
  { value:'340+', label:'Global Patents' },
];

const MILESTONES = [
  { val:'12',   label:'Years Building'  },
  { val:'340+', label:'Patents'         },
  { val:'3',    label:'Flagship Models' },
];

const TIMELINE = [
  { year:'2014', event:'FORMA founded in Chennai by Vikram Nair and a team of 8 engineers.' },
  { year:'2016', event:'First prototype — the FORMA Alpha — completes 800km endurance test.' },
  { year:'2018', event:'Series A funding secured. Design studio opens in Bangalore.' },
  { year:'2020', event:'Model X enters production. First 500 units sold out in 4 hours.' },
  { year:'2022', event:'Model Y Solaris launched. FORMA opens 10 showrooms across India.' },
  { year:'2024', event:'Model Z Apex unveiled. 340+ patents filed. Global expansion begins.' },
  { year:'2026', event:'Next generation platform announced. 18 showrooms. 12,000 vehicles on road.' },
];

const TEAM = [
  { name:'Vikram Nair',   role:'Founder & CEO',        img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop' },
  { name:'Ananya Iyer',   role:'Chief Design Officer',  img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop' },
  { name:'Roshan Menon',  role:'Chief Engineer',        img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop' },
];

const FOOTER_COLS = [
  { title:'Models',  links:[{label:'Model X — Obsidian',page:'models'},{label:'Model Y — Solaris',page:'models'},{label:'Model Z — Apex',page:'models'},{label:'Coming Soon',page:null}] },
  { title:'Company', links:[{label:'About Us',page:'about'},{label:'Design Studio',page:'about'},{label:'Careers',page:'contact'},{label:'Press',page:'contact'}] },
  { title:'Support', links:[{label:'Find Showroom',page:'contact'},{label:'Book Test Drive',page:'contact'},{label:'Service Centers',page:'contact'},{label:'hello@forma.auto',page:null}] },
];

/* ════════════════════════════════════════════
   ROUTER — simple hash-based, no library
════════════════════════════════════════════ */
// Supported routes:
//   #/           → Home
//   #/models     → All Models
//   #/model/x    → Model detail (x|y|z)
//   #/about      → About
//   #/contact    → Contact

function parseHash() {
  const hash = window.location.hash.replace('#', '') || '/';
  const parts = hash.split('/').filter(Boolean);
  if (!parts.length)              return { page:'home',   param:null };
  if (parts[0] === 'models' && parts[1] === undefined) return { page:'models', param:null };
  if (parts[0] === 'model'  && parts[1])               return { page:'model-detail', param:parts[1] };
  if (parts[0] === 'about')       return { page:'about',   param:null };
  if (parts[0] === 'contact')     return { page:'contact', param:null };
  return { page:'home', param:null };
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top:0, behavior:'smooth' });
}

function useRouter() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const fn = () => setRoute(parseHash());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
}

/* ════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════ */
function useNavScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', fn, { passive:true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [threshold]);
  return scrolled;
}

function useScrollReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
        }),
        { threshold:0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  });
}

function useToast() {
  const [msg,     setMsg]     = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);
  const show  = useCallback(message => {
    setMsg(message); setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 3200);
  }, []);
  return { msg, visible, show };
}

/* ════════════════════════════════════════════
   SHARED COMPONENTS
════════════════════════════════════════════ */
function Navbar({ currentPage, onBookDrive }) {
  const scrolled = useNavScroll();
  const [open, setOpen] = useState(false);
  const solid = currentPage !== 'home';

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const links = [
    { label:'Home',    page:'/',        key:'home'    },
    { label:'Models',  page:'/models',  key:'models'  },
    { label:'About',   page:'/about',   key:'about'   },
    { label:'Contact', page:'/contact', key:'contact' },
  ];

  const isActive = key => currentPage === key || (key === 'home' && currentPage === 'home');

  return h('header', null,
    h('nav', { className:`navbar ${scrolled ? 'scrolled' : ''} ${solid ? 'solid' : ''}` },

      h('span', { className:'navbar-logo', onClick:() => { navigate('/'); setOpen(false); } }, 'FORMA'),

      h('ul', { className:'navbar-links' },
        links.map(l => h('li', { key:l.key },
          h('button', {
            className: isActive(l.key) ? 'active' : '',
            onClick:() => { navigate(l.page); setOpen(false); }
          }, l.label)
        ))
      ),

      h('button', { className:'navbar-cta', onClick:onBookDrive }, 'Book a Drive'),

      h('button', {
        className:`hamburger ${open ? 'open' : ''}`,
        onClick:() => setOpen(v => !v),
        'aria-label':'Toggle menu',
      }, h('span'), h('span'), h('span'))
    ),

    h('div', { className:`mobile-nav ${open ? 'open' : ''}` },
      links.map(l => h('button', {
        key:l.key,
        onClick:() => { navigate(l.page); setOpen(false); }
      }, l.label))
    )
  );
}

function Footer({ navigate: nav }) {
  return h('footer', { className:'footer' },
    h('div', { className:'footer-top' },
      h('div', null,
        h('div', { className:'footer-brand-logo', style:{cursor:'pointer'}, onClick:() => navigate('/') }, 'FORMA'),
        h('p',   { className:'footer-brand-desc' }, 'Precision-crafted electric vehicles for those who understand the journey is the destination.')
      ),
      FOOTER_COLS.map(col => h('div', { className:'footer-col', key:col.title },
        h('h4', null, col.title),
        h('ul', null, col.links.map(l => h('li', { key:l.label },
          h('button', {
            onClick: () => l.page ? navigate(`/${l.page}`) : null,
            style: { cursor: l.page ? 'pointer' : 'default' }
          }, l.label)
        )))
      ))
    ),
    h('div', { className:'footer-bottom' },
      h('p', null, '© 2026 FORMA Automotive. All rights reserved.'),
      h('p', null, 'Privacy · Terms · Cookies')
    )
  );
}

function Toast({ msg, visible }) {
  return h('div', { className:`toast ${visible ? 'show' : ''}` }, `✓  ${msg}`);
}

function StatsBar() {
  return h('div', { className:'stats-bar' },
    STATS.map(s => h('div', { className:'stat-item', key:s.label },
      h('div', { className:'stat-value' }, s.value),
      h('div', { className:'stat-label' }, s.label)
    ))
  );
}

/* ════════════════════════════════════════════
   PAGE: HOME
════════════════════════════════════════════ */
function Hero({ onExplore }) {
  const [active,  setActive]  = useState(0);
  const [visible, setVisible] = useState(true);

  const switchModel = idx => {
    if (idx === active) return;
    setVisible(false);
    setTimeout(() => { setActive(idx); setVisible(true); }, 380);
  };

  const m = MODELS[active];

  return h('section', { className:'hero', id:'hero' },
    h('div', { className:'hero-bg', style:{ backgroundImage:`url('${m.bg}')`, opacity: visible ? 1 : 0 } }),
    h('div', { className:'hero-overlay' }),
    h('div', { className:'hero-content' },
      h('p',  { className:'hero-tag' }, 'Est. 2026 — Automotive Excellence'),
      h('h1', { className:'hero-title' }, 'FOR', h('span', { className:'gold' }, 'MA')),
      h('p',  { className:'hero-sub'  }, 'Where precision engineering meets cinematic design. Every curve, a statement.'),
      h('div', { className:'hero-actions' },
        h('button', { className:'btn btn-gold',    onClick:onExplore          }, 'Explore Models'),
        h('button', { className:'btn btn-outline', onClick:() => navigate('/about') }, 'Our Story')
      )
    ),
    h('div', { className:'hero-tabs' },
      MODELS.map((mod, i) => h('button', {
        key:mod.id,
        className:`model-tab ${active === i ? 'active' : ''}`,
        onClick:() => switchModel(i),
      }, mod.id.toUpperCase()))
    )
  );
}

function ModelCard({ model, onConfigure }) {
  return h('div', {
    className:`model-card reveal ${model.flagship ? 'flagship' : ''}`,
    onClick:() => navigate(`/model/${model.id}`),
  },
    h('div', { className:'card-img-wrap' },
      h('img', { src:model.img, alt:model.name, loading:'lazy' }),
      h('div', { className:'card-badge' }, model.badge)
    ),
    h('div', { className:'card-body' },
      h('div', { className:'card-name'     }, model.name),
      h('div', { className:'card-subtitle' }, model.subtitle),
      h('div', { className:'card-specs' },
        h('span', { className:'spec-pill' }, model.range),
        h('span', { className:'spec-pill' }, `${model.sprint} 0–100`),
        h('span', { className:'spec-pill' }, model.power)
      ),
      h('div', { className:'card-footer' },
        h('div', { className:'card-price' }, model.price),
        h('button', {
          className:'card-cta',
          onClick: e => { e.stopPropagation(); onConfigure(model); }
        }, 'Configure ', h('span', null, '→'))
      )
    )
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(v => (v + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];
  return h('div', { className:'testimonial-section' },
    h('p',   { className:'testimonial-quote',  dangerouslySetInnerHTML:{ __html:`"${t.quote}"` } }),
    h('p',   { className:'testimonial-author'  }, `— ${t.author}`),
    h('div', { className:'testimonial-dots'    },
      TESTIMONIALS.map((_, i) => h('button', {
        key:i, className:`t-dot ${active === i ? 'active' : ''}`,
        onClick:() => setActive(i), 'aria-label':`Testimonial ${i+1}`,
      }))
    )
  );
}

function HomePage({ onBookDrive }) {
  useScrollReveal();
  const handleExplore = () => navigate('/models');

  return h('div', { className:'page-enter' },
    h(Hero, { onExplore:handleExplore }),
    h(StatsBar),

    // Models preview
    h('section', { id:'models' },
      h('div', { className:'section-wrap' },
        h('div', { className:'section-head reveal' },
          h('p',   { className:'section-tag-sm' }, '2026 Collection'),
          h('h2',  { className:'section-title'  }, 'The Lineup'),
          h('div', { className:'section-line'   })
        ),
        h('div', { className:'models-grid' },
          MODELS.map(m => h(ModelCard, { key:m.id, model:m, onConfigure:() => navigate(`/model/${m.id}`) }))
        ),
        h('div', { style:{ textAlign:'center', marginTop:'2.5rem' } },
          h('button', { className:'btn btn-outline', onClick:() => navigate('/models') }, 'View All Models →')
        )
      )
    ),

    // Features
    h('section', { style:{ background:'#0d0d0d', borderTop:'1px solid #222' } },
      h('div', { className:'section-wrap' },
        h('div', { className:'section-head reveal' },
          h('p',   { className:'section-tag-sm' }, 'Why FORMA'),
          h('h2',  { className:'section-title'  }, 'Built Different'),
          h('div', { className:'section-line'   })
        ),
        h('div', { className:'features-grid reveal' },
          FEATURES.map(f => h('div', { className:'feature-item', key:f.title },
            h('div', { className:'feature-icon'  }, f.icon),
            h('div', { className:'feature-title' }, f.title),
            h('p',   { className:'feature-desc'  }, f.desc)
          ))
        )
      )
    ),

    // About teaser
    h('section', null,
      h('div', { className:'section-wrap' },
        h('div', { className:'about-split' },
          h('div', { className:'about-img reveal' },
            h('img', { src:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop', alt:'FORMA' }),
            h('div', { className:'about-img-tag' }, 'Since 2014 — Chennai, India')
          ),
          h('div', { className:'about-text reveal' },
            h('h2', null, 'Crafted with ', h('span', null, 'Purpose')),
            h('p', null, 'FORMA was born in 2014 from a single obsession — that performance and sustainability need not be opposites.'),
            h('p', null, 'Every detail, from the aerodynamic silhouette to the hand-stitched interior, is a statement about who you are.'),
            h('div', { className:'about-milestones' },
              MILESTONES.map(m => h('div', { key:m.label },
                h('div', { className:'milestone-val'   }, m.val),
                h('div', { className:'milestone-label' }, m.label)
              ))
            ),
            h('div', { style:{ marginTop:'2rem', display:'flex', gap:'1rem', flexWrap:'wrap' } },
              h('button', { className:'btn btn-gold',    onClick:() => navigate('/about')   }, 'Our Story'),
              h('button', { className:'btn btn-outline', onClick:() => navigate('/contact') }, 'Visit Showroom')
            )
          )
        )
      )
    ),

    h(TestimonialsSection),

    // Gallery
    h('section', null,
      h('div', { className:'section-wrap' },
        h('div', { className:'section-head reveal' },
          h('p',   { className:'section-tag-sm' }, 'Visual Journal'),
          h('h2',  { className:'section-title'  }, 'Gallery'),
          h('div', { className:'section-line'   })
        ),
        h('div', { className:'gallery-grid reveal' },
          GALLERY.map(g => h('div', { className:'gallery-cell', key:g.label },
            h('img', { src:g.src, alt:g.label, loading:'lazy' }),
            h('div', { className:'gallery-label' }, g.label)
          ))
        )
      )
    ),

    // CTA
    h('section', { className:'cta-section' },
      h('h2', { className:'cta-title' }, 'Drive the ', h('span', null, 'Future')),
      h('p',  { className:'cta-sub'   }, 'Book a test drive at any of our 18 showrooms across India.'),
      h('div', { className:'cta-actions' },
        h('button', { className:'btn btn-gold',    onClick:onBookDrive             }, 'Book a Test Drive'),
        h('button', { className:'btn btn-outline', onClick:() => navigate('/contact') }, 'Find a Showroom')
      )
    )
  );
}

/* ════════════════════════════════════════════
   PAGE: ALL MODELS
════════════════════════════════════════════ */
function ModelsPage({ onConfigure }) {
  useScrollReveal();
  return h('div', { className:'page-enter' },
    h('div', { className:'page-hero' },
      h('p', { className:'section-tag-sm' }, '2026 Collection'),
      h('h1', null, 'All ', h('span', { style:{color:'var(--gold)'} }, 'Models')),
      h('p', null, 'Three vehicles. One obsession. Pick yours.')
    ),
    h('div', { className:'section-wrap', style:{ paddingTop:0 } },
      h('div', { className:'models-grid' },
        MODELS.map(m => h(ModelCard, { key:m.id, model:m, onConfigure }))
      )
    ),
    h(StatsBar)
  );
}

/* ════════════════════════════════════════════
   PAGE: MODEL DETAIL
════════════════════════════════════════════ */
function ModelDetailPage({ modelId, onBookDrive }) {
  useScrollReveal();
  const model = MODELS.find(m => m.id === modelId);
  const [selectedColor, setSelectedColor] = useState(0);
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', city:'', variant:'Standard' });

  if (!model) return h('div', { className:'section-wrap', style:{paddingTop:'8rem'} },
    h('h2', null, 'Model not found.'),
    h('button', { className:'btn btn-gold', style:{marginTop:'1rem'}, onClick:() => navigate('/models') }, '← Back to Models')
  );

  const handleForm = e => {
    e.preventDefault();
    onBookDrive(model.name);
  };

  return h('div', { className:'page-enter' },
    // Hero
    h('div', { className:'detail-hero' },
      h('div', { className:'detail-hero-bg', style:{ backgroundImage:`url('${model.bg}')` } }),
      h('div', { className:'detail-hero-overlay' }),
      h('div', { className:'detail-hero-content' },
        h('div', { className:'detail-title' }, model.name),
        h('div', { className:'detail-subtitle' }, model.subtitle)
      )
    ),

    // Body: specs left, config form right
    h('div', { className:'detail-body' },

      // Left column
      h('div', null,
        h('div', { className:'detail-specs-grid reveal' },
          [
            { key:'range',  val:model.range,  label:'Range'        },
            { key:'sprint', val:model.sprint, label:'0–100 km/h'   },
            { key:'power',  val:model.power,  label:'Peak Power'   },
            { key:'torque', val:model.torque, label:'Torque'       },
            { key:'top',    val:model.top,    label:'Top Speed'    },
            { key:'charge', val:model.charge, label:'Rapid Charge' },
          ].map(s => h('div', { className:'detail-spec-cell', key:s.key },
            h('div', { className:'detail-spec-val' }, s.val),
            h('div', { className:'detail-spec-key' }, s.label)
          ))
        ),
        h('p', { className:'detail-desc reveal' }, model.desc),
        h('div', { className:'detail-price-row reveal' },
          h('div', { className:'detail-price' }, model.price),
          h('span', { style:{ fontSize:'0.7rem', color:'var(--muted)', letterSpacing:'0.15em', textTransform:'uppercase' } }, 'ex-showroom')
        ),

        // Color swatches
        h('div', { className:'reveal', style:{ marginTop:'2rem' } },
          h('p', { style:{ fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'0.75rem' } }, 'Available Colours'),
          h('div', { className:'color-swatches' },
            model.colors.map((c, i) => h('div', {
              key:i,
              className:`swatch ${selectedColor === i ? 'selected' : ''}`,
              style:{ background:c },
              onClick:() => setSelectedColor(i),
              title:`Colour ${i+1}`,
            }))
          )
        ),

        h('div', { style:{ display:'flex', gap:'1rem', marginTop:'2.5rem', flexWrap:'wrap' } },
          h('button', { className:'btn btn-outline btn-sm', onClick:() => navigate('/models') }, '← All Models'),
          h('button', { className:'btn btn-outline btn-sm', onClick:() => navigate('/contact') }, 'Find Showroom')
        )
      ),

      // Right column: configuration form
      h('div', { className:'config-form reveal' },
        h('h3', null, 'Configure & Book'),

        h('div', { className:'form-group' },
          h('label', null, 'Full Name'),
          h('input', { type:'text', placeholder:'Your name', value:formData.name, onChange:e => setFormData(p => ({...p, name:e.target.value})) })
        ),
        h('div', { className:'form-group' },
          h('label', null, 'Email'),
          h('input', { type:'email', placeholder:'you@email.com', value:formData.email, onChange:e => setFormData(p => ({...p, email:e.target.value})) })
        ),
        h('div', { className:'form-group' },
          h('label', null, 'Phone'),
          h('input', { type:'tel', placeholder:'+91 XXXXX XXXXX', value:formData.phone, onChange:e => setFormData(p => ({...p, phone:e.target.value})) })
        ),
        h('div', { className:'form-group' },
          h('label', null, 'City'),
          h('select', { value:formData.city, onChange:e => setFormData(p => ({...p, city:e.target.value})) },
            h('option', { value:'' }, 'Select city'),
            ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune','Kolkata'].map(c =>
              h('option', { key:c, value:c }, c)
            )
          )
        ),
        h('div', { className:'form-group' },
          h('label', null, 'Variant'),
          h('select', { value:formData.variant, onChange:e => setFormData(p => ({...p, variant:e.target.value})) },
            ['Standard','Premium','Performance','Bespoke'].map(v =>
              h('option', { key:v, value:v }, v)
            )
          )
        ),
        h('button', { className:'btn btn-gold', style:{ width:'100%', justifyContent:'center', marginTop:'0.5rem' }, onClick:handleForm },
          `Book ${model.name} Test Drive`
        ),
        h('p', { style:{ fontSize:'0.65rem', color:'var(--muted)', marginTop:'1rem', textAlign:'center' } },
          'No payment required. Our team will contact you within 24 hours.'
        )
      )
    )
  );
}

/* ════════════════════════════════════════════
   PAGE: ABOUT
════════════════════════════════════════════ */
function AboutPage() {
  useScrollReveal();
  return h('div', { className:'page-enter' },
    h('div', { className:'page-hero' },
      h('p', { className:'section-tag-sm' }, 'Our Story'),
      h('h1', null, 'Built with ', h('span', { style:{color:'var(--gold)'} }, 'Obsession')),
      h('p', null, 'Twelve years of relentless engineering from Chennai to the world.')
    ),

    h('div', { className:'section-wrap' },

      // Mission
      h('div', { className:'about-split reveal' },
        h('div', { className:'about-img' },
          h('img', { src:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop', alt:'FORMA' }),
          h('div', { className:'about-img-tag' }, 'Chennai Design Studio')
        ),
        h('div', { className:'about-text' },
          h('h2', null, 'The ', h('span', null, 'Mission')),
          h('p', null, 'FORMA was founded on the belief that India deserves a world-class electric vehicle manufacturer — one that doesn\'t compromise on performance, design, or soul.'),
          h('p', null, 'We started in a 400 sq.ft. workshop in Chennai with 8 engineers and one obsession. Today we have 340+ patents, 3 flagship models, and 12,000 vehicles on Indian roads.'),
          h('p', null, 'Every FORMA is designed in India, engineered in India, and built in India. For the world.')
        )
      ),

      // Timeline
      h('div', { className:'reveal', style:{ marginTop:'5rem' } },
        h('p', { className:'section-tag-sm' }, 'History'),
        h('h2', { className:'section-title', style:{marginBottom:'3rem'} }, 'Timeline'),
        h('div', { className:'timeline' },
          TIMELINE.map(item => h('div', { className:'timeline-item', key:item.year },
            h('div', { className:'timeline-year'  }, item.year),
            h('div', { className:'timeline-event' }, item.event)
          ))
        )
      ),

      // Team
      h('div', { className:'reveal', style:{ marginTop:'5rem' } },
        h('p', { className:'section-tag-sm' }, 'Leadership'),
        h('h2', { className:'section-title', style:{marginBottom:'3rem'} }, 'The Team'),
        h('div', { className:'team-grid' },
          TEAM.map(person => h('div', { className:'team-card', key:person.name },
            h('img', { src:person.img, alt:person.name }),
            h('div', { className:'team-card-body' },
              h('div', { className:'team-name' }, person.name),
              h('div', { className:'team-role' }, person.role)
            )
          ))
        )
      ),

      h('div', { className:'about-milestones reveal', style:{ marginTop:'5rem', paddingTop:'3rem', borderTop:'1px solid var(--border)' } },
        MILESTONES.map(m => h('div', { key:m.label },
          h('div', { className:'milestone-val'   }, m.val),
          h('div', { className:'milestone-label' }, m.label)
        ))
      )
    )
  );
}

/* ════════════════════════════════════════════
   PAGE: CONTACT
════════════════════════════════════════════ */
function ContactPage({ onSubmit }) {
  useScrollReveal();
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', city:'', message:'' });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return h('div', { className:'page-enter' },
    h('div', { className:'page-hero' },
      h('p', { className:'section-tag-sm' }, 'Get in Touch'),
      h('h1', null, 'Visit ', h('span', { style:{color:'var(--gold)'} }, 'FORMA')),
      h('p', null, '18 showrooms across India. A team ready to answer every question.')
    ),

    h('div', { className:'section-wrap' },
      h('div', { className:'contact-grid reveal' },

        // Info
        h('div', { className:'contact-info' },
          h('h2', null, 'We\'d love to ', h('span', null, 'hear from you')),
          h('p', null, 'Whether you\'re ready to configure your FORMA, want to book a test drive, or simply want to know more — our team is here.'),
          h('p', null, 'Walk into any of our 18 showrooms across India, or reach us online.'),

          [
            { icon:'📍', label:'Head Office',  text:'12 Mount Road, Chennai — 600002' },
            { icon:'📞', label:'Phone',        text:'+91 44 4000 1234' },
            { icon:'✉️', label:'Email',        text:'hello@forma.auto' },
            { icon:'🕐', label:'Hours',        text:'Mon–Sat, 9am–7pm' },
          ].map(d => h('div', { className:'contact-detail', key:d.label },
            h('div', { className:'contact-detail-icon' }, d.icon),
            h('div', { className:'contact-detail-text' },
              h('strong', null, d.label),
              d.text
            )
          ))
        ),

        // Form
        h('div', { className:'contact-form' },
          h('h3', null, 'Send a Message'),
          h('div', { className:'form-row' },
            h('div', { className:'form-group' },
              h('label', null, 'Name'),
              h('input', { type:'text', placeholder:'Your name', value:formData.name, onChange:e => setFormData(p => ({...p, name:e.target.value})) })
            ),
            h('div', { className:'form-group' },
              h('label', null, 'Email'),
              h('input', { type:'email', placeholder:'you@email.com', value:formData.email, onChange:e => setFormData(p => ({...p, email:e.target.value})) })
            )
          ),
          h('div', { className:'form-row' },
            h('div', { className:'form-group' },
              h('label', null, 'Phone'),
              h('input', { type:'tel', placeholder:'+91 XXXXX XXXXX', value:formData.phone, onChange:e => setFormData(p => ({...p, phone:e.target.value})) })
            ),
            h('div', { className:'form-group' },
              h('label', null, 'City'),
              h('select', { value:formData.city, onChange:e => setFormData(p => ({...p, city:e.target.value})) },
                h('option', { value:'' }, 'Select city'),
                ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune'].map(c =>
                  h('option', { key:c, value:c }, c)
                )
              )
            )
          ),
          h('div', { className:'form-group' },
            h('label', null, 'Message'),
            h('textarea', { placeholder:'How can we help you?', value:formData.message, onChange:e => setFormData(p => ({...p, message:e.target.value})) })
          ),
          h('button', { className:'btn btn-gold', style:{ width:'100%', justifyContent:'center', marginTop:'0.5rem' }, onClick:handleSubmit },
            'Send Message'
          )
        )
      )
    )
  );
}

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
function App() {
  const route             = useRouter();
  const { msg, visible, show } = useToast();

  const handleBookDrive = (modelName) => {
    const label = modelName ? `${modelName} test drive` : 'test drive';
    show(`Booking confirmed for ${label}! We'll call you within 24hrs.`);
  };
  const handleContact = () => show('Message sent! Our team will reply within 24hrs.');

  // Render the correct page
  let page;
  switch (route.page) {
    case 'home':
      page = h(HomePage, { onBookDrive: handleBookDrive }); break;
    case 'models':
      page = h(ModelsPage, { onConfigure: m => navigate(`/model/${m.id}`) }); break;
    case 'model-detail':
      page = h(ModelDetailPage, { modelId: route.param, onBookDrive: handleBookDrive }); break;
    case 'about':
      page = h(AboutPage); break;
    case 'contact':
      page = h(ContactPage, { onSubmit: handleContact }); break;
    default:
      page = h(HomePage, { onBookDrive: handleBookDrive });
  }

  return h('div', null,
    h(Navbar, { currentPage:route.page, onBookDrive:() => navigate('/contact') }),
    page,
    h(Footer, { navigate }),
    h(Toast, { msg, visible })
  );
}

/* ════════════════════════════════════════════
   MOUNT
════════════════════════════════════════════ */
ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
