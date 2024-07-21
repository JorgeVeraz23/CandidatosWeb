import { styled, useTheme } from '@mui/system';
import { Theme, buttonBaseClasses } from '@mui/material';

interface Props {
    href: string;
    text: string;
    download: string;
    color?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
}

const StyledLink = styled('a')<{ color?: Props['color'] }>(
    ({ color }) => {
        const theme = useTheme();
        return ({
            color: 'white',
            textDecoration: 'none',
            backgroundColor: theme?.palette[color || 'primary']?.main || color || 'inherit',
            borderRadius: '8px',
            padding: '8px 15px',
            fontSize: '14px',
            transition: 'background-color 0.3s',

            '&:hover': {
                backgroundColor: theme?.palette[color || 'primary']?.dark ||
                    color ||
                    'inherit',
            },
        });
    }
);

const ButtonDownload = (props: Props) => {
    const { href, text, color, download } = props;

    return (
        <StyledLink color={color} href={href} target="_blank" download={download}>
            {text}
        </StyledLink>
    );
};

export default ButtonDownload