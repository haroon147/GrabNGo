import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const foodpandaUrl = 'https://www.foodpanda.pk/restaurant/bbak/grab-n-go-bbak'
const publicAsset = (asset) => `${import.meta.env.BASE_URL}${asset}`
const foodPhotos = {
  hero: publicAsset('grab-n-go-karahi.jpg'),
  breakfast: publicAsset('grab-n-go-breakfast.jpg'),
  rolls: publicAsset('grab-n-go-roll.jpg'),
  burger: publicAsset('grab-n-go-burger.jpg'),
}

const categories = [
  { name: 'Popular', items: [
    ['Daal Chawal', '320', 'Comforting lentils served with rice.'],
    ['French Fries', '290', 'Golden, crisp fries.'],
    ['Meethi Lassi Breakfast', '190', 'A refreshing, mildly sweet yogurt drink.'],
    ['Aloo Ki Katliyan', '240', 'Sliced potatoes cooked with savory spices.'],
    ['Malai Boti Paratha Roll', '390', 'Grilled chicken wrapped in flaky paratha.'],
    ['Anda Paratha', '190', 'Flaky griddled paratha with egg.'],
  ] },
  { name: 'Breakfast', items: [
    ['Sada Paratha', '125', 'Pan-fried layered flatbread.'], ['Chicken Paratha', '390', 'Savory chicken wrapped in flaky flatbread.'],
    ['Omelette', '140', 'Two eggs, cooked fresh.'], ['Anda Paratha', '190', 'Griddled flatbread with egg.'],
    ['Half Fry Egg', '90', 'Pan-fried egg.'], ['Shami Kabab Breakfast', '80', 'Savory, aromatic shami kabab.'],
    ['Meethi Lassi Breakfast', '190', 'Traditional sweet yogurt drink.'],
  ] },
  { name: 'Salan', items: [
    ['Aloo Ki Katliyan', '240', 'Sliced potatoes cooked with savory spices.'], ['Aloo Anday', '240', 'A hearty egg and potato curry.'],
    ['Maash Ki Daal', '290', 'Slow-cooked lentils with a comforting flavor.'], ['Daal Chawal', '320', 'South Asian lentils and rice.'],
  ] },
  { name: 'Chicken', items: [
    ['Shinwari Karahi', 'From 1,300', 'Tender meat cooked with aromatic spices.'], ['Lahori Karahi', 'From 1,300', 'Lahori-style karahi in rich, thick gravy.'],
    ['Highway Koyla Karahi', 'From 1,300', 'Wok-cooked karahi with a smoky, rich gravy.'], ['Butt Karahi', 'From 1,400', 'Karahi with a spicy, aromatic thick gravy.'],
  ] },
  { name: 'Chinese', items: [
    ['Chicken Manchurian', '1,100', 'Stir-fried chicken in tangy, savory gravy.'], ['Chicken Chilli Dry', '1,150', 'Stir-fried chicken with a spicy kick.'],
    ['Chicken Shashlik', '1,100', 'Skewered chicken with a savory, tangy flavor.'],
  ] },
  { name: 'BBQ & Kababs', items: [
    ['Shami Kabab', 'From 450', 'Pan-fried ground meat patty.'], ['Malai Boti', '1,200', 'Tender malai boti, 500g.'],
  ] },
  { name: 'Burgers', items: [
    ['Anda Shami Burger', '280', 'Shami patty, fried egg, fresh salad, and special sauce.'],
    ['Double Anda Shami Burger', '340', 'Shami kabab with two eggs in a soft bun.'],
    ['Double Shami Anda Burger', '380', 'Two shami patties, fried egg, and special sauce.'],
  ] },
  { name: 'Paratha Rolls', items: [
    ['Malai Boti Paratha Roll', '390', 'Grilled chicken wrapped in flaky flatbread.'],
    ['Chicken Chutney Roll', '390', 'Chicken roll with a tangy chutney flavor.'],
    ['Mayo Garlic Paratha Roll', '390', 'Flaky paratha roll with garlic mayo.'],
  ] },
  { name: 'Pasta', items: [
    ['Alfredo Pasta', '650', 'Pasta in a rich, creamy sauce.'], ['Red Sauce Pasta', '680', 'Pasta with savory tomato sauce.'],
  ] },
  { name: 'Add Ons', items: [
    ['Salad', '80', 'Fresh, crisp vegetables.'], ['Raita', '100', 'Refreshing yogurt condiment.'], ['Salad Wala Raita', '150', 'Yogurt with fresh salad.'],
    ['Mayo Garlic Dip', '90', 'Creamy, tangy garlic dip.'], ['Buffalo Sauce', '90', 'Spicy, tangy buttery sauce.'],
    ['Ranch Sauce', '90', 'Creamy, tangy ranch dip.'], ['Burger Sauce', '120', 'Creamy savory burger sauce.'],
    ['French Fries', '290', 'Crispy golden potatoes.'], ['Boiled Rice', '150', 'Fluffy basmati rice.'],
  ] },
  { name: 'Drinks & Shakes', items: [
    ['Badam Milk', 'From 260', 'Milk with almonds and a mild sweetness.'], ['Nutella Milkshake', 'From 320', 'A rich milkshake blended with hazelnut cocoa.'],
    ['Kitkat Milkshake', 'From 300', 'Milkshake blended with chocolate wafer bars.'], ['Meethi Lassi', 'From 220', 'Chilled, mildly sweet yogurt drink.'],
  ] },
  { name: 'Beverages', items: [['Chai', '140', 'Aromatic, comforting spiced tea.']] },
]

