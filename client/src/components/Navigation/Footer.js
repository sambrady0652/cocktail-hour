import React from 'react'
import { Footer, Anchor, Box, Text } from 'grommet'
import { Github, LinkedinOption } from 'grommet-icons';



const Foot = () => {

  return (
    <Footer
      pad={{ horizontal: "small" }}
      fill="horizontal"
      justify="between"
      background="#362725B3"
      style={{
        position: "fixed",
        bottom: "0px"
      }}
    >
      <Box
        align="center"
        direction="row"
      >
        <Text size="xsmall">Application by Sam Brady</Text>
        <Anchor
          target="_blank"
          size="xsmall"
          margin="none"
          href="https://github.com/sambrady0652"
          icon={<Github color="#FDCF89" />}>
        </Anchor>
        <Anchor
          target="_blank"
          size="xsmall"
          margin="none"
          href="https://www.linkedin.com/in/sam-brady-0652/"
          icon={<LinkedinOption color="#FDCF89" />}>
        </Anchor>
      </Box>
      <Text size="xsmall">
        Data supplied by <Anchor
          target="_blank"
          href="https://www.thecocktaildb.com/api.php"
          color="#FDCF89"  >
          The Cocktail DB
        </Anchor>
      </Text>
    </Footer >
  )
}

export default Foot