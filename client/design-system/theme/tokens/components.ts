import { Components } from '@mui/material/styles';

export const components: Components = {
  MuiButton: {
    defaultProps: {
      variant: "contained",
      fullWidth: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
        height: 48,
      },
      
    },

    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          backgroundColor: '#E50914',
        },
      },
    ],
  },

  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#121212',
        borderRadius: 16,
        transition: '0.2s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: '0px 10px 40px rgba(229,9,20,0.15)',
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.08)',
        color: '#B3B3B3',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
       
       
      }
    },
    defaultProps: {
      variant: "filled",
      fullWidth: true,
    },
  }
};