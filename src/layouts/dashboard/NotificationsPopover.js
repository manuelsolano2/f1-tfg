import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState, useRef } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton, Link,
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Check API',
    description: 'Check the API documentation website',
    avatar: null,
    type: 'api',
    link: 'http://ergast.com/mrd/'
  },
  {
    id: faker.datatype.uuid(),
    title: 'F1 Website',
    description: 'Visit the F1 website to check the news',
    avatar: null,
    type: 'f1',
    link: 'https://www.formula1.com/en.html'
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
  },
];

export default function NotificationsPopover() {
  const anchorRef = useRef(null);

  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'error' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
          <Iconify icon="akar-icons:info-fill" width={40} height={40} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Links and Documentation</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Links
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
    link: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
      <Link href={notification.link} underline='none' target="_blank" rel="noopener" color='inherit'>
    <ListItemButton

      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          />
        }
      />
    </ListItemButton>
      </Link>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        <br/>
          {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'api') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/api.png" />,
      title,
    };
  }
  if (notification.type === 'f1') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/f1-logo.png" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
