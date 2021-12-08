import {useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Modal} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux'
import {ALERT} from '../actions/types'
import InventoryModal from './InventoryModal';
import {deleteMenuItem} from '../actions/actions'

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const {suppliers} = props; 
  const {user} = props; 
  const {toggle} = props; 
  return (
    <>
      <TableRow >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={0} align="left" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{`$${row.price}`}</TableCell>
        <TableCell align="right">
        {user.isAdmin === 'true' ? (
                <FontAwesomeIcon
                    className="Supplier-delete"
                    icon={faTrashAlt}
                    onClick={()=>toggle(row.id)}
                />
            ) : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Ingredients
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell >Unit</TableCell>
                    <TableCell >Supplier</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ingredients.map((ingredient) => {
                    const supplier = suppliers.filter(supplier => supplier.id === ingredient.supplier_id)
                   return ( 
                   <TableRow key={ingredient.id}>
                      <TableCell component="th" scope="row">
                        {ingredient.name}
                      </TableCell>
                      <TableCell>{ingredient.quantity}</TableCell>
                      <TableCell >{ingredient.unit}</TableCell>
                      <TableCell >
                        {supplier[0].name}
                      </TableCell>
                    </TableRow>
                    )
                })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function MenuItemTable({category, items, suppliers, toggleRefresh}) {
    const user = useSelector(state => state.userReducer)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    const toggle = (id) => {
        setIsOpen(open => !open)
        setId(id)
        
    }
    console.log(items)
    const handleDelete = async(id)=> {
        const res = await deleteMenuItem(id); 
        
        if(res.message === "Item has been deleted") {
            dispatch({type: ALERT, typeOfNotify: 'success', message: res.message})
        } else dispatch({type: ALERT, typeOfNotify: 'error', message: "Sorry, item does not exist"})

        toggleRefresh()
    }
    
    return (
        <>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell align="left">{`${category} Items`}</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Price</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {items.map((item) => (
                <Row setId={setId} toggle={toggle} user={user} key={item.name} row={item} suppliers={suppliers}/>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Modal
				open={isOpen}
				onClose={toggle}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<InventoryModal
					message={'Are you sure you want to delete this Menu Item?'}
					buttonText={'DELETE'}
					color={'error'}
                    submit={()=>handleDelete(id)}
				/>
			</Modal>
        </>
    );
    }
