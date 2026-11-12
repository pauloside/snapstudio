import Link from "next/link";

const photos = [
  ["The quiet in-between", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"],
  ["A day to remember", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85"],
  ["Golden hour", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85"],
  ["Together, always", "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85"],
  ["The little details", "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85"],
  ["A softer light", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85"]
];

export default function GalleryPreview() {
  return <main><header className="site-header"><Link className="brand" href="/">snap<span>studio.</span></Link><Link className="nav-cta" href="/">Back to home</Link></header><section className="page-hero"><span className="eyebrow">Your photographs, in one place</span><h1>A gallery to call your own.</h1><p>Browse your finished photographs, mark the ones you love and keep your favourites close. This is a sample gallery preview, not a live private client account.</p></section><section className="portal-wrap"><div className="portal-panel"><div className="portal-top"><div><span className="eyebrow">Sample client gallery</span><h2>Moments worth keeping</h2><p style={{fontSize:12,color:"#77766f"}}>Gallery code: SS-DEMO-001 · 6 sample photographs</p></div><button className="button-primary" onClick={undefined} type="button" disabled style={{opacity:.6}}>Download favourites · Coming soon</button></div><div className="notice">Preview mode: sign-in, private access, live favourites and secure downloads will be enabled when the client database and storage are connected.</div><div className="photo-cards">{photos.map(([title,src])=><article className="photo-card" key={title}><img src={src} alt={title}/><p>{title}</p></article>)}</div></div></section><footer className="site-footer"><Link className="brand" href="/">snap<span>studio.</span></Link><p>Every photograph has a story. Thanks for being part of ours.</p></footer></main>;
}
