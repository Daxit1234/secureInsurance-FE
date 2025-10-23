import React from "react";
import "./Partners.css"; // we'll create this next

const partners = [
  { name: "Aditya Birla Capital", bw: "/assets/partners/axismaxlife-bw.png", color: "/assets/partners/axismaxlife-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/adityabirlalife-bw.webp", color: "/assets/partners/adityabirlalife-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/aviva-bw.png", color: "/assets/partners/aviva-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/bajajgeneral-bw.jpg", color: "/assets/partners/bajajgeneral-color.jpg" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/future-bw.png", color: "/assets/partners/future-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/adityabirla-bw.png", color: "/assets/partners/adityabirla-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/bandhan-bw.webp", color: "/assets/partners/bandhan-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/bhartiaxa-bw.png", color: "/assets/partners/bhartiaxa-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/canara-bw.webp", color: "/assets/partners/canara-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/chola-bw.webp", color: "/assets/partners/chola-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/digit-bw.png", color: "/assets/partners/digit-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/ageasfederal-bw.png", color: "/assets/partners/ageasfederal-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/bajajlife-bw.avif", color: "/assets/partners/bajajlife-color.avif" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/care-bw.webp", color: "/assets/partners/care-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/ecgc-bw.avif", color: "/assets/partners/ecgc-color.avif" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/edelwiss-bw.png", color: "/assets/partners/edelwiss-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/future-bw.png", color: "/assets/partners/future-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/galaxy-bw.png", color: "/assets/partners/galaxy-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/digitlife-bw.png", color: "/assets/partners/digitlife-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/india-bw.png", color: "/assets/partners/india-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/hdfcergo-bw.avif", color: "/assets/partners/hdfcergo-color.avif" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/hdfclife-bw.jpg", color: "/assets/partners/hdfclife-color.jpg" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/icicil-bw.png", color: "/assets/partners/icicil-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/icicilife-bw.png", color: "/assets/partners/icicilife-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/iffco-bw.png", color: "/assets/partners/iffco-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/kotak-bw.png", color: "/assets/partners/kotak-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/liberty-bw.webp", color: "/assets/partners/liberty-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/unitedindia-bw.webp", color: "/assets/partners/unitedindia-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/lic-bw.png", color: "/assets/partners/lic-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/magma-bw.png", color: "/assets/partners/magma-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/manipal-bw.png", color: "/assets/partners/manipal-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/niva-bw.png", color: "/assets/partners/niva-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/oriental-bw.png", color: "/assets/partners/oriental-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/pnb-bw.png", color: "/assets/partners/pnb-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/pramerica-bw.png", color: "/assets/partners/pramerica-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/zurich-bw.png", color: "/assets/partners/zurich-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/raheja-bw.webp", color: "/assets/partners/raheja-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/sbi-bw.webp", color: "/assets/partners/sbi-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/reliance-bw.jpg", color: "/assets/partners/reliance-color.jpg" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/royal-bw.png", color: "/assets/partners/royal-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/sbilife-bw.png", color: "/assets/partners/sbilife-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/shriram-bw.jpg", color: "/assets/partners/shriram-color.jpg" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/national-bw.png", color: "/assets/partners/national-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/sompo-bw.jpg", color: "/assets/partners/sompo-color.jpg" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/shriramlife-bw.png", color: "/assets/partners/shriramlife-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/star-bw.png", color: "/assets/partners/star-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/starunion-bw.png", color: "/assets/partners/starunion-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/tataaia-bw.webp", color: "/assets/partners/tataaia-color.webp" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/newindia-bw.png", color: "/assets/partners/newindia-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/zuno-bw.png", color: "/assets/partners/zuno-color.png" },
  { name: "Aditya Birla Capital", bw: "/assets/partners/tataaig-bw.png", color: "/assets/partners/tataaig-color.png" },
  
];

const PartnersSection = () => {
  return (
    <section className="partners-section">
      <h2 className="partners-title">Our Partners</h2>
      <p className="partners-subtitle">Leading insurers for your financial freedom</p>
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img
              src={partner.bw}
              data-color={partner.color}
              alt={partner.name}
              className="partner-logo"
              onMouseOver={(e) => (e.currentTarget.src = e.currentTarget.dataset.color)}
              onMouseOut={(e) => (e.currentTarget.src = partner.bw)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
