/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-08-25 00:15:16
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-08-25 00:15:44
 * @FilePath: /project1/src/EnhancedTableStyles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// EnhancedTableStyles.js
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Modal from '@mui/material/Modal';

export const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minWidth: 750,
}));

export const StyledModalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  backgroundColor: 'white',
  width: '400px',
  margin: '100px auto',
  borderRadius: '8px',
}));
