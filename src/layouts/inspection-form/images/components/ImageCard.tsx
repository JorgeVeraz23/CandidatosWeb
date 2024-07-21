import { Box, Card, CardActionArea, CardMedia, Fade, IconButton, Link, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  url: string;
  onPressedDelete: () => void;
}

export default function ImageCard(props: Props) {
  const { url, onPressedDelete } = props;

  const handleDelete = () => {
    onPressedDelete();
  }

  return (
    <Card
      variant='outlined'
      elevation={0}
      sx={{
        height: { xs: 'auto' },
        borderRadius: '8px'
      }}
    >
      <CardActionArea sx={{ background: "black", borderRadius: '4px' }}>
        <Box component='div' display='flex' sx={{ justifyContent: 'center' }}>
          <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
            <Fade in={true} timeout={2000}>
              <CardMedia
                component="img"
                src={url}
                alt="Not found"
                sx={{
                  borderRadius: '0',
                  height: { xs: '150px', sm: '180px', md: '200px' },
                  objectFit: "fill",
                  padding: "0 !important", margin: "0 !important"
                }}
              />
            </Fade>
          </Link>
        </Box>
      </CardActionArea>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
          borderRadius: '8px',
        }}
      >
        <Tooltip title="Eliminar">
          <IconButton
            color='primary'
            onClick={() => handleDelete()}
            sx={{ position: 'absolute', bottom: 2, right: 5, color: "#B9B9B9 !important" }}
            aria-label="delete"
            disableFocusRipple={false}
            disableRipple={false}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  )
}