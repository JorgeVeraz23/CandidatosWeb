import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { menuItem } from "examples/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ color, icon, title, text, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <SoftBox
      width="2.25rem"
      height="2.25rem"
      mt={0.25}
      mr={2}
      mb={0.25}
      borderRadius="lg"
      color={color} // Puedes aplicar el color directamente al contenedor
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Icon>{icon}</Icon>
    </SoftBox>
    <SoftBox>
      <SoftTypography variant="button" textTransform="capitalize" fontWeight="regular">
        <strong>{title[0]}</strong> {title[1]}
      </SoftTypography>
      {text && (
        <SoftTypography variant="body2" color="textSecondary">
          {text}
        </SoftTypography>
      )}
    </SoftBox>
    {text && (
      <SoftTypography variant="button" color="secondary" mr={0.5}>
        <Icon>info</Icon>
      </SoftTypography>
    )}
  </MenuItem>
));

NotificationItem.defaultProps = {
  color: "dark",
};

NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  text: PropTypes.string,
};

export default NotificationItem;
