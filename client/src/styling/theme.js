export const theme = {
  global: {
    font: {
      color: "#FDCF89",
      family: 'Arial',
      size: '16px',
      height: '20px',
    },
    input: {
      font: {
        weight: 400
      }
    },
    focus: {
      border: {
        color: "#58542D"
      },
    },
    hover: {
      color: "#C0521F"
    },
    colors: {
      text: "#FDCF89",
    },
  },
  anchor: {
    fontWeight: "normal",
    hover: {
      textDecoration: "none",
      extend: "color: #C0521F" // CHANGE 
    }
  },
  menu: {
    background: "#832023",
  },
  tabs: {
    extend: "width: 100%",
  },
  image: {
    extend: "max-width: 100%; height: auto;"
  },
  textInput: {
    border: {
      color: "#FDCF89"
    },
    extend: "border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-color: #FDCF89; border-radius: 0px"
  }
};