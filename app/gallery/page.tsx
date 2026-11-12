"use client";

import Link from "next/link";
import { useState } from "react";

const photos = [
  ["The quiet in-between", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"],
  ["A day to remember", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85"],
  ["Golden hour", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85"],
  ["Together, always", "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85"],
  ["The little details", "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85"],
  ["A softer light", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85"]
];

export default function GalleryPreview() {
  const [favourites, setFavourites] = useState<number[]>([]);
  function toggle(index: number) {
    setFavourites(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index]);
  }
  return <main><header className="site-header"><Link className="brand" href="/">snap<span>studio.</span></Link><Link className="nav-cta" href="/">Back to home</Link></header><section className="page-hero"><span className="eyebrow">Your photographs, in one place</span><h1>A gallery to call your own.</h1><p>Browse your photographs and mark the ones you love. This sample gallery demonstrates the client experience; it is not a live private client account.</p></section><section className="portal-wrap"><div className="portal-panel"><div className="portal-top"><div><span className="eyebrow">Sample client gallery</span><h2>Moments worth keeping</h2><p style={{fontSize:12,color:"#77766f"}}>Gallery code: SS-DEMO-001 · 6 sample photographs</p></div><span className="package-tag">{favourites.length} favourites selected</span></div><div className="notice">Preview mode: favourites work in this browser session. Private sign-in, secure photo storage and original-resolution downloads will be connected in the backend milestone.</div><div className="photo-cards">{photos.map(([title,src],index)=><article className="photo-card" key={title}><img src={src} alt={title}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 12px"}}><p>{title}</p><button type="button" onClick={()=>toggle(index)} aria-pressed={favourites.includes(index)} style={{border:"1px solid #e8e5dc",background:favourites.includes(index)?"#656b4f":"white",color:favourites.includes(index)?"white":"#656b4f",padding:"7px 10px",cursor:"pointer",fontSize:11}}>{favourites.includes(index)?"♥ Saved":"♡ Favourite"}</button></div></article>)}</div><div style={{display:"flex",justifyContent:"flex-end",marginTop:24}}><button className="button-primary" type="button" disabled={favourites.length===0} onClick={()=>window.alert("Your favourites are saved in this preview. Secure downloads will be enabled after storage is connected.")} style={{opacity:favourites.length===0?0.55:1}}>Continue with {favourites.length} favourites ↗</button></div></div></section><footer className="site-footer"><Link className="brand" href="/">snap<span>studio.</span></Link><p>Every photograph has a story. Thanks for being part of ours.</p></footer></main>;
}
