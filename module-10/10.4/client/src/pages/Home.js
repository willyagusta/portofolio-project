function Home() {
  return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h1 class="text-white text-7xl font-semibold leading-tight pb-8">Beyond Code:<br></br> 
        Bridging Creativity 
        and Future Technology</h1>
        <p class="text-white font-semibold grid grid-cols-1 md:grid-cols-2 pb-2 text-lg">Welcome! I’m Yohanes Willy Agusta</p>
        <p class="text-white pb-8">With a passion for coding and a commitment to transforming innovative ideas into revolutionary digital products, I thrive on crafting seamless user experiences and robust backend solutions.</p>
      </div>
      <div className="flex justify-center ">
        <img src="/image/home-banner.png" alt="Home Banner" className="w-120 h-120" />
      </div>
    </div>
  </div>
  );
}

export default Home;