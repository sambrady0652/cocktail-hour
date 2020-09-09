export const theme = {
  global: {
    font: {
      color: "#FDCF89",
      family: 'Arial',
      size: '16px',
      height: '20px',
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
      text: "#FDCF89"
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
  tab: {
    color: "#363135",
    hover: {
      color: "#ED2D23",
    },
    active: {
      color: "#ED2D23",
    },
    border: {
      color: "#363135",
      active: {
        color: "#ED2D23"
      },
      hover: {
        color: "#ED2D23"
      }
    },
  },
  image: {
    extend: "max-width: 100%; height: auto;"
  },
  formField: {
    border: {
      color: "#FDCF89"
    },
  }
};