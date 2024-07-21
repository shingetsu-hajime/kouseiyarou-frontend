import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // プライマリカラー
    },
    secondary: {
      main: '#dc004e',  // セカンダリカラー
    },
  },
  typography: {
    h6: {
      fontWeight: 600,  // h6のフォントウェイトをカスタマイズ
    },
  },
});

export default theme;
