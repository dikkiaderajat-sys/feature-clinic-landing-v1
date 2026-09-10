/* oxlint-disable jsx-a11y/prefer-tag-over-role, next/no-img-element -- The accessible inline SVG chart must remain SVG; the supplied brand mark is a local static image in a no-runtime export. */
import { ArrowRight, Mail, BrainCircuit, CalendarDays, Check, RefreshCw, UsersRound, ChevronLeft, Phone, MoreVertical, Mic, Camera, Paperclip, Smile, Wifi, BatteryFull, Signal, BadgeCheck, Activity } from 'lucide-react';
import type { CSSProperties } from 'react';
import content from '../content.json';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26.8 5.2A14 14 0 0 0 4.7 21.9L3 29l7.3-1.8A14 14 0 0 0 26.8 5.2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M11 9c-1.5 0-2 1.8-1.9 3.2.4 4 6.8 10.3 10.8 10.1 1.5 0 3-1.5 3-2.7 0-.5-3.7-2.4-4-2.2l-1.5 1.5c-2.3-.9-4.3-2.9-5.2-5.1l1.1-1.5C13.6 11.9 12 9 11 9Z" fill="currentColor"/></svg>;
}

function PhoneMockup() {
  return <div className="phone-slot"><div className="phone-settle"><section className="phone" aria-label="Contoh percakapan WhatsApp booking klinik">
    <div className="phone-screen">
      <div className="phone-status" aria-hidden="true"><b>9:41</b><span className="island"/><span className="status-icons"><Signal/><Wifi/><BatteryFull/></span></div>
      <header className="phone-header"><ChevronLeft aria-hidden="true"/><span className="clinic-avatar" aria-hidden="true"><Activity/></span><div><strong>{content.phone.clinic_name} <BadgeCheck aria-hidden="true"/></strong><small>{content.phone.status}</small></div><Phone aria-hidden="true"/><MoreVertical aria-hidden="true"/></header>
      <div className="conversation">
        {content.phone.messages.map((message, i) => <div key={message.id} className={`message ${message.side} ${'success' in message ? 'success' : ''}`} data-message={message.id} style={{ '--reveal': `${[.6,2.35,5.35,6.75][i]}s` } as CSSProperties}>
          {'success' in message && <span className="message-check" aria-hidden="true"><Check/></span>}
          <p>{'text_lines' in message ? message.text_lines?.map((line,j) => <span className={j===0 && 'success' in message ? 'strong' : ''} key={j}>{line}</span>) : message.text}</p>
          <small className="message-time">{message.time}{message.side === 'outgoing' && <span aria-label="Dibaca"> ✓✓</span>}</small>
        </div>)}
        <div className="typing typing-first" aria-hidden="true"><i/><i/><i/></div><div className="typing typing-last" aria-hidden="true"><i/><i/><i/></div>
      </div>
      <div className="phone-composer" aria-hidden="true"><span><Smile/><span>Ketik pesan...</span><Paperclip/><Camera/></span><span className="microphone"><Mic/></span></div>
    </div>
  </section></div></div>;
}

function WorkflowSteps() {
  const icons = [WhatsAppIcon, BrainCircuit, CalendarDays, Check];
  return <div className="workflow" aria-label="Alur otomatisasi booking">
    <svg className="connectors desktop-connectors" viewBox="0 0 600 350" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="step-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" fill="#1681F8"/></marker></defs>{['M130 42 H168 V65','M285 107 H323 V130','M440 172 H478 V195'].map((d,i)=><g key={d}><path className="connector-base" d={d} markerEnd="url(#step-arrow)"/><path className="connector-pulse" pathLength="100" d={d} style={{'--pulse':`${[1.65,2.75,6.35][i]}s`} as CSSProperties}/></g>)}</svg>
    <svg className="connectors mobile-connectors" viewBox="0 0 340 500" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="mobile-step-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" fill="#1681F8"/></marker></defs>{['M74 94 V115 H134 V130','M134 224 V245 H194 V260','M194 354 V375 H254 V390'].map((d,i)=><g key={d}><path className="connector-base" d={d} markerEnd="url(#mobile-step-arrow)"/><path className="connector-pulse" pathLength="100" d={d} style={{'--pulse':`${[1.65,2.75,6.35][i]}s`} as CSSProperties}/></g>)}</svg>
    <ol>{content.workflow.map((step,i)=>{const Icon = icons[i];return <li className={`workflow-node step-${i+1}`} key={step.id} style={{'--activate':`${[.85,1.9,3.05,6.95][i]}s`} as CSSProperties}><span className={`workflow-icon ${i===0 || i===3 ? 'green' : ''}`}><Icon/></span><strong>{step.label.split('\\n').map((line,j)=><span key={j}>{line}</span>)}</strong></li>;})}</ol>
  </div>;
}

