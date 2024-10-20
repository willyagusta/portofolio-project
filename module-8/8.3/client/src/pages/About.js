function About() {
    return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 class="text-white text-7xl font-semibold leading-tight pb-8">Hi There! My Name is<br></br> 
  Yohanes Willy Agusta</h1>
          <p>I am a full-stack web developer with a deep enthusiasm for coding across both back-end and front-end platforms. I have cultivated strong business acumen that significantly benefits my product development process. I enjoy juggling data to fuel business growth, focusing on creating user-friendly and effective solutions by understanding the needs of my audience.</p>
        </div>
        <div className="flex justify-center ">
          <img src="/image/photo.png" alt="photo" className="w-96 h-96" />
        </div>
      </div>
      <div class="bg-white bg-opacity-25 -mx-10 md:-mx-20 grid grid-cols-1 md:grid-cols-6 gap-8 pt-10 p-10">
       <img src="/image/html-logo.png" alt="html-logo" className="w-16 h-16" />
       <img src="/image/css-logo.png" alt="html-logo" className="w-16 h-16" />
       <img src="/image/js-logo.png" alt="html-logo" className="w-16 h-16" />
       <img src="/image/mdb-logo.png" alt="html-logo" className="w-max h-16" />
       <img src="/image/react-logo.png" alt="html-logo" className="w-max h-16" />
       <img src="/image/sql-logo.png" alt="html-logo" className="w-max h-16" />
      </div>
    </div>
    );
  }
  
  export default About;