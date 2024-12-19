// import * as React from 'react;
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';


// const defaultTheme = createTheme();

// export default function SignIn() {
//   const [inputs, setInputs] = React.useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setInputs(prevState => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log('inputs',inputs)

//     axios.post('https://app.spiritx.co.nz/api/login', inputs)
//       .then((res) => {
//         localStorage.setItem('react-project-token', res.data.token.token)
 
//         localStorage.setItem(
//           'react-project-user',
//           JSON.stringify(res.data.user)
//         )

//         setTimeout(() => {
//           window.location.reload()
//         }, 500)
//       })
//       .catch((error) => console.log(error))
//   } 

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={inputs.email}
//               onChange={handleChange}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={inputs.password}
//               onChange={handleChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress'; // 引入 CircularProgress 组件
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const defaultTheme = createTheme();

export default function SignIn() {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = React.useState(false); // 添加 loading 状态
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // 控制 Snackbar 显示状态
  const [snackbarMessage, setSnackbarMessage] = React.useState(''); // 控制 Snackbar 消息内容


  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // 开始请求时设置 loading 为 true
  
    axios.post('https://app.spiritx.co.nz/api/login', inputs)
      .then((res) => {
        localStorage.setItem('react-project-token', res.data.token.token);
        localStorage.setItem('react-project-user', JSON.stringify(res.data.user));
  
        setSnackbarMessage('登录成功'); // 设置成功提示信息
        setSnackbarOpen(true); // 显示 Snackbar
  
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false); // 请求完成时设置 loading 为 false
      });
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inputs.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputs.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'} 
            </Button>
          </Box>
        </Box>
        <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000} 
  onClose={() => setSnackbarOpen(false)}
>
  <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>
      </Container>
    </ThemeProvider>
  );
}