function BusinessPotentialChart() {
  return <figure className="chart"><figcaption>{content.chart.title}</figcaption><div className="legend">{content.chart.legend.map(item=><span key={item.key}><i className={item.key}/>{item.label}</span>)}</div>
    <svg viewBox="0 0 340 125" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">Potensi Bisnis Klinik</title><desc id="chart-desc">Ilustrasi konseptual Januari hingga Juni: Potential Revenue berwarna hijau naik, Potential Loss berwarna merah turun. Bukan data hasil pengukuran.</desc>
      <defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#eaf5ff" stopOpacity="0"/><stop offset="1" stopColor="#eaf5ff" stopOpacity=".7"/></linearGradient></defs>
      <path d="M10 5H330V105H10Z" fill="url(#chart-fill)"/>
      {[10,74,138,202,266,330].map(x=><path key={x} d={`M${x} 5V105`} className="chart-grid"/>)}
      <path className="chart-guide revenue" aria-hidden="true" d="M10 85 C72 77 138 65 202 44 S295 12 320 0"/>
      <path className="chart-guide loss" aria-hidden="true" d="M10 52 C72 69 139 83 202 91 S289 98 320 99"/>
      <path className="chart-line revenue" pathLength="1" d="M10 85 C72 77 138 65 202 44 S295 12 320 0"/>
      <path className="chart-line loss" pathLength="1" d="M10 52 C72 69 139 83 202 91 S289 98 320 99"/>
      <path className="chart-arrow revenue" d="m316 0 13-3-6 12Z"/>
      <path className="chart-arrow loss" d="m319 92 13 7-13 7Z"/>
      {content.chart.months.map((month,i)=><text key={month} x={10+i*64} y="123" textAnchor={i===0?'start':i===5?'end':'middle'}>{month}</text>)}
    </svg>
  </figure>;
}

export default function ClinicLandingPage() {
  const featureIcons = [CalendarDays, RefreshCw, UsersRound];
  return <main className="landing"><div className="page">
    <header className="brand-header"><span className="brand-mark" aria-hidden="true"><img src="/assets/brand.png" alt="" width="360" height="78"/></span><div><strong>{content.brand.name}</strong><p>{content.brand.tagline}</p></div></header>
    <div className="hero">
      <section className="hero-copy" aria-labelledby="headline"><p className="eyebrow">{content.eyebrow}</p><h1 id="headline">{content.headline.map((line,i)=><span key={line} className={i ? 'blue' : ''}>{line}</span>)}</h1><p className="description">{content.description}</p>
        <div className="contact-actions"><a className="cta primary" href={content.contact.email_href}><Mail aria-hidden="true"/><span>{content.contact.primary_label}</span><ArrowRight aria-hidden="true"/></a><a className="contact-detail" href={content.contact.email_href}><Mail aria-hidden="true"/>{content.contact.email}</a><a className="cta whatsapp" href={content.contact.whatsapp_href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/><span>{content.contact.whatsapp_label}</span><ArrowRight aria-hidden="true"/></a><a className="contact-detail whatsapp-detail" href={content.contact.whatsapp_href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/>{content.contact.whatsapp_display}</a><p className="microcopy">{content.contact.microcopy}</p></div>
      </section>
      <div className="visual-stage"><PhoneMockup/><WorkflowSteps/><BusinessPotentialChart/></div>
    </div>
    <section className="features" aria-label="Fitur otomatisasi klinik">{content.features.map((feature,i)=>{const Icon=featureIcons[i];return <article className="feature-card" key={feature.title}><span className="feature-icon"><Icon aria-hidden="true"/></span><div><h2>{feature.title}</h2><p>{feature.body}</p></div></article>;})}</section>
    <section className="feature-marquee" aria-labelledby="marquee-heading">
      <h2 id="marquee-heading">{content.feature_marquee.title}</h2>
      {/* The region is keyboard focusable to pause motion; individual pills stay out of the tab order. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="marquee-viewport" tabIndex={0} role="region" aria-label="Fitur tambahan klinik">
        <div className="marquee-track">
          {[false, true].map(duplicate => <ul className="marquee-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>{content.feature_marquee.items.map(item => <li className="feature-pill" key={item}>{item}</li>)}</ul>)}
        </div>
      </div>
    </section>
  </div></main>;
}
