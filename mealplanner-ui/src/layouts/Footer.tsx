//Reference: https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sticky-footer/StickyFooter.tsx
import { Box, Container, Typography } from "@mui/material";

const hide = `
    @media print{
      #hide{
        display: none !important;
      }
    }
  
  `;

  const newStyle = document.createElement('style');
  newStyle.textContent = hide;
  document.head.appendChild(newStyle);

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl" id='hide'>
        <Typography variant="body1" align="center">
          For Greener Village. By Civic Tech Fredericton.
        </Typography>
        <Typography variant="body2" align="center">
          If you run into issues or have any suggestions or questions, please
          feel free to post your{" "}
          <a
            href="https://www.civictechfredericton.com/gmpfeedback.html"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            feedback
          </a>
        </Typography>
        <Box display= "flex" alignItems= "center" justifyContent="center">
          <img src="/images/CivicTechLogo.png" alt="CivicTechLogo" style={{ width: '12%', height: 'auto', marginTop: '10px' }}/>
        </Box>
      </Container>
    </Box>
  );
}
