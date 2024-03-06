const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT ({
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/flowbite/**/*.js",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
        'montserrat': ['Montserrat'],
        'jetbrain': ['JetBrainsMono', 'monospace'],
      },
      // colors: {
      //   // Configure your color palette here
      //   'purple': 'rgba(235, 224, 251)',
      //   'whitesmoke': 'rgba(245,245,245)',
      //   'purple-head': 'rgba(110, 111, 232)',
      //   navbar: "rgba(4,5,79)",
      //   "navbar-bg": "rgba(217, 217, 255, 0.5)",
        
      // },
      screens: {
      "12pro": '390px',
      "ipad-pro": "1024px",
      "laptop": '1536px'
    },
    
      backgroundImage: {
        "hero-bg": "url('/src/img/hero-bg.png')",
        "cover":"url('./asset/img/cover.jpeg')"
      },
      fontFamily: {
        poppins: ["Poppins"],
        montserrat: ["Montserrat"],
        jetbrain: ["JetBrainsMono", "monospace"],
      },
      colors: {
        // Configure your color palette here
        whitesmoke: "rgba(245,245,245)",
        "dark-head": "#010448",
        navbar: "rgba(4,5,79)",
        bgcard:"rgba(217, 217, 217, 0.1)",
        bgsingup:"gradient(90deg, #D397FA 0%, #8364E8 100%)",
        bgmidle:"gradient(180deg, rgba(119, 119, 243, 0.2) 0%, rgba(171, 100, 232, 0.2) 100%)",
        texthowtouse:"455A64",
        "navbar-bg": "#CDCDDB",
        "line":"#AD76EC",
        "title":"#6E6FE8",
        "date":"#00000080",
        "FAFAFA":"#FAFAFA",
        "bg-web":"#FCF8FF",
        "bg-footer":"#d8dce0",
        "blur-15%":"rgba(110, 111, 232, 0.15);",
        "btn-get" : "rgba( 95, 176, 252)",
        "btn-post" : "#49CC90",
         "btn-del": "#FF2222",
         "btn-put": "#E3A647",
         "bg-newwhite": "#EAEAEA",
         "bg-new":"FBFBFF",
        "newYellow" : "#F2CF47",
        "yellow-opacity": "rgba(242, 208, 71, 0.1)",
        "document" : "#B4B4C8",
        
        
      },
      
      textColor:{
        "purple_button": "#6E6FE8",
      },
      
      height:{
        "cover" :"350px",
        "card" : "180px",
        "profile":"160px",
        "project_list":"80px",
      },
      width:{
        "card": "520px",
        "profile":"160px",
        "project":"85%",
        "project_list":"1360px"
      },
      borderRadius: {
        "card" : "40px",
        "listProjective":"12px"
        
      },
      boxShadow: {
        "listProjective":"0px 4px 4px rgba(0, 0, 0, 0.25)"
      },
      fontSize:{
        "12pro": "10px",
        "heroText": "30px"
      },
      
      
      // colors: {
      //   purple: "rgba(235, 224, 251)",
      //   whitesmoke: "rgba(245,245,245)",
      //   "purple-head": "rgba(110, 111, 232)",
      //   navbar: "rgba(4,5,79)",
      //   "navbar-bg": "rgba(217, 217, 255)",
      //   "line":"#AD76EC",
      //   "title":"#6E6FE8",
      //   "date":"#00000080"
      // },
      // screens: {
      //   "12pro": "390px",
      //   "ipad-pro": "1024px",
      //   laptop: "1536px",
      // },
    },
   
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
            
});
