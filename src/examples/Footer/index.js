import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import typography from "assets/theme/base/typography";

function Footer({ company }) {
  const { href, name } = company;
  const { size } = typography;

  return (
    <SoftBox
      bottom={50}
      width="100%"
      display="flex"
      justifyContent="flex-start" // Alineado a la izquierda
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, powered  by{" "} {/* Espacio agregado */}
        <Link href={href} target="_blank">
          <SoftTypography variant="button" fontWeight="medium">
          <span style={{ marginRight: '4px' }}></span>
             {name}
          </SoftTypography>
        </Link>
      </SoftBox>
    </SoftBox>
  );
}

Footer.propTypes = {
  company: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;
