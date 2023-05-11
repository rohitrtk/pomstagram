const theme = {
  typography: {
    styles: {
      variants: {
        h1: {
          fontSize: "text-5xl",
        },
        h2: {
          fontSize: "text-4xl",
        },
        h3: {
          fontSize: "text-3xl",
        },
        h4: {
          fontSize: "text-2xl"
        },
        h5: {
          fontSize: "text-xl"
        },
        h6: {
          fontSize: "text-base"
        },
        paragraph: {
          fontSize: "text-base",

        },
        small: {
          fontSize: "text-sm"
        }
      }
    }
  },
  button: {
    defaultProps: {
      color: "blue-gray",
    },
    styles: {
      sizes: {
        sm: {
          fontSize: "text-xs"
        },
        md: {
          fontSize: "text-md"
        },
        lg: {
          fontSize: "text-lg"
        }
      }
    }
  }
}

export default theme;