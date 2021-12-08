import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, Button, List, Divider, ListItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ALERT, LOGOUT} from '../actions/types'
export default function TempDrawer({ toggleDrawer, state }) {
	const user = useSelector((store) => store.userReducer.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		dispatch({ type: LOGOUT });
		dispatch({type: ALERT, typeOfNotify: "success", message: "You have been successfully logged out"})
		toggleDrawer();
		navigate('/');
	};
	const handleClick = (page) => {
		toggleDrawer()
		navigate(`${page}`)
	}
	const list = (anchor) => (
		<Box
			sx={{ width: '20rem' }}
			role="presentation"
			onClick={toggleDrawer()}
			onKeyDown={toggleDrawer()}
		>
			<List className="Drawer-items">
				<ListItem onClick={()=>handleClick('dashboard')} button>Dashboard</ListItem>
				<ListItem onClick={()=>handleClick('pos')} button>POS</ListItem>
				<ListItem onClick={()=>handleClick('orders')} button>Orders</ListItem>
				<ListItem onClick={()=>handleClick('inventory')} button>Inventory</ListItem>
				<ListItem onClick={()=>handleClick('menu-items')} button>Menu Items</ListItem>
				<ListItem onClick={()=>handleClick('sales')} button>Sales</ListItem>
				<ListItem onClick={()=>handleClick('suppliers')} button>Suppliers</ListItem>
				<ListItem onClick={logout} button>
					Logout
				</ListItem>
			</List>
			{/* <Divider /> */}
			{/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
		</Box>
	);
	return (
		<Drawer anchor={'right'} open={state} onClose={toggleDrawer}>
			{list('right')}
		</Drawer>
	);
}