function App() {
  const pageRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('Popular')
  const activeMenu = categories.find((category) => category.name === activeCategory)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from('.site-header', { y: -30, opacity: 0, duration: 0.65, ease: 'power3.out' })
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
      gsap.from('.feature-card', { scrollTrigger: { trigger: '.features', start: 'top 85%' }, y: 22, opacity: 0, duration: 0.55, stagger: 0.12 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page" ref={pageRef}>
      <header className="site-header">
        <div className="container header-row">
          <a className="logo" href="#home" aria-label="Grab N Go home"><img src={publicAsset('grab-n-go-logo.svg')} alt="Grab N Go" /></a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#home">Home</a><a href="#menu">Our Menu</a><a href="#story">Our Story</a><a href="#contact">Find Us</a>
          </nav>
          <a className="header-order" href={foodpandaUrl} target="_blank" rel="noreferrer">Order on foodpanda <span>↗</span></a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-glow" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span /> HOMEMADE FLAVOUR, MADE WITH HEART</p>
              <h1>Good food.<br /><em>Good mood.</em></h1>
              <p className="hero-text">From a comforting breakfast to a loaded paratha roll, find the flavours you love at Grab N’ Go in Bahria Town, Lahore.</p>
              <div className="hero-actions"><a className="primary-button" href="#menu">Explore the menu <span>↓</span></a><a className="text-link" href={foodpandaUrl} target="_blank" rel="noreferrer">Get it delivered ↗</a></div>
              <div className="rating-line"><span className="stars">★★★★★</span><strong>4.9</strong><span>from 100+ Foodpanda reviews</span></div>
            </div>
            <div className="hero-art" aria-label="Grab N Go signature dishes">
              <img src={foodPhotos.hero} alt="A rich, freshly prepared curry served with herbs and spices" />
              <div className="hero-sticker"><span>MADE</span><strong>with<br />love</strong><span>IN LAHORE</span></div>
              <div className="hero-caption"><span>01 /</span> COMFORT FOOD, YOUR WAY</div>
            </div>
          </div>
          <div className="hero-bottom container"><span>BREAKFAST · KARAHI · ROLLS · SHAKES</span><span>SCROLL TO GET HUNGRY ↓</span></div>
        </section>

        <section className="features container" aria-label="Restaurant details">
          <article className="feature-card"><span className="feature-icon">✦</span><div><strong>4.9 / 5</strong><small>100+ customer ratings</small></div></article>
          <article className="feature-card"><span className="feature-icon">₨</span><div><strong>From Rs. 80</strong><small>Good food, kind prices</small></div></article>
          <article className="feature-card"><span className="feature-icon">⌂</span><div><strong>Bahria Town</strong><small>Lahore, Pakistan</small></div></article>
          <article className="feature-card"><span className="feature-icon">♡</span><div><strong>Home chef style</strong><small>Comfort in every bite</small></div></article>
        </section>

        <section className="food-gallery container" aria-label="A taste of Grab N Go">
          <article className="gallery-tile gallery-tile-large"><img src={foodPhotos.breakfast} alt="A welcoming breakfast spread" loading="lazy" /><span>MADE FOR SLOW MORNINGS</span><strong>Breakfast favourites</strong></article>
          <article className="gallery-tile"><img src={foodPhotos.rolls} alt="Freshly wrapped street food roll" loading="lazy" /><span>WRAPPED WITH FLAVOUR</span><strong>Paratha rolls</strong></article>
          <article className="gallery-tile"><img src={foodPhotos.burger} alt="A juicy burger with fresh toppings" loading="lazy" /><span>THE CROWD PLEASER</span><strong>Burgers & bites</strong></article>
        </section>

        <section id="menu" className="menu-section section">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">A LITTLE SOMETHING FOR EVERY CRAVING</p><h2>Made to hit<br /><em>the spot.</em></h2></div><p className="section-note">From breakfast parathas to karahi, rolls, pasta and shakes—discover a few of our Foodpanda favourites.</p></div>
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {categories.map((category) => <button key={category.name} className={activeCategory === category.name ? 'menu-tab active' : 'menu-tab'} onClick={() => setActiveCategory(category.name)} role="tab" aria-selected={activeCategory === category.name}>{category.name}</button>)}
            </div>
            <div className="menu-category-heading"><span>OUR MENU</span><h3>{activeMenu.name}</h3><span>{activeMenu.items.length} favourites</span></div>
            <div className="menu-grid" role="tabpanel">
              {activeMenu.items.map(([name, price, details], index) => <article key={`${name}-${index}`} className="menu-card"><div className="menu-card-top"><span className="menu-index">{String(index + 1).padStart(2, '0')}</span><span className="menu-price">Rs. {price}</span></div><h4>{name}</h4><p>{details}</p></article>)}
            </div>
            <p className="menu-footnote">Menu and prices are based on our Foodpanda listing and may change. <a href={foodpandaUrl} target="_blank" rel="noreferrer">See the current menu ↗</a></p>
          </div>
        </section>

        <section id="story" className="story-section section">
          <div className="container story-layout"><div className="story-art"><span className="story-number">GN</span><div className="story-note">A taste of home<br />in every bite.</div><span className="story-spark">✳</span></div><div className="story-copy"><p className="eyebrow">A SMALL KITCHEN, A BIG HEART</p><h2>Meet the heart<br />behind <em>the food.</em></h2><p>Grab N’ Go brings together the everyday favourites people love—from paratha and chai to burgers, rolls, karahi and homestyle comfort food.</p><p>Owned by <strong>Arzoo Akhtar</strong>, Grab N’ Go serves the Bahria Town Lahore community with a menu made for sharing, savouring, and coming back for.</p><a className="text-link" href={foodpandaUrl} target="_blank" rel="noreferrer">Discover Grab N’ Go on foodpanda ↗</a></div></div>
        </section>

        <section id="contact" className="visit-section section"><div className="container visit-layout"><div><p className="eyebrow">YOUR NEXT GOOD MEAL IS CLOSE</p><h2>Come hungry.<br /><em>Leave happy.</em></h2><p className="visit-address">Eiffel Square, Building 4, Quaid Commercial Block, Sector E, near Bahria Homes, Bahria Town, Lahore.</p><a className="primary-button" href={foodpandaUrl} target="_blank" rel="noreferrer">Order via foodpanda <span>↗</span></a></div><div className="visit-details"><div><span>LOCATION</span><strong>Bahria Town, Lahore</strong></div><div><span>OWNER</span><strong>Arzoo Akhtar</strong></div><div><span>OPENING HOURS</span><strong>Hours vary by day.<br />Check Foodpanda for today’s availability.</strong></div><div><span>ORDER & DELIVERY</span><strong><a href={foodpandaUrl} target="_blank" rel="noreferrer">View Grab N’ Go on foodpanda ↗</a></strong></div></div></div></section>
      </main>

        <footer className="site-footer"><div className="container footer-row"><a className="logo footer-logo" href="#home" aria-label="Grab N Go home"><img src={publicAsset('grab-n-go-logo.svg')} alt="Grab N Go" /></a><p>Good food, made with heart in Bahria Town.</p><span>© {new Date().getFullYear()} Grab N’ Go · Owned by Arzoo Akhtar</span></div></footer>
    </div>
  )
}

export default App
