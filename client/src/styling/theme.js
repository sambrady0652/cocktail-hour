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
        color: "#C0521F"
      },
      outline: "none"
    },
    hover: {
      color: "#C0521F"
    },
    colors: {
      text: "#FDCF89",
      placeholder: "#FDCF89"
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
  select: {
    icons: {
      color: "#FDCF89"
    },
    options: {
      container: {
        background: "#832023",
      }
    }
  },
  image: {
    extend: "max-width: 100%; height: auto; border-radius: 5px"
  },
  textInput: {
    border: {
      color: "#FDCF89"
    },
    suggestions: {
      extend: "background-color: #832023; font-size: 16px; line-height: 10px"
    },
    extend: "border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-color: #FDCF89; border-radius: 0px"
  },
  textArea: {
    extend: "border-color: #FDCF89"
    // extend: "border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-color: #FDCF89; border-radius: 0px"
  },
  formField: {
    border: {
      color: "#FDCF89",
    }
  }
};