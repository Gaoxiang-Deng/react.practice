
import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import { write, utils } from 'xlsx';
import { saveAs } from 'file-saver';
import { read, utils as xlsxUtils } from 'xlsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'product_image', numeric: false, disablePadding: false, label: 'Image' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onAddProduct: PropTypes.func.isRequired,
};

function useFetchProducts(setRows) {
  useEffect(() => {
    axios
      .get('https://app.spiritx.co.nz/api/products')
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }, [setRows]);
}

export default function EnhancedTable({ searchQuery }) {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRowId, setEditRowId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [newRow, setNewRow] = useState(null); // State for adding new product
  const [snackbarOpen, setSnackbarOpen] = useState(false); // 控制Snackbar的显示
  const [snackbarMessage, setSnackbarMessage] = useState(''); // 控制Snackbar的消息


  useFetchProducts(setRows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleEditChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };


  const handleEditSave = (id) => {
    const row = rows.find((r) => r.id === id);
    if (!row) {
      console.error('Row not found');
      return;
    }
  
    const updatedRow = {
      title: row.title,
      price: row.price,
      description: row.description,
      is_active: 1,
      category_id: row.category_id,
    };
  
    axios
      .put(`https://app.spiritx.co.nz/api/product/${row.id}`, updatedRow)
      .then(() => {
        setEditRowId(null); // 退出编辑模式
        setSnackbarMessage('修改产品成功');
        setSnackbarOpen(true); // 显示 Snackbar
      })
      .catch((err) => console.log(err));
  };
  
  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!rowToDelete) return;
    const token = localStorage.getItem('react-project-token');
    if (!token) {
      console.error('Token is not available');
      return;
    }
  
    axios
      .delete(`https://app.spiritx.co.nz/api/product/${rowToDelete.id}`, {
        headers: { token: token },
      })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowToDelete.id));
        setDeleteOpen(false);
        setRowToDelete(null);
        setSnackbarMessage('删除产品成功');
        setSnackbarOpen(true); // 显示 Snackbar
      })
      .catch((err) => {
        console.log('Error deleting product:', err);
        setSnackbarMessage('删除产品失败');
        setSnackbarOpen(true);
      });
  };
  

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setRowToDelete(null);
  };

  const handleAddProduct = () => {
    setNewRow({
      id: null,
      title: '',
      price: '',
      description: '',
      product_image: null, // Set product_image to null
      is_active: 1,
      category_id: '',
    });
  };

  const handleNewRowChange = (field, value) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };


  const handleNewRowSave = () => {
    if (!newRow.title || !newRow.price) {
      console.error('Title and price are required');
      return;
    }
  
    const newProduct = {
      title: newRow.title,
      price: newRow.price,
      description: newRow.description,
      is_active: 1,
      category_id: 99,
    };
  
    const token = localStorage.getItem('react-project-token');
  
    axios
      .post('https://app.spiritx.co.nz/api/products', newProduct, {
        headers: { token: token },
      })
      .then((res) => {
        setRows((prevRows) => [...prevRows, res.data]);
        setNewRow(null);
        setSnackbarMessage('Add product Success' + res.data.title);
        setSnackbarOpen(true); // 显示 Snackbar
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('Add product Success');
        setSnackbarOpen(true);
      });
  };
  
  
   // 下载表格数据为 Excel 文件
   const handleDownload = () => {
    const worksheet = utils.json_to_sheet(rows); // 将表格数据转换为 Excel 表格
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'products.xlsx'); // 使用 file-saver 保存文件
  };

  // 上传并解析 Excel 文件
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsxUtils.sheet_to_json(worksheet);
      setRows(jsonData); // 将 Excel 文件的数据设置为 rows
    };
    reader.readAsBinaryString(file);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    console.log("Search Query: ", searchQuery); // 打印搜索关键字
    console.log("Rows: ", rows); // 打印 rows 数据
  
    if (searchQuery) {
      const filtered = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].title.includes(searchQuery)) {
          filtered.push(rows[i]);
        }
      }
      setFilteredRows(filtered);
      if (filtered.length > 0) {
        setSnackbarMessage('搜索成功: ' + filtered.length + ' 个产品');
        setSnackbarOpen(true); // 显示 Snackbar
      } else {
        setSnackbarMessage('未找到相关产品');
        setSnackbarOpen(true);
      }
    } else {
      setFilteredRows(rows);
    }
  }, [searchQuery, rows]);
  
  

  const visibleRows = useMemo(
    () => filteredRows
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );

  return (
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* 添加按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <IconButton onClick={handleAddProduct}>
          <AddIcon />
        </IconButton>
        {/* 上传按钮 */}
        <IconButton component="label">
          <UploadIcon />
          <input
            type="file"
            accept=".xlsx"
            hidden
            onChange={handleUpload}
          />
        </IconButton>
        {/* 下载按钮 */}
        <IconButton onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </Box>  
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            onAddProduct={handleAddProduct}
          />
          <TableBody>
            {visibleRows.map((row) => {
              const isEditing = editRowId === row.id;
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component='th' scope='row' padding='normal' align='center'>
                    {isEditing ? (
                      <TextField
                        value={row.title}
                        onChange={(e) => handleEditChange(row.id, 'title', e.target.value)}
                      />
                    ) : (
                      row.title
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {isEditing ? (
                      <TextField
                        type='number'
                        value={row.price}
                        onChange={(e) => handleEditChange(row.id, 'price', e.target.value)}
                      />
                    ) : (
                      row.price
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {isEditing ? (
                      <TextField
                        value={row.description}
                        onChange={(e) => handleEditChange(row.id, 'description', e.target.value)}
                      />
                    ) : (
                      row.description
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {row.product_image ? (
                      <img
                        src={row.product_image}
                        alt={row.title}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {isEditing ? (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleEditSave(row.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <EditIcon onClick={() => handleEditClick(row.id)} />
                        <DeleteIcon onClick={() => handleDeleteClick(row)} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {newRow && (
              <TableRow>
                <TableCell align='center'>
                  <TextField
                    value={newRow.title}
                    onChange={(e) => handleNewRowChange('title', e.target.value)}
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    type='number'
                    value={newRow.price}
                    onChange={(e) => handleNewRowChange('price', e.target.value)}
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    value={newRow.description}
                    onChange={(e) => handleNewRowChange('description', e.target.value)}
                  />
                </TableCell>
                <TableCell align='center'>
                  {'No image'} {/* Ensure 'No image' is displayed for new rows */}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNewRowSave}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <Dialog open={deleteOpen} onClose={handleDeleteClose}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleDeleteConfirm} color='secondary' autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000} // 自动隐藏时间，单位为毫秒
  onClose={() => setSnackbarOpen(false)} // 关闭 Snackbar
>
  <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

  </Box>
  
  );
}



