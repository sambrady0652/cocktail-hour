import React from 'react'
import { Footer, Anchor, Box, Text } from 'grommet'
import { Github, LinkedinOption } from 'grommet-icons';



const Foot = () => {
  return (
    <Footer
      align="center"
      pad={{ horizontal: "small" }}
      fill="horizontal"
      justify="end"
      style={{
        position: "fixed",
        bottom: "0px"
      }}
    >
      <Box direction="row">
        <Box align='end' justify="center">
          <Footer justify="between">
            <Box direction="row">
              <Anchor
                style={{ padding: "2px" }}
                plain
                target="_blank"
                size="xsmall"
                margin="none"
                href="https://github.com/sambrady0652"
                icon={<Github color="#FDCF89" />}>
              </Anchor>
              <Anchor
                style={{ padding: "2px" }}
                target="_blank"
                size="xsmall"
                margin="none"
                href="https://www.linkedin.com/in/sam-brady-0652/"
                icon={<LinkedinOption color="#FDCF89" />}>
              </Anchor>
            </Box>
            <Text size="xsmall" color="#FDCF89">App by Sam Brady</Text>
          </Footer>
          <Text size="xsmall" color="#FDCF89" margin={{ bottom: "xsmall" }}>
            Data supplied by <Anchor
              target="_blank"
              href="https://www.thecocktaildb.com/api.php"
              color="#FDCF89"  >
              The Cocktail DB
              </Anchor>
          </Text>
        </Box>
      </Box>
    </Footer >
  )
}

export default Foot