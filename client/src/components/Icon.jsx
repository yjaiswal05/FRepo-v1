import { Box } from '@mui/material';

const Icon = ({ src, alt, ...props }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{
      width: '24px',
      height: '24px',
      ...props.sx
    }}
    {...props}
  />
);

export default Icon; 