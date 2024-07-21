import React, { useState } from 'react';
import Editor from './components/Editor';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  ThemeProvider,
  IconButton,
  Container,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import theme from './theme';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [task, setTask] = useState('spell-check');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleCheck = async () => {
    try {
      const response = await axios.post(`${apiUrl}/${task}`, { text: text });
      const { corrected_text, count, examples } = response.data;
      setText(corrected_text);
      setResults({ count, examples });
    } catch (error) {
      setError('There was an error!');
    }
  };

  const handleClose = () => {
    setError('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveToFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              校正野郎 ver1.0
            </Typography>
            <FormControl sx={{ minWidth: 120, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Select
                value={task}
                onChange={handleTaskChange}
                displayEmpty
                sx={{ backgroundColor: '#f5f5f5' }}
              >
                <MenuItem value="spell-check">誤字脱字チェック</MenuItem>
                <MenuItem value="sentence-end-check">文末重複チェック</MenuItem>
                <MenuItem value="near-word-check">単語近傍チェック</MenuItem>
                <MenuItem value="kosoado-check">こそあど言葉チェック</MenuItem>
                <MenuItem value="normalize-check">正規化チェック</MenuItem>
                {/* 他のタスクを追加する場合はここに */}
              </Select>
            </FormControl>
            <input
              accept=".txt"
              style={{ display: 'none' }}
              id="upload-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-file">
              <IconButton color="inherit" component="span">
                <UploadFileIcon />
              </IconButton>
            </label>
            <IconButton color="inherit" onClick={handleSaveToFile}>
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth={false} sx={{ px: 3 }}>
          <Box display="flex" mt={2} width="100%" height="calc(100vh - 64px)">
            <Box 
              flexShrink={0}
              width={{ xs: '100%', md: '25%' }}
              mr={2}
              sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1, overflowY: 'auto' }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheck}
                sx={{ display: 'block', width: '100%' }}
              >
                Check
              </Button>
              {results && (
                <Box mt={2} sx={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }}>
                  <Typography variant="body1">該当件数: {results.count}</Typography>
                  <Box 
                    sx={{ 
                      maxHeight: '100%', 
                      overflowY: 'auto', 
                      backgroundColor: '#fff', 
                      borderRadius: 1, 
                      padding: 1, 
                      marginTop: 1 
                    }}
                  >
                    <List>
                      {results.examples.map((example, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={example} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              )}
            </Box>
            <Box flexGrow={1}>
              <Editor value={text} setValue={setText} />
            </Box>
          </Box>
          <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
